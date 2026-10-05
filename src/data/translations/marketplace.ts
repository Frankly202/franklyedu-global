export interface MarketplaceTranslation {
  marketplace: {
    eyebrow: string;
    title: string;
    subtitle: string;
    housingCard: {
      eyebrow: string;
      title: string;
      desc: string;
      cta: string;
    };
    propertyCard: {
      eyebrow: string;
      title: string;
      desc: string;
      cta: string;
    };
    allCategories: string;
    enquireBtn: string;
  };
  accommodation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    backToMarketplace: string;
    reserveBtn: string;
  };
  realEstate: {
    eyebrow: string;
    title: string;
    subtitle: string;
    backToMarketplace: string;
    requestDetailsBtn: string;
  };
  propertyDetail: {
    notFoundEyebrow: string;
    notFoundTitle: string;
    notFoundSubtitle: string;
    backToListings: string;
    notFoundBody: string;
    defaultSubtitle: string;
    enquireWhatsapp: string;
    allProperties: string;
    foreignBuyerPill: string;
    statusLabel: string;
    expandPhotoAria: string;
    prevPhotoAria: string;
    nextPhotoAria: string;
    photoCounterPrefix: string;
    photoCounterOf: string;
    selectPhotoAria: string;
    aboutHeading: string;
    highlightsHeading: string;
    disclaimerTitle: string;
    summaryCard: {
      eyebrow: string;
      title: string;
      reference: string;
      propertyType: string;
      location: string;
      mapLocation: string;
      mapUponEnquiry: string;
      status: string;
      pricing: string;
      buyerEligibility: string;
    };
    viewingCard: {
      title: string;
      desc: string;
      chatWhatsapp: string;
      advisoryTitle: string;
      advisoryDesc: string;
    };
    lightbox: {
      closeAria: string;
    };
  };
}

