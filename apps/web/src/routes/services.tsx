import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { supportServices } from "@/data/content";
import { useTranslations } from "@/data/translations";
import { localizeTree } from "@/data/translations/localize";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    pageMeta(
      "Services",
      "Ask about study information, property details, or digital services. Scope and availability are confirmed per enquiry.",
      { path: "/services" },
    ),
  component: ServicesPage,
});

function ServicesPage() {
  const { common, education, locale } = useTranslations();
  const localizedServices = localizeTree(locale, supportServices);

  return (
    <>
      <PageHero
        background="contact"
        breadcrumbs={[{ label: common.nav.services }]}
        eyebrow={education.services.eyebrow}
        title={education.services.title}
        subtitle={education.services.subtitle}
      >
        <Link to="/contact" className="btn btn-light">
          {education.services.contactUs}
        </Link>
      </PageHero>
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {localizedServices.map((s) => (
            <article key={s.slug} id={s.slug} className="card-light scroll-mt-24 p-6">
              <h2 className="text-xl font-semibold text-navy">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-sky font-bold">✓</span>
                    <span className="text-foreground/90">{d}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
