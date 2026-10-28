import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef } from "react";
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
  const { common, education, locale } = useTranslations();
  u = localizeTree(locale, u);
  const Heading = headingLevel;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const restoreScrollRef = useRef<(() => void) | null>(null);
  const backdropPressRef = useRef(false);
  const dialogTitleId = useId();
  const location = `${u.city}, ${u.country}`;
  const logoSurface = u.logoSurface === "dark" ? "bg-navy" : "bg-white";
  const universityEnquiry = whatsappLink(common.cards.whatsappMessages.university(u.name));

  useEffect(() => () => restoreScrollRef.current?.(), []);

  const closeDetails = () => {
    dialogRef.current?.close();
    restoreScrollRef.current?.();
  };

  const openDetails = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    const { body, documentElement } = document;
    const { scrollX, scrollY, innerWidth } = window;
    const scrollbarWidth = innerWidth - documentElement.clientWidth;
    const paddingRight = getComputedStyle(body).paddingRight;
    const properties = ["position", "top", "left", "width", "overflow", "padding-right"];
    const originalStyles = properties.map((property) => ({
      property,
      value: body.style.getPropertyValue(property),
      priority: body.style.getPropertyPriority(property),
    }));
    const rootOverflow = documentElement.style.getPropertyValue("overflow");
    const rootOverflowPriority = documentElement.style.getPropertyPriority("overflow");

    restoreScrollRef.current = () => {
      restoreScrollRef.current = null;
      for (const { property, value, priority } of originalStyles) {
        if (value) body.style.setProperty(property, value, priority);
        else body.style.removeProperty(property);
      }
      if (rootOverflow) {
        documentElement.style.setProperty("overflow", rootOverflow, rootOverflowPriority);
      } else {
        documentElement.style.removeProperty("overflow");
      }
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
    };

    // A fixed body also prevents background touch scrolling on mobile Safari.
    body.style.setProperty("position", "fixed");
    body.style.setProperty("top", `${-scrollY}px`);
    body.style.setProperty("left", `${-scrollX}px`);
    body.style.setProperty("width", "100%");
    body.style.setProperty("overflow", "hidden");
    if (scrollbarWidth > 0) {
      body.style.setProperty("padding-right", `calc(${paddingRight} + ${scrollbarWidth}px)`);
    }
    documentElement.style.setProperty("overflow", "hidden");

    try {
      dialog.showModal();
      dialog.scrollTop = 0;
      backdropPressRef.current = false;
    } finally {
      if (!dialog.open) restoreScrollRef.current?.();
    }
  };

  return (
    <>
      <article className="card-light flex h-full flex-col p-5 sm:p-6">
        <div
          className={`flex h-24 items-center justify-center rounded-lg ${logoSurface} p-3 sm:h-28`}
        >
          {u.src ? (
            <img
              src={u.src}
              alt={`${u.name} logo`}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <span
              aria-hidden="true"
              className="font-display text-3xl font-semibold tracking-wide text-navy"
            >
              {u.logoMark ?? u.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <Heading className="mt-4 text-xl font-semibold leading-snug text-navy">{u.name}</Heading>
        <p className="mt-1 text-sm text-muted-foreground">{location}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">{u.summary}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5 [&>a]:max-w-full [&>a]:whitespace-normal [&>a]:text-center [&>a]:leading-snug">
          <Link
            to="/application"
            search={{ university: u.slug }}
            className="btn btn-primary btn-sm"
          >
            {common.cards.applyNow}
          </Link>
          <button type="button" onClick={openDetails} className="btn btn-outline-dark btn-sm">
            {common.cards.viewDetails}
          </button>
          <Link
            to="/courses"
            search={{ university: u.slug }}
            className="btn btn-outline-dark btn-sm"
          >
            {common.cards.viewCourses}
          </Link>
          <a
            href={universityEnquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark btn-sm"
          >
            {common.cards.enquire}
          </a>
        </div>
      </article>

      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        onClose={() => {
          if (!dialogRef.current?.open) restoreScrollRef.current?.();
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeDetails();
        }}
        onPointerDown={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          backdropPressRef.current =
            event.target === event.currentTarget &&
            (event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom);
        }}
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            backdropPressRef.current &&
            event.target === event.currentTarget &&
            (event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom)
          ) {
            closeDetails();
          }
          backdropPressRef.current = false;
        }}
        style={{ WebkitOverflowScrolling: "touch" }}
        className="m-auto max-h-[min(90dvh,48rem)] w-[calc(100%-2rem)] max-w-2xl touch-pan-y overflow-y-auto overscroll-contain rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-navy-deep/70"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div
              className={`flex h-20 w-full max-w-xs items-center justify-center rounded-lg ${logoSurface} p-3 sm:h-24`}
            >
              {u.src ? (
                <img src={u.src} alt={`${u.name} logo`} className="h-full w-full object-contain" />
              ) : (
                <span
                  aria-hidden="true"
                  className="font-display text-2xl font-semibold tracking-wide text-navy"
                >
                  {u.logoMark ?? u.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <button
              type="button"
              autoFocus
              onClick={closeDetails}
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
          <p className="mt-3 text-sm leading-relaxed">{u.summary}</p>
          <section className="mt-4">
            <h3 className="font-semibold text-navy">{education.universities.studyAreasLabel}</h3>
            {u.studyAreas?.length ? (
              <ul className="mt-2 grid list-disc gap-x-6 gap-y-1 pl-5 text-sm sm:grid-cols-2">
                {u.studyAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                {education.universities.studyAreasPending}
              </p>
            )}
            {u.studyAreasUrl ? (
              <a
                href={u.studyAreasUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-navy underline underline-offset-4"
              >
                {education.universities.studyAreasSource}
              </a>
            ) : null}
          </section>
          {u.feeInfo ? (
            <section className="mt-4 rounded-xl border border-border bg-cream p-3">
              <h3 className="text-sm font-semibold text-navy">
                {education.universities.feeInfoLabel}
              </h3>
              {u.feeInfo.schedule ? (
                <table className="mt-2 w-full table-fixed text-left text-sm">
                  <caption className="mb-2 text-left font-medium">
                    {u.feeInfo.schedule.caption}
                  </caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className="w-3/5 break-words py-2 pr-3">
                        {education.universities.feeProgrammeLabel}
                      </th>
                      <th scope="col" className="break-words py-2">
                        {u.feeInfo.schedule.amountLabel ??
                          education.universities.annualTuitionLabel}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {u.feeInfo.schedule.rows.map((row) => (
                      <tr key={row.programme} className="border-b border-border">
                        <th scope="row" className="break-words py-2 pr-3 font-normal">
                          {row.programme}
                        </th>
                        <td className="py-2 align-top">{row.annualTuition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
              <p className="mt-1 text-sm leading-relaxed">{u.feeInfo.summary}</p>
              {u.feeInfo.sourceUrl ? (
                <a
                  href={u.feeInfo.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-navy underline underline-offset-4"
                >
                  {education.universities.feeInfoSource}
                </a>
              ) : null}
            </section>
          ) : null}
          <section className="mt-4 rounded-xl border border-border bg-cream p-3">
            <h3 className="text-sm font-semibold text-navy">
              {education.universities.scholarshipLabel}
            </h3>
            <p className="mt-1 text-sm leading-relaxed">
              {u.scholarship?.summary ?? education.universities.scholarshipPending}
            </p>
            {u.scholarship?.sourceUrl ? (
              <a
                href={u.scholarship.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-navy underline underline-offset-4"
              >
                {education.universities.scholarshipSource}
              </a>
            ) : null}
          </section>
          <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap [&>a]:max-w-full [&>a]:whitespace-normal [&>a]:text-center [&>a]:leading-snug">
            <Link
              to="/application"
              search={{ university: u.slug }}
              onClick={closeDetails}
              className="btn btn-primary min-h-11"
            >
              {common.cards.applyNow}
            </Link>
            <Link
              to="/courses"
              search={{ university: u.slug }}
              onClick={closeDetails}
              className="btn btn-outline-dark min-h-11"
            >
              {common.cards.viewCourses}
            </Link>
            <a
              href={universityEnquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark min-h-11"
            >
              {common.cards.enquire}
            </a>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {education.universities.applicationGuidanceNote}
          </p>
        </div>
      </dialog>
    </>
  );
}

export function CourseCard({ c }: { c: Course }) {
  const { common, education, locale } = useTranslations();
  c = localizeTree(locale, c);

  return (
    <article className="card-light flex h-full min-w-0 flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-navy px-2.5 py-0.5 text-xs font-semibold text-navy-foreground">
          {c.level}
        </span>
        <span className="min-w-0 break-words text-xs text-muted-foreground">{c.subject}</span>
      </div>
      <h3 className="mt-3 break-words text-lg font-semibold leading-snug">{c.title}</h3>
      <p className="mt-1 break-words text-sm text-muted-foreground">
        {c.university} · {c.country}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div className="min-w-0">
          <dt className="text-muted-foreground">{education.courses.startLabel}</dt>
          <dd className="break-words font-medium">{c.intake}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted-foreground">{education.courses.applicationWindowLabel}</dt>
          <dd className="break-words font-medium">{c.applicationWindow}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted-foreground">{common.cards.specs.duration}</dt>
          <dd className="break-words font-medium">{c.duration}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted-foreground">{common.cards.specs.tuition}</dt>
          <dd className="break-words font-medium">{c.tuition}</dd>
        </div>
      </dl>
      <p className="mt-3 text-sm">
        <span className="font-medium text-navy">{common.cards.specs.language}: </span>
        {c.language}
      </p>
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-navy">{education.courses.requirementsLabel}</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {c.requirements.map((requirement) => (
            <li key={requirement} className="break-words">
              {requirement}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 break-words rounded-lg border border-border bg-muted/60 p-3 text-sm leading-relaxed">
        <span className="font-semibold text-navy">{education.courses.noticeLabel}: </span>
        {c.notice}
      </p>
      {c.frankeduDeadline ? (
        <p className="mt-3 break-words rounded-lg border border-sky/40 bg-sky/10 p-3 text-sm leading-relaxed">
          <span className="font-semibold text-navy">
            {education.courses.frankeduDeadlineLabel}:{" "}
          </span>
          {c.frankeduDeadline}
        </p>
      ) : null}
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <a
          href={whatsappLink(common.cards.whatsappMessages.course(c.title, c.university))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
        >
          {common.cards.askAboutProgramme}
        </a>
        <a
          href={c.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-dark btn-sm"
        >
          {common.cards.officialProgrammeInfo}
        </a>
        {c.admissionsUrl ? (
          <a
            href={c.admissionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark btn-sm"
          >
            {common.cards.officialAdmissionsInfo}
          </a>
        ) : null}
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