export const marketplaceTranslations: Record<"en" | "tr", MarketplaceTranslation> = {
  en: {
    marketplace: {
      eyebrow: "Marketplace",
      title: "Everything you need to settle in.",
      subtitle: "Housing, essentials and trusted services from the Frankedu community.",
      housingCard: {
        eyebrow: "Housing",
        title: "Accommodation",
        desc: "Dormitories, shared flats and private apartments near campus.",
        cta: "Browse accommodation →",
      },
      propertyCard: {
        eyebrow: "Property",
        title: "Real Estate",
        desc: "Buy or rent long-term — including student investment properties.",
        cta: "Browse real estate →",
      },
      allCategories: "All",
      enquireBtn: "Enquire",
    },
    accommodation: {
      eyebrow: "Accommodation",
      title: "A place to live before you land.",
      subtitle:
        "Verified student housing options near campus, managed separately from property investments.",
      backToMarketplace: "Back to marketplace",
      reserveBtn: "Reserve",
    },
    realEstate: {
      eyebrow: "Property & Investment",
      title: "Property for families, buyers and investors.",
      subtitle:
        "Curated opportunities across North Cyprus, the UK, and selected Dubai/UAE markets. Student accommodation is managed separately.",
      backToMarketplace: "Back to marketplace",
      requestDetailsBtn: "Request details",
    },
    propertyDetail: {
      notFoundEyebrow: "Real Estate",
      notFoundTitle: "Property Listing Not Found",
      notFoundSubtitle: "The requested property is unavailable or may have been updated.",
      backToListings: "Back to Real Estate Listings",
      notFoundBody:
        "Please check our current property opportunities or contact our advisors directly for the latest available inventory.",
      defaultSubtitle:
        "A design-refurbished villa prepared for resale in North Cyprus. Complete verified property photography and viewing assistance available.",
      enquireWhatsapp: "Enquire on WhatsApp",
      allProperties: "All properties",
      foreignBuyerPill: "Foreign national eligible*",
      statusLabel: "Status:",
      expandPhotoAria: "Expand photo in fullscreen",
      prevPhotoAria: "Previous photo",
      nextPhotoAria: "Next photo",
      photoCounterPrefix: "Photo",
      photoCounterOf: "of",
      selectPhotoAria: "Select photo:",
      aboutHeading: "About",
      highlightsHeading: "Verified Property Highlights",
      disclaimerTitle: "Buyer & Title Eligibility Notice",
      summaryCard: {
        eyebrow: "Verified Listing",
        title: "Key Information",
        reference: "Reference",
        propertyType: "Property type",
        location: "Location",
        mapLocation: "Map location",
        mapUponEnquiry: "Supplied upon enquiry",
        status: "Status",
        pricing: "Pricing",
        buyerEligibility: "Buyer eligibility",
      },
      viewingCard: {
        title: "Arrange a Viewing",
        desc: "Frankedu Global provides direct assistance for property viewing, map location verification, and purchase coordination in North Cyprus.",
        chatWhatsapp: "Chat on WhatsApp",
        advisoryTitle: "Official Advisory Support",
        advisoryDesc:
          "Independent conveyancing recommended for all real estate transactions. Contact our team for verified information and assistance.",
      },
      lightbox: {
        closeAria: "Close photo preview",
      },
    },
  },
  tr: {
    marketplace: {
      eyebrow: "Pazar Yeri",
      title: "Yerleşmek ve yaşamak için ihtiyacınız olan her şey.",
      subtitle:
        "Frankedu topluluğundan onaylı konutlar, temel ihtiyaçlar ve güvenilir öğrenci hizmetleri.",
      housingCard: {
        eyebrow: "Konaklama",
        title: "Öğrenci Konaklaması",
        desc: "Kampüse yakın yurtlar, paylaşımlı daireler ve özel stüdyolar.",
        cta: "Konaklamaları incele →",
      },
      propertyCard: {
        eyebrow: "Yatırım",
        title: "Gayrimenkul",
        desc: "Satılık ve uzun dönem kiralık — öğrenci yatırım mülkleri dahil.",
        cta: "Gayrimenkulleri incele →",
      },
      allCategories: "Tümü",
      enquireBtn: "Bilgi Al",
    },
    accommodation: {
      eyebrow: "Öğrenci Konaklaması",
      title: "Uçaktan inmeden eviniz hazır olsun.",
      subtitle:
        "Kampüse yakın, mülk yatırımlarından ayrı yönetilen doğrulanmış öğrenci konut seçenekleri.",
      backToMarketplace: "Pazar yerine dön",
      reserveBtn: "Rezerve Et",
    },
    realEstate: {
      eyebrow: "Gayrimenkul ve Yatırım",
      title: "Aileler, alıcılar ve yatırımcılar için seçkin mülkler.",
      subtitle:
        "Kuzey Kıbrıs, Birleşik Krallık ve Dubai/BAE genelinde özel yatırım fırsatları. Öğrenci konaklamaları ayrı yönetilmektedir.",
      backToMarketplace: "Pazar yerine dön",
      requestDetailsBtn: "Detay İsteyin",
    },
    propertyDetail: {
      notFoundEyebrow: "Gayrimenkul",
      notFoundTitle: "İlan Bulunamadı",
      notFoundSubtitle: "Aradığınız gayrimenkul ilanı mevcut değil veya güncellenmiş olabilir.",
      backToListings: "Gayrimenkul İlanlarına Dön",
      notFoundBody:
        "Lütfen mevcut gayrimenkul fırsatlarımızı inceleyin veya güncel portföy için danışmanlarımızla iletişime geçin.",
      defaultSubtitle:
        "Kuzey Kıbrıs'ta yeniden satışa hazır, mimari tasarımlı villa. Doğrulanmış mülk fotoğrafları ve yerinde gösterim desteği mevcuttur.",
      enquireWhatsapp: "WhatsApp'tan Bilgi Alın",
      allProperties: "Tüm Mülkler",
      foreignBuyerPill: "Yabancı alıcıya uygun*",
      statusLabel: "Durum:",
      expandPhotoAria: "Fotoğrafı tam ekranda büyüt",
      prevPhotoAria: "Önceki fotoğraf",
      nextPhotoAria: "Sonraki fotoğraf",
      photoCounterPrefix: "Fotoğraf",
      photoCounterOf: "/",
      selectPhotoAria: "Fotoğrafı seç:",
      aboutHeading: "Hakkında",
      highlightsHeading: "Öne Çıkan Doğrulanmış Özellikler",
      disclaimerTitle: "Alıcı ve Koçan Uygunluk Bildirimi",
      summaryCard: {
        eyebrow: "Doğrulanmış İlan",
        title: "Temel Bilgiler",
        reference: "Referans Kodu",
        propertyType: "Mülk Tipi",
        location: "Konum",
        mapLocation: "Harita Konumu",
        mapUponEnquiry: "Talep üzerine iletilir",
        status: "Durum",
        pricing: "Fiyat",
        buyerEligibility: "Alıcı Uygunluğu",
      },
      viewingCard: {
        title: "Mülk Gösterimi Ayarlayın",
        desc: "Frankedu Global; Kuzey Kıbrıs'ta mülk gösterimi, yerinde lokasyon teyidi ve satın alma süreçlerinde doğrudan rehberlik eder.",
        chatWhatsapp: "WhatsApp'tan Yazın",
        advisoryTitle: "Resmi Danışmanlık Desteği",
        advisoryDesc:
          "Tüm gayrimenkul işlemlerinde bağımsız hukuki devir (conveyancing) desteği önerilir. Doğrulanmış bilgi ve randevu için ekibimizle iletişime geçin.",
      },
      lightbox: {
        closeAria: "Önizlemeyi kapat",
      },
    },
  },
};
