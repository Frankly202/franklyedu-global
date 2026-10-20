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
    studyAreasLabel: string;
    studyAreasPending: string;
    studyAreasSource: string;
    feeInfoLabel: string;
    feeInfoSource: string;
    feeProgrammeLabel: string;
    annualTuitionLabel: string;
    scholarshipLabel: string;
    scholarshipPending: string;
    scholarshipSource: string;
    applicationGuidanceNote: string;
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
    universitySubtitle: string;
    universityEmptyHeading: string;
    universityEmptyDesc: string;
    startLabel: string;
    applicationWindowLabel: string;
    requirementsLabel: string;
    noticeLabel: string;
    frankeduDeadlineLabel: string;
    disclaimerTitle: string;
    disclaimer: string;
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
      studyAreasLabel: "Study areas",
      studyAreasPending: "Study areas require confirmation with the university.",
      studyAreasSource: "University study information",
      feeInfoLabel: "Fee information",
      feeInfoSource: "University fee source",
      feeProgrammeLabel: "Programme / category",
      annualTuitionLabel: "Annual tuition after scholarship",
      scholarshipLabel: "Scholarship information",
      scholarshipPending: "No confirmed scholarship details are published for this university.",
      scholarshipSource: "University scholarship information",
      applicationGuidanceNote:
        "FranklyEdu provides application guidance and does not directly submit applications to universities.",
    },
    courses: {
      eyebrow: "Courses",
      defaultTitle: "Compare programme details before you take the next step.",
      optionsAt: "Study options at",
      subtitle:
        "Browse source-linked programme records and clearly labelled university catalogue examples. Confirm current availability, fees and requirements with the university.",
      subjectLabel: "Field of Study",
      allSubjects: "All subjects",
      levelLabel: "Study Level",
      allLevels: "All levels",
      universityLabel: "University",
      allUniversities: "All universities",
      clearBtn: "Clear",
      foundCount: "programmes found",
      emptyHeading: "No programmes match these filters",
      emptyDesc:
        "Clear a filter to see the current listings. Some intake and admissions details still need confirmation directly with the institution.",
      universitySubtitle:
        "Browse this university’s programme records or labelled catalogue examples. Examples do not confirm current availability; check details with the institution.",
      universityEmptyHeading: "No verified programme listings yet for this university",
      universityEmptyDesc:
        "This does not mean the university has no programmes. Contact us for current information; individual programmes are added only after their details have been verified.",
      startLabel: "Start / intake",
      applicationWindowLabel: "Application window",
      requirementsLabel: "Entry requirements",
      noticeLabel: "Information to confirm",
      frankeduDeadlineLabel: "Frankedu document-sharing deadline",
      disclaimerTitle: "Before you apply",
      disclaimer:
        "Programme details and admission decisions belong to each university and may change. This website does not submit an application. Visa decisions are made by the relevant authorities; admission, visas, professional recognition, employment, and job outcomes are not guaranteed. Confirm current requirements and fees with the university before applying.",
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
      studyAreasLabel: "Eğitim alanları",
      studyAreasPending: "Eğitim alanları üniversiteden teyit edilmelidir.",
      studyAreasSource: "Üniversitenin eğitim bilgileri",
      feeInfoLabel: "Ücret bilgileri",
      feeInfoSource: "Üniversitenin ücret kaynağı",
      feeProgrammeLabel: "Program / kategori",
      annualTuitionLabel: "Burs sonrası yıllık öğrenim ücreti",
      scholarshipLabel: "Burs bilgileri",
      scholarshipPending: "Bu üniversite için teyit edilmiş burs ayrıntıları yayımlanmamıştır.",
      scholarshipSource: "Üniversitenin burs bilgileri",
      applicationGuidanceNote:
        "FranklyEdu başvuru rehberliği sağlar ve üniversitelere doğrudan başvuru göndermez.",
    },
    courses: {
      eyebrow: "Bölümler ve Programlar",
      defaultTitle: "Sonraki adımınızı atmadan önce program ayrıntılarını karşılaştırın.",
      optionsAt: "Eğitim seçenekleri:",
      subtitle:
        "Kaynak bağlantılı program kayıtlarını ve açıkça etiketlenmiş üniversite katalog örneklerini inceleyin. Güncel uygunluğu, ücretleri ve koşulları üniversiteyle teyit edin.",
      subjectLabel: "Eğitim Alanı",
      allSubjects: "Tüm alanlar",
      levelLabel: "Eğitim Seviyesi",
      allLevels: "Tüm seviyeler",
      universityLabel: "Üniversite",
      allUniversities: "Tüm üniversiteler",
      clearBtn: "Temizle",
      foundCount: "program bulundu",
      emptyHeading: "Bu filtrelerle eşleşen program yok",
      emptyDesc:
        "Güncel programları görmek için bir filtreyi temizleyin. Kayıt ve kabul bilgilerinin bazıları kurumdan doğrudan teyit edilmelidir.",
      universitySubtitle:
        "Bu üniversitenin program kayıtlarını veya etiketlenmiş katalog örneklerini inceleyin. Örnekler güncel uygunluğu teyit etmez; ayrıntıları kurumdan kontrol edin.",
      universityEmptyHeading: "Bu üniversite için henüz doğrulanmış program ilanı yok",
      universityEmptyDesc:
        "Bu, üniversitede program olmadığı anlamına gelmez. Güncel bilgi için bize ulaşın; programlar yalnızca ayrıntıları doğrulandıktan sonra eklenir.",
      startLabel: "Başlangıç / kayıt dönemi",
      applicationWindowLabel: "Başvuru dönemi",
      requirementsLabel: "Kabul koşulları",
      noticeLabel: "Teyit edilmesi gereken bilgi",
      frankeduDeadlineLabel: "Frankedu belge paylaşım son tarihi",
      disclaimerTitle: "Başvurmadan önce",
      disclaimer:
        "Program ayrıntıları ve kabul kararları ilgili üniversiteye aittir ve değişebilir. Bu web sitesi başvuru göndermez. Vize kararları ilgili makamlarca verilir; kabul, vize, mesleki tanınma, iş veya istihdam sonucu garanti edilmez. Başvurmadan önce güncel koşulları ve ücretleri üniversiteden teyit edin.",
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
