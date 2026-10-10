export interface CommonTranslation {
  nav: {
    universities: string;
    courses: string;
    countries: string;
    scholarships: string;
    services: string;
    marketplace: string;
    about: string;
    contact: string;
    login: string;
    signup: string;
    mainNavigationLabel: string;
  };
  mobileDrawer: {
    languageTitle: string;
    navigationLabel: string;
    openMenu: string;
    closeMenu: string;
    startApplication: string;
    chatWhatsapp: string;
    studentPreview: string;
    studyPathwaysTitle: string;
    servicesLivingTitle: string;
    companyTitle: string;
    universitiesDesc: string;
    coursesDesc: string;
    destinationsDesc: string;
    scholarshipsDesc: string;
    studentServicesDesc: string;
    marketplaceDesc: string;
    accommodationDesc: string;
    realEstateDesc: string;
    aboutDesc: string;
    contactDesc: string;
  };
  footer: {
    tagline: string;
    exploreTitle: string;
    studentsTitle: string;
    marketplaceTitle: string;
    companyTitle: string;
    startApplication: string;
    studentDashboard: string;
    services: string;
    accommodation: string;
    realEstate: string;
    copyright: string;
    partnerNotice: string;
  };
  breadcrumbs: {
    home: string;
  };
  cards: {
    verifiedListing: string;
    templateListing: string;
    viewPrograms: string;
    applyNow: string;
    askQuestion: string;
    enquire: string;
    reserve: string;
    requestDetails: string;
    viewDetails: string;
    availableFrom: string;
    whatsappMessages: {
      course: (title: string, university: string) => string;
      listing: (title: string, location: string) => string;
      marketplace: (title: string) => string;
    };
    specs: {
      degreeLevel: string;
      courses: string;
      tuitionFee: string;
      intake: string;
      applicationFee: string;
      scholarshipAvailability: string;
      duration: string;
      tuition: string;
      language: string;
    };
  };
  whatsappCta: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    button: string;
  };
  errors: {
    notFoundHeading: string;
    notFoundDesc: string;
    errorHeading: string;
    errorDesc: string;
    tryAgain: string;
    goHome: string;
  };
}

