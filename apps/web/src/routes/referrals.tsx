import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, CircleHelp, ShieldCheck, UsersRound } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { useTranslations } from "@/data/translations";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/referrals")({
  head: () =>
    pageMeta(
      "Student Referral Programme",
      "Learn about the FranklyEdu Global Student Referral Programme and its current status.",
      { path: "/referrals", noindex: true },
    ),
  component: ReferralsPage,
});

function ReferralsPage() {
  const { referral } = useTranslations();
  const content = referral.publicPage;

  return (
    <>
      <PageHero
        eyebrow={referral.landing.eyebrow}
        title={referral.landing.title}
        subtitle={referral.landing.subtitle}
      >
        <a
          href="#programme-journey"
          className="btn btn-light min-h-11 w-full justify-center gap-2 sm:w-auto"
        >
          {content.journeyTitle}
          <ArrowDown aria-hidden="true" className="h-4 w-4" />
        </a>
      </PageHero>

      <Section className="py-8 sm:py-12">
        <div
          data-referral-status
          role="status"
          className="mx-auto flex max-w-5xl items-start gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950 shadow-sm sm:items-center sm:p-6"
        >
          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-amber-800 shadow-xs sm:mt-0">
            <CircleHelp aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="font-bold leading-snug">{referral.landing.statusTitle}</h2>
            <p className="mt-1 text-sm leading-relaxed">{referral.landing.status}</p>
            <p className="mt-2 text-sm leading-relaxed">{referral.landing.privacyStatus}</p>
          </div>
        </div>
      </Section>

      <Section id="programme-journey" className="scroll-mt-24 py-10 sm:py-16">
        <SectionHeading
          eyebrow={referral.landing.eyebrow}
          title={content.journeyTitle}
          subtitle={content.journeyIntro}
        />
        <ol data-referral-journey className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:gap-5">
          {content.journey.map((step, index) => (
            <li
              key={step.title}
              className="relative min-w-0 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-sm font-bold text-white"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-white py-10 sm:py-16">
        <div
          data-referral-benefit
          className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-navy text-white shadow-panel lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="flex flex-col justify-center bg-linear-to-br from-navy via-navy to-slate-800 p-6 sm:p-9 lg:p-10">
            <div className="flex items-center gap-3 text-sky-contrast">
              <UsersRound aria-hidden="true" className="h-6 w-6 shrink-0" />
              <p className="eyebrow text-sky-contrast">{content.benefitTitle}</p>
            </div>
            <p className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {content.benefitAmount}
            </p>
          </div>
          <div className="border-t border-white/15 p-6 sm:p-9 lg:border-t-0 lg:border-l lg:p-10">
            <p className="text-sm leading-relaxed text-navy-muted sm:text-base">
              {content.benefitDetails}
            </p>
            <p className="mt-4 rounded-xl border border-white/15 bg-white/5 p-4 text-sm leading-relaxed text-white/90">
              <ShieldCheck aria-hidden="true" className="mr-2 inline h-4 w-4 text-sky-contrast" />
              {content.benefitNotice}
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-10 sm:py-16">
        <SectionHeading title={content.faqTitle} />
        <div data-referral-faq className="mx-auto grid max-w-4xl gap-3">
          {content.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border bg-white p-4 shadow-sm open:border-sky/40 sm:p-5"
            >
              <summary className="min-h-11 cursor-pointer list-none pr-8 text-base leading-snug font-semibold text-navy outline-offset-4 marker:hidden focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="float-right -mr-6 text-xl leading-none text-sky transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="pt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="bg-white py-10 sm:py-16">
        <div
          data-referral-cta
          data-referral-panel
          className="mx-auto max-w-5xl rounded-3xl border border-border bg-cream p-5 text-center sm:p-8 lg:p-10"
        >
          <p className="eyebrow text-sky">{referral.landing.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            {content.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {content.ctaDescription}
          </p>
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
            <Link
              to="/signup"
              className="btn btn-primary min-h-12 w-full justify-center gap-2 sm:w-auto"
            >
              {content.ctaJoin}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline-dark min-h-12 w-full justify-center sm:w-auto"
            >
              {content.ctaContact}
            </Link>
            <Link
              to="/login"
              className="btn min-h-12 w-full justify-center border border-border bg-white text-navy hover:bg-slate-50 sm:w-auto"
            >
              {content.ctaLogin}
            </Link>
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {content.noCollectionNote}
          </p>
        </div>
      </Section>
    </>
  );
}
