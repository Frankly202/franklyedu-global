import type { Locale } from "@/lib/locale";
import { propertyDetails } from "@/data/content";
import { localizeText } from "./localize";

type RouteMetadata = { title: string; description: string };

const metadata: Record<Locale, Record<string, RouteMetadata>> = {
  en: {
    "/": {
      title: "Your Future. Global Opportunities. | Frankedu Global",
      description:
        "Ask Frankedu Global about study information, property listings, and digital services.",
    },
    "/about": {
      title: "About and Contact",
      description:
        "Learn about Frankedu Global and contact us about study information, property listings, or digital services.",
    },
    "/courses": {
      title: "Courses",
      description:
        "Browse source-linked programme records and clearly labelled university catalogue examples. Confirm current availability, fees and requirements with the university.",
    },
    "/universities": {
      title: "Universities",
      description:
        "Browse institution names and locations. Final International University (FIU) is the only confirmed recruitment relationship.",
    },
    "/countries": {
      title: "Study Destinations",
      description:
        "Browse study destinations and contact us to ask about current programmes, fees, and dates.",
    },
    "/scholarships": {
      title: "Scholarships",
      description:
        "Browse university scholarship information by verification status. Unconfirmed listings are not offers of open awards; confirm current terms with each institution.",
    },
    "/services": {
      title: "Student Services",
      description:
        "Ask about study information, property details, or digital services. Scope and availability are confirmed per enquiry.",
    },
    "/marketplace": {
      title: "Housing and Property Information",
      description:
        "No marketplace listings are currently published. Contact us to ask about current options.",
    },
    "/accommodation": {
      title: "Student Accommodation",
      description:
        "No accommodation listings are currently published. Contact us to ask about current information.",
    },
    "/real-estate": {
      title: "Property Information",
      description: "View a property listing and contact us to ask about current details.",
    },
    "/application": {
      title: "Start Your Application",
      description:
        "A guided, step-by-step application form for your chosen university and programme.",
    },
    "/referrals": {
      title: "Student Referral Programme | Frankedu Global",
      description:
        "Information about the FranklyEdu Global Student Referral Programme; registration is not yet available.",
    },
    "/student": {
      title: "Student Dashboard",
      description: "Track your applications, saved universities and document checklist.",
    },
    "/login": {
      title: "Referral Programme Login",
      description:
        "Sign in with an existing account for the FranklyEdu Global Student Referral Programme. Registration remains unavailable.",
    },
    "/signup": {
      title: "Referral Programme Registration",
      description:
        "Registration for the FranklyEdu Global Student Referral Programme is not yet available.",
    },
    "/referrals/recovery": {
      title: "Recover a Referral Programme Account | Frankedu Global",
      description: "Password recovery for existing programme accounts is not available yet.",
    },
    "/referrals/recovery/reset": {
      title: "Reset a Referral Programme Password | Frankedu Global",
      description: "Password reset for referral programme accounts is not available yet.",
    },
    "/participant": {
      title: "Participant Dashboard | Frankedu Global",
      description: "Protected participant overview for referral programme accounts.",
    },
    "/participant/refer": {
      title: "Refer a Student | Frankedu Global",
      description:
        "Protected referral submission page. Student-information collection remains unavailable.",
    },
    property: {
      title: "Property Listing | Frankedu Global",
      description: "View property details and contact Frankedu Global for further information.",
    },
  },
  tr: {
    "/": {
      title: "Geleceğiniz. Küresel Fırsatlar. | Frankedu Global",
      description:
        "Frankedu Global ile eğitim bilgileri, gayrimenkul ilanları ve dijital hizmetler hakkında görüşün.",
    },
    "/about": {
      title: "Hakkımızda ve İletişim",
      description:
        "Frankedu Global hakkında bilgi alın; eğitim, gayrimenkul ve dijital hizmetler için bizimle iletişime geçin.",
    },
    "/courses": {
      title: "Programlar",
      description:
        "Kaynak bağlantılı program kayıtlarını ve açıkça etiketlenmiş üniversite katalog örneklerini inceleyin. Güncel uygunluğu, ücretleri ve koşulları üniversiteyle teyit edin.",
    },
    "/universities": {
      title: "Üniversiteler",
      description:
        "Kurum adlarını ve konumlarını inceleyin. Final International University (FIU), doğrulanmış tek öğrenci alım ilişkimizdir.",
    },
    "/countries": {
      title: "Eğitim Destinasyonları",
      description: "Eğitim ülkelerine göz atın ve güncel program, ücret ve tarihleri sorun.",
    },
    "/scholarships": {
      title: "Burslar",
      description:
        "Üniversite burs bilgilerini doğrulama durumuna göre inceleyin. Teyit edilmemiş kayıtlar açık burs teklifi değildir; güncel koşulları her kurumla teyit edin.",
    },
    "/services": {
      title: "Öğrenci Hizmetleri",
      description:
        "Eğitim bilgileri, gayrimenkul ayrıntıları veya dijital hizmetleri sorun. Kapsam ve uygunluk talebe göre teyit edilir.",
    },
    "/marketplace": {
      title: "Konaklama ve Gayrimenkul Bilgileri",
      description:
        "Şu anda pazar yeri ilanı yayımlanmamıştır. Güncel seçenekleri sormak için bize ulaşın.",
    },
    "/accommodation": {
      title: "Öğrenci Konaklaması",
      description:
        "Şu anda konaklama ilanı yayımlanmamıştır. Güncel bilgiyi sormak için bize ulaşın.",
    },
    "/real-estate": {
      title: "Gayrimenkul Bilgileri",
      description: "Bir gayrimenkul ilanını görüntüleyin ve güncel ayrıntıları sorun.",
    },
    "/application": {
      title: "Başvurunuzu Başlatın",
      description: "Seçtiğiniz üniversite ve program için adım adım başvuru formu.",
    },
    "/referrals": {
      title: "Öğrenci Tavsiye Programı | Frankedu Global",
      description: "FranklyEdu Global Öğrenci Tavsiye Programı bilgileri; kayıt henüz açık değil.",
    },
    "/student": {
      title: "Öğrenci Paneli",
      description: "Başvurularınızı, kayıtlı üniversitelerinizi ve belge listenizi görüntüleyin.",
    },
    "/login": {
      title: "Tavsiye Programı Girişi",
      description:
        "FranklyEdu Global Öğrenci Tavsiye Programı için mevcut hesabınızla giriş yapın. Yeni kayıtlar hâlâ kullanılamıyor.",
    },
    "/signup": {
      title: "Tavsiye Programı Kaydı",
      description: "FranklyEdu Global Öğrenci Tavsiye Programı kaydı henüz kullanılamıyor.",
    },
    "/referrals/recovery": {
      title: "Tavsiye Programı Hesabını Kurtarın | Frankedu Global",
      description: "Mevcut program hesapları için şifre kurtarma henüz kullanılamıyor.",
    },
    "/referrals/recovery/reset": {
      title: "Tavsiye Programı Şifresini Sıfırlayın | Frankedu Global",
      description: "Tavsiye programı hesapları için şifre sıfırlama henüz kullanılamıyor.",
    },
    "/participant": {
      title: "Katılımcı Paneli | Frankedu Global",
      description: "Tavsiye programı hesapları için korumalı katılımcı özeti.",
    },
    "/participant/refer": {
      title: "Bir Öğrenciyi Tavsiye Edin | Frankedu Global",
      description:
        "Korumalı tavsiye gönderim sayfası. Öğrenci bilgisi toplama henüz kullanılamıyor.",
    },
    property: {
      title: "Gayrimenkul İlanı | Frankedu Global",
      description: "Gayrimenkul ayrıntılarını inceleyin ve bilgi için Frankedu Global'e ulaşın.",
    },
  },
  fr: {
    "/": {
      title: "Votre avenir. Des possibilités internationales. | Frankedu Global",
      description:
        "Contactez Frankedu Global pour parler d’informations sur les études, d’annonces immobilières et de services numériques.",
    },
    "/about": {
      title: "À propos et contact",
      description:
        "Découvrez Frankedu Global et contactez-nous au sujet des études, des annonces immobilières ou des services numériques.",
    },
    "/courses": {
      title: "Formations",
      description:
        "Consultez les fiches de formations avec leurs sources et les exemples des catalogues universitaires clairement identifiés. Confirmez la disponibilité, les frais et les conditions actuels auprès de l’université.",
    },
    "/universities": {
      title: "Universités",
      description:
        "Consultez les noms et lieux des établissements. Final International University (FIU) est le seul partenariat de recrutement confirmé.",
    },
    "/countries": {
      title: "Destinations d’études",
      description:
        "Consultez les destinations d’études et contactez-nous pour connaître les programmes, frais et dates actuels.",
    },
    "/scholarships": {
      title: "Bourses",
      description:
        "Consultez les informations sur les bourses par statut de vérification. Les fiches non confirmées ne sont pas des offres ouvertes ; confirmez les conditions actuelles auprès de chaque établissement.",
    },
    "/services": {
      title: "Services étudiants",
      description:
        "Renseignez-vous sur les études, l’immobilier ou les services numériques. La portée et la disponibilité sont confirmées au cas par cas.",
    },
    "/marketplace": {
      title: "Informations sur le logement et l’immobilier",
      description:
        "Aucune annonce du marché n’est publiée actuellement. Contactez-nous pour connaître les options actuelles.",
    },
    "/accommodation": {
      title: "Logement étudiant",
      description:
        "Aucune annonce de logement n’est publiée actuellement. Contactez-nous pour obtenir des informations.",
    },
    "/real-estate": {
      title: "Informations immobilières",
      description:
        "Consultez une annonce immobilière et contactez-nous pour connaître les détails actuels.",
    },
    "/application": {
      title: "Commencer votre candidature",
      description: "Un formulaire guidé pour votre université et votre formation.",
    },
    "/referrals": {
      title: "Programme de recommandation d’étudiants | Frankedu Global",
      description:
        "Informations sur le programme de recommandation d’étudiants FranklyEdu Global ; les inscriptions ne sont pas encore ouvertes.",
    },
    "/student": {
      title: "Espace étudiant",
      description: "Suivez vos candidatures, universités enregistrées et documents à préparer.",
    },
    "/login": {
      title: "Connexion au programme de recommandation",
      description:
        "Connectez-vous avec un compte existant au programme de recommandation FranklyEdu Global. Les inscriptions restent indisponibles.",
    },
    "/signup": {
      title: "Inscription au programme de recommandation",
      description:
        "L’inscription au programme de recommandation d’étudiants FranklyEdu Global n’est pas encore disponible.",
    },
    "/referrals/recovery": {
      title: "Récupérer un compte de recommandation | Frankedu Global",
      description:
        "La récupération des comptes existants du programme n’est pas encore disponible.",
    },
    "/referrals/recovery/reset": {
      title: "Réinitialiser un mot de passe de recommandation | Frankedu Global",
      description:
        "La réinitialisation des mots de passe du programme n’est pas encore disponible.",
    },
    "/participant": {
      title: "Tableau de bord participant | Frankedu Global",
      description: "Vue participant protégée pour les comptes du programme de recommandation.",
    },
    "/participant/refer": {
      title: "Recommander un étudiant | Frankedu Global",
      description:
        "Page protégée de recommandation. La collecte d’informations sur les étudiants reste indisponible.",
    },
    property: {
      title: "Annonce immobilière | Frankedu Global",
      description:
        "Consultez les détails du bien et contactez Frankedu Global pour en savoir plus.",
    },
  },
  sw: {
    "/": {
      title: "Frankedu Global | Taarifa za Masomo na Mali",
      description:
        "Wasiliana na Frankedu Global kuhusu masomo, matangazo ya mali na huduma za kidijitali.",
    },
    "/about": {
      title: "Kuhusu na Mawasiliano",
      description:
        "Fahamu kuhusu Frankedu Global na uwasiliane nasi kuhusu masomo, matangazo ya mali au huduma za kidijitali.",
    },
    "/courses": {
      title: "Programu za masomo",
      description:
        "Angalia rekodi za programu zenye viungo vya vyanzo na mifano ya katalogi za vyuo vikuu iliyowekwa alama wazi. Thibitisha upatikanaji wa sasa, ada na mahitaji na chuo kikuu.",
    },
    "/universities": {
      title: "Vyuo vikuu",
      description:
        "Angalia majina na maeneo ya taasisi. Final International University (FIU) ndiyo uhusiano pekee wa udahili uliothibitishwa.",
    },
    "/countries": {
      title: "Nchi za masomo",
      description:
        "Angalia nchi za masomo na uwasiliane nasi kuuliza kuhusu programu, ada na tarehe za sasa.",
    },
    "/scholarships": {
      title: "Ufadhili wa masomo",
      description:
        "Angalia taarifa za ufadhili wa vyuo kulingana na hali ya uthibitisho. Matangazo yasiyothibitishwa si ofa zilizo wazi; thibitisha masharti ya sasa na kila taasisi.",
    },
    "/services": {
      title: "Huduma za wanafunzi",
      description:
        "Uliza kuhusu taarifa za masomo, mali au huduma za kidijitali. Wigo na upatikanaji huthibitishwa kwa kila ombi.",
    },
    "/marketplace": {
      title: "Taarifa za Malazi na Mali",
      description:
        "Hakuna matangazo ya soko yaliyochapishwa sasa. Wasiliana nasi kuuliza kuhusu chaguo zilizopo.",
    },
    "/accommodation": {
      title: "Malazi ya wanafunzi",
      description:
        "Hakuna matangazo ya malazi yaliyochapishwa sasa. Wasiliana nasi kuuliza kuhusu taarifa za sasa.",
    },
    "/real-estate": {
      title: "Taarifa za Mali",
      description: "Tazama tangazo la mali na uwasiliane nasi kuuliza kuhusu maelezo ya sasa.",
    },
    "/application": {
      title: "Anza maombi yako",
      description: "Fomu ya hatua kwa hatua ya kuomba chuo na programu uliyochagua.",
    },
    "/referrals": {
      title: "Mpango wa Rufaa wa Wanafunzi | Frankedu Global",
      description:
        "Taarifa kuhusu Mpango wa Rufaa wa Wanafunzi wa FranklyEdu Global; usajili bado haupatikani.",
    },
    "/student": {
      title: "Dashibodi ya mwanafunzi",
      description: "Fuatilia maombi yako, vyuo ulivyohifadhi na orodha ya nyaraka.",
    },
    "/login": {
      title: "Kuingia kwenye mpango wa rufaa",
      description:
        "Ingia kwa kutumia akaunti iliyopo ya Mpango wa Rufaa wa Wanafunzi wa FranklyEdu Global. Usajili bado haupatikani.",
    },
    "/signup": {
      title: "Usajili wa mpango wa rufaa",
      description: "Usajili wa Mpango wa Rufaa wa Wanafunzi wa FranklyEdu Global bado haupatikani.",
    },
    "/referrals/recovery": {
      title: "Rejesha akaunti ya mpango wa rufaa | Frankedu Global",
      description: "Urejeshaji wa akaunti zilizopo za mpango bado haupatikani.",
    },
    "/referrals/recovery/reset": {
      title: "Weka upya nenosiri la mpango wa rufaa | Frankedu Global",
      description: "Uwekaji upya wa nenosiri la akaunti za mpango bado haupatikani.",
    },
    "/participant": {
      title: "Dashibodi ya mshiriki | Frankedu Global",
      description: "Muhtasari salama wa mshiriki kwa akaunti za mpango wa rufaa.",
    },
    "/participant/refer": {
      title: "Mrejelee mwanafunzi | Frankedu Global",
      description:
        "Ukurasa salama wa kutuma rufaa. Ukusanyaji wa taarifa za wanafunzi bado haupatikani.",
    },
    property: {
      title: "Tangazo la mali | Frankedu Global",
      description: "Tazama maelezo ya mali na uwasiliane na Frankedu Global kupata taarifa zaidi.",
    },
  },
};

export function getLocalizedRouteMetadata(locale: Locale, pathname: string): RouteMetadata {
  if (pathname.startsWith("/real-estate/")) {
    const slug = pathname.slice("/real-estate/".length);
    const property = propertyDetails.find((listing) => listing.slug === slug);
    if (property) {
      return {
        title: localizeText(locale, property.seoTitle),
        description: localizeText(locale, property.seoDescription),
      };
    }
  }
  const route = pathname.startsWith("/real-estate/") ? "property" : pathname;
  return metadata[locale][route] ?? metadata[locale]["/"]!;
}
