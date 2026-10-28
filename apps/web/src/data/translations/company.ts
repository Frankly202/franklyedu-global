export interface CompanyTranslation {
  about: {
    eyebrow: string;
    title: string;
    getInTouch: string;
    trustBadgeTitle: string;
    trustBadgeSubtitle: string;
    heritageEyebrow: string;
    heritageTitle: string;
    paragraph2: string;
    brandLabel: string;
    brandDesc: string;
    addressLabel: string;
    whatsappBtn: string;
    contactOfficeBtn: string;
    howWeWorkEyebrow: string;
    howWeWorkTitle: string;
    teamEyebrow: string;
    teamTitle: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emailSubject: string;
    whatsappCard: {
      button: string;
    };
    officeCard: {
      emailLabel: string;
      officeLabel: string;
      socialLabel: string;
    };
    form: {
      fullNamePlaceholder: string;
      emailPlaceholder: string;
      phonePlaceholder: string;
      destinationPlaceholder: string;
      messagePlaceholder: string;
      emailNotice: string;
      emailSubmitBtn: string;
    };
  };
}

export const companyTranslations: Record<"en" | "tr", CompanyTranslation> = {
  en: {
    about: {
      eyebrow: "About",
      title: "About Frankedu Global",
      getInTouch: "Get in touch",
      trustBadgeTitle: "Study and property information",
      trustBadgeSubtitle: "Ask us to confirm current details before making a decision.",
      heritageEyebrow: "What we do",
      heritageTitle: "Clear information for your next decision.",
      paragraph2:
        "We share study information and property details, and discuss digital-service enquiries. Ask us to confirm what is currently available.",
      brandLabel: "Brand",
      brandDesc: "Customer-facing brand",
      addressLabel: "Address",
      whatsappBtn: "Message on WhatsApp",
      contactOfficeBtn: "Contact us",
      howWeWorkEyebrow: "How we work",
      howWeWorkTitle: "What you can expect.",
      teamEyebrow: "Team",
      teamTitle: "People behind the plan.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s talk about your next step.",
      subtitle: "Message us on WhatsApp or prepare an email using the form below.",
      emailSubject: "Frankedu Global website enquiry",
      whatsappCard: {
        button: "Chat on WhatsApp",
      },
      officeCard: {
        emailLabel: "Email",
        officeLabel: "Address",
        socialLabel: "Social Channels",
      },
      form: {
        fullNamePlaceholder: "Full name",
        emailPlaceholder: "Email address",
        phonePlaceholder: "Phone / WhatsApp number",
        destinationPlaceholder: "Preferred destination",
        messagePlaceholder: "Tell us what you would like to ask",
        emailNotice:
          "This opens your email app with the message ready. You will need to send it there; the website does not submit or store it.",
        emailSubmitBtn: "Continue in email",
      },
    },
  },
  tr: {
    about: {
      eyebrow: "Hakkında",
      title: "Frankedu Global hakkında",
      getInTouch: "İletişime Geçin",
      trustBadgeTitle: "Eğitim ve gayrimenkul bilgileri",
      trustBadgeSubtitle: "Karar vermeden önce güncel ayrıntıları teyit edin.",
      heritageEyebrow: "Ne yapıyoruz?",
      heritageTitle: "Bir sonraki kararınız için açık bilgiler.",
      paragraph2:
        "Eğitim bilgileri ve gayrimenkul ayrıntılarını paylaşıyor, dijital hizmet taleplerini görüşüyoruz. Güncel olarak nelerin mevcut olduğunu teyit etmek için bize ulaşın.",
      brandLabel: "Marka",
      brandDesc: "Müşterilere sunulan marka",
      addressLabel: "Adres",
      whatsappBtn: "WhatsApp'tan Yazın",
      contactOfficeBtn: "Bize ulaşın",
      howWeWorkEyebrow: "Çalışma İlkelerimiz",
      howWeWorkTitle: "Bizden neler bekleyebilirsiniz?",
      teamEyebrow: "Ekibimiz",
      teamTitle: "Sürecin arkasındaki danışman ekibimiz.",
    },
    contact: {
      eyebrow: "İletişim",
      title: "Geleceğiniz için bir sonraki adımı konuşalım.",
      subtitle:
        "WhatsApp'tan mesaj gönderin veya aşağıdaki formu kullanarak e-posta taslağı oluşturun.",
      emailSubject: "Frankedu Global web sitesi iletişim talebi",
      whatsappCard: {
        button: "WhatsApp'tan Yazın",
      },
      officeCard: {
        emailLabel: "E-posta",
        officeLabel: "Adres",
        socialLabel: "Sosyal Medya",
      },
      form: {
        fullNamePlaceholder: "Ad Soyad",
        emailPlaceholder: "E-posta adresi",
        phonePlaceholder: "Telefon / WhatsApp numarası",
        destinationPlaceholder: "Tercih edilen ülke",
        messagePlaceholder: "Ne sormak istediğinizi yazın",
        emailNotice:
          "Bu işlem e-posta uygulamanızı hazır bir mesaj taslağıyla açar. E-postayı oradan göndermeniz gerekir; web sitesi mesajı göndermez veya saklamaz.",
        emailSubmitBtn: "E-posta ile devam et",
      },
    },
  },
};
