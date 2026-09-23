import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

export function Section({
  tone = "light",
  className,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20",
        tone === "dark" ? "bg-navy text-navy-foreground" : "bg-cream text-navy",
        className,
      )}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  tone?: Tone;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn("mb-10 max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-3", tone === "dark" ? "text-sky-soft" : "text-sky")}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed sm:text-base",
            tone === "dark" ? "text-navy-muted" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-navy-deep py-16 text-navy-foreground sm:py-20">
      <div className="container-site max-w-3xl">
        {eyebrow && <p className="eyebrow mb-3 text-sky-soft">{eyebrow}</p>}
        <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-muted">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function InfoCard({
  title,
  description,
  footer,
  className,
}: {
  title: string;
  description: string;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("card-navy flex flex-col gap-2 p-5", className)}>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-xs leading-relaxed text-navy-muted">{description}</p>
      {footer && <div className="mt-auto pt-3">{footer}</div>}
    </div>
  );
}

export function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-[0.6rem] text-navy-muted">{label}</dt>
      <dd className="text-xs">{value}</dd>
    </div>
  );
}
