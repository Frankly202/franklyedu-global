import { createFileRoute } from "@tanstack/react-router";
import { ReferralRegistration } from "@/components/site/ReferralRegistration";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/signup")({
  head: () =>
    pageMeta(
      "Referral Programme Registration",
      "Registration for the FranklyEdu Global Student Referral Programme is not yet available.",
      { path: "/signup", noindex: true },
    ),
  component: ReferralRegistration,
});
