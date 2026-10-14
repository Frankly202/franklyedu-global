import { Link } from "@tanstack/react-router";
import { useId, useRef } from "react";
import type { Course, Listing, University } from "@/data/content";
import { whatsappLink } from "@/data/site";
import { useTranslations } from "@/data/translations";
import { localizeTree } from "@/data/translations/localize";
import { Spec } from "./Section";

export function UniversityCard({
  u,
  headingLevel = "h3",
}: {
  u: University;
  headingLevel?: "h2" | "h3";
}) {
  const { common, locale } = useTranslations();
  u = localizeTree(locale, u);
  const Heading = headingLevel;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogTitleId = useId();
  const location = `${u.city}, ${u.country}`;

  return (
    <>
      <article className="card-light flex h-full flex-col p-5 sm:p-6">
        <div className="flex h-24 items-center justify-center rounded-lg bg-white p-3 sm:h-28">
          <img
            src={u.src}
            alt={`${u.name} logo`}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
        <Heading className="mt-4 text-xl font-semibold leading-snug text-navy">{u.name}</Heading>
        <p className="mt-1 text-sm text-muted-foreground">{location}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">{u.summary}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="btn btn-outline-dark btn-sm"
          >
            {common.cards.viewDetails}
          </button>
          <Link
            to="/application"
            search={{ university: u.slug }}
            className="btn btn-primary btn-sm"
          >
            {common.cards.applyNow}
          </Link>
        </div>
      </article>

      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-[min(90dvh,48rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-navy-deep/70"
      >
        <div className="p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-20 w-full max-w-xs items-center justify-center rounded-lg bg-white p-3 sm:h-24">
              <img src={u.src} alt={`${u.name} logo`} className="h-full w-full object-contain" />
            </div>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label={common.cards.closeDetails}
              className="btn btn-outline-dark btn-sm shrink-0"
            >
              {common.cards.closeDetails}
            </button>
          </div>
          <h2 id={dialogTitleId} className="mt-5 text-2xl font-bold text-navy">
            {u.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{location}</p>
          <p className="mt-4 leading-relaxed">{u.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/application"
              search={{ university: u.slug }}
              onClick={() => dialogRef.current?.close()}
              className="btn btn-primary btn-sm"
            >
              {common.cards.applyNow}
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}

export function CourseCard({ c }: { c: Course }) {
  const { common, locale } = useTranslations();
  c = localizeTree(locale, c);

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

export function ListingCard({
  l,
  ctaLabel,
  headingLevel = "h3",
}: {
  l: Listing;
  ctaLabel?: string;
  headingLevel?: "h2" | "h3";
}) {
  const { common, locale } = useTranslations();
  l = localizeTree(locale, l);
  const effectiveCtaLabel = ctaLabel || common.cards.enquire;
  const Heading = headingLevel;

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
                  className="h-full w-full object-cover transition-transform duration-300 motion-safe:hover:scale-105"
                  loading="lazy"
                />
              </Link>
            ) : (
              <img
                src={l.image}
                alt={l.imageAlt || l.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 motion-safe:hover:scale-105"
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
        <Heading className="text-lg font-semibold">
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
        </Heading>
        {l.location ? <p className="mt-1 text-sm text-muted-foreground">{l.location}</p> : null}
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
          ) : l.availableFrom ? (
            <span className="text-sm text-muted-foreground">
              {common.cards.availableFrom} {l.availableFrom}
            </span>
          ) : null}
          <a
            href={whatsappLink(common.cards.whatsappMessages.listing(l.title))}
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
