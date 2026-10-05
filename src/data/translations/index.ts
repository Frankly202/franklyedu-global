import { useLocale, type Locale } from "@/lib/locale";
import { commonTranslations, type CommonTranslation } from "./common";
import { homeTranslations, type HomeTranslation } from "./home";
import { educationTranslations, type EducationTranslation } from "./education";
import { marketplaceTranslations, type MarketplaceTranslation } from "./marketplace";
import { portalTranslations, type PortalTranslation } from "./portal";
import { companyTranslations, type CompanyTranslation } from "./company";

export interface Translations {
  common: CommonTranslation;
  home: HomeTranslation;
  education: EducationTranslation;
  marketplace: MarketplaceTranslation;
  portal: PortalTranslation;
  company: CompanyTranslation;
}

export const translations: Record<Locale, Translations> = {
  en: {
    common: commonTranslations.en,
    home: homeTranslations.en,
    education: educationTranslations.en,
    marketplace: marketplaceTranslations.en,
    portal: portalTranslations.en,
    company: companyTranslations.en,
  },
  tr: {
    common: commonTranslations.tr,
    home: homeTranslations.tr,
    education: educationTranslations.tr,
    marketplace: marketplaceTranslations.tr,
    portal: portalTranslations.tr,
    company: companyTranslations.tr,
  },
};

export function useTranslations() {
  const { locale, setLocale, toggleLocale } = useLocale();
  return {
    locale,
    setLocale,
    toggleLocale,
    t: translations[locale],
    common: translations[locale].common,
    home: translations[locale].home,
    education: translations[locale].education,
    marketplace: translations[locale].marketplace,
    portal: translations[locale].portal,
    company: translations[locale].company,
  };
}

export * from "./common";
export * from "./home";
export * from "./education";
export * from "./marketplace";
export * from "./portal";
export * from "./company";
