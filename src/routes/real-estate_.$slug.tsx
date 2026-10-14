import { useState, useEffect, useCallback, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPropertyBySlug } from "@/data/content";
import { whatsappLink, contact } from "@/data/site";
import { useTranslations } from "@/data/translations";
import { localizeTree } from "@/data/translations/localize";
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
  Phone,
  Mail,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/real-estate_/$slug")({
  head: ({ params }) => {
    const property = getPropertyBySlug(params.slug);
    if (!property) {
      return pageMeta("Property Not Found", "The requested property listing was not found.", {
        noindex: true,
      });
    }
    return pageMeta(property.title, property.seoDescription, {
      path: `/real-estate/${property.slug}`,
    });
  },
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { common, marketplace, locale } = useTranslations();
  const { slug } = Route.useParams();
  const sourceProperty = getPropertyBySlug(slug);
  const property = sourceProperty ? localizeTree(locale, sourceProperty) : undefined;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxTriggerRef = useRef<HTMLButtonElement>(null);

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

    const previousFocus = document.activeElement;
    lightboxRef.current?.focus();
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [isLightboxOpen]);

  if (!property) {
    return (
      <>
        <PageHero
          breadcrumbs={[
            { label: common.nav.marketplace, to: "/marketplace" },
            { label: marketplace.realEstate.eyebrow, to: "/real-estate" },
            { label: marketplace.propertyDetail.notFoundTitle },
          ]}
          eyebrow={marketplace.propertyDetail.notFoundEyebrow}
          title={marketplace.propertyDetail.notFoundTitle}
          subtitle={marketplace.propertyDetail.notFoundSubtitle}
        >
          <Link to="/real-estate" className="btn btn-primary">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            {marketplace.propertyDetail.backToListings}
          </Link>
        </PageHero>
        <Section>
          <div className="mx-auto max-w-lg text-center py-12">
            <p className="text-muted-foreground">{marketplace.propertyDetail.notFoundBody}</p>
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
          { label: common.nav.marketplace, to: "/marketplace" },
          { label: marketplace.realEstate.eyebrow, to: "/real-estate" },
          { label: property.title },
        ]}
        eyebrow={property.eyebrow}
        title={property.title}
        subtitle={marketplace.propertyDetail.defaultSubtitle}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={whatsappLink(property.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle className="mr-1.5 h-4 w-4" />
            {marketplace.propertyDetail.enquireWhatsapp}
          </a>
          <Link to="/real-estate" className="btn btn-outline-light">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            {marketplace.propertyDetail.allProperties}
          </Link>
        </div>
      </PageHero>

      {/* Main Content Section */}
      <Section className="py-10 sm:py-14">
        {/* Quick Spec Pills */}
        <div className="mb-8 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-navy-foreground">
            <Building2 className="h-3.5 w-3.5 text-sky-contrast" />
            {property.propertyType}
          </span>
          {property.location ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-3 py-1 text-xs font-semibold text-navy">
              <MapPin className="h-3.5 w-3.5 text-sky" />
              {property.location}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-navy">
            {property.priceDisplay}
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
                  src={activeImage.previewSrc}
                  srcSet={`${activeImage.previewSrc} 800w, ${activeImage.src} ${activeImage.width}w`}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt={activeImage.alt}
                  fetchPriority="high"
                  className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-102"
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
                  ref={lightboxTriggerRef}
                  className="absolute top-3 right-3 z-10 grid min-h-11 min-w-11 place-items-center rounded-full bg-navy-deep/80 p-2 text-navy-foreground backdrop-blur-xs transition-colors hover:bg-navy"
                  aria-label={marketplace.propertyDetail.expandPhotoAria}
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* Prev / Next Overlay Buttons */}
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute top-1/2 left-3 z-10 grid min-h-11 min-w-11 -translate-y-1/2 place-items-center rounded-full bg-navy-deep/70 p-2 text-navy-foreground opacity-90 backdrop-blur-xs transition-all hover:bg-navy hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                  aria-label={marketplace.propertyDetail.prevPhotoAria}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute top-1/2 right-3 z-10 grid min-h-11 min-w-11 -translate-y-1/2 place-items-center rounded-full bg-navy-deep/70 p-2 text-navy-foreground opacity-90 backdrop-blur-xs transition-all hover:bg-navy hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                  aria-label={marketplace.propertyDetail.nextPhotoAria}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Bottom Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/60 to-transparent p-4 pt-8 text-navy-foreground">
                  <p className="text-sm font-semibold">{activeImage.title}</p>
                  <p className="text-xs text-navy-muted">
                    {marketplace.propertyDetail.photoCounterPrefix} {activeIndex + 1}{" "}
                    {marketplace.propertyDetail.photoCounterOf} {property.gallery.length}
                  </p>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
                {property.gallery.map((img, idx) => (
                  <button
                    key={img.title}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative min-h-11 min-w-11 aspect-[4/3] overflow-hidden rounded-md transition-all ${
                      idx === activeIndex
                        ? "ring-2 ring-sky ring-offset-2 ring-offset-cream"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`${marketplace.propertyDetail.selectPhotoAria} ${img.title}`}
                  >
                    <img
                      src={img.thumbnailSrc}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description and listing information */}
            <div className="mt-8 space-y-6">
              <div className="card-light p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-navy">
                  {marketplace.propertyDetail.aboutHeading} {property.title}
                </h2>
                <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
                  {property.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {property.highlights.length > 0 ? (
                  <div className="mt-6 border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-navy">
                      {marketplace.propertyDetail.highlightsHeading}
                    </h3>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {property.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-navy">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Column (5 cols on large) */}
          <div className="space-y-6 lg:col-span-5 xl:col-span-4">
            {/* Property Summary Card */}
            <div className="card-navy p-6">
              <p className="eyebrow text-[0.7rem] text-sky-contrast">
                {marketplace.propertyDetail.summaryCard.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-bold text-navy-foreground">
                {marketplace.propertyDetail.summaryCard.title}
              </h3>

              <dl className="mt-4 divide-y divide-navy-border/50 text-sm">
                <div className="flex justify-between py-2.5">
                  <dt className="text-navy-muted">
                    {marketplace.propertyDetail.summaryCard.reference}
                  </dt>
                  <dd className="font-medium text-navy-foreground">{property.reference}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-navy-muted">
                    {marketplace.propertyDetail.summaryCard.propertyType}
                  </dt>
                  <dd className="font-medium text-navy-foreground">{property.propertyType}</dd>
                </div>
                {property.location ? (
                  <div className="flex justify-between py-2.5">
                    <dt className="text-navy-muted">
                      {marketplace.propertyDetail.summaryCard.location}
                    </dt>
                    <dd className="font-medium text-navy-foreground">{property.location}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between py-2.5">
                  <dt className="text-navy-muted">
                    {marketplace.propertyDetail.summaryCard.pricing}
                  </dt>
                  <dd className="font-semibold text-gold-contrast">{property.priceDisplay}</dd>
                </div>
              </dl>
            </div>

            {/* Frankedu Contact & Consultation Block */}
            <div className="card-light p-6">
              <h3 className="text-lg font-bold text-navy">
                {marketplace.propertyDetail.viewingCard.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {marketplace.propertyDetail.viewingCard.desc}
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href={whatsappLink(property.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full justify-center"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {marketplace.propertyDetail.viewingCard.chatWhatsapp}
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
                <p className="font-medium text-navy">
                  {marketplace.propertyDetail.viewingCard.advisoryTitle}
                </p>
                <p className="mt-0.5">{marketplace.propertyDetail.viewingCard.advisoryDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          aria-label={
            locale === "fr"
              ? "Galerie photo"
              : locale === "sw"
                ? "Matunzio ya picha"
                : locale === "tr"
                  ? "Fotoğraf galerisi"
                  : "Photo Gallery Lightbox"
          }
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur-md"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsLightboxOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsLightboxOpen(false);
            } else if (event.key === "ArrowRight") {
              nextImage();
            } else if (event.key === "ArrowLeft") {
              prevImage();
            } else if (event.key === "Tab") {
              const buttons =
                event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
              const first = buttons.item(0);
              const last = buttons.item(buttons.length - 1);
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
              }
            }
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 grid min-h-11 min-w-11 place-items-center rounded-full bg-navy/80 p-2 text-navy-foreground transition-colors hover:bg-navy"
            aria-label={marketplace.propertyDetail.lightbox.closeAria}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox Navigation */}
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 z-50 grid min-h-11 min-w-11 place-items-center rounded-full bg-navy/80 p-3 text-navy-foreground transition-colors hover:bg-navy"
            aria-label={marketplace.propertyDetail.prevPhotoAria}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 z-50 grid min-h-11 min-w-11 place-items-center rounded-full bg-navy/80 p-3 text-navy-foreground transition-colors hover:bg-navy"
            aria-label={marketplace.propertyDetail.nextPhotoAria}
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
                {marketplace.propertyDetail.photoCounterPrefix} {activeIndex + 1}{" "}
                {marketplace.propertyDetail.photoCounterOf} {property.gallery.length} ·{" "}
                {activeImage.category}
              </p>
            </div>
          </div>
        </div>
      )}

      <WhatsAppCta />
    </>
  );
}
