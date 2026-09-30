import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { aboutContent } from "@/data/content";
import { brand, whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import leadershipPhoto from "@/assets/background-photo.jpg";
import { Calendar, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About",
      "Frankedu Global gives students and investors verified, transparent guidance on studying abroad and global opportunities.",
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
        <Link to="/contact" className="btn btn-light">
          Get in touch
        </Link>
      </PageHero>

      {/* Visual Company & Trust Section */}
      <Section className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Authentic Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-white bg-navy shadow-panel">
                <img
                  src={leadershipPhoto}
                  alt="Frankedu Global advisory in consultation with international education materials"
                  className="h-full w-full object-cover object-[center_20%]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-3.5 text-navy shadow-card backdrop-blur-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-sky" />
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-sky">
                      Verified Guidance
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Direct advisory for university admissions, scholarships, and overseas property.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Details Column */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              <p className="eyebrow text-sky">Company & Heritage</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-navy sm:text-4xl">
                Personal, transparent guidance from day one.
              </h2>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {aboutContent.mission}
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              Operating from our headquarters in Lefkoşa, North Cyprus, Frankedu Global was
              established to provide dependable clarity. We only publish admissions terms, tuition
              rates, and scholarship criteria confirmed directly with our partner institutions and
              verified networks.
            </p>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-muted/60 p-4">
                <div className="flex items-center gap-2 text-sky">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span className="font-display text-xs font-bold uppercase tracking-wider">
                    Established
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-navy">{aboutContent.founded}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Founded with transparent student advocacy at its core.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-muted/60 p-4">
                <div className="flex items-center gap-2 text-sky">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="font-display text-xs font-bold uppercase tracking-wider">
                    Headquarters
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-navy">{aboutContent.office}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Lefkoşa office providing in-person and international consultation.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={whatsappLink(
                  "Hello Frankedu Global, I'd like to learn more about your services.",
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                Message on WhatsApp
              </a>
              <Link to="/contact" className="btn btn-outline-dark">
                Contact our office
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-4 sm:grid-cols-3">
          {aboutContent.stats.map((s) => (
            <div key={s.label} className="card-navy p-6 text-center">
              <p className="font-display text-3xl font-bold">{s.value}</p>
              <p className="mt-1 text-sm text-navy-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="How we work" title="What you can expect." />
        <div className="grid gap-4 md:grid-cols-3">
          {aboutContent.values.map((v) => (
            <div key={v.title} className="card-light p-6">
              <h3 className="text-lg font-semibold text-navy">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {aboutContent.team.length > 0 && (
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
      )}

      <WhatsAppCta />
    </>
  );
}
