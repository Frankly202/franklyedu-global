import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { useTranslations } from "@/data/translations";
import { siteUrl } from "@/data/site";
import { getParticipantDashboard } from "@/lib/referral-auth.functions";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/participant")({
  loader: async () => {
    const state = await getParticipantDashboard();
    if (state === "signed-out") throw redirect({ to: "/login" });
    return state;
  },
  pendingMs: 200,
  pendingComponent: ParticipantLoading,
  head: () =>
    pageMeta("Participant dashboard", "Protected, read-only participant overview.", {
      noindex: true,
    }),
  component: ParticipantPage,
});

function ParticipantPage() {
  const state = Route.useLoaderData();
  const { referral, locale } = useTranslations();
  const overview = typeof state === "object" ? state : null;
  const referralUrl = overview
    ? new URL(`/referrals?ref=${encodeURIComponent(overview.referralCode)}`, siteUrl).toString()
    : null;
  const dateLocale = {
    en: "en-GB",
    tr: "tr-TR",
    fr: "fr-FR",
    sw: "sw-KE",
  }[locale];
  const formatReferralDate = (value: string) =>
    new Intl.DateTimeFormat(dateLocale, {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(new Date(value));
  const formatRewardAmount = (amount: number, currency: string) =>
    new Intl.NumberFormat(dateLocale, {
      style: "currency",
      currency,
    }).format(amount);
  return (
    <>
      <PageHero
        title={referral.participant.title}
        subtitle={referral.participant.subtitle}
        eyebrow={referral.landing.eyebrow}
      />
      <Section className="py-8 sm:py-12">
        <div
          data-referral-panel
          className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8"
        >
          {overview ? (
            <div className="space-y-6">
              <p role="status" className="text-sm leading-relaxed text-muted-foreground">
                {referral.participant.accountStatus}:{" "}
                <span className="font-semibold text-navy">{referral.participant.verified}</span>
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-xl border border-border bg-cream/60 p-5">
                  <h2 className="text-sm font-medium text-muted-foreground">
                    {referral.participant.totalReferrals}
                  </h2>
                  <p className="mt-2 text-3xl font-bold tabular-nums text-navy">
                    {overview.totalReferrals}
                  </p>
                </article>
                <article className="rounded-xl border border-border bg-cream/60 p-5">
                  <h2 className="text-sm font-medium text-muted-foreground">
                    {referral.participant.enrolledReferrals}
                  </h2>
                  <p className="mt-2 text-3xl font-bold tabular-nums text-navy">
                    {overview.enrolledReferrals}
                  </p>
                </article>
              </div>
              {overview.totalReferrals === 0 && (
                <p className="rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-muted-foreground">
                  {referral.participant.empty}
                </p>
              )}
              <section
                data-participant-referral-submission
                className="rounded-xl border border-sky/30 bg-cream/70 p-5"
              >
                <h2 className="font-semibold text-navy">
                  {referral.participant.submission.startTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {referral.participant.submission.startDescription}
                </p>
                <Link
                  to="/participant/refer"
                  className="btn btn-primary mt-4 min-h-11 w-full justify-center sm:w-auto"
                >
                  {referral.participant.submission.startCta}
                </Link>
              </section>
              {referralUrl && (
                <section
                  data-participant-referral-link
                  className="rounded-xl border border-border bg-slate-50 p-5"
                >
                  <h2 className="font-semibold text-navy">
                    {referral.participant.referralLinkTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {referral.participant.referralLinkDescription}
                  </p>
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    {referral.participant.referralCodeLabel}
                  </p>
                  <code className="mt-1 block break-all rounded bg-white p-3 text-sm text-navy">
                    {overview.referralCode}
                  </code>
                  <a
                    href={referralUrl}
                    className="mt-3 block break-all text-sm font-medium text-sky underline underline-offset-4"
                  >
                    {referralUrl}
                  </a>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {referral.participant.referralLinkNotice}
                  </p>
                </section>
              )}
              <section data-participant-referrals>
                <h2 className="font-semibold text-navy">{referral.participant.myReferralsTitle}</h2>
                {overview.referrals.length === 0 ? (
                  <p className="mt-3 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-muted-foreground">
                    {referral.participant.myReferralsEmpty}
                  </p>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {overview.referrals.map((item) => (
                      <li
                        key={item.reference}
                        className="grid gap-3 rounded-xl border border-border bg-white p-4 sm:grid-cols-3"
                      >
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            {referral.participant.referralReferenceLabel}
                          </p>
                          <p className="mt-1 break-all font-mono text-sm text-navy">
                            {item.reference}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            {referral.participant.referralStatusLabel}
                          </p>
                          <p className="mt-1 text-sm text-navy">
                            {
                              referral.participant.referralStatuses[
                                item.status === "application_in_progress"
                                  ? "applicationInProgress"
                                  : item.status === "not_eligible"
                                    ? "notEligible"
                                    : item.status
                              ]
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            {referral.participant.referralDateLabel}
                          </p>
                          <time className="mt-1 block text-sm text-navy" dateTime={item.createdAt}>
                            {formatReferralDate(item.createdAt)}
                          </time>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              <section data-participant-rewards>
                <h2 className="font-semibold text-navy">{referral.participant.myRewardsTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {referral.participant.myRewardsDescription}
                </p>
                {overview.rewards.length === 0 ? (
                  <p className="mt-3 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-muted-foreground">
                    {referral.participant.myRewardsEmpty}
                  </p>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {overview.rewards.map((reward) => (
                      <li
                        key={reward.reference}
                        className="grid gap-3 rounded-xl border border-border bg-white p-4 sm:grid-cols-2"
                      >
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            {referral.participant.referralReferenceLabel}
                          </p>
                          <p className="mt-1 break-all font-mono text-sm text-navy">
                            {reward.reference}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            {referral.participant.rewardDecisionLabel}
                          </p>
                          <p className="mt-1 text-sm text-navy">
                            {referral.participant.rewardDecisions[reward.decision]}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            {referral.participant.rewardCreatedDateLabel}
                          </p>
                          <time
                            className="mt-1 block text-sm text-navy"
                            dateTime={reward.createdAt}
                          >
                            {formatReferralDate(reward.createdAt)}
                          </time>
                        </div>
                        {reward.reviewedAt && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              {referral.participant.rewardReviewedDateLabel}
                            </p>
                            <time
                              className="mt-1 block text-sm text-navy"
                              dateTime={reward.reviewedAt}
                            >
                              {formatReferralDate(reward.reviewedAt)}
                            </time>
                          </div>
                        )}
                        {reward.decision === "qualified" && (
                          <>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground">
                                {referral.participant.rewardAmountLabel}
                              </p>
                              <p className="mt-1 text-sm text-navy">
                                {formatRewardAmount(reward.amount, reward.currency)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground">
                                {referral.participant.rewardPaymentLabel}
                              </p>
                              {reward.payment ? (
                                <p className="mt-1 text-sm text-navy">
                                  {formatRewardAmount(
                                    reward.payment.amount,
                                    reward.payment.currency,
                                  )}
                                  {" · "}
                                  <time dateTime={reward.payment.paidAt}>
                                    {formatReferralDate(reward.payment.paidAt)}
                                  </time>
                                </p>
                              ) : (
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {referral.participant.rewardPaymentNotRecorded}
                                </p>
                              )}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          ) : (
            <p role="alert" className="text-sm leading-relaxed text-muted-foreground">
              {referral.participant.unavailable}
            </p>
          )}
        </div>
      </Section>
    </>
  );
}

function ParticipantLoading() {
  const { referral } = useTranslations();
  return (
    <>
      <PageHero
        title={referral.participant.title}
        subtitle={referral.participant.subtitle}
        eyebrow={referral.landing.eyebrow}
      />
      <Section className="py-8 sm:py-12">
        <div
          data-referral-panel
          className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8"
        >
          <p
            role="status"
            aria-live="polite"
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {referral.participant.loading}
          </p>
        </div>
      </Section>
    </>
  );
}
