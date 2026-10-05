import { Link } from "@tanstack/react-router";
import { MessageCircle, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { authNav, brand, contact, whatsappLink } from "@/data/site";
import { useLocale } from "@/lib/locale";
import { useTranslations } from "@/data/translations";
import { cn } from "@/lib/utils";

export function LanguageSelector({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/20 bg-white/10 p-0.5 text-xs font-semibold backdrop-blur-xs",
        className,
      )}
      role="group"
      aria-label={locale === "tr" ? "Dil seçici" : "Language selector"}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-1 text-xs transition-all",
          locale === "en"
            ? "bg-white text-navy font-bold shadow-xs"
            : "text-white/75 hover:text-white",
        )}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("tr")}
        className={cn(
          "rounded-full px-2.5 py-1 text-xs transition-all",
          locale === "tr"
            ? "bg-white text-navy font-bold shadow-xs"
            : "text-white/75 hover:text-white",
        )}
        aria-label="Türkçe diline geç"
        aria-pressed={locale === "tr"}
      >
        TR
      </button>
    </div>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-2.5 sm:gap-3"
      aria-label={`${brand.name} home`}
    >
      <img
        src="/icon-192.png"
        alt=""
        width={compact ? 36 : 44}
        height={compact ? 36 : 44}
        className="h-10 w-auto max-h-10 rounded-sm object-contain sm:h-11 sm:max-h-11"
        loading="eager"
      />
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-tight text-white sm:text-base">
            {brand.shortName}
          </span>
          <span className="font-display text-[9.5px] font-semibold tracking-[0.22em] uppercase text-sky-contrast sm:text-[10px]">
            Global
          </span>
        </div>
      )}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { common } = useTranslations();

  // Desktop navigation items localized dynamically
  const desktopNavItems = [
    { label: common.nav.universities, to: "/universities" as const },
    { label: common.nav.courses, to: "/courses" as const },
    { label: common.nav.countries, to: "/countries" as const },
    { label: common.nav.scholarships, to: "/scholarships" as const },
    { label: common.nav.services, to: "/services" as const },
    { label: common.nav.marketplace, to: "/marketplace" as const },
    { label: common.nav.about, to: "/about" as const },
    { label: common.nav.contact, to: "/contact" as const },
  ];

  // Grouped sections for mobile drawer clarity
  const mobileNavGroups = [
    {
      title: common.mobileDrawer.studyPathwaysTitle,
      items: [
        {
          label: common.nav.universities,
          to: "/universities" as const,
          desc: common.mobileDrawer.universitiesDesc,
        },
        {
          label: common.nav.courses,
          to: "/courses" as const,
          desc: common.mobileDrawer.coursesDesc,
        },
        {
          label: common.nav.countries,
          to: "/countries" as const,
          desc: common.mobileDrawer.destinationsDesc,
        },
        {
          label: common.nav.scholarships,
          to: "/scholarships" as const,
          desc: common.mobileDrawer.scholarshipsDesc,
        },
      ],
    },
    {
      title: common.mobileDrawer.servicesLivingTitle,
      items: [
        {
          label: common.nav.services,
          to: "/services" as const,
          desc: common.mobileDrawer.studentServicesDesc,
        },
        {
          label: common.nav.marketplace,
          to: "/marketplace" as const,
          desc: common.mobileDrawer.marketplaceDesc,
        },
        {
          label: common.footer.accommodation,
          to: "/accommodation" as const,
          desc: common.mobileDrawer.accommodationDesc,
        },
        {
          label: common.footer.realEstate,
          to: "/real-estate" as const,
          desc: common.mobileDrawer.realEstateDesc,
        },
      ],
    },
    {
      title: common.mobileDrawer.companyTitle,
      items: [
        {
          label: common.nav.about,
          to: "/about" as const,
          desc: common.mobileDrawer.aboutDesc,
        },
        {
          label: common.nav.contact,
          to: "/contact" as const,
          desc: common.mobileDrawer.contactDesc,
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 relative overflow-hidden border-b border-white/15 bg-navy/95 text-white backdrop-blur supports-[backdrop-filter]:bg-navy/90">
      {/* Visible Full Logo Artwork Background Watermark — clean transparent artwork, zero checkerboard */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/85" />
        <img
          src="/logo-watermark-white.png"
          alt=""
          className="absolute -top-3 right-14 h-22 w-auto max-w-none object-contain opacity-12 sm:right-1/4 sm:-top-5 sm:h-26 sm:opacity-14 lg:right-1/3 lg:-top-6 lg:h-28 lg:opacity-15"
        />
      </div>

      <div className="container-site relative z-10 flex h-16 items-center justify-between gap-3 lg:gap-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 xl:gap-2 lg:flex" aria-label="Main">
          {desktopNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:text-white xl:px-3 xl:text-sm"
              activeProps={{ className: "text-white font-semibold bg-white/15 shadow-xs" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Language Selector — provides breathing room for nav items */}
        <div className="hidden items-center lg:flex">
          <LanguageSelector />
        </div>

        {/* Mobile Header Quick Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSelector />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-md border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 active:bg-white/30"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="relative max-h-[calc(100vh-4rem)] overflow-hidden overflow-y-auto border-t border-white/15 bg-navy lg:hidden">
          {/* Watermark in Mobile Drawer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 select-none overflow-hidden"
          >
            <img
              src="/logo-watermark-white.png"
              alt=""
              className="absolute -bottom-10 -right-8 h-56 w-auto max-w-none object-contain opacity-10"
            />
          </div>

          <div className="container-site relative z-10 py-5">
            {/* Language Switcher in Mobile Drawer */}
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-semibold text-white/80">
                {common.mobileDrawer.languageTitle}
              </span>
              <LanguageSelector />
            </div>

            {/* Primary Action Buttons in Mobile Drawer */}
            <div className="grid gap-2.5 sm:grid-cols-2">
              <Link
                to="/application"
                onClick={() => setOpen(false)}
                className="btn btn-light flex w-full items-center justify-center gap-2 py-3 text-[15px] font-bold shadow-md"
              >
                <span>{common.mobileDrawer.startApplication}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn btn-outline-light flex w-full items-center justify-center gap-2 border-emerald-400/50 bg-emerald-950/20 py-2.5 text-[15px] font-semibold text-emerald-300 hover:bg-emerald-500/20"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{common.mobileDrawer.chatWhatsapp}</span>
              </a>
            </div>

            {/* Categorized Navigation Groups */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {mobileNavGroups.map((group) => (
                <div key={group.title} className="space-y-2">
                  <p className="eyebrow text-xs font-bold tracking-wider text-sky-contrast">
                    {group.title}
                  </p>
                  <div className="grid gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-2.5 transition-colors hover:bg-white/10 active:bg-white/15"
                        activeProps={{
                          className: "bg-white/15 text-white font-semibold shadow-xs",
                        }}
                      >
                        <p className="text-[15px] font-semibold text-white">{item.label}</p>
                        <p className="text-xs leading-relaxed text-navy-muted">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary Student Account Access & Direct Contact */}
            <div className="mt-6 border-t border-white/15 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-navy-muted">
                <div className="flex items-center gap-4">
                  <Link
                    to="/student"
                    onClick={() => setOpen(false)}
                    className="font-semibold text-sky-contrast hover:text-white hover:underline"
                  >
                    {common.mobileDrawer.studentPreview}
                  </Link>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <Link
                    to={authNav.login.to}
                    onClick={() => setOpen(false)}
                    className="font-medium text-white/90 hover:text-white hover:underline"
                  >
                    {common.nav.login}
                  </Link>
                  <span className="text-white/40">·</span>
                  <Link
                    to={authNav.signup.to}
                    onClick={() => setOpen(false)}
                    className="font-medium text-white/90 hover:text-white hover:underline"
                  >
                    {common.nav.signup}
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1 text-xs text-navy-muted sm:flex-row sm:justify-between">
                <p>📍 {contact.address}</p>
                {contact.hours ? <p>🕒 {contact.hours}</p> : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
