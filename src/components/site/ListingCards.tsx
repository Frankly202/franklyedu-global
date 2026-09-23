import { Link } from "@tanstack/react-router";
import type { Course, Listing, University } from "@/data/content";
import { whatsappLink } from "@/data/site";
import { Spec } from "./Section";

export function UniversityCard({ u }: { u: University }) {
  return (
    <article className="card-navy-deep flex flex-col p-5">
      <p className="eyebrow text-[0.6rem] text-sky-soft">
        {u.verified ? "Verified listing" : "Template — verify before publishing"}
      </p>
      <h3 className="mt-3 text-lg font-semibold leading-snug">{u.name}</h3>
      <p className="mt-1 text-xs text-navy-muted">
        {u.city}, {u.country}
      </p>
      <dl className="mt-4 grid gap-2.5 rounded-lg bg-navy-soft/60 p-4">
        <Spec label="Degree level" value={u.degreeLevels} />
        <Spec label="Courses" value={u.courses} />
        <Spec label="Tuition fee" value={u.tuition} />
        <Spec label="Intake" value={u.intake} />
        <Spec label="Application fee" value={u.applicationFee} />
        <Spec label="Scholarship availability" value={u.scholarship} />
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link to="/courses" search={{ university: u.slug }} className="btn btn-light btn-sm">
          View Programs
        </Link>
        <Link to="/application" search={{ university: u.slug }} className="btn btn-primary btn-sm">
          Apply Now
        </Link>
      </div>
    </article>
  );
}

export function CourseCard({ c }: { c: Course }) {
  return (
    <article className="card-light flex flex-col p-5">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-navy px-2.5 py-0.5 text-[0.65rem] font-semibold text-navy-foreground">
          {c.level}
        </span>
        <span className="text-[0.7rem] text-muted-foreground">{c.subject}</span>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug">{c.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {c.university} · {c.country}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <div>
          <dt className="text-muted-foreground">Duration</dt>
          <dd className="font-medium">{c.duration}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Tuition</dt>
          <dd className="font-medium">{c.tuition}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Intake</dt>
          <dd className="font-medium">{c.intake}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Language</dt>
          <dd className="font-medium">{c.language}</dd>
        </div>
      </dl>
      <div className="mt-5 flex gap-2">
        <Link to="/application" search={{ course: c.slug }} className="btn btn-primary btn-sm">
          Apply Now
        </Link>
        <a
          href={whatsappLink(`Hi, I'd like to ask about ${c.title} at ${c.university}.`)}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-dark btn-sm"
        >
          Ask a question
        </a>
      </div>
    </article>
  );
}

export function ListingCard({ l, ctaLabel = "Enquire" }: { l: Listing; ctaLabel?: string }) {
  return (
    <article className="card-light flex flex-col overflow-hidden">
      <div className="flex h-36 items-end bg-gradient-to-br from-navy to-navy-soft p-4">
        <span className="rounded-full bg-cream px-2.5 py-0.5 text-[0.65rem] font-semibold text-navy">
          {l.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold">{l.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{l.location}</p>
        <p className="mt-3 font-display text-lg font-bold text-navy">{l.price}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {l.features.map((f) => (
            <li key={f} className="rounded-md bg-muted px-2 py-0.5 text-[0.7rem] text-navy">
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xs text-muted-foreground">Available {l.availableFrom}</span>
          <a
            href={whatsappLink(`Hi, I'm interested in "${l.title}" (${l.location}).`)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
