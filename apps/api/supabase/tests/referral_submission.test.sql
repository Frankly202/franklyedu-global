create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(27);

select extensions.has_table(
  'public',
  'referral_submission_policies',
  'localized consent policies have a controlled version table'
);
select extensions.has_table(
  'public',
  'referral_submission_rate_limits',
  'participant-scoped submission limits are persisted in a private table'
);
select extensions.ok(
  not has_table_privilege('authenticated', 'public.referral_submission_policies', 'SELECT')
    and not has_table_privilege('authenticated', 'public.referral_submission_policies', 'INSERT')
    and not has_table_privilege('service_role', 'public.referral_submission_policies', 'SELECT'),
  'consent policy copy is exposed only through the authenticated policy function'
);
select extensions.ok(
  (select relrowsecurity from pg_class
   where oid = 'public.referral_submission_policies'::regclass)
  and (select relrowsecurity from pg_class
   where oid = 'public.referral_submission_idempotency'::regclass),
  'policy and idempotency records have row-level security enabled'
);
select extensions.ok(
  not has_table_privilege('authenticated', 'public.referral_submission_idempotency', 'SELECT')
    and not has_table_privilege('authenticated', 'public.referral_submission_idempotency', 'INSERT'),
  'participants cannot read or write idempotency records directly'
);
select extensions.ok(
  (select relrowsecurity from pg_class
   where oid = 'public.referral_submission_rate_limits'::regclass)
    and not has_table_privilege('authenticated', 'public.referral_submission_rate_limits', 'SELECT')
    and not has_table_privilege('authenticated', 'public.referral_submission_rate_limits', 'INSERT')
    and not has_table_privilege('service_role', 'public.referral_submission_rate_limits', 'SELECT')
    and not has_function_privilege(
      'authenticated',
      'public.enforce_referral_submission_rate_limit()',
      'EXECUTE'
    ),
  'rate-limit counters and trigger function are not directly accessible'
);
select extensions.ok(
  has_function_privilege(
    'authenticated',
    'public.submit_participant_referral(text,text,text,text,text,boolean,uuid)',
    'EXECUTE'
  )
  and not has_function_privilege(
    'anon',
    'public.submit_participant_referral(text,text,text,text,text,boolean,uuid)',
    'EXECUTE'
  ),
  'only authenticated users can call the atomic submission function'
);

insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at)
values
  ('00000000-0000-4000-8000-000000000201', 'authenticated', 'authenticated', 'submission-p1@example.test', '', now()),
  ('00000000-0000-4000-8000-000000000202', 'authenticated', 'authenticated', 'submission-p2@example.test', '', now());
insert into public.referral_participants (user_id)
values
  ('00000000-0000-4000-8000-000000000201'),
  ('00000000-0000-4000-8000-000000000202');

insert into public.referral_submission_policies (
  locale, policy_version, notice_text, consent_text, is_active
)
values (
  'en',
  'test-fixture-only',
  'Synthetic test fixture only. It is not approved notice wording.',
  'Synthetic test fixture only. It is not approved consent wording.',
  true
);

select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000201', true);
select extensions.is(
  (select count(*)::integer
   from public.get_active_referral_submission_policy('en')),
  1,
  'an authenticated participant can retrieve only the active localized policy'
);
select extensions.is(
  (select count(*)::integer
   from public.get_active_referral_submission_policy('tr')),
  0,
  'a missing localized policy remains unavailable'
);

select extensions.throws_ok(
  $$select public.submit_participant_referral(
    'Synthetic Student', 'student@example.test', null, 'en', 'test-fixture-only',
    false, '00000000-0000-4000-8000-000000000301'
  )$$,
  '22023',
  'A valid submission and explicit consent are required.',
  'the submission requires explicit consent'
);
select extensions.throws_ok(
  $$select public.submit_participant_referral(
    'Synthetic Student', 'student@example.test', null, 'en', 'wrong-version',
    true, '00000000-0000-4000-8000-000000000302'
  )$$,
  'P1103',
  'The consent notice changed; reload it before submitting.',
  'a stale consent version cannot be submitted'
);
select extensions.throws_ok(
  $$select public.submit_participant_referral(
    'Synthetic Student', 'student@example.test', null, 'tr', 'test-fixture-only',
    true, '00000000-0000-4000-8000-000000000303'
  )$$,
  'P1101',
  'Referral submissions are not available.',
  'submission stays disabled when the selected locale has no active policy'
);
select extensions.is(
  (select count(*)::integer
   from public.referrals
   where referred_student_email_normalized = 'student@example.test'),
  0,
  'rejected submissions leave no referral rows behind'
);

select public.submit_participant_referral(
  '  Synthetic   Student  ',
  ' Student@Example.test ',
  ' +1 555 0100 ',
  'en',
  'test-fixture-only',
  true,
  '00000000-0000-4000-8000-000000000304'
);

