/**
 * Central site configuration for Frankedu Global.
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
  name: "Frankedu Global",
  shortName: "Frankedu",
  /** Fallback single-letter mark if image logo cannot be rendered */
  mark: "F",
  tagline: "Your Future • Our Priority",
  logoImage: "/Logo.JPG",
  faviconPath: "/favicon.ico",
  appleTouchIconPath: "/apple-touch-icon.png",
  logoWidth: 1480,
  logoHeight: 1062,
};

export const images = {
  hero: heroImage,
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
