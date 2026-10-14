import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { destinations } from "@/data/content";
import { useTranslations } from "@/data/translations";
import { localizeTree } from "@/data/translations/localize";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/countries")({
  head: () =>
    pageMeta(
      "Study Destinations",
      "Browse study destinations and contact us to ask about current options.",
      { path: "/countries" },
    ),
  component: CountriesPage,
});

function CountriesPage() {
  const { common, education, locale } = useTranslations();
  const localizedDestinations = localizeTree(locale, destinations);

  return (
    <>
      <PageHero
        background="marketplace"
        breadcrumbs={[{ label: common.nav.countries }]}
        eyebrow={education.countries.eyebrow}
        title={education.countries.title}
        subtitle={education.countries.subtitle}
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {localizedDestinations.map((d) => (
            <article key={d.slug} id={d.slug} className="card-light flex flex-col p-5 sm:p-6">
              <p className="eyebrow text-sky">{d.region}</p>
              <h2 className="mt-2 text-xl font-semibold text-navy">{d.name}</h2>
              <Link to="/contact" className="btn btn-outline-dark mt-5 self-start">
                {education.countries.askAboutOptions}
              </Link>
            </article>
          ))}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
