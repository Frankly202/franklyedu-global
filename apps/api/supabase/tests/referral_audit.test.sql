create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(34);

select extensions.ok(
  not has_table_privilege('service_role', 'public.referral_audit_events', 'SELECT'),
  'service role cannot read audit events directly'
);
select extensions.ok(
  not has_table_privilege('service_role', 'public.referral_audit_events', 'INSERT'),
  'service role cannot insert audit events directly'
);
select extensions.ok(
  not has_table_privilege('service_role', 'public.referral_audit_events', 'UPDATE'),
  'service role cannot update audit events directly'
);
select extensions.ok(
  not has_table_privilege('service_role', 'public.referral_audit_events', 'DELETE'),
  'service role cannot delete audit events directly'
);
select extensions.ok(
  not has_table_privilege('service_role', 'public.referral_audit_events', 'TRUNCATE'),
  'service role cannot truncate audit events'
);
select extensions.ok(
  not has_table_privilege('authenticated', 'public.referral_audit_events', 'SELECT'),
  'browser users cannot read audit events'
);
select extensions.ok(
  not has_table_privilege('authenticated', 'public.referral_audit_events', 'INSERT'),
  'browser users cannot insert audit events'
);
select extensions.ok(
  not has_function_privilege(
    'service_role',
    'public.write_referral_audit_event(uuid,text,text,text,jsonb)',
    'EXECUTE'
  ),
  'service role cannot call the audit writer directly'
);

insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at)
values
  ('00000000-0000-4000-8000-000000000101', 'authenticated', 'authenticated', 'audit-p1@example.test', '', now()),
  ('00000000-0000-4000-8000-000000000102', 'authenticated', 'authenticated', 'audit-admin@example.test', '', now()),
  ('00000000-0000-4000-8000-000000000103', 'authenticated', 'authenticated', 'audit-admin2@example.test', '', now()),
  ('00000000-0000-4000-8000-000000000106', 'authenticated', 'authenticated', 'audit-p2@example.test', '', now());

insert into public.referral_participants (user_id)
values
  ('00000000-0000-4000-8000-000000000101'),
  ('00000000-0000-4000-8000-000000000106');
insert into public.referral_participants (user_id, role)
values
  ('00000000-0000-4000-8000-000000000102', 'admin'),
  ('00000000-0000-4000-8000-000000000103', 'admin');

set local role service_role;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000101', true);

insert into public.referrals (
  id,
  referrer_id,
  attributed_referral_code,
  referred_student_name,
  referred_student_email
)
select
  '00000000-0000-4000-8000-000000000104',
  p.user_id,
  p.referral_code,
  'Audit Test Student',
  'audit-student@example.test'
from public.referral_participants p
where p.user_id = '00000000-0000-4000-8000-000000000101';

reset role;
select extensions.is(
  (select count(*)::integer from public.referral_audit_events
   where event_type = 'referral.created'
     and entity_id = '00000000-0000-4000-8000-000000000104'),
  1,
  'referral creation emits one audit event'
);
select extensions.is(
  (select actor_user_id::text from public.referral_audit_events
   where event_type = 'referral.created'
     and entity_id = '00000000-0000-4000-8000-000000000104'),
  '00000000-0000-4000-8000-000000000101',
  'referral creation is attributed to the authenticated referrer'
);
select extensions.is(
  (select changes ? 'referred_student_email' from public.referral_audit_events
   where event_type = 'referral.created'
     and entity_id = '00000000-0000-4000-8000-000000000104'),
  false,
  'referral audit context excludes student contact details'
);

set local role service_role;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000101', true);
select extensions.throws_ok(
  $$insert into public.referrals (
      referrer_id, attributed_referral_code, referred_student_name, referred_student_email
    )
    select '00000000-0000-4000-8000-000000000102', referral_code, 'Spoofed', 'spoofed@example.test'
    from public.referral_participants where user_id = '00000000-0000-4000-8000-000000000102'$$,
  '42501',
  'Referral actor must match the authenticated referrer.',
  'a caller cannot attribute referral creation to another participant'
);

select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000102', true);
update public.referrals
set admission_status = 'contacted'
where id = '00000000-0000-4000-8000-000000000104';

