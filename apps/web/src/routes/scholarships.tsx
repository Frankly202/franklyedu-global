import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { scholarships, universities } from "@/data/content";
import { whatsappLink } from "@/data/site";
import { useTranslations } from "@/data/translations";
import { localizeText, localizeTree } from "@/data/translations/localize";
import { pageMeta } from "@/lib/seo";

type Search = {
  university?: string | undefined;
  level?: string | undefined;
  type?: string | undefined;
};

export const Route = createFileRoute("/scholarships")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    university: typeof search["university"] === "string" ? search["university"] : undefined,
    level: typeof search["level"] === "string" ? search["level"] : undefined,
    type: typeof search["type"] === "string" ? search["type"] : undefined,
  }),
  head: () =>
    pageMeta(
      "Scholarships",
      "Browse university scholarship information by verification status. Unconfirmed listings are not offers of open awards; confirm current terms with each institution.",
      { path: "/scholarships" },
    ),
  component: ScholarshipsPage,
});

function ScholarshipsPage() {
  const { common, education, locale } = useTranslations();
  const localizedUniversities = localizeTree(locale, universities);
  const { university, level, type } = Route.useSearch();
  const navigate = Route.useNavigate();
  const matchingScholarships = localizeTree(
    locale,
    scholarships.filter(
      (scholarship) =>
        (!university || scholarship.universitySlug === university) &&
        (!level || scholarship.levels.some((studyLevel) => studyLevel === level)) &&
        (!type || scholarship.type === type),
    ),
  );
  const levels = [...new Set(scholarships.flatMap((scholarship) => scholarship.levels))];
  const dateLocale = { en: "en-GB", tr: "tr-TR", fr: "fr-FR", sw: "sw-KE" }[locale];

  return (
    <>
      <PageHero
        background="campus"
        breadcrumbs={[{ label: common.nav.scholarships }]}
        eyebrow={education.scholarships.eyebrow}
        title={education.scholarships.title}
        subtitle={education.scholarships.subtitle}
      />
      <Section>
        <div className="mb-8 grid gap-4 rounded-2xl border border-border bg-white p-4 shadow-xs sm:grid-cols-2 sm:p-5 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] lg:items-end">
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-navy">
            <span>{education.scholarships.universityLabel}</span>
            <select
              className="field h-12 rounded-xl border-border shadow-xs"
              value={university ?? ""}
              onChange={(event) =>
                navigate({
                  search: (previous) => ({
                    ...previous,
                    university: event.target.value || undefined,
                  }),
                })
              }
            >
              <option value="">{education.scholarships.allUniversities}</option>
              {localizedUniversities.map((institution) => (
                <option key={institution.slug} value={institution.slug}>
                  {institution.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-navy">
            <span>{education.scholarships.levelLabel}</span>
            <select
              className="field h-12 rounded-xl border-border shadow-xs"
              value={level ?? ""}
              onChange={(event) =>
                navigate({
                  search: (previous) => ({ ...previous, level: event.target.value || undefined }),
                })
              }
            >
              <option value="">{education.scholarships.allLevels}</option>
              {levels.map((studyLevel) => (
                <option key={studyLevel} value={studyLevel}>
                  {localizeText(locale, studyLevel)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-navy">
            <span>{education.scholarships.typeLabel}</span>
            <select
              className="field h-12 rounded-xl border-border shadow-xs"
              value={type ?? ""}
              onChange={(event) =>
                navigate({
                  search: (previous) => ({ ...previous, type: event.target.value || undefined }),
                })
              }
            >
              <option value="">{education.scholarships.allTypes}</option>
              <option value="scholarship">{education.scholarships.scholarshipType}</option>
              <option value="tuition-discount">{education.scholarships.tuitionDiscountType}</option>
              <option value="bursary">{education.scholarships.bursaryType}</option>
            </select>
          </label>
          <Link to="/scholarships" search={{}} className="btn btn-outline-dark min-h-12">
            {education.scholarships.clearBtn}
          </Link>
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          {matchingScholarships.length} {education.scholarships.foundCount}
        </p>
        {matchingScholarships.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {matchingScholarships.map((award) => {
              const institution = localizedUniversities.find(
                (candidate) => candidate.slug === award.universitySlug,
              );
              if (!institution) return null;
              return (
                <article
                  key={award.slug}
                  data-scholarship-slug={award.slug}
                  data-scholarship-university={award.universitySlug}
                  data-scholarship-status={award.currentStatus}
                  data-scholarship-source-reviewed-at={award.sourceReviewedAt}
                  className="card-light flex min-w-0 flex-col p-5 sm:p-6"
                >
                  <p className="eyebrow text-[0.7rem] text-sky">
                    {institution.city}, {institution.country}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold leading-snug">{award.awardName}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{institution.name}</p>
                  <p
                    className={`mt-2 inline-flex self-start rounded-full px-2.5 py-1 text-xs font-semibold ${
                      award.currentStatus === "confirmed-current"
                        ? "bg-sky/10 text-navy"
                        : "bg-amber-100 text-amber-950"
                    }`}
                  >
                    {award.currentStatus === "confirmed-current"
                      ? education.scholarships.confirmedCurrent
                      : award.currentStatus === "official-info-unconfirmed"
                        ? education.scholarships.officialInfoUnconfirmed
                        : education.scholarships.awaitingVerification}
                  </p>
                  {award.statusNote && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {localizeText(locale, award.statusNote)}
                    </p>
                  )}
                  <dl className="mt-4 grid min-w-0 gap-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">{education.scholarships.typeLabel}</dt>
                      <dd className="font-medium">
                        {award.type === "scholarship"
                          ? education.scholarships.scholarshipType
                          : award.type === "tuition-discount"
                            ? education.scholarships.tuitionDiscountType
                            : education.scholarships.bursaryType}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">
                        {education.scholarships.amountLabel}
                      </dt>
                      <dd className="break-words font-medium">
                        {award.amount
                          ? localizeText(locale, award.amount)
                          : education.scholarships.amountNotPublished}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">
                        {education.scholarships.coverageLabel}
                      </dt>
                      <dd className="break-words">
                        {award.coverageBasis === "tuition-only"
                          ? education.scholarships.tuitionOnly
                          : award.coverageBasis === "tuition-and-living-costs"
                            ? education.scholarships.tuitionAndLiving
                            : education.scholarships.coverageUnspecified}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{education.scholarships.levelLabel}</dt>
                      <dd>
                        {award.levels.length
                          ? award.levels
                              .map((studyLevel) => localizeText(locale, studyLevel))
                              .join(", ")
                          : education.scholarships.levelUnspecified}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">
                        {education.scholarships.eligibilityLabel}
                      </dt>
                      <dd className="break-words leading-relaxed">{award.eligibility}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">
                        {education.scholarships.deadlineLabel}
                      </dt>
                      <dd>
                        {award.deadline
                          ? localizeText(locale, award.deadline)
                          : award.currentStatus === "awaiting-verification"
                            ? education.scholarships.deadlineUnconfirmed
                            : education.scholarships.deadlineNotPublished}
                      </dd>
                    </div>
                    {award.officialSource && (
                      <div>
                        <dt className="text-muted-foreground">
                          {education.scholarships.sourceLabel}
                        </dt>
                        <dd className="break-all">{new URL(award.officialSource).hostname}</dd>
                      </div>
                    )}
                    {award.sourceReviewedAt && (
                      <div>
                        <dt className="text-muted-foreground">
                          {award.currentStatus === "confirmed-current"
                            ? education.scholarships.verifiedLabel
                            : education.scholarships.sourceReviewedLabel}
                        </dt>
                        <dd>
                          {new Intl.DateTimeFormat(dateLocale, {
                            dateStyle: "long",
                            timeZone: "UTC",
                          }).format(new Date(`${award.sourceReviewedAt}T00:00:00Z`))}
                        </dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    <Link
                      to="/application"
                      search={{ university: institution.slug }}
                      className="btn btn-primary btn-sm"
                    >
                      {common.cards.applyNow}
                    </Link>
                    <a
                      href={whatsappLink(
                        education.scholarships.enquiryMessageTemplate
                          .replace("{award}", award.awardName)
                          .replace("{university}", institution.name),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark btn-sm"
                    >
                      {common.cards.enquire}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="card-light mx-auto max-w-2xl p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold text-navy">
              {education.scholarships.noMatchingHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {education.scholarships.noMatchingDesc}
            </p>
            <Link to="/contact" className="btn btn-outline-dark mt-5">
              {common.nav.contact}
            </Link>
          </div>
        )}
      </Section>
      <WhatsAppCta />
    </>
  );
}
