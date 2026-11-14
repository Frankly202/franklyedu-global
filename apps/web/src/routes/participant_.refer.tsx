import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageHero, Section } from "@/components/site/Section";
import { useTranslations } from "@/data/translations";
import {
  getParticipantReferralSubmissionPolicy,
  getReferralAuthState,
  submitParticipantReferral,
} from "@/lib/referral-auth.functions";
import type {
  ParticipantReferralSubmissionActionResult,
  ParticipantReferralSubmissionPolicy,
} from "@/lib/referral-auth.server";
import {
  validateReferralSubmission,
  type ReferralSubmissionInput,
} from "@/lib/referral-submission-validation";
import { pageMeta } from "@/lib/seo";

type PolicyState = "loading" | "unavailable" | "closed" | ParticipantReferralSubmissionPolicy;

export const Route = createFileRoute("/participant_/refer")({
  loader: async () => {
    const state = await getReferralAuthState();
    if (state === "signed-out") throw redirect({ to: "/login" });
    return state;
  },
  head: () =>
    pageMeta("Refer a Student", "Protected participant referral submission.", {
      noindex: true,
    }),
  component: ReferStudentPage,
});

function isReferralSubmissionPolicy(
  value: PolicyState,
): value is ParticipantReferralSubmissionPolicy {
  return typeof value === "object" && value !== null;
}

