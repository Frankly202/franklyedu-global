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
      subjectLabel: string;
      subjectPlaceholder: string;
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
    ecoLuxury: ServicePillarTranslation;
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
      eyebrow: "Education • Real Estate • Creative • Beyond",
      titleLine1: "Your Future.",
      titleHighlight: "Global Opportunities.",
      subhead: "Study Abroad • Invest in Property • Build Your Brand • Live Better",
      description:
        "We help students, families, and investors explore study options, property information, and professional services.",
      applyCta: "Start Application",
      whatsappCta: "Chat on WhatsApp",
      search: {
        destinationLabel: "Study destination",
        destinationPlaceholder: "Germany, UK, Cyprus…",
        subjectLabel: "Course or subject",
        subjectPlaceholder: "Business, Engineering, IT…",
        submitBtn: "Find Universities",
      },
      trustBadge: {
        title: "Personalized Guidance",
        subtitle: "Study guidance • Property information",
      },
    },
    services: {
      eyebrow: "Our Services",
      title: "One Global Brand. Multiple Opportunities.",
      subtitle:
        "Education, real estate, creative services, and property care — all delivered under one trusted name.",
      exploreAll: "Explore All Services",
      education: {
        title: "Education & Admissions",
        tagline: "Study options & scholarships",
        description: "Guidance on study options based on your academic background and aspirations.",
        points: [
          "University Admissions & Matching",
          "FIU scholarships up to 100% for eligible students",
          "Visa Guidance & Interview Prep",
          "Student Dorms & Accommodation",
          "Airport Pickup & Arrival Reception",
        ],
        ctaLabel: "Browse Universities",
        href: "/universities",
      },
      properties: {
        title: "Properties & Investment",
        tagline: "Property information & investment options",
        description:
          "Strategic property acquisition, design-refurbished villas, and coastal residences across North Cyprus, UK, and UAE.",
        points: [
          "North Cyprus Residential Villas",
          "Seafront Resort Residences",
          "Buyer Eligibility Information*",
          "Property Acquisition Advisory",
          "UK & Dubai Opportunities",
        ],
        ctaLabel: "Explore Properties",
        href: "/real-estate",
      },
      creative: {
        title: "Creative & Digital",
        tagline: "Brand identity, web & media",
        description:
          "Brand development, bespoke websites, student portfolio polish, and creative digital solutions by Frankedu.",
        points: [
          "Brand Identity & Logo Design",
          "Modern Website Development",
          "Academic CV & Portfolio Polish",
          "Social & Digital Marketing",
          "Creative Media Solutions",
        ],
        ctaLabel: "Get a Quote",
        href: "/services",
      },
      ecoLuxury: {
        title: "Eco Luxury & Property Care",
        tagline: "Turnover cleaning & maintenance",
        description:
          "Professional residential cleaning, student move-in preparation, and dependable property care services in North Cyprus.",
        points: [
          "Move-in & Move-out Turnover Cleaning",
          "Student Apartment Refresh",
          "Residential & Commercial Care",
          "Flexible Service Scheduling",
          "Local On-the-Ground Team",
        ],
        ctaLabel: "Get a Quote",
        href: "/services",
      },
    },
    destinations: {
      eyebrow: "Study & Living Destinations",
      title: "Popular Destinations.",
      subtitle:
        "Explore study destinations and discuss options based on your academic goals, budget, and preferred intake.",
      viewAll: "View All Destinations",
      badge: "Study • Invest • Live",
    },
    universities: {
      eyebrow: "Institutions & Pathways",
      title: "University Pathways.",
      subtitle:
        "We have a confirmed recruitment relationship with Final International University (FIU). Contact us for current programme and admissions details.",
      browseAll: "Browse All Universities",
    },
    properties: {
      eyebrow: "Real Estate Opportunities",
      title: "Featured Properties.",
      subtitle:
        "Explore property opportunities across North Cyprus and selected international markets.",
      viewAll: "Explore All Properties",
      disclaimer:
        "*Buyer/title eligibility information is included in the listing and should be independently confirmed during legal conveyancing.",
    },
    ctaBanner: {
      eyebrow: "Start Today",
      title: "Let's Build Your Future Together.",
      subtitle:
        "Contact us online about university applications, property viewings, and professional services.",
      whatsappCta: "Chat on WhatsApp",
      consultationCta: "Book a Consultation",
      applyCta: "Book a Consultation",
    },
  },
  tr: {
    hero: {
      eyebrow: "Eğitim • Gayrimenkul • Kreatif • Ötesi",
      titleLine1: "Geleceğiniz.",
      titleHighlight: "Küresel Fırsatlar.",
      subhead: "Yurtdışında Eğitim • Gayrimenkul Yatırımı • Markanızı Büyütün • Daha İyi Yaşayın",
      description:
        "Öğrencileri, aileleri ve yatırımcıları dünya standartlarında üniversite kabulleri, güvenilir gayrimenkul danışmanlığı ve profesyonel hizmetlerle küresel fırsatlarla buluşturuyoruz.",
      applyCta: "Başvuru Yap",
      whatsappCta: "WhatsApp'tan Yazın",
      search: {
        destinationLabel: "Eğitim ülkesi",
        destinationPlaceholder: "Almanya, İngiltere, Kıbrıs…",
        subjectLabel: "Bölüm veya alan",
        subjectPlaceholder: "İşletme, Mühendislik, Bilişim…",
        submitBtn: "Üniversite Bul",
      },
      trustBadge: {
        title: "Doğrulanmış Küresel Danışmanlık",
        subtitle: "Eğitim danışmanlığı • Gayrimenkul bilgileri",
      },
    },
    services: {
      eyebrow: "Hizmetlerimiz",
      title: "Tek Küresel Marka. Sayısız Fırsat.",
      subtitle:
        "Eğitim, gayrimenkul, kreatif hizmetler ve mülk bakımı — tek bir güvenilir çatı altında onaylı rehberlik.",
      exploreAll: "Tüm Hizmetleri Gör",
      education: {
        title: "Eğitim ve Üniversite Kabulü",
        tagline: "Eğitim seçenekleri ve burslar",
        description:
          "Akademik geçmişinize ve hedeflerinize göre eğitim seçenekleri hakkında danışmanlık.",
        points: [
          "Üniversite Başvurusu ve Program Eşleştirme",
          "FIU'da uygun öğrenciler için %100'e varan burslar",
          "Öğrenci Vizesi ve Mülakat Hazırlığı",
          "Öğrenci Yurtları ve Konaklama",
          "Havalimanı Karşılama ve Oryantasyon",
        ],
        ctaLabel: "Üniversiteleri İncele",
        href: "/universities",
      },
      properties: {
        title: "Gayrimenkul ve Yatırım",
        tagline: "Konutlar ve yatırım fırsatları",
        description:
          "Kuzey Kıbrıs, Birleşik Krallık ve BAE genelinde stratejik mülk edinimi, yenilenmiş villalar ve sahil konutları.",
        points: [
          "Kuzey Kıbrıs Müstakil Villalar",
          "Deniz Manzaralı Rezidans Projeleri",
          "Yabancı Alıcı Uygunluğu Bilgileri*",
          "Mülk Edinimi ve Yatırım Danışmanlığı",
          "İngiltere ve Dubai Fırsatları",
        ],
        ctaLabel: "Mülkleri İncele",
        href: "/real-estate",
      },
      creative: {
        title: "Kreatif ve Dijital Hizmetler",
        tagline: "Marka kimliği, web ve medya",
        description:
          "Frankedu güvencesiyle marka kimliği geliştirme, modern web siteleri, öğrenci portföyü ve dijital varlık çözümleri.",
        points: [
          "Marka Kimliği ve Logo Tasarımı",
          "Modern Web Sitesi Geliştirme",
          "Akademik CV ve Portföy Düzenleme",
          "Sosyal Medya ve Dijital Pazarlama",
          "Kreatif Medya Çözümleri",
        ],
        ctaLabel: "Fiyat Teklifi Alın",
        href: "/services",
      },
      ecoLuxury: {
        title: "Eco Luxury ve Mülk Bakımı",
        tagline: "Dönemsel temizlik ve bakım",
        description:
          "Kuzey Kıbrıs'ta profesyonel konut temizliği, öğrenci dairesi hazırlığı ve güvenilir mülk bakım hizmetleri.",
        points: [
          "Giriş ve Çıkış Temizliği",
          "Öğrenci Dairesi Yenileme ve Hazırlık",
          "Konut ve Ticari Mülk Bakımı",
          "Esnek Hizmet ve Rezervasyon Planlaması",
          "Yerel Profesyonel Destek Ekibi",
        ],
        ctaLabel: "Fiyat Teklifi Alın",
        href: "/services",
      },
    },
    destinations: {
      eyebrow: "Eğitim ve Yaşam Merkezleri",
      title: "Popüler Ülkeler.",
      subtitle:
        "Eğitim ülkelerini keşfedin ve akademik hedeflerinize, bütçenize ve tercih ettiğiniz döneme göre seçenekleri görüşün.",
      viewAll: "Tüm Ülkeleri Gör",
      badge: "Eğitim • Yatırım • Yaşam",
    },
    universities: {
      eyebrow: "Kurumlar ve Eğitim Yolları",
      title: "Üniversite Eğitim Yolları.",
      subtitle:
        "Final Uluslararası Üniversitesi (FIU) ile doğrulanmış bir öğrenci alım ilişkimiz bulunmaktadır. Güncel program ve kabul bilgileri için bizimle iletişime geçin.",
      browseAll: "Tüm Üniversiteleri İncele",
    },
    properties: {
      eyebrow: "Gayrimenkul Fırsatları",
      title: "Öne Çıkan Mülkler.",
      subtitle: "Kuzey Kıbrıs'taki gayrimenkul ilanlarını inceleyin.",
      viewAll: "Tüm Mülkleri Gör",
      disclaimer:
        "*Alıcı/koçan uygunluk bilgileri ilanda yer alır ve yasal devir sürecinde bağımsız olarak teyit edilmelidir.",
    },
    ctaBanner: {
      eyebrow: "Bugün Başlayın",
      title: "Geleceğinizi Birlikte İnşa Edelim.",
      subtitle:
        "Üniversite başvuruları, mülk gösterimleri ve danışmanlık hizmetlerimiz hakkında çevrimiçi olarak bizimle iletişime geçin.",
      whatsappCta: "WhatsApp ile İletişim",
      consultationCta: "Konsültasyon Randevusu Alın",
      applyCta: "Konsültasyon Randevusu Alın",
    },
  },
};
