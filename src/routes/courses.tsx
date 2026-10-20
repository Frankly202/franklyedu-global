import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { CourseCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { courses, subjects, universities } from "@/data/content";
import { useTranslations } from "@/data/translations";
import { localizeText, localizeTree } from "@/data/translations/localize";
import { pageMeta } from "@/lib/seo";

type Search = {
  university?: string | undefined;
  subject?: string | undefined;
  level?: string | undefined;
};

export const Route = createFileRoute("/courses")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    university: typeof s["university"] === "string" ? s["university"] : undefined,
    subject: typeof s["subject"] === "string" ? s["subject"] : undefined,
    level: typeof s["level"] === "string" ? s["level"] : undefined,
  }),
  head: () =>
    pageMeta(
      "Courses",
      "Browse published programmes with university source links. Confirm current programme availability, fees, and admission requirements with each institution.",
      { path: "/courses" },
    ),
  component: CoursesPage,
});

function CoursesPage() {
  const { common, education, locale } = useTranslations();
  const localizedUniversities = localizeTree(locale, universities);
  const { university, subject, level } = Route.useSearch();
  const navigate = Route.useNavigate();
  const uni = localizedUniversities.find((u) => u.slug === university);
  const universityHasCourses = courses.some((c) => c.universitySlug === university);
  const unpublishedUniversity = uni && !universityHasCourses;
  const exampleUniversities = universities.flatMap((u) =>
    !u.catalogueExamples || (university && u.slug !== university)
      ? []
      : [
          {
            university: u,
            levels: u.catalogueExamples.levels
              .filter((entry) => !level || entry.level === level)
              .map((entry) => ({
                ...entry,
                groups: entry.groups.filter((group) => !subject || group.subject === subject),
              }))
              .filter((entry) => entry.groups.length),
          },
        ],
  );
  const exampleCount = exampleUniversities.reduce(
    (total, entry) =>
      total +
      entry.levels.reduce(
        (count, entryLevel) =>
          count +
          entryLevel.groups.reduce((groupCount, group) => groupCount + group.programmes.length, 0),
        0,
      ),
    0,
  );

  const levelOptions = [
    { value: "Foundation", label: education.courses.levels.foundation },
    { value: "Associate degree", label: localizeText(locale, "Associate degree") },
    { value: "Bachelor's", label: education.courses.levels.bachelors },
    { value: "Master's", label: education.courses.levels.masters },
    { value: "PhD", label: education.courses.levels.phd },
  ];

  const results = courses.filter(
    (c) =>
      (!university || c.universitySlug === university) &&
      (!subject || c.subject === subject) &&
      (!level || c.level === level),
  );

  return (
    <>
      <PageHero
        background="campus"
        breadcrumbs={[{ label: common.nav.courses }]}
        eyebrow={education.courses.eyebrow}
        title={uni ? `${education.courses.optionsAt} ${uni.name}` : education.courses.defaultTitle}
        subtitle={uni ? education.courses.universitySubtitle : education.courses.subtitle}
      />
      <Section>
        <div className="mb-8 grid gap-4 rounded-2xl border border-border bg-white p-4 shadow-xs sm:grid-cols-2 sm:p-5 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] lg:items-end">
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-navy">
            <span>{education.courses.subjectLabel}</span>
            <select
              className="field h-12 rounded-xl border-border shadow-xs transition-colors hover:border-navy/40 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
              value={subject ?? ""}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, subject: e.target.value || undefined }) })
              }
            >
              <option value="">{education.courses.allSubjects}</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {localizeText(locale, s)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-navy">
            <span>{education.courses.levelLabel}</span>
            <select
              className="field h-12 rounded-xl border-border shadow-xs transition-colors hover:border-navy/40 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
              value={level ?? ""}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, level: e.target.value || undefined }) })
              }
            >
              <option value="">{education.courses.allLevels}</option>
              {levelOptions.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-navy">
            <span>{education.courses.universityLabel}</span>
            <select
              className="field h-12 rounded-xl border-border shadow-xs transition-colors hover:border-navy/40 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
              value={university ?? ""}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, university: e.target.value || undefined }) })
              }
            >
              <option value="">{education.courses.allUniversities}</option>
              {localizedUniversities.map((u) => (
                <option key={u.slug} value={u.slug}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>
          <Link
            to="/courses"
            search={{}}
            className="btn btn-outline-dark min-h-12 w-full lg:w-auto"
          >
            {education.courses.clearBtn}
          </Link>
        </div>

        <p className="mb-5 text-sm text-muted-foreground">
          {results.length} {education.courses.foundCount}
        </p>
        {results.length ? (
          <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]">
            {results.map((c) => (
              <CourseCard key={c.slug} c={c} />
            ))}
          </div>
        ) : !exampleCount ? (
          <div className="card-light p-10 text-center">
            <h2 className="text-lg font-semibold">
              {unpublishedUniversity
                ? education.courses.universityEmptyHeading
                : education.courses.emptyHeading}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {unpublishedUniversity
                ? education.courses.universityEmptyDesc
                : education.courses.emptyDesc}
            </p>
            <Link
              to={unpublishedUniversity ? "/application" : "/contact"}
              search={unpublishedUniversity ? { university: uni.slug } : {}}
              className={`btn ${unpublishedUniversity ? "btn-primary" : "btn-outline-dark"} mt-5`}
            >
              {unpublishedUniversity ? common.cards.applyNow : common.nav.contact}
            </Link>
          </div>
        ) : null}
        {exampleUniversities.map(({ university: exampleUniversity, levels }) => {
          const u = localizeTree(locale, exampleUniversity);
          const catalogue = u.catalogueExamples;
          if (!catalogue) return null;
          return (
            <section
              key={u.slug}
              data-university-examples={u.slug}
              className="mt-8 min-w-0 rounded-2xl border border-border bg-cream p-5 sm:p-6"
            >
              <h2 className="font-display text-xl font-semibold text-navy">
                {u.name} — {localizeText(locale, "Catalogue examples — availability unconfirmed")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed">{catalogue.notice}</p>
              {catalogue.levelCoverage ? (
                <p className="mt-2 text-sm leading-relaxed">{catalogue.levelCoverage}</p>
              ) : null}
              <p className="mt-2 text-sm text-muted-foreground">
                {levels.reduce(
                  (count, entry) =>
                    count +
                    entry.groups.reduce((total, group) => total + group.programmes.length, 0),
                  0,
                )}{" "}
                {localizeText(locale, "catalogue examples match these filters")}
              </p>
              {levels.length ? (
                levels.map((entry) => {
                  const localized = localizeTree(locale, entry);
                  const levelLabel = entry.level
                    ? {
                        Foundation: education.courses.levels.foundation,
                        "Bachelor's": education.courses.levels.bachelors,
                        "Master's": education.courses.levels.masters,
                        PhD: education.courses.levels.phd,
                      }[entry.level]
                    : localizeText(locale, "Programme examples — level unassigned");
                  return (
                    <div
                      key={entry.level ?? "unassigned"}
                      data-example-level={entry.level ?? "unassigned"}
                      className="mt-5 rounded-xl border border-border bg-white p-4"
                    >
                      <h3 className="text-lg font-semibold text-navy">{levelLabel}</h3>
                      <div className="mt-3 grid min-w-0 gap-4 sm:grid-cols-2">
                        {localized.groups.map((group) => (
                          <div key={group.subject} className="min-w-0">
                            <h4 className="font-semibold">{group.subject}</h4>
                            <ul className="mt-1 list-disc pl-5 text-sm leading-relaxed">
                              {group.programmes.map((programme) => (
                                <li key={programme} className="break-words">
                                  {programme}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {localized.documents ? (
                        <>
                          <h4 className="mt-4 font-semibold">
                            {localizeText(
                              locale,
                              "Admissions document guidance — confirm with the university",
                            )}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed">{localized.documents}</p>
                        </>
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <p className="mt-4 font-medium">{education.courses.emptyHeading}</p>
              )}
              {catalogue.englishGuidance ? (
                <p className="mt-4 text-sm leading-relaxed">{catalogue.englishGuidance}</p>
              ) : null}
              <p className="mt-3 text-sm leading-relaxed">{u.scholarship?.summary}</p>
              <p className="mt-3 text-sm leading-relaxed">{u.feeInfo?.summary}</p>
              {u.feeInfo?.costEstimate ? (
                <section data-cost-estimate className="mt-5">
                  <h3 className="text-lg font-semibold text-navy">
                    {u.feeInfo.costEstimate.caption}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">{u.feeInfo.costEstimate.note}</p>
                  <div className="mt-3 grid min-w-0 gap-4 sm:grid-cols-2">
                    {u.feeInfo.costEstimate.rows.map((row) => (
                      <div
                        key={row.expense}
                        data-cost-row
                        className="min-w-0 rounded-xl border border-border bg-white p-4"
                      >
                        <h4 className="break-words font-semibold">{row.expense}</h4>
                        <dl className="mt-2 grid gap-2 text-sm">
                          <div>
                            <dt>{localizeText(locale, "Undergraduate estimate")}</dt>
                            <dd className="font-medium">{row.undergraduate}</dd>
                          </div>
                          <div>
                            <dt>{localizeText(locale, "Graduate estimate")}</dt>
                            <dd className="font-medium">{row.graduate}</dd>
                          </div>
                        </dl>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
              {catalogue.sources?.length ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {catalogue.sources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-navy underline underline-offset-4"
                    >
                      {source.label}
                    </a>
                  ))}
                </div>
              ) : null}
              {u.feeInfo?.selectedSchedule ? (
                <section data-selected-fees className="mt-5">
                  <h3 className="text-lg font-semibold text-navy">
                    {u.feeInfo.selectedSchedule.caption}
                  </h3>
                  <p className="mt-2 text-sm">
                    {localizeText(
                      locale,
                      "Selected fee examples below are separate from the filtered catalogue names; they do not confirm a programme level or current availability.",
                    )}
                  </p>
                  <div className="mt-3 grid min-w-0 gap-4 md:grid-cols-2">
                    {u.feeInfo.selectedSchedule.rows.map((row) => (
                      <div
                        key={row.programme}
                        data-fee-programme
                        className="min-w-0 rounded-xl border border-border bg-white p-4"
                      >
                        <h4 className="break-words font-semibold">{row.programme}</h4>
                        <dl className="mt-3 grid gap-3 text-sm">
                          {(
                            [
                              ["Annual tuition before scholarship", row.beforeScholarship],
                              [
                                "Listed 50% scholarship figure / special scholarship",
                                row.scholarshipFigure,
                              ],
                              ["Total including VAT/administrative fee", row.total],
                            ] as const
                          ).map(([label, value]) => (
                            <div key={label}>
                              <dt className="break-words text-muted-foreground">
                                {localizeText(locale, label)}
                              </dt>
                              <dd className="mt-1 break-words font-medium">{value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2 [&>a]:max-w-full [&>a]:whitespace-normal [&>a]:text-center">
                <Link
                  to="/application"
                  search={{ university: u.slug }}
                  className="btn btn-primary btn-sm"
                >
                  {common.cards.applyNow}
                </Link>
                <Link
                  to="/courses"
                  search={{ university: u.slug }}
                  className="btn btn-outline-dark btn-sm"
                >
                  {common.cards.viewCourses}
                </Link>
              </div>
            </section>
          );
        })}
        <aside className="mt-8 rounded-2xl border border-border bg-cream p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold text-navy">
            {education.courses.disclaimerTitle}
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground">
            {education.courses.disclaimer}
          </p>
        </aside>
      </Section>
      <WhatsAppCta />
    </>
  );
}
