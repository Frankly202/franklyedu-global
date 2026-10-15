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
      "Review nursing Master's programmes in Germany, with links to university sources and clear notes on information that still needs confirmation.",
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

  const levelOptions = [
    { value: "Foundation", label: education.courses.levels.foundation },
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
        ) : (
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
              className="btn btn-outline-dark mt-5"
            >
              {unpublishedUniversity ? common.cards.enquire : common.nav.contact}
            </Link>
          </div>
        )}
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
