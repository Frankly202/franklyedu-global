import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { ListingCard } from "@/components/site/ListingCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { accommodationListings } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/accommodation")({
  head: () => pageMeta("Student Accommodation", "Dormitories, shared flats, private apartments and homestays near campus."),
  component: AccommodationPage,
});

function AccommodationPage() {
  return (
    <>
      <PageHero
        eyebrow="Accommodation"
        title="A place to live before you land."
        subtitle="Verified student housing options with transparent monthly costs and move-in dates."
      >
        <Link to="/marketplace" className="btn btn-outline-light">Back to marketplace</Link>
      </PageHero>
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {accommodationListings.map((l) => <ListingCard key={l.slug} l={l} ctaLabel="Reserve" />)}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
