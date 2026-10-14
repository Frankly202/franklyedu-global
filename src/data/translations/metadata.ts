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
      title: "About",
      description:
        "Frankedu Global shares information about study options, property, and digital services. Contact us to ask what is currently available.",
    },
    "/courses": {
      title: "Courses",
      description:
        "Ask about study options by field, level, and university. Programme listings are published after details are confirmed.",
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
        "No current scholarship details are published. Contact us to ask about information confirmed by the institution.",
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
    "/contact": {
      title: "Contact",
      description:
        "Contact Frankedu Global by WhatsApp or email about study information, property listings, or digital services.",
    },
    "/application": {
      title: "Start Your Application",
      description:
        "A guided, step-by-step application form for your chosen university and programme.",
    },
    "/student": {
      title: "Student Dashboard",
      description: "Track your applications, saved universities and document checklist.",
    },
    "/login": {
      title: "Student Login",
      description: "Secure sign-in for the Frankedu Global student portal.",
    },
    "/signup": {
      title: "Create Your Account",
      description: "Create a Frankedu Global account to begin your student journey.",
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
      title: "Hakkımızda",
      description:
        "Frankedu Global eğitim seçenekleri, gayrimenkul ve dijital hizmetler hakkında bilgi paylaşır. Güncel seçenekleri sormak için bize ulaşın.",
    },
    "/courses": {
      title: "Programlar",
      description:
        "Eğitim alanı, seviyesi ve üniversiteye göre seçenekleri sorun. Program listeleri ayrıntıları doğrulandıktan sonra yayımlanır.",
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
        "Güncel burs bilgisi yayımlanmamıştır. Kurum tarafından teyit edilen ayrıntıları sormak için bize ulaşın.",
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
    "/contact": {
      title: "İletişim",
      description:
        "Eğitim bilgileri, gayrimenkul ilanları veya dijital hizmetler hakkında Frankedu Global'e WhatsApp ya da e-posta ile ulaşın.",
    },
    "/application": {
      title: "Başvurunuzu Başlatın",
      description: "Seçtiğiniz üniversite ve program için adım adım başvuru formu.",
    },
    "/student": {
      title: "Öğrenci Paneli",
      description: "Başvurularınızı, kayıtlı üniversitelerinizi ve belge listenizi görüntüleyin.",
    },
    "/login": {
      title: "Öğrenci Girişi",
      description: "Frankedu Global öğrenci portalı giriş sayfası.",
    },
    "/signup": {
      title: "Hesap Oluşturun",
      description: "Öğrenci yolculuğunuza başlamak için Frankedu Global hesabı oluşturun.",
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
      title: "À propos",
      description:
        "Frankedu Global partage des informations sur les études, l’immobilier et les services numériques. Contactez-nous pour connaître les options actuelles.",
    },
    "/courses": {
      title: "Formations",
      description:
        "Renseignez-vous sur les possibilités par domaine, niveau et université. Les formations sont publiées après confirmation de leurs informations.",
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
        "Aucune information actuelle sur les bourses n’est publiée. Contactez-nous pour demander des détails confirmés par l’établissement.",
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
    "/contact": {
      title: "Contact",
      description:
        "Contactez Frankedu Global sur WhatsApp ou par e-mail au sujet des études, des annonces immobilières ou des services numériques.",
    },
    "/application": {
      title: "Commencer votre candidature",
      description: "Un formulaire guidé pour votre université et votre formation.",
    },
    "/student": {
      title: "Espace étudiant",
      description: "Suivez vos candidatures, universités enregistrées et documents à préparer.",
    },
    "/login": {
      title: "Connexion étudiant",
      description: "Page de connexion au portail étudiant Frankedu Global.",
    },
    "/signup": {
      title: "Créer votre compte",
      description: "Créez un compte Frankedu Global pour commencer votre parcours étudiant.",
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
      title: "Kuhusu",
      description:
        "Frankedu Global hushiriki taarifa kuhusu masomo, mali na huduma za kidijitali. Wasiliana nasi kuuliza chaguo zilizopo sasa.",
    },
    "/courses": {
      title: "Programu za masomo",
      description:
        "Ulizia chaguo za masomo kulingana na eneo, kiwango na chuo kikuu. Programu huchapishwa baada ya maelezo yake kuthibitishwa.",
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
        "Hakuna taarifa za sasa za ufadhili zilizochapishwa. Wasiliana nasi kuuliza kuhusu maelezo yaliyothibitishwa na taasisi.",
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
    "/contact": {
      title: "Mawasiliano",
      description:
        "Wasiliana na Frankedu Global kupitia WhatsApp au barua pepe kuhusu masomo, matangazo ya mali au huduma za kidijitali.",
    },
    "/application": {
      title: "Anza maombi yako",
      description: "Fomu ya hatua kwa hatua ya kuomba chuo na programu uliyochagua.",
    },
    "/student": {
      title: "Dashibodi ya mwanafunzi",
      description: "Fuatilia maombi yako, vyuo ulivyohifadhi na orodha ya nyaraka.",
    },
    "/login": {
      title: "Kuingia kwa mwanafunzi",
      description: "Ukurasa wa kuingia kwenye tovuti ya wanafunzi ya Frankedu Global.",
    },
    "/signup": {
      title: "Fungua akaunti",
      description: "Fungua akaunti ya Frankedu Global ili kuanza safari yako ya masomo.",
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
