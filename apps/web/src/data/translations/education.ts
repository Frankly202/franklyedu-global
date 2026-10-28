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
    cardDescription: string;
    viewUniversities: string;
    askAboutOptions: string;
  };
  scholarships: {
    eyebrow: string;
    title: string;
    subtitle: string;
    noMatchingHeading: string;
    noMatchingDesc: string;
    clearBtn: string;
    foundCount: string;
    universityLabel: string;
    allUniversities: string;
    allLevels: string;
    allTypes: string;
    typeLabel: string;
    scholarshipType: string;
    tuitionDiscountType: string;
    bursaryType: string;
    amountLabel: string;
    levelLabel: string;
    coverageLabel: string;
    tuitionOnly: string;
    tuitionAndLiving: string;
    coverageUnspecified: string;
    eligibilityLabel: string;
    deadlineLabel: string;
    deadlineNotPublished: string;
    deadlineUnconfirmed: string;
    amountNotPublished: string;
    levelUnspecified: string;
    sourceLabel: string;
    verifiedLabel: string;
    sourceReviewedLabel: string;
    confirmedCurrent: string;
    officialInfoUnconfirmed: string;
    awaitingVerification: string;
    enquiryMessageTemplate: string;
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
      title: "Choose where you want to study.",
      subtitle:
        "Explore the destinations in our directory. View listed universities or contact us to confirm current study options.",
      cardDescription:
        "Browse listed universities for this destination. Contact us to confirm current options.",
      viewUniversities: "View Universities",
      askAboutOptions: "Ask about options",
    },
    scholarships: {
      eyebrow: "Scholarships",
      title: "University scholarship information",
      subtitle:
        "Browse scholarship information published by universities. Each listing is labelled as confirmed current, official information with availability unconfirmed, or awaiting verification. Unconfirmed entries are not offers of an open award.",
      noMatchingHeading: "No scholarship information matches these filters",
      noMatchingDesc:
        "Clear a filter or contact us for help confirming details with a university. Unconfirmed information must not be treated as an open award.",
      clearBtn: "Clear filters",
      foundCount: "scholarship listings",
      universityLabel: "University",
      allUniversities: "All universities",
      allLevels: "All study levels",
      allTypes: "All types",
      typeLabel: "Award type",
      scholarshipType: "Scholarship",
      tuitionDiscountType: "Tuition discount",
      bursaryType: "Bursary",
      amountLabel: "Amount",
      levelLabel: "Study level",
      coverageLabel: "Coverage basis",
      tuitionOnly: "Tuition fees only; no living-cost coverage is stated.",
      tuitionAndLiving: "Tuition and living costs, as stated by the source.",
      coverageUnspecified: "The source does not specify what costs the award covers.",
      eligibilityLabel: "Eligibility",
      deadlineLabel: "Deadline",
      deadlineNotPublished: "No deadline published",
      deadlineUnconfirmed: "Not confirmed",
      amountNotPublished: "Not published by the source",
      levelUnspecified: "Not specified by the source",
      sourceLabel: "Official source reference",
      verifiedLabel: "Last verified",
      sourceReviewedLabel: "Official source page reviewed",
      confirmedCurrent: "Confirmed current",
      officialInfoUnconfirmed: "Official information; current availability unconfirmed",
      awaitingVerification: "Awaiting verification",
      enquiryMessageTemplate:
        "Hello FranklyEdu Global, I have a question about {award} at {university}.",
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
      title: "Eğitim almak istediğiniz yeri seçin.",
      subtitle:
        "Rehberimizdeki destinasyonları inceleyin. Listelenen üniversiteleri görüntüleyin veya güncel eğitim seçeneklerini teyit etmek için bize ulaşın.",
      cardDescription:
        "Bu destinasyonda listelenen üniversitelere göz atın. Güncel seçenekleri teyit etmek için bize ulaşın.",
      viewUniversities: "Üniversiteleri Görüntüle",
      askAboutOptions: "Seçenekleri sorun",
    },
    scholarships: {
      eyebrow: "Burs Olanakları",
      title: "Üniversite burs bilgileri",
      subtitle:
        "Üniversitelerin yayımladığı burs bilgilerini inceleyin. Her kayıt; güncel olduğu teyit edilen, resmî ancak güncel uygunluğu teyit edilmemiş veya doğrulama bekleyen olarak etiketlenir. Teyit edilmemiş kayıtlar açık burs teklifi değildir.",
      noMatchingHeading: "Bu filtrelerle eşleşen burs bilgisi yok",
      noMatchingDesc:
        "Bir filtreyi temizleyin veya bilgileri üniversiteyle teyit etmek için destek alın. Teyit edilmemiş bilgiler açık burs teklifi olarak değerlendirilmemelidir.",
      clearBtn: "Filtreleri temizle",
      foundCount: "burs kaydı",
      universityLabel: "Üniversite",
      allUniversities: "Tüm üniversiteler",
      allLevels: "Tüm eğitim seviyeleri",
      allTypes: "Tüm türler",
      typeLabel: "Ödül türü",
      scholarshipType: "Burs",
      tuitionDiscountType: "Öğrenim ücreti indirimi",
      bursaryType: "Karşılıksız eğitim desteği",
      amountLabel: "Miktar",
      levelLabel: "Eğitim seviyesi",
      coverageLabel: "Kapsam",
      tuitionOnly: "Yalnızca öğrenim ücreti; yaşam gideri kapsamı belirtilmemiştir.",
      tuitionAndLiving: "Kaynakta belirtildiği üzere öğrenim ve yaşam giderleri.",
      coverageUnspecified: "Kaynak, bursun hangi giderleri karşıladığını belirtmiyor.",
      eligibilityLabel: "Uygunluk",
      deadlineLabel: "Son Tarih",
      deadlineNotPublished: "Son tarih yayımlanmamış",
      deadlineUnconfirmed: "Teyit edilmedi",
      amountNotPublished: "Kaynakta yayımlanmamış",
      levelUnspecified: "Kaynakta belirtilmemiş",
      sourceLabel: "Resmî kaynak referansı",
      verifiedLabel: "Son doğrulama",
      sourceReviewedLabel: "Resmî kaynak sayfası inceleme tarihi",
      confirmedCurrent: "Güncel olduğu teyit edildi",
      officialInfoUnconfirmed: "Resmî bilgi; güncel uygunluk teyit edilmedi",
      awaitingVerification: "Doğrulama bekliyor",
      enquiryMessageTemplate:
        "Merhaba FranklyEdu Global, {university} bünyesindeki {award} hakkında bilgi almak istiyorum.",
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
