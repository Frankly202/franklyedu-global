create table public.referral_submission_policies (
  locale text not null check (locale in ('en', 'tr', 'fr', 'sw')),
  policy_version text not null check (length(trim(policy_version)) between 1 and 80),
  notice_text text not null check (length(trim(notice_text)) between 1 and 8000),
  consent_text text not null check (length(trim(consent_text)) between 1 and 2000),
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (locale, policy_version)
);

create unique index referral_submission_policies_one_active_per_locale_idx
  on public.referral_submission_policies (locale)
  where is_active;

alter table public.referral_submission_policies enable row level security;
revoke all on public.referral_submission_policies from public, anon, authenticated, service_role;

alter table public.referrals
  add constraint referrals_referrer_id_id_key unique (referrer_id, id);

alter table public.referral_consents
  add constraint referral_consents_owner_fk
  foreign key (consented_by, referral_id)
  references public.referrals (referrer_id, id)
  on delete restrict;

alter table public.referral_duplicate_review_flags
  drop constraint if exists referral_duplicate_review_fla_referral_id_candidate_referra_key;
create unique index referral_duplicate_review_flags_pending_pair_idx
  on public.referral_duplicate_review_flags (
    least(referral_id, candidate_referral_id),
    greatest(referral_id, candidate_referral_id)
  )
  where review_status = 'pending'
    and flag_source = 'automated_check';

create table public.referral_submission_idempotency (
  participant_id uuid not null references public.referral_participants (user_id) on delete restrict,
  idempotency_key uuid not null,
  referral_id uuid not null unique,
  created_at timestamptz not null default now(),
  primary key (participant_id, idempotency_key),
  foreign key (participant_id, referral_id)
    references public.referrals (referrer_id, id)
    on delete restrict
);

alter table public.referral_submission_idempotency enable row level security;
revoke all on public.referral_submission_idempotency from public, anon, authenticated, service_role;

create function public.get_active_referral_submission_policy(p_locale text)
returns table (policy_version text, notice_text text, consent_text text)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
begin
  if actor is null or p_locale not in ('en', 'tr', 'fr', 'sw') then
    raise exception using
      errcode = '42501',
      message = 'An authenticated participant is required.';
  end if;

  if not exists (
    select 1
    from public.referral_participants participant
    where participant.user_id = actor
  ) then
    raise exception using
      errcode = '42501',
      message = 'An authenticated participant is required.';
  end if;

  return query
  select policy.policy_version, policy.notice_text, policy.consent_text
  from public.referral_submission_policies policy
  where policy.locale = p_locale and policy.is_active;
end;
$$;

revoke all on function public.get_active_referral_submission_policy(text)
  from public, anon, service_role;
grant execute on function public.get_active_referral_submission_policy(text)
  to authenticated;

