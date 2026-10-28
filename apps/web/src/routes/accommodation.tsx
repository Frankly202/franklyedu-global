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
      "Accommodation Information",
      "No accommodation listings are currently published. Contact us to ask about current information.",
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
        {listings.length ? (
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
        ) : (
          <div className="card-light mx-auto max-w-2xl p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold text-navy">
              {marketplace.marketplace.emptyListingsHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {marketplace.accommodation.subtitle}
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
