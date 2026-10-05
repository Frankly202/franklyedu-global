export interface PortalTranslation {
  application: {
    eyebrow: string;
    defaultTitle: string;
    applyingTo: string;
    defaultSubtitle: string;
    steps: {
      details: string;
      studyPlan: string;
      documents: string;
      review: string;
    };
    form: {
      fullNamePlaceholder: string;
      emailPlaceholder: string;
      phonePlaceholder: string;
      nationalityPlaceholder: string;
      destinationOption: string;
      universityOption: string;
      courseOption: string;
      intakeOption: string;
      intakeOptions: {
        jan2027: string;
        sep2026: string;
        feb2027: string;
      };
      documentsList: {
        passport: string;
        transcripts: string;
        englishProficiency: string;
        sop: string;
      };
      uploadsNotice: string;
      summaryLabels: {
        name: string;
        email: string;
        phone: string;
        nationality: string;
        destination: string;
        university: string;
        programme: string;
        intake: string;
      };
      backBtn: string;
      continueBtn: string;
      submitBtn: string;
    };
    done: {
      eyebrow: string;
      title: string;
      desc: string;
      dashboardBtn: string;
      startOverBtn: string;
    };
  };
  student: {
    breadcrumb: string;
    bannerEyebrow: string;
    title: string;
    subtitle: string;
    newApplicationBtn: string;
    applicationsHeading: string;
    completeSuffix: string;
    savedUnisHeading: string;
    checklistHeading: string;
    counselorCard: {
      title: string;
      subtitle: string;
      button: string;
    };
    accountCard: {
      title: string;
      signOut: string;
    };
  };
  login: {
    title: string;
    subtitle: string;
    readyNotice: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    submitBtn: string;
    newToBrand: string;
    createAccount: string;
    previewDashboard: string;
  };
  signup: {
    title: string;
    subtitle: string;
    readyNotice: string;
    fullNamePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    nationalityPlaceholder: string;
    residencePlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    submitBtn: string;
    alreadyHaveAccount: string;
    logInLink: string;
    previewDashboard: string;
  };
}

