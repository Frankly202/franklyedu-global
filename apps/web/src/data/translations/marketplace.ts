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
    emptyListingsHeading: string;
    emptyListingsDesc: string;
    contactBtn: string;
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
    statusLabel: string;
    expandPhotoAria: string;
    prevPhotoAria: string;
    nextPhotoAria: string;
    photoCounterPrefix: string;
    photoCounterOf: string;
    selectPhotoAria: string;
    aboutHeading: string;
    highlightsHeading: string;
    summaryCard: {
      eyebrow: string;
      title: string;
      reference: string;
      propertyType: string;
      location: string;
      status: string;
      pricing: string;
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
      title: "Housing and property enquiries.",
      subtitle:
        "Browse the available sections below. Listings are shown only when current details are available.",
      housingCard: {
        eyebrow: "Housing",
        title: "Accommodation",
        desc: "Ask us whether current accommodation information is available.",
        cta: "Ask about accommodation →",
      },
      propertyCard: {
        eyebrow: "Property",
        title: "Real Estate",
        desc: "View the property listing and ask us to confirm its current details.",
        cta: "View property information →",
      },
      allCategories: "All",
      enquireBtn: "Enquire",
      emptyListingsHeading: "No marketplace listings",
      emptyListingsDesc:
        "No marketplace product listings are published at this time. Use the Real Estate section above to view the separate property listing.",
      contactBtn: "Contact us",
    },
    accommodation: {
      eyebrow: "Accommodation",
      title: "Accommodation enquiries",
      subtitle:
        "No accommodation listings are currently published. Contact us to ask whether current information is available.",
      backToMarketplace: "Back to marketplace",
      reserveBtn: "Ask about availability",
    },
    realEstate: {
      eyebrow: "Property information",
      title: "Property information",
      subtitle:
        "One property listing is shown here. Contact us to confirm its current availability and details.",
      backToMarketplace: "Back to marketplace",
      requestDetailsBtn: "Ask about this listing",
    },
    propertyDetail: {
      notFoundEyebrow: "Real Estate",
      notFoundTitle: "Property Listing Not Found",
      notFoundSubtitle: "The requested property is unavailable or may have been updated.",
      backToListings: "Back to Real Estate Listings",
      notFoundBody: "This property listing is not available. Contact us if you need assistance.",
      defaultSubtitle:
        "Ask us to confirm current availability and property details before proceeding.",
      enquireWhatsapp: "Enquire on WhatsApp",
      allProperties: "All properties",
      statusLabel: "Status:",
      expandPhotoAria: "Expand photo in fullscreen",
      prevPhotoAria: "Previous photo",
      nextPhotoAria: "Next photo",
      photoCounterPrefix: "Photo",
      photoCounterOf: "of",
      selectPhotoAria: "Select photo:",
      aboutHeading: "About",
      highlightsHeading: "Listing information",
      summaryCard: {
        eyebrow: "Property listing",
        title: "Key Information",
        reference: "Reference",
        propertyType: "Property type",
        location: "Location",
        status: "Status",
        pricing: "Pricing",
      },
      viewingCard: {
        title: "Ask about this listing",
        desc: "Contact us to ask about current availability, property details, and viewing arrangements.",
        chatWhatsapp: "Chat on WhatsApp",
        advisoryTitle: "Before proceeding",
        advisoryDesc:
          "Confirm the property particulars and seek independent professional advice before making a decision.",
      },
      lightbox: {
        closeAria: "Close photo preview",
      },
    },
  },
  tr: {
    marketplace: {
      eyebrow: "Pazar Yeri",
      title: "Konaklama ve gayrimenkul hakkında bilgi.",
      subtitle:
        "Aşağıdaki bölümlere göz atın. İlanlar yalnızca güncel ayrıntılar mevcut olduğunda yayımlanır.",
      housingCard: {
        eyebrow: "Konaklama",
        title: "Öğrenci Konaklaması",
        desc: "Güncel konaklama bilgisi olup olmadığını bize sorun.",
        cta: "Konaklama hakkında bilgi alın →",
      },
      propertyCard: {
        eyebrow: "Yatırım",
        title: "Gayrimenkul",
        desc: "Gayrimenkul ilanını inceleyin ve güncel ayrıntıları teyit edin.",
        cta: "Gayrimenkul bilgilerini görüntüle →",
      },
      allCategories: "Tümü",
      enquireBtn: "Bilgi Al",
      emptyListingsHeading: "Pazar yeri ilanı yok",
      emptyListingsDesc:
        "Şu anda yayımlanmış pazar yeri ürün ilanı yok. Ayrı gayrimenkul ilanını görüntülemek için yukarıdaki Gayrimenkul bölümünü kullanın.",
      contactBtn: "Bize ulaşın",
    },
    accommodation: {
      eyebrow: "Öğrenci Konaklaması",
      title: "Konaklama hakkında bilgi",
      subtitle:
        "Şu anda yayımlanmış konaklama ilanı yok. Güncel bilgi olup olmadığını sormak için bizimle iletişime geçin.",
      backToMarketplace: "Pazar yerine dön",
      reserveBtn: "Uygunluğu sorun",
    },
    realEstate: {
      eyebrow: "Gayrimenkul bilgileri",
      title: "Gayrimenkul bilgileri",
      subtitle:
        "Burada bir gayrimenkul ilanı gösterilmektedir. Güncel uygunluk ve ayrıntıları teyit etmek için bizimle iletişime geçin.",
      backToMarketplace: "Pazar yerine dön",
      requestDetailsBtn: "Bu ilan hakkında bilgi alın",
    },
    propertyDetail: {
      notFoundEyebrow: "Gayrimenkul",
      notFoundTitle: "İlan Bulunamadı",
      notFoundSubtitle: "Aradığınız gayrimenkul ilanı mevcut değil veya güncellenmiş olabilir.",
      backToListings: "Gayrimenkul İlanlarına Dön",
      notFoundBody: "Bu gayrimenkul ilanı mevcut değil. Yardım için bizimle iletişime geçin.",
      defaultSubtitle:
        "İlerlemeye karar vermeden önce güncel uygunluk ve mülk ayrıntılarını teyit edin.",
      enquireWhatsapp: "WhatsApp'tan Bilgi Alın",
      allProperties: "Tüm Mülkler",
      statusLabel: "Durum:",
      expandPhotoAria: "Fotoğrafı tam ekranda büyüt",
      prevPhotoAria: "Önceki fotoğraf",
      nextPhotoAria: "Sonraki fotoğraf",
      photoCounterPrefix: "Fotoğraf",
      photoCounterOf: "/",
      selectPhotoAria: "Fotoğrafı seç:",
      aboutHeading: "Hakkında",
      highlightsHeading: "İlan bilgileri",
      summaryCard: {
        eyebrow: "Gayrimenkul ilanı",
        title: "Temel Bilgiler",
        reference: "Referans Kodu",
        propertyType: "Mülk Tipi",
        location: "Konum",
        status: "Durum",
        pricing: "Fiyat",
      },
      viewingCard: {
        title: "Bu ilan hakkında bilgi alın",
        desc: "Güncel uygunluk, mülk ayrıntıları ve gösterim düzenlemeleri hakkında bilgi almak için bizimle iletişime geçin.",
        chatWhatsapp: "WhatsApp'tan Yazın",
        advisoryTitle: "İlerlemeye karar vermeden önce",
        advisoryDesc:
          "Karar vermeden önce mülk bilgilerini teyit edin ve bağımsız profesyonel danışmanlık almayı değerlendirin.",
      },
      lightbox: {
        closeAria: "Önizlemeyi kapat",
      },
    },
  },
};
