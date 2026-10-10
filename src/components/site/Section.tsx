import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "./Breadcrumbs";
import { Breadcrumbs } from "./Breadcrumbs";

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
        <p className={cn("eyebrow mb-3", tone === "dark" ? "text-sky-contrast" : "text-sky")}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-[clamp(1.875rem,5vw,2.25rem)] font-bold leading-tight">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
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
  breadcrumbs,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <section className="bg-navy py-14 text-navy-foreground sm:py-18">
      <div className="container-site max-w-3xl">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && <p className="eyebrow mb-3 text-sky-contrast">{eyebrow}</p>}
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold leading-[1.08]">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-muted sm:text-lg">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-7">{children}</div>}
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
    <div className={cn("card-navy flex flex-col gap-2 p-5 sm:p-6", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-navy-muted">{description}</p>
      {footer && <div className="mt-auto pt-3">{footer}</div>}
    </div>
  );
}

export function Spec({
  label,
  value,
  tone = "light",
}: {
  label: string;
  value: string;
  tone?: "light" | "dark";
}) {
  return (
    <div>
      <dt
        className={cn(
          "eyebrow text-[0.7rem]",
          tone === "dark" ? "text-navy-muted" : "text-muted-foreground",
        )}
      >
        {label}
      </dt>
      <dd className={cn("text-sm font-medium", tone === "dark" ? "text-white" : "text-foreground")}>
        {value}
      </dd>
    </div>
  );
}
