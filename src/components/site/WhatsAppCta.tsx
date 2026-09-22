import { brand, whatsappLink } from "@/data/site";
import { Section, SectionHeading } from "./Section";

export function WhatsAppCta() {
  return (
    <Section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-sky/20 blur-3xl"
      />
      <SectionHeading
        eyebrow={`Talk to ${brand.shortName}`}
        title={
          <>
            Not sure where to start?
            <br />
            Let’s make a plan.
          </>
        }
        subtitle={`Message ${brand.name} to discuss countries, courses, scholarships, tuition, and your application pathway.`}
      />
      <div className="flex justify-center">
        <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-primary">
          Chat on WhatsApp
        </a>
      </div>
    </Section>
  );
}
