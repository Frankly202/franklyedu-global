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
        "Filter by destination and subject. We have a confirmed recruitment relationship with Final International University (FIU). Contact us to discuss other study options.",
      destinationLabel: "Destination",
      allDestinations: "All destinations",
      subjectLabel: "Subject",
      allSubjects: "All subjects",
      clearBtn: "Clear",
      foundSingular: "university found",
      foundPlural: "universities found",
      emptyHeading: "Inquire for this destination",
      emptyDesc: "Contact us to discuss study options for this destination.",
    },
    courses: {
      eyebrow: "Courses",
      defaultTitle: "Compare programmes.",
      programmesAt: "Programmes at",
      subtitle:
        "Search by subject and level. Contact us for current programme details and fee information.",
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
        "Programme and admission information can change. Contact us for current details about available programmes, faculties, and requirements.",
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
        "Compare key study destinations side by side. Contact us to discuss options for destinations not listed.",
      intakesLabel: "Intakes",
      tuitionRangeLabel: "Tuition range",
      viewUniversities: "View universities",
      scholarshipsBtn: "Scholarships",
    },
    scholarships: {
      eyebrow: "Scholarships",
      title: "Funding that fits your plan.",
      subtitle:
        "Scholarship details depend on the institution and eligibility criteria. Contact us for current information.",
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
        "Ülke ve uzmanlık alanına göre filtreleyin. Final Uluslararası Üniversitesi (FIU) ile doğrulanmış bir öğrenci alım ilişkimiz bulunmaktadır. Diğer eğitim seçenekleri hakkında bilgi almak için bizimle iletişime geçin.",
      destinationLabel: "Eğitim Ülkesi",
      allDestinations: "Tüm ülkeler",
      subjectLabel: "Bölüm / Alan",
      allSubjects: "Tüm alanlar",
      clearBtn: "Temizle",
      foundSingular: "üniversite bulundu",
      foundPlural: "üniversite bulundu",
      emptyHeading: "Bu ülke için doğrudan danışın",
      emptyDesc: "Bu ülkeyle ilgili eğitim seçeneklerini görüşmek için bizimle iletişime geçin.",
    },
    courses: {
      eyebrow: "Bölümler ve Programlar",
      defaultTitle: "Programları karşılaştırın.",
      programmesAt: "Bünyesindeki programlar:",
      subtitle:
        "Bölüm ve eğitim seviyesine göre arama yapın. Güncel program detayları ve öğrenim ücretleri için bizimle iletişime geçin.",
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
        "Program ve kabul bilgileri değişebilir. Açık programlar, fakülteler ve koşullar hakkında güncel bilgi almak için bizimle iletişime geçin.",
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
        "Öne çıkan eğitim merkezlerini yan yana karşılaştırın. Listelenmeyen ülkelerdeki seçenekleri görüşmek için bizimle iletişime geçin.",
      intakesLabel: "Kayıt Dönemleri",
      tuitionRangeLabel: "Harç Aralığı",
      viewUniversities: "Üniversiteleri Gör",
      scholarshipsBtn: "Burs Olanakları",
    },
    scholarships: {
      eyebrow: "Burs Olanakları",
      title: "Eğitim planınıza uygun burs destekleri.",
      subtitle:
        "Burs bilgileri kuruma ve uygunluk koşullarına göre değişir. Güncel bilgi için bizimle iletişime geçin.",
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
