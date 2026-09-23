import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { destinations } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/countries")({
  head: () =>
    pageMeta(
      "Study Destinations",
      "Compare study destinations by intakes, tuition ranges and post-study opportunities.",
    ),
  component: CountriesPage,
});

function CountriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Study destinations"
        title="Choose where your degree takes you."
        subtitle="Each destination has different intakes, budgets and post-study options. Compare them side by side before you shortlist."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {destinations.map((d) => (
            <article key={d.slug} id={d.slug} className="card-navy p-6">
              <p className="eyebrow text-sky-soft">{d.region}</p>
              <h2 className="mt-2 text-2xl font-bold">{d.name}</h2>
              <p className="mt-2 text-sm text-navy-muted">{d.blurb}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {d.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-sky-soft">•</span>
                    {h}
                  </li>
                ))}
              </ul>
              <dl className="mt-5 grid grid-cols-2 gap-3 rounded-lg bg-navy/60 p-4 text-xs">
                <div>
                  <dt className="eyebrow text-[0.58rem] text-navy-muted">Intakes</dt>
                  <dd className="mt-1">{d.intakes}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.58rem] text-navy-muted">Tuition range</dt>
                  <dd className="mt-1">{d.tuitionRange}</dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  to="/universities"
                  search={{ country: d.slug }}
                  className="btn btn-light btn-sm"
                >
                  View universities
                </Link>
                <Link to="/scholarships" className="btn btn-outline-light btn-sm">
                  Scholarships
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