reset role;
select extensions.is(
  (select count(*)::integer from public.referral_status_history
   where referral_id = '00000000-0000-4000-8000-000000000104'),
  1,
  'admission status change creates status history in the same transaction'
);
select extensions.is(
  (select actor_user_id::text from public.referral_audit_events
   where event_type = 'referral.admission_status_changed'
     and entity_id = '00000000-0000-4000-8000-000000000104'),
  '00000000-0000-4000-8000-000000000102',
  'admission status change is attributed to the authenticated administrator'
);
select extensions.is(
  (select changes from public.referral_audit_events
   where event_type = 'referral.admission_status_changed'
     and entity_id = '00000000-0000-4000-8000-000000000104'),
  '{"previous_status":"submitted","new_status":"contacted"}'::jsonb,
  'admission audit records only the status transition'
);

set local role service_role;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000101', true);
select extensions.throws_ok(
  $$update public.referrals set admission_status = 'enrolled'
    where id = '00000000-0000-4000-8000-000000000104'$$,
  '42501',
  'An authenticated administrator is required.',
  'a participant cannot change admission status'
);

select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000101', true);
insert into public.participant_consents (participant_id, consent_type, policy_version, locale)
values ('00000000-0000-4000-8000-000000000101', 'privacy_notice', 'v1', 'en');
reset role;
select extensions.is(
  (select count(*)::integer from public.referral_audit_events
   where event_type = 'participant.consent_recorded'
     and actor_user_id = '00000000-0000-4000-8000-000000000101'),
  1,
  'participant consent creation is audited with the participant actor'
);

set local role service_role;
update public.participant_consents
set withdrawn_at = now()
where participant_id = '00000000-0000-4000-8000-000000000101';
reset role;
select extensions.is(
  (select count(*)::integer from public.referral_audit_events
   where event_type = 'participant.consent_withdrawn'
     and actor_user_id = '00000000-0000-4000-8000-000000000101'),
  1,
  'consent withdrawal is audited'
);

set local role service_role;
insert into public.referral_consents (
  referral_id,
  consent_type,
  policy_version,
  locale,
  consented_by
)
values (
  '00000000-0000-4000-8000-000000000104',
  'referrer_permission_to_share_student_details',
  'v1',
  'en',
  '00000000-0000-4000-8000-000000000101'
);
reset role;
select extensions.is(
  (select count(*)::integer from public.referral_audit_events
   where event_type = 'referral.consent_recorded'
     and actor_user_id = '00000000-0000-4000-8000-000000000101'),
  1,
  'referral consent creation is audited with the authenticated participant'
);

set local role service_role;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000101', true);
insert into public.referrals (
  id,
  referrer_id,
  attributed_referral_code,
  referred_student_name,
  referred_student_email
)
select
  '00000000-0000-4000-8000-000000000105',
  p.user_id,
  p.referral_code,
  'Audit Candidate',
  'audit-candidate@example.test'
from public.referral_participants p
where p.user_id = '00000000-0000-4000-8000-000000000101';
reset role;

set local role service_role;
select set_config('request.jwt.claim.sub', '', true);
insert into public.referral_duplicate_review_flags (
  referral_id, candidate_referral_id, flag_source
)
values (
  '00000000-0000-4000-8000-000000000104',
  '00000000-0000-4000-8000-000000000105',
  'automated_check'
);
reset role;
select extensions.is(
  (select actor_user_id::text from public.referral_audit_events
   where event_type = 'duplicate.flagged_automatically'
     and entity_type = 'duplicate_review'),
  null,
  'automated duplicate flags have no fabricated user actor'
);

set local role service_role;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000102', true);
select extensions.throws_ok(
  $$update public.referral_duplicate_review_flags
    set review_status = 'confirmed_duplicate',
        reviewed_by = '00000000-0000-4000-8000-000000000103',
        reviewed_at = now()
    where referral_id = '00000000-0000-4000-8000-000000000104'$$,
  '42501',
  'An authenticated administrator is required.',
  'a reviewer cannot attribute a duplicate decision to another administrator'
);

set local role service_role;
update public.referral_duplicate_review_flags
set review_status = 'confirmed_duplicate',
    reviewed_by = '00000000-0000-4000-8000-000000000102',
    reviewed_at = now()
