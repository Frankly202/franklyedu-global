import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Section, SectionHeading, InfoCard } from "@/components/site/Section";
import { UniversityCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { destinations, subjects, supportServices, universities } from "@/data/content";
import { brand, images, whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Find your university. Build your future abroad.",
      "Explore destinations, compare courses, understand tuition and scholarships, and start your application with clear guidance from FranklyEdu Global.",
    ),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep text-navy-foreground">
        <img
          src={images.hero}
          alt={images.heroAlt}
          width={1024}
          height={1280}
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-[70%_center] opacity-40 md:w-[62%] md:opacity-100"
        />
        <div className="absolute inset-0 hero-fade" aria-hidden />
        <div className="container-site relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-xl">
            <p className="eyebrow text-sky-soft">{brand.tagline}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-[3.6rem]">
              Find your university.
              <br />
              Build your
              <br />
              future abroad.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-muted sm:text-base">
              Explore destinations, compare courses, understand tuition and scholarships, and start your application with
              clear guidance from {brand.name}.
            </p>

            <form
              className="mt-7 grid gap-3 rounded-xl border-2 border-cream bg-cream p-3 text-navy shadow-panel sm:grid-cols-[1fr_1fr_auto] sm:items-end"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({
                  to: "/universities",
                  search: { country: country || undefined, subject: subject || undefined },
                });
              }}
            >
              <label className="grid gap-1">
                <span className="eyebrow text-[0.58rem] text-muted-foreground">Study destination</span>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="field py-2 text-xs">
                  <option value="">Germany, UK, Canada…</option>
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug}>{d.name}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1">
                <span className="eyebrow text-[0.58rem] text-muted-foreground">Course or subject</span>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="field py-2 text-xs">
                  <option value="">Business, Engineering, Health…</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="btn btn-primary">Find Universities</button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/application" className="btn btn-primary">Start Your Application</Link>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-outline-light">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <Section>
        <SectionHeading
          eyebrow="Study destinations"
          title="Your education can take you further."
          subtitle="Explore high-demand study destinations and receive guidance based on your academic goals, budget, and preferred intake."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <Link key={d.slug} to="/universities" search={{ country: d.slug }} className="group">
              <InfoCard
                title={d.name}
                description={d.blurb}
                className="h-full transition-transform group-hover:-translate-y-0.5"
              />
            </Link>
          ))}
        </div>
      </Section>

      {/* Universities */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          eyebrow="Universities & courses"
          title={<>A catalogue ready for<br />verified opportunities.</>}
          subtitle="We only publish details once they are confirmed. These editable templates are ready for your verified university, programme, fee, and scholarship information."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {universities.slice(0, 3).map((u) => (
            <UniversityCard key={u.slug} u={u} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/universities" className="btn btn-outline-light">Browse all universities</Link>
        </div>
      </Section>

      {/* Support */}
      <Section>
        <SectionHeading
          eyebrow="Student support"
          title={<>Support for every<br />part of your next step.</>}
          subtitle="Straightforward guidance from your shortlist to your arrival plans — with every requirement clearly explained."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportServices.map((s) => (
            <Link key={s.slug} to="/services" hash={s.slug} className="group">
              <InfoCard title={s.title} description={s.description} className="h-full transition-transform group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </Section>

      <WhatsAppCta />
    </>
  );
}
