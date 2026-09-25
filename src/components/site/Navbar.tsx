import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { authNav, brand, mainNav } from "@/data/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-2.5 sm:gap-3"
      aria-label={`${brand.name} home`}
    >
      {brand.logoImage ? (
        <img
          src={brand.logoImage}
          alt=""
          width={compact ? 36 : 44}
          height={compact ? 36 : 44}
          className="h-10 w-auto max-h-10 rounded-sm object-contain sm:h-11 sm:max-h-11"
          loading="eager"
        />
      ) : (
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-cream font-display text-sm font-bold text-navy">
          {brand.mark}
        </span>
      )}
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-tight text-navy-foreground sm:text-base">
            FranklyEdu
          </span>
          <span className="font-display text-[9.5px] font-semibold tracking-[0.22em] uppercase text-sky-soft sm:text-[10px]">
            Global
          </span>
        </div>
      )}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-deep/95 text-navy-foreground backdrop-blur supports-[backdrop-filter]:bg-navy-deep/85">
      <div className="container-site flex h-16 items-center justify-between gap-3 lg:gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 xl:gap-1 lg:flex" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-2 py-1.5 text-[13px] text-navy-muted transition-colors hover:text-navy-foreground xl:px-2.5 xl:text-sm"
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
          className="grid h-10 w-10 place-items-center rounded-md text-navy-foreground lg:hidden"
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
                className="rounded-md px-3 py-2.5 text-[15px] font-medium text-navy-muted hover:bg-navy-soft hover:text-navy-foreground"
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
