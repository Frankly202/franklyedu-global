export interface ServicePillarTranslation {
  title: string;
  tagline: string;
  description: string;
  points: string[];
  ctaLabel: string;
  href: string;
}

export interface HomeTranslation {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    subhead: string;
    description: string;
    applyCta: string;
    whatsappCta: string;
    search: {
      destinationLabel: string;
      destinationPlaceholder: string;
      submitBtn: string;
    };
    trustBadge: {
      title: string;
      subtitle: string;
    };
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    exploreAll: string;
    education: ServicePillarTranslation;
    properties: ServicePillarTranslation;
    creative: ServicePillarTranslation;
  };
  destinations: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    badge: string;
  };
  universities: {
    eyebrow: string;
    title: string;
    subtitle: string;
    browseAll: string;
  };
  properties: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    disclaimer: string;
  };
  ctaBanner: {
    eyebrow: string;
    title: string;
    subtitle: string;
    whatsappCta: string;
    consultationCta: string;
    applyCta?: string;
  };
}

export const homeTranslations: Record<"en" | "tr", HomeTranslation> = {
  en: {
    hero: {
      eyebrow: "Education • Property • Digital Services",
      titleLine1: "Clear information for",
      titleHighlight: "your next decision.",
      subhead: "Study options • Property information • Digital services",
      description:
        "Frankedu Global helps students, families, and clients ask informed questions about study options, property information, and digital services.",
      applyCta: "Start Application",
      whatsappCta: "Chat on WhatsApp",
      search: {
        destinationLabel: "Study destination",
        destinationPlaceholder: "Germany, UK, Cyprus…",
        submitBtn: "Find Universities",
      },
      trustBadge: {
        title: "Straightforward enquiries",
        subtitle: "Study options • Property information",
      },
    },
    services: {
      eyebrow: "Our Services",
      title: "Study, property, and digital enquiries.",
      subtitle:
        "Ask us about current study information, property details, or digital services. We will confirm what is available.",
      exploreAll: "Explore All Services",
      education: {
        title: "Education & Admissions",
        tagline: "Study information",
        description:
          "Ask about current admissions information and study options. Final International University (FIU) is the only confirmed recruitment relationship.",
        points: [
          "Current programmes and entry requirements need confirmation",
          "Fees, scholarship terms, and intakes may change",
          "Check visa requirements with the relevant authorities",
        ],
        ctaLabel: "Browse Universities",
        href: "/universities",
      },
      properties: {
        title: "Property information",
        tagline: "Property information",
        description:
          "Ask about the property listing shown on this site. Availability, price, and particulars need current confirmation.",
        points: [
          "Current availability on enquiry",
          "Details should be confirmed before proceeding",
          "Independent advice may be appropriate",
        ],
        ctaLabel: "Explore Properties",
        href: "/real-estate",
      },
      creative: {
        title: "Digital services",
        tagline: "Digital services",
        description: "Contact us to discuss a digital service request.",
        points: [
          "Scope and availability confirmed per enquiry",
          "Pricing discussed before work begins",
        ],
        ctaLabel: "Get a Quote",
        href: "/services",
      },
    },
    destinations: {
      eyebrow: "Study destinations",
      title: "Study destinations.",
      subtitle:
        "Browse destinations listed on this site. Current programmes, admissions, costs, and dates vary; contact us to ask about specific options.",
      viewAll: "View All Destinations",
      badge: "Study destination",
    },
    universities: {
      eyebrow: "Universities",
      title: "University directory",
      subtitle:
        "We have a confirmed recruitment relationship with Final International University (FIU). Contact us for current programme and admissions details.",
      browseAll: "Browse All Universities",
    },
    properties: {
      eyebrow: "Property listing",
      title: "Property listing.",
      subtitle:
        "One property listing is shown here. Ask us to confirm its current availability and details.",
      viewAll: "Explore All Properties",
      disclaimer:
        "Listing information may change. Confirm current details before making a decision.",
    },
    ctaBanner: {
      eyebrow: "Get in touch",
      title: "Have a question about your next step?",
      subtitle:
        "Contact Frankedu Global to discuss study information, a property listing, or digital services.",
      whatsappCta: "Chat on WhatsApp",
      consultationCta: "Contact us",
      applyCta: "Contact us",
    },
  },
  tr: {
    hero: {
      eyebrow: "Eğitim • Gayrimenkul • Dijital Hizmetler",
      titleLine1: "Bir sonraki kararınız için",
      titleHighlight: "açık bilgiler.",
      subhead: "Eğitim seçenekleri • Gayrimenkul bilgileri • Dijital hizmetler",
      description:
        "Frankedu Global; öğrencilere, ailelere ve müşterilere eğitim seçenekleri, gayrimenkul bilgileri ve dijital hizmetler hakkında bilgi edinme konusunda yardımcı olur.",
      applyCta: "Başvuru Yap",
      whatsappCta: "WhatsApp'tan Yazın",
      search: {
        destinationLabel: "Eğitim ülkesi",
        destinationPlaceholder: "Almanya, İngiltere, Kıbrıs…",
        submitBtn: "Üniversite Bul",
      },
      trustBadge: {
        title: "Açık ve doğrudan iletişim",
        subtitle: "Eğitim danışmanlığı • Gayrimenkul bilgileri",
      },
    },
    services: {
      eyebrow: "Hizmetlerimiz",
      title: "Eğitim, gayrimenkul ve dijital hizmetler.",
      subtitle:
        "Güncel eğitim bilgileri, gayrimenkul ayrıntıları veya dijital hizmetler hakkında bilgi alın. Nelerin mevcut olduğunu teyit ederiz.",
      exploreAll: "Tüm Hizmetleri Gör",
      education: {
        title: "Eğitim ve Üniversite Kabulü",
        tagline: "Eğitim bilgileri",
        description:
          "Güncel kabul bilgileri ve eğitim seçeneklerini sorun. Final International University (FIU), doğrulanmış tek öğrenci alım ilişkimizdir.",
        points: [
          "Program ve giriş koşulları güncel olarak teyit edilmelidir",
          "Ücret, burs koşulları ve kayıt dönemleri değişebilir",
          "Vize koşullarını ilgili resmi makamlarla kontrol edin",
        ],
        ctaLabel: "Üniversiteleri İncele",
        href: "/universities",
      },
      properties: {
        title: "Gayrimenkul bilgileri",
        tagline: "Gayrimenkul bilgileri",
        description:
          "Bu sitedeki gayrimenkul ilanı hakkında bilgi alın. Uygunluk, fiyat ve ayrıntılar güncel olarak teyit edilmelidir.",
        points: [
          "Güncel uygunluk için bilgi alın",
          "İlerlemeye karar vermeden önce ayrıntıları teyit edin",
          "Bağımsız danışmanlık almayı değerlendirin",
        ],
        ctaLabel: "Mülkleri İncele",
        href: "/real-estate",
      },
      creative: {
        title: "Dijital hizmetler",
        tagline: "Dijital hizmetler",
        description: "Dijital hizmet talebinizi görüşmek için bizimle iletişime geçin.",
        points: [
          "Kapsam ve uygunluk talebe göre teyit edilir",
          "Fiyatlandırma işe başlamadan önce görüşülür",
        ],
        ctaLabel: "Fiyat Teklifi Alın",
        href: "/services",
      },
    },
    destinations: {
      eyebrow: "Eğitim destinasyonları",
      title: "Eğitim destinasyonları.",
      subtitle:
        "Bu sitede listelenen destinasyonlara göz atın. Programlar, kabul koşulları, ücretler ve tarihler değişebilir; seçenekleri sorun.",
      viewAll: "Tüm Ülkeleri Gör",
      badge: "Eğitim destinasyonu",
    },
    universities: {
      eyebrow: "Üniversiteler",
      title: "Üniversite rehberi",
      subtitle:
        "Final Uluslararası Üniversitesi (FIU) ile doğrulanmış bir öğrenci alım ilişkimiz bulunmaktadır. Güncel program ve kabul bilgileri için bizimle iletişime geçin.",
      browseAll: "Tüm Üniversiteleri İncele",
    },
    properties: {
      eyebrow: "Gayrimenkul ilanı",
      title: "Gayrimenkul ilanı.",
      subtitle: "Bir ilan gösterilmektedir. Güncel uygunluk ve ayrıntıları teyit edin.",
      viewAll: "Tüm Mülkleri Gör",
      disclaimer: "İlan bilgileri değişebilir. Karar vermeden önce güncel ayrıntıları teyit edin.",
    },
    ctaBanner: {
      eyebrow: "İletişim",
      title: "Bir sonraki adımınız hakkında sorunuz mu var?",
      subtitle:
        "Eğitim bilgileri, gayrimenkul ilanı veya dijital hizmetler hakkında Frankedu Global ile iletişime geçin.",
      whatsappCta: "WhatsApp ile İletişim",
      consultationCta: "Bize ulaşın",
      applyCta: "Bize ulaşın",
    },
  },
};
