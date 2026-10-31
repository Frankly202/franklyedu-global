create function public.require_referral_admin(p_actor uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_actor is null
    or p_actor is distinct from auth.uid()
    or not exists (
      select 1
      from public.referral_participants p
      where p.user_id = p_actor and p.role = 'admin'
    )
  then
    raise exception using
      errcode = '42501',
      message = 'An authenticated administrator is required.';
  end if;
end;
$$;

create function public.write_referral_audit_event(
  p_actor uuid,
  p_event_type text,
  p_entity_type text,
  p_entity_id text,
  p_changes jsonb
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_event_type = 'duplicate.flagged_automatically' then
    if p_actor is not null then
      raise exception using
        errcode = '42501',
        message = 'Automated audit events cannot identify a user actor.';
    end if;
  elsif p_actor is null or p_actor is distinct from auth.uid() then
    raise exception using
      errcode = '42501',
      message = 'Audit actor must match the authenticated user.';
  end if;

  insert into public.referral_audit_events (
    actor_user_id,
    event_type,
    entity_type,
    entity_id,
    changes
  )
  values (
    p_actor,
    p_event_type,
    p_entity_type,
    p_entity_id,
    p_changes
  );
end;
$$;

create function public.audit_referral_creation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or auth.uid() is distinct from new.referrer_id then
    raise exception using
      errcode = '42501',
      message = 'Referral actor must match the authenticated referrer.';
  end if;

  perform public.write_referral_audit_event(
    auth.uid(),
    'referral.created',
    'referral',
    new.id::text,
    jsonb_build_object('admission_status', new.admission_status)
  );
  return new;
end;
$$;

create trigger referral_audit_creation
  after insert on public.referrals
  for each row execute function public.audit_referral_creation();

create function public.audit_referral_status_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
begin
  perform public.require_referral_admin(actor);

  insert into public.referral_status_history (
    referral_id,
    previous_status,
    new_status,
    changed_by
  )
  values (
    new.id,
    old.admission_status,
    new.admission_status,
    actor
  );

  perform public.write_referral_audit_event(
    actor,
    'referral.admission_status_changed',
    'referral',
    new.id::text,
    jsonb_build_object(
      'previous_status', old.admission_status,
      'new_status', new.admission_status
    )
  );
  return new;
end;
$$;

create trigger referral_audit_status_change
  after update of admission_status on public.referrals
  for each row
  when (old.admission_status is distinct from new.admission_status)
  execute function public.audit_referral_status_change();

create function public.audit_participant_role_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
begin
  perform public.require_referral_admin(actor);
  perform public.write_referral_audit_event(
    actor,
    'participant.role_changed',
    'participant',
    new.user_id::text,
    jsonb_build_object('previous_role', old.role, 'new_role', new.role)
  );
  return new;
end;
$$;

create trigger referral_audit_participant_role
  after update of role on public.referral_participants
  for each row
  when (old.role is distinct from new.role)
  execute function public.audit_participant_role_change();

create function public.audit_participant_consent()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or auth.uid() is distinct from new.participant_id then
    raise exception using
      errcode = '42501',
      message = 'Consent actor must match the authenticated participant.';
  end if;

  if tg_op = 'INSERT' then
    perform public.write_referral_audit_event(
      auth.uid(),
      'participant.consent_recorded',
      'participant',
      new.participant_id::text,
      jsonb_build_object(
        'consent_type', new.consent_type,
        'policy_version', new.policy_version,
        'locale', new.locale
      )
    );
  else
    if old.withdrawn_at is not null
      or new.withdrawn_at is null
      or old.participant_id is distinct from new.participant_id
      or old.consent_type is distinct from new.consent_type
      or old.policy_version is distinct from new.policy_version
      or old.locale is distinct from new.locale
      or old.consented_at is distinct from new.consented_at
    then
      raise exception using
        errcode = '42501',
        message = 'Consent records may only be withdrawn once by their participant.';
    end if;

    perform public.write_referral_audit_event(
      auth.uid(),
      'participant.consent_withdrawn',
      'participant',
      new.participant_id::text,
      jsonb_build_object('consent_type', new.consent_type, 'withdrawn_at', new.withdrawn_at)
    );
  end if;
  return new;
end;
$$;

create trigger referral_audit_participant_consent_insert
  after insert on public.participant_consents
  for each row execute function public.audit_participant_consent();

create trigger referral_audit_participant_consent_withdrawal
  after update of withdrawn_at on public.participant_consents
  for each row
  when (old.withdrawn_at is distinct from new.withdrawn_at)
  execute function public.audit_participant_consent();

create function public.audit_referral_consent()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or auth.uid() is distinct from new.consented_by then
    raise exception using
      errcode = '42501',
      message = 'Consent actor must match the authenticated participant.';
  end if;

  perform public.write_referral_audit_event(
    auth.uid(),
    'referral.consent_recorded',
    'referral',
    new.referral_id::text,
    jsonb_build_object(
      'consent_type', new.consent_type,
      'policy_version', new.policy_version,
      'locale', new.locale
    )
  );
  return new;
end;
$$;

create trigger referral_audit_referral_consent
  after insert on public.referral_consents
  for each row execute function public.audit_referral_consent();

create function public.audit_duplicate_review_flag()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
begin
  if tg_op = 'INSERT' then
    if new.flag_source = 'automated_check' then
      if new.review_status <> 'pending' or new.reviewed_by is not null then
        raise exception using
          errcode = '42501',
          message = 'Automated duplicate flags must be pending and have no reviewer.';
      end if;

      perform public.write_referral_audit_event(
        null,
        'duplicate.flagged_automatically',
        'duplicate_review',
        new.id::text,
        jsonb_build_object('review_status', new.review_status, 'flag_source', new.flag_source)
      );
    else
      perform public.require_referral_admin(actor);
      perform public.write_referral_audit_event(
        actor,
        'duplicate.flagged_by_admin',
        'duplicate_review',
        new.id::text,
        jsonb_build_object('review_status', new.review_status, 'flag_source', new.flag_source)
      );
    end if;
  else
    perform public.require_referral_admin(new.reviewed_by);
    if new.review_status = 'pending'
      or old.review_status <> 'pending'
      or old.referral_id is distinct from new.referral_id
      or old.candidate_referral_id is distinct from new.candidate_referral_id
      or old.flag_source is distinct from new.flag_source
      or old.flagged_at is distinct from new.flagged_at
    then
      raise exception using
        errcode = '42501',
        message = 'Duplicate flags may only receive one authenticated administrator review.';
    end if;

    perform public.write_referral_audit_event(
      new.reviewed_by,
      'duplicate.reviewed',
      'duplicate_review',
      new.id::text,
      jsonb_build_object('previous_status', old.review_status, 'new_status', new.review_status)
    );
  end if;
  return new;
end;
$$;

create trigger referral_audit_duplicate_flag_insert
  after insert on public.referral_duplicate_review_flags
  for each row execute function public.audit_duplicate_review_flag();

create trigger referral_audit_duplicate_flag_review
  after update of review_status
  for each row
  when (old.review_status is distinct from new.review_status)
  execute function public.audit_duplicate_review_flag();

create or replace function public.enforce_reward_qualification()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if tg_op = 'UPDATE' then
    if old.referral_id is distinct from new.referral_id
      or old.reward_amount is distinct from new.reward_amount
      or old.currency is distinct from new.currency
      or old.created_at is distinct from new.created_at
      or (old.decision is not distinct from new.decision
        and (old.reviewed_by is distinct from new.reviewed_by
          or old.reviewed_at is distinct from new.reviewed_at))
      or (old.decision <> 'pending' and new.decision = 'pending')
    then
      raise exception using
        errcode = '42501',
        message = 'Reward qualification history cannot be rewritten.';
    end if;
  end if;

  if new.decision <> 'pending' then
    if new.reviewed_by is null
      or new.reviewed_by is distinct from auth.uid()
      or not exists (
        select 1
        from public.referral_participants p
        where p.user_id = new.reviewed_by and p.role = 'admin'
      )
    then
      raise exception using
        errcode = '23514',
        message = 'Reward decisions require an authorized administrator.';
    end if;

    if new.decision = 'qualified' and not exists (
      select 1
      from public.referrals r
      where r.id = new.referral_id and r.admission_status = 'enrolled'
    ) then
      raise exception using
        errcode = '23514',
        message = 'A referral must be enrolled before reward qualification.';
    end if;

    if new.decision <> 'qualified' and exists (
      select 1
      from public.referral_reward_payments payment
      where payment.qualification_id = new.id
    ) then
      raise exception using
        errcode = '23514',
        message = 'A paid reward cannot be reverted to an unqualified state.';
    end if;
  end if;

  return new;
end;
$$;

create function public.audit_reward_qualification()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.decision = 'pending'
    or (tg_op = 'UPDATE' and old.decision is not distinct from new.decision)
  then
    return new;
  end if;

  perform public.write_referral_audit_event(
    new.reviewed_by,
    'reward.qualification_decided',
    'reward_qualification',
    new.id::text,
    jsonb_build_object('decision', new.decision)
  );
  return new;
end;
$$;

create trigger referral_audit_reward_qualification_insert
  after insert on public.referral_reward_qualifications
  for each row
  when (new.decision <> 'pending')
  execute function public.audit_reward_qualification();

create trigger referral_audit_reward_qualification_update
  after update of decision on public.referral_reward_qualifications
  for each row
  when (new.decision <> 'pending' and old.decision is distinct from new.decision)
  execute function public.audit_reward_qualification();

create or replace function public.enforce_reward_payment()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if tg_op = 'UPDATE' then
    raise exception using
      errcode = '42501',
      message = 'Payment records are append-only.';
  end if;

  if new.recorded_by is null
    or new.recorded_by is distinct from auth.uid()
    or not exists (
      select 1
      from public.referral_participants p
      where p.user_id = new.recorded_by and p.role = 'admin'
    )
  then
    raise exception using
      errcode = '23514',
      message = 'Payment records require an authorized administrator.';
  end if;

  if not exists (
    select 1
    from public.referral_reward_qualifications q
    where q.id = new.qualification_id and q.decision = 'qualified'
  ) then
    raise exception using
      errcode = '23514',
      message = 'Only an authorized qualified reward can be paid.';
  end if;

  return new;
end;
$$;

create function public.audit_reward_payment()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.write_referral_audit_event(
    new.recorded_by,
    'reward.payment_recorded',
    'reward_payment',
    new.id::text,
    jsonb_build_object(
      'qualification_id', new.qualification_id,
      'amount', new.amount,
      'currency', new.currency,
      'paid_at', new.paid_at
    )
  );
  return new;
end;
$$;

create trigger referral_audit_reward_payment
  after insert on public.referral_reward_payments
  for each row execute function public.audit_reward_payment();

revoke all on function public.require_referral_admin(uuid)
  from public, anon, authenticated, service_role;
revoke all on function public.write_referral_audit_event(uuid, text, text, text, jsonb)
  from public, anon, authenticated, service_role;
revoke all on function public.audit_referral_creation()
  from public, anon, authenticated, service_role;
revoke all on function public.audit_referral_status_change()
  from public, anon, authenticated, service_role;
revoke all on function public.audit_participant_role_change()
  from public, anon, authenticated, service_role;
revoke all on function public.audit_participant_consent()
  from public, anon, authenticated, service_role;
revoke all on function public.audit_referral_consent()
  from public, anon, authenticated, service_role;
revoke all on function public.audit_duplicate_review_flag()
  from public, anon, authenticated, service_role;
revoke all on function public.audit_reward_qualification()
  from public, anon, authenticated, service_role;
revoke all on function public.audit_reward_payment()
  from public, anon, authenticated, service_role;

revoke all on table public.referral_audit_events
  from public, anon, authenticated, service_role;

revoke insert, update, delete, truncate on table public.referral_status_history from service_role;
revoke update, delete, truncate on table public.participant_consents from service_role;
grant update (withdrawn_at) on table public.participant_consents to service_role;
revoke update, delete, truncate on table public.referral_consents from service_role;
revoke update, delete, truncate on table public.referral_duplicate_review_flags from service_role;
grant update (review_status, reviewed_by, reviewed_at)
  on table public.referral_duplicate_review_flags to service_role;
revoke update, delete, truncate on table public.referral_reward_qualifications from service_role;
grant update (decision, reviewed_by, reviewed_at)
  on table public.referral_reward_qualifications to service_role;
revoke update, delete, truncate on table public.referral_reward_payments from service_role;
