import { useLocale, type Locale } from "@/lib/locale";
import { commonTranslations, type CommonTranslation } from "./common";
import { homeTranslations, type HomeTranslation } from "./home";
import { educationTranslations, type EducationTranslation } from "./education";
import { marketplaceTranslations, type MarketplaceTranslation } from "./marketplace";
import { portalTranslations, type PortalTranslation } from "./portal";
import { referralTranslations, type ReferralTranslation } from "./referral";
import { companyTranslations, type CompanyTranslation } from "./company";
import { localizeTree } from "./localize";

export interface Translations {
  common: CommonTranslation;
  home: HomeTranslation;
  education: EducationTranslation;
  marketplace: MarketplaceTranslation;
  portal: PortalTranslation;
  referral: ReferralTranslation;
  company: CompanyTranslation;
}

export const translations: Record<Locale, Translations> = {
  en: {
    common: commonTranslations.en,
    home: homeTranslations.en,
    education: educationTranslations.en,
    marketplace: marketplaceTranslations.en,
    portal: portalTranslations.en,
    referral: referralTranslations.en,
    company: companyTranslations.en,
  },
  tr: {
    common: commonTranslations.tr,
    home: homeTranslations.tr,
    education: educationTranslations.tr,
    marketplace: marketplaceTranslations.tr,
    portal: portalTranslations.tr,
    referral: referralTranslations.tr,
    company: companyTranslations.tr,
  },
  fr: {
    common: localizeTree("fr", commonTranslations.en),
    home: localizeTree("fr", homeTranslations.en),
    education: localizeTree("fr", educationTranslations.en),
    marketplace: localizeTree("fr", marketplaceTranslations.en),
    portal: localizeTree("fr", portalTranslations.en),
    referral: referralTranslations.fr,
    company: localizeTree("fr", companyTranslations.en),
  },
  sw: {
    common: localizeTree("sw", commonTranslations.en),
    home: localizeTree("sw", homeTranslations.en),
    education: localizeTree("sw", educationTranslations.en),
    marketplace: localizeTree("sw", marketplaceTranslations.en),
    portal: localizeTree("sw", portalTranslations.en),
    referral: referralTranslations.sw,
    company: localizeTree("sw", companyTranslations.en),
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
    referral: translations[locale].referral,
    company: translations[locale].company,
  };
}

export * from "./common";
export * from "./home";
export * from "./education";
export * from "./marketplace";
export * from "./portal";
export * from "./referral";
export * from "./company";
