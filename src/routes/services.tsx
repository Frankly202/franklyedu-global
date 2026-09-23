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
        eyebrow="Student support"
        title="Support for every part of your next step."
        subtitle="Straightforward guidance from your shortlist to your arrival plans — with every requirement clearly explained."
      >
        <Link to="/application" className="btn btn-primary">
          Start your application
        </Link>
      </PageHero>
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {supportServices.map((s, i) => (
            <article key={s.slug} id={s.slug} className="card-navy scroll-mt-24 p-6">
              <p className="eyebrow text-sky-soft">Step {String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm text-navy-muted">{s.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-sky-soft">✓</span>
                    {d}
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
