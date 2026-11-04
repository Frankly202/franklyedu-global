import { Link } from "@tanstack/react-router";
import { useTranslations } from "@/data/translations";
import { PageHero, Section } from "./Section";

export function ReferralAuthUnavailable({ mode }: { mode: "login" | "signup" }) {
  const { common, referral } = useTranslations();
  const title =
    mode === "login" ? referral.authUnavailable.loginTitle : referral.authUnavailable.signupTitle;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: mode === "login" ? common.nav.login : common.nav.signup }]}
        eyebrow={referral.landing.eyebrow}
        title={title}
        subtitle={referral.authUnavailable.description}
      />
      <Section className="py-8 sm:py-12 lg:py-16">
        <div
          data-referral-panel
          className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-white p-4 text-center shadow-sm sm:p-6 lg:p-8"
        >
          <p
            role="status"
            className="break-words text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {referral.landing.status}
          </p>
          <Link
            to="/referrals"
            className="btn btn-primary mt-5 min-h-11 w-full justify-center sm:mt-6"
          >
            {referral.authUnavailable.returnToProgramme}
          </Link>
        </div>
      </Section>
    </>
  );
}
