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
    establishedLabel: string;
    establishedDesc: string;
    hqLabel: string;
    hqDesc: string;
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
      title: "Frank guidance for global study.",
      getInTouch: "Get in touch",
      trustBadgeTitle: "Verified Guidance",
      trustBadgeSubtitle:
        "Direct advisory for university admissions, scholarships, and overseas property.",
      heritageEyebrow: "Company & Heritage",
      heritageTitle: "Personal, transparent guidance from day one.",
      paragraph2:
        "Operating from our headquarters in Lefkoşa, North Cyprus, Frankedu Global was established to provide dependable clarity. We only publish admissions terms, tuition rates, and scholarship criteria confirmed directly with our partner institutions and verified networks.",
      establishedLabel: "Established",
      establishedDesc: "Founded with transparent student advocacy at its core.",
      hqLabel: "Headquarters",
      hqDesc: "Lefkoşa office providing in-person and international consultation.",
      whatsappBtn: "Message on WhatsApp",
      contactOfficeBtn: "Contact our office",
      howWeWorkEyebrow: "How we work",
      howWeWorkTitle: "What you can expect.",
      teamEyebrow: "Team",
      teamTitle: "People behind the plan.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s talk about your next step.",
      subtitle: "Reach us on WhatsApp for the fastest reply, or prepare an email below.",
      emailSubject: "Frankedu Global website enquiry",
      whatsappCard: {
        button: "Chat on WhatsApp",
      },
      officeCard: {
        emailLabel: "Email",
        officeLabel: "Office",
        socialLabel: "Social Channels",
      },
      form: {
        fullNamePlaceholder: "Full name",
        emailPlaceholder: "Email address",
        phonePlaceholder: "Phone / WhatsApp number",
        destinationPlaceholder: "Preferred destination",
        messagePlaceholder: "Tell us about your study plans",
        emailNotice:
          "This opens your email app with the message ready. You will need to send it there; the website does not submit or store it.",
        emailSubmitBtn: "Continue in email",
      },
    },
  },
  tr: {
    about: {
      eyebrow: "Hakkında",
      title: "Küresel eğitimde dürüst ve şeffaf rehberlik.",
      getInTouch: "İletişime Geçin",
      trustBadgeTitle: "Doğrulanmış Danışmanlık",
      trustBadgeSubtitle:
        "Üniversite kabulleri, burslar ve denizaşırı gayrimenkul yatırımları için doğrudan danışmanlık.",
      heritageEyebrow: "Kuruluş ve İlkeler",
      heritageTitle: "İlk günden itibaren şeffaf, güvenilir ve kişisel rehberlik.",
      paragraph2:
        "Kuzey Kıbrıs Lefkoşa'daki genel merkezimizden hizmet veren Frankedu Global, öğrencilere ve ailelere tam bir şeffaflık sağlamak üzere kuruldu. Yalnızca anlaşmalı partner kurumlarımızla doğrudan teyit edilmiş kabul şartlarını, harç ücretlerini ve burs kriterlerini yayınlıyoruz.",
      establishedLabel: "Kuruluş Yılı",
      establishedDesc: "Öğrenci haklarını gözeten şeffaf danışmanlık ilkesiyle kuruldu.",
      hqLabel: "Genel Merkez",
      hqDesc: "Lefkoşa ofisimiz yüz yüze ve uluslararası çevrimiçi danışmanlık sunmaktadır.",
      whatsappBtn: "WhatsApp'tan Yazın",
      contactOfficeBtn: "Ofisimizle İletişime Geçin",
      howWeWorkEyebrow: "Çalışma İlkelerimiz",
      howWeWorkTitle: "Bizden neler bekleyebilirsiniz?",
      teamEyebrow: "Ekibimiz",
      teamTitle: "Sürecin arkasındaki danışman ekibimiz.",
    },
    contact: {
      eyebrow: "İletişim",
      title: "Geleceğiniz için bir sonraki adımı konuşalım.",
      subtitle:
        "En hızlı yanıt için bize WhatsApp'tan ulaşabilir veya aşağıdan e-posta taslağı oluşturabilirsiniz.",
      emailSubject: "Frankedu Global web sitesi iletişim talebi",
      whatsappCard: {
        button: "WhatsApp'tan Yazın",
      },
      officeCard: {
        emailLabel: "E-posta",
        officeLabel: "Ofis Adresi",
        socialLabel: "Sosyal Medya",
      },
      form: {
        fullNamePlaceholder: "Ad Soyad",
        emailPlaceholder: "E-posta adresi",
        phonePlaceholder: "Telefon / WhatsApp numarası",
        destinationPlaceholder: "Tercih edilen ülke",
        messagePlaceholder: "Eğitim veya mülk planlarınızdan bahsedin",
        emailNotice:
          "Bu işlem e-posta uygulamanızı hazır bir mesaj taslağıyla açar. E-postayı oradan göndermeniz gerekir; web sitesi mesajı göndermez veya saklamaz.",
        emailSubmitBtn: "E-posta ile devam et",
      },
    },
  },
};
