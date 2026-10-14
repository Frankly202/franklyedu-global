import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { UniversityCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { destinations, universities } from "@/data/content";
import { useTranslations } from "@/data/translations";
import { localizeTree } from "@/data/translations/localize";
import { pageMeta } from "@/lib/seo";

type Search = { country?: string | undefined };

export const Route = createFileRoute("/universities")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    country: typeof s["country"] === "string" ? s["country"] : undefined,
  }),
  head: () =>
    pageMeta(
      "Universities",
      "Browse institution names and locations. Final International University (FIU) is the only confirmed recruitment relationship.",
      { path: "/universities" },
    ),
  component: UniversitiesPage,
});

function UniversitiesPage() {
  const { common, education, locale } = useTranslations();
  const localizedDestinations = localizeTree(locale, destinations);
  const { country } = Route.useSearch();
  const navigate = Route.useNavigate();

  const results = universities.filter((u) => !country || u.countrySlug === country);

  return (
    <>
      <PageHero
        background="campus"
        breadcrumbs={[{ label: common.nav.universities }]}
        eyebrow={education.universities.eyebrow}
        title={education.universities.title}
        subtitle={education.universities.subtitle}
      />
      <Section>
        <div className="mb-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <label className="grid gap-1">
            <span className="eyebrow text-[0.7rem] text-muted-foreground">
              {education.universities.destinationLabel}
            </span>
            <select
              className="field"
              value={country ?? ""}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, country: e.target.value || undefined }) })
              }
            >
              <option value="">{education.universities.allDestinations}</option>
              {localizedDestinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <Link to="/universities" search={{}} className="btn btn-outline-dark">
            {education.universities.clearBtn}
          </Link>
        </div>

        <p className="mb-5 text-sm text-muted-foreground">
          {results.length}{" "}
          {results.length === 1
            ? education.universities.foundSingular
            : education.universities.foundPlural}
        </p>

        {results.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((u) => (
              <UniversityCard key={u.slug} u={u} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <div className="card-light p-10 text-center">
            <h2 className="text-lg font-semibold">{education.universities.emptyHeading}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{education.universities.emptyDesc}</p>
            <Link to="/contact" className="btn btn-outline-dark mt-4">
              {common.nav.contact}
            </Link>
          </div>
        )}
      </Section>
      <WhatsAppCta />
    </>
  );
}
