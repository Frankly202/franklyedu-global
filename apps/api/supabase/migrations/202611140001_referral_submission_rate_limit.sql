create table public.referral_submission_rate_limits (
  participant_id uuid primary key
    references public.referral_participants (user_id)
    on delete restrict,
  window_started_at timestamptz not null default now(),
  submission_count integer not null check (submission_count > 0)
);

alter table public.referral_submission_rate_limits enable row level security;
revoke all on public.referral_submission_rate_limits
  from public, anon, authenticated, service_role;

create function public.enforce_referral_submission_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  attempt_count integer;
begin
  if actor is null then
    return new;
  end if;

  if new.referrer_id is distinct from actor then
    raise exception using
      errcode = '42501',
      message = 'Referral attribution does not match the authenticated participant.';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('referral-submission-rate:' || actor::text, 0)
  );

  insert into public.referral_submission_rate_limits as current_limit (
    participant_id,
    window_started_at,
    submission_count
  )
  values (actor, now(), 1)
  on conflict (participant_id) do update
  set window_started_at = case
        when current_limit.window_started_at <= now() - interval '15 minutes'
          then now()
        else current_limit.window_started_at
      end,
      submission_count = case
        when current_limit.window_started_at <= now() - interval '15 minutes'
          then 1
        else least(current_limit.submission_count + 1, 6)
      end
  returning submission_count into attempt_count;

  if attempt_count > 5 then
    raise exception using
      errcode = 'P1104',
      message = 'Participant referral submission rate limit exceeded.';
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_referral_submission_rate_limit()
  from public, anon, authenticated, service_role;

create trigger referral_submission_rate_limit
  before insert on public.referrals
  for each row execute function public.enforce_referral_submission_rate_limit();
