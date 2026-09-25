import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { mockStudent, universities } from "@/data/content";
import { whatsappLink } from "@/data/site";
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
  const s = mockStudent;
  const saved = universities.filter((u) => s.savedUniversities.includes(u.slug));
  const doneCount = s.checklist.filter((c) => c.done).length;

  return (
    <>
      <section className="bg-navy-deep py-10 text-navy-foreground">
        <div className="container-site grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="eyebrow text-gold">Preview — mock data</p>
            <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
              Hello, {s.name.split(" ")[0]}
            </h1>
            <p className="text-sm text-navy-muted">
              Target intake: {s.targetIntake} · {s.nationality}
            </p>
          </div>
          <Link to="/application" className="btn btn-primary btn-sm shrink-0">
            New application
          </Link>
        </div>
      </section>

      <Section className="py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-lg font-semibold">Applications</h2>
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
                    <p className="mt-1.5 text-xs text-muted-foreground">{a.progress}% complete</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold">Saved universities</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {saved.map((u) => (
                  <Link
                    key={u.slug}
                    to="/courses"
                    search={{ university: u.slug }}
                    className="card-navy p-4 transition-transform hover:-translate-y-0.5"
                  >
                    <p className="eyebrow text-[0.7rem] text-sky-soft">{u.country}</p>
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
                <h2 className="font-semibold">Document checklist</h2>
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
              <h2 className="font-semibold">Need help with a document?</h2>
              <p className="mt-1 text-sm text-navy-muted">
                Your counsellor replies within 24 hours.
              </p>
              <a
                href={whatsappLink(
                  `Hi, I need help with my application ${s.applications[0]?.id ?? ""}.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm mt-4"
              >
                Message counsellor
              </a>
            </div>
            <div className="card-light p-5 text-sm">
              <p className="font-semibold">Account</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.email}</p>
              <Link to="/login" className="mt-3 inline-block text-xs font-semibold hover:underline">
                Sign out (prototype) →
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
