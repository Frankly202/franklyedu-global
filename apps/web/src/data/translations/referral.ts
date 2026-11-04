import type { Locale } from "@/lib/locale";

export interface ReferralTranslation {
  homePromo: {
    eyebrow: string;
    title: string;
    description: string;
    status: string;
    cta: string;
    pause: string;
    resume: string;
  };
  publicPage: {
    journeyTitle: string;
    journeyIntro: string;
    journey: { title: string; description: string }[];
    benefitTitle: string;
    benefitAmount: string;
    benefitDetails: string;
    benefitNotice: string;
    faqTitle: string;
    faqs: { question: string; answer: string }[];
    ctaTitle: string;
    ctaDescription: string;
    ctaJoin: string;
    ctaContact: string;
    ctaLogin: string;
    noCollectionNote: string;
  };
  participant: {
    title: string;
    subtitle: string;
    ready: string;
    unavailable: string;
  };
  recovery: {
    title: string;
    resetTitle: string;
    description: string;
    disabled: string;
    sent: string;
    success: string;
    invalid: string;
    unavailable: string;
    validation: string;
    busy: string;
    send: string;
    update: string;
  };
  registration: {
    preview: string;
    confirmPassword: string;
    submit: string;
  };
  landing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    statusTitle: string;
    status: string;
    privacyStatus: string;
    join: string;
    login: string;
    contact: string;
  };
  authUnavailable: {
    signupTitle: string;
    loginTitle: string;
    description: string;
    returnToProgramme: string;
  };
  authForm: {
    description: string;
    email: string;
    password: string;
    showPassword: string;
    hidePassword: string;
    submit: string;
    submitting: string;
    signedIn: string;
    invalidCredentials: string;
    unavailable: string;
    signOut: string;
  };
}

