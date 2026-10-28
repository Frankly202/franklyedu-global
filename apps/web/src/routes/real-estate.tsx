import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { ListingCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { realEstateListings } from "@/data/content";
import { useTranslations } from "@/data/translations";
import { localizeTree } from "@/data/translations/localize";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/real-estate")({
  head: () =>
    pageMeta(
      "Property Information",
      "View a property listing and contact us to ask about current details.",
      { path: "/real-estate" },
    ),
  component: RealEstatePage,
});

function RealEstatePage() {
  const { common, marketplace, locale } = useTranslations();
  const listings = localizeTree(locale, realEstateListings);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: common.nav.marketplace, to: "/marketplace" },
          { label: marketplace.realEstate.eyebrow },
        ]}
        eyebrow={marketplace.realEstate.eyebrow}
        title={marketplace.realEstate.title}
        subtitle={marketplace.realEstate.subtitle}
      >
        <Link to="/marketplace" className="btn btn-outline-light">
          {marketplace.realEstate.backToMarketplace}
        </Link>
      </PageHero>
      <Section>
        {listings.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard
                key={l.slug}
                l={l}
                ctaLabel={marketplace.realEstate.requestDetailsBtn}
                headingLevel="h2"
              />
            ))}
          </div>
        ) : (
          <div className="card-light mx-auto max-w-2xl p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold text-navy">
              {marketplace.marketplace.emptyListingsHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {marketplace.marketplace.emptyListingsDesc}
            </p>
            <Link to="/contact" className="btn btn-primary mt-5">
              {marketplace.marketplace.contactBtn}
            </Link>
          </div>
        )}
      </Section>
      <WhatsAppCta />
    </>
  );
}
