export interface EducationTranslation {
  universities: {
    eyebrow: string;
    title: string;
    subtitle: string;
    destinationLabel: string;
    allDestinations: string;
    subjectLabel: string;
    allSubjects: string;
    clearBtn: string;
    foundSingular: string;
    foundPlural: string;
    emptyHeading: string;
    emptyDesc: string;
  };
  courses: {
    eyebrow: string;
    defaultTitle: string;
    programmesAt: string;
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
    intakesLabel: string;
    tuitionRangeLabel: string;
    viewUniversities: string;
    scholarshipsBtn: string;
  };
  scholarships: {
    eyebrow: string;
    title: string;
    subtitle: string;
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
    startApplication: string;
    stepPrefix: string;
  };
}

export const educationTranslations: Record<"en" | "tr", EducationTranslation> = {
  en: {
    universities: {
      eyebrow: "Universities",
      title: "Find the right university.",
      subtitle:
        "Filter by destination and subject. Confirmed partner institutions include Final International University (FIU). Additional destination applications are arranged through our education network.",
      destinationLabel: "Destination",
      allDestinations: "All destinations",
      subjectLabel: "Subject",
      allSubjects: "All subjects",
      clearBtn: "Clear",
      foundSingular: "university found",
      foundPlural: "universities found",
      emptyHeading: "Inquire for this destination",
      emptyDesc:
        "We guide admissions across all 9 supported destinations through our education network. Message us on WhatsApp for tailored options.",
    },
    courses: {
      eyebrow: "Courses",
      defaultTitle: "Compare programmes.",
      programmesAt: "Programmes at",
      subtitle:
        "Search by subject and level. Individual programme details and fee schedules are confirmed directly with partner institutions upon inquiry.",
      subjectLabel: "Subject",
      allSubjects: "All subjects",
      levelLabel: "Level",
      allLevels: "All levels",
      universityLabel: "University",
      allUniversities: "All universities",
      clearBtn: "Clear",
      foundCount: "programmes found",
      emptyHeading: "Programme catalogue updating",
      emptyDesc:
        "We verify individual programme details directly with partner institutions before publishing. Message us on WhatsApp for currently open programmes, faculties, and admission requirements.",
      levels: {
        foundation: "Foundation",
        bachelors: "Bachelor's",
        masters: "Master's",
        phd: "PhD",
      },
    },
    countries: {
      eyebrow: "Study destinations",
      title: "Choose where your degree takes you.",
      subtitle:
        "Compare key study destinations side by side. Additional destinations worldwide may also be available through our global education network.",
      intakesLabel: "Intakes",
      tuitionRangeLabel: "Tuition range",
      viewUniversities: "View universities",
      scholarshipsBtn: "Scholarships",
    },
    scholarships: {
      eyebrow: "Scholarships",
      title: "Funding that fits your plan.",
      subtitle:
        "We list scholarships confirmed with partner institutions. Scholarships can be up to 100% for eligible students at selected institutions.",
      amountLabel: "Amount",
      levelLabel: "Level",
      deadlineLabel: "Deadline",
      applySupport: "Apply with support",
      checkEligibility: "Check eligibility",
    },
    services: {
      eyebrow: "Student support",
      title: "Support for every part of your next step.",
      subtitle:
        "Straightforward guidance from your shortlist to your arrival plans — with every requirement clearly explained.",
      startApplication: "Start your application",
      stepPrefix: "Step",
    },
  },
  tr: {
    universities: {
      eyebrow: "Üniversiteler",
      title: "Doğru üniversiteyi bulun.",
      subtitle:
        "Ülke ve uzmanlık alanına göre filtreleyin. Onaylı partner kurumlarımız arasında Final Uluslararası Üniversitesi (FIU) bulunmaktadır. Diğer ülkeler için başvurular küresel eğitim ağımızla yürütülmektedir.",
      destinationLabel: "Eğitim Ülkesi",
      allDestinations: "Tüm ülkeler",
      subjectLabel: "Bölüm / Alan",
      allSubjects: "Tüm alanlar",
      clearBtn: "Temizle",
      foundSingular: "üniversite bulundu",
      foundPlural: "üniversite bulundu",
      emptyHeading: "Bu ülke için doğrudan danışın",
      emptyDesc:
        "Eğitim ağımız aracılığıyla desteklenen 9 ülkenin tamamında başvuru rehberliği sunuyoruz. Size özel seçenekler için bize WhatsApp'tan ulaşın.",
    },
    courses: {
      eyebrow: "Bölümler ve Programlar",
      defaultTitle: "Programları karşılaştırın.",
      programmesAt: "Bünyesindeki programlar:",
      subtitle:
        "Bölüm ve eğitim seviyesine göre arama yapın. Münferit program detayları ve harç tarifeleri başvuru esnasında partner kurumlarla teyit edilir.",
      subjectLabel: "Bölüm / Alan",
      allSubjects: "Tüm alanlar",
      levelLabel: "Eğitim Seviyesi",
      allLevels: "Tüm seviyeler",
      universityLabel: "Üniversite",
      allUniversities: "Tüm üniversiteler",
      clearBtn: "Temizle",
      foundCount: "program bulundu",
      emptyHeading: "Program kataloğu güncelleniyor",
      emptyDesc:
        "Program ayrıntılarını yayınlamadan önce partner kurumlarla doğrudan teyit ediyoruz. Güncel açık programlar, fakülteler ve kabul şartları için bize WhatsApp'tan yazın.",
      levels: {
        foundation: "Hazırlık",
        bachelors: "Lisans",
        masters: "Yüksek Lisans",
        phd: "Doktora",
      },
    },
    countries: {
      eyebrow: "Eğitim Merkezleri",
      title: "Diplomanızın sizi taşıyacağı ülkeyi seçin.",
      subtitle:
        "Öne çıkan eğitim merkezlerini yan yana karşılaştırın. Küresel eğitim ağımızla dünya çapında ek ülkeler de sunulmaktadır.",
      intakesLabel: "Kayıt Dönemleri",
      tuitionRangeLabel: "Harç Aralığı",
      viewUniversities: "Üniversiteleri Gör",
      scholarshipsBtn: "Burs Olanakları",
    },
    scholarships: {
      eyebrow: "Burs Olanakları",
      title: "Eğitim planınıza uygun burs destekleri.",
      subtitle:
        "Partner kurumlarla teyit edilmiş burs imkanlarını listeliyoruz. Uygun öğrenciler için seçili kurumlarda %100'e varan burslar mevcuttur.",
      amountLabel: "Miktar",
      levelLabel: "Seviye",
      deadlineLabel: "Son Tarih",
      applySupport: "Danışmanlıkla Başvur",
      checkEligibility: "Uygunluğu Sorgula",
    },
    services: {
      eyebrow: "Öğrenci Desteği",
      title: "Yolculuğunuzun her adımında tam destek.",
      subtitle:
        "Üniversite tercihinizden varış planlarınıza kadar her şartın açıkça belirtildiği güvenilir danışmanlık.",
      startApplication: "Başvurunuzu Başlatın",
      stepPrefix: "Adım",
    },
  },
};
