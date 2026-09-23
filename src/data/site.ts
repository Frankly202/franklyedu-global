/**
 * Central site configuration for FranklyEdu Global.
 * Replace brand assets, navigation labels and contact details here.
 */
import heroImage from "@/assets/background-photo.jpg";

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

export const brand = {
  name: "FranklyEdu Global",
  shortName: "FranklyEdu",
  /** Fallback single-letter mark if image logo cannot be rendered */
  mark: "F",
  tagline: "Your global study pathway",
  logoImage: "/Logo.JPG",
  faviconPath: "/Logo.JPG",
  logoWidth: 1480,
  logoHeight: 1062,
};

export const images = {
  hero: heroImage,
  heroAlt:
    "FranklyEdu Global founder Frank with international education and career planning materials",
  heroWidth: 941,
  heroHeight: 1672,
};

export const contact = {
  email: "hello@franklyedu.com",
  phone: "+90 533 000 0000",
  /** Digits only, international format — used to build the WhatsApp link. */
  whatsappNumber: "905330000000",
  whatsappDefaultMessage: "Hello FranklyEdu Global, I'd like guidance on studying abroad.",
  address: "Famagusta, North Cyprus",
  hours: "Mon – Sat, 09:00 – 18:00 (UTC+3)",
  social: {
    instagram: "https://instagram.com/franklyedu",
    linkedin: "https://linkedin.com/company/franklyedu",
    tiktok: "https://tiktok.com/@franklyedu",
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

export const authNav = {
  login: { label: "Login", to: "/login" as AppPath },
  signup: { label: "Sign Up", to: "/signup" as AppPath },
};

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
      { label: "Student dashboard", to: "/student" },
      { label: "Services", to: "/services" },
      { label: "Login", to: "/login" },
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
