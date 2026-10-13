/**
 * Central site configuration for Frankedu Global.
 * Replace brand assets, navigation labels and contact details here.
 */
import heroImage from "@/assets/background-photo.webp";
import heroMobileImage from "@/assets/background-photo-768.webp";

export type AppPath =
  | "/"
  | "/universities"
  | "/courses"
  | "/countries"
  | "/scholarships"
  | "/services"
  | "/marketplace"
  | "/about"
  | "/contact"
  | "/login"
  | "/signup"
  | "/application"
  | "/student"
  | "/accommodation"
  | "/real-estate";

export interface NavItem {
  label: string;
  to: AppPath;
}

/** Canonical production origin (apex host, no trailing slash). */
export const siteUrl = "https://franklyedu.com";

export const brand = {
  name: "Frankedu Global",
  shortName: "Frankedu",
  /** Fallback single-letter mark if image logo cannot be rendered */
  mark: "F",
  tagline: "Your Future • Our Priority",
  /** Services line from the official logo lockup, rendered as text beside the symbol. */
  servicesTagline: "Education | Real Estate | Digital Services",
  /** Cap-and-globe symbol cropped from the official logo; the wordmark is rendered as text. */
  markImage: "/frankedu-mark.webp",
  /** 1200×630 social preview card used for Open Graph and Twitter. */
  ogImage: "/og-image.png",
  faviconPath: "/favicon.ico",
  appleTouchIconPath: "/apple-touch-icon.png",
  markWidth: 158,
  markHeight: 141,
};

export const images = {
  hero: heroImage,
  heroMobile: heroMobileImage,
  heroAlt:
    "Frankedu Global representative with international education and career planning materials",
  heroWidth: 941,
  heroHeight: 1672,
};

export const contact = {
  email: "emmanuel@frankedu-global.com",
  phone: "+90 548 850 4146",
  /** Digits only, international format — used to build the WhatsApp link. */
  whatsappNumber: "905488504146",
  whatsappDefaultMessage: "Hello Frankedu Global, I'd like guidance on studying abroad.",
  address: "Regal Residence, Küçük Kaymaklı, Lefkoşa, North Cyprus",
  /** Working hours unconfigured — will be supplied separately by management */
  hours: undefined as string | undefined,
  social: {
    tiktok: "https://www.tiktok.com/@ambfranklykelly22",
    facebook: "https://www.facebook.com/share/1FtvSH1K3p/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/franklyedu_global?stkn=MXdrcGhnNG5zOWJqag==",
    // LinkedIn and YouTube remain unconfigured until confirmed by management
    linkedin: undefined as string | undefined,
    youtube: undefined as string | undefined,
  },
};

export const whatsappLink = (message: string = contact.whatsappDefaultMessage) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mainNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Universities", to: "/universities" },
  { label: "Courses", to: "/courses" },
  { label: "Countries", to: "/countries" },
  { label: "Scholarships", to: "/scholarships" },
  { label: "Services", to: "/services" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "Universities", to: "/universities" },
      { label: "Courses", to: "/courses" },
      { label: "Countries", to: "/countries" },
      { label: "Scholarships", to: "/scholarships" },
    ],
  },
  {
    title: "Students",
    items: [
      { label: "Start an application", to: "/application" },
      { label: "Services", to: "/services" },
    ],
  },
  {
    title: "Marketplace",
    items: [
      { label: "Marketplace", to: "/marketplace" },
      { label: "Accommodation", to: "/accommodation" },
      { label: "Real Estate", to: "/real-estate" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
];
