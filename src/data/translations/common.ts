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
    studyNotice: string;
  };
  breadcrumbs: {
    home: string;
  };
  cards: {
    applyNow: string;
    applyThroughFranklyEdu: string;
    officialUniversityInfo: string;
    officialProgrammeInfo: string;
    officialAdmissionsInfo: string;
    askAboutProgramme: string;
    closeDetails: string;
    askQuestion: string;
    enquire: string;
    reserve: string;
    requestDetails: string;
    viewDetails: string;
    availableFrom: string;
    whatsappMessages: {
      course: (title: string, university: string) => string;
      university: (name: string) => string;
      listing: (title: string) => string;
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
      universitiesDesc: "Institution names and locations; admissions details on request",
      coursesDesc: "Programme listings appear after their details are confirmed",
      destinationsDesc: "Browse destinations and ask about current study options",
      scholarshipsDesc: "Current award details are not published",
      studentServicesDesc: "Study, property, and digital-service enquiries",
      marketplaceDesc: "No marketplace listings are currently published",
      accommodationDesc: "No accommodation listings are currently published",
      realEstateDesc: "Ask about the property listing shown on this site",
      aboutDesc: "Our approach and contact information",
      contactDesc: "Send us a WhatsApp or email enquiry",
    },
    footer: {
      tagline: "Information on study options, property listings, and digital services.",
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
      studyNotice: "Ask us to confirm current details before making a decision.",
    },
    breadcrumbs: {
      home: "Home",
    },
    cards: {
      applyNow: "Apply Now",
      applyThroughFranklyEdu: "Apply Through FranklyEdu",
      officialUniversityInfo: "Visit University Website",
      officialProgrammeInfo: "Programme source",
      officialAdmissionsInfo: "Admissions info",
      askAboutProgramme: "Ask about programme",
      closeDetails: "Close",
      askQuestion: "Ask a question",
      enquire: "Enquire",
      reserve: "Reserve",
      requestDetails: "Request details",
      viewDetails: "View Details",
      availableFrom: "Available",
      whatsappMessages: {
        course: (title, university) =>
          `Hello Frankedu Global, I'd like to ask about ${title} at ${university}.`,
        university: (name) =>
          `Hello Frankedu Global, I'd like to ask about current admissions information at ${name}.`,
        listing: (title) =>
          `Hello Frankedu Global, I'm interested in "${title}". Could you share current information?`,
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
        "Message Frankedu Global to ask about study information, property listings, or digital services.",
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
      universitiesDesc: "Kurum adları ve konumları; kabul bilgileri talep üzerine",
      coursesDesc: "Program ayrıntıları teyit edildikten sonra yayımlanır",
      destinationsDesc: "Destinasyonlara göz atın ve güncel seçenekleri sorun",
      scholarshipsDesc: "Güncel burs ayrıntıları yayımlanmamıştır",
      studentServicesDesc: "Eğitim, gayrimenkul ve dijital hizmet talepleri",
      marketplaceDesc: "Şu anda pazar yeri ilanı yayımlanmamıştır",
      accommodationDesc: "Şu anda konaklama ilanı yayımlanmamıştır",
      realEstateDesc: "Bu sitedeki gayrimenkul ilanını sorun",
      aboutDesc: "Yaklaşımımız ve iletişim bilgilerimiz",
      contactDesc: "WhatsApp veya e-posta ile bize ulaşın",
    },
    footer: {
      tagline: "Eğitim seçenekleri, gayrimenkul ilanları ve dijital hizmetler hakkında bilgi.",
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
      studyNotice: "Karar vermeden önce güncel ayrıntıları teyit etmek için bize ulaşın.",
    },
    breadcrumbs: {
      home: "Ana Sayfa",
    },
    cards: {
      applyNow: "Hemen Başvur",
      applyThroughFranklyEdu: "FranklyEdu ile Başvur",
      officialUniversityInfo: "Üniversitenin Web Sitesini Ziyaret Et",
      officialProgrammeInfo: "Program kaynağı",
      officialAdmissionsInfo: "Kabul bilgileri",
      askAboutProgramme: "Programı sorun",
      closeDetails: "Kapat",
      askQuestion: "Soru Sor",
      enquire: "Bilgi Al",
      reserve: "Rezerve Et",
      requestDetails: "Detay İsteyin",
      viewDetails: "Detayları Gör",
      availableFrom: "Müsaitlik:",
      whatsappMessages: {
        course: (title, university) =>
          `Merhaba Frankedu Global, ${university} bünyesindeki ${title} programı hakkında bilgi almak istiyorum.`,
        university: (name) =>
          `Merhaba Frankedu Global, ${name} kurumunun güncel kabul bilgileri hakkında bilgi almak istiyorum.`,
        listing: (title) =>
          `Merhaba Frankedu Global, "${title}" ilanıyla ilgileniyorum. Güncel bilgi alabilir miyim?`,
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
        "Eğitim bilgileri, gayrimenkul ilanları veya dijital hizmetler hakkında Frankedu Global'e WhatsApp'tan yazın.",
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
