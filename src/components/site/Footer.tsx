import { Link } from "@tanstack/react-router";
import { brand, contact, footerNav, whatsappLink } from "@/data/site";
import { Logo } from "./Navbar";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-navy-muted">
            Clear guidance for students choosing where — and how — to study abroad.
          </p>
          <div className="space-y-1 text-sm text-navy-muted">
            <p>{contact.address}</p>
            <a href={`mailto:${contact.email}`} className="block hover:text-navy-foreground">
              {contact.email}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block hover:text-navy-foreground">
              WhatsApp {contact.phone}
            </a>
          </div>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <h3 className="eyebrow mb-3 text-sky-soft">{group.title}</h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.to + item.label}>
                  <Link to={item.to} className="text-sm text-navy-muted transition-colors hover:text-navy-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-navy-border">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p>Listings marked “template” are placeholders pending verification.</p>
        </div>
      </div>
    </footer>
  );
}
