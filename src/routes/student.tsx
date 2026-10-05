import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Section } from "@/components/site/Section";
import { mockStudent, universities } from "@/data/content";
import { whatsappLink } from "@/data/site";
import { useTranslations } from "@/data/translations";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/student")({
  head: () =>
    pageMeta(
      "Student Dashboard",
      "Track your applications, saved universities and document checklist.",
    ),
  component: StudentPage,
});

function StudentPage() {
  const { portal } = useTranslations();
  const s = mockStudent;
  const saved = universities.filter((u) => s.savedUniversities.includes(u.slug));
  const doneCount = s.checklist.filter((c) => c.done).length;

  return (
    <>
      <section className="bg-navy py-10 text-navy-foreground">
        <div className="container-site">
          <Breadcrumbs items={[{ label: portal.student.breadcrumb }]} />
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <p className="eyebrow text-gold">{portal.student.bannerEyebrow}</p>
              <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                {portal.student.title}
              </h1>
              <p className="text-sm text-navy-muted">{portal.student.subtitle}</p>
            </div>
            <Link to="/application" className="btn btn-light btn-sm shrink-0">
              {portal.student.newApplicationBtn}
            </Link>
          </div>
        </div>
      </section>

      <Section className="py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-lg font-semibold">{portal.student.applicationsHeading}</h2>
              <div className="grid gap-3">
                {s.applications.map((a) => (
                  <article key={a.id} className="card-light p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-muted-foreground">{a.id}</p>
                        <h3 className="text-base font-semibold">{a.programme}</h3>
                        <p className="text-sm text-muted-foreground">{a.university}</p>
                      </div>
                      <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-semibold text-navy-foreground">
                        {a.status}
                      </span>
                    </div>
                    <div className="mt-4 h-1.5 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-sky"
                        style={{ width: `${a.progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {a.progress}% {portal.student.completeSuffix}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold">{portal.student.savedUnisHeading}</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {saved.map((u) => (
                  <Link
                    key={u.slug}
                    to="/courses"
                    search={{ university: u.slug }}
                    className="card-navy p-4 transition-transform hover:-translate-y-0.5"
                  >
                    <p className="eyebrow text-[0.7rem] text-sky-contrast">{u.country}</p>
                    <p className="mt-1 text-sm font-semibold leading-snug">{u.name}</p>
                    <p className="mt-2 text-[13px] text-navy-muted">{u.intake}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card-light p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{portal.student.checklistHeading}</h2>
                <span className="text-sm font-medium text-muted-foreground">
                  {doneCount}/{s.checklist.length}
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {s.checklist.map((c) => (
                  <li key={c.item} className="flex items-center gap-2">
                    <span
                      className={`grid h-4 w-4 place-items-center rounded-full text-xs ${c.done ? "bg-sky text-sky-foreground" : "border border-border"}`}
                    >
                      {c.done ? "✓" : ""}
                    </span>
                    <span className={c.done ? "text-muted-foreground line-through" : ""}>
                      {c.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-navy p-5">
              <h2 className="font-semibold">{portal.student.counselorCard.title}</h2>
              <p className="mt-1 text-sm text-navy-muted">
                {portal.student.counselorCard.subtitle}
              </p>
              <a
                href={whatsappLink(
                  `Hi, I need help with my application ${s.applications[0]?.id ?? ""}.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light btn-sm mt-4"
              >
                {portal.student.counselorCard.button}
              </a>
            </div>
            <div className="card-light p-5 text-sm">
              <p className="font-semibold">{portal.student.accountCard.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.email}</p>
              <Link to="/login" className="mt-3 inline-block text-xs font-semibold hover:underline">
                {portal.student.accountCard.signOut}
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
