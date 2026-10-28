import { whatsappLink } from "@/data/site";
import { useTranslations } from "@/data/translations";
import { Section, SectionHeading } from "./Section";

export function WhatsAppCta() {
  const { common } = useTranslations();

  return (
    <Section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-sky/20 blur-3xl"
      />
      <SectionHeading
        eyebrow={common.whatsappCta.eyebrow}
        title={
          <>
            {common.whatsappCta.titleLine1}
            <br />
            {common.whatsappCta.titleLine2}
          </>
        }
        subtitle={common.whatsappCta.subtitle}
      />
      <div className="flex justify-center">
        <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-primary">
          {common.whatsappCta.button}
        </a>
      </div>
    </Section>
  );
}
