import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { ListingCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { realEstateListings } from "@/data/content";
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
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Marketplace", to: "/marketplace" }, { label: "Real Estate" }]}
        eyebrow="Property & Investment"
        title="Property for families, buyers and investors."
        subtitle="Curated opportunities across North Cyprus, the UK, and selected Dubai/UAE markets. Student accommodation is managed separately."
      >
        <Link to="/marketplace" className="btn btn-outline-light">
          Back to marketplace
        </Link>
      </PageHero>
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {realEstateListings.map((l) => (
            <ListingCard key={l.slug} l={l} ctaLabel="Request details" />
          ))}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
