import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import { useTranslations } from "@/data/translations";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { common } = useTranslations();
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-1.5 text-xs text-navy-muted sm:text-[13px]"
    >
      <Link
        to="/"
        className="flex min-h-11 min-w-11 items-center gap-1 transition-colors hover:text-navy-foreground"
        aria-label={common.breadcrumbs.home}
      >
        <Home className="h-3.5 w-3.5 text-sky-contrast" />
        <span className="sr-only sm:not-sr-only sm:inline">{common.breadcrumbs.home}</span>
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={item.label + idx} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-navy-muted/60" aria-hidden="true" />
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="flex min-h-11 items-center transition-colors hover:text-navy-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="font-medium text-navy-foreground"
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
