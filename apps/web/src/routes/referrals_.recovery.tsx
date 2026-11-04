import { createFileRoute } from "@tanstack/react-router";
import { ReferralRecovery } from "@/components/site/ReferralRecovery";
import { getRecoveryAvailability } from "@/lib/referral-recovery.functions";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/referrals_/recovery")({
  loader: () => getRecoveryAvailability(),
  head: () =>
    pageMeta("Account recovery", "Recover access to an existing account.", { noindex: true }),
  component: RecoveryPage,
});
function RecoveryPage() {
  return <ReferralRecovery enabled={Route.useLoaderData()} />;
}
