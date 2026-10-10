import { Link } from "@tanstack/react-router";
import { brand, contact, whatsappLink } from "@/data/site";
import { useTranslations } from "@/data/translations";
import { Logo } from "./Navbar";

export function Footer() {
  const { common } = useTranslations();

  const footerGroups = [
    {
      title: common.footer.exploreTitle,
      items: [
        { label: common.nav.universities, to: "/universities" as const },
        { label: common.nav.courses, to: "/courses" as const },
        { label: common.nav.countries, to: "/countries" as const },
        { label: common.nav.scholarships, to: "/scholarships" as const },
      ],
    },
    {
      title: common.footer.studentsTitle,
      items: [
        { label: common.footer.startApplication, to: "/application" as const },
        { label: common.footer.studentDashboard, to: "/student" as const },
        { label: common.footer.services, to: "/services" as const },
        { label: common.nav.login, to: "/login" as const },
      ],
    },
    {
      title: common.footer.marketplaceTitle,
      items: [
        { label: common.nav.marketplace, to: "/marketplace" as const },
        { label: common.footer.accommodation, to: "/accommodation" as const },
        { label: common.footer.realEstate, to: "/real-estate" as const },
      ],
    },
    {
      title: common.footer.companyTitle,
      items: [
        { label: common.nav.about, to: "/about" as const },
        { label: common.nav.contact, to: "/contact" as const },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      {/* Subtle Logo Watermark in Footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <img
          src="/logo-watermark-white.png"
          alt=""
          className="absolute -bottom-14 -right-12 h-64 w-auto max-w-none object-contain opacity-8 sm:h-72 sm:opacity-10 lg:-bottom-16 lg:h-80"
        />
      </div>

      <div className="container-site relative z-10 grid gap-8 py-14 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-navy-muted sm:text-[15px]">
            {common.footer.tagline}
          </p>
          <div className="space-y-1.5 text-sm text-white/90 sm:text-[15px]">
            <p>{contact.address}</p>
            <a
              href={`mailto:${contact.email}`}
              className="flex min-h-11 items-center transition-colors hover:text-white hover:underline"
            >
              {contact.email}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center font-medium text-emerald-300 transition-colors hover:text-emerald-200 hover:underline"
            >
              WhatsApp {contact.phone}
            </a>
            <div className="flex items-center gap-2.5 pt-1.5 text-xs">
              {contact.social.tiktok && (
                <a
                  href={contact.social.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-md border border-white/15 bg-white/10 px-2.5 text-white transition-colors hover:bg-white/20"
                >
                  TikTok
                </a>
              )}
              {contact.social.facebook && (
                <a
                  href={contact.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-md border border-white/15 bg-white/10 px-2.5 text-white transition-colors hover:bg-white/20"
                >
                  Facebook
                </a>
              )}
              {contact.social.instagram && (
                <a
                  href={contact.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-md border border-white/15 bg-white/10 px-2.5 text-white transition-colors hover:bg-white/20"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="eyebrow mb-3 font-bold tracking-wider text-sky-contrast">
              {group.title}
            </h3>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="flex min-h-11 items-center text-sm text-navy-muted transition-colors hover:text-white hover:underline sm:text-[15px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative z-10 border-t border-white/15">
        <div className="container-site flex flex-col gap-2 py-5 text-[13px] text-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. {common.footer.copyright}
          </p>
          <p>{common.footer.partnerNotice}</p>
        </div>
      </div>
    </footer>
  );
}