export const commonTranslations: Record<"en" | "tr", CommonTranslation> = {
  en: {
    nav: {
      universities: "Universities",
      courses: "Courses",
      countries: "Countries",
      scholarships: "Scholarships",
      services: "Services",
      marketplace: "Marketplace",
      about: "About",
      contact: "Contact",
      login: "Login",
      signup: "Sign Up",
      mainNavigationLabel: "Main navigation",
    },
    mobileDrawer: {
      languageTitle: "Language / Dil",
      navigationLabel: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      startApplication: "Start Application",
      chatWhatsapp: "Chat on WhatsApp",
      studentPreview: "Student Dashboard Preview →",
      studyPathwaysTitle: "Study Pathways",
      servicesLivingTitle: "Services & Living",
      companyTitle: "Company",
      universitiesDesc: "Explore partner campuses & tuition",
      coursesDesc: "Compare English-taught programmes",
      destinationsDesc: "Compare countries, visas & intakes",
      scholarshipsDesc: "Verified funding & tuition discounts",
      studentServicesDesc: "Intake planning, visa & arrival support",
      marketplaceDesc: "Student essentials & trusted community listings",
      accommodationDesc: "Dorms & apartments near campus",
      realEstateDesc: "Property purchases & rentals",
      aboutDesc: "Our mission, team & verified guidance",
      contactDesc: "Message our advisory team",
    },
    footer: {
      tagline: "Clear guidance for students choosing where — and how — to study abroad.",
      exploreTitle: "Explore",
      studentsTitle: "Students",
      marketplaceTitle: "Marketplace",
      companyTitle: "Company",
      startApplication: "Start an application",
      studentDashboard: "Student dashboard",
      services: "Services",
      accommodation: "Accommodation",
      realEstate: "Real Estate",
      copyright: "All rights reserved.",
      partnerNotice:
        "Confirmed partner listings. Additional destinations available via our education network.",
    },
    breadcrumbs: {
      home: "Home",
    },
    cards: {
      verifiedListing: "Verified listing",
      templateListing: "Template — verify before publishing",
      viewPrograms: "View Programs",
      applyNow: "Apply Now",
      askQuestion: "Ask a question",
      enquire: "Enquire",
      reserve: "Reserve",
      requestDetails: "Request details",
      viewDetails: "View details",
      availableFrom: "Available",
      whatsappMessages: {
        course: (title, university) =>
          `Hello Frankedu Global, I'd like to ask about ${title} at ${university}.`,
        listing: (title, location) =>
          `Hello Frankedu Global, I'm interested in "${title}" (${location}). Could you share more information?`,
        marketplace: (title) =>
          `Hello Frankedu Global, I'm interested in "${title}" on the marketplace. Could you share more information?`,
      },
      specs: {
        degreeLevel: "Degree level",
        courses: "Courses",
        tuitionFee: "Tuition fee",
        intake: "Intake",
        applicationFee: "Application fee",
        scholarshipAvailability: "Scholarship availability",
        duration: "Duration",
        tuition: "Tuition",
        language: "Language",
      },
    },
    whatsappCta: {
      eyebrow: "Talk to Frankedu",
      titleLine1: "Not sure where to start?",
      titleLine2: "Let’s make a plan.",
      subtitle:
        "Message Frankedu Global to discuss countries, courses, scholarships, tuition, and your application pathway.",
      button: "Chat on WhatsApp",
    },
    errors: {
      notFoundHeading: "Page not found",
      notFoundDesc: "The page you're looking for doesn't exist or has been moved.",
      errorHeading: "This page didn't load",
      errorDesc: "Something went wrong on our end. You can try refreshing or head back home.",
      tryAgain: "Try again",
      goHome: "Go home",
    },
  },
  tr: {
    nav: {
      universities: "Üniversiteler",
      courses: "Bölümler",
      countries: "Ülkeler",
      scholarships: "Burslar",
      services: "Hizmetler",
      marketplace: "Pazar Yeri",
      about: "Hakkımızda",
      contact: "İletişim",
      login: "Giriş Yap",
      signup: "Kayıt Ol",
      mainNavigationLabel: "Ana gezinme",
    },
    mobileDrawer: {
      languageTitle: "Dil / Language",
      navigationLabel: "Mobil gezinme",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      startApplication: "Başvuru Başlat",
      chatWhatsapp: "WhatsApp'tan Yazın",
      studentPreview: "Öğrenci Paneli Önizleme →",
      studyPathwaysTitle: "Eğitim Yolları",
      servicesLivingTitle: "Hizmetler ve Yaşam",
      companyTitle: "Kurumsal",
      universitiesDesc: "Anlaşmalı kampüsleri ve harç ücretlerini inceleyin",
      coursesDesc: "İngilizce eğitim veren programları karşılaştırın",
      destinationsDesc: "Ülkeleri, vizeleri ve başvuru dönemlerini karşılaştırın",
      scholarshipsDesc: "Onaylı burs ve harç indirimi olanakları",
      studentServicesDesc: "Dönem planlama, vize ve varış desteği",
      marketplaceDesc: "Öğrenci ihtiyaçları ve topluluk ilanları",
      accommodationDesc: "Kampüse yakın yurtlar ve daireler",
      realEstateDesc: "Satılık ve kiralık onaylı gayrimenkuller",
      aboutDesc: "Misyonumuz, ekibimiz ve onaylı danışmanlık",
      contactDesc: "Danışman ekibimize mesaj gönderin",
    },
    footer: {
      tagline:
        "Yurtdışında nerede ve nasıl eğitim alacağını belirleyen öğrenciler için şeffaf ve güvenilir rehberlik.",
      exploreTitle: "Keşfedin",
      studentsTitle: "Öğrenciler",
      marketplaceTitle: "Pazar Yeri",
      companyTitle: "Kurumsal",
      startApplication: "Başvuru başlat",
      studentDashboard: "Öğrenci paneli",
      services: "Hizmetler",
      accommodation: "Konaklama",
      realEstate: "Gayrimenkul",
      copyright: "Tüm hakları saklıdır.",
      partnerNotice:
        "Onaylanmış anlaşmalı kurum listeleri. Küresel eğitim ağımız aracılığıyla ek eğitim merkezleri de sunulmaktadır.",
    },
    breadcrumbs: {
      home: "Ana Sayfa",
    },
    cards: {
      verifiedListing: "Doğrulanmış ilan",
      templateListing: "Şablon — yayınlamadan önce doğrulayın",
      viewPrograms: "Programları İncele",
      applyNow: "Hemen Başvur",
      askQuestion: "Soru Sor",
      enquire: "Bilgi Al",
      reserve: "Rezerve Et",
      requestDetails: "Detay İsteyin",
      viewDetails: "Detayları Gör",
      availableFrom: "Müsaitlik:",
      whatsappMessages: {
        course: (title, university) =>
          `Merhaba Frankedu Global, ${university} bünyesindeki ${title} programı hakkında bilgi almak istiyorum.`,
        listing: (title, location) =>
          `Merhaba Frankedu Global, ${location} konumundaki "${title}" ilanıyla ilgileniyorum. Daha fazla bilgi alabilir miyim?`,
        marketplace: (title) =>
          `Merhaba Frankedu Global, pazaryerindeki "${title}" ilanıyla ilgileniyorum. Daha fazla bilgi alabilir miyim?`,
      },
      specs: {
        degreeLevel: "Eğitim Seviyesi",
        courses: "Bölümler",
        tuitionFee: "Eğitim Harcı",
        intake: "Kayıt Dönemi",
        applicationFee: "Başvuru Harcı",
        scholarshipAvailability: "Burs Olanakları",
        duration: "Süre",
        tuition: "Harç",
        language: "Eğitim Dili",
      },
    },
    whatsappCta: {
      eyebrow: "Frankedu ile Görüşün",
      titleLine1: "Nereden başlayacağınızı",
      titleLine2: "birlikte planlayalım.",
      subtitle:
        "Ülkeler, bölümler, burslar, harç ücretleri ve başvuru süreciniz hakkında Frankedu Global danışmanlarıyla doğrudan görüşün.",
      button: "WhatsApp'tan Yazın",
    },
    errors: {
      notFoundHeading: "Sayfa bulunamadı",
      notFoundDesc: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
      errorHeading: "Bu sayfa yüklenemedi",
      errorDesc:
        "Beklenmeyen bir sorun oluştu. Sayfayı yenileyebilir veya ana sayfaya dönebilirsiniz.",
      tryAgain: "Yeniden Dene",
      goHome: "Ana Sayfaya Dön",
    },
  },
};
