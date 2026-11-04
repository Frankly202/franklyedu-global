create function public.bootstrap_referral_participant()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  created boolean := false;
begin
  if actor is null then
    raise exception using
      errcode = '42501',
      message = 'An authenticated user is required.';
  end if;

  insert into public.referral_participants (user_id)
  values (actor)
  on conflict (user_id) do nothing
  returning true into created;

  if created then
    perform public.write_referral_audit_event(
      actor,
      'participant.account_bootstrapped',
      'participant',
      actor::text,
      jsonb_build_object('role', 'participant')
    );
  end if;

  return coalesce(created, false);
end;
$$;

revoke all on function public.bootstrap_referral_participant() from public, anon, service_role;
grant execute on function public.bootstrap_referral_participant() to authenticated;

revoke insert on table public.referral_participants from service_role;