select extensions.is(
  (select count(*)::integer
   from public.referrals
   where referrer_id = '00000000-0000-4000-8000-000000000201'
     and referred_student_name = 'Synthetic Student'
     and referred_student_email = 'Student@Example.test'
     and referred_student_phone = '+1 555 0100'),
  1,
  'submission normalizes name and optional phone and trims email'
);
select extensions.is(
  (select count(*)::integer
   from public.referral_consents consent
   join public.referrals referral on referral.id = consent.referral_id
   where referral.referrer_id = '00000000-0000-4000-8000-000000000201'
     and consent.consented_by = referral.referrer_id
     and consent.policy_version = 'test-fixture-only'
     and consent.locale = 'en'),
  1,
  'consent evidence is linked to the referral and authenticated actor'
);
select extensions.is(
  (select count(*)::integer
   from public.referral_submission_idempotency
   where participant_id = '00000000-0000-4000-8000-000000000201'
     and idempotency_key = '00000000-0000-4000-8000-000000000304'),
  1,
  'submission and participant-scoped idempotency record commit together'
);
select extensions.is(
  (select count(*)::integer
   from public.referral_audit_events
   where event_type in ('referral.created', 'referral.consent_recorded')
     and entity_id = (select id::text from public.referrals
       where referrer_id = '00000000-0000-4000-8000-000000000201'
       order by created_at desc limit 1)),
  2,
  'referral and consent audit events are emitted in the same transaction'
);
select extensions.is(
  (select changes ? 'referred_student_email' or changes ? 'referred_student_name'
   from public.referral_audit_events
   where event_type = 'referral.created'
   order by occurred_at desc limit 1),
  false,
  'audit event context excludes student personal details'
);

select extensions.is(
  (
    select public.submit_participant_referral(
      'Synthetic Student',
      'Student@Example.test',
      '+1 555 0100',
      'en',
      'test-fixture-only',
      true,
      '00000000-0000-4000-8000-000000000304'
    ) ->> 'reference'
  ),
  (
    select reference
    from public.referrals
    where referrer_id = '00000000-0000-4000-8000-000000000201'
      and referred_student_email_normalized = 'student@example.test'
  ),
  'same-payload retry returns the original referral reference'
);

select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000202', true);
select public.submit_participant_referral(
  'Synthetic Student',
  'student@example.TEST',
  null,
  'en',
  'test-fixture-only',
  true,
  '00000000-0000-4000-8000-000000000304'
);
select extensions.is(
  (select count(*)::integer
   from public.referral_duplicate_review_flags flag
   join public.referrals current_referral on current_referral.id = flag.referral_id
   join public.referrals candidate on candidate.id = flag.candidate_referral_id
   where current_referral.referrer_id = '00000000-0000-4000-8000-000000000202'
     and candidate.referrer_id = '00000000-0000-4000-8000-000000000201'
     and flag.flag_source = 'automated_check'
     and flag.review_status = 'pending'),
  1,
  'an exact normalized-email match is flagged for administrator review'
);
select extensions.is(
  (select count(*)::integer
   from public.referral_submission_idempotency
   where idempotency_key = '00000000-0000-4000-8000-000000000304'),
  2,
  'the same idempotency key is independent across participants'
);
select extensions.ok(
  exists (
    select 1
    from public.referral_audit_events
    where event_type = 'duplicate.flagged_automatically'
      and actor_user_id is null
  ),
  'automated duplicate flags emit actorless audit events'
);

select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000201', true);
select extensions.throws_ok(
  $$select public.submit_participant_referral(
    'Different Student', 'different@example.test', null, 'en', 'test-fixture-only',
    true, '00000000-0000-4000-8000-000000000304'
  )$$,
  'P1102',
  'The idempotency key was already used for a different submission.',
  'reusing an idempotency key with changed fields is rejected'
);

select extensions.is(
  (select count(*)::integer
   from public.referrals
   where referred_student_email_normalized = 'student@example.test'),
  2,
  'same-key retries do not create an additional referral'
);

insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at)
values (
  '00000000-0000-4000-8000-000000000203',
  'authenticated',
  'authenticated',
  'submission-p3@example.test',
  '',
  now()
);
insert into public.referral_participants (user_id)
values ('00000000-0000-4000-8000-000000000203');
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000203', true);
do $$
declare
  attempt integer;
begin
  for attempt in 1..5 loop
    perform public.submit_participant_referral(
      format('Rate Limit Student %s', attempt),
      format('rate-limit-%s@example.test', attempt),
      null,
      'en',
      'test-fixture-only',
      true,
      ('00000000-0000-4000-8000-' || lpad((310 + attempt)::text, 12, '0'))::uuid
    );
  end loop;
end;
$$;
select extensions.throws_ok(
  $$select public.submit_participant_referral(
    'Rate Limit Student 6',
    'rate-limit-6@example.test',
    null,
    'en',
    'test-fixture-only',
    true,
    '00000000-0000-4000-8000-000000000316'
  )$$,
  'P1104',
  'Participant referral submission rate limit exceeded.',
  'the database enforces a participant-scoped submission limit'
);
select extensions.is(
  (select count(*)::integer
   from public.referrals
   where referrer_id = '00000000-0000-4000-8000-000000000203'),
  5,
  'a rate-limited submission creates no referral'
);
select extensions.is(
  (select submission_count
   from public.referral_submission_rate_limits
   where participant_id = '00000000-0000-4000-8000-000000000203'),
  5,
  'the committed participant window records only accepted submissions'
);

select * from extensions.finish();
rollback;
