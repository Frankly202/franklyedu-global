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
        subtitle={referral.authUnavailable.description}
      />
      <Section className="py-8 sm:py-12 lg:py-16">
        <div
          data-referral-panel
          className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8"
        >
          <p
            id="registration-status"
            role="status"
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {referral.registration.preview}
          </p>
          <form
            className="mt-5"
            aria-describedby="registration-status"
            onSubmit={(event) => event.preventDefault()}
          >
            <fieldset disabled className="grid min-w-0 gap-4">
              <legend className="sr-only">{common.nav.signup}</legend>
              {[
                { id: "registration-email", label: referral.authForm.email, type: "email" },
                {
                  id: "registration-password",
                  label: referral.authForm.password,
                  type: "password",
                },
                {
                  id: "registration-confirm",
                  label: referral.registration.confirmPassword,
                  type: "password",
                },
              ].map(({ id, label, type }) => (
                <label key={id} htmlFor={id} className="grid min-w-0 gap-2 text-sm font-medium">
                  {label}
                  <input
                    id={id}
                    type={type}
                    autoComplete={type === "email" ? "email" : "new-password"}
                    className="min-h-11 w-full min-w-0 rounded-lg border border-border bg-muted px-3 text-base"
                  />
                </label>
              ))}
              <button
                type="submit"
                className="btn btn-primary min-h-11 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {referral.registration.submit}
              </button>
            </fieldset>
          </form>
          <div className="mt-5 grid gap-2 text-sm font-semibold sm:mt-6">
            <Link
              to="/login"
              className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
            >
              {referral.landing.login}
            </Link>
            <Link
              to="/referrals"
              className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
            >
              {referral.authUnavailable.returnToProgramme}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
