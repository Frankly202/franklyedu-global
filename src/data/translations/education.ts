export interface EducationTranslation {
  universities: {
    eyebrow: string;
    title: string;
    subtitle: string;
    destinationLabel: string;
    allDestinations: string;
    clearBtn: string;
    foundSingular: string;
    foundPlural: string;
    emptyHeading: string;
    emptyDesc: string;
  };
  courses: {
    eyebrow: string;
    defaultTitle: string;
    optionsAt: string;
    subtitle: string;
    subjectLabel: string;
    allSubjects: string;
    levelLabel: string;
    allLevels: string;
    universityLabel: string;
    allUniversities: string;
    clearBtn: string;
    foundCount: string;
    emptyHeading: string;
    emptyDesc: string;
    levels: {
      foundation: string;
      bachelors: string;
      masters: string;
      phd: string;
    };
  };
  countries: {
    eyebrow: string;
    title: string;
    subtitle: string;
    askAboutOptions: string;
  };
  scholarships: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emptyHeading: string;
    emptyDesc: string;
    contactBtn: string;
    amountLabel: string;
    levelLabel: string;
    deadlineLabel: string;
    applySupport: string;
    checkEligibility: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    contactUs: string;
  };
}

export const educationTranslations: Record<"en" | "tr", EducationTranslation> = {
  en: {
    universities: {
      eyebrow: "Universities",
      title: "University directory",
      subtitle:
        "Browse institutions by destination. Final International University (FIU) is the only confirmed recruitment relationship; contact us about current admissions details.",
      destinationLabel: "Destination",
      allDestinations: "All destinations",
      clearBtn: "Clear",
      foundSingular: "university found",
      foundPlural: "universities found",
      emptyHeading: "Inquire for this destination",
      emptyDesc: "Contact us to discuss study options for this destination.",
    },
    courses: {
      eyebrow: "Courses",
      defaultTitle: "Turn your ambitions into a study plan.",
      optionsAt: "Study options at",
      subtitle:
        "Filter by field, study level, and university. Programme listings appear here once details are confirmed; contact us to discuss current study options.",
      subjectLabel: "Field of Study",
      allSubjects: "All subjects",
      levelLabel: "Study Level",
      allLevels: "All levels",
      universityLabel: "University",
      allUniversities: "All universities",
      clearBtn: "Clear",
      foundCount: "programmes found",
      emptyHeading: "No verified programme listings yet",
      emptyDesc:
        "We have not published programme listings because their details have not been confirmed. Contact us to discuss current study options.",
      levels: {
        foundation: "Foundation",
        bachelors: "Bachelor's",
        masters: "Master's",
        phd: "PhD",
      },
    },
    countries: {
      eyebrow: "Study destinations",
      title: "Destinations to ask about.",
      subtitle:
        "Browse the destinations listed here. Contact us to ask about current study options; programmes, fees, and dates are not listed until confirmed.",
      askAboutOptions: "Ask about options",
    },
    scholarships: {
      eyebrow: "Scholarships",
      title: "Scholarship information",
      subtitle:
        "No current scholarship details are published. Contact us to ask about information confirmed by the institution.",
      emptyHeading: "No current scholarship listings",
      emptyDesc:
        "Award amounts, eligibility, and deadlines need current confirmation before they can be published.",
      contactBtn: "Contact us",
      amountLabel: "Amount",
      levelLabel: "Level",
      deadlineLabel: "Deadline",
      applySupport: "Apply with support",
      checkEligibility: "Check eligibility",
    },
    services: {
      eyebrow: "Student support",
      title: "How we can help",
      subtitle:
        "Ask about study information, property details, or digital services. Scope and availability are confirmed per enquiry.",
      contactUs: "Contact us",
    },
  },
  tr: {
    universities: {
      eyebrow: "Üniversiteler",
      title: "Üniversite rehberi",
      subtitle:
        "Kurumları eğitim ülkesine göre inceleyin. Final International University (FIU), doğrulanmış tek öğrenci alım ilişkimizdir. Güncel kabul bilgileri için bizimle iletişime geçin.",
      destinationLabel: "Eğitim Ülkesi",
      allDestinations: "Tüm ülkeler",
      clearBtn: "Temizle",
      foundSingular: "üniversite bulundu",
      foundPlural: "üniversite bulundu",
      emptyHeading: "Bu ülke için doğrudan danışın",
      emptyDesc: "Bu ülkeyle ilgili eğitim seçeneklerini görüşmek için bizimle iletişime geçin.",
    },
    courses: {
      eyebrow: "Bölümler ve Programlar",
      defaultTitle: "Hedeflerinizi güçlü bir eğitim planına dönüştürün.",
      optionsAt: "Eğitim seçenekleri:",
      subtitle:
        "Eğitim alanı, seviyesi ve üniversiteye göre filtreleyin. Programlar, ayrıntıları doğrulandıktan sonra burada yayımlanır; güncel seçenekleri görüşmek için bizimle iletişime geçin.",
      subjectLabel: "Eğitim Alanı",
      allSubjects: "Tüm alanlar",
      levelLabel: "Eğitim Seviyesi",
      allLevels: "Tüm seviyeler",
      universityLabel: "Üniversite",
      allUniversities: "Tüm üniversiteler",
      clearBtn: "Temizle",
      foundCount: "program bulundu",
      emptyHeading: "Henüz doğrulanmış program ilanı yok",
      emptyDesc:
        "Program ayrıntıları doğrulanmadığı için henüz listeleme yayımlamadık. Güncel eğitim seçeneklerini görüşmek için bizimle iletişime geçin.",
      levels: {
        foundation: "Hazırlık",
        bachelors: "Lisans",
        masters: "Yüksek Lisans",
        phd: "Doktora",
      },
    },
    countries: {
      eyebrow: "Eğitim ülkeleri",
      title: "Bilgi alabileceğiniz destinasyonlar.",
      subtitle:
        "Listelenen ülkelere göz atın. Güncel eğitim seçeneklerini sormak için bizimle iletişime geçin; program, ücret ve tarihler teyit edilmeden yayımlanmaz.",
      askAboutOptions: "Seçenekleri sorun",
    },
    scholarships: {
      eyebrow: "Burs Olanakları",
      title: "Burs bilgileri",
      subtitle:
        "Güncel burs ayrıntıları yayımlanmamıştır. Kurum tarafından teyit edilen bilgileri sormak için bizimle iletişime geçin.",
      emptyHeading: "Güncel burs ilanı yok",
      emptyDesc:
        "Ödül miktarı, uygunluk koşulları ve son tarihler yayımlanmadan önce güncel olarak teyit edilmelidir.",
      contactBtn: "Bize ulaşın",
      amountLabel: "Miktar",
      levelLabel: "Seviye",
      deadlineLabel: "Son Tarih",
      applySupport: "Danışmanlıkla Başvur",
      checkEligibility: "Uygunluğu Sorgula",
    },
    services: {
      eyebrow: "Öğrenci Desteği",
      title: "Nasıl yardımcı olabiliriz?",
      subtitle:
        "Eğitim bilgileri, gayrimenkul ayrıntıları veya dijital hizmetleri sorun. Kapsam ve uygunluk her talep için ayrıca teyit edilir.",
      contactUs: "Bize ulaşın",
    },
  },
};
