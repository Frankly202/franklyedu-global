import { createFileRoute } from "@tanstack/react-router";
import { ReferralRecovery } from "@/components/site/ReferralRecovery";
import { getRecoveryAvailability } from "@/lib/referral-recovery.functions";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/referrals_/recovery_/reset")({
  validateSearch: (value: Record<string, unknown>) => ({
    status: value["status"] === "invalid" ? "invalid" : undefined,
  }),
  loader: () => getRecoveryAvailability(),
  head: () => pageMeta("Reset password", "Reset an existing account password.", { noindex: true }),
  component: ResetPage,
});
function ResetPage() {
  return (
    <ReferralRecovery
      reset
      enabled={Route.useLoaderData()}
      invalid={Route.useSearch().status === "invalid"}
    />
  );
}
