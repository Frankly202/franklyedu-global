import { useState, useEffect, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPropertyBySlug } from "@/data/content";
import { whatsappLink, contact } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { PageHero, Section } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  CheckCircle2,
  MapPin,
  Building2,
  ShieldCheck,
  Phone,
  Mail,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/real-estate_/$slug")({
  head: ({ params }) => {
    const property = getPropertyBySlug(params.slug);
    if (!property) {
      return pageMeta("Property Not Found", "The requested property listing was not found.");
    }
    return pageMeta(property.title, property.seoDescription);
  },
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { slug } = Route.useParams();
  const property = getPropertyBySlug(slug);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const galleryLength = property?.gallery.length ?? 0;

  const nextImage = useCallback(() => {
    if (galleryLength === 0) return;
    setActiveIndex((prev) => (prev + 1) % galleryLength);
  }, [galleryLength]);

  const prevImage = useCallback(() => {
    if (galleryLength === 0) return;
    setActiveIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
  }, [galleryLength]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, nextImage, prevImage]);

  if (!property) {
    return (
      <>
        <PageHero
          breadcrumbs={[
            { label: "Marketplace", to: "/marketplace" },
            { label: "Real Estate", to: "/real-estate" },
            { label: "Not Found" },
          ]}
          eyebrow="Real Estate"
          title="Property Listing Not Found"
          subtitle="The requested property is unavailable or may have been updated."
        >
          <Link to="/real-estate" className="btn btn-primary">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to Real Estate Listings
          </Link>
        </PageHero>
        <Section>
          <div className="mx-auto max-w-lg text-center py-12">
            <p className="text-muted-foreground">
              Please check our current property opportunities or contact our advisors directly for
              the latest available inventory.
            </p>
          </div>
        </Section>
        <WhatsAppCta />
      </>
    );
  }

  const activeImage = property.gallery[activeIndex] ?? property.gallery[0];
  if (!activeImage) {
    return null;
  }

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Marketplace", to: "/marketplace" },
          { label: "Real Estate", to: "/real-estate" },
          { label: property.title },
        ]}
        eyebrow={property.eyebrow}
        title={property.title}
        subtitle="A design-refurbished villa prepared for resale in North Cyprus. Complete verified property photography and viewing assistance available."
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={whatsappLink(property.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle className="mr-1.5 h-4 w-4" />
            Enquire on WhatsApp
          </a>
          <Link to="/real-estate" className="btn btn-outline-light">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            All properties
          </Link>
        </div>
      </PageHero>

      {/* Main Content Section */}
      <Section className="py-10 sm:py-14">
        {/* Quick Spec Pills */}
        <div className="mb-8 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-navy-foreground">
            <Building2 className="h-3.5 w-3.5 text-sky-soft" />
            {property.propertyType}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-3 py-1 text-xs font-semibold text-navy">
            <MapPin className="h-3.5 w-3.5 text-sky" />
            {property.location}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-3 py-1 text-xs font-semibold text-navy">
            Status: {property.status}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-navy">
            {property.priceDisplay}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky/15 px-3 py-1 text-xs font-semibold text-navy">
            <ShieldCheck className="h-3.5 w-3.5 text-sky" />
            Foreign national eligible*
          </span>
        </div>

        {/* Gallery + Sidebar Layout */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Gallery Column (7 cols on large) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="card-light overflow-hidden p-3 sm:p-4">
              {/* Featured View */}
              <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-navy-deep">
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                />

                {/* Image Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="rounded-full bg-navy-deep/80 px-3 py-1 text-xs font-medium text-navy-foreground backdrop-blur-xs">
                    {activeImage.category}
                  </span>
                </div>

                {/* Expand / Lightbox Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-3 right-3 z-10 rounded-full bg-navy-deep/80 p-2 text-navy-foreground backdrop-blur-xs transition-colors hover:bg-navy"
                  aria-label="Expand photo in fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* Prev / Next Overlay Buttons */}
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full bg-navy-deep/70 p-2 text-navy-foreground opacity-90 backdrop-blur-xs transition-all hover:bg-navy hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-navy-deep/70 p-2 text-navy-foreground opacity-90 backdrop-blur-xs transition-all hover:bg-navy hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Bottom Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/60 to-transparent p-4 pt-8 text-navy-foreground">
                  <p className="text-sm font-semibold">{activeImage.title}</p>
                  <p className="text-xs text-navy-muted">
                    Photo {activeIndex + 1} of {property.gallery.length}
                  </p>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
                {property.gallery.map((img, idx) => (
                  <button
                    key={img.title}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-md transition-all focus:outline-hidden ${
                      idx === activeIndex
                        ? "ring-2 ring-sky ring-offset-2 ring-offset-cream"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Select photo: ${img.title}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description & Verified Details */}
            <div className="mt-8 space-y-6">
              <div className="card-light p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-navy">About Sarcon №87</h2>
                <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
                  {property.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-navy">Verified Property Highlights</h3>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {property.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-navy">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Required Buyer / Title Eligibility Disclaimer */}
              <div className="rounded-xl border border-gold/40 bg-gold/10 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <h4 className="text-sm font-semibold text-navy">
                      Buyer & Title Eligibility Notice
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-navy/90">
                      {property.disclaimer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Column (5 cols on large) */}
          <div className="space-y-6 lg:col-span-5 xl:col-span-4">
            {/* Property Summary Card */}
            <div className="card-navy p-6">
              <p className="eyebrow text-[0.7rem] text-sky-soft">Verified Listing</p>
              <h3 className="mt-2 text-xl font-bold text-navy-foreground">Key Information</h3>

              <dl className="mt-4 divide-y divide-navy-border/50 text-sm">
                <div className="flex justify-between py-2.5">
                  <dt className="text-navy-muted">Reference</dt>
                  <dd className="font-medium text-navy-foreground">{property.reference}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-navy-muted">Property type</dt>
                  <dd className="font-medium text-navy-foreground">{property.propertyType}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-navy-muted">Location</dt>
                  <dd className="font-medium text-navy-foreground">{property.location}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-navy-muted">Map location</dt>
                  <dd className="font-medium text-navy-foreground">Supplied upon enquiry</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-navy-muted">Status</dt>
                  <dd className="font-medium text-navy-foreground">{property.status}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-navy-muted">Pricing</dt>
                  <dd className="font-semibold text-gold">{property.priceDisplay}</dd>
                </div>
                <div className="flex flex-col py-2.5">
                  <dt className="text-navy-muted">Buyer eligibility</dt>
                  <dd className="mt-0.5 text-xs text-navy-foreground">
                    {property.buyerEligibility}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Frankedu Contact & Consultation Block */}
            <div className="card-light p-6">
              <h3 className="text-lg font-bold text-navy">Arrange a Viewing</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Frankedu Global provides direct assistance for property viewing, map location
                verification, and purchase coordination in North Cyprus.
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href={whatsappLink(property.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full justify-center"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <a
                  href={`tel:${contact.phone}`}
                  className="btn btn-outline-dark w-full justify-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {contact.phone}
                </a>
                <a
                  href={`mailto:${property.contactEmail}?subject=${encodeURIComponent(
                    `Inquiry: ${property.title} (${property.reference})`,
                  )}`}
                  className="btn btn-outline-dark w-full justify-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {property.contactEmail}
                </a>
              </div>

              <div className="mt-6 rounded-lg bg-cream-deep/60 p-3.5 text-xs text-muted-foreground">
                <p className="font-medium text-navy">Official Advisory Support</p>
                <p className="mt-0.5">
                  Independent conveyancing recommended for all real estate transactions. Contact our
                  team for verified information and assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo Gallery Lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur-md"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 rounded-full bg-navy/80 p-2 text-navy-foreground transition-colors hover:bg-navy"
            aria-label="Close photo preview"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox Navigation */}
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 z-50 rounded-full bg-navy/80 p-3 text-navy-foreground transition-colors hover:bg-navy"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 z-50 rounded-full bg-navy/80 p-3 text-navy-foreground transition-colors hover:bg-navy"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image & Caption */}
          <div className="flex max-h-[85vh] max-w-5xl flex-col items-center">
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
            <div className="mt-3 text-center text-navy-foreground">
              <p className="text-sm font-semibold">{activeImage.title}</p>
              <p className="text-xs text-navy-muted">
                {activeIndex + 1} of {property.gallery.length} · {activeImage.category}
              </p>
            </div>
          </div>
        </div>
      )}

      <WhatsAppCta />
    </>
  );
}
