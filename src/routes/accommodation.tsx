import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { ListingCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { accommodationListings } from "@/data/content";
import { useTranslations } from "@/data/translations";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/accommodation")({
  head: () =>
    pageMeta(
      "Student Accommodation",
      "Dormitories, shared flats, private apartments and homestays near campus.",
    ),
  component: AccommodationPage,
});

function AccommodationPage() {
  const { common, marketplace } = useTranslations();

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
          {accommodationListings.map((l) => (
            <ListingCard key={l.slug} l={l} ctaLabel={marketplace.accommodation.reserveBtn} />
          ))}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
