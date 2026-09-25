import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { UniversityCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { destinations, subjects, universities } from "@/data/content";
import { pageMeta } from "@/lib/seo";

type Search = { country?: string | undefined; subject?: string | undefined };

export const Route = createFileRoute("/universities")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    country: typeof s["country"] === "string" ? s["country"] : undefined,
    subject: typeof s["subject"] === "string" ? s["subject"] : undefined,
  }),
  head: () =>
    pageMeta(
      "Universities",
      "Browse partner universities by destination and subject, with verified tuition, intake and scholarship details.",
    ),
  component: UniversitiesPage,
});

function UniversitiesPage() {
  const { country, subject } = Route.useSearch();
  const navigate = Route.useNavigate();

  const results = universities.filter(
    (u) => (!country || u.countrySlug === country) && (!subject || u.subjects.includes(subject)),
  );

  return (
    <>
      <PageHero
        eyebrow="Universities"
        title="Find the right university."
        subtitle="Filter by destination and subject. Every listing shows the details students ask about most — tuition, intake, application fee and scholarships."
      />
      <Section>
        <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="grid gap-1">
            <span className="eyebrow text-[0.7rem] text-muted-foreground">Destination</span>
            <select
              className="field"
              value={country ?? ""}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, country: e.target.value || undefined }) })
              }
            >
              <option value="">All destinations</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="eyebrow text-[0.7rem] text-muted-foreground">Subject</span>
            <select
              className="field"
              value={subject ?? ""}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, subject: e.target.value || undefined }) })
              }
            >
              <option value="">All subjects</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <Link to="/universities" search={{}} className="btn btn-outline-dark">
            Clear
          </Link>
        </div>

        <p className="mb-5 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "university" : "universities"} found
        </p>

        {results.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((u) => (
              <UniversityCard key={u.slug} u={u} />
            ))}
          </div>
        ) : (
          <div className="card-light p-10 text-center">
            <h2 className="text-lg font-semibold">No listings match yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different destination or subject, or message us for tailored options.
            </p>
          </div>
        )}
      </Section>
      <WhatsAppCta />
    </>
  );
}
