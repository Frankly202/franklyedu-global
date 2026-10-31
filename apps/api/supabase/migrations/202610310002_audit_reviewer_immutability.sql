drop trigger referral_audit_duplicate_flag_review
  on public.referral_duplicate_review_flags;

create trigger referral_audit_duplicate_flag_review
  after update of review_status, reviewed_by, reviewed_at
  on public.referral_duplicate_review_flags
  for each row
  when (
    old.review_status is distinct from new.review_status
    or old.reviewed_by is distinct from new.reviewed_by
    or old.reviewed_at is distinct from new.reviewed_at
  )
  execute function public.audit_duplicate_review_flag();
