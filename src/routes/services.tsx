import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { supportServices } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    pageMeta(
      "Student Services",
      "Intake planning, admissions, visa, dependent and application support — explained step by step.",
    ),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Services" }]}
        eyebrow="Student support"
        title="Support for every part of your next step."
        subtitle="Straightforward guidance from your shortlist to your arrival plans — with every requirement clearly explained."
      >
        <Link to="/application" className="btn btn-light">
          Start your application
        </Link>
      </PageHero>
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {supportServices.map((s, i) => (
            <article key={s.slug} id={s.slug} className="card-light scroll-mt-24 p-6">
              <span className="inline-block rounded-full bg-navy px-2.5 py-0.5 text-xs font-semibold text-white">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-xl font-semibold text-navy">{s.title}</h2>
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
