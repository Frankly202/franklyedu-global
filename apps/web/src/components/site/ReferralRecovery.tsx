import { CircleHelp } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useTranslations } from "@/data/translations";
import { updateRecoveryPassword } from "@/lib/referral-recovery.functions";
import { requestReferralAccountRecovery } from "@/lib/referral-auth.functions";
import { validateRecoveryPassword } from "@/lib/referral-recovery-validation";
import { PageHero, Section } from "./Section";

export function ReferralRecovery({
  enabled,
  reset = false,
  invalid = false,
}: {
  enabled: boolean;
  reset?: boolean;
  invalid?: boolean;
}) {
  const { referral } = useTranslations();
  const copy = referral.recovery;
  const [state, setState] = useState<
    "ready" | "sent" | "success" | "invalid" | "unavailable" | "validation"
  >(invalid ? "invalid" : "ready");
  const [busy, setBusy] = useState(false);
  const send = useServerFn(requestReferralAccountRecovery);
  const update = useServerFn(updateRecoveryPassword);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const password = String(fields.get("password") ?? "");
    const confirmPassword = String(fields.get("confirmPassword") ?? "");
    if (reset) {
      try {
        validateRecoveryPassword({ password, confirmPassword });
      } catch {
        setState("validation");
        return;
      }
    }
    setBusy(true);
    try {
      setState(
        reset
          ? await update({ data: { password, confirmPassword } })
          : await send({ data: { email: String(fields.get("email") ?? "") } }),
      );
    } catch {
      setState("unavailable");
    } finally {
      setBusy(false);
    }
  }
  const done = state === "sent" || state === "success" || state === "invalid";
  return (
    <>
      <PageHero
        title={reset ? copy.resetTitle : copy.title}
        subtitle={copy.description}
        eyebrow={referral.landing.eyebrow}
      />
      <Section className="py-8 sm:py-12 lg:py-16">
        <div
          data-referral-panel
          className="mx-auto w-full max-w-2xl rounded-3xl border border-border bg-white p-5 shadow-panel sm:p-8 lg:p-10"
        >
          {!enabled ? (
            <div
              data-referral-recovery-unavailable
              role="status"
              aria-live="polite"
              className="flex items-start gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950 sm:p-6"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-amber-800 shadow-xs">
                <CircleHelp aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="text-sm leading-relaxed sm:text-base">{copy.disabled}</p>
            </div>
          ) : (
            <>
              {state !== "ready" && (
                <p
                  role={done ? "status" : "alert"}
                  aria-live={done ? "polite" : "assertive"}
                  className={`mb-4 rounded-xl border p-4 text-sm leading-relaxed ${
                    done
                      ? "border-sky/30 bg-sky/10 text-navy"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {copy[state]}
                </p>
              )}
              {!done && (
                <form onSubmit={submit} className="grid min-w-0 gap-4" aria-busy={busy}>
                  <fieldset disabled={busy} className="grid min-w-0 gap-4">
                    <legend className="sr-only">{reset ? copy.resetTitle : copy.title}</legend>
                    {(reset
                      ? [
                          { name: "password", label: referral.authForm.password, type: "password" },
                          {
                            name: "confirmPassword",
                            label: referral.registration.confirmPassword,
                            type: "password",
                          },
                        ]
                      : [{ name: "email", label: referral.authForm.email, type: "email" }]
                    ).map(({ name, label, type }) => (
                      <label
                        key={name}
                        htmlFor={`recovery-${name}`}
                        className="grid min-w-0 gap-2 text-sm font-medium"
                      >
                        {label}
                        <input
                          id={`recovery-${name}`}
                          name={name}
                          type={type}
                          required
                          autoComplete={reset ? "new-password" : "email"}
                          maxLength={reset ? 72 : 254}
                          className="min-h-11 w-full min-w-0 rounded-lg border border-border px-3 text-base"
                        />
                      </label>
                    ))}
                    {reset && <p className="text-sm text-muted-foreground">{copy.validation}</p>}
                    <button
                      type="submit"
                      className="btn btn-primary min-h-12 w-full justify-center disabled:opacity-60"
                    >
                      {busy ? copy.busy : reset ? copy.update : copy.send}
                    </button>
                  </fieldset>
                </form>
              )}
            </>
          )}
          <div className="mt-6 grid gap-2 border-t border-border pt-5 text-sm font-semibold">
            <Link
              to="/login"
              className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
            >
              {referral.landing.login}
            </Link>
            {reset && (
              <Link
                to="/referrals/recovery"
                className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
              >
                {copy.title}
              </Link>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
