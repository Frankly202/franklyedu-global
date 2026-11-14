import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
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
        <div className="mx-auto grid w-full max-w-5xl gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
          <div
            data-referral-panel
            className="w-full rounded-3xl border border-border bg-white p-5 shadow-panel sm:p-8 lg:p-10"
          >
            {authState === "signed-in" ? (
              <div className="grid gap-4">
                <p className="text-sm leading-relaxed text-muted-foreground" role="status">
                  {referral.authForm.signedIn}
                </p>
                <Link
                  to="/participant"
                  className="btn btn-primary min-h-12 w-full justify-center gap-2"
                >
                  {referral.participant.title}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  className="btn min-h-12 w-full justify-center border border-border bg-white text-navy hover:bg-slate-50"
                  disabled={isSubmitting}
                  onClick={handleLogout}
                >
                  {referral.authForm.signOut}
                </button>
              </div>
            ) : (
              <form className="grid gap-4 sm:gap-5" onSubmit={handleLogin} aria-busy={isSubmitting}>
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
                  <p
                    className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-relaxed text-red-800"
                    role="alert"
                  >
                    {message === "invalid"
                      ? referral.authForm.invalidCredentials
                      : referral.authForm.unavailable}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary min-h-12 w-full justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? referral.authForm.submitting : referral.authForm.submit}
                </button>
              </form>
            )}
            {message && authState === "signed-in" && (
              <p
                className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-relaxed text-red-800"
                role="alert"
              >
                {referral.authForm.unavailable}
              </p>
            )}
            <div className="mt-6 grid gap-2 border-t border-border pt-5 text-sm font-semibold">
              <Link
                to="/referrals/recovery"
                className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
              >
                {referral.recovery.title}
              </Link>
              <Link
                to="/referrals"
                className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
              >
                {referral.authUnavailable.returnToProgramme}
              </Link>
            </div>
          </div>
          <aside
            aria-labelledby="referral-login-status-title"
            className="flex flex-col justify-center rounded-3xl bg-navy p-6 text-white shadow-panel sm:p-8 lg:p-10"
          >
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-sky-contrast">
              <ShieldCheck aria-hidden="true" className="h-6 w-6" />
            </span>
            <p className="eyebrow text-sky-contrast">{referral.landing.eyebrow}</p>
            <h2 id="referral-login-status-title" className="mt-2 text-2xl font-bold leading-tight">
              {referral.landing.statusTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-navy-muted sm:text-base">
              {referral.landing.status}
            </p>
            <p className="mt-4 border-t border-white/15 pt-4 text-sm leading-relaxed text-white/90">
              {referral.landing.privacyStatus}
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
