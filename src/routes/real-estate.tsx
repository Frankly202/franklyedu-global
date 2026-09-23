import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { ListingCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { realEstateListings } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/real-estate")({
  head: () =>
    pageMeta(
      "Real Estate",
      "Buy or rent property in North Cyprus — including student investment apartments and family homes.",
    ),
  component: RealEstatePage,
});

function RealEstatePage() {
  return (
    <>
      <PageHero
        eyebrow="Real estate"
        title="Property for students, families and investors."
        subtitle="Curated listings with title-deed status and rental potential clearly stated."
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
