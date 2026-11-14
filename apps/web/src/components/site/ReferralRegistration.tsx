import { ArrowRight, CircleHelp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslations } from "@/data/translations";
import { PageHero, Section } from "./Section";

export function ReferralRegistration() {
  const { common, referral } = useTranslations();
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: common.nav.signup }]}
        eyebrow={referral.landing.eyebrow}
        title={referral.authUnavailable.signupTitle}
      />
      <Section className="py-8 sm:py-12 lg:py-16">
        <div
          data-referral-panel
          className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-white p-5 shadow-panel sm:p-8 lg:p-10"
        >
          <p
            id="registration-status"
            data-referral-registration-closed
            role="status"
            className="flex items-start gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950 sm:p-6"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-amber-800 shadow-xs">
              <CircleHelp aria-hidden="true" className="h-5 w-5" />
            </span>
            <span>{referral.registration.preview}</span>
          </p>
          <div className="mt-6 grid gap-3 border-t border-border pt-6 sm:flex sm:flex-wrap">
            <Link
              to="/login"
              className="btn btn-primary min-h-12 w-full justify-center gap-2 sm:w-auto"
            >
              {referral.landing.login}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              to="/referrals"
              className="btn btn-outline-dark min-h-12 w-full justify-center sm:w-auto"
            >
              {referral.authUnavailable.returnToProgramme}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