export const referralTranslations: Record<Locale, ReferralTranslation> = {
  en: {
    homePromo: {
      eyebrow: "Student Referral Programme",
      title: "Explore a more connected study journey",
      description:
        "Learn about our programme for introducing students to study options. Participation is not open yet.",
      status: "Programme details are being finalized",
      cta: "Explore the programme",
      pause: "Pause announcement",
      resume: "Resume announcement",
    },
    publicPage: {
      journeyTitle: "How the programme is taking shape",
      journeyIntro:
        "The final participation steps are still being prepared. For now, here is what you can do:",
      journey: [
        {
          title: "Explore the information",
          description:
            "Read what is confirmed here. Eligibility and complete programme terms are not yet published.",
        },
        {
          title: "Ask a general question",
          description:
            "Contact FranklyEdu for clarification. Please do not send prospective students’ personal details.",
        },
        {
          title: "Wait for approved participation steps",
          description:
            "Registration and referral submissions will remain unavailable until the programme terms and collection notice are approved.",
        },
      ],
      benefitTitle: "What is confirmed about the reward",
      benefitAmount: "€170 fixed amount in the programme roadmap",
      benefitDetails:
        "Enrolment and reward qualification are separate decisions. An authorized administrator must confirm each; this page does not qualify or promise a reward.",
      benefitNotice:
        "Public eligibility criteria and full reward terms are still awaiting approval. No reward is currently being issued through this page.",
      faqTitle: "Frequently asked questions",
      faqs: [
        {
          question: "Who can take part?",
          answer:
            "Eligibility criteria have not yet been approved for publication, so we cannot confirm who qualifies. Please check back when the full terms are available.",
        },
        {
          question: "How do I refer a student?",
          answer:
            "Referral submissions are not open. Do not send student details through this website or by email; the collection notice and submission process must be approved first.",
        },
        {
          question: "Is the €170 reward guaranteed?",
          answer:
            "No. The roadmap states a fixed €170 amount, but that is not a guarantee of payment. An authorized administrator must separately confirm enrolment and reward qualification under approved terms.",
        },
        {
          question: "When will registration open?",
          answer:
            "There is no approved launch date. Registration will remain disabled until programme and privacy approvals are complete.",
        },
        {
          question: "Can I still ask about studying abroad?",
          answer:
            "Yes. The existing study enquiry and application routes remain available and separate from the referral programme.",
        },
      ],
      ctaTitle: "Interested in taking part?",
      ctaDescription:
        "Read the current status or contact our team with a general question. Registration and referral submissions are not available yet.",
      ctaJoin: "Check participation status",
      ctaContact: "Ask a general question",
      ctaLogin: "Log in",
      noCollectionNote:
        "This page does not collect participant or student information. Do not submit personal details until an approved collection notice and process are published.",
    },
    participant: {
      title: "Participant account",
      subtitle: "Protected access to your participant account.",
      ready: "Your participant account is ready.",
      unavailable: "The participant account is temporarily unavailable. Please try again later.",
    },
    recovery: {
      title: "Recover your account",
      resetTitle: "Reset your password",
      description: "Recover access to an existing account. Registration remains unavailable.",
      disabled:
        "Account recovery is not available here yet. Only approved local testing is enabled.",
      sent: "If recovery is available for this account, instructions will be sent. Check your email.",
      success: "Your password has been updated. Log in with your new password.",
      invalid: "This recovery link is invalid or expired. Request a new link.",
      unavailable: "Recovery could not be completed. Please try again or request a new link.",
      validation: "Use at least 6 characters, no more than 72 UTF-8 bytes, and matching passwords.",
      busy: "Please wait…",
      send: "Send recovery instructions",
      update: "Update password",
    },
    registration: {
      preview:
        "Registration preview only. These fields are disabled while the collection notice awaits approval. No account or student information is submitted.",
      confirmPassword: "Confirm password",
      submit: "Create account — not available yet",
    },
    landing: {
      eyebrow: "FranklyEdu Global",
      title: "Student Referral Programme",
      subtitle:
        "A clear overview of what is confirmed, what is still pending, and how to stay informed.",
      statusTitle: "Registration is not available yet",
      status:
        "Programme rules and the collection notice are awaiting final approval. No participant or student information is collected on this page.",
      privacyStatus:
        "Please contact FranklyEdu if you have questions while the programme information is being finalized.",
      join: "Join the programme",
      login: "Log in",
      contact: "Contact FranklyEdu",
    },
    authUnavailable: {
      signupTitle: "Registration is not available yet",
      loginTitle: "Login",
      description:
        "Registration and student-information collection remain unavailable while programme rules and the collection notice await final approval.",
      returnToProgramme: "Return to the referral programme",
    },
    authForm: {
      description:
        "Sign in with an existing programme account. Registration and student-information collection are not available.",
      email: "Email address",
      password: "Password",
      showPassword: "Show password",
      hidePassword: "Hide password",
      submit: "Log in",
      submitting: "Logging in…",
      signedIn: "You are signed in.",
      invalidCredentials: "Unable to log in. Check your details or try again later.",
      unavailable: "Login is temporarily unavailable. Please try again later.",
      signOut: "Log out",
    },
  },
  tr: {
    homePromo: {
      eyebrow: "Öğrenci Tavsiye Programı",
      title: "Daha bağlantılı bir eğitim yolculuğunu keşfedin",
      description:
        "Öğrencileri eğitim seçenekleriyle buluşturmaya yönelik programımızı inceleyin. Katılım henüz açık değil.",
      status: "Program ayrıntıları tamamlanıyor",
      cta: "Programı inceleyin",
      pause: "Duyuruyu duraklat",
      resume: "Duyuruyu sürdür",
    },
    publicPage: {
      journeyTitle: "Program nasıl şekilleniyor?",
      journeyIntro: "Katılımın nihai adımları hazırlanmaktadır. Şimdilik yapabilecekleriniz:",
      journey: [
        {
          title: "Bilgileri inceleyin",
          description:
            "Burada doğrulanmış bilgileri okuyun. Uygunluk ölçütleri ve program şartlarının tamamı henüz yayımlanmadı.",
        },
        {
          title: "Genel bir soru sorun",
          description:
            "Açıklama için FranklyEdu ile iletişime geçin. Lütfen potansiyel öğrencilerin kişisel bilgilerini göndermeyin.",
        },
        {
          title: "Onaylı katılım adımlarını bekleyin",
          description:
            "Program şartları ve veri toplama bildirimi onaylanana kadar kayıt ve tavsiye gönderimi kapalı kalacaktır.",
        },
      ],
      benefitTitle: "Ödül hakkında doğrulanmış bilgi",
      benefitAmount: "Program yol haritasında sabit 170 € tutar",
      benefitDetails:
        "Kayıt ve ödül uygunluğu ayrı kararlardır. Her biri yetkili bir yönetici tarafından doğrulanmalıdır; bu sayfa ödül onayı veya vaadi vermez.",
      benefitNotice:
        "Kamuya açık uygunluk ölçütleri ve ödül şartlarının tamamı onay bekliyor. Bu sayfadan şu anda ödül verilmemektedir.",
      faqTitle: "Sık sorulan sorular",
      faqs: [
        {
          question: "Kimler katılabilir?",
          answer:
            "Uygunluk ölçütleri henüz yayımlanmak üzere onaylanmadı; bu nedenle kimlerin uygun olduğunu doğrulayamıyoruz. Şartların tamamı yayımlandığında tekrar kontrol edin.",
        },
        {
          question: "Bir öğrenciyi nasıl tavsiye edebilirim?",
          answer:
            "Tavsiye gönderimleri açık değil. Veri toplama bildirimi ve gönderim süreci önce onaylanmalıdır; lütfen öğrenci bilgilerini bu site veya e-posta yoluyla göndermeyin.",
        },
        {
          question: "170 € ödül garanti mi?",
          answer:
            "Hayır. Yol haritasında sabit 170 € tutar belirtilmiştir; bu ödeme garantisi değildir. Onaylı şartlara göre kayıt ve ödül uygunluğunu yetkili bir yönetici ayrı ayrı doğrulamalıdır.",
        },
        {
          question: "Kayıt ne zaman açılacak?",
          answer:
            "Onaylanmış bir açılış tarihi yoktur. Program ve gizlilik onayları tamamlanana kadar kayıt kapalı kalacaktır.",
        },
        {
          question: "Yurt dışında eğitim hakkında yine de bilgi alabilir miyim?",
          answer:
            "Evet. Mevcut eğitim bilgi ve başvuru yolları kullanılabilir ve tavsiye programından ayrıdır.",
        },
      ],
      ctaTitle: "Katılmakla ilgileniyor musunuz?",
      ctaDescription:
        "Mevcut durumu inceleyin veya ekibimize genel bir soru sorun. Kayıt ve tavsiye gönderimleri henüz kullanılamıyor.",
      ctaJoin: "Katılım durumunu kontrol edin",
      ctaContact: "Genel bir soru sorun",
      ctaLogin: "Giriş yap",
      noCollectionNote:
        "Bu sayfa katılımcı veya öğrenci bilgisi toplamaz. Onaylı bir veri toplama bildirimi ve süreç yayımlanana kadar kişisel bilgi göndermeyin.",
    },
    participant: {
      title: "Katılımcı hesabı",
      subtitle: "Katılımcı hesabınıza korumalı erişim.",
      ready: "Katılımcı hesabınız hazır.",
      unavailable:
        "Katılımcı hesabı geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
    },
    recovery: {
      title: "Hesabınızı kurtarın",
      resetTitle: "Şifrenizi sıfırlayın",
      description: "Mevcut bir hesaba erişimi kurtarın. Kayıt hâlâ kullanılamaz.",
      disabled: "Hesap kurtarma burada henüz kullanılamıyor. Yalnızca onaylı yerel testler etkin.",
      sent: "Bu hesap için kurtarma kullanılabiliyorsa talimatlar gönderilecektir. E-postanızı kontrol edin.",
      success: "Şifreniz güncellendi. Yeni şifrenizle giriş yapın.",
      invalid: "Bu kurtarma bağlantısı geçersiz veya süresi dolmuş. Yeni bir bağlantı isteyin.",
      unavailable: "Kurtarma tamamlanamadı. Tekrar deneyin veya yeni bir bağlantı isteyin.",
      validation: "En az 6 karakter, en fazla 72 UTF-8 bayt ve eşleşen şifreler kullanın.",
      busy: "Lütfen bekleyin…",
      send: "Kurtarma talimatlarını gönder",
      update: "Şifreyi güncelle",
    },
    registration: {
      preview:
        "Yalnızca kayıt önizlemesi. Veri toplama bildirimi onay beklerken bu alanlar devre dışıdır. Hesap veya öğrenci bilgisi gönderilmez.",
      confirmPassword: "Şifreyi doğrula",
      submit: "Hesap oluştur — henüz kullanılamıyor",
    },
    landing: {
      eyebrow: "FranklyEdu Global",
      title: "Öğrenci Tavsiye Programı",
      subtitle:
        "Doğrulanan bilgileri, bekleyen konuları ve programdan nasıl haberdar olabileceğinizi keşfedin.",
      statusTitle: "Kayıt henüz kullanılamıyor",
      status:
        "Program kuralları ve veri toplama bildirimi son onayı bekliyor. Bu sayfada katılımcı veya öğrenci bilgisi toplanmaz.",
      privacyStatus:
        "Program bilgileri tamamlanırken sorularınız için lütfen FranklyEdu ile iletişime geçin.",
      join: "Programa katıl",
      login: "Giriş yap",
      contact: "FranklyEdu ile iletişim",
    },
    authUnavailable: {
      signupTitle: "Kayıt henüz kullanılamıyor",
      loginTitle: "Giriş yap",
      description:
        "Program kuralları ve veri toplama bildirimi son onayı beklerken kayıt ve öğrenci bilgisi toplama kullanılamaz.",
      returnToProgramme: "Tavsiye programına dön",
    },
    authForm: {
      description:
        "Mevcut bir program hesabıyla giriş yapın. Kayıt ve öğrenci bilgisi toplama kullanılamaz.",
      email: "E-posta adresi",
      password: "Şifre",
      showPassword: "Şifreyi göster",
      hidePassword: "Şifreyi gizle",
      submit: "Giriş yap",
      submitting: "Giriş yapılıyor…",
      signedIn: "Giriş yaptınız.",
      invalidCredentials: "Giriş yapılamadı. Bilgilerinizi kontrol edip tekrar deneyin.",
      unavailable: "Giriş geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
      signOut: "Çıkış yap",
    },
  },
  fr: {
    homePromo: {
      eyebrow: "Programme de recommandation d’étudiants",
      title: "Découvrez un parcours d’études plus connecté",
      description:
        "Découvrez notre programme pour mettre les étudiants en relation avec des possibilités d’études. La participation n’est pas encore ouverte.",
      status: "Les détails du programme sont en cours de finalisation",
      cta: "Découvrir le programme",
      pause: "Mettre l’annonce en pause",
      resume: "Reprendre l’annonce",
    },
    publicPage: {
      journeyTitle: "Comment le programme se met en place",
      journeyIntro:
        "Les étapes définitives de participation sont en préparation. Pour l’instant, vous pouvez :",
      journey: [
        {
          title: "Consulter les informations",
          description:
            "Lisez les éléments confirmés ici. Les critères d’admissibilité et les conditions complètes ne sont pas encore publiés.",
        },
        {
          title: "Poser une question générale",
          description:
            "Contactez FranklyEdu pour obtenir des précisions. N’envoyez pas les renseignements personnels d’étudiants potentiels.",
        },
        {
          title: "Attendre les étapes approuvées",
          description:
            "L’inscription et les recommandations resteront indisponibles tant que les conditions du programme et la notice de collecte ne seront pas approuvées.",
        },
      ],
      benefitTitle: "Ce qui est confirmé au sujet de la récompense",
      benefitAmount: "Montant fixe de 170 € indiqué dans la feuille de route",
      benefitDetails:
        "L’inscription et l’admissibilité à la récompense sont deux décisions distinctes. Un administrateur autorisé doit confirmer chacune ; cette page ne valide ni ne promet de récompense.",
      benefitNotice:
        "Les critères d’admissibilité publics et les conditions complètes de la récompense attendent encore leur approbation. Aucune récompense n’est actuellement versée depuis cette page.",
      faqTitle: "Questions fréquentes",
      faqs: [
        {
          question: "Qui peut participer ?",
          answer:
            "Les critères d’admissibilité n’ont pas encore été approuvés pour publication ; nous ne pouvons donc pas confirmer qui est admissible. Consultez à nouveau cette page lorsque les conditions complètes seront disponibles.",
        },
        {
          question: "Comment recommander un étudiant ?",
          answer:
            "Les recommandations ne sont pas ouvertes. La notice de collecte et le processus doivent d’abord être approuvés ; n’envoyez pas de renseignements sur un étudiant par ce site ou par e-mail.",
        },
        {
          question: "La récompense de 170 € est-elle garantie ?",
          answer:
            "Non. La feuille de route indique un montant fixe de 170 €, mais cela ne garantit pas un paiement. Un administrateur autorisé doit confirmer séparément l’inscription et l’admissibilité à la récompense selon les conditions approuvées.",
        },
        {
          question: "Quand les inscriptions ouvriront-elles ?",
          answer:
            "Aucune date de lancement n’a été approuvée. Les inscriptions resteront désactivées jusqu’à la fin des approbations du programme et de la confidentialité.",
        },
        {
          question: "Puis-je quand même poser une question sur les études à l’étranger ?",
          answer:
            "Oui. Les parcours existants de demande d’information et de candidature restent disponibles et sont distincts du programme de recommandation.",
        },
      ],
      ctaTitle: "Vous souhaitez participer ?",
      ctaDescription:
        "Consultez le statut actuel ou posez une question générale à notre équipe. L’inscription et l’envoi de recommandations ne sont pas encore disponibles.",
      ctaJoin: "Vérifier le statut de participation",
      ctaContact: "Poser une question générale",
      ctaLogin: "Se connecter",
      noCollectionNote:
        "Cette page ne recueille aucune information sur les participants ou les étudiants. N’envoyez pas de renseignements personnels avant la publication d’une notice et d’un processus de collecte approuvés.",
    },
    participant: {
      title: "Compte participant",
      subtitle: "Accès protégé à votre compte participant.",
      ready: "Votre compte participant est prêt.",
      unavailable:
        "Le compte participant est temporairement indisponible. Veuillez réessayer plus tard.",
    },
    recovery: {
      title: "Récupérer votre compte",
      resetTitle: "Réinitialiser votre mot de passe",
      description:
        "Récupérez l’accès à un compte existant. Les inscriptions restent indisponibles.",
      disabled:
        "La récupération n’est pas encore disponible ici. Seuls les tests locaux approuvés sont activés.",
      sent: "Si la récupération est disponible pour ce compte, des instructions seront envoyées. Consultez votre e-mail.",
      success: "Votre mot de passe a été modifié. Connectez-vous avec le nouveau mot de passe.",
      invalid: "Ce lien est invalide ou a expiré. Demandez un nouveau lien.",
      unavailable: "La récupération n’a pas pu aboutir. Réessayez ou demandez un nouveau lien.",
      validation:
        "Utilisez au moins 6 caractères, au plus 72 octets UTF-8 et des mots de passe identiques.",
      busy: "Veuillez patienter…",
      send: "Envoyer les instructions",
      update: "Modifier le mot de passe",
    },
    registration: {
      preview:
        "Aperçu de l’inscription uniquement. Ces champs sont désactivés en attendant l’approbation de la notice de collecte. Aucune information de compte ou d’étudiant n’est envoyée.",
      confirmPassword: "Confirmer le mot de passe",
      submit: "Créer un compte — pas encore disponible",
    },
    landing: {
      eyebrow: "FranklyEdu Global",
      title: "Programme de recommandation d’étudiants",
      subtitle:
        "Découvrez clairement ce qui est confirmé, ce qui reste en attente et comment rester informé.",
      statusTitle: "Les inscriptions ne sont pas encore ouvertes",
      status:
        "Le règlement du programme et la notice de collecte attendent leur approbation finale. Aucune information sur les participants ou les étudiants n’est recueillie sur cette page.",
      privacyStatus:
        "Veuillez contacter FranklyEdu si vous avez des questions pendant la finalisation des informations du programme.",
      join: "Rejoindre le programme",
      login: "Se connecter",
      contact: "Contacter FranklyEdu",
    },
    authUnavailable: {
      signupTitle: "Les inscriptions ne sont pas encore ouvertes",
      loginTitle: "Connexion",
      description:
        "Les inscriptions et la collecte d’informations sur les étudiants restent indisponibles pendant l’approbation du règlement et de la notice de collecte.",
      returnToProgramme: "Retour au programme de recommandation",
    },
    authForm: {
      description:
        "Connectez-vous avec un compte existant du programme. Les inscriptions et la collecte d’informations sur les étudiants ne sont pas disponibles.",
      email: "Adresse e-mail",
      password: "Mot de passe",
      showPassword: "Afficher le mot de passe",
      hidePassword: "Masquer le mot de passe",
      submit: "Se connecter",
      submitting: "Connexion…",
      signedIn: "Vous êtes connecté.",
      invalidCredentials: "Connexion impossible. Vérifiez vos informations ou réessayez plus tard.",
      unavailable: "La connexion est temporairement indisponible. Veuillez réessayer plus tard.",
      signOut: "Se déconnecter",
    },
  },
  sw: {
    homePromo: {
      eyebrow: "Mpango wa Rufaa wa Wanafunzi",
      title: "Gundua safari ya masomo yenye muunganiko zaidi",
      description:
        "Fahamu kuhusu mpango wetu wa kuwaunganisha wanafunzi na chaguo za masomo. Ushiriki bado haujafunguliwa.",
      status: "Maelezo ya mpango yanakamilishwa",
      cta: "Fahamu kuhusu mpango",
      pause: "Sitisha tangazo",
      resume: "Endelea na tangazo",
    },
    publicPage: {
      journeyTitle: "Mpango unaandaliwaje?",
      journeyIntro: "Hatua za mwisho za ushiriki bado zinaandaliwa. Kwa sasa, unaweza:",
      journey: [
        {
          title: "Soma taarifa",
          description:
            "Soma taarifa zilizothibitishwa hapa. Vigezo vya kustahiki na masharti kamili ya mpango bado hayajachapishwa.",
        },
        {
          title: "Uliza swali la jumla",
          description:
            "Wasiliana na FranklyEdu kwa ufafanuzi. Tafadhali usitume taarifa binafsi za wanafunzi watarajiwa.",
        },
        {
          title: "Subiri hatua zilizoidhinishwa",
          description:
            "Usajili na uwasilishaji wa rufaa vitaendelea kutopatikana hadi masharti ya mpango na notisi ya ukusanyaji yaidhinishwe.",
        },
      ],
      benefitTitle: "Yaliyothibitishwa kuhusu zawadi",
      benefitAmount: "Kiasi kisichobadilika cha €170 katika ramani ya mpango",
      benefitDetails:
        "Uandikishaji na kustahiki zawadi ni maamuzi tofauti. Msimamizi aliyeidhinishwa lazima athibitishe kila moja; ukurasa huu hauidhinishi wala kuahidi zawadi.",
      benefitNotice:
        "Vigezo vya kustahiki kwa umma na masharti kamili ya zawadi bado yanasubiri idhini. Hakuna zawadi inayotolewa kupitia ukurasa huu kwa sasa.",
      faqTitle: "Maswali yanayoulizwa mara kwa mara",
      faqs: [
        {
          question: "Nani anaweza kushiriki?",
          answer:
            "Vigezo vya kustahiki bado havijaidhinishwa kuchapishwa, kwa hiyo hatuwezi kuthibitisha nani anastahiki. Angalia tena masharti kamili yatakapopatikana.",
        },
        {
          question: "Ninawezaje kumrejelea mwanafunzi?",
          answer:
            "Uwasilishaji wa rufaa haujafunguliwa. Notisi ya ukusanyaji na utaratibu lazima viidhinishwe kwanza; usitume taarifa za mwanafunzi kupitia tovuti hii au barua pepe.",
        },
        {
          question: "Je, zawadi ya €170 imehakikishwa?",
          answer:
            "Hapana. Ramani ya mpango inataja kiasi kisichobadilika cha €170, lakini hiki si ahadi ya malipo. Msimamizi aliyeidhinishwa lazima athibitishe kando uandikishaji na kustahiki zawadi chini ya masharti yaliyoidhinishwa.",
        },
        {
          question: "Usajili utafunguliwa lini?",
          answer:
            "Hakuna tarehe ya uzinduzi iliyoidhinishwa. Usajili utaendelea kuzimwa hadi idhini za mpango na faragha zikamilike.",
        },
        {
          question: "Bado ninaweza kuuliza kuhusu kusoma nje ya nchi?",
          answer:
            "Ndiyo. Njia zilizopo za kuulizia masomo na kutuma maombi zinaendelea kupatikana na ni tofauti na mpango wa rufaa.",
        },
      ],
      ctaTitle: "Ungependa kushiriki?",
      ctaDescription:
        "Angalia hali ya sasa au uliza timu yetu swali la jumla. Usajili na uwasilishaji wa rufaa bado haupatikani.",
      ctaJoin: "Angalia hali ya ushiriki",
      ctaContact: "Uliza swali la jumla",
      ctaLogin: "Ingia",
      noCollectionNote:
        "Ukurasa huu haukusanyi taarifa za washiriki au wanafunzi. Usitume taarifa binafsi kabla notisi na utaratibu ulioidhinishwa wa ukusanyaji haujachapishwa.",
    },
    participant: {
      title: "Akaunti ya mshiriki",
      subtitle: "Ufikiaji salama wa akaunti yako ya mshiriki.",
      ready: "Akaunti yako ya mshiriki iko tayari.",
      unavailable: "Akaunti ya mshiriki haipatikani kwa sasa. Tafadhali jaribu tena baadaye.",
    },
    recovery: {
      title: "Rejesha akaunti yako",
      resetTitle: "Weka upya nenosiri",
      description: "Rejesha ufikiaji wa akaunti iliyopo. Usajili bado haupatikani.",
      disabled:
        "Urejeshaji wa akaunti bado haupatikani hapa. Majaribio ya ndani yaliyoidhinishwa pekee yamewezeshwa.",
      sent: "Ikiwa urejeshaji unapatikana kwa akaunti hii, maelekezo yatatumwa. Angalia barua pepe yako.",
      success: "Nenosiri lako limebadilishwa. Ingia kwa nenosiri jipya.",
      invalid: "Kiungo hiki si halali au kimeisha muda. Omba kiungo kipya.",
      unavailable: "Urejeshaji haujakamilika. Jaribu tena au omba kiungo kipya.",
      validation:
        "Tumia angalau herufi 6, si zaidi ya baiti 72 za UTF-8, na manenosiri yanayolingana.",
      busy: "Tafadhali subiri…",
      send: "Tuma maelekezo ya urejeshaji",
      update: "Badilisha nenosiri",
    },
    registration: {
      preview:
        "Hakikisho la usajili tu. Sehemu hizi zimezimwa wakati notisi ya ukusanyaji inasubiri idhini. Hakuna taarifa za akaunti au mwanafunzi zinazotumwa.",
      confirmPassword: "Thibitisha nenosiri",
      submit: "Fungua akaunti — bado haipatikani",
    },
    landing: {
      eyebrow: "FranklyEdu Global",
      title: "Mpango wa Rufaa wa Wanafunzi",
      subtitle:
        "Pata muhtasari wazi wa yaliyothibitishwa, yanayosubiri na jinsi ya kupata taarifa mpya.",
      statusTitle: "Usajili bado haupatikani",
      status:
        "Kanuni za mpango na notisi ya ukusanyaji taarifa zinasubiri idhini ya mwisho. Hakuna taarifa za mshiriki au mwanafunzi zinazokusanywa kwenye ukurasa huu.",
      privacyStatus:
        "Tafadhali wasiliana na FranklyEdu ukiwa na maswali wakati taarifa za mpango zinakamilishwa.",
      join: "Jiunge na mpango",
      login: "Ingia",
      contact: "Wasiliana na FranklyEdu",
    },
    authUnavailable: {
      signupTitle: "Usajili bado haupatikani",
      loginTitle: "Ingia",
      description:
        "Usajili na ukusanyaji wa taarifa za wanafunzi bado haupatikani wakati kanuni za mpango na notisi ya ukusanyaji zinasubiri idhini ya mwisho.",
      returnToProgramme: "Rudi kwenye mpango wa rufaa",
    },
    authForm: {
      description:
        "Ingia kwa kutumia akaunti iliyopo ya mpango. Usajili na ukusanyaji wa taarifa za wanafunzi haupatikani.",
      email: "Anwani ya barua pepe",
      password: "Nenosiri",
      showPassword: "Onyesha nenosiri",
      hidePassword: "Ficha nenosiri",
      submit: "Ingia",
      submitting: "Inaingia…",
      signedIn: "Umeingia.",
      invalidCredentials: "Imeshindwa kuingia. Kagua maelezo yako au ujaribu tena baadaye.",
      unavailable: "Kuingia hakupatikani kwa muda. Tafadhali jaribu tena baadaye.",
      signOut: "Toka",
    },
  },
};
