import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { aboutContent } from "@/data/content";
import { brand } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About",
      "FranklyEdu Global gives students frank, verified guidance on studying abroad.",
    ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "About" }]}
        eyebrow={`About ${brand.shortName}`}
        title="Frank guidance for global study."
        subtitle={aboutContent.mission}
      >
        <Link to="/contact" className="btn btn-primary">
          Get in touch
        </Link>
      </PageHero>
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.stats.map((s) => (
            <div key={s.label} className="card-navy p-6 text-center">
              <p className="font-display text-3xl font-bold">{s.value}</p>
              <p className="mt-1 text-sm text-navy-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="dark">
        <SectionHeading tone="dark" eyebrow="How we work" title="What you can expect." />
        <div className="grid gap-4 md:grid-cols-3">
          {aboutContent.values.map((v) => (
            <div key={v.title} className="card-navy p-6">
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow="Team" title="People behind the plan." />
        <div className="grid gap-4 sm:grid-cols-3">
          {aboutContent.team.map((t) => (
            <div key={t.name} className="card-light flex items-center gap-4 p-5 sm:p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy font-display text-lg font-bold text-navy-foreground">
                {t.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