function ReferStudentPage() {
  const authState = Route.useLoaderData();
  const { referral, locale } = useTranslations();
  const [policyState, setPolicyState] = useState<PolicyState>(
    authState === "unavailable" ? "unavailable" : "loading",
  );
  const [submission, setSubmission] = useState<ParticipantReferralSubmissionActionResult | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const requestKey = useRef<{ fingerprint: string; key: string } | null>(null);
  const fetchPolicy = useServerFn(getParticipantReferralSubmissionPolicy);
  const submitReferral = useServerFn(submitParticipantReferral);

  useEffect(() => {
    let active = true;
    void fetchPolicy({ data: locale })
      .then((result) => {
        if (!active) return;
        if (result === "signed-out" || result === "unavailable") {
          setPolicyState("unavailable");
          return;
        }
        if (result.status === "closed") {
          setPolicyState("closed");
          return;
        }
        setPolicyState(result.policy);
      })
      .catch(() => {
        if (active) setPolicyState("unavailable");
      });
    return () => {
      active = false;
    };
  }, [fetchPolicy, locale]);

  const dateLocale = { en: "en-GB", tr: "tr-TR", fr: "fr-FR", sw: "sw-KE" }[locale];
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isReferralSubmissionPolicy(policyState) || isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const raw = {
      studentName: formData.get("studentName"),
      studentEmail: formData.get("studentEmail"),
      studentPhone: formData.get("studentPhone"),
      locale,
      policyVersion: policyState.policyVersion,
      consentAccepted: formData.get("consentAccepted") === "on",
    };
    let parsed: ReferralSubmissionInput;
    try {
      const candidate = validateReferralSubmission({
        ...raw,
        idempotencyKey: globalThis.crypto.randomUUID(),
      });
      const { idempotencyKey: candidateKey, ...canonicalInput } = candidate;
      const fingerprint = JSON.stringify(canonicalInput);
      const key =
        requestKey.current?.fingerprint === fingerprint ? requestKey.current.key : candidateKey;
      requestKey.current = { fingerprint, key };
      parsed = { ...canonicalInput, idempotencyKey: key };
    } catch {
      setSubmission({ status: "invalid" });
      return;
    }

    setSubmission(null);
    setIsSubmitting(true);
    try {
      setSubmission(await submitReferral({ data: parsed }));
    } catch {
      setSubmission({ status: "unavailable" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const success = submission?.status === "success" ? submission.result : null;
  const submissionMessage =
    submission?.status === "invalid"
      ? referral.participant.submission.validationError
      : submission?.status === "policy-changed" || submission?.status === "submission-unavailable"
        ? referral.participant.submission.policyChanged
        : submission?.status === "idempotency-conflict"
          ? referral.participant.submission.idempotencyConflict
          : submission?.status === "rate-limited"
            ? referral.participant.submission.rateLimited
            : submission?.status === "signed-out"
              ? referral.participant.submission.signedOut
              : submission?.status === "unavailable"
                ? referral.participant.submission.unavailable
                : null;

  return (
    <>
      <PageHero
        title={referral.participant.submission.title}
        subtitle={referral.participant.submission.description}
        eyebrow={referral.landing.eyebrow}
      />
      <Section className="py-8 sm:py-12">
        <div
          data-referral-submission
          className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8"
        >
          {policyState === "loading" ? (
            <p
              role="status"
              aria-live="polite"
              className="text-sm leading-relaxed text-muted-foreground"
            >
              {referral.participant.submission.loading}
            </p>
          ) : policyState === "unavailable" || authState === "unavailable" ? (
            <p role="alert" className="text-sm leading-relaxed text-muted-foreground">
              {referral.participant.submission.unavailable}
            </p>
          ) : policyState === "closed" ? (
            <p
              data-referral-submission-closed
              role="status"
              className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950"
            >
              {referral.publicPage.noCollectionNote}
            </p>
          ) : success ? (
            <div data-referral-submission-success role="status" aria-live="polite">
              <h2 className="text-xl font-bold text-navy">
                {success.reviewRequired
                  ? referral.participant.submission.reviewTitle
                  : referral.participant.submission.successTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {referral.participant.submission.successDescription}
              </p>
              <dl className="mt-5 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">
                    {referral.participant.submission.referenceLabel}
                  </dt>
                  <dd className="mt-1 break-all font-mono text-sm text-navy">
                    {success.reference}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">
                    {referral.participant.submission.dateLabel}
                  </dt>
                  <dd>
                    <time className="mt-1 block text-sm text-navy" dateTime={success.createdAt}>
                      {new Intl.DateTimeFormat(dateLocale, {
                        dateStyle: "medium",
                        timeZone: "UTC",
                      }).format(new Date(success.createdAt))}
                    </time>
                  </dd>
                </div>
              </dl>
            </div>
          ) : (
            <>
              {submissionMessage && (
                <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                  {submissionMessage}
                </p>
              )}
              {submission?.status === "signed-out" && (
                <Link
                  to="/login"
                  className="mb-4 inline-flex min-h-11 items-center text-sm font-semibold text-navy underline underline-offset-4"
                >
                  {referral.landing.login}
                </Link>
              )}
              <section
                aria-labelledby="submission-notice-heading"
                className="rounded-xl border border-border bg-slate-50 p-4 sm:p-5"
              >
                <h2 id="submission-notice-heading" className="font-semibold text-navy">
                  {referral.participant.submission.noticeHeading}
                </h2>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {policyState.noticeText}
                </p>
              </section>
              <form className="mt-6 grid gap-4" onSubmit={handleSubmit} aria-busy={isSubmitting}>
                <label className="grid gap-2 text-sm font-medium text-navy">
                  {referral.participant.submission.studentName}
                  <input
                    name="studentName"
                    type="text"
                    autoComplete="off"
                    maxLength={200}
                    required
                    className="min-h-11 w-full rounded-lg border border-border bg-white px-3 text-base"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-navy">
                  {referral.participant.submission.studentEmail}
                  <input
                    name="studentEmail"
                    type="email"
                    autoComplete="off"
                    maxLength={320}
                    required
                    className="min-h-11 w-full rounded-lg border border-border bg-white px-3 text-base"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-navy">
                  {referral.participant.submission.studentPhone}
                  <input
                    name="studentPhone"
                    type="tel"
                    autoComplete="off"
                    maxLength={40}
                    className="min-h-11 w-full rounded-lg border border-border bg-white px-3 text-base"
                  />
                </label>
                <fieldset className="min-w-0 rounded-xl border border-border p-4">
                  <legend className="px-1 text-sm font-semibold text-navy">
                    {referral.participant.submission.consentHeading}
                  </legend>
                  <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-navy">
                    <input
                      name="consentAccepted"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 shrink-0 accent-navy"
                    />
                    <span className="whitespace-pre-wrap">{policyState.consentText}</span>
                  </label>
                </fieldset>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary min-h-12 w-full justify-center disabled:cursor-wait disabled:opacity-60"
                >
                  {isSubmitting
                    ? referral.participant.submission.submitting
                    : referral.participant.submission.submit}
                </button>
              </form>
            </>
          )}
          <div className="mt-6 grid gap-2 border-t border-border pt-5 text-sm font-semibold sm:flex sm:flex-wrap">
            {(policyState === "unavailable" || authState === "unavailable") && (
              <Link
                to="/login"
                data-referral-login-fallback
                className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
              >
                {referral.landing.login}
              </Link>
            )}
            <Link
              to="/participant"
              className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
            >
              {referral.participant.submission.backToDashboard}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
