import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, MessageCircle, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { brand, contact, whatsappLink } from "@/data/site";
import { useLocale } from "@/lib/locale";
import { useTranslations } from "@/data/translations";
import { cn } from "@/lib/utils";

export function LanguageSelector({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const selectorRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const languageButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const languages = [
    { locale: "en", label: "EN", name: "English" },
    { locale: "tr", label: "TR", name: "Türkçe" },
    { locale: "fr", label: "FR", name: "Français" },
    { locale: "sw", label: "SW", name: "Kiswahili" },
  ] as const;
  const selectedLanguage = languages.find((language) => language.locale === locale)!;
  const selectorLabels = {
    en: { trigger: `Select language, current: ${selectedLanguage.name}`, group: "Languages" },
    tr: { trigger: `Dil seçin, mevcut: ${selectedLanguage.name}`, group: "Diller" },
    fr: {
      trigger: `Choisir la langue, langue actuelle : ${selectedLanguage.name}`,
      group: "Langues",
    },
    sw: {
      trigger: `Chagua lugha, lugha ya sasa: ${selectedLanguage.name}`,
      group: "Lugha",
    },
  }[locale];

  useEffect(() => {
    if (!expanded) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) setExpanded(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [expanded]);

  const openAndFocus = (index: number) => {
    setExpanded(true);
    requestAnimationFrame(() => languageButtonRefs.current[index]?.focus());
  };

  return (
    <div className={cn("relative", className)} ref={selectorRef}>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-border bg-white px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={selectorLabels.trigger}
        aria-expanded={expanded}
        aria-controls={`${id}-options`}
        onClick={() => setExpanded((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openAndFocus(event.key === "ArrowDown" ? 0 : languages.length - 1);
          }
        }}
      >
        <span>{selectedLanguage.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
        />
      </button>
      {expanded && (
        <div
          id={`${id}-options`}
          role="group"
          aria-label={selectorLabels.group}
          className="absolute right-0 top-full z-[70] mt-2 grid w-max min-w-36 max-w-[calc(100vw-1rem)] gap-1 rounded-xl border border-border bg-white p-1.5 text-sm shadow-xl"
        >
          {languages.map(({ locale: target, name }, index) => (
            <button
              key={target}
              ref={(element) => {
                languageButtonRefs.current[index] = element;
              }}
              type="button"
              onClick={() => {
                setLocale(target);
                setExpanded(false);
                triggerRef.current?.focus();
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const direction = event.key === "ArrowDown" ? 1 : -1;
                  const nextIndex = (index + direction + languages.length) % languages.length;
                  languageButtonRefs.current[nextIndex]?.focus();
                } else if (event.key === "Home" || event.key === "End") {
                  event.preventDefault();
                  const nextIndex = event.key === "Home" ? 0 : languages.length - 1;
                  languageButtonRefs.current[nextIndex]?.focus();
                }
              }}
              className={cn(
                "flex min-h-11 items-center rounded-lg px-3 text-left text-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
                locale === target && "bg-primary/10 font-semibold text-primary",
              )}
              aria-current={locale === target ? "true" : undefined}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Only allow the services tagline to wrap after a "|" separator, never inside a service name. */
const taglineWithSeparatorBreaks = brand.servicesTagline
  .split(" | ")
  .map((service) => service.replaceAll(" ", "\u00A0"))
  .join("\u00A0| ");

export function Logo({
  onDark = false,
}: {
  /** Light wordmark and a white badge behind the symbol for navy surfaces. */
  onDark?: boolean;
}) {
  if (!onDark) {
    return (
      <Link
        to="/"
        data-brand-lockup
        className="flex w-fit min-w-0 shrink items-center gap-1.5 sm:gap-2"
        aria-label={`${brand.name} home`}
      >
        <img
          data-brand-symbol
          src={brand.markImage}
          alt=""
          width={brand.markWidth}
          height={brand.markHeight}
          className="h-9 w-auto shrink-0 object-contain sm:h-10 md:h-11"
          loading="eager"
        />
        <span data-brand-wordmark className="flex min-w-0 flex-col">
          <span className="font-display text-[15px]/none font-bold tracking-tight text-foreground sm:text-base/none md:text-lg/none">
            {brand.shortName}
          </span>
          <span className="mt-[3px] font-display text-[9px]/none font-semibold tracking-[0.3em] text-primary uppercase md:text-[10px]/none">
            Global
          </span>
          <span
            lang="en"
            data-brand-tagline
            className="mt-[3px] text-[9px]/[1.15] font-medium text-muted-foreground min-[360px]:text-[9.5px]/none md:text-[10px]/none"
          >
            {taglineWithSeparatorBreaks}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      to="/"
      data-brand-lockup
      className="flex w-fit min-w-0 flex-col items-center text-center"
      aria-label={`${brand.name} home`}
    >
      <span className="mb-1.5 flex shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm">
        <img
          src={brand.markImage}
          alt=""
          width={brand.markWidth}
          height={brand.markHeight}
          className="h-12 w-auto object-contain sm:h-14"
          loading="eager"
        />
      </span>
      <span className="mt-0.5 font-display text-xl/none font-bold tracking-tight text-white">
        {brand.shortName}
      </span>
      <span className="mt-[3px] pl-[0.3em] font-display text-[11px]/none font-semibold tracking-[0.3em] text-sky-contrast uppercase">
        Global
      </span>
      <span
        lang="en"
        data-brand-tagline
        className="mt-1 text-xs leading-snug font-medium text-balance text-white/85"
      >
        {taglineWithSeparatorBreaks}
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { common } = useTranslations();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

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
    <header className="sticky top-0 z-50 relative border-b border-border bg-white text-foreground shadow-xs">
      <div className="container-site relative z-10 flex h-16 items-center justify-between md:h-18 gap-3 lg:gap-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav
          className="hidden shrink-0 items-center gap-1 xl:flex"
          aria-label={common.nav.mainNavigationLabel}
        >
          {desktopNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-primary xl:text-sm"
              activeProps={{
                className: "bg-primary !text-primary-foreground font-semibold shadow-xs",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Language Selector — provides breathing room for nav items */}
        <div className="hidden shrink-0 items-center xl:flex">
          <LanguageSelector />
        </div>

        {/* Mobile Header Quick Actions */}
        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <LanguageSelector />
          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-md border border-border bg-white text-foreground transition-colors hover:bg-muted active:bg-muted"
            aria-label={open ? common.mobileDrawer.closeMenu : common.mobileDrawer.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav
          id="mobile-navigation"
          aria-label={common.mobileDrawer.navigationLabel}
          className="mobile-drawer-enter relative max-h-[calc(100dvh-4rem)] md:max-h-[calc(100dvh-4.5rem)] overscroll-contain overflow-y-auto border-t border-white/15 bg-navy xl:hidden"
        >
          {/* Watermark in Mobile Drawer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 select-none overflow-hidden"
          >
            <img
              src="/logo-watermark-white.webp"
              alt=""
              className="absolute -bottom-10 -right-8 h-56 w-auto max-w-none object-contain opacity-10"
            />
          </div>

          <div className="container-site relative z-10 py-5">
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

            {/* Direct contact details */}
            <div className="mt-6 border-t border-white/15 pt-5">
              <div className="flex flex-col gap-1 text-xs text-navy-muted sm:flex-row sm:justify-between">
                <p>📍 {contact.address}</p>
                {contact.hours ? <p>🕒 {contact.hours}</p> : null}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
