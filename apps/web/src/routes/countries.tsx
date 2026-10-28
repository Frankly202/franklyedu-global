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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {localizedDestinations.map((d) => (
            <article
              key={d.slug}
              id={d.slug}
              className="card-light flex min-w-0 flex-col rounded-2xl border border-border bg-white p-5 shadow-xs transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-panel sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow text-[0.7rem] text-sky">{d.region}</p>
                <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
                  {d.flagAssets.map((flag) => (
                    <img
                      key={flag}
                      src={flag}
                      alt=""
                      className="h-6 w-9 rounded-sm border border-border/70 object-cover shadow-xs"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
              <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-navy">
                {d.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {education.countries.cardDescription}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <Link
                  to="/universities"
                  search={{ country: d.slug }}
                  className="btn btn-primary min-h-11"
                >
                  {education.countries.viewUniversities}
                </Link>
                <Link to="/contact" className="btn btn-outline-dark min-h-11">
                  {education.countries.askAboutOptions}
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
