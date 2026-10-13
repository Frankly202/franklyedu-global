import type { Locale } from "@/lib/locale";
import { propertyDetails } from "@/data/content";
import { localizeText } from "./localize";

type RouteMetadata = { title: string; description: string };

const metadata: Record<Locale, Record<string, RouteMetadata>> = {
  en: {
    "/": {
      title: "Your Future. Global Opportunities. | Frankedu Global",
      description:
        "We help students, families, and investors explore study options, property information, and professional services.",
    },
    "/about": {
      title: "About",
      description:
        "Frankedu Global provides guidance on studying abroad and international opportunities for students and investors.",
    },
    "/courses": {
      title: "Courses",
      description:
        "Compare English-taught programmes by level, subject and university, with duration, tuition and intake.",
    },
    "/universities": {
      title: "Universities",
      description:
        "Explore university options by destination and subject. Contact us for current tuition, intake and scholarship information.",
    },
    "/countries": {
      title: "Study Destinations",
      description:
        "Compare study destinations by intakes, tuition ranges and post-study opportunities.",
    },
    "/scholarships": {
      title: "Scholarships",
      description:
        "Find scholarship information for eligible students at Final International University (FIU). Contact us for current details.",
    },
    "/services": {
      title: "Student Services",
      description:
        "Intake planning, admissions, visa, dependent and application support — explained step by step.",
    },
    "/marketplace": {
      title: "Student Marketplace",
      description: "Accommodation, real estate, essentials and services for students settling in.",
    },
    "/accommodation": {
      title: "Student Accommodation",
      description: "Dormitories, shared flats, private apartments and homestays near campus.",
    },
    "/real-estate": {
      title: "Real Estate & Property Investment",
      description:
        "Property acquisition and investment opportunities across North Cyprus, the UK, and selected Dubai/UAE markets.",
    },
    "/contact": {
      title: "Contact",
      description: "Message Frankedu Global on WhatsApp or email to plan your study pathway.",
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
        "Öğrencilere, ailelere ve yatırımcılara eğitim seçenekleri, gayrimenkul bilgileri ve profesyonel hizmetler hakkında rehberlik sunuyoruz.",
    },
    "/about": {
      title: "Hakkımızda",
      description:
        "Frankedu Global, yurtdışında eğitim ve küresel fırsatlar için şeffaf danışmanlık sunar.",
    },
    "/courses": {
      title: "Programlar",
      description: "İngilizce programları seviyeye, alana ve üniversiteye göre karşılaştırın.",
    },
    "/universities": {
      title: "Üniversiteler",
      description:
        "Üniversite seçeneklerini ülkeye ve alana göre inceleyin. Güncel ücret ve kabul bilgileri için bizimle iletişime geçin.",
    },
    "/countries": {
      title: "Eğitim Destinasyonları",
      description: "Eğitim ülkelerini kayıt dönemleri ve öğrenim ücretlerine göre karşılaştırın.",
    },
    "/scholarships": {
      title: "Burslar",
      description:
        "Final International University (FIU) burs bilgilerini inceleyin. Güncel uygunluk ve ödül ayrıntıları için bizimle iletişime geçin.",
    },
    "/services": {
      title: "Öğrenci Hizmetleri",
      description: "Kayıt dönemi planlama, kabul, vize ve başvuru desteği.",
    },
    "/marketplace": {
      title: "Öğrenci Pazaryeri",
      description: "Öğrenciler için konaklama, gayrimenkul, temel ihtiyaçlar ve hizmetler.",
    },
    "/accommodation": {
      title: "Öğrenci Konaklaması",
      description: "Kampüs yakınında yurt, paylaşımlı daire, özel daire ve aile yanı konaklama.",
    },
    "/real-estate": {
      title: "Gayrimenkul ve Yatırım",
      description:
        "Kuzey Kıbrıs, Birleşik Krallık ve seçili Dubai/BAE pazarlarında gayrimenkul fırsatları.",
    },
    "/contact": {
      title: "İletişim",
      description:
        "Eğitim planınızı konuşmak için Frankedu Global'e WhatsApp veya e-posta ile ulaşın.",
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
        "Nous vous accompagnons vers des possibilités internationales d’études, d’immobilier et de services professionnels.",
    },
    "/about": {
      title: "À propos",
      description:
        "Frankedu Global conseille les étudiants et investisseurs sur les études à l’étranger et les possibilités internationales.",
    },
    "/courses": {
      title: "Formations",
      description: "Comparez les formations en anglais par niveau, domaine et université.",
    },
    "/universities": {
      title: "Universités",
      description:
        "Découvrez les options universitaires par destination et domaine. Contactez-nous pour obtenir les informations à jour sur les frais et les admissions.",
    },
    "/countries": {
      title: "Destinations d’études",
      description:
        "Comparez les destinations selon les admissions, les frais et les possibilités après les études.",
    },
    "/scholarships": {
      title: "Bourses",
      description:
        "Consultez les informations sur les bourses à Final International University (FIU). Contactez-nous pour connaître les critères et les montants actuels.",
    },
    "/services": {
      title: "Services étudiants",
      description:
        "Planification des admissions, visas et candidatures, expliquée étape par étape.",
    },
    "/marketplace": {
      title: "Marché étudiant",
      description: "Logement, immobilier, produits essentiels et services pour les étudiants.",
    },
    "/accommodation": {
      title: "Logement étudiant",
      description:
        "Résidences, appartements partagés, logements privés et familles d’accueil près du campus.",
    },
    "/real-estate": {
      title: "Immobilier et investissement",
      description:
        "Possibilités immobilières à Chypre du Nord, au Royaume-Uni et dans certains marchés des Émirats arabes unis.",
    },
    "/contact": {
      title: "Contact",
      description:
        "Contactez Frankedu Global sur WhatsApp ou par e-mail pour parler de votre projet d’études.",
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
      title: "Mustakabali wako. Fursa za kimataifa. | Frankedu Global",
      description: "Tunakuunganisha na fursa za kimataifa za masomo, mali na huduma za kitaalamu.",
    },
    "/about": {
      title: "Kuhusu",
      description:
        "Frankedu Global hutoa mwongozo kuhusu masomo nje ya nchi na fursa za kimataifa.",
    },
    "/courses": {
      title: "Programu za masomo",
      description:
        "Linganisha programu zinazofundishwa kwa Kiingereza kulingana na kiwango, somo na chuo.",
    },
    "/universities": {
      title: "Vyuo vikuu",
      description:
        "Chunguza chaguo za vyuo kulingana na nchi na somo. Wasiliana nasi kwa taarifa za sasa kuhusu ada na udahili.",
    },
    "/countries": {
      title: "Nchi za masomo",
      description: "Linganisha nchi za masomo kulingana na udahili, ada na fursa baada ya masomo.",
    },
    "/scholarships": {
      title: "Ufadhili wa masomo",
      description:
        "Pata taarifa kuhusu ufadhili wa masomo kwa wanafunzi wanaostahiki katika Final International University (FIU). Wasiliana nasi kwa maelezo ya sasa.",
    },
    "/services": {
      title: "Huduma za wanafunzi",
      description: "Mipango ya udahili, visa na maombi, ikielezwa hatua kwa hatua.",
    },
    "/marketplace": {
      title: "Soko la wanafunzi",
      description: "Malazi, mali, mahitaji na huduma kwa wanafunzi wanaoanza maisha mapya.",
    },
    "/accommodation": {
      title: "Malazi ya wanafunzi",
      description:
        "Mabweni, vyumba vya pamoja, nyumba binafsi na makazi ya familia karibu na chuo.",
    },
    "/real-estate": {
      title: "Mali na uwekezaji",
      description: "Fursa za mali Kaskazini mwa Saiprasi, Uingereza na baadhi ya masoko ya UAE.",
    },
    "/contact": {
      title: "Mawasiliano",
      description:
        "Wasiliana na Frankedu Global kupitia WhatsApp au barua pepe kuhusu mpango wako wa masomo.",
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
