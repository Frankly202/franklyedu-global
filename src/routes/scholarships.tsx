import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { scholarships } from "@/data/content";
import { useTranslations } from "@/data/translations";
import { localizeTree } from "@/data/translations/localize";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/scholarships")({
  head: () =>
    pageMeta(
      "Scholarships",
      "No current scholarship details are published. Contact us to ask about information confirmed by the institution.",
      { path: "/scholarships" },
    ),
  component: ScholarshipsPage,
});

function ScholarshipsPage() {
  const { common, education, locale } = useTranslations();
  const localizedScholarships = localizeTree(locale, scholarships);

  return (
    <>
      <PageHero
        background="campus"
        breadcrumbs={[{ label: common.nav.scholarships }]}
        eyebrow={education.scholarships.eyebrow}
        title={education.scholarships.title}
        subtitle={education.scholarships.subtitle}
      />
      <Section>
        {localizedScholarships.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {localizedScholarships.map((s) => (
              <article key={s.slug} className="card-light flex flex-col p-5 sm:p-6">
                <p className="eyebrow text-[0.7rem] text-sky">{s.country}</p>
                <h2 className="mt-2 text-xl font-semibold leading-snug">{s.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{s.provider}</p>
                <p className="mt-3 text-sm leading-relaxed">{s.summary}</p>
                <dl className="mt-4 grid grid-cols-3 gap-2 text-[13px]">
                  <div>
                    <dt className="text-muted-foreground">{education.scholarships.amountLabel}</dt>
                    <dd className="font-medium">{s.amount}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">{education.scholarships.levelLabel}</dt>
                    <dd className="font-medium">{s.level}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">
                      {education.scholarships.deadlineLabel}
                    </dt>
                    <dd className="font-medium">{s.deadline}</dd>
                  </div>
                </dl>
                <div className="mt-auto flex gap-2 pt-5">
                  <Link to="/application" className="btn btn-primary btn-sm">
                    {education.scholarships.applySupport}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="card-light mx-auto max-w-2xl p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold text-navy">
              {education.scholarships.emptyHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {education.scholarships.emptyDesc}
            </p>
            <Link to="/contact" className="btn btn-primary mt-5">
              {education.scholarships.contactBtn}
            </Link>
          </div>
        )}
      </Section>
      <WhatsAppCta />
    </>
  );
}
