import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "@/data/translations";
import { logInReferral, logOutReferral } from "@/lib/referral-auth.functions";
import { PageHero, Section } from "./Section";

type ReferralAuthState = "signed-in" | "signed-out" | "unavailable";

export function ReferralLogin({ initialState }: { initialState: ReferralAuthState }) {
  const { common, referral } = useTranslations();
  const [authState, setAuthState] = useState(initialState);
  const [message, setMessage] = useState<"invalid" | "unavailable" | null>(
    initialState === "unavailable" ? "unavailable" : null,
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const login = useServerFn(logInReferral);
  const logout = useServerFn(logOutReferral);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await login({
        data: {
          email: String(formData.get("email") ?? ""),
          password: String(formData.get("password") ?? ""),
        },
      });
      if (result === "signed-in") {
        setAuthState("signed-in");
      } else {
        setMessage(result === "signed-out" ? "invalid" : "unavailable");
      }
    } catch {
      setMessage("unavailable");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    setMessage(null);
    setIsSubmitting(true);
    try {
      const result = await logout();
      if (result === "signed-out") setAuthState("signed-out");
      else setMessage("unavailable");
    } catch {
      setMessage("unavailable");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: common.nav.login }]}
        eyebrow={referral.landing.eyebrow}
        title={referral.authUnavailable.loginTitle}
        subtitle={referral.authForm.description}
      />
      <Section className="py-8 sm:py-12 lg:py-16">
        <div
          data-referral-panel
          className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8"
        >
          {authState === "signed-in" ? (
            <div className="grid gap-5">
              <p className="text-sm leading-relaxed text-muted-foreground" role="status">
                {referral.authForm.signedIn}
              </p>
              <button
                type="button"
                className="btn btn-primary min-h-11 w-full"
                disabled={isSubmitting}
                onClick={handleLogout}
              >
                {referral.authForm.signOut}
              </button>
            </div>
          ) : (
            <form className="grid gap-4 sm:gap-5" onSubmit={handleLogin}>
              <label htmlFor="referral-login-email" className="grid gap-2 text-sm font-medium">
                {referral.authForm.email}
                <input
                  id="referral-login-email"
                  autoComplete="username"
                  className="min-h-11 w-full min-w-0 rounded-lg border border-border px-3 text-base"
                  maxLength={254}
                  name="email"
                  required
                  type="email"
                />
              </label>
              <label htmlFor="referral-login-password" className="grid gap-2 text-sm font-medium">
                {referral.authForm.password}
                <span className="relative block min-w-0">
                  <input
                    id="referral-login-password"
                    autoComplete="current-password"
                    className="min-h-11 w-full min-w-0 rounded-lg border border-border px-3 pr-12 text-base"
                    maxLength={256}
                    name="password"
                    required
                    type={passwordVisible ? "text" : "password"}
                  />
                  <button
                    type="button"
                    aria-label={
                      passwordVisible
                        ? referral.authForm.hidePassword
                        : referral.authForm.showPassword
                    }
                    aria-controls="referral-login-password"
                    aria-pressed={passwordVisible}
                    className="absolute inset-y-0 right-1 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                    onClick={() => setPasswordVisible((visible) => !visible)}
                  >
                    {passwordVisible ? (
                      <EyeOff aria-hidden="true" size={20} />
                    ) : (
                      <Eye aria-hidden="true" size={20} />
                    )}
                  </button>
                </span>
              </label>
              {message && (
                <p className="text-sm text-red-700" role="alert">
                  {message === "invalid"
                    ? referral.authForm.invalidCredentials
                    : referral.authForm.unavailable}
                </p>
              )}
              <button
                type="submit"
                className="btn btn-primary min-h-11 w-full justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? referral.authForm.submitting : referral.authForm.submit}
              </button>
            </form>
          )}
          {message && authState === "signed-in" && (
            <p className="mt-4 text-sm text-red-700" role="alert">
              {referral.authForm.unavailable}
            </p>
          )}
          <Link
            to="/referrals/recovery"
            className="mt-5 inline-flex min-h-11 max-w-full items-center text-sm font-semibold text-navy underline underline-offset-4"
          >
            {referral.recovery.title}
          </Link>
          <Link
            to="/referrals"
            className="mt-5 inline-flex min-h-11 max-w-full items-center text-sm font-semibold text-navy underline underline-offset-4 sm:mt-6"
          >
            {referral.authUnavailable.returnToProgramme}
          </Link>
        </div>
      </Section>
    </>
  );
}
