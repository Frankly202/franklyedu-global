create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(24);

select extensions.has_table('public', 'referral_participants', 'participant table exists');
select extensions.has_table('public', 'referrals', 'referral table exists');
select extensions.has_table('public', 'referral_status_history', 'status history table exists');
select extensions.has_table('public', 'participant_consents', 'participant consent table exists');
select extensions.has_table('public', 'referral_consents', 'referral consent table exists');
select extensions.has_table(
  'public',
  'referral_duplicate_review_flags',
  'duplicate review table exists'
);
select extensions.has_table(
  'public',
  'referral_reward_qualifications',
  'reward qualification table exists'
);
select extensions.has_table(
  'public',
  'referral_reward_payments',
  'reward payment table exists'
);
select extensions.has_table('public', 'referral_audit_events', 'audit table exists');

select extensions.ok(
  (select relrowsecurity from pg_class where oid = 'public.referral_participants'::regclass),
  'participant records have row-level security enabled'
);
select extensions.ok(
  (select relrowsecurity from pg_class where oid = 'public.referrals'::regclass),
  'referral records have row-level security enabled'
);
select extensions.ok(
  (select relrowsecurity from pg_class where oid = 'public.referral_audit_events'::regclass),
  'audit records have row-level security enabled'
);
select extensions.ok(
  exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'referrals'
      and policyname = 'referrals_select_owner'
  ),
  'participants can only read referrals allowed by the owner policy'
);
select extensions.ok(
  not has_table_privilege('authenticated', 'public.referrals', 'INSERT'),
  'authenticated browser users cannot insert referral rows directly'
);
select extensions.ok(
  not has_table_privilege('service_role', 'public.referral_audit_events', 'UPDATE'),
  'audit events cannot be updated through the API database role'
);
select extensions.ok(
  not has_table_privilege('service_role', 'public.referral_audit_events', 'DELETE'),
  'audit events cannot be deleted through the API database role'
);
select extensions.ok(
  exists (
    select 1
    from pg_constraint
    where conrelid = 'public.referral_reward_qualifications'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) like '%170.00%'
  ),
  'the qualification amount is constrained to the fixed reward'
);
select extensions.ok(
  exists (
    select 1
    from pg_trigger
    where tgrelid = 'public.referral_reward_qualifications'::regclass
      and tgname = 'referral_reward_qualification_guard'
      and not tgisinternal
  ),
  'qualification changes require the database guard'
);

insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at)
values
  (
    '00000000-0000-4000-8000-000000000001',
    'authenticated',
    'authenticated',
    'referral-test-participant@example.test',
    '',
    now()
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'authenticated',
    'authenticated',
    'referral-test-admin@example.test',
    '',
    now()
  );

insert into public.referral_participants (user_id)
values ('00000000-0000-4000-8000-000000000001');
insert into public.referral_participants (user_id, role)
values ('00000000-0000-4000-8000-000000000002', 'admin');

insert into public.referrals (
  id,
  referrer_id,
  attributed_referral_code,
  referred_student_name,
  referred_student_email,
  admission_status
)
select
  '00000000-0000-4000-8000-000000000003',
  p.user_id,
  p.referral_code,
  'Test Student',
  'referral-test-student@example.test',
  'enrolled'
from public.referral_participants p
where p.user_id = '00000000-0000-4000-8000-000000000001';

select extensions.throws_ok(
  $$
    insert into public.referral_reward_qualifications (
      referral_id, decision, reviewed_by, reviewed_at
    ) values (
      '00000000-0000-4000-8000-000000000003',
      'qualified',
      '00000000-0000-4000-8000-000000000001',
      now()
    )
  $$,
  '23514',
  'Reward decisions require an authorized administrator.',
  'a participant cannot qualify their own reward'
);

select extensions.lives_ok(
  $$
    insert into public.referral_reward_qualifications (
      referral_id, decision, reviewed_by, reviewed_at
    ) values (
      '00000000-0000-4000-8000-000000000003',
      'qualified',
      '00000000-0000-4000-8000-000000000002',
      now()
    )
  $$,
  'an administrator can confirm the fixed reward after enrolment'
);

select extensions.throws_ok(
  $$
    insert into public.referral_reward_payments (
      qualification_id, paid_at, recorded_by
    )
    select id, now(), '00000000-0000-4000-8000-000000000001'
    from public.referral_reward_qualifications
    where referral_id = '00000000-0000-4000-8000-000000000003'
  $$,
  '23514',
  'Payment records require an authorized administrator.',
  'a participant cannot record a reward payment'
);

select extensions.lives_ok(
  $$
    insert into public.referral_reward_payments (
      qualification_id, paid_at, recorded_by
    )
    select id, now(), '00000000-0000-4000-8000-000000000002'
    from public.referral_reward_qualifications
    where referral_id = '00000000-0000-4000-8000-000000000003'
  $$,
  'an administrator can separately record payment for a qualified reward'
);

select extensions.throws_ok(
  $$
    update public.referral_reward_qualifications
    set decision = 'ineligible',
        reviewed_by = '00000000-0000-4000-8000-000000000002',
        reviewed_at = now()
    where referral_id = '00000000-0000-4000-8000-000000000003'
  $$,
  '23514',
  'A paid reward cannot be reverted to an unqualified state.',
  'a paid reward cannot be unqualified'
);

select extensions.throws_ok(
  $$
    insert into public.referral_reward_payments (
      qualification_id, amount, paid_at, recorded_by
    )
    select id, 169.00, now(), '00000000-0000-4000-8000-000000000002'
    from public.referral_reward_qualifications
    where referral_id =     '00000000-0000-4000-8000-000000000003'
  $$,
  '23514',
  null,
  'payment values cannot override the fixed €170 reward'
);

select * from extensions.finish();
rollback;
