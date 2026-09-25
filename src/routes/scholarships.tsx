import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { scholarships } from "@/data/content";
import { whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/scholarships")({
  head: () =>
    pageMeta(
      "Scholarships",
      "Discover verified scholarship pathways by destination, level and deadline.",
    ),
  component: ScholarshipsPage,
});

function ScholarshipsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Scholarships" }]}
        eyebrow="Scholarships"
        title="Funding that fits your plan."
        subtitle="We list scholarships only once amounts and eligibility are confirmed. Items marked template are placeholders."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((s) => (
            <article key={s.slug} className="card-light flex flex-col p-5 sm:p-6">
              <p className="eyebrow text-[0.7rem] text-sky">{s.country}</p>
              <h2 className="mt-2 text-xl font-semibold leading-snug">{s.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.provider}</p>
              <p className="mt-3 text-sm leading-relaxed">{s.summary}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-[13px]">
                <div>
                  <dt className="text-muted-foreground">Amount</dt>
                  <dd className="font-medium">{s.amount}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Level</dt>
                  <dd className="font-medium">{s.level}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Deadline</dt>
                  <dd className="font-medium">{s.deadline}</dd>
                </div>
              </dl>
              <div className="mt-auto flex gap-2 pt-5">
                <Link to="/application" className="btn btn-primary btn-sm">
                  Apply with support
                </Link>
                <a
                  href={whatsappLink(`Hi, I'd like to know if I'm eligible for ${s.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark btn-sm"
                >
                  Check eligibility
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
