import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { CourseCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { courses, subjects, universities } from "@/data/content";
import { pageMeta } from "@/lib/seo";

type Search = { university?: string | undefined; subject?: string | undefined; level?: string };
const levels = ["Foundation", "Bachelor's", "Master's", "PhD"];

export const Route = createFileRoute("/courses")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    university: typeof s["university"] === "string" ? s["university"] : undefined,
    subject: typeof s["subject"] === "string" ? s["subject"] : undefined,
    level: typeof s["level"] === "string" ? s["level"] : undefined,
  }),
  head: () => pageMeta("Courses", "Compare English-taught programmes by level, subject and university, with duration, tuition and intake."),
  component: CoursesPage,
});

function CoursesPage() {
  const { university, subject, level } = Route.useSearch();
  const navigate = Route.useNavigate();
  const uni = universities.find((u) => u.slug === university);

  const results = courses.filter(
    (c) => (!university || c.universitySlug === university) && (!subject || c.subject === subject) && (!level || c.level === level),
  );

  return (
    <>
      <PageHero
        eyebrow="Courses"
        title={uni ? `Programmes at ${uni.name}` : "Compare programmes."}
        subtitle="Search by subject and level. Tuition and intake details are shown where verified."
      />
      <Section>
        <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
          <label className="grid gap-1">
            <span className="eyebrow text-[0.6rem] text-muted-foreground">Subject</span>
            <select className="field" value={subject ?? ""} onChange={(e) => navigate({ search: (p) => ({ ...p, subject: e.target.value || undefined }) })}>
              <option value="">All subjects</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="eyebrow text-[0.6rem] text-muted-foreground">Level</span>
            <select className="field" value={level ?? ""} onChange={(e) => navigate({ search: (p) => ({ ...p, level: e.target.value || undefined }) })}>
              <option value="">All levels</option>
              {levels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="eyebrow text-[0.6rem] text-muted-foreground">University</span>
            <select className="field" value={university ?? ""} onChange={(e) => navigate({ search: (p) => ({ ...p, university: e.target.value || undefined }) })}>
              <option value="">All universities</option>
              {universities.map((u) => <option key={u.slug} value={u.slug}>{u.name}</option>)}
            </select>
          </label>
          <Link to="/courses" search={{}} className="btn btn-outline-dark">Clear</Link>
        </div>

        <p className="mb-5 text-sm text-muted-foreground">{results.length} programmes found</p>
        {results.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((c) => <CourseCard key={c.slug} c={c} />)}
          </div>
        ) : (
          <div className="card-light p-10 text-center">
            <h2 className="text-lg font-semibold">No programmes match yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">Adjust the filters or ask us to source verified options for you.</p>
          </div>
        )}
      </Section>
      <WhatsAppCta />
    </>
  );
}
