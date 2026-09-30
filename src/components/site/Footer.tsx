import { Link } from "@tanstack/react-router";
import { brand, contact, footerNav, whatsappLink } from "@/data/site";
import { Logo } from "./Navbar";

export function Footer() {
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

      <div className="container-site relative z-10 grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-navy-muted sm:text-[15px]">
            Clear guidance for students choosing where — and how — to study abroad.
          </p>
          <div className="space-y-1.5 text-sm text-white/90 sm:text-[15px]">
            <p>{contact.address}</p>
            <a
              href={`mailto:${contact.email}`}
              className="block transition-colors hover:text-white hover:underline"
            >
              {contact.email}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="block font-medium text-emerald-300 transition-colors hover:text-emerald-200 hover:underline"
            >
              WhatsApp {contact.phone}
            </a>
            <div className="flex items-center gap-2.5 pt-1.5 text-xs">
              {contact.social.tiktok && (
                <a
                  href={contact.social.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-white transition-colors hover:bg-white/20"
                >
                  TikTok
                </a>
              )}
              {contact.social.facebook && (
                <a
                  href={contact.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-white transition-colors hover:bg-white/20"
                >
                  Facebook
                </a>
              )}
              {contact.social.instagram && (
                <a
                  href={contact.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-white transition-colors hover:bg-white/20"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <h3 className="eyebrow mb-3 font-bold tracking-wider text-sky-contrast">
              {group.title}
            </h3>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-navy-muted transition-colors hover:text-white hover:underline sm:text-[15px]"
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
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p>
            Confirmed partner listings. Additional destinations available via our education network.
          </p>
        </div>
      </div>
    </footer>
  );
}
