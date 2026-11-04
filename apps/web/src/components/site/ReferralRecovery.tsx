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
          className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8"
        >
          {!enabled && (
            <p role="status" className="text-sm leading-relaxed text-muted-foreground">
              {copy.disabled}
            </p>
          )}
          {state !== "ready" && (
            <p role={done ? "status" : "alert"} className="mb-4 text-sm leading-relaxed">
              {copy[state]}
            </p>
          )}
          {!done && (
            <form onSubmit={submit} className="mt-4 grid min-w-0 gap-4">
              <fieldset disabled={!enabled || busy} className="grid min-w-0 gap-4">
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
                  className="btn btn-primary min-h-11 w-full justify-center disabled:opacity-60"
                >
                  {busy ? copy.busy : reset ? copy.update : copy.send}
                </button>
              </fieldset>
            </form>
          )}
          <div className="mt-5 grid gap-2 text-sm font-semibold">
            <Link to="/login" className="inline-flex min-h-11 items-center underline">
              {referral.landing.login}
            </Link>
            {reset && (
              <Link
                to="/referrals/recovery"
                className="inline-flex min-h-11 items-center underline"
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
