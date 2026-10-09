import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/site/Section";
import { UniversityCard, ListingCard } from "@/components/site/ListingCards";
import { destinations, realEstateListings, subjects, universities } from "@/data/content";
import { images, whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { useTranslations } from "@/data/translations";
import {
  GraduationCap,
  Building2,
  Palette,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Your Future. Our Global Network. | Frankedu Global",
      "We connect people to global opportunities through world-class university admissions, trusted property investments, and professional services.",
    ),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { locale, home: t } = useTranslations();

  const [country, setCountry] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <>
      {/* 1. Multi-Pillar Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Subtle Background Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        >
          <img
            src="/logo-watermark-white.png"
            alt=""
            className="absolute -top-10 -right-16 h-80 w-auto max-w-none object-contain opacity-8 sm:h-96 sm:opacity-10 lg:-top-16 lg:right-1/4 lg:h-[30rem]"
          />
        </div>

        <div className="container-site relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Headlines, Value Prop, Search & CTAs */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-sky-contrast">
                <span>{t.hero.eyebrow}</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">{t.hero.titleLine1}</span>
                <span className="block text-sky-contrast">{t.hero.titleHighlight}</span>
              </h1>

              <p className="font-display text-sm font-semibold uppercase tracking-wider text-sky-contrast sm:text-base">
                {t.hero.subhead}
              </p>

              <p className="max-w-xl text-base leading-relaxed text-navy-muted sm:text-lg">
                {t.hero.description}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/application"
                  className="btn btn-light flex items-center gap-2 font-bold shadow-md"
                >
                  <span>{t.hero.applyCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-light flex items-center gap-2 border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>{t.hero.whatsappCta}</span>
                </a>
              </div>

              {/* Interactive Search Filter Box */}
              <form
                className="mt-6 grid gap-3 rounded-2xl border-2 border-cream bg-white p-4 text-navy shadow-panel sm:grid-cols-[1fr_1fr_auto] sm:items-end"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate({
                    to: "/universities",
                    search: { country: country || undefined, subject: subject || undefined },
                  });
                }}
              >
                <label className="grid gap-1">
                  <span className="eyebrow text-[0.7rem] font-bold text-muted-foreground">
                    {t.hero.search.destinationLabel}
                  </span>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="field py-2.5 text-sm font-medium"
                  >
                    <option value="">{t.hero.search.destinationPlaceholder}</option>
                    {destinations.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1">
                  <span className="eyebrow text-[0.7rem] font-bold text-muted-foreground">
                    {t.hero.search.subjectLabel}
                  </span>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="field py-2.5 text-sm font-medium"
                  >
                    <option value="">{t.hero.search.subjectPlaceholder}</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="btn btn-primary font-bold">
                  {t.hero.search.submitBtn}
                </button>
              </form>
            </div>

            {/* Right Column: Authentic Leadership Trust Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-white/20 bg-navy-soft shadow-panel">
                  <img
                    src={images.hero}
                    alt={images.heroAlt}
                    width={images.heroWidth}
                    height={images.heroHeight}
                    fetchPriority="high"
                    className="h-full w-full object-cover object-[center_15%]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/20 bg-white/95 p-4 text-navy shadow-card backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-navy" />
                      <p className="font-display text-xs font-bold uppercase tracking-wider text-navy">
                        {t.hero.trustBadge.title}
                      </p>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {t.hero.trustBadge.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Section (4 Pillars) */}
      <Section className="py-14 sm:py-20">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-sky">{t.services.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t.services.title}
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t.services.subtitle}</p>
          </div>
          <Link
            to="/services"
            className="btn btn-outline-dark inline-flex items-center gap-1.5 self-start whitespace-nowrap text-sm font-semibold"
          >
            <span>{t.services.exploreAll}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Education */}
          <div className="card-light flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-panel">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white shadow-xs">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-navy">{t.services.education.title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-sky">
              {t.services.education.tagline}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.services.education.description}
            </p>
            <ul className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-foreground">
              {t.services.education.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 shrink-0 text-sky" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link
                to={t.services.education.href}
                className="btn btn-primary flex w-full items-center justify-center gap-1.5 text-xs font-bold"
              >
                <span>{t.services.education.ctaLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Properties */}
          <div className="card-light flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-panel">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white shadow-xs">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-navy">{t.services.properties.title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-sky">
              {t.services.properties.tagline}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.services.properties.description}
            </p>
            <ul className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-foreground">
              {t.services.properties.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 shrink-0 text-sky" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link
                to={t.services.properties.href}
                className="btn btn-primary flex w-full items-center justify-center gap-1.5 text-xs font-bold"
              >
                <span>{t.services.properties.ctaLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Creative */}
          <div className="card-light flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-panel">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white shadow-xs">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-navy">{t.services.creative.title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-sky">
              {t.services.creative.tagline}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.services.creative.description}
            </p>
            <ul className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-foreground">
              {t.services.creative.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 shrink-0 text-sky" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link
                to={t.services.creative.href}
                className="btn btn-primary flex w-full items-center justify-center gap-1.5 text-xs font-bold"
              >
                <span>{t.services.creative.ctaLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Eco Luxury */}
          <div className="card-light flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-panel">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white shadow-xs">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-navy">{t.services.ecoLuxury.title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-sky">
              {t.services.ecoLuxury.tagline}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.services.ecoLuxury.description}
            </p>
            <ul className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-foreground">
              {t.services.ecoLuxury.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 shrink-0 text-sky" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link
                to={t.services.ecoLuxury.href}
                className="btn btn-primary flex w-full items-center justify-center gap-1.5 text-xs font-bold"
              >
                <span>{t.services.ecoLuxury.ctaLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Popular Destinations */}
      <Section className="border-t border-border bg-muted/40 py-14 sm:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-sky">{t.destinations.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t.destinations.title}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">{t.destinations.subtitle}</p>
          </div>
          <Link
            to="/countries"
            className="btn btn-outline-dark inline-flex items-center gap-1.5 self-start whitespace-nowrap text-sm font-semibold"
          >
            <span>{t.destinations.viewAll}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((d) => (
            <Link
              key={d.slug}
              to="/universities"
              search={{ country: d.slug }}
              className="group card-light flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-panel"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="eyebrow text-[0.7rem] text-sky">{d.region}</span>
                <span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-[11px] font-semibold text-navy">
                  {t.destinations.badge}
                </span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-navy group-hover:text-sky">{d.name}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {d.blurb}
              </p>
              <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-navy group-hover:text-sky">
                <span>{locale === "tr" ? "Programları İncele" : "Explore Programmes"}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 4. Partner Universities */}
      <Section tone="dark" className="py-14 sm:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-sky-contrast">{t.universities.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.universities.title}
            </h2>
            <p className="mt-3 text-base text-navy-muted">{t.universities.subtitle}</p>
          </div>
          <Link
            to="/universities"
            className="btn btn-outline-light inline-flex items-center gap-1.5 self-start whitespace-nowrap text-sm font-semibold"
          >
            <span>{t.universities.browseAll}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {universities.map((u) => (
            <UniversityCard key={u.slug} u={u} />
          ))}
        </div>
      </Section>

      {/* 5. Featured Properties */}
      <Section className="py-14 sm:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-sky">{t.properties.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t.properties.title}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">{t.properties.subtitle}</p>
          </div>
          <Link
            to="/real-estate"
            className="btn btn-outline-dark inline-flex items-center gap-1.5 self-start whitespace-nowrap text-sm font-semibold"
          >
            <span>{t.properties.viewAll}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {realEstateListings.slice(0, 2).map((l) => (
            <ListingCard key={l.slug} l={l} />
          ))}
        </div>

        <p className="mt-6 text-xs italic text-muted-foreground">{t.properties.disclaimer}</p>
      </Section>

      {/* 6. Closing Consultation CTA Banner */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Subtle Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        >
          <img
            src="/logo-watermark-white.png"
            alt=""
            className="absolute -bottom-10 -right-8 h-64 w-auto max-w-none object-contain opacity-10 sm:h-80"
          />
        </div>

        <div className="container-site relative z-10 py-14 text-center sm:py-18">
          <p className="eyebrow font-bold tracking-wider text-sky-contrast">
            {t.ctaBanner.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            {t.ctaBanner.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-muted sm:text-lg">
            {t.ctaBanner.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-light flex items-center gap-2 font-bold shadow-md"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              <span>{t.ctaBanner.whatsappCta}</span>
            </a>
            <Link
              to="/contact"
              className="btn btn-outline-light flex items-center gap-2 border-white/30 hover:bg-white/10"
            >
              <span>{t.ctaBanner.consultationCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
