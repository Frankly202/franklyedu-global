create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(18);

insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at)
values
  ('00000000-0000-4000-8000-000000000801', 'authenticated', 'authenticated', 'bootstrap-one@example.test', '', now()),
  ('00000000-0000-4000-8000-000000000802', 'authenticated', 'authenticated', 'bootstrap-two@example.test', '', now()),
  ('00000000-0000-4000-8000-000000000803', 'authenticated', 'authenticated', 'bootstrap-admin@example.test', '', now());
insert into public.referral_participants (user_id, role)
values ('00000000-0000-4000-8000-000000000803', 'admin');

select extensions.ok(
  has_function_privilege('authenticated', 'public.bootstrap_referral_participant()', 'EXECUTE'),
  'authenticated users can invoke the bootstrap'
);
select extensions.ok(
  not has_function_privilege('anon', 'public.bootstrap_referral_participant()', 'EXECUTE'),
  'anonymous users cannot invoke the bootstrap'
);
select extensions.ok(
  not has_function_privilege('service_role', 'public.bootstrap_referral_participant()', 'EXECUTE'),
  'service role cannot invoke the bootstrap directly'
);
select extensions.ok(
  not has_table_privilege('service_role', 'public.referral_participants', 'INSERT'),
  'service role cannot bypass the participant bootstrap'
);

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000801', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select extensions.is(
  public.bootstrap_referral_participant(),
  true,
  'first authenticated call creates the participant'
);
select extensions.is(
  public.bootstrap_referral_participant(),
  false,
  'repeat call is idempotent'
);
reset role;

select extensions.is(
  (select role::text from public.referral_participants
   where user_id = '00000000-0000-4000-8000-000000000801'),
  'participant',
  'bootstrap can only assign participant role'
);
select extensions.is(
  (select count(*)::integer from public.referral_participants
   where user_id = '00000000-0000-4000-8000-000000000801'),
  1,
  'exactly one participant row is created'
);
select extensions.is(
  (select count(*)::integer from public.referral_audit_events
   where actor_user_id = '00000000-0000-4000-8000-000000000801'
     and event_type = 'participant.account_bootstrapped'
     and entity_id = '00000000-0000-4000-8000-000000000801'),
  1,
  'bootstrap and audit event are committed together once'
);
select extensions.is(
  (select changes from public.referral_audit_events
   where event_type = 'participant.account_bootstrapped'
     and entity_id = '00000000-0000-4000-8000-000000000801'),
  '{"role":"participant"}'::jsonb,
  'audit event records minimal non-sensitive change context'
);

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000801', true);
select extensions.is(
  (select count(*)::integer from public.referral_participants),
  1,
  'RLS reveals only the authenticated participant row'
);
reset role;

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000803', true);
select extensions.is(
  public.bootstrap_referral_participant(),
  false,
  'bootstrap does not recreate an existing account'
);
reset role;
select extensions.is(
  (select role::text from public.referral_participants
   where user_id = '00000000-0000-4000-8000-000000000803'),
  'admin',
  'repeat bootstrap never downgrades an existing administrator'
);

set local role authenticated;
select set_config('request.jwt.claim.sub', '', true);
select extensions.throws_ok(
  $$select public.bootstrap_referral_participant()$$,
  '42501',
  'An authenticated user is required.',
  'missing trusted actor is rejected'
);
reset role;

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000802', true);
select extensions.throws_ok(
  $$insert into public.referral_participants (user_id)
    values ('00000000-0000-4000-8000-000000000802')$$,
  '42501',
  'permission denied for table referral_participants',
  'authenticated users cannot directly insert participant rows'
);
reset role;

savepoint participant_bootstrap_rollback;
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000802', true);
select public.bootstrap_referral_participant();
rollback to savepoint participant_bootstrap_rollback;
reset role;
select extensions.ok(true, 'surrounding transaction rollback completes after bootstrap');
select extensions.is(
  (select count(*)::integer from public.referral_participants
   where user_id = '00000000-0000-4000-8000-000000000802'),
  0,
  'rolled-back bootstrap leaves no participant row'
);
select extensions.is(
  (select count(*)::integer from public.referral_audit_events
   where entity_id = '00000000-0000-4000-8000-000000000802'
     and event_type = 'participant.account_bootstrapped'),
  0,
  'rolled-back bootstrap leaves no audit event'
);

rollback;
