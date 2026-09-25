import { Link } from "@tanstack/react-router";
import { MessageCircle, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { authNav, brand, contact, mainNav, whatsappLink } from "@/data/site";

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

// Grouped sections for mobile drawer clarity
const mobileNavGroups = [
  {
    title: "Study Pathways",
    items: [
      {
        label: "Universities",
        to: "/universities" as const,
        desc: "Explore partner campuses & tuition",
      },
      { label: "Courses", to: "/courses" as const, desc: "Compare English-taught programmes" },
      {
        label: "Destinations",
        to: "/countries" as const,
        desc: "Compare countries, visas & intakes",
      },
      {
        label: "Scholarships",
        to: "/scholarships" as const,
        desc: "Verified funding & tuition discounts",
      },
    ],
  },
  {
    title: "Services & Living",
    items: [
      {
        label: "Student Services",
        to: "/services" as const,
        desc: "Intake planning, visa & arrival support",
      },
      {
        label: "Marketplace",
        to: "/marketplace" as const,
        desc: "Student essentials & trusted community listings",
      },
      {
        label: "Accommodation",
        to: "/accommodation" as const,
        desc: "Dorms & apartments near campus",
      },
      { label: "Real Estate", to: "/real-estate" as const, desc: "Property purchases & rentals" },
    ],
  },
  {
    title: "Company",
    items: [
      {
        label: "About FranklyEdu",
        to: "/about" as const,
        desc: "Our mission, team & verified guidance",
      },
      { label: "Contact & Office", to: "/contact" as const, desc: "Message our advisory team" },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Desktop navigation excludes redundant "Home" since the Logo already links to "/"
  const desktopNavItems = mainNav.filter((item) => item.to !== "/");

  return (
    <header className="sticky top-0 z-50 bg-navy-deep/95 text-navy-foreground backdrop-blur supports-[backdrop-filter]:bg-navy-deep/85">
      <div className="container-site flex h-16 items-center justify-between gap-3 lg:gap-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 xl:gap-1.5 lg:flex" aria-label="Main">
          {desktopNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-2 py-1.5 text-[13px] font-medium text-navy-muted transition-colors hover:text-navy-foreground xl:px-2.5 xl:text-sm"
              activeProps={{ className: "text-navy-foreground font-semibold bg-navy-soft/60" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Primary Actions: Start Application & WhatsApp prioritized */}
        <div className="hidden items-center gap-2 xl:gap-2.5 lg:flex">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light btn-sm flex items-center gap-1.5 border-emerald-500/40 text-emerald-300 transition-colors hover:border-emerald-400 hover:bg-emerald-500/10"
            title="Chat with FranklyEdu Global on WhatsApp"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>
          <Link
            to="/application"
            className="btn btn-primary btn-sm flex items-center gap-1 whitespace-nowrap shadow-sm"
          >
            <span>Start Application</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Header Quick Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-md border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 transition-colors hover:bg-emerald-500/20"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <Link
            to="/application"
            className="btn btn-primary btn-sm px-3 py-1.5 text-xs font-semibold sm:text-sm"
          >
            Apply
          </Link>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-md text-navy-foreground hover:bg-navy-soft"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-navy-border bg-navy-deep/98 max-h-[calc(100vh-4rem)] overflow-y-auto lg:hidden">
          <div className="container-site py-5">
            {/* Primary Action Buttons in Mobile Drawer */}
            <div className="grid gap-2.5 sm:grid-cols-2">
              <Link
                to="/application"
                onClick={() => setOpen(false)}
                className="btn btn-primary flex w-full items-center justify-center gap-2 py-3 text-[15px] font-semibold shadow-md"
              >
                <span>Start Application</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn btn-outline-light flex w-full items-center justify-center gap-2 border-emerald-500/40 py-2.5 text-[15px] font-semibold text-emerald-300 hover:bg-emerald-500/10"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Categorized Navigation Groups */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {mobileNavGroups.map((group) => (
                <div key={group.title} className="space-y-2">
                  <p className="eyebrow text-sky-soft text-xs">{group.title}</p>
                  <div className="grid gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-2.5 transition-colors hover:bg-navy-soft"
                        activeProps={{ className: "bg-navy-soft text-navy-foreground" }}
                      >
                        <p className="text-[15px] font-medium text-navy-foreground">{item.label}</p>
                        <p className="text-xs text-navy-muted">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary Student Account Access & Direct Contact */}
            <div className="mt-6 border-t border-navy-border/60 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-navy-muted">
                <div className="flex items-center gap-4">
                  <Link
                    to="/student"
                    onClick={() => setOpen(false)}
                    className="font-medium text-sky-soft hover:underline"
                  >
                    Student Dashboard Preview →
                  </Link>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <Link
                    to={authNav.login.to}
                    onClick={() => setOpen(false)}
                    className="hover:text-navy-foreground"
                  >
                    {authNav.login.label}
                  </Link>
                  <span>·</span>
                  <Link
                    to={authNav.signup.to}
                    onClick={() => setOpen(false)}
                    className="hover:text-navy-foreground"
                  >
                    {authNav.signup.label}
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1 text-xs text-navy-muted sm:flex-row sm:justify-between">
                <p>📍 {contact.address}</p>
                <p>🕒 {contact.hours}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
