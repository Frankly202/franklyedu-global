import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { CourseCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { courses, subjects, universities } from "@/data/content";
import { useTranslations } from "@/data/translations";
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
      "Compare English-taught programmes by level, subject and university, with duration, tuition and intake.",
    ),
  component: CoursesPage,
});

function CoursesPage() {
  const { common, education } = useTranslations();
  const { university, subject, level } = Route.useSearch();
  const navigate = Route.useNavigate();
  const uni = universities.find((u) => u.slug === university);

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
        breadcrumbs={[{ label: common.nav.courses }]}
        eyebrow={education.courses.eyebrow}
        title={
          uni ? `${education.courses.programmesAt} ${uni.name}` : education.courses.defaultTitle
        }
        subtitle={education.courses.subtitle}
      />
      <Section>
        <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
          <label className="grid gap-1">
            <span className="eyebrow text-[0.7rem] text-muted-foreground">
              {education.courses.subjectLabel}
            </span>
            <select
              className="field"
              value={subject ?? ""}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, subject: e.target.value || undefined }) })
              }
            >
              <option value="">{education.courses.allSubjects}</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="eyebrow text-[0.7rem] text-muted-foreground">
              {education.courses.levelLabel}
            </span>
            <select
              className="field"
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
          <label className="grid gap-1">
            <span className="eyebrow text-[0.7rem] text-muted-foreground">
              {education.courses.universityLabel}
            </span>
            <select
              className="field"
              value={university ?? ""}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, university: e.target.value || undefined }) })
              }
            >
              <option value="">{education.courses.allUniversities}</option>
              {universities.map((u) => (
                <option key={u.slug} value={u.slug}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>
          <Link to="/courses" search={{}} className="btn btn-outline-dark">
            {education.courses.clearBtn}
          </Link>
        </div>

        <p className="mb-5 text-sm text-muted-foreground">
          {results.length} {education.courses.foundCount}
        </p>
        {results.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((c) => (
              <CourseCard key={c.slug} c={c} />
            ))}
          </div>
        ) : (
          <div className="card-light p-10 text-center">
            <h2 className="text-lg font-semibold">{education.courses.emptyHeading}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{education.courses.emptyDesc}</p>
          </div>
        )}
      </Section>
      <WhatsAppCta />
    </>
  );
}
