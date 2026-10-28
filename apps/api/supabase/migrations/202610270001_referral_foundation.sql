create type public.referral_role as enum ('participant', 'admin');
create type public.referral_admission_status as enum (
  'submitted',
  'contacted',
  'application_in_progress',
  'enrolled',
  'not_eligible',
  'withdrawn'
);
create type public.referral_reward_decision as enum ('pending', 'qualified', 'ineligible');
create type public.referral_duplicate_review_status as enum (
  'pending',
  'confirmed_duplicate',
  'not_duplicate'
);

create table public.referral_participants (
  user_id uuid primary key references auth.users (id) on delete restrict,
  role public.referral_role not null default 'participant',
  referral_code text not null unique
    default upper(replace(gen_random_uuid()::text, '-', '')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, referral_code)
);

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique
    default 'FE-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 24)),
  referrer_id uuid not null references public.referral_participants (user_id) on delete restrict,
  attributed_referral_code text not null,
  referred_student_name text not null check (length(trim(referred_student_name)) between 1 and 200),
  referred_student_email text not null check (length(trim(referred_student_email)) between 3 and 320),
  referred_student_email_normalized text
    generated always as (lower(trim(referred_student_email))) stored,
  referred_student_phone text check (
    referred_student_phone is null or length(trim(referred_student_phone)) between 3 and 40
  ),
  admission_status public.referral_admission_status not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (referrer_id, attributed_referral_code)
    references public.referral_participants (user_id, referral_code) on delete restrict
);

create index referrals_referrer_created_idx
  on public.referrals (referrer_id, created_at desc);
create index referrals_student_email_idx
  on public.referrals (referred_student_email_normalized);

create table public.referral_status_history (
  id bigint generated always as identity primary key,
  referral_id uuid not null references public.referrals (id) on delete restrict,
  previous_status public.referral_admission_status,
  new_status public.referral_admission_status not null,
  changed_by uuid not null references auth.users (id) on delete restrict,
  changed_at timestamptz not null default now(),
  check (previous_status is distinct from new_status)
);

create index referral_status_history_referral_idx
  on public.referral_status_history (referral_id, changed_at desc);

create table public.participant_consents (
  id bigint generated always as identity primary key,
  participant_id uuid not null references public.referral_participants (user_id) on delete restrict,
  consent_type text not null check (consent_type in ('privacy_notice', 'programme_terms')),
  policy_version text not null check (length(trim(policy_version)) between 1 and 80),
  locale text not null check (locale in ('en', 'tr', 'fr', 'sw')),
  consented_at timestamptz not null default now(),
  withdrawn_at timestamptz
);

create index participant_consents_participant_idx
  on public.participant_consents (participant_id, consented_at desc);

create table public.referral_consents (
  id bigint generated always as identity primary key,
  referral_id uuid not null references public.referrals (id) on delete restrict,
  consent_type text not null check (consent_type = 'referrer_permission_to_share_student_details'),
  policy_version text not null check (length(trim(policy_version)) between 1 and 80),
  locale text not null check (locale in ('en', 'tr', 'fr', 'sw')),
  consented_by uuid not null references public.referral_participants (user_id) on delete restrict,
  consented_at timestamptz not null default now(),
  check (consented_by is not null)
);

create index referral_consents_referral_idx
  on public.referral_consents (referral_id, consented_at desc);

create table public.referral_duplicate_review_flags (
  id bigint generated always as identity primary key,
  referral_id uuid not null references public.referrals (id) on delete restrict,
  candidate_referral_id uuid not null references public.referrals (id) on delete restrict,
  review_status public.referral_duplicate_review_status not null default 'pending',
  flag_source text not null check (flag_source in ('automated_check', 'administrator')),
  flagged_at timestamptz not null default now(),
  reviewed_by uuid references auth.users (id) on delete restrict,
  reviewed_at timestamptz,
  check (referral_id <> candidate_referral_id),
  check (
    (review_status = 'pending' and reviewed_by is null and reviewed_at is null)
    or (review_status <> 'pending' and reviewed_by is not null and reviewed_at is not null)
  ),
  unique (referral_id, candidate_referral_id)
);

create index referral_duplicate_review_pending_idx
  on public.referral_duplicate_review_flags (flagged_at)
  where review_status = 'pending';

create table public.referral_reward_qualifications (
  id uuid primary key default gen_random_uuid(),
  referral_id uuid not null unique references public.referrals (id) on delete restrict,
  decision public.referral_reward_decision not null default 'pending',
  reward_amount numeric(6, 2) not null default 170.00 check (reward_amount = 170.00),
  currency text not null default 'EUR' check (currency = 'EUR'),
  reviewed_by uuid references auth.users (id) on delete restrict,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  check (
    (decision = 'pending' and reviewed_by is null and reviewed_at is null)
    or (decision <> 'pending' and reviewed_by is not null and reviewed_at is not null)
  )
);

create table public.referral_reward_payments (
  id uuid primary key default gen_random_uuid(),
  qualification_id uuid not null unique
    references public.referral_reward_qualifications (id) on delete restrict,
  amount numeric(6, 2) not null default 170.00 check (amount = 170.00),
  currency text not null default 'EUR' check (currency = 'EUR'),
  paid_at timestamptz not null,
  recorded_by uuid not null references auth.users (id) on delete restrict,
  internal_reference text check (
    internal_reference is null or length(trim(internal_reference)) <= 120
  ),
  created_at timestamptz not null default now()
);

