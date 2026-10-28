import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { contact, whatsappLink } from "@/data/site";
import { useTranslations } from "@/data/translations";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta(
      "Contact",
      "Contact Frankedu Global about study information, property listings, or digital services.",
      { path: "/contact" },
    ),
  component: ContactPage,
});

function ContactPage() {
  const { common, company } = useTranslations();

  return (
    <>
      <PageHero
        background="contact"
        breadcrumbs={[{ label: common.nav.contact }]}
        eyebrow={company.contact.eyebrow}
        title={company.contact.title}
        subtitle={company.contact.subtitle}
      />
      <Section>
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
    </>
  );
}
