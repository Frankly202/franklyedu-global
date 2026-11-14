import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { aboutContent } from "@/data/content";
import { brand, contact, whatsappLink } from "@/data/site";
import { useTranslations } from "@/data/translations";
import { localizeText, localizeTree } from "@/data/translations/localize";
import { pageMeta } from "@/lib/seo";
import leadershipPhoto from "@/assets/background-photo.webp";
import { Building2, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About and Contact",
      "Learn about Frankedu Global and contact us about study information, property listings, or digital services.",
      { path: "/about" },
    ),
  component: AboutPage,
});

function AboutPage() {
  const { common, company, locale } = useTranslations();
  const content = localizeTree(locale, aboutContent);

  return (
    <>
      <PageHero
        background="contact"
        breadcrumbs={[{ label: common.nav.about }]}
        eyebrow={`${company.about.eyebrow} ${brand.shortName}`}
        title={company.about.title}
        subtitle={content.mission}
      >
        <Link to="/about" hash="contact" className="btn btn-light">
          {company.about.getInTouch}
        </Link>
      </PageHero>

      {/* Company information */}
      <Section className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Brand portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-white bg-navy shadow-panel">
                <img
                  src={leadershipPhoto}
                  alt="Portrait of a person at a desk with Frankedu Global branding"
                  className="h-full w-full object-cover object-[center_20%]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-3.5 text-navy shadow-card backdrop-blur-xs">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 shrink-0 text-sky" />
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-sky">
                      {company.about.trustBadgeTitle}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {company.about.trustBadgeSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Details Column */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              <p className="eyebrow text-sky">{company.about.heritageEyebrow}</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-navy sm:text-4xl">
                {company.about.heritageTitle}
              </h2>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              {company.about.paragraph2}
            </p>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-muted/60 p-4">
                <div className="flex items-center gap-2 text-sky">
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span className="font-display text-xs font-bold uppercase tracking-wider">
                    {company.about.brandLabel}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-navy">{brand.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{company.about.brandDesc}</p>
              </div>

              <div className="rounded-xl border border-border bg-muted/60 p-4">
                <div className="flex items-center gap-2 text-sky">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="font-display text-xs font-bold uppercase tracking-wider">
                    {company.about.addressLabel}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-navy">{content.office}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={whatsappLink(
                  localizeText(
                    locale,
                    "Hello Frankedu Global, I'd like to learn more about your services.",
                  ),
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                {company.about.whatsappBtn}
              </a>
              <Link to="/about" hash="contact" className="btn btn-outline-dark">
                {company.about.contactOfficeBtn}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow={company.about.howWeWorkEyebrow}
          title={company.about.howWeWorkTitle}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {content.values.map((v) => (
            <div key={v.title} className="card-light p-6">
              <h3 className="text-lg font-semibold text-navy">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {content.team.length > 0 && (
        <Section>
          <SectionHeading eyebrow={company.about.teamEyebrow} title={company.about.teamTitle} />
          <div className="grid gap-4 sm:grid-cols-3">
            {content.team.map((t) => (
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

      <Section id="contact" className="scroll-mt-24 bg-white">
        <SectionHeading
          eyebrow={company.contact.eyebrow}
          title={company.contact.title}
          subtitle={company.contact.subtitle}
          align="left"
        />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <div className="card-navy p-6">
              <p className="eyebrow text-sky-contrast">WhatsApp</p>
              <p className="mt-2 font-display text-xl font-bold">{contact.phone}</p>
              {contact.hours ? (
                <p className="mt-1 text-xs text-navy-muted">{contact.hours}</p>
              ) : null}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light mt-4"
              >
                {company.contact.whatsappCard.button}
              </a>
            </div>
            <div className="card-light p-6 text-sm">
              <p className="eyebrow text-sky">{company.contact.officeCard.emailLabel}</p>
              <a href={`mailto:${contact.email}`} className="mt-1 block font-medium">
                {contact.email}
              </a>
              <p className="eyebrow mt-4 text-sky">{company.contact.officeCard.officeLabel}</p>
              <p className="mt-1">{contact.address}</p>
              <p className="eyebrow mt-4 text-sky">{company.contact.officeCard.socialLabel}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {contact.social.tiktok && (
                  <a
                    href={contact.social.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded bg-muted px-2.5 text-xs font-medium text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    TikTok
                  </a>
                )}
                {contact.social.facebook && (
                  <a
                    href={contact.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded bg-muted px-2.5 text-xs font-medium text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    Facebook
                  </a>
                )}
                {contact.social.instagram && (
                  <a
                    href={contact.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded bg-muted px-2.5 text-xs font-medium text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>

          <form
            className="card-light grid gap-4 p-6 text-sm font-medium sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const values = new FormData(e.currentTarget);
              const body = [
                `${company.contact.form.fullNamePlaceholder}: ${values.get("fullName")}`,
                `${company.contact.form.emailPlaceholder}: ${values.get("email")}`,
                `${company.contact.form.phonePlaceholder}: ${values.get("phone") || "—"}`,
                `${company.contact.form.destinationPlaceholder}: ${values.get("destination") || "—"}`,
                "",
                String(values.get("message") ?? ""),
              ].join("\n");
              window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
                company.contact.emailSubject,
              )}&body=${encodeURIComponent(body)}`;
            }}
          >
            <label className="grid gap-1">
              {company.contact.form.fullNamePlaceholder}
              <input
                className="field"
                name="fullName"
                autoComplete="name"
                placeholder={company.contact.form.fullNamePlaceholder}
                required
              />
            </label>
            <label className="grid gap-1">
              {company.contact.form.emailPlaceholder}
              <input
                className="field"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={company.contact.form.emailPlaceholder}
                required
              />
            </label>
            <label className="grid gap-1">
              {company.contact.form.phonePlaceholder}
              <input
                className="field"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder={company.contact.form.phonePlaceholder}
              />
            </label>
            <label className="grid gap-1">
              {company.contact.form.destinationPlaceholder}
              <input
                className="field"
                name="destination"
                placeholder={company.contact.form.destinationPlaceholder}
              />
            </label>
            <label className="grid gap-1 sm:col-span-2">
              {company.contact.form.messagePlaceholder}
              <textarea
                className="field"
                name="message"
                rows={5}
                placeholder={company.contact.form.messagePlaceholder}
                required
              />
            </label>
            <p className="text-xs text-muted-foreground sm:col-span-2">
              {company.contact.form.emailNotice}
            </p>
            <button type="submit" className="btn btn-primary sm:col-span-2">
              {company.contact.form.emailSubmitBtn}
            </button>
          </form>
        </div>
      </Section>

      <WhatsAppCta />
    </>
  );
}