export const portalTranslations: Record<"en" | "tr", PortalTranslation> = {
  en: {
    application: {
      eyebrow: "Application",
      defaultTitle: "Start your application.",
      applyingTo: "Applying to",
      defaultSubtitle:
        "Four short steps. You can come back and finish later once accounts are connected.",
      steps: {
        details: "Your details",
        studyPlan: "Study plan",
        documents: "Documents",
        review: "Review",
      },
      form: {
        fullNamePlaceholder: "Full name",
        emailPlaceholder: "Email address",
        phonePlaceholder: "Phone / WhatsApp number",
        nationalityPlaceholder: "Nationality",
        destinationOption: "Study destination",
        universityOption: "University (optional)",
        courseOption: "Programme (optional)",
        intakeOption: "Preferred intake",
        intakeOptions: {
          jan2027: "January 2027",
          sep2026: "September 2026",
          feb2027: "February 2027",
        },
        documentsList: {
          passport: "Passport copy",
          transcripts: "Academic transcripts",
          englishProficiency: "English proficiency proof",
          sop: "Statement of purpose",
        },
        uploadsNotice: "Uploads are not stored in this prototype.",
        summaryLabels: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          nationality: "Nationality",
          destination: "Destination",
          university: "University",
          programme: "Programme",
          intake: "Intake",
        },
        backBtn: "Back",
        continueBtn: "Continue",
        submitBtn: "Submit application",
      },
      done: {
        eyebrow: "Prototype",
        title: "Application saved locally",
        desc: "Nothing was submitted yet — this flow is ready to connect to your application system.",
        dashboardBtn: "Go to student dashboard",
        startOverBtn: "Start over",
      },
    },
    student: {
      breadcrumb: "Student Preview",
      bannerEyebrow: "Prototype Preview — Demonstration Only",
      title: "Applicant Dashboard Preview",
      subtitle: "Demonstration tracker for programme applications and document checklists.",
      newApplicationBtn: "New application",
      applicationsHeading: "Applications",
      completeSuffix: "complete",
      savedUnisHeading: "Saved universities",
      checklistHeading: "Document checklist",
      counselorCard: {
        title: "Need help with a document?",
        subtitle: "Your counsellor replies within 24 hours.",
        button: "Message counsellor",
      },
      accountCard: {
        title: "Account",
        signOut: "Sign out (prototype) →",
      },
    },
    login: {
      title: "Welcome back",
      subtitle:
        "Student account access will be connected here when the application system is ready.",
      readyNotice: "Ready for authentication integration",
      emailPlaceholder: "Email address",
      passwordPlaceholder: "Password",
      forgotPassword: "Forgot password?",
      submitBtn: "Log in (integration ready)",
      newToBrand: "New to Frankedu?",
      createAccount: "Create your account",
      previewDashboard: "Preview student dashboard →",
    },
    signup: {
      title: "Start your global study journey",
      subtitle:
        "Create your profile when you’re ready to save opportunities and begin an application.",
      readyNotice: "Ready for authentication integration",
      fullNamePlaceholder: "Full name",
      emailPlaceholder: "Email address",
      phonePlaceholder: "Phone / WhatsApp number",
      nationalityPlaceholder: "Nationality",
      residencePlaceholder: "Country of residence",
      passwordPlaceholder: "Password",
      confirmPasswordPlaceholder: "Confirm password",
      submitBtn: "Create account (integration ready)",
      alreadyHaveAccount: "Already have an account?",
      logInLink: "Log in",
      previewDashboard: "Preview student dashboard →",
    },
  },
  tr: {
    application: {
      eyebrow: "Başvuru",
      defaultTitle: "Başvurunuzu başlatın.",
      applyingTo: "Başvurulan Kurum:",
      defaultSubtitle:
        "Dört kısa adım. Hesap entegrasyonu sağlandığında dilediğiniz zaman devam edebilirsiniz.",
      steps: {
        details: "Kişisel Bilgiler",
        studyPlan: "Eğitim Planı",
        documents: "Belgeler",
        review: "Özet ve Onay",
      },
      form: {
        fullNamePlaceholder: "Ad Soyad",
        emailPlaceholder: "E-posta adresi",
        phonePlaceholder: "Telefon / WhatsApp numarası",
        nationalityPlaceholder: "Vatandaşlık / Uyruk",
        destinationOption: "Eğitim Ülkesi",
        universityOption: "Üniversite (isteğe bağlı)",
        courseOption: "Bölüm (isteğe bağlı)",
        intakeOption: "Tercih Edilen Dönem",
        intakeOptions: {
          jan2027: "Ocak 2027",
          sep2026: "Eylül 2026",
          feb2027: "Şubat 2027",
        },
        documentsList: {
          passport: "Pasaport Fotokopisi",
          transcripts: "Transkript / Not Dökümü",
          englishProficiency: "İngilizce Yeterlilik Belgesi",
          sop: "Niyet Mektubu (SOP)",
        },
        uploadsNotice: "Yüklenen belgeler bu prototip aşamasında kaydedilmez.",
        summaryLabels: {
          name: "Ad Soyad",
          email: "E-posta",
          phone: "Telefon",
          nationality: "Vatandaşlık",
          destination: "Eğitim Ülkesi",
          university: "Üniversite",
          programme: "Program",
          intake: "Kayıt Dönemi",
        },
        backBtn: "Geri",
        continueBtn: "Devam Et",
        submitBtn: "Başvuruyu Gönder",
      },
      done: {
        eyebrow: "Önizleme",
        title: "Başvuru taslağı kaydedildi",
        desc: "Henüz sunucuya gönderilmedi — bu akış başvuru yönetim altyapısına bağlanmaya hazırdır.",
        dashboardBtn: "Öğrenci paneline git",
        startOverBtn: "Yeniden başlat",
      },
    },
    student: {
      breadcrumb: "Öğrenci Önizleme",
      bannerEyebrow: "Prototip Önizleme — Yalnızca Gösterim Amaçlıdır",
      title: "Öğrenci Başvuru Paneli Önizlemesi",
      subtitle: "Program başvuruları ve evrak kontrol listesi için örnek takip arayüzü.",
      newApplicationBtn: "Yeni başvuru",
      applicationsHeading: "Başvurularım",
      completeSuffix: "tamamlandı",
      savedUnisHeading: "Kaydedilen Üniversiteler",
      checklistHeading: "Evrak Kontrol Listesi",
      counselorCard: {
        title: "Bir evrakla ilgili yardıma mı ihtiyacınız var?",
        subtitle: "Danışmanınız 24 saat içinde yanıt verir.",
        button: "Danışmana Mesaj Yazın",
      },
      accountCard: {
        title: "Hesap",
        signOut: "Çıkış Yap (prototip) →",
      },
    },
    login: {
      title: "Tekrar hoş geldiniz",
      subtitle:
        "Öğrenci hesabı girişi, başvuru altyapısı bağlandığında buradan aktif hale gelecektir.",
      readyNotice: "Kullanıcı girişi entegrasyonuna hazır",
      emailPlaceholder: "E-posta adresi",
      passwordPlaceholder: "Şifre",
      forgotPassword: "Şifremi unuttum",
      submitBtn: "Giriş Yap (entegrasyona hazır)",
      newToBrand: "Frankedu'da yeni misiniz?",
      createAccount: "Hesap oluşturun",
      previewDashboard: "Öğrenci panelini önizleyin →",
    },
    signup: {
      title: "Küresel eğitim yolculuğunuza başlayın",
      subtitle: "Fırsatları kaydetmek ve başvuru sürecini başlatmak için profilinizi oluşturun.",
      readyNotice: "Kullanıcı kaydı entegrasyonuna hazır",
      fullNamePlaceholder: "Ad Soyad",
      emailPlaceholder: "E-posta adresi",
      phonePlaceholder: "Telefon / WhatsApp numarası",
      nationalityPlaceholder: "Vatandaşlık",
      residencePlaceholder: "İkamet edilen ülke",
      passwordPlaceholder: "Şifre",
      confirmPasswordPlaceholder: "Şifreyi onaylayın",
      submitBtn: "Hesap Oluştur (entegrasyona hazır)",
      alreadyHaveAccount: "Zaten bir hesabınız var mı?",
      logInLink: "Giriş Yap",
      previewDashboard: "Öğrenci panelini önizleyin →",
    },
  },
};
