import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { ListingCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { accommodationListings } from "@/data/content";
import { useTranslations } from "@/data/translations";
import { localizeTree } from "@/data/translations/localize";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/accommodation")({
  head: () =>
    pageMeta(
      "Student Accommodation",
      "Dormitories, shared flats, private apartments and homestays near campus.",
      { path: "/accommodation" },
    ),
  component: AccommodationPage,
});

function AccommodationPage() {
  const { common, marketplace, locale } = useTranslations();
  const listings = localizeTree(locale, accommodationListings);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: common.nav.marketplace, to: "/marketplace" },
          { label: marketplace.accommodation.eyebrow },
        ]}
        eyebrow={marketplace.accommodation.eyebrow}
        title={marketplace.accommodation.title}
        subtitle={marketplace.accommodation.subtitle}
      >
        <Link to="/marketplace" className="btn btn-outline-light">
          {marketplace.accommodation.backToMarketplace}
        </Link>
      </PageHero>
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((l) => (
            <ListingCard
              key={l.slug}
              l={l}
              ctaLabel={marketplace.accommodation.reserveBtn}
              headingLevel="h2"
            />
          ))}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