where referral_id = '00000000-0000-4000-8000-000000000104';
reset role;
select extensions.is(
  (select actor_user_id::text from public.referral_audit_events
   where event_type = 'duplicate.reviewed'
     and entity_type = 'duplicate_review'),
  '00000000-0000-4000-8000-000000000102',
  'duplicate review is attributed to the authenticated administrator'
);
set local role service_role;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000102', true);
select extensions.throws_ok(
  $$update public.referral_duplicate_review_flags
    set reviewed_at = reviewed_at + interval '1 minute'
    where referral_id = '00000000-0000-4000-8000-000000000104'$$,
  '42501',
  'Duplicate flags may only receive one authenticated administrator review.',
  'review actor and time cannot be rewritten after review'
);
reset role;
select extensions.is(
  (select count(*)::integer from public.referral_audit_events
   where event_type = 'duplicate.reviewed'
     and entity_type = 'duplicate_review'),
  1,
  'rejected reviewer edits do not create extra audit events'
);

set local role service_role;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000102', true);
update public.referrals
set admission_status = 'enrolled'
where id = '00000000-0000-4000-8000-000000000104';
insert into public.referral_reward_qualifications (
  referral_id, decision, reviewed_by, reviewed_at
)
values (
  '00000000-0000-4000-8000-000000000104',
  'qualified',
  '00000000-0000-4000-8000-000000000102',
  now()
);
reset role;
select extensions.is(
  (select actor_user_id::text from public.referral_audit_events
   where event_type = 'reward.qualification_decided'
     and entity_type = 'reward_qualification'),
  '00000000-0000-4000-8000-000000000102',
  'reward qualification is audited with the authenticated administrator'
);

set local role service_role;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000102', true);
select extensions.throws_ok(
  $$insert into public.referral_reward_payments (
      qualification_id, paid_at, recorded_by
    )
    select id, now(), '00000000-0000-4000-8000-000000000103'
    from public.referral_reward_qualifications
    where referral_id = '00000000-0000-4000-8000-000000000104'$$,
  '23514',
  'Payment records require an authorized administrator.',
  'a payment actor must match the authenticated administrator'
);
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000102', true);
insert into public.referral_reward_payments (
  qualification_id, paid_at, recorded_by
)
select id, now(), '00000000-0000-4000-8000-000000000102'
from public.referral_reward_qualifications
where referral_id = '00000000-0000-4000-8000-000000000104';
reset role;
select extensions.is(
  (select actor_user_id::text from public.referral_audit_events
   where event_type = 'reward.payment_recorded'
     and entity_type = 'reward_payment'),
  '00000000-0000-4000-8000-000000000102',
  'payment recording is audited with the authenticated administrator'
);

set local role service_role;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000106', true);
select extensions.throws_ok(
  $$update public.referral_participants set role = 'admin'
    where user_id = '00000000-0000-4000-8000-000000000101'$$,
  '42501',
  'An authenticated administrator is required.',
  'a participant cannot change another participant role'
);

select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000102', true);
update public.referral_participants
set role = 'admin'
where user_id = '00000000-0000-4000-8000-000000000101';
reset role;
select extensions.is(
  (select actor_user_id::text from public.referral_audit_events
   where event_type = 'participant.role_changed'
     and entity_id = '00000000-0000-4000-8000-000000000101'),
  '00000000-0000-4000-8000-000000000102',
  'role changes are attributed to the authenticated administrator'
);

set local role service_role;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000101', true);
do $$
begin
  begin
    insert into public.participant_consents (
      participant_id, consent_type, policy_version, locale
    )
    values (
      '00000000-0000-4000-8000-000000000101',
      'programme_terms',
      'rollback-check',
      'en'
    );
    raise exception 'intentional audit rollback';
  exception
    when raise_exception then
      if sqlerrm <> 'intentional audit rollback' then
        raise;
      end if;
  end;
end;
$$;
reset role;
select extensions.is(
  (select count(*)::integer from public.participant_consents
   where policy_version = 'rollback-check'),
  0,
  'rolled-back consent operation leaves no business row'
);
select extensions.is(
  (select count(*)::integer from public.referral_audit_events
   where event_type = 'participant.consent_recorded'
     and changes ->> 'policy_version' = 'rollback-check'),
  0,
  'rolled-back consent operation leaves no audit event'
);

set local role service_role;
select extensions.throws_ok(
  'update public.referral_audit_events set changes = changes where false',
  '42501',
  null,
  'service role cannot update audit history'
);
select extensions.throws_ok(
  'delete from public.referral_audit_events where false',
  '42501',
  null,
  'service role cannot delete audit history'
);
select extensions.throws_ok(
  'truncate public.referral_audit_events',
  '42501',
  null,
  'service role cannot truncate audit history'
);
reset role;

select * from extensions.finish();
rollback;
