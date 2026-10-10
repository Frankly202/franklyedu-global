import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { contact, whatsappLink } from "@/data/site";
import { useTranslations } from "@/data/translations";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta("Contact", "Message Frankedu Global on WhatsApp or email to plan your study pathway."),
  component: ContactPage,
});

function ContactPage() {
  const { common, company } = useTranslations();

  return (
    <>
      <PageHero
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
                    className="rounded bg-muted px-2.5 py-1 text-xs font-medium text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    TikTok
                  </a>
                )}
                {contact.social.facebook && (
                  <a
                    href={contact.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded bg-muted px-2.5 py-1 text-xs font-medium text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    Facebook
                  </a>
                )}
                {contact.social.instagram && (
                  <a
                    href={contact.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded bg-muted px-2.5 py-1 text-xs font-medium text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>

          <form
            className="card-light grid gap-4 p-6 sm:grid-cols-2"
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
            <input
              className="field"
              name="fullName"
              autoComplete="name"
              aria-label={company.contact.form.fullNamePlaceholder}
              placeholder={company.contact.form.fullNamePlaceholder}
              required
            />
            <input
              className="field"
              name="email"
              type="email"
              autoComplete="email"
              aria-label={company.contact.form.emailPlaceholder}
              placeholder={company.contact.form.emailPlaceholder}
              required
            />
            <input
              className="field"
              name="phone"
              type="tel"
              autoComplete="tel"
              aria-label={company.contact.form.phonePlaceholder}
              placeholder={company.contact.form.phonePlaceholder}
            />
            <input
              className="field"
              name="destination"
              aria-label={company.contact.form.destinationPlaceholder}
              placeholder={company.contact.form.destinationPlaceholder}
            />
            <textarea
              className="field sm:col-span-2"
              name="message"
              rows={5}
              aria-label={company.contact.form.messagePlaceholder}
              placeholder={company.contact.form.messagePlaceholder}
              required
            />
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
