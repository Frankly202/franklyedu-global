import { Link } from "@tanstack/react-router";
import type { Course, Listing, University } from "@/data/content";
import { whatsappLink } from "@/data/site";
import { useTranslations } from "@/data/translations";
import { Spec } from "./Section";

export function UniversityCard({ u }: { u: University }) {
  const { common } = useTranslations();

  return (
    <article className="card-light flex flex-col p-5 sm:p-6">
      <p className="eyebrow text-[0.7rem] text-sky font-semibold">
        {u.verified ? common.cards.verifiedListing : common.cards.templateListing}
      </p>
      <h3 className="mt-3 text-xl font-semibold leading-snug text-navy">{u.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {u.city}, {u.country}
      </p>
      <dl className="mt-4 grid gap-2.5 rounded-lg bg-muted/60 p-4">
        <Spec label={common.cards.specs.degreeLevel} value={u.degreeLevels} tone="light" />
        <Spec label={common.cards.specs.courses} value={u.courses} tone="light" />
        <Spec label={common.cards.specs.tuitionFee} value={u.tuition} tone="light" />
        <Spec label={common.cards.specs.intake} value={u.intake} tone="light" />
        <Spec label={common.cards.specs.applicationFee} value={u.applicationFee} tone="light" />
        <Spec
          label={common.cards.specs.scholarshipAvailability}
          value={u.scholarship}
          tone="light"
        />
      </dl>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link to="/courses" search={{ university: u.slug }} className="btn btn-outline-dark btn-sm">
          {common.cards.viewPrograms}
        </Link>
        <Link to="/application" search={{ university: u.slug }} className="btn btn-primary btn-sm">
          {common.cards.applyNow}
        </Link>
      </div>
    </article>
  );
}

export function CourseCard({ c }: { c: Course }) {
  const { common } = useTranslations();

  return (
    <article className="card-light flex flex-col p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-navy px-2.5 py-0.5 text-xs font-semibold text-navy-foreground">
          {c.level}
        </span>
        <span className="text-xs text-muted-foreground">{c.subject}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug">{c.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {c.university} · {c.country}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div>
          <dt className="text-muted-foreground">{common.cards.specs.duration}</dt>
          <dd className="font-medium">{c.duration}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{common.cards.specs.tuition}</dt>
          <dd className="font-medium">{c.tuition}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{common.cards.specs.intake}</dt>
          <dd className="font-medium">{c.intake}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{common.cards.specs.language}</dt>
          <dd className="font-medium">{c.language}</dd>
        </div>
      </dl>
      <div className="mt-5 flex gap-2">
        <Link to="/application" search={{ course: c.slug }} className="btn btn-primary btn-sm">
          {common.cards.applyNow}
        </Link>
        <a
          href={whatsappLink(common.cards.whatsappMessages.course(c.title, c.university))}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-dark btn-sm"
        >
          {common.cards.askQuestion}
        </a>
      </div>
    </article>
  );
}

export function ListingCard({ l, ctaLabel }: { l: Listing; ctaLabel?: string }) {
  const { common } = useTranslations();
  const effectiveCtaLabel = ctaLabel || common.cards.enquire;

  return (
    <article className="card-light flex flex-col overflow-hidden">
      <div className="relative flex h-40 w-full items-end overflow-hidden p-4">
        {l.image ? (
          <>
            {l.detailSlug ? (
              <Link
                to="/real-estate/$slug"
                params={{ slug: l.detailSlug }}
                className="absolute inset-0 block"
                aria-label={`View details for ${l.title}`}
              >
                <img
                  src={l.image}
                  alt={l.imageAlt || l.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </Link>
            ) : (
              <img
                src={l.image}
                alt={l.imageAlt || l.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-soft" />
        )}
        <span className="relative z-10 rounded-full bg-cream px-2.5 py-0.5 text-xs font-semibold text-navy shadow-xs">
          {l.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold">
          {l.detailSlug ? (
            <Link
              to="/real-estate/$slug"
              params={{ slug: l.detailSlug }}
              className="transition-colors hover:text-navy/80 hover:underline"
            >
              {l.title}
            </Link>
          ) : (
            l.title
          )}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{l.location}</p>
        <p className="mt-3 font-display text-xl font-bold text-navy">{l.price}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {l.features.map((f) => (
            <li key={f} className="rounded-md bg-muted px-2 py-0.5 text-xs text-navy">
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
          {l.detailSlug ? (
            <Link
              to="/real-estate/$slug"
              params={{ slug: l.detailSlug }}
              className="btn btn-outline-dark btn-sm"
            >
              {common.cards.viewDetails}
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground">
              {common.cards.availableFrom} {l.availableFrom}
            </span>
          )}
          <a
            href={whatsappLink(common.cards.whatsappMessages.listing(l.title, l.location))}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
          >
            {effectiveCtaLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
