begin;

drop table public.referral_audit_events;
drop table public.referral_reward_payments;
drop table public.referral_reward_qualifications;
drop table public.referral_duplicate_review_flags;
drop table public.referral_consents;
drop table public.participant_consents;
drop table public.referral_status_history;
drop table public.referrals;
drop table public.referral_participants;

drop function public.enforce_reward_payment();
drop function public.enforce_reward_qualification();
drop function public.referral_api_health_check();

drop type public.referral_duplicate_review_status;
drop type public.referral_reward_decision;
drop type public.referral_admission_status;
drop type public.referral_role;

commit;