create function public.enforce_reward_qualification()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.decision <> 'pending' then
    if not exists (
      select 1
      from public.referral_participants p
      where p.user_id = new.reviewed_by and p.role = 'admin'
    ) then
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

create trigger referral_reward_qualification_guard
  before insert or update on public.referral_reward_qualifications
  for each row execute function public.enforce_reward_qualification();

create function public.enforce_reward_payment()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if not exists (
    select 1
    from public.referral_reward_qualifications q
    where q.id = new.qualification_id and q.decision = 'qualified'
  ) then
    raise exception using
      errcode = '23514',
      message = 'Only an authorized qualified reward can be paid.';
  end if;

  if not exists (
    select 1
    from public.referral_participants p
    where p.user_id = new.recorded_by and p.role = 'admin'
  ) then
    raise exception using
      errcode = '23514',
      message = 'Payment records require an authorized administrator.';
  end if;

  return new;
end;
$$;

create trigger referral_reward_payment_guard
  before insert or update on public.referral_reward_payments
  for each row execute function public.enforce_reward_payment();

create table public.referral_audit_events (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users (id) on delete restrict,
  event_type text not null check (length(trim(event_type)) between 1 and 100),
  entity_type text not null check (
    entity_type in (
      'participant',
      'referral',
      'duplicate_review',
      'reward_qualification',
      'reward_payment'
    )
  ),
  entity_id text not null check (length(trim(entity_id)) between 1 and 80),
  occurred_at timestamptz not null default now(),
  changes jsonb not null default '{}'::jsonb check (jsonb_typeof(changes) = 'object')
);

create index referral_audit_events_entity_idx
  on public.referral_audit_events (entity_type, entity_id, occurred_at desc);

create function public.referral_api_health_check()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select true;
$$;

revoke all on function public.referral_api_health_check() from public, anon, authenticated;
grant execute on function public.referral_api_health_check() to service_role;
revoke all on function public.enforce_reward_qualification() from public, anon, authenticated;
revoke all on function public.enforce_reward_payment() from public, anon, authenticated;

alter table public.referral_participants enable row level security;
alter table public.referrals enable row level security;
alter table public.referral_status_history enable row level security;
alter table public.participant_consents enable row level security;
alter table public.referral_consents enable row level security;
alter table public.referral_duplicate_review_flags enable row level security;
alter table public.referral_reward_qualifications enable row level security;
alter table public.referral_reward_payments enable row level security;
alter table public.referral_audit_events enable row level security;

revoke all on table
  public.referral_participants,
  public.referrals,
  public.referral_status_history,
  public.participant_consents,
  public.referral_consents,
  public.referral_duplicate_review_flags,
  public.referral_reward_qualifications,
  public.referral_reward_payments,
  public.referral_audit_events
from public, anon, authenticated;

grant select on public.referral_participants to authenticated;
grant select on public.referrals to authenticated;
grant select on public.referral_status_history to authenticated;
grant select on public.participant_consents to authenticated;
grant select on public.referral_consents to authenticated;
grant select on public.referral_reward_qualifications to authenticated;
grant select on public.referral_reward_payments to authenticated;

grant all on table
  public.referral_participants,
  public.referrals,
  public.referral_status_history,
  public.participant_consents,
  public.referral_consents,
  public.referral_duplicate_review_flags,
  public.referral_reward_qualifications,
  public.referral_reward_payments,
  public.referral_audit_events
to service_role;

revoke update, delete, truncate on table public.referral_audit_events from service_role;

grant usage, select on sequence
  public.referral_status_history_id_seq,
  public.participant_consents_id_seq,
  public.referral_consents_id_seq,
  public.referral_duplicate_review_flags_id_seq,
  public.referral_audit_events_id_seq
to service_role;

create policy referral_participants_select_self
  on public.referral_participants for select to authenticated
  using (user_id = (select auth.uid()));

create policy referrals_select_owner
  on public.referrals for select to authenticated
  using (referrer_id = (select auth.uid()));

create policy referral_status_history_select_owner
  on public.referral_status_history for select to authenticated
  using (
    exists (
      select 1
      from public.referrals r
      where r.id = referral_id and r.referrer_id = (select auth.uid())
    )
  );

create policy participant_consents_select_owner
  on public.participant_consents for select to authenticated
  using (participant_id = (select auth.uid()));

create policy referral_consents_select_owner
  on public.referral_consents for select to authenticated
  using (
    exists (
      select 1
      from public.referrals r
      where r.id = referral_id and r.referrer_id = (select auth.uid())
    )
  );

create policy referral_reward_qualifications_select_owner
  on public.referral_reward_qualifications for select to authenticated
  using (
    exists (
      select 1
      from public.referrals r
      where r.id = referral_id and r.referrer_id = (select auth.uid())
    )
  );

create policy referral_reward_payments_select_owner
  on public.referral_reward_payments for select to authenticated
  using (
    exists (
      select 1
      from public.referral_reward_qualifications q
      join public.referrals r on r.id = q.referral_id
      where q.id = qualification_id and r.referrer_id = (select auth.uid())
    )
  );