create function public.submit_participant_referral(
  p_student_name text,
  p_student_email text,
  p_student_phone text,
  p_locale text,
  p_policy_version text,
  p_consent_accepted boolean,
  p_idempotency_key uuid
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  participant_code text;
  active_policy_version text;
  normalized_name text;
  normalized_email text;
  normalized_phone text;
  referral_row public.referrals%rowtype;
  existing_referral public.referrals%rowtype;
  existing_referral_id uuid;
  review_required boolean := false;
  candidate record;
begin
  if actor is null then
    raise exception using
      errcode = '42501',
      message = 'An authenticated participant is required.';
  end if;
  if p_student_name is null
    or p_student_email is null
    or p_idempotency_key is null
    or p_locale is null
    or p_locale not in ('en', 'tr', 'fr', 'sw')
    or p_consent_accepted is distinct from true
  then
    raise exception using
      errcode = '22023',
      message = 'A valid submission and explicit consent are required.';
  end if;

  normalized_name := btrim(regexp_replace(normalize(p_student_name, NFC), '[[:space:]]+', ' ', 'g'));
  normalized_email := lower(btrim(p_student_email));
  normalized_phone := nullif(btrim(regexp_replace(coalesce(p_student_phone, ''), '[[:space:]]+', ' ', 'g')), '');

  if length(normalized_name) not between 1 and 200
    or length(normalized_email) not between 3 and 320
    or normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or (normalized_phone is not null and length(normalized_phone) not between 3 and 40)
    or p_policy_version is null
    or length(trim(p_policy_version)) not between 1 and 80
  then
    raise exception using
      errcode = '22023',
      message = 'The referral submission is invalid.';
  end if;

  if not exists (
    select 1 from public.referral_participants participant
    where participant.user_id = actor
  ) then
    raise exception using
      errcode = '42501',
      message = 'An authenticated participant is required.';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(actor::text || ':' || p_idempotency_key::text, 0)
  );

  select idempotency.referral_id
  into existing_referral_id
  from public.referral_submission_idempotency idempotency
  where idempotency.participant_id = actor
    and idempotency.idempotency_key = p_idempotency_key;

  if existing_referral_id is not null then
    select referral.*
    into existing_referral
    from public.referrals referral
    where referral.id = existing_referral_id
      and referral.referrer_id = actor;

    if not found
      or existing_referral.referred_student_name is distinct from normalized_name
      or existing_referral.referred_student_email_normalized is distinct from normalized_email
      or nullif(btrim(regexp_replace(coalesce(existing_referral.referred_student_phone, ''), '[[:space:]]+', ' ', 'g')), '')
        is distinct from normalized_phone
      or not exists (
        select 1
        from public.referral_consents consent
        where consent.referral_id = existing_referral.id
          and consent.consented_by = actor
          and consent.locale = p_locale
          and consent.policy_version = p_policy_version
      )
    then
      raise exception using
        errcode = 'P1102',
        message = 'The idempotency key was already used for a different submission.';
    end if;

    return jsonb_build_object(
      'reference', existing_referral.reference,
      'status', existing_referral.admission_status,
      'createdAt', existing_referral.created_at,
      'reviewRequired', exists (
        select 1
        from public.referral_duplicate_review_flags flag
        where flag.referral_id = existing_referral.id
          and flag.flag_source = 'automated_check'
          and flag.review_status = 'pending'
      )
    );
  end if;

  select policy.policy_version
  into active_policy_version
  from public.referral_submission_policies policy
  where policy.locale = p_locale and policy.is_active
  for share;

  if active_policy_version is null then
    raise exception using
      errcode = 'P1101',
      message = 'Referral submissions are not available.';
  end if;
  if active_policy_version is distinct from p_policy_version then
    raise exception using
      errcode = 'P1103',
      message = 'The consent notice changed; reload it before submitting.';
  end if;

  select participant.referral_code
  into participant_code
  from public.referral_participants participant
  where participant.user_id = actor;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('referral-email:' || normalized_email, 0)
  );

  insert into public.referrals (
    referrer_id,
    attributed_referral_code,
    referred_student_name,
    referred_student_email,
    referred_student_phone
  )
  values (
    actor,
    participant_code,
    normalized_name,
    btrim(p_student_email),
    normalized_phone
  )
  returning * into referral_row;

  insert into public.referral_consents (
    referral_id,
    consent_type,
    policy_version,
    locale,
    consented_by
  )
  values (
    referral_row.id,
    'referrer_permission_to_share_student_details',
    active_policy_version,
    p_locale,
    actor
  );

  insert into public.referral_submission_idempotency (
    participant_id,
    idempotency_key,
    referral_id
  )
  values (actor, p_idempotency_key, referral_row.id);

  for candidate in
    select referral.id
    from public.referrals referral
    where referral.id <> referral_row.id
      and referral.referred_student_email_normalized = normalized_email
  loop
    insert into public.referral_duplicate_review_flags (
      referral_id,
      candidate_referral_id,
      flag_source
    )
    values (referral_row.id, candidate.id, 'automated_check')
    on conflict do nothing;
    review_required := true;
  end loop;

  return jsonb_build_object(
    'reference', referral_row.reference,
    'status', referral_row.admission_status,
    'createdAt', referral_row.created_at,
    'reviewRequired', review_required
  );
end;
$$;

revoke all on function public.submit_participant_referral(
  text, text, text, text, text, boolean, uuid
) from public, anon, service_role;
grant execute on function public.submit_participant_referral(
  text, text, text, text, text, boolean, uuid
) to authenticated;
