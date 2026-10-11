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
      "Real Estate & Property Investment",
      "Property acquisition and investment opportunities across North Cyprus, the UK, and selected Dubai/UAE markets.",
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((l) => (
            <ListingCard
              key={l.slug}
              l={l}
              ctaLabel={marketplace.realEstate.requestDetailsBtn}
              headingLevel="h2"
            />
          ))}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
