import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { authNav, brand, mainNav } from "@/data/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label={`${brand.name} home`}>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-cream font-display text-sm font-bold text-navy">
        {brand.mark}
      </span>
      {!compact && (
        <span className="font-display text-sm font-bold uppercase tracking-tight text-navy-foreground">
          {brand.name}
        </span>
      )}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-deep/95 text-navy-foreground backdrop-blur supports-[backdrop-filter]:bg-navy-deep/85">
      <div className="container-site flex h-14 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-2.5 py-1.5 text-[13px] text-navy-muted transition-colors hover:text-navy-foreground"
              activeProps={{ className: "text-navy-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to={authNav.login.to} className="btn btn-outline-light btn-sm">
            {authNav.login.label}
          </Link>
          <Link to={authNav.signup.to} className="btn btn-primary btn-sm">
            {authNav.signup.label}
          </Link>
        </div>

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-md text-navy-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-border bg-navy-deep lg:hidden">
          <nav className="container-site grid gap-1 py-4" aria-label="Mobile">
            {mainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-navy-muted hover:bg-navy-soft hover:text-navy-foreground"
                activeProps={{ className: "bg-navy-soft text-navy-foreground" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to={authNav.login.to}
                onClick={() => setOpen(false)}
                className="btn btn-outline-light"
              >
                {authNav.login.label}
              </Link>
              <Link
                to={authNav.signup.to}
                onClick={() => setOpen(false)}
                className="btn btn-primary"
              >
                {authNav.signup.label}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
