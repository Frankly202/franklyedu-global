import { createFileRoute } from "@tanstack/react-router";
import { ReferralLogin } from "@/components/site/ReferralLogin";
import { pageMeta } from "@/lib/seo";
import { getReferralAuthState } from "@/lib/referral-auth.functions";

export const Route = createFileRoute("/login")({
  loader: () => getReferralAuthState(),
  head: () =>
    pageMeta(
      "Referral Programme Login",
      "Sign in with an existing account for the FranklyEdu Global Student Referral Programme. Registration remains unavailable.",
      { path: "/login", noindex: true },
    ),
  component: LoginPage,
});

function LoginPage() {
  const initialState = Route.useLoaderData();
  return <ReferralLogin initialState={initialState} />;
}
