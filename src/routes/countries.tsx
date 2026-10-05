import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { destinations } from "@/data/content";
import { useTranslations } from "@/data/translations";
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
  const { common, education } = useTranslations();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: common.nav.countries }]}
        eyebrow={education.countries.eyebrow}
        title={education.countries.title}
        subtitle={education.countries.subtitle}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {destinations.map((d) => (
            <article key={d.slug} id={d.slug} className="card-navy p-6">
              <p className="eyebrow text-sky-contrast">{d.region}</p>
              <h2 className="mt-2 text-2xl font-bold">{d.name}</h2>
              <p className="mt-2 text-sm text-navy-muted">{d.blurb}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {d.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-sky-contrast font-bold">•</span>
                    {h}
                  </li>
                ))}
              </ul>
              <dl className="mt-5 grid grid-cols-2 gap-3 rounded-lg border border-white/15 bg-white/10 p-4 text-sm">
                <div>
                  <dt className="eyebrow text-[0.7rem] text-navy-muted">
                    {education.countries.intakesLabel}
                  </dt>
                  <dd className="mt-1 font-medium">{d.intakes}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.7rem] text-navy-muted">
                    {education.countries.tuitionRangeLabel}
                  </dt>
                  <dd className="mt-1 font-medium">{d.tuitionRange}</dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  to="/universities"
                  search={{ country: d.slug }}
                  className="btn btn-light btn-sm"
                >
                  {education.countries.viewUniversities}
                </Link>
                <Link to="/scholarships" className="btn btn-outline-light btn-sm">
                  {education.countries.scholarshipsBtn}
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
