import type { Locale } from "@/lib/locale";

const phrases: Partial<Record<Exclude<Locale, "en">, Record<string, string>>> = {
  tr: {
    "Main navigation": "Ana gezinme",
    "Language / Dil": "Dil / Language",
    "Mobile navigation": "Mobil gezinme",
    "Open menu": "Menüyü aç",
    "Close menu": "Menüyü kapat",
    "Start Application": "Başvuru Başlat",
    "Chat on WhatsApp": "WhatsApp'tan Yazın",
    "Student Dashboard Preview →": "Öğrenci Paneli Önizleme →",
    "Study Pathways": "Eğitim Yolları",
    "Services & Living": "Hizmetler ve Yaşam",
    Company: "Kurumsal",
    "Institution names and locations; admissions details on request":
      "Kurum adları ve konumları; kabul ayrıntıları talep üzerine",
    "Programme listings appear after their details are confirmed":
      "Program ilanları ayrıntılar teyit edildikten sonra yayımlanır",
    "Browse destinations and ask about current study options":
      "Destinasyonlara göz atın ve güncel eğitim seçeneklerini sorun",
    "Current award details are not published": "Güncel burs ayrıntıları yayımlanmamıştır",
    "Study, property, and digital-service enquiries":
      "Eğitim, gayrimenkul ve dijital hizmet talepleri",
    "No marketplace listings are currently published": "Şu anda pazar yeri ilanı yayımlanmamıştır",
    "No accommodation listings are currently published": "Şu anda konaklama ilanı yayımlanmamıştır",
    "Ask about the property listing shown on this site": "Bu sitedeki gayrimenkul ilanını sorun",
    "Our approach and contact information": "Yaklaşımımız ve iletişim bilgilerimiz",
    "Send us a WhatsApp or email enquiry": "WhatsApp veya e-posta ile bize ulaşın",
    "Information on study options, property listings, and digital services.":
      "Eğitim seçenekleri, gayrimenkul ilanları ve dijital hizmetler hakkında bilgi.",
    "Ask us to confirm current details before making a decision.":
      "Karar vermeden önce güncel ayrıntıları teyit etmek için bize ulaşın.",
    "Message Frankedu Global to ask about study information, property listings, or digital services.":
      "Eğitim bilgileri, gayrimenkul ilanları veya dijital hizmetler hakkında Frankedu Global'e WhatsApp'tan yazın.",
    "Education • Property • Digital Services": "Eğitim • Gayrimenkul • Dijital Hizmetler",
    "Clear information for": "Açık bilgiler",
    "your next decision.": "bir sonraki kararınız için.",
    "Study options • Property information • Digital services":
      "Eğitim seçenekleri • Gayrimenkul bilgileri • Dijital hizmetler",
    "Frankedu Global helps students, families, and clients ask informed questions about study options, property information, and digital services.":
      "Frankedu Global; öğrencilere, ailelere ve müşterilere eğitim seçenekleri, gayrimenkul bilgileri ve dijital hizmetler hakkında bilinçli sorular sormalarında yardımcı olur.",
    "Straightforward enquiries": "Açık ve doğrudan talepler",
    "Study options • Property information": "Eğitim seçenekleri • Gayrimenkul bilgileri",
    "Study, property, and digital enquiries.": "Eğitim, gayrimenkul ve dijital hizmet talepleri.",
    "Ask us about current study information, property details, or digital services. We will confirm what is available.":
      "Güncel eğitim bilgilerini, gayrimenkul ayrıntılarını veya dijital hizmetleri sorun. Mevcut seçenekleri teyit ederiz.",
    "Study information": "Eğitim bilgileri",
    "Ask about current admissions information and study options. Final International University (FIU) is the only confirmed recruitment relationship.":
      "Güncel kabul bilgilerini ve eğitim seçeneklerini sorun. Final International University (FIU), proje bağlamında doğrulanmış tek öğrenci alım ilişkisidir.",
    "Current programmes and entry requirements need confirmation":
      "Güncel programlar ve kabul koşulları teyit edilmelidir",
    "Fees, scholarship terms, and intakes may change":
      "Ücretler, burs koşulları ve kayıt dönemleri değişebilir",
    "Check visa requirements with the relevant authorities":
      "Vize koşullarını ilgili makamlarla kontrol edin",
    "Property information": "Gayrimenkul bilgileri",
    "Ask about the property listing shown on this site. Availability, price, and particulars need current confirmation.":
      "Bu sitedeki gayrimenkul ilanını sorun. Uygunluk, fiyat ve ayrıntılar güncel olarak teyit edilmelidir.",
    "Current availability on enquiry": "Güncel uygunluk talep üzerine teyit edilir",
    "Details should be confirmed before proceeding":
      "İlerlemeye karar vermeden önce ayrıntılar teyit edilmelidir",
    "Independent advice may be appropriate": "Bağımsız danışmanlık almayı değerlendirin",
    "Digital services": "Dijital hizmetler",
    "Digital Services": "Dijital Hizmetler",
    "Study Options & Admissions Enquiries": "Eğitim Seçenekleri ve Kabul Talepleri",
    "Discuss your study plans and ask about current admissions information. Final International University (FIU) is the only confirmed recruitment relationship.":
      "Eğitim planlarınızı görüşün ve güncel kabul bilgilerini sorun. Final International University (FIU), proje bağlamında doğrulanmış tek öğrenci alım ilişkisidir.",
    "Available programmes, fees, and entry requirements need confirmation from the institution.":
      "Mevcut programlar, ücretler ve kabul koşulları kurum tarafından teyit edilmelidir.",
    "Visa and immigration requirements should be checked with the relevant authorities.":
      "Vize ve göçmenlik koşulları ilgili makamlarla kontrol edilmelidir.",
    "Property Information": "Gayrimenkul Bilgileri",
    "Contact us to ask about property information and any current listing details.":
      "Gayrimenkul bilgileri ve güncel ilan ayrıntıları için bize ulaşın.",
    "Availability and pricing should be confirmed for each listing.":
      "Uygunluk ve fiyat her ilan için teyit edilmelidir.",
    "Property details should be reviewed independently before making a decision.":
      "Karar vermeden önce gayrimenkul ayrıntıları bağımsız olarak incelenmelidir.",
    "Contact us to discuss your digital service requirements.":
      "Dijital hizmet ihtiyaçlarınızı görüşmek için bize ulaşın.",
    "Scope, availability, and pricing are discussed per enquiry.":
      "Kapsam, uygunluk ve fiyat her talep için ayrıca görüşülür.",
    "Sarcon №87 Property Listing": "Sarcon №87 Gayrimenkul İlanı",
    "Sarcon №87 Property Listing | Frankedu Global":
      "Sarcon №87 Gayrimenkul İlanı | Frankedu Global",
    "Sarcon №87 · Enquiry": "Sarcon №87 · Bilgi Talebi",
    "View photographs associated with the Sarcon №87 property listing and contact Frankedu Global to ask about current details.":
      "Sarcon №87 gayrimenkul ilanıyla ilişkili fotoğrafları inceleyin ve güncel ayrıntıları sormak için Frankedu Global'e ulaşın.",
    "Price details not published": "Fiyat bilgileri yayımlanmamıştır",
    "Photograph associated with the Sarcon №87 property listing.":
      "Sarcon №87 gayrimenkul ilanıyla ilişkili fotoğraf.",
    "This page shows photographs associated with the Sarcon №87 property listing. Contact us to ask about its current details.":
      "Bu sayfada Sarcon №87 gayrimenkul ilanıyla ilişkili fotoğraflar gösterilir. Güncel ayrıntıları sormak için bize ulaşın.",
    "Property particulars, price, location, and availability need confirmation before proceeding.":
      "İlerlemeye karar vermeden önce gayrimenkul ayrıntıları, fiyat, konum ve uygunluk teyit edilmelidir.",
    "Photographs available": "Fotoğraflar mevcut",
    "Confirm current availability": "Güncel uygunluğu teyit edin",
    "Frankedu Global shares information about study options, property, and digital services. Contact us to ask what is currently available.":
      "Frankedu Global eğitim seçenekleri, gayrimenkul ve dijital hizmetler hakkında bilgi paylaşır. Güncel olarak nelerin mevcut olduğunu sormak için bize ulaşın.",
    "Admissions, fees, availability, and other details can change. Ask us to confirm current information before making a decision.":
      "Kabul, ücret, uygunluk ve diğer ayrıntılar değişebilir. Karar vermeden önce güncel bilgileri teyit etmek için bize ulaşın.",
    "No assumed details": "Varsayımda bulunmamak",
    "We distinguish confirmed information from details that still need to be checked.":
      "Teyit edilmiş bilgileri henüz kontrol edilmesi gereken ayrıntılardan ayırırız.",
    "A clear next step": "Açık bir sonraki adım",
    "Contact us with your question and we will discuss the information or service you are looking for.":
      "Sorunuzla bize ulaşın; aradığınız bilgi veya hizmet hakkında görüşelim.",
    "Contact us to discuss a digital service request.":
      "Dijital hizmet talebinizi görüşmek için bize ulaşın.",
    "Scope and availability confirmed per enquiry":
      "Kapsam ve uygunluk her talep için teyit edilir",
    "Pricing discussed before work begins": "Fiyatlandırma işe başlamadan önce görüşülür",
    "Study destinations.": "Eğitim destinasyonları.",
    "Browse destinations listed on this site. Current programmes, admissions, costs, and dates vary; contact us to ask about specific options.":
      "Bu sitede listelenen destinasyonlara göz atın. Güncel programlar, kabul koşulları, maliyetler ve tarihler değişebilir; belirli seçenekleri sormak için bize ulaşın.",
    "Property listing.": "Gayrimenkul ilanı.",
    "One property listing is shown here. Ask us to confirm its current availability and details.":
      "Burada bir gayrimenkul ilanı gösterilmektedir. Güncel uygunluk ve ayrıntıları teyit etmek için bize ulaşın.",
    "Listing information may change. Confirm current details before making a decision.":
      "İlan bilgileri değişebilir. Karar vermeden önce güncel ayrıntıları teyit edin.",
    "Have a question about your next step?": "Bir sonraki adımınızla ilgili sorunuz mu var?",
    "Contact Frankedu Global to discuss study information, a property listing, or digital services.":
      "Eğitim bilgilerini, gayrimenkul ilanını veya dijital hizmetleri görüşmek için Frankedu Global'e ulaşın.",
    "University directory": "Üniversite rehberi",
    "Browse institutions by destination. Final International University (FIU) is the only confirmed recruitment relationship; contact us about current admissions details.":
      "Kurumlara destinasyona göre göz atın. Final International University (FIU), proje bağlamında doğrulanmış tek öğrenci alım ilişkisidir; güncel kabul ayrıntıları için bize ulaşın.",
    "Destinations to ask about.": "Bilgi alabileceğiniz destinasyonlar.",
    "Browse the destinations listed here. Contact us to ask about current study options; programmes, fees, and dates are not listed until confirmed.":
      "Burada listelenen destinasyonlara göz atın. Güncel eğitim seçeneklerini sormak için bize ulaşın; programlar, ücretler ve tarihler teyit edilmeden yayımlanmaz.",
    "Ask about options": "Seçenekleri sorun",
    "No current scholarship details are published. Contact us to ask about information confirmed by the institution.":
      "Güncel burs ayrıntıları yayımlanmamıştır. Kurum tarafından teyit edilen bilgileri sormak için bize ulaşın.",
    "No current scholarship listings": "Güncel burs ilanı yok",
    "Award amounts, eligibility, and deadlines need current confirmation before they can be published.":
      "Burs miktarları, uygunluk koşulları ve son tarihler yayımlanmadan önce güncel olarak teyit edilmelidir.",
    "How we can help": "Nasıl yardımcı olabiliriz?",
    "Ask about study information, property details, or digital services. Scope and availability are confirmed per enquiry.":
      "Eğitim bilgilerini, gayrimenkul ayrıntılarını veya dijital hizmetleri sorun. Kapsam ve uygunluk her talep için teyit edilir.",
    "About Frankedu Global": "Frankedu Global hakkında",
    "Study and property information": "Eğitim ve gayrimenkul bilgileri",
    "What we do": "Ne yapıyoruz?",
    "Clear information for your next decision.": "Bir sonraki kararınız için açık bilgiler.",
    "We share study information and property details, and discuss digital-service enquiries. Ask us to confirm what is currently available.":
      "Eğitim bilgilerini ve gayrimenkul ayrıntılarını paylaşıyor, dijital hizmet taleplerini görüşüyoruz. Güncel olarak nelerin mevcut olduğunu teyit etmek için bize ulaşın.",
    "Message us on WhatsApp or prepare an email using the form below.":
      "WhatsApp'tan mesaj gönderin veya aşağıdaki formu kullanarak e-posta taslağı oluşturun.",
    "Tell us what you would like to ask": "Ne sormak istediğinizi yazın",
    "Housing and property enquiries.": "Konaklama ve gayrimenkul talepleri.",
    "Browse the available sections below. Listings are shown only when current details are available.":
      "Aşağıdaki bölümlere göz atın. İlanlar yalnızca güncel ayrıntılar mevcut olduğunda yayımlanır.",
    "Ask us whether current accommodation information is available.":
      "Güncel konaklama bilgisi olup olmadığını bize sorun.",
    "Ask about accommodation →": "Konaklama hakkında bilgi alın →",
    "View the property listing and ask us to confirm its current details.":
      "Gayrimenkul ilanını inceleyin ve güncel ayrıntıları teyit etmemizi isteyin.",
    "View property information →": "Gayrimenkul bilgilerini görüntüle →",
    "No current listings": "Güncel ilan yok",
    "There are no marketplace listings published at this time. Contact us to ask about current options.":
      "Şu anda yayımlanmış pazar yeri ilanı bulunmuyor. Güncel seçenekleri sormak için bize ulaşın.",
    "Accommodation enquiries": "Konaklama hakkında bilgi",
    "No accommodation listings are currently published. Contact us to ask whether current information is available.":
      "Şu anda yayımlanmış konaklama ilanı yok. Güncel bilgi olup olmadığını sormak için bize ulaşın.",
    "Ask about availability": "Uygunluğu sorun",
    "One property listing is shown here. Contact us to confirm its current availability and details.":
      "Burada bir gayrimenkul ilanı gösterilmektedir. Güncel uygunluk ve ayrıntıları teyit etmek için bize ulaşın.",
    "Ask about this listing": "Bu ilan hakkında bilgi alın",
    "This property listing is not available. Contact us if you need assistance.":
      "Bu gayrimenkul ilanı mevcut değil. Yardıma ihtiyacınız olursa bize ulaşın.",
    "Ask us to confirm current availability and property details before proceeding.":
      "İlerlemeye karar vermeden önce güncel uygunluk ve gayrimenkul ayrıntılarını teyit etmek için bize ulaşın.",
    "Listing information": "İlan bilgileri",
    "Property listing": "Gayrimenkul ilanı",
    "Contact us to ask about current availability, property details, and viewing arrangements.":
      "Güncel uygunluk, gayrimenkul ayrıntıları ve görüntüleme düzenlemeleri hakkında bilgi almak için bize ulaşın.",
    "Before proceeding": "İlerlemeye karar vermeden önce",
    "Confirm the property particulars and seek independent professional advice before making a decision.":
      "Karar vermeden önce gayrimenkul ayrıntılarını teyit edin ve bağımsız profesyonel danışmanlık alın.",
    "Compare English-taught programmes": "İngilizce programları karşılaştırın",
    "Compare countries, visas & intakes": "Ülkeleri, vizeleri ve dönemleri karşılaştırın",
    "Scholarship information": "Burs bilgileri",
    "Intake planning, visa & arrival support": "Dönem planlama, vize ve varış desteği",
    "Student essentials & trusted community listings":
      "Öğrenci ihtiyaçları ve güvenilir topluluk ilanları",
    "Dorms & apartments near campus": "Kampüse yakın yurtlar ve daireler",
    "Property purchases & rentals": "Gayrimenkul alım ve kiralama",
    "Our mission, team & personal guidance": "Misyonumuz, ekibimiz ve kişiye özel danışmanlık",
    "Message our advisory team": "Danışman ekibimize mesaj gönderin",
    "Clear guidance for students choosing where — and how — to study abroad.":
      "Yurtdışında nerede ve nasıl eğitim alacağını seçen öğrenciler için açık ve güvenilir rehberlik.",
    Explore: "Keşfedin",
    Students: "Öğrenciler",
    "Start an application": "Başvuru başlat",
    "Student dashboard": "Öğrenci paneli",
    "All rights reserved.": "Tüm hakları saklıdır.",
    Home: "Ana Sayfa",
    "Verified listing": "Doğrulanmış ilan",
    "Template — verify before publishing": "Şablon — yayınlamadan önce doğrulayın",
    "Apply Now": "Şimdi Başvur",
    Close: "Kapat",
    "Ask a question": "Soru sorun",
    Enquire: "Bilgi alın",
    Reserve: "Rezervasyon yapın",
    "Request details": "Ayrıntı isteyin",
    "View Details": "Ayrıntıları görüntüle",
    "Ask us for current admissions information for this institution.":
      "Bu kurumun güncel kabul bilgileri için bize danışın.",
    "Contact us to ask about current study options.":
      "Güncel eğitim seçeneklerini sormak için bizimle iletişime geçin.",
    "Contact us for current intake information":
      "Güncel kayıt dönemleri için bizimle iletişime geçin",
    "United States": "Amerika Birleşik Devletleri",
    Available: "Uygun",
    "Degree level": "Derece seviyesi",
    "Tuition fee": "Öğrenim ücreti",
    Intake: "Kayıt dönemi",
    "Application fee": "Başvuru ücreti",
    "Scholarship availability": "Burs olanağı",
    Duration: "Süre",
    Tuition: "Öğrenim ücreti",
    Language: "Dil",
    "Talk to Frankedu": "Frankedu ile görüşün",
    "Not sure where to start?": "Nereden başlayacağınızdan emin değil misiniz?",
    "Let’s make a plan.": "Birlikte plan yapalım.",
    "Page not found": "Sayfa bulunamadı",
    "Try again": "Tekrar deneyin",
    "Go home": "Ana sayfaya dönün",
    "Education • Real Estate • Creative • Beyond": "Eğitim • Gayrimenkul • Kreatif • Daha Fazlası",
    "Your Future.": "Geleceğiniz.",
    "Study Abroad • Invest in Property • Build Your Brand • Live Better":
      "Yurtdışında Eğitim • Gayrimenkul Yatırımı • Markanızı Büyütün • Daha İyi Yaşayın",
    "Study destination": "Eğitim ülkesi",
    "Course or subject": "Bölüm veya alan",
    "Find Universities": "Üniversite Bul",
    "Verified Global Guidance": "Doğrulanmış Küresel Danışmanlık",
    "Our Services": "Hizmetlerimiz",
    "One Global Brand. Multiple Opportunities.": "Tek Küresel Marka. Sayısız Fırsat.",
    "Explore All Services": "Tüm Hizmetleri Gör",
    "Education & Admissions": "Eğitim ve Üniversite Kabulü",
    "Browse Universities": "Üniversiteleri İncele",
    "Properties & Investment": "Gayrimenkul ve Yatırım",
    "Verified homes & investment assets": "Doğrulanmış konutlar ve yatırım varlıkları",
    "Explore Properties": "Mülkleri İncele",
    "Creative & Digital": "Kreatif ve Dijital",
    "Brand identity, web & media": "Marka kimliği, web ve medya",
    "Get a Quote": "Fiyat Teklifi Alın",
    "Study & Living Destinations": "Eğitim ve Yaşam Destinasyonları",
    "Popular Destinations.": "Popüler Destinasyonlar.",
    "View All Destinations": "Tüm Destinasyonları Gör",
    "Study • Invest • Live": "Eğitim • Yatırım • Yaşam",
    "Institutions & Pathways": "Kurumlar ve Eğitim Yolları",
    "Browse All Universities": "Tüm Üniversiteleri İncele",
    "Real Estate Opportunities": "Gayrimenkul Fırsatları",
    "Featured Properties.": "Öne Çıkan Mülkler.",
    "Explore All Properties": "Tüm Mülkleri İncele",
    "Start Today": "Bugün Başlayın",
    "Let's Build Your Future Together.": "Geleceğinizi Birlikte Kuralım.",
    "Book a Consultation": "Danışmanlık Randevusu Alın",
    "Find the right university.": "Size uygun üniversiteyi bulun.",
    Destination: "Eğitim ülkesi",
    "All destinations": "Tüm destinasyonlar",
    Subject: "Bölüm / Alan",
    "All subjects": "Tüm alanlar",
    Clear: "Temizle",
    "university found": "üniversite bulundu",
    "universities found": "üniversite bulundu",
    "Turn your ambitions into a study plan.": "Hedeflerinizi güçlü bir eğitim planına dönüştürün.",
    "Study options at": "Eğitim seçenekleri:",
    "Filter by field, study level, and university. Programme listings appear here once details are confirmed; contact us to discuss current study options.":
      "Eğitim alanı, seviyesi ve üniversiteye göre filtreleyin. Programlar, ayrıntıları doğrulandıktan sonra burada yayımlanır; güncel seçenekleri görüşmek için bizimle iletişime geçin.",
    "Field of Study": "Eğitim Alanı",
    "Study Level": "Eğitim Seviyesi",
    "No verified programme listings yet": "Henüz doğrulanmış program ilanı yok",
    "We have not published programme listings because their details have not been confirmed. Contact us to discuss current study options.":
      "Program ayrıntıları doğrulanmadığı için henüz listeleme yayımlamadık. Güncel eğitim seçeneklerini görüşmek için bizimle iletişime geçin.",
    Level: "Seviye",
    "All levels": "Tüm seviyeler",
    University: "Üniversite",
    "All universities": "Tüm üniversiteler",
    Foundation: "Hazırlık",
    "Bachelor's": "Lisans",
    "Master's": "Yüksek Lisans",
    PhD: "Doktora",
    "Study destinations": "Eğitim destinasyonları",
    "Choose where your degree takes you.": "Diplomanızın sizi taşıyacağı ülkeyi seçin.",
    Intakes: "Kayıt dönemleri",
    "Tuition range": "Öğrenim ücreti aralığı",
    "View universities": "Üniversiteleri görüntüle",
    Scholarships: "Burslar",
    Amount: "Miktar",
    Deadline: "Son başvuru tarihi",
    "Apply with support": "Danışmanlıkla başvurun",
    "Check eligibility": "Uygunluğu sorgulayın",
    "Student support": "Öğrenci desteği",
    "Support for every part of your next step.": "Bir sonraki adımınızın her aşamasında destek.",
    "Start your application": "Başvurunuzu başlatın",
    Step: "Adım",
    "Everything you need to settle in.": "Yerleşmek için ihtiyacınız olan her şey.",
    Housing: "Konaklama",
    Property: "Gayrimenkul",
    All: "Tümü",
    "A place to live before you land.": "Daha gelmeden yaşayacağınız bir yer.",
    "Back to marketplace": "Pazar yerine dön",
    "Property Listing Not Found": "Gayrimenkul ilanı bulunamadı",
    "Back to Real Estate Listings": "Gayrimenkul ilanlarına dön",
    "Enquire on WhatsApp": "WhatsApp'tan bilgi alın",
    "All properties": "Tüm mülkler",
    "Foreign national eligible*": "Yabancı uyruklu alıcıya uygun*",
    "Expand photo in fullscreen": "Fotoğrafı tam ekranda büyüt",
    "Previous photo": "Önceki fotoğraf",
    "Next photo": "Sonraki fotoğraf",
    Photo: "Fotoğraf",
    "Select photo:": "Fotoğrafı seçin:",
    "Verified Property Highlights": "Doğrulanmış Mülk Özellikleri",
    "Buyer & Title Eligibility Notice": "Alıcı ve Koçan Uygunluk Bildirimi",
    "Verified Listing": "Doğrulanmış İlan",
    "Key Information": "Temel Bilgiler",
    Reference: "Referans",
    "Property type": "Mülk türü",
    Location: "Konum",
    "Map location": "Harita konumu",
    "Supplied upon enquiry": "Talep üzerine iletilir",
    Status: "Durum",
    Pricing: "Fiyatlandırma",
    "Buyer eligibility": "Alıcı uygunluğu",
    "Arrange a Viewing": "Mülk gösterimi ayarlayın",
    "Official Advisory Support": "Resmi Danışmanlık Desteği",
    "Close photo preview": "Fotoğraf önizlemesini kapatın",
    Application: "Başvuru",
    "Start your application.": "Başvurunuzu başlatın.",
    "Applying to": "Başvurulan kurum:",
    "Your details": "Bilgileriniz",
    "Study plan": "Eğitim planı",
    Documents: "Belgeler",
    Review: "Kontrol",
    "Full name": "Ad Soyad",
    "Email address": "E-posta adresi",
    "Phone / WhatsApp number": "Telefon / WhatsApp numarası",
    Nationality: "Vatandaşlık",
    "University (optional)": "Üniversite (isteğe bağlı)",
    "Programme (optional)": "Program (isteğe bağlı)",
    "Preferred intake": "Tercih edilen kayıt dönemi",
    "January 2027": "Ocak 2027",
    "February 2027": "Şubat 2027",
    "Passport copy": "Pasaport fotokopisi",
    "Academic transcripts": "Akademik transkriptler",
    "English proficiency proof": "İngilizce yeterlilik belgesi",
    "Statement of purpose": "Niyet mektubu",
    "No documents are uploaded or sent in this step.":
      "Bu adımda belge yüklenmez veya gönderilmez.",
    Name: "Ad Soyad",
    Programme: "Program",
    "Programme level": "Program düzeyi",
    Back: "Geri",
    Continue: "Devam et",
    "Continue to WhatsApp": "WhatsApp'ta devam et",
    "Student Preview": "Öğrenci Önizlemesi",
    "Prototype Preview — Demonstration Only": "Prototip Önizlemesi — Yalnızca Gösterim Amaçlı",
    "Applicant Dashboard Preview": "Başvuru Paneli Önizlemesi",
    "New application": "Yeni başvuru",
    Applications: "Başvurular",
    complete: "tamamlandı",
    "Saved universities": "Kaydedilen üniversiteler",
    "Document checklist": "Belge kontrol listesi",
    Account: "Hesap",
    "Welcome back": "Tekrar hoş geldiniz",
    Password: "Şifre",
    "Forgot password?": "Şifremi mi unuttunuz?",
    "Create your account": "Hesabınızı oluşturun",
    "Create account (integration ready)": "Hesap oluştur (entegrasyona hazır)",
    "Frank guidance for global study.": "Küresel eğitimde açık ve güvenilir rehberlik.",
    "Company & Heritage": "Şirket ve Kuruluş",
    "Personal, transparent guidance from day one.":
      "İlk günden itibaren kişisel ve şeffaf rehberlik.",
    Established: "Kuruluş",
    "How we work": "Çalışma şeklimiz",
    "What you can expect.": "Beklentileriniz neler olabilir?",
    Team: "Ekip",
    "People behind the plan.": "Planın arkasındaki ekip.",
    "Let’s talk about your next step.": "Bir sonraki adımınızı konuşalım.",
    "Social Channels": "Sosyal medya kanalları",
    "Preferred destination": "Tercih edilen destinasyon",
    "Tell us about your study plans": "Eğitim planlarınızdan bahsedin",
    "Continue in email": "E-postada devam edin",
    Breadcrumb: "İçerik yolu",
    "Photo Gallery Lightbox": "Fotoğraf galerisi",
    "Switch to English": "İngilizceye geç",
    "Türkçe diline geç": "Türkçeye geç",
    "Eco Luxury & Property Care": "Eco Luxury ve Mülk Bakımı",
    "University Admissions & Programme Matching": "Üniversite Kabulü ve Program Eşleştirme",
    "Scholarships & Financial Guidance": "Burs ve Finansal Danışmanlık",
    "Student Visa Guidance & Interview Prep": "Öğrenci Vizesi Danışmanlığı ve Mülakat Hazırlığı",
    "Student Accommodation & Relocation": "Öğrenci Konaklaması ve Taşınma",
    "Property & Investment Advisory": "Gayrimenkul ve Yatırım Danışmanlığı",
    "Career Support & Digital Services": "Kariyer Desteği ve Dijital Hizmetler",
    "On-campus student residence": "Kampüs içi öğrenci yurdu",
    Dormitory: "Öğrenci yurdu",
    "Inquire for semester rates": "Dönem ücretlerini öğrenin",
    "Campus vicinity, North Cyprus": "Kampüs çevresi, Kuzey Kıbrıs",
    "Utilities included": "Faturalar dahil",
    "Campus security": "Kampüs güvenliği",
    "High-speed Wi-Fi": "Yüksek hızlı Wi-Fi",
    "Inquire for availability": "Uygunluk için bilgi alın",
    "Shared student apartment": "Paylaşımlı öğrenci dairesi",
    "Shared flat": "Paylaşımlı daire",
    "Student quarter, North Cyprus": "Öğrenci bölgesi, Kuzey Kıbrıs",
    "Fully furnished": "Tam eşyalı",
    "Walking distance to transit": "Toplu taşımaya yürüme mesafesinde",
    "Dedicated study space": "Özel çalışma alanı",
    "Private student studio apartment": "Özel öğrenci stüdyo dairesi",
    Apartment: "Daire",
    "City centre, North Cyprus": "Şehir merkezi, Kuzey Kıbrıs",
    "Self-contained kitchen": "Bağımsız mutfak",
    "Air conditioning": "Klima",
    "Private balcony": "Özel balkon",
    "Student homestay & residential accommodation": "Öğrenci aile yanı ve konut konaklaması",
    Homestay: "Aile yanı konaklama",
    "Residential area, North Cyprus": "Yerleşim bölgesi, Kuzey Kıbrıs",
    "Safe residential setting": "Güvenli yerleşim ortamı",
    "Furnished bedroom": "Eşyalı yatak odası",
    "Local community immersion": "Yerel topluma uyum",
    "Cyprus / North Cyprus": "Kıbrıs / Kuzey Kıbrıs",
    "Europe / Mediterranean": "Avrupa / Akdeniz",
    "Confirmed recruitment relationship: Final International University (FIU)":
      "Doğrulanmış öğrenci alım ilişkisi: Final Uluslararası Üniversitesi (FIU)",
    "Scholarships up to 100% for eligible students at selected institutions":
      "Seçili kurumlarda uygun öğrenciler için %100'e varan burslar",
    "Affordable cost of living and student accommodation":
      "Uygun yaşam maliyeti ve öğrenci konaklaması",
    "Inquire for current intakes": "Güncel kayıt dönemleri için bilgi alın",
    "Scholarship-eligible (up to 100% at selected institutions)":
      "Burs olanağı (seçili kurumlarda %100'e kadar)",
    "United Kingdom": "Birleşik Krallık",
    "Undergraduate and postgraduate pathways across England, Scotland, Wales, and Northern Ireland.":
      "İngiltere, İskoçya, Galler ve Kuzey İrlanda'da lisans ve lisansüstü eğitim yolları.",
    "Intensive 1-year master's degrees": "Yoğun 1 yıllık yüksek lisans programları",
    "Graduate Route post-study work visa opportunities":
      "Eğitim sonrası Graduate Route çalışma vizesi olanakları",
    "Admissions and visa advisory support": "Kabul ve vize danışmanlığı",
    "Inquire for current intake cycles": "Güncel kayıt dönemleri için bilgi alın",
    "Contact advisor for verified fee schedules":
      "Doğrulanmış ücret çizelgesi için danışmana ulaşın",
    "North America": "Kuzey Amerika",
    "Colleges and universities offering co-op work terms and post-graduation pathways.":
      "İş deneyimli eğitim dönemleri ve mezuniyet sonrası fırsatlar sunan kolej ve üniversiteler.",
    "Post-Graduation Work Permit (PGWP) eligible programmes":
      "Mezuniyet Sonrası Çalışma İzni (PGWP) kapsamındaki programlar",
    "Co-op work placements and internship pathways": "İş yerleştirmeleri ve staj olanakları",
    "Undergraduate and postgraduate diploma pathways": "Lisans ve lisansüstü diploma programları",
    "Renowned engineering, business, and research programmes at public and private institutions.":
      "Kamu ve özel kurumlarda tanınmış mühendislik, işletme ve araştırma programları.",
    "English-taught undergraduate and master's programmes":
      "İngilizce lisans ve yüksek lisans programları",
    "18-month post-study job seeker visa": "18 aylık eğitim sonrası iş arama vizesi",
    "Strong industrial and technological ecosystem": "Güçlü sanayi ve teknoloji ekosistemi",
    "High-quality European education with accessible tuition fees and vibrant university cities.":
      "Uygun harç ücretleri ve canlı üniversite şehirleriyle yüksek kaliteli Avrupa eğitimi.",
    "Schengen Area European standard qualifications":
      "Schengen Bölgesi Avrupa standartlarında yeterlilikler",
    "Affordable living costs and medical/technical faculties":
      "Uygun yaşam maliyetleri ve tıp/teknik fakülteleri",
    "English-medium bachelor's and master's tracks":
      "İngilizce lisans ve yüksek lisans programları",
    "Leading Nordic education focused on innovation, research, technology, and applied sciences.":
      "Yenilik, araştırma, teknoloji ve uygulamalı bilimlere odaklanan öncü Nordik eğitimi.",
    "Top-ranked global education model": "Dünyanın önde gelen eğitim modellerinden biri",
    "Post-study work and residency pathways": "Eğitim sonrası çalışma ve oturum yolları",
    "High quality of life and modern learning environments":
      "Yüksek yaşam kalitesi ve modern öğrenme ortamları",
    "One of continental Europe's largest catalogues of English-taught degree programmes.":
      "Avrupa kıtasındaki en geniş İngilizce lisans programı kataloglarından biri.",
    "Extensive English-taught programmes at research and applied universities":
      "Araştırma ve uygulamalı bilimler üniversitelerinde geniş İngilizce program seçenekleri",
    "One-year 'Orientation Year' (zoekjaar) post-study work visa":
      "Bir yıllık eğitim sonrası 'Orientation Year' (zoekjaar) çalışma vizesi",
    "Central European location and international student community":
      "Orta Avrupa konumu ve uluslararası öğrenci topluluğu",
    Oceania: "Okyanusya",
    "Globally recognized degrees with strong student support and post-study work opportunities.":
      "Güçlü öğrenci desteği ve eğitim sonrası çalışma olanakları sunan, dünya çapında tanınan diplomalar.",
    "Work rights during study and Temporary Graduate visas":
      "Eğitim sırasında çalışma hakkı ve Temporary Graduate vizeleri",
    "World-class campus facilities and high living standards":
      "Dünya standartlarında kampüs olanakları ve yüksek yaşam standartları",
    "Undergraduate, postgraduate, and vocational training options":
      "Lisans, lisansüstü ve mesleki eğitim seçenekleri",
    "International study hub with modern university campuses and generous scholarship programmes.":
      "Modern üniversite kampüsleri ve kapsamlı burs programlarıyla uluslararası eğitim merkezi.",
    "Government, provincial, and university scholarship options":
      "Devlet, eyalet ve üniversite burs seçenekleri",
    "Expanding English-taught degree offerings": "Genişleyen İngilizce lisans programları",
    "Exposure to one of the world's leading economic ecosystems":
      "Dünyanın önde gelen ekonomik ekosistemlerinden biriyle tanışma",
    "Airport pickup & meet-and-greet": "Havalimanı karşılama ve transfer",
    "Inquire upon booking": "Rezervasyon sırasında bilgi alın",
    "Ercan / Larnaca Airport": "Ercan / Larnaka Havalimanı",
    "Local SIM & student banking onboarding": "Yerel SIM kart ve öğrenci bankacılığı desteği",
    "Lefkoşa & Girne": "Lefkoşa ve Girne",
    "Guided onboarding for a local phone number, student banking, and essential accounts.":
      "Yerel telefon numarası, öğrenci bankacılığı ve gerekli hesaplar için yönlendirme.",
    "Campus & city orientation walk": "Kampüs ve şehir tanıtım gezisi",
    "Orientation covering campus facilities, public transit, supermarkets, and student amenities.":
      "Kampüs olanakları, toplu taşıma, marketler ve öğrenci hizmetlerini tanıtan gezi.",
    "Academic textbooks & study bundle": "Akademik ders kitapları ve çalışma seti",
    Books: "Kitaplar",
    "Core university course textbooks and study guides from previous intake cohorts.":
      "Önceki dönemlerden temel üniversite ders kitapları ve çalışma kılavuzları.",
    "Student study desk & ergonomic chair": "Öğrenci çalışma masası ve ergonomik sandalye",
    Furniture: "Mobilya",
    "Compact desk and seating set ideal for student flat or dorm room setups.":
      "Öğrenci dairesi veya yurt odası için uygun kompakt masa ve sandalye seti.",
    "Campus city bicycle": "Kampüs ve şehir bisikleti",
    Transport: "Ulaşım",
    "Reliable city bicycle with lock and safety lights for easy campus commute.":
      "Kampüse kolay ulaşım için kilitli ve güvenlik ışıklı şehir bisikleti.",
    "Sample Applicant (Prototype Preview)": "Örnek başvuru sahibi (prototip önizlemesi)",
    "International Applicant": "Uluslararası başvuru sahibi",
    "Upcoming Intake": "Yaklaşan kayıt dönemi",
    "Sample Programme Application (Prototype Preview)":
      "Örnek program başvurusu (prototip önizlemesi)",
    "Under review": "İnceleniyor",
    "Financial evidence": "Mali durum belgesi",
    "Sarcon №87 · For Sale": "Sarcon №87 · Satılık",
    "Renovated / design-refurbished villa": "Yenilenmiş / tasarım odaklı villa",
    "For sale": "Satılık",
    "Exact map location supplied upon enquiry": "Kesin harita konumu talep üzerine iletilir",
    "Price on inquiry": "Fiyat bilgisi için danışın",
    "Renovated and design-refurbished villa": "Yenilenmiş ve tasarım odaklı villa",
    "North Cyprus location": "Kuzey Kıbrıs konumu",
    "Full property photo gallery available": "Tam mülk fotoğraf galerisi mevcuttur",
    "Viewing and purchase assistance available": "Gösterim ve satın alma desteği sunulmaktadır",
    "*Buyer/title eligibility information in the listing should be independently confirmed during legal conveyancing.":
      "*İlandaki alıcı/tapu uygunluğu bilgileri hukuki devir sürecinde bağımsız olarak teyit edilmelidir.",
    "Supported destinations": "Desteklenen destinasyonlar",
    Europe: "Avrupa",
    Canada: "Kanada",
    Germany: "Almanya",
    Poland: "Polonya",
    Finland: "Finlandiya",
    "Europe / Nordic": "Avrupa / Nordik",
    Netherlands: "Hollanda",
    Australia: "Avustralya",
    China: "Çin",
    Asia: "Asya",
    Services: "Hizmetler",
    "Personalized arrival reception and transfer directly to student accommodation.":
      "Öğrenci konaklamasına kişiye özel karşılama ve transfer.",
    Lefkoşa: "Lefkoşa",
    "Explore Sarcon №87, a renovated villa for sale in North Cyprus. View the property gallery and contact Frankedu Global for viewing and purchase assistance.":
      "Kuzey Kıbrıs'ta satılık, yenilenmiş Sarcon №87 villasını inceleyin. Mülk galerisine göz atın; gösterim ve satın alma desteği için Frankedu Global ile iletişime geçin.",
    "Sarcon 87 renovated villa in North Cyprus – exterior street view and gated entrance":
      "Kuzey Kıbrıs'taki yenilenmiş Sarcon 87 villası – sokaktan dış görünüm ve kapılı giriş",
    "Exterior Street View & Gated Entrance": "Sokaktan Dış Görünüm ve Kapılı Giriş",
    "Cover / Main Exterior": "Kapak / Ana Dış Cephe",
    "Sarcon 87 renovated villa in North Cyprus – surrounding coastal neighborhood and Mediterranean sea views":
      "Kuzey Kıbrıs'taki yenilenmiş Sarcon 87 villası – çevredeki sahil mahallesi ve Akdeniz manzarası",
    "Surrounding Coastal Neighborhood & Sea View": "Çevredeki Sahil Mahallesi ve Deniz Manzarası",
    "Location & Setting": "Konum ve Çevre",
    "Sarcon 87 renovated villa in North Cyprus – spacious double-height living room with exposed timber beams":
      "Kuzey Kıbrıs'taki yenilenmiş Sarcon 87 villası – ahşap kirişli, yüksek tavanlı geniş oturma odası",
    "Double-Height Living Room": "Yüksek Tavanlı Oturma Odası",
    "Living Space": "Yaşam Alanı",
    "Sarcon 87 renovated villa in North Cyprus – ground-floor living area, wrought-iron staircase, and hallway entrance":
      "Kuzey Kıbrıs'taki yenilenmiş Sarcon 87 villası – zemin kat yaşam alanı, ferforje merdiven ve koridor girişi",
    "Living Area & Feature Staircase": "Yaşam Alanı ve Özel Tasarım Merdiven",
    "Interior Architecture": "İç Mimari",
    "Sarcon 87 renovated villa in North Cyprus – contemporary renovated kitchen and open-plan dining space":
      "Kuzey Kıbrıs'taki yenilenmiş Sarcon 87 villası – modern mutfak ve açık plan yemek alanı",
    "Renovated Kitchen & Dining": "Yenilenmiş Mutfak ve Yemek Alanı",
    "Kitchen & Dining": "Mutfak ve Yemek Alanı",
    "Hi, I'm interested in Sarcon №87 (Renovated Villa for Sale in North Cyprus). Could you share verified details and viewing availability?":
      "Merhaba, Sarcon №87 (Kuzey Kıbrıs'ta Satılık Yenilenmiş Villa) ile ilgileniyorum. Doğrulanmış bilgileri ve gösterim uygunluğunu paylaşabilir misiniz?",
    "Sarcon №87: Renovated Villa for Sale": "Sarcon №87: Satılık Yenilenmiş Villa",
    "Renovated Villa": "Yenilenmiş Villa",
    "Design-refurbished villa": "Tasarım odaklı yenilenmiş villa",
    "Full photo gallery available": "Tam fotoğraf galerisi mevcuttur",
    "Foreign buyer eligible*": "Yabancı alıcıya uygun*",
    "Immediate / For sale": "Hemen / Satılık",
    "North Cyprus: Residential, Off-Plan & Investment Properties":
      "Kuzey Kıbrıs: Konut, Proje Aşamasında ve Yatırım Amaçlı Gayrimenkuller",
    "Residential, Off-Plan & Investment": "Konut, Proje Aşamasında ve Yatırım",
    "Inquire for current opportunities": "Güncel fırsatlar için bilgi alın",
    "Residential properties": "Konut mülkleri",
    "Off-plan developments": "Proje aşamasındaki yapılar",
    "Investment properties": "Yatırım amaçlı mülkler",
    "Inquire for details": "Ayrıntılar için bilgi alın",
    "Seafront Resort Residences development in Esentepe, North Cyprus":
      "Kuzey Kıbrıs Esentepe'de deniz kıyısındaki Resort Residences projesi",
    "United Kingdom: Residential & Investment Opportunities":
      "Birleşik Krallık: Konut ve Yatırım Fırsatları",
    "Residential & Investment": "Konut ve Yatırım",
    "Residential opportunities": "Konut fırsatları",
    "Acquisition and advisory guidance": "Satın alma ve danışmanlık rehberliği",
    "Dubai/UAE: Selected Investment Opportunities": "Dubai/BAE: Seçili Yatırım Fırsatları",
    "Selected Investment Opportunities": "Seçili Yatırım Fırsatları",
    "Dubai / UAE": "Dubai / BAE",
    "Selected property opportunities": "Seçili gayrimenkul fırsatları",
    "Investor acquisition advisory": "Yatırımcılar için satın alma danışmanlığı",
    "Market opportunities": "Piyasa fırsatları",
    "Final International University Scholarships": "Final Uluslararası Üniversitesi Bursları",
    "Up to 100% for eligible students": "Uygun öğrenciler için %100'e kadar",
    "Undergraduate & Postgraduate": "Lisans ve Lisansüstü",
    "Contact advisor": "Danışmana ulaşın",
    "Scholarships can be up to 100% for eligible students at selected institutions based on academic merit, quota availability, or early application.":
      "Seçili kurumlarda uygun öğrenciler için akademik başarı, kontenjan durumu veya erken başvuruya bağlı olarak %100'e varan burslar sunulabilir.",
    "Merit-based waivers and institutional awards available across supported destinations. Assessed upon academic profile review.":
      "Desteklenen destinasyonlarda başarıya dayalı muafiyet ve kurum bursları sunulabilir. Akademik profil incelenerek değerlendirilir.",
    "Health Sciences & Nursing": "Sağlık Bilimleri ve Hemşirelik",
    "Law & International Relations": "Hukuk ve Uluslararası İlişkiler",
    "Hospitality & Tourism": "Konaklama ve Turizm",
    "Architecture & Fine Arts": "Mimarlık ve Güzel Sanatlar",
    "Social Sciences & Humanities": "Sosyal Bilimler ve Beşeri Bilimler",
    "End-to-end guidance matching your academic background and aspirations with verified institutions.":
      "Akademik geçmişinizi ve hedeflerinizi doğrulanmış kurumlarla eşleştiren baştan sona danışmanlık.",
    "Programme matching across 9+ supported destinations":
      "Desteklenen 9'dan fazla destinasyonda program eşleştirme",
    "Document readiness & academic credential check":
      "Belge hazırlığı ve akademik yeterlilik kontrolü",
    "Official portal submission & offer letter follow-up":
      "Resmi portaldan başvuru ve kabul mektubu takibi",
    "Scholarships can be up to 100% for eligible students at selected institutions — we guide your application.":
      "Seçili kurumlarda uygun öğrenciler için %100'e kadar burs olanağı vardır; başvuru sürecinde rehberlik ediyoruz.",
    "Up to 100% scholarship evaluation at selected institutions":
      "Seçili kurumlarda %100'e kadar burs değerlendirmesi",
    "Merit and country-quota matching": "Başarı ve ülke kontenjanına göre eşleştirme",
    "Transparent fee planning before you commit": "Karar vermeden önce şeffaf ücret planlaması",
    "Structured support to prepare a compliant student visa application with proper documentation.":
      "Gerekli belgelerle kurallara uygun öğrenci vizesi başvurusu hazırlamak için yapılandırılmış destek.",
    "Financial evidence and sponsorship checklist":
      "Mali durum ve sponsor belgeleri kontrol listesi",
    "Embassy and consular interview preparation": "Büyükelçilik ve konsolosluk mülakatı hazırlığı",
    "Visa submission timing & appointment advice": "Vize başvuru zamanı ve randevu danışmanlığı",
    "Verified student dormitories and rentals near campus, kept strictly separate from investment property.":
      "Kampüs yakınındaki doğrulanmış öğrenci yurtları ve kiralık konutlar, yatırım mülklerinden ayrı yönetilir.",
    "On-campus and off-campus student housing options":
      "Kampüs içi ve dışı öğrenci konaklama seçenekleri",
    "Airport pickup and meet-and-greet reception": "Havalimanı karşılama ve transfer",
    "Local SIM card & bank account onboarding": "Yerel SIM kart ve banka hesabı açılışı desteği",
    "Strategic property acquisition, rentals, and capital growth advisory across our primary markets.":
      "Başlıca pazarlarımızda stratejik mülk alımı, kiralama ve değer artışı danışmanlığı.",
    "North Cyprus: residential, off-plan and investment properties":
      "Kuzey Kıbrıs: konut, proje aşamasında ve yatırım amaçlı mülkler",
    "United Kingdom: residential and investment opportunities":
      "Birleşik Krallık: konut ve yatırım fırsatları",
    "Dubai/UAE: selected investment opportunities": "Dubai/BAE: seçili yatırım fırsatları",
    "Guidance for post-study career opportunities alongside creative branding and digital design solutions.":
      "Eğitim sonrası kariyer fırsatları için rehberlik; yaratıcı marka ve dijital tasarım çözümleri.",
    "Post-study work route insights across key destinations":
      "Önemli destinasyonlarda eğitim sonrası çalışma yolları hakkında bilgi",
    "Professional CV and application profile review":
      "Profesyonel özgeçmiş ve başvuru profili incelemesi",
    "Graphic, web design & branding solutions by Frankedu":
      "Frankedu'dan grafik, web tasarım ve marka çözümleri",
    "Kyrenia (Girne)": "Girne (Kyrenia)",
    "Bachelor's, Master's, PhD": "Lisans, Yüksek Lisans, Doktora",
    "Programmes available across confirmed faculties (contact advisor)":
      "Doğrulanmış fakültelerde programlar mevcuttur (danışmana ulaşın)",
    "Contact advisor for verified fee schedule":
      "Doğrulanmış ücret çizelgesi için danışmana ulaşın",
    "Renovated Villa for Sale in North Cyprus": "Kuzey Kıbrıs'ta Satılık Yenilenmiş Villa",
    "Renovated Villa for Sale in North Cyprus | Frankedu Global":
      "Kuzey Kıbrıs'ta Satılık Yenilenmiş Villa | Frankedu Global",
    "Contact advisor for intake schedules": "Kayıt dönemleri için danışmana ulaşın",
    "Frank & transparent": "Açık ve şeffaf",
    "Honest, realistic advice regarding admissions criteria, visa regulations, and living costs — with no overselling.":
      "Kabul kriterleri, vize düzenlemeleri ve yaşam giderleri hakkında abartısız, dürüst ve gerçekçi danışmanlık.",
    "Comprehensive support": "Kapsamlı destek",
    "From programme matching and visa preparation to arrival reception, accommodation, and property investment guidance.":
      "Program eşleştirme ve vize hazırlığından varışta karşılama, konaklama ve gayrimenkul yatırım danışmanlığına kadar.",
    "Scholarship range": "Burs oranı",
    "Up to 100%": "%100'e kadar",
    "North Cyprus": "Kuzey Kıbrıs",
    "Business & Management": "İşletme ve Yönetim",
    "Engineering & Technology": "Mühendislik ve Teknoloji",
    "Computer Science & IT": "Bilgisayar Bilimleri ve Bilişim",
    "A beautifully renovated villa finished with a design-led approach and prepared for resale. This property is suitable for buyers looking for a refreshed home or investment opportunity in North Cyprus.":
      "Tasarım odaklı biçimde yenilenmiş ve yeniden satışa hazırlanmış bu villa, Kuzey Kıbrıs'ta yenilenmiş bir ev veya yatırım fırsatı arayan alıcılara uygundur.",
    "Full property photographs and the exact map location are available upon request. Contact Frankedu Global for viewing arrangements and dedicated purchasing assistance.":
      "Mülkün tüm fotoğrafları ve kesin harita konumu talep üzerine iletilir. Gösterim ve satın alma desteği için Frankedu Global ile iletişime geçin.",
    "Explore university options & tuition": "Üniversite seçeneklerini ve harçları inceleyin",
    "Contact us about study destinations and university admissions.":
      "Eğitim ülkeleri ve üniversite başvuruları hakkında bizimle iletişime geçin.",
    "Global Opportunities.": "Küresel Fırsatlar.",
    "Study guidance • Property information": "Eğitim danışmanlığı • Gayrimenkul bilgileri",
    "Study options & scholarships": "Eğitim seçenekleri ve burslar",
    "Guidance on study options based on your academic background and aspirations.":
      "Akademik geçmişinize ve hedeflerinize göre eğitim seçenekleri hakkında danışmanlık.",
    "Buyer Eligibility Information*": "Alıcı uygunluk bilgileri*",
    "Explore study destinations and discuss options based on your academic goals, budget, and preferred intake.":
      "Eğitim ülkelerini keşfedin; akademik hedeflerinize, bütçenize ve tercih ettiğiniz döneme göre seçenekleri görüşün.",
    "University Pathways.": "Üniversite Eğitim Yolları.",
    "We have a confirmed recruitment relationship with Final International University (FIU). Contact us for current programme and admissions details.":
      "Final International University (FIU) ile doğrulanmış bir öğrenci alım ilişkimiz bulunmaktadır. Güncel program ve kabul bilgileri için bizimle iletişime geçin.",
    "Explore property opportunities across North Cyprus and selected international markets.":
      "Kuzey Kıbrıs ve seçili uluslararası pazarlardaki gayrimenkul fırsatlarını inceleyin.",
    "*Buyer/title eligibility information is included in the listing and should be independently confirmed during legal conveyancing.":
      "*Alıcı/tapu uygunluğu bilgileri ilanda yer alır ve hukuki devir sürecinde bağımsız olarak teyit edilmelidir.",
    "We have a confirmed recruitment relationship with Final International University (FIU). Contact us to discuss other study options.":
      "Final International University (FIU) ile doğrulanmış bir öğrenci alım ilişkimiz bulunmaktadır. Diğer eğitim seçeneklerini görüşmek için bizimle iletişime geçin.",
    "Contact us to discuss study options for this destination.":
      "Bu ülkedeki eğitim seçeneklerini görüşmek için bizimle iletişime geçin.",
    "Search by subject and level. Contact us for current programme details and fee information.":
      "Bölüm ve eğitim seviyesine göre arama yapın. Güncel program ve ücret bilgileri için bizimle iletişime geçin.",
    "Programme and admission information can change. Contact us for current details about available programmes, faculties, and requirements.":
      "Program ve kabul bilgileri değişebilir. Mevcut programlar, fakülteler ve koşullar hakkında güncel bilgi için bizimle iletişime geçin.",
    "Compare key study destinations side by side. Contact us to discuss options for destinations not listed.":
      "Öne çıkan eğitim ülkelerini karşılaştırın. Listelenmeyen ülkelerdeki seçenekleri görüşmek için bizimle iletişime geçin.",
    "Scholarship details depend on the institution and eligibility criteria. Contact us for current information.":
      "Burs bilgileri kuruma ve uygunluk koşullarına göre değişir. Güncel bilgi için bizimle iletişime geçin.",
    "Listing states the title is suitable for a foreign national*":
      "İlanda tapunun yabancı uyruklu alıcıya uygun olduğu belirtilmektedir*",
    "Listing states title is suitable for foreign buyers*":
      "İlanda tapunun yabancı alıcılara uygun olduğu belirtilmektedir*",
    "Frankedu Global provides guidance for students, families, and investors navigating university admissions, scholarships, student accommodation, and overseas property opportunities.":
      "Frankedu Global, öğrencilere, ailelere ve yatırımcılara üniversite kabulleri, burslar, öğrenci konaklaması ve yurtdışı gayrimenkul fırsatları konusunda rehberlik sunar.",
    "Clear information": "Açık bilgi",
    "We aim to provide clear information about admissions, tuition, and scholarship terms. Contact us for current details.":
      "Kabul, öğrenim ücreti ve burs koşulları hakkında açık bilgi sunmayı amaçlıyoruz. Güncel ayrıntılar için bizimle iletişime geçin.",
    "Frankedu Global provides guidance for students and families. Contact us for current admissions, tuition, and scholarship details.":
      "Frankedu Global, öğrencilere ve ailelere rehberlik sunar. Güncel kabul, öğrenim ücreti ve burs bilgileri için bizimle iletişime geçin.",
    "Company & Approach": "Şirket ve Yaklaşım",
    Brand: "Marka",
    "Customer-facing brand": "Müşterilere sunulan marka",
    Address: "Adres",
    "We help students, families, and investors explore study options, property information, and professional services.":
      "Öğrencilere, ailelere ve yatırımcılara eğitim seçeneklerini, gayrimenkul bilgilerini ve profesyonel hizmetleri incelemelerinde yardımcı oluyoruz.",
    "Personalized Guidance": "Kişiye özel danışmanlık",
    "Property information & investment options": "Gayrimenkul bilgileri ve yatırım seçenekleri",
    "Scholarships up to 100% for eligible students at Final International University (FIU)":
      "Final International University (FIU)'de uygun öğrenciler için %100'e varan burslar",
    "Scholarship opportunities up to 100% at Final International University (FIU)":
      "Final International University (FIU)'de %100'e kadar burs olanakları",
    "Scholarship-eligible (up to 100% at Final International University (FIU))":
      "Final International University (FIU)'de %100'e kadar burs olanağı",
    "Scholarship opportunities at Final International University (FIU) can be up to 100% for eligible students. Contact us for current eligibility and award details.":
      "Final International University (FIU)'de uygun öğrenciler için burslar %100'e kadar çıkabilir. Güncel uygunluk ve burs tutarları için bizimle iletişime geçin.",
    "Scholarships up to 100% for eligible students":
      "FIU'da uygun öğrenciler için %100'e varan burslar",
    "Study guidance by destination and subject": "Ülke ve bölüme göre eğitim danışmanlığı",
    "At Final International University (FIU), scholarships can be up to 100% for eligible students. Contact us for current details.":
      "Final International University (FIU)'de uygun öğrenciler için burslar %100'e kadar çıkabilir. Güncel ayrıntılar için bizimle iletişime geçin.",
    "Scholarship opportunities at FIU for eligible students":
      "FIU'da uygun öğrenciler için burs olanakları",
    "Contact us for current scholarship criteria and award details":
      "Güncel burs koşulları ve tutarları için bizimle iletişime geçin",
    "Review current tuition details before applying":
      "Başvurmadan önce güncel öğrenim ücreti ayrıntılarını inceleyin",
    "FIU scholarship range": "FIU burs aralığı",
    "FIU scholarships up to 100% for eligible students":
      "FIU'da uygun öğrenciler için %100'e varan burslar",
    "Contact advisor for current tuition information":
      "Güncel öğrenim ücreti bilgileri için danışmana ulaşın",
    "Student dormitories and rentals near campus, kept strictly separate from investment property.":
      "Kampüs yakınındaki öğrenci yurtları ve kiralık konutlar, yatırım amaçlı gayrimenkullerden ayrı tutulur.",
  },
  fr: {
    Universities: "Universités",
    Countries: "Pays",
    Scholarships: "Bourses",
    Services: "Services",
    Marketplace: "Marché",
    About: "À propos",
    Contact: "Contact",
    Login: "Connexion",
    "Sign Up": "Créer un compte",
    "Main navigation": "Navigation principale",
    "Language / Dil": "Langue / Dil",
    "Mobile navigation": "Navigation mobile",
    "Open menu": "Ouvrir le menu",
    "Close menu": "Fermer le menu",
    "Start Application": "Commencer une candidature",
    "Chat on WhatsApp": "Écrire sur WhatsApp",
    "Student Dashboard Preview →": "Aperçu du tableau de bord étudiant →",
    "Study Pathways": "Parcours d’études",
    "Services & Living": "Services et logement",
    Company: "Entreprise",
    "Institution names and locations; admissions details on request":
      "Noms et lieux des établissements ; renseignements sur les admissions sur demande",
    "Programme listings appear after their details are confirmed":
      "Les formations seront publiées après confirmation de leurs informations",
    "Browse destinations and ask about current study options":
      "Consultez les destinations et renseignez-vous sur les possibilités d’études actuelles",
    "Current award details are not published": "Aucun détail actuel sur les bourses n’est publié",
    "Study, property, and digital-service enquiries":
      "Demandes concernant les études, l’immobilier et les services numériques",
    "No marketplace listings are currently published":
      "Aucune annonce de marché n’est publiée actuellement",
    "No accommodation listings are currently published":
      "Aucune annonce de logement n’est publiée actuellement",
    "Ask about the property listing shown on this site":
      "Renseignez-vous sur le bien présenté sur ce site",
    "Our approach and contact information": "Notre approche et nos coordonnées",
    "Send us a WhatsApp or email enquiry": "Écrivez-nous sur WhatsApp ou par e-mail",
    "Information on study options, property listings, and digital services.":
      "Informations sur les études, les annonces immobilières et les services numériques.",
    "Ask us to confirm current details before making a decision.":
      "Demandez-nous de confirmer les informations actuelles avant de prendre une décision.",
    "Message Frankedu Global to ask about study information, property listings, or digital services.":
      "Écrivez à Frankedu Global sur WhatsApp pour demander des informations sur les études, les annonces immobilières ou les services numériques.",
    "Education • Property • Digital Services": "Études • Immobilier • Services numériques",
    "Clear information for": "Des informations claires pour",
    "your next decision.": "votre prochaine décision.",
    "Study options • Property information • Digital services":
      "Études • Informations immobilières • Services numériques",
    "Frankedu Global helps students, families, and clients ask informed questions about study options, property information, and digital services.":
      "Frankedu Global aide les étudiants, les familles et les clients à poser des questions éclairées sur les études, l’immobilier et les services numériques.",
    "Straightforward enquiries": "Des demandes en toute simplicité",
    "Study options • Property information": "Études • Informations immobilières",
    "Study, property, and digital enquiries.":
      "Demandes sur les études, l’immobilier et le numérique.",
    "Ask us about current study information, property details, or digital services. We will confirm what is available.":
      "Renseignez-vous sur les études, les biens immobiliers ou les services numériques. Nous confirmerons les options disponibles.",
    "Study information": "Informations sur les études",
    "Ask about current admissions information and study options. Final International University (FIU) is the only confirmed recruitment relationship.":
      "Renseignez-vous sur les admissions et les études. Final International University (FIU) est la seule relation de recrutement confirmée dans le contexte du projet.",
    "Current programmes and entry requirements need confirmation":
      "Les formations et conditions d’admission actuelles doivent être confirmées",
    "Fees, scholarship terms, and intakes may change":
      "Les frais, conditions de bourse et périodes d’admission peuvent changer",
    "Check visa requirements with the relevant authorities":
      "Vérifiez les exigences de visa auprès des autorités compétentes",
    "Property information": "Informations immobilières",
    "Ask about the property listing shown on this site. Availability, price, and particulars need current confirmation.":
      "Renseignez-vous sur le bien présenté sur ce site. Sa disponibilité, son prix et ses caractéristiques doivent être confirmés.",
    "Current availability on enquiry": "Disponibilité actuelle à confirmer sur demande",
    "Details should be confirmed before proceeding":
      "Les détails doivent être confirmés avant toute démarche",
    "Independent advice may be appropriate": "Un avis indépendant peut être utile",
    "Digital services": "Services numériques",
    "Digital Services": "Services numériques",
    "Study Options & Admissions Enquiries": "Études et demandes d’admission",
    "Discuss your study plans and ask about current admissions information. Final International University (FIU) is the only confirmed recruitment relationship.":
      "Discutez de votre projet d’études et renseignez-vous sur les admissions actuelles. Final International University (FIU) est la seule relation de recrutement confirmée dans le contexte du projet.",
    "Available programmes, fees, and entry requirements need confirmation from the institution.":
      "Les formations, frais et conditions d’admission disponibles doivent être confirmés par l’établissement.",
    "Visa and immigration requirements should be checked with the relevant authorities.":
      "Vérifiez les exigences de visa et d’immigration auprès des autorités compétentes.",
    "Property Information": "Informations immobilières",
    "Contact us to ask about property information and any current listing details.":
      "Contactez-nous pour vous renseigner sur les biens et les annonces actuelles.",
    "Availability and pricing should be confirmed for each listing.":
      "La disponibilité et le prix doivent être confirmés pour chaque annonce.",
    "Property details should be reviewed independently before making a decision.":
      "Les informations sur le bien doivent être vérifiées indépendamment avant toute décision.",
    "Contact us to discuss your digital service requirements.":
      "Contactez-nous pour discuter de vos besoins en services numériques.",
    "Scope, availability, and pricing are discussed per enquiry.":
      "Le périmètre, la disponibilité et le prix sont discutés pour chaque demande.",
    "Sarcon №87 Property Listing": "Annonce immobilière Sarcon №87",
    "Sarcon №87 Property Listing | Frankedu Global":
      "Annonce immobilière Sarcon №87 | Frankedu Global",
    "Sarcon №87 · Enquiry": "Sarcon №87 · Renseignements",
    "View photographs associated with the Sarcon №87 property listing and contact Frankedu Global to ask about current details.":
      "Consultez les photographies associées à l’annonce immobilière Sarcon №87 et contactez Frankedu Global pour connaître les informations actuelles.",
    "Price details not published": "Informations sur le prix non publiées",
    "Photograph associated with the Sarcon №87 property listing.":
      "Photographie associée à l’annonce immobilière Sarcon №87.",
    "This page shows photographs associated with the Sarcon №87 property listing. Contact us to ask about its current details.":
      "Cette page présente des photographies associées à l’annonce immobilière Sarcon №87. Contactez-nous pour demander les informations actuelles.",
    "Property particulars, price, location, and availability need confirmation before proceeding.":
      "Les caractéristiques, le prix, le lieu et la disponibilité doivent être confirmés avant toute démarche.",
    "Photographs available": "Photographies disponibles",
    "Confirm current availability": "Confirmer la disponibilité actuelle",
    "Frankedu Global shares information about study options, property, and digital services. Contact us to ask what is currently available.":
      "Frankedu Global partage des informations sur les études, l’immobilier et les services numériques. Contactez-nous pour connaître les options actuelles.",
    "Admissions, fees, availability, and other details can change. Ask us to confirm current information before making a decision.":
      "Les admissions, frais, disponibilités et autres informations peuvent changer. Demandez confirmation avant toute décision.",
    "No assumed details": "Aucune supposition",
    "We distinguish confirmed information from details that still need to be checked.":
      "Nous distinguons les informations confirmées de celles qui restent à vérifier.",
    "A clear next step": "Une prochaine étape claire",
    "Contact us with your question and we will discuss the information or service you are looking for.":
      "Contactez-nous avec votre question pour discuter des informations ou du service recherché.",
    "Contact us to discuss a digital service request.":
      "Contactez-nous pour discuter de votre demande de service numérique.",
    "Scope and availability confirmed per enquiry":
      "Le périmètre et la disponibilité sont confirmés pour chaque demande",
    "Pricing discussed before work begins": "Le prix est convenu avant le début du travail",
    "Study destinations.": "Destinations d’études.",
    "Browse destinations listed on this site. Current programmes, admissions, costs, and dates vary; contact us to ask about specific options.":
      "Consultez les destinations présentées sur ce site. Les formations, admissions, coûts et dates varient ; contactez-nous pour connaître les options précises.",
    "Property listing.": "Annonce immobilière.",
    "One property listing is shown here. Ask us to confirm its current availability and details.":
      "Une annonce immobilière est présentée ici. Demandez-nous de confirmer sa disponibilité et ses détails actuels.",
    "Listing information may change. Confirm current details before making a decision.":
      "Les informations de l’annonce peuvent changer. Confirmez les détails actuels avant de prendre une décision.",
    "Have a question about your next step?": "Une question sur votre prochaine étape ?",
    "Contact Frankedu Global to discuss study information, a property listing, or digital services.":
      "Contactez Frankedu Global pour parler d’études, d’une annonce immobilière ou de services numériques.",
    "University directory": "Répertoire des universités",
    "Browse institutions by destination. Final International University (FIU) is the only confirmed recruitment relationship; contact us about current admissions details.":
      "Consultez les établissements par destination. Final International University (FIU) est la seule relation de recrutement confirmée dans le contexte du projet ; contactez-nous pour connaître les admissions actuelles.",
    "Destinations to ask about.": "Destinations sur lesquelles vous renseigner.",
    "Browse the destinations listed here. Contact us to ask about current study options; programmes, fees, and dates are not listed until confirmed.":
      "Consultez les destinations présentées ici. Contactez-nous pour connaître les études possibles ; les formations, frais et dates ne sont publiés qu’après confirmation.",
    "Ask about options": "Demander des renseignements",
    "No current scholarship details are published. Contact us to ask about information confirmed by the institution.":
      "Aucun détail actuel sur les bourses n’est publié. Contactez-nous pour demander des informations confirmées par l’établissement.",
    "No current scholarship listings": "Aucune annonce de bourse actuelle",
    "Award amounts, eligibility, and deadlines need current confirmation before they can be published.":
      "Les montants, critères d’admissibilité et dates limites doivent être confirmés avant publication.",
    "How we can help": "Comment nous pouvons vous aider",
    "Ask about study information, property details, or digital services. Scope and availability are confirmed per enquiry.":
      "Renseignez-vous sur les études, l’immobilier ou les services numériques. Le périmètre et la disponibilité sont confirmés pour chaque demande.",
    "About Frankedu Global": "À propos de Frankedu Global",
    "Study and property information": "Informations sur les études et l’immobilier",
    "What we do": "Notre activité",
    "Clear information for your next decision.":
      "Des informations claires pour votre prochaine décision.",
    "We share study information and property details, and discuss digital-service enquiries. Ask us to confirm what is currently available.":
      "Nous partageons des informations sur les études et l’immobilier, et discutons des demandes de services numériques. Contactez-nous pour confirmer les options actuelles.",
    "Message us on WhatsApp or prepare an email using the form below.":
      "Écrivez-nous sur WhatsApp ou préparez un e-mail à l’aide du formulaire ci-dessous.",
    "Tell us what you would like to ask": "Indiquez votre question",
    "Housing and property enquiries.": "Demandes sur le logement et l’immobilier.",
    "Browse the available sections below. Listings are shown only when current details are available.":
      "Consultez les rubriques ci-dessous. Les annonces ne sont affichées que lorsque leurs informations actuelles sont disponibles.",
    "Ask us whether current accommodation information is available.":
      "Demandez-nous si des informations actuelles sur le logement sont disponibles.",
    "Ask about accommodation →": "Se renseigner sur le logement →",
    "View the property listing and ask us to confirm its current details.":
      "Consultez l’annonce immobilière et demandez-nous d’en confirmer les détails actuels.",
    "View property information →": "Voir les informations immobilières →",
    "No current listings": "Aucune annonce actuelle",
    "There are no marketplace listings published at this time. Contact us to ask about current options.":
      "Aucune annonce de marché n’est publiée actuellement. Contactez-nous pour connaître les options disponibles.",
    "No marketplace listings": "Aucune annonce de produits disponible",
    "No marketplace product listings are published at this time. Use the Real Estate section above to view the separate property listing.":
      "Aucune annonce de produits n’est publiée pour le moment. Consultez la section Immobilier ci-dessus pour voir l’annonce immobilière distincte.",
    "Accommodation enquiries": "Demandes sur le logement",
    "No accommodation listings are currently published. Contact us to ask whether current information is available.":
      "Aucune annonce de logement n’est publiée actuellement. Contactez-nous pour savoir si des informations sont disponibles.",
    "Ask about availability": "Se renseigner sur la disponibilité",
    "One property listing is shown here. Contact us to confirm its current availability and details.":
      "Une annonce immobilière est présentée ici. Contactez-nous pour confirmer sa disponibilité et ses détails actuels.",
    "Ask about this listing": "Se renseigner sur cette annonce",
    "This property listing is not available. Contact us if you need assistance.":
      "Cette annonce immobilière n’est pas disponible. Contactez-nous si vous avez besoin d’aide.",
    "Ask us to confirm current availability and property details before proceeding.":
      "Demandez-nous de confirmer la disponibilité et les détails du bien avant toute démarche.",
    "Listing information": "Informations sur l’annonce",
    "Property listing": "Annonce immobilière",
    "Contact us to ask about current availability, property details, and viewing arrangements.":
      "Contactez-nous pour connaître la disponibilité, les détails du bien et les modalités de visite.",
    "Before proceeding": "Avant toute démarche",
    "Confirm the property particulars and seek independent professional advice before making a decision.":
      "Confirmez les caractéristiques du bien et demandez un avis professionnel indépendant avant toute décision.",
    "Compare English-taught programmes": "Comparer les formations en anglais",
    "Compare countries, visas & intakes": "Comparer les pays, visas et périodes d’admission",
    "Scholarship information": "Informations sur les bourses",
    "Intake planning, visa & arrival support": "Planification, visa et accompagnement à l’arrivée",
    "Student essentials & trusted community listings":
      "Services étudiants et annonces communautaires",
    "Dorms & apartments near campus": "Résidences et appartements près du campus",
    "Property purchases & rentals": "Achats et locations immobiliers",
    "Our mission, team & personal guidance":
      "Notre mission, notre équipe et un accompagnement personnalisé",
    "Message our advisory team": "Écrire à notre équipe de conseil",
    "Clear guidance for students choosing where — and how — to study abroad.":
      "Des conseils clairs pour choisir où et comment étudier à l’étranger.",
    Explore: "Découvrir",
    Students: "Étudiants",
    "Start an application": "Commencer une candidature",
    "Student dashboard": "Espace étudiant",
    Accommodation: "Logement",
    "Real Estate": "Immobilier",
    "All rights reserved.": "Tous droits réservés.",
    Home: "Accueil",
    "Verified listing": "Annonce vérifiée",
    "Template — verify before publishing": "Modèle — à vérifier avant publication",
    "Apply Now": "Postuler",
    Close: "Fermer",
    "Ask a question": "Poser une question",
    Enquire: "Demander des renseignements",
    Reserve: "Réserver",
    "Request details": "Demander des détails",
    "View Details": "Voir les détails",
    "Ask us for current admissions information for this institution.":
      "Contactez-nous pour obtenir les informations actuelles sur les admissions de cet établissement.",
    "Contact us to ask about current study options.":
      "Contactez-nous pour vous renseigner sur les possibilités d’études actuelles.",
    "Contact us for current intake information":
      "Contactez-nous pour connaître les périodes d’admission actuelles.",
    "United States": "États-Unis",
    Available: "Disponible",
    "Degree level": "Niveau du diplôme",
    Courses: "Formations",
    "Tuition fee": "Frais de scolarité",
    Intake: "Période d’admission",
    "Application fee": "Frais de candidature",
    "Scholarship availability": "Bourses disponibles",
    Duration: "Durée",
    Tuition: "Frais de scolarité",
    Language: "Langue",
    "Talk to Frankedu": "Parler à Frankedu",
    "Not sure where to start?": "Vous ne savez pas par où commencer ?",
    "Let’s make a plan.": "Établissons un plan ensemble.",
    "Page not found": "Page introuvable",
    "The page you're looking for doesn't exist or has been moved.":
      "La page recherchée n’existe pas ou a été déplacée.",
    "This page didn't load": "Cette page ne s’est pas chargée",
    "Try again": "Réessayer",
    "Go home": "Retour à l’accueil",
    "Education • Real Estate • Creative • Beyond": "Études • Immobilier • Création • Et plus",
    "Your Future.": "Votre avenir.",
    "Study Abroad • Invest in Property • Build Your Brand • Live Better":
      "Étudier à l’étranger • Investir • Développer sa marque • Mieux vivre",
    "Study destination": "Destination d’études",
    "Course or subject": "Formation ou domaine",
    "Find Universities": "Trouver des universités",
    "Verified Global Guidance": "Conseils internationaux vérifiés",
    "Our Services": "Nos services",
    "One Global Brand. Multiple Opportunities.": "Une marque mondiale. De nombreuses possibilités.",
    "Explore All Services": "Découvrir tous les services",
    "Education & Admissions": "Études et admissions",
    "Browse Universities": "Parcourir les universités",
    "Properties & Investment": "Immobilier et investissement",
    "Verified homes & investment assets": "Biens et investissements vérifiés",
    "Explore Properties": "Découvrir les biens",
    "Creative & Digital": "Création et numérique",
    "Brand identity, web & media": "Identité de marque, web et médias",
    "Get a Quote": "Demander un devis",
    "Study & Living Destinations": "Destinations d’études et de vie",
    "Popular Destinations.": "Destinations populaires.",
    "View All Destinations": "Voir toutes les destinations",
    "Study • Invest • Live": "Étudier • Investir • Vivre",
    "Institutions & Pathways": "Établissements et parcours",
    "Browse All Universities": "Voir toutes les universités",
    "Real Estate Opportunities": "Opportunités immobilières",
    "Featured Properties.": "Biens à la une.",
    "Explore All Properties": "Voir tous les biens",
    "Start Today": "Commencez aujourd’hui",
    "Let's Build Your Future Together.": "Construisons votre avenir ensemble.",
    "Book a Consultation": "Prendre rendez-vous",
    "Find the right university.": "Trouvez l’université qui vous convient.",
    Destination: "Destination",
    "All destinations": "Toutes les destinations",
    Subject: "Domaine",
    "All subjects": "Tous les domaines",
    Clear: "Effacer",
    "university found": "université trouvée",
    "universities found": "universités trouvées",
    "Turn your ambitions into a study plan.": "Faites de vos ambitions un projet d’études concret.",
    "Study options at": "Options d’études à",
    "Filter by field, study level, and university. Programme listings appear here once details are confirmed; contact us to discuss current study options.":
      "Filtrez par domaine, niveau d’études et université. Les formations seront publiées ici une fois leurs informations confirmées ; contactez-nous pour discuter des options actuelles.",
    "Field of Study": "Domaine d’études",
    "Study Level": "Niveau d’études",
    "No verified programme listings yet": "Aucune formation vérifiée n’est encore publiée",
    "We have not published programme listings because their details have not been confirmed. Contact us to discuss current study options.":
      "Nous n’avons pas encore publié de formations, car leurs informations n’ont pas été confirmées. Contactez-nous pour discuter des options actuelles.",
    Level: "Niveau",
    "All levels": "Tous les niveaux",
    University: "Université",
    "All universities": "Toutes les universités",
    Foundation: "Année préparatoire",
    "Bachelor's": "Licence",
    "Master's": "Master",
    PhD: "Doctorat",
    "Study destinations": "Destinations d’études",
    "Choose where your degree takes you.": "Choisissez la destination de vos études.",
    Intakes: "Périodes d’admission",
    "Tuition range": "Fourchette des frais",
    "View universities": "Voir les universités",
    Amount: "Montant",
    Deadline: "Date limite",
    "Apply with support": "Postuler avec accompagnement",
    "Check eligibility": "Vérifier l’éligibilité",
    "Student support": "Accompagnement étudiant",
    "Support for every part of your next step.": "Un accompagnement à chaque étape.",
    "Start your application": "Commencer votre candidature",
    Step: "Étape",
    "Everything you need to settle in.": "Tout pour bien vous installer.",
    Housing: "Logement",
    Property: "Immobilier",
    All: "Tout",
    "A place to live before you land.": "Un logement prêt avant votre arrivée.",
    "Back to marketplace": "Retour au marché",
    "Property Listing Not Found": "Annonce immobilière introuvable",
    "Back to Real Estate Listings": "Retour aux annonces immobilières",
    "Enquire on WhatsApp": "Demander sur WhatsApp",
    "All properties": "Tous les biens",
    "Foreign national eligible*": "Éligible aux ressortissants étrangers*",
    "Expand photo in fullscreen": "Agrandir la photo en plein écran",
    "Previous photo": "Photo précédente",
    "Next photo": "Photo suivante",
    Photo: "Photo",
    "Select photo:": "Sélectionner la photo :",
    "Verified Property Highlights": "Caractéristiques vérifiées du bien",
    "Buyer & Title Eligibility Notice": "Avis sur l’éligibilité de l’acheteur et du titre",
    "Verified Listing": "Annonce vérifiée",
    "Key Information": "Informations principales",
    Reference: "Référence",
    "Property type": "Type de bien",
    Location: "Emplacement",
    "Map location": "Emplacement sur la carte",
    "Supplied upon enquiry": "Fourni sur demande",
    Status: "Statut",
    Pricing: "Prix",
    "Buyer eligibility": "Éligibilité de l’acheteur",
    "Arrange a Viewing": "Organiser une visite",
    "Official Advisory Support": "Accompagnement conseil",
    "Close photo preview": "Fermer l’aperçu photo",
    Application: "Candidature",
    "Start your application.": "Commencez votre candidature.",
    "Applying to": "Candidature auprès de",
    "Your details": "Vos coordonnées",
    "Study plan": "Projet d’études",
    Documents: "Documents",
    Review: "Vérification",
    "Full name": "Nom complet",
    "Email address": "Adresse e-mail",
    "Phone / WhatsApp number": "Téléphone / numéro WhatsApp",
    Nationality: "Nationalité",
    "University (optional)": "Université (facultatif)",
    "Programme (optional)": "Formation (facultatif)",
    "Preferred intake": "Période souhaitée",
    "January 2027": "Janvier 2027",
    "February 2027": "Février 2027",
    "Passport copy": "Copie du passeport",
    "Academic transcripts": "Relevés de notes",
    "English proficiency proof": "Justificatif de niveau d’anglais",
    "Statement of purpose": "Lettre de motivation",
    "No documents are uploaded or sent in this step.":
      "Aucun document n’est téléversé ni envoyé à cette étape.",
    Name: "Nom",
    Programme: "Formation",
    "Programme level": "Niveau de formation",
    Back: "Retour",
    Continue: "Continuer",
    "Continue to WhatsApp": "Continuer sur WhatsApp",
    "Student Preview": "Aperçu étudiant",
    "Prototype Preview — Demonstration Only": "Aperçu de prototype — démonstration uniquement",
    "Applicant Dashboard Preview": "Aperçu du tableau de bord candidat",
    "New application": "Nouvelle candidature",
    Applications: "Candidatures",
    complete: "terminé",
    "Saved universities": "Universités enregistrées",
    "Document checklist": "Liste des documents",
    Account: "Compte",
    "Welcome back": "Bon retour",
    Password: "Mot de passe",
    "Forgot password?": "Mot de passe oublié ?",
    "Create your account": "Créer votre compte",
    "Create account (integration ready)": "Créer un compte (intégration prête)",
    "Frank guidance for global study.": "Des conseils francs pour étudier dans le monde entier.",
    "Company & Heritage": "Entreprise et histoire",
    "Personal, transparent guidance from day one.":
      "Un accompagnement personnalisé et transparent dès le premier jour.",
    Established: "Création",
    "How we work": "Notre méthode",
    "What you can expect.": "À quoi vous attendre.",
    Team: "Équipe",
    "People behind the plan.": "Les personnes derrière votre projet.",
    "Let’s talk about your next step.": "Parlons de votre prochaine étape.",
    "Social Channels": "Réseaux sociaux",
    "Preferred destination": "Destination souhaitée",
    "Tell us about your study plans": "Parlez-nous de votre projet d’études",
    "Continue in email": "Continuer par e-mail",
    Breadcrumb: "Fil d’Ariane",
    "Photo Gallery Lightbox": "Galerie photo",
    "Switch to English": "Passer en anglais",
    "Türkçe diline geç": "Passer en turc",
    "English / French / Swahili": "Anglais / français / swahili",
    "Explore Programmes": "Découvrir les formations",
    "Student Dashboard Preview": "Aperçu de l’espace étudiant",
    "Something went wrong on our end. You can try refreshing or head back home.":
      "Une erreur s’est produite. Réessayez ou retournez à l’accueil.",
    "Message Frankedu Global to discuss countries, courses, scholarships, tuition, and your application pathway.":
      "Écrivez à Frankedu Global pour parler des pays, formations, bourses, frais et de votre candidature.",
    "We connect students, families, and investors to verified global opportunities through world-class university admissions, trusted property advisory, and professional services.":
      "Nous accompagnons étudiants, familles et investisseurs vers des possibilités internationales vérifiées, des admissions universitaires et des services professionnels.",
    "Education, real estate, creative services, and property care — all delivered under one trusted name.":
      "Études, immobilier, création et entretien de biens réunis sous une même marque de confiance.",
    "End-to-end guidance matching your academic background and aspirations with verified institutions worldwide.":
      "Un accompagnement complet pour rapprocher votre parcours et vos objectifs d’établissements vérifiés dans le monde entier.",
    "University Admissions & Matching": "Admissions universitaires et choix de formation",
    "Scholarships up to 100%*": "Bourses pouvant atteindre 100 %*",
    "Visa Guidance & Interview Prep": "Conseils sur les visas et préparation aux entretiens",
    "Student Dorms & Accommodation": "Résidences et logements étudiants",
    "Airport Pickup & Arrival Reception": "Accueil à l’aéroport et arrivée",
    "Strategic property acquisition, design-refurbished villas, and coastal residences across North Cyprus, UK, and UAE.":
      "Acquisition immobilière, villas rénovées et résidences côtières à Chypre du Nord, au Royaume-Uni et aux Émirats arabes unis.",
    "North Cyprus Residential Villas": "Villas résidentielles à Chypre du Nord",
    "Seafront Resort Residences": "Résidences en bord de mer",
    "Property Acquisition Advisory": "Conseil en acquisition immobilière",
    "UK & Dubai Opportunities": "Possibilités au Royaume-Uni et à Dubaï",
    "Brand development, bespoke websites, student portfolio polish, and creative digital solutions by Frankedu.":
      "Développement de marque, sites web sur mesure, portfolios étudiants et solutions numériques créatives par Frankedu.",
    "Brand Identity & Logo Design": "Identité de marque et création de logo",
    "Modern Website Development": "Création de sites web modernes",
    "Academic CV & Portfolio Polish": "Amélioration de CV universitaire et de portfolio",
    "Social & Digital Marketing": "Marketing social et numérique",
    "Creative Media Solutions": "Solutions de médias créatifs",
    "Professional residential cleaning, student move-in preparation, and dependable property care services in North Cyprus.":
      "Nettoyage résidentiel, préparation à l’installation des étudiants et entretien fiable de biens à Chypre du Nord.",
    "Move-in & Move-out Turnover Cleaning": "Nettoyage lors des entrées et sorties",
    "Student Apartment Refresh": "Remise en état d’appartements étudiants",
    "Residential & Commercial Care": "Entretien résidentiel et commercial",
    "Flexible Service Scheduling": "Horaires de service flexibles",
    "Local On-the-Ground Team": "Équipe locale sur place",
    "Explore high-demand study hubs and receive verified guidance based on your academic goals, budget, and preferred intake.":
      "Découvrez des destinations d’études prisées et recevez des conseils vérifiés selon vos objectifs, votre budget et la période souhaitée.",
    "Straightforward guidance from your shortlist to your arrival plans — with every requirement clearly explained.":
      "Un accompagnement clair, de votre sélection d’établissements à votre arrivée, avec chaque exigence expliquée.",
    "Housing, essentials and trusted services from the Frankedu community.":
      "Logements, articles essentiels et services de confiance de la communauté Frankedu.",
    "Verified student housing options near campus, managed separately from property investments.":
      "Logements étudiants vérifiés près du campus, gérés séparément des investissements immobiliers.",
    "Curated opportunities across North Cyprus, the UK, and selected Dubai/UAE markets. Student accommodation is managed separately.":
      "Possibilités sélectionnées à Chypre du Nord, au Royaume-Uni et sur certains marchés de Dubaï/EAU. Les logements étudiants sont gérés séparément.",
    "A design-refurbished villa prepared for resale in North Cyprus. Complete verified property photography and viewing assistance available.":
      "Villa rénovée avec une approche axée sur le design, proposée à la revente à Chypre du Nord. Photographies vérifiées et aide à la visite disponibles.",
    "Frankedu Global provides direct assistance for property viewing, map location verification, and purchase coordination in North Cyprus.":
      "Frankedu Global accompagne directement les visites, la vérification de l’emplacement et la coordination d’achat à Chypre du Nord.",
    "Independent conveyancing recommended for all real estate transactions. Contact our team for verified information and assistance.":
      "Un conseil juridique indépendant est recommandé pour toute transaction immobilière. Contactez notre équipe pour obtenir des informations vérifiées.",
    "A beautifully renovated villa finished with a design-led approach and prepared for resale. This property is suitable for buyers looking for a refreshed home or investment opportunity in North Cyprus.":
      "Une villa rénovée avec soin, préparée pour la revente. Ce bien peut intéresser les acheteurs recherchant une maison remise à neuf ou une possibilité d’investissement à Chypre du Nord.",
    "Full property photographs and the exact map location are available upon request. Contact Frankedu Global for viewing arrangements and dedicated purchasing assistance.":
      "Les photos complètes et l’emplacement exact sont disponibles sur demande. Contactez Frankedu Global pour organiser une visite et obtenir un accompagnement à l’achat.",
    "Renovated and design-refurbished villa": "Villa rénovée et réaménagée par un designer",
    "North Cyprus location": "Emplacement à Chypre du Nord",
    "Full property photo gallery available": "Galerie complète de photos disponible",
    "Viewing and purchase assistance available": "Aide à la visite et à l’achat disponible",
    "Contact advisor for verified fee schedules": "Contactez un conseiller pour les frais vérifiés",
    "Contact advisor for intake schedules": "Contactez un conseiller pour les périodes d’admission",
    "Inquire for current opportunities": "Renseignez-vous sur les possibilités actuelles",
    "Inquire for details": "Renseignez-vous pour plus de détails",
    "Immediate / For sale": "Immédiatement / à vendre",
    "Residential, Off-Plan & Investment": "Résidentiel, sur plan et investissement",
    "Selected Investment Opportunities": "Possibilités d’investissement sélectionnées",
    "Up to 100% for eligible students": "Jusqu’à 100 % pour les étudiants admissibles",
    "Undergraduate & Postgraduate": "Premier et deuxième cycles",
    "Contact advisor": "Contacter un conseiller",
    "Merit-based waivers and institutional awards available across supported destinations. Assessed upon academic profile review.":
      "Des exonérations au mérite et des bourses institutionnelles sont possibles dans les destinations couvertes, après examen du dossier scolaire.",
    "Business & Management": "Commerce et gestion",
    "Engineering & Technology": "Ingénierie et technologie",
    "Computer Science & IT": "Informatique et technologies de l’information",
    "Health Sciences & Nursing": "Sciences de la santé et soins infirmiers",
    "Law & International Relations": "Droit et relations internationales",
    "Hospitality & Tourism": "Hôtellerie et tourisme",
    "Architecture & Fine Arts": "Architecture et beaux-arts",
    "Social Sciences & Humanities": "Sciences sociales et humaines",
    "University Admissions & Programme Matching": "Admissions universitaires et choix de formation",
    "End-to-end guidance matching your academic background and aspirations with verified institutions.":
      "Un accompagnement complet pour rapprocher votre parcours et vos objectifs d’établissements vérifiés.",
    "Programme matching across 9+ supported destinations":
      "Choix de formations dans plus de 9 destinations couvertes",
    "Document readiness & academic credential check":
      "Préparation des documents et vérification des diplômes",
    "Official portal submission & offer letter follow-up":
      "Dépôt sur le portail officiel et suivi de la lettre d’offre",
    "Scholarships & Financial Guidance": "Bourses et conseils financiers",
    "Merit and country-quota matching": "Sélection selon le mérite et les quotas nationaux",
    "Transparent fee planning before you commit":
      "Planification transparente des frais avant tout engagement",
    "Student Visa Guidance & Interview Prep":
      "Conseils sur les visas étudiants et préparation aux entretiens",
    "Structured support to prepare a compliant student visa application with proper documentation.":
      "Accompagnement structuré pour préparer une demande de visa étudiant conforme et complète.",
    "Financial evidence and sponsorship checklist":
      "Liste des justificatifs financiers et de parrainage",
    "Embassy and consular interview preparation": "Préparation aux entretiens consulaires",
    "Visa submission timing & appointment advice":
      "Conseils sur le dépôt du visa et les rendez-vous",
    "Student Accommodation & Relocation": "Logement étudiant et installation",
    "Verified student dormitories and rentals near campus, kept strictly separate from investment property.":
      "Résidences et locations étudiantes vérifiées près du campus, distinctes des biens d’investissement.",
    "On-campus and off-campus student housing options": "Logements étudiants sur et hors campus",
    "Airport pickup and meet-and-greet reception": "Accueil à l’aéroport et transfert",
    "Local SIM card & bank account onboarding":
      "Aide pour la carte SIM locale et le compte bancaire",
    "Property & Investment Advisory": "Conseil immobilier et investissement",
    "Strategic property acquisition, rentals, and capital growth advisory across our primary markets.":
      "Conseils en acquisition, location et valorisation immobilières sur nos principaux marchés.",
    "Career Support & Digital Services": "Accompagnement professionnel et services numériques",
    "Guidance for post-study career opportunities alongside creative branding and digital design solutions.":
      "Conseils sur les possibilités professionnelles après les études et solutions créatives de marque et de design numérique.",
    "Post-study work route insights across key destinations":
      "Informations sur les voies de travail après les études dans les principales destinations",
    "Professional CV and application profile review":
      "Révision professionnelle du CV et du profil de candidature",
    "Graphic, web design & branding solutions by Frankedu":
      "Solutions graphiques, web et de marque par Frankedu",
    "Cyprus / North Cyprus": "Chypre / Chypre du Nord",
    "North America": "Amérique du Nord",
    "United Kingdom": "Royaume-Uni",
    "Europe / Mediterranean": "Europe / Méditerranée",
    "Europe / Nordic": "Europe / pays nordiques",
    Oceania: "Océanie",
    China: "Chine",
    Canada: "Canada",
    Germany: "Allemagne",
    Poland: "Pologne",
    Finland: "Finlande",
    Netherlands: "Pays-Bas",
    Australia: "Australie",
    "Inquire for current intakes": "Renseignez-vous sur les périodes d’admission actuelles",
    "Inquire for current intake cycles": "Renseignez-vous sur les périodes d’admission actuelles",
    "Inquire for semester rates": "Renseignez-vous sur les tarifs semestriels",
    "Inquire for availability": "Renseignez-vous sur les disponibilités",
    "Utilities included": "Charges comprises",
    "Campus security": "Sécurité du campus",
    "High-speed Wi-Fi": "Wi-Fi haut débit",
    "Fully furnished": "Entièrement meublé",
    "Walking distance to transit": "À distance de marche des transports",
    "Dedicated study space": "Espace de travail dédié",
    "Self-contained kitchen": "Cuisine indépendante",
    "Air conditioning": "Climatisation",
    "Private balcony": "Balcon privé",
    "Safe residential setting": "Quartier résidentiel sûr",
    "Furnished bedroom": "Chambre meublée",
    "Local community immersion": "Immersion dans la communauté locale",
    "On-campus student residence": "Résidence étudiante sur le campus",
    "Shared student apartment": "Appartement étudiant partagé",
    "Private student studio apartment": "Studio étudiant privé",
    "Student homestay & residential accommodation": "Hébergement étudiant chez l’habitant",
    Dormitory: "Résidence étudiante",
    "Shared flat": "Appartement partagé",
    Apartment: "Appartement",
    Homestay: "Famille d’accueil",
    "Campus vicinity, North Cyprus": "Près du campus, Chypre du Nord",
    "Student quarter, North Cyprus": "Quartier étudiant, Chypre du Nord",
    "City centre, North Cyprus": "Centre-ville, Chypre du Nord",
    "Residential area, North Cyprus": "Quartier résidentiel, Chypre du Nord",
    "Local SIM & student banking onboarding":
      "Accompagnement pour carte SIM locale et banque étudiante",
    "Lefkoşa & Girne": "Lefkoşa et Girne",
    "North Cyprus": "Chypre du Nord",
    "Dubai / UAE": "Dubaï / Émirats arabes unis",
    "Price on inquiry": "Prix sur demande",
    "Sarcon №87 · For Sale": "Sarcon №87 · À vendre",
    "Renovated / design-refurbished villa": "Villa rénovée et réaménagée",
    "For sale": "À vendre",
    "Exact map location supplied upon enquiry": "Emplacement exact communiqué sur demande",
    "Sample Applicant (Prototype Preview)": "Candidat de démonstration (aperçu du prototype)",
    "Sample Programme Application (Prototype Preview)":
      "Candidature de démonstration (aperçu du prototype)",
    "International Applicant": "Candidat international",
    "Upcoming Intake": "Prochaine période d’admission",
    "Under review": "En cours d’examen",
    "Financial evidence": "Justificatif financier",
    "Frank & transparent": "Franc et transparent",
    "Honest, realistic advice regarding admissions criteria, visa regulations, and living costs — with no overselling.":
      "Des conseils honnêtes et réalistes sur les admissions, les visas et le coût de la vie, sans promesses exagérées.",
    "Comprehensive support": "Accompagnement complet",
    "From programme matching and visa preparation to arrival reception, accommodation, and property investment guidance.":
      "Du choix de formation à la préparation du visa, l’accueil, le logement et les conseils en investissement immobilier.",
    "Supported destinations": "Destinations couvertes",
    "Scholarship range": "Montant des bourses",
    "Up to 100%": "Jusqu’à 100 %",
    "Inquire upon booking": "Renseignez-vous lors de la réservation",
    "Ercan / Larnaca Airport": "Aéroports d’Ercan / Larnaca",
    "Airport pickup & meet-and-greet": "Accueil et transfert depuis l’aéroport",
    "Campus & city orientation walk": "Visite d’orientation du campus et de la ville",
    "Orientation covering campus facilities, public transit, supermarkets, and student amenities.":
      "Présentation du campus, des transports, des commerces et des services étudiants.",
    "Academic textbooks & study bundle": "Manuels universitaires et kit d’étude",
    "Core university course textbooks and study guides from previous intake cohorts.":
      "Manuels essentiels et guides d’étude des précédentes promotions.",
    "Student study desk & ergonomic chair": "Bureau d’étude et chaise ergonomique",
    "Compact desk and seating set ideal for student flat or dorm room setups.":
      "Ensemble compact adapté à un appartement étudiant ou une chambre en résidence.",
    "Campus city bicycle": "Vélo urbain pour le campus",
    "Reliable city bicycle with lock and safety lights for easy campus commute.":
      "Vélo urbain fiable avec antivol et éclairages pour rejoindre facilement le campus.",
    "Germany, UK, Cyprus…": "Allemagne, Royaume-Uni, Chypre…",
    "Business, Engineering, IT…": "Commerce, ingénierie, informatique…",
    "Eco Luxury & Property Care": "Eco Luxury et entretien immobilier",
    "Turnover cleaning & maintenance": "Nettoyage de rotation et entretien",
    "Inquire for this destination": "Renseignez-vous sur cette destination",
    "Programmes at": "Formations à",
    "programmes found": "formations trouvées",
    "Funding that fits your plan.": "Un financement adapté à votre projet.",
    "Dormitories, shared flats and private apartments near campus.":
      "Résidences, appartements partagés et logements privés près du campus.",
    "Browse accommodation →": "Voir les logements →",
    "Buy or rent long-term — including student investment properties.":
      "Acheter ou louer à long terme, y compris des biens d’investissement pour étudiants.",
    "Browse real estate →": "Voir les biens immobiliers →",
    "Property & Investment": "Immobilier et investissement",
    "Property for families, buyers and investors.":
      "Des biens pour les familles, acheteurs et investisseurs.",
    "The requested property is unavailable or may have been updated.":
      "Le bien demandé n’est pas disponible ou a peut-être été mis à jour.",
    "Please check our current property opportunities or contact our advisors directly for the latest available inventory.":
      "Consultez nos biens disponibles ou contactez nos conseillers pour connaître les dernières offres.",
    "Status:": "Statut :",
    of: "sur",
    "Complete four short steps, then send your details to our advisor on WhatsApp.":
      "Suivez quatre étapes simples, puis envoyez vos informations à notre conseiller sur WhatsApp.",
    "Hello Frankedu Global, I'd like guidance with my study application.":
      "Bonjour Frankedu Global, je souhaite être accompagné dans ma candidature aux études.",
    "Continue opens WhatsApp with these details for you to review and send. Documents are not uploaded or sent in this step.":
      "Continuer ouvre WhatsApp avec ces informations pour que vous puissiez les vérifier et les envoyer. Aucun document n’est téléversé ni envoyé à cette étape.",
    Email: "E-mail",
    Phone: "Téléphone",
    "Demonstration tracker for programme applications and document checklists.":
      "Suivi de démonstration des candidatures et des listes de documents.",
    "Need help with a document?": "Besoin d’aide pour un document ?",
    "Your counsellor replies within 24 hours.": "Votre conseiller répond sous 24 heures.",
    "Message counsellor": "Écrire au conseiller",
    "Sign out (prototype) →": "Se déconnecter (prototype) →",
    "Student account access will be connected here when the application system is ready.":
      "L’accès au compte étudiant sera disponible ici lorsque le système de candidature sera prêt.",
    "Ready for authentication integration": "Prêt pour l’intégration de l’authentification",
    "Log in (integration ready)": "Connexion (intégration prête)",
    "New to Frankedu?": "Nouveau chez Frankedu ?",
    "Preview student dashboard →": "Aperçu de l’espace étudiant →",
    "Start your global study journey": "Commencez votre parcours d’études international",
    "Create your profile when you’re ready to save opportunities and begin an application.":
      "Créez votre profil lorsque vous souhaitez enregistrer des possibilités et commencer une candidature.",
    "Country of residence": "Pays de résidence",
    "Confirm password": "Confirmer le mot de passe",
    "Already have an account?": "Vous avez déjà un compte ?",
    "Log in": "Se connecter",
    "Get in touch": "Nous contacter",
    "Verified Guidance": "Conseils vérifiés",
    "Direct advisory for university admissions, scholarships, and overseas property.":
      "Conseils directs sur les admissions universitaires, les bourses et l’immobilier à l’étranger.",
    "Message on WhatsApp": "Écrire sur WhatsApp",
    "Contact us": "Contactez-nous",
    "Reach us on WhatsApp for the fastest reply, or prepare an email below.":
      "Écrivez-nous sur WhatsApp pour une réponse rapide ou préparez un e-mail ci-dessous.",
    "Frankedu Global website enquiry": "Demande depuis le site Frankedu Global",
    "This opens your email app with the message ready. You will need to send it there; the website does not submit or store it.":
      "Votre application de messagerie s’ouvrira avec le message préparé. Vous devrez l’envoyer depuis cette application ; le site ne l’envoie ni ne le conserve.",
    "Confirmed recruitment relationship: Final International University (FIU)":
      "Relation de recrutement confirmée avec Final International University (FIU)",
    "Scholarships up to 100% for eligible students at selected institutions":
      "Bourses pouvant atteindre 100 % pour les étudiants admissibles dans certains établissements",
    "Affordable cost of living and student accommodation":
      "Coût de la vie et logement étudiant abordables",
    "Scholarship-eligible (up to 100% at selected institutions)":
      "Bourses possibles (jusqu’à 100 % dans certains établissements)",
    Europe: "Europe",
    "Undergraduate and postgraduate pathways across England, Scotland, Wales, and Northern Ireland.":
      "Parcours de premier et deuxième cycles en Angleterre, en Écosse, au pays de Galles et en Irlande du Nord.",
    "Intensive 1-year master's degrees": "Masters intensifs d’un an",
    "Graduate Route post-study work visa opportunities":
      "Possibilités de visa de travail post-études Graduate Route",
    "Admissions and visa advisory support": "Conseils sur les admissions et les visas",
    "Colleges and universities offering co-op work terms and post-graduation pathways.":
      "Collèges et universités proposant des périodes de travail intégré et des parcours après les études.",
    "Post-Graduation Work Permit (PGWP) eligible programmes":
      "Formations admissibles au permis de travail postdiplôme (PGWP)",
    "Co-op work placements and internship pathways": "Stages coopératifs et parcours de stage",
    "Undergraduate and postgraduate diploma pathways": "Diplômes de premier et deuxième cycles",
    "Renowned engineering, business, and research programmes at public and private institutions.":
      "Formations reconnues en ingénierie, commerce et recherche dans des établissements publics et privés.",
    "English-taught undergraduate and master's programmes":
      "Licences et masters enseignés en anglais",
    "18-month post-study job seeker visa": "Visa de recherche d’emploi de 18 mois après les études",
    "Strong industrial and technological ecosystem":
      "Écosystème industriel et technologique solide",
    "High-quality European education with accessible tuition fees and vibrant university cities.":
      "Enseignement européen de qualité, frais accessibles et villes universitaires dynamiques.",
    "Schengen Area European standard qualifications":
      "Diplômes répondant aux normes européennes dans l’espace Schengen",
    "Affordable living costs and medical/technical faculties":
      "Coût de la vie abordable et facultés médicales et techniques",
    "English-medium bachelor's and master's tracks": "Parcours de licence et de master en anglais",
    "Leading Nordic education focused on innovation, research, technology, and applied sciences.":
      "Enseignement nordique de premier plan axé sur l’innovation, la recherche, la technologie et les sciences appliquées.",
    "Top-ranked global education model": "Modèle éducatif reconnu à l’échelle internationale",
    "Post-study work and residency pathways":
      "Possibilités de travail et de résidence après les études",
    "High quality of life and modern learning environments":
      "Qualité de vie élevée et environnements d’apprentissage modernes",
    "One of continental Europe's largest catalogues of English-taught degree programmes.":
      "L’un des plus grands catalogues d’Europe continentale de formations diplômantes en anglais.",
    "Extensive English-taught programmes at research and applied universities":
      "Large choix de formations en anglais dans les universités de recherche et de sciences appliquées",
    "One-year 'Orientation Year' (zoekjaar) post-study work visa":
      "Visa de travail d’un an après les études « Orientation Year » (zoekjaar)",
    "Central European location and international student community":
      "Situation en Europe centrale et communauté étudiante internationale",
    "Globally recognized degrees with strong student support and post-study work opportunities.":
      "Diplômes reconnus dans le monde, accompagnement étudiant et possibilités de travail après les études.",
    "Work rights during study and Temporary Graduate visas":
      "Droit de travailler pendant les études et visas Temporary Graduate",
    "World-class campus facilities and high living standards":
      "Infrastructures universitaires de premier plan et niveau de vie élevé",
    "Undergraduate, postgraduate, and vocational training options":
      "Formations de premier et deuxième cycles et formations professionnelles",
    Asia: "Asie",
    "International study hub with modern university campuses and generous scholarship programmes.":
      "Destination internationale d’études avec des campus modernes et des programmes de bourses généreux.",
    "Government, provincial, and university scholarship options":
      "Bourses gouvernementales, provinciales et universitaires",
    "Expanding English-taught degree offerings":
      "Offre croissante de formations diplômantes en anglais",
    "Exposure to one of the world's leading economic ecosystems":
      "Découverte de l’un des principaux écosystèmes économiques mondiaux",
    "Personalized arrival reception and transfer directly to student accommodation.":
      "Accueil personnalisé à l’arrivée et transfert direct vers le logement étudiant.",
    "Guided onboarding for a local phone number, student banking, and essential accounts.":
      "Accompagnement pour obtenir un numéro local, accéder aux services bancaires étudiants et créer les comptes essentiels.",
    Books: "Livres",
    Furniture: "Mobilier",
    Transport: "Transport",
    "Renovated Villa for Sale in North Cyprus": "Villa rénovée à vendre à Chypre du Nord",
    "Renovated Villa for Sale in North Cyprus | Frankedu Global":
      "Villa rénovée à vendre à Chypre du Nord | Frankedu Global",
    "Explore Sarcon №87, a renovated villa for sale in North Cyprus. View the property gallery and contact Frankedu Global for viewing and purchase assistance.":
      "Découvrez Sarcon №87, une villa rénovée à vendre à Chypre du Nord. Consultez la galerie et contactez Frankedu Global pour organiser une visite et obtenir de l’aide à l’achat.",
    "Sarcon 87 renovated villa in North Cyprus – exterior street view and gated entrance":
      "Villa rénovée Sarcon 87 à Chypre du Nord – vue extérieure depuis la rue et entrée avec portail",
    "Exterior Street View & Gated Entrance": "Vue depuis la rue et entrée avec portail",
    "Cover / Main Exterior": "Couverture / extérieur principal",
    "Sarcon 87 renovated villa in North Cyprus – surrounding coastal neighborhood and Mediterranean sea views":
      "Villa rénovée Sarcon 87 à Chypre du Nord – quartier côtier environnant et vue sur la Méditerranée",
    "Surrounding Coastal Neighborhood & Sea View": "Quartier côtier environnant et vue sur la mer",
    "Location & Setting": "Emplacement et environnement",
    "Sarcon 87 renovated villa in North Cyprus – spacious double-height living room with exposed timber beams":
      "Villa rénovée Sarcon 87 à Chypre du Nord – grand séjour à double hauteur avec poutres apparentes",
    "Double-Height Living Room": "Séjour à double hauteur",
    "Living Space": "Espace de vie",
    "Sarcon 87 renovated villa in North Cyprus – ground-floor living area, wrought-iron staircase, and hallway entrance":
      "Villa rénovée Sarcon 87 à Chypre du Nord – séjour au rez-de-chaussée, escalier en fer forgé et entrée du couloir",
    "Living Area & Feature Staircase": "Séjour et escalier remarquable",
    "Interior Architecture": "Architecture intérieure",
    "Sarcon 87 renovated villa in North Cyprus – contemporary renovated kitchen and open-plan dining space":
      "Villa rénovée Sarcon 87 à Chypre du Nord – cuisine contemporaine rénovée et salle à manger ouverte",
    "Renovated Kitchen & Dining": "Cuisine rénovée et salle à manger",
    "Kitchen & Dining": "Cuisine et salle à manger",
    "Hi, I'm interested in Sarcon №87 (Renovated Villa for Sale in North Cyprus). Could you share verified details and viewing availability?":
      "Bonjour, Sarcon №87 (villa rénovée à vendre à Chypre du Nord) m’intéresse. Pourriez-vous me communiquer les informations vérifiées et les disponibilités de visite ?",
    "Sarcon №87: Renovated Villa for Sale": "Sarcon №87 : villa rénovée à vendre",
    "Renovated Villa": "Villa rénovée",
    "Design-refurbished villa": "Villa rénovée selon un projet de design",
    "Full photo gallery available": "Galerie photo complète disponible",
    "Foreign buyer eligible*": "Acheteurs étrangers admissibles*",
    "North Cyprus: Residential, Off-Plan & Investment Properties":
      "Chypre du Nord : biens résidentiels, sur plan et d’investissement",
    "Residential properties": "Biens résidentiels",
    "Off-plan developments": "Projets immobiliers sur plan",
    "Investment properties": "Biens d’investissement",
    "Seafront Resort Residences development in Esentepe, North Cyprus":
      "Projet Seafront Resort Residences à Esentepe, Chypre du Nord",
    "United Kingdom: Residential & Investment Opportunities":
      "Royaume-Uni : possibilités résidentielles et d’investissement",
    "Residential & Investment": "Résidentiel et investissement",
    "Residential opportunities": "Possibilités résidentielles",
    "Acquisition and advisory guidance": "Accompagnement à l’acquisition et conseil",
    "Dubai/UAE: Selected Investment Opportunities":
      "Dubaï/EAU : possibilités d’investissement sélectionnées",
    "Selected property opportunities": "Possibilités immobilières sélectionnées",
    "Investor acquisition advisory": "Conseil en acquisition pour investisseurs",
    "Market opportunities": "Possibilités du marché",
    "Final International University Scholarships": "Bourses de Final International University",
    "Scholarships can be up to 100% for eligible students at selected institutions based on academic merit, quota availability, or early application.":
      "Dans certains établissements, les étudiants admissibles peuvent obtenir une bourse allant jusqu’à 100 %, selon le mérite, les quotas disponibles ou la date de candidature.",
    "North Cyprus: residential, off-plan and investment properties":
      "Chypre du Nord : biens résidentiels, sur plan et d’investissement",
    "United Kingdom: residential and investment opportunities":
      "Royaume-Uni : possibilités résidentielles et d’investissement",
    "Dubai/UAE: selected investment opportunities":
      "Dubaï/EAU : possibilités d’investissement sélectionnées",
    "Kyrenia (Girne)": "Kyrenia (Girne)",
    "Bachelor's, Master's, PhD": "Licence, master, doctorat",
    "Programmes available across confirmed faculties (contact advisor)":
      "Formations disponibles dans les facultés confirmées (contacter un conseiller)",
    "Contact advisor for verified fee schedule":
      "Contactez un conseiller pour obtenir les frais vérifiés",
    "Scholarships can be up to 100% for eligible students at selected institutions — we guide your application.":
      "Dans certains établissements, les étudiants admissibles peuvent obtenir une bourse allant jusqu’à 100 % ; nous vous accompagnons dans votre candidature.",
    "Up to 100% scholarship evaluation at selected institutions":
      "Évaluation pour une bourse allant jusqu’à 100 % dans certains établissements",
    Transportation: "Transport",
    "Explore university options & tuition": "Découvrir les options universitaires et les frais",
    "Contact us about study destinations and university admissions.":
      "Contactez-nous au sujet des destinations d’études et des admissions universitaires.",
    "Global Opportunities.": "Possibilités internationales.",
    "Study guidance • Property information": "Conseils d’études • Informations immobilières",
    "Study options & scholarships": "Options d’études et bourses",
    "Guidance on study options based on your academic background and aspirations.":
      "Conseils sur les options d’études selon votre parcours universitaire et vos objectifs.",
    "Buyer Eligibility Information*": "Informations sur l’éligibilité des acheteurs*",
    "Explore study destinations and discuss options based on your academic goals, budget, and preferred intake.":
      "Découvrez les destinations d’études et discutez des options selon vos objectifs, votre budget et la période souhaitée.",
    "University Pathways.": "Parcours universitaires.",
    "We have a confirmed recruitment relationship with Final International University (FIU). Contact us for current programme and admissions details.":
      "Nous avons une relation de recrutement confirmée avec Final International University (FIU). Contactez-nous pour connaître les formations et admissions actuellement proposées.",
    "Explore property opportunities across North Cyprus and selected international markets.":
      "Découvrez des possibilités immobilières à Chypre du Nord et sur certains marchés internationaux.",
    "*Buyer/title eligibility information is included in the listing and should be independently confirmed during legal conveyancing.":
      "*Les informations sur l’éligibilité de l’acheteur et du titre figurant dans l’annonce doivent être confirmées indépendamment lors de la transaction juridique.",
    "We have a confirmed recruitment relationship with Final International University (FIU). Contact us to discuss other study options.":
      "Nous avons une relation de recrutement confirmée avec Final International University (FIU). Contactez-nous pour discuter d’autres possibilités d’études.",
    "Contact us to discuss study options for this destination.":
      "Contactez-nous pour discuter des options d’études dans cette destination.",
    "Search by subject and level. Contact us for current programme details and fee information.":
      "Recherchez par domaine et niveau. Contactez-nous pour obtenir les informations actuelles sur les formations et les frais.",
    "Programme and admission information can change. Contact us for current details about available programmes, faculties, and requirements.":
      "Les informations sur les formations et les admissions peuvent changer. Contactez-nous pour connaître les formations, facultés et conditions actuellement disponibles.",
    "Compare key study destinations side by side. Contact us to discuss options for destinations not listed.":
      "Comparez les principales destinations d’études. Contactez-nous pour discuter des options dans les destinations non répertoriées.",
    "Scholarship details depend on the institution and eligibility criteria. Contact us for current information.":
      "Les bourses dépendent de l’établissement et des critères d’admissibilité. Contactez-nous pour obtenir les informations actuelles.",
    "Listing states the title is suitable for a foreign national*":
      "L’annonce indique que le titre convient à un ressortissant étranger*",
    "Listing states title is suitable for foreign buyers*":
      "L’annonce indique que le titre convient aux acheteurs étrangers*",
    "*Buyer/title eligibility information in the listing should be independently confirmed during legal conveyancing.":
      "*Les informations de l’annonce sur l’éligibilité de l’acheteur et du titre doivent être confirmées indépendamment lors de la transaction juridique.",
    "Frankedu Global provides guidance for students, families, and investors navigating university admissions, scholarships, student accommodation, and overseas property opportunities.":
      "Frankedu Global accompagne les étudiants, les familles et les investisseurs dans les admissions universitaires, les bourses, le logement étudiant et les possibilités immobilières à l’étranger.",
    "Clear information": "Des informations claires",
    "We aim to provide clear information about admissions, tuition, and scholarship terms. Contact us for current details.":
      "Nous cherchons à fournir des informations claires sur les admissions, les frais de scolarité et les bourses. Contactez-nous pour obtenir les détails actuels.",
    "Frankedu Global provides guidance for students and families. Contact us for current admissions, tuition, and scholarship details.":
      "Frankedu Global accompagne les étudiants et les familles. Contactez-nous pour obtenir les informations actuelles sur les admissions, les frais et les bourses.",
    "Company & Approach": "Entreprise et approche",
    Brand: "Marque",
    "Customer-facing brand": "Marque destinée aux clients",
    Address: "Adresse",
    "Contact us online about university applications, property viewings, and professional services.":
      "Contactez-nous en ligne au sujet des candidatures universitaires, des visites immobilières et des services professionnels.",
    "English-medium degree programmes and scholarship opportunities at Final International University (FIU).":
      "Formations diplômantes en anglais et possibilités de bourses à Final International University (FIU).",
    "We help students, families, and investors explore study options, property information, and professional services.":
      "Nous aidons les étudiants, les familles et les investisseurs à découvrir des options d’études, des informations immobilières et des services professionnels.",
    "Personalized Guidance": "Conseils personnalisés",
    "Property information & investment options":
      "Informations immobilières et options d’investissement",
    "Scholarships up to 100% for eligible students at Final International University (FIU)":
      "Bourses pouvant atteindre 100 % pour les étudiants admissibles à Final International University (FIU)",
    "Scholarship opportunities up to 100% at Final International University (FIU)":
      "Possibilités de bourses allant jusqu’à 100 % à Final International University (FIU)",
    "Scholarship-eligible (up to 100% at Final International University (FIU))":
      "Possibilités de bourses allant jusqu’à 100 % à Final International University (FIU)",
    "Scholarship opportunities at Final International University (FIU) can be up to 100% for eligible students. Contact us for current eligibility and award details.":
      "Les bourses à Final International University (FIU) peuvent atteindre 100 % pour les étudiants admissibles. Contactez-nous pour connaître les critères et montants actuels.",
    "Scholarships up to 100% for eligible students":
      "Bourses pouvant atteindre 100 % pour les étudiants admissibles",
    "Study guidance by destination and subject": "Conseils d’études par destination et domaine",
    "At Final International University (FIU), scholarships can be up to 100% for eligible students. Contact us for current details.":
      "À Final International University (FIU), les bourses peuvent atteindre 100 % pour les étudiants admissibles. Contactez-nous pour obtenir les détails actuels.",
    "Scholarship opportunities at FIU for eligible students":
      "Possibilités de bourses à FIU pour les étudiants admissibles",
    "Contact us for current scholarship criteria and award details":
      "Contactez-nous pour connaître les critères et montants actuels des bourses",
    "Review current tuition details before applying":
      "Consultez les frais de scolarité actuels avant de postuler",
    "FIU scholarship range": "Montant des bourses à FIU",
    "FIU scholarships up to 100% for eligible students":
      "Bourses à FIU pouvant atteindre 100 % pour les étudiants admissibles",
    "Contact advisor for current tuition information":
      "Contactez un conseiller pour connaître les frais de scolarité actuels",
    "Student dormitories and rentals near campus, kept strictly separate from investment property.":
      "Résidences et locations étudiantes près du campus, distinctes des biens d’investissement.",
  },
  sw: {
    Universities: "Vyuo vikuu",
    Courses: "Programu za masomo",
    Countries: "Nchi",
    Scholarships: "Ufadhili wa masomo",
    Services: "Huduma",
    Marketplace: "Soko",
    About: "Kuhusu",
    Contact: "Mawasiliano",
    Login: "Ingia",
    "Sign Up": "Jisajili",
    "Main navigation": "Urambazaji mkuu",
    "Language / Dil": "Lugha / Dil",
    "Mobile navigation": "Urambazaji wa simu",
    "Open menu": "Fungua menyu",
    "Close menu": "Funga menyu",
    "Start Application": "Anza maombi",
    "Chat on WhatsApp": "Wasiliana kupitia WhatsApp",
    "Student Dashboard Preview →": "Hakiki dashibodi ya mwanafunzi →",
    "Study Pathways": "Njia za masomo",
    "Services & Living": "Huduma na makazi",
    Company: "Kampuni",
    "Institution names and locations; admissions details on request":
      "Majina na maeneo ya taasisi; uliza kuhusu taarifa za udahili",
    "Programme listings appear after their details are confirmed":
      "Programu zitaorodheshwa baada ya maelezo yake kuthibitishwa",
    "Browse destinations and ask about current study options":
      "Vinjari nchi na uulizie chaguo za sasa za masomo",
    "Current award details are not published": "Maelezo ya sasa ya ufadhili hayajachapishwa",
    "Study, property, and digital-service enquiries":
      "Maswali kuhusu masomo, mali na huduma za kidijitali",
    "No marketplace listings are currently published":
      "Hakuna matangazo ya soko yaliyochapishwa kwa sasa",
    "No accommodation listings are currently published":
      "Hakuna matangazo ya malazi yaliyochapishwa kwa sasa",
    "Ask about the property listing shown on this site":
      "Ulizia tangazo la mali lililoonyeshwa kwenye tovuti hii",
    "Our approach and contact information": "Namna tunavyofanya kazi na mawasiliano",
    "Send us a WhatsApp or email enquiry": "Tutumie ujumbe kupitia WhatsApp au barua pepe",
    "Information on study options, property listings, and digital services.":
      "Taarifa kuhusu chaguo za masomo, matangazo ya mali na huduma za kidijitali.",
    "Ask us to confirm current details before making a decision.":
      "Wasiliana nasi kuthibitisha taarifa za sasa kabla ya kufanya uamuzi.",
    "Message Frankedu Global to ask about study information, property listings, or digital services.":
      "Tuma ujumbe kwa Frankedu Global kupitia WhatsApp kuulizia masomo, matangazo ya mali au huduma za kidijitali.",
    "Education • Property • Digital Services": "Elimu • Mali • Huduma za Kidijitali",
    "Clear information for": "Taarifa zilizo wazi kwa",
    "your next decision.": "uamuzi wako unaofuata.",
    "Study options • Property information • Digital services":
      "Chaguo za masomo • Taarifa za mali • Huduma za kidijitali",
    "Frankedu Global helps students, families, and clients ask informed questions about study options, property information, and digital services.":
      "Frankedu Global huwasaidia wanafunzi, familia na wateja kuuliza maswali yenye ufahamu kuhusu masomo, mali na huduma za kidijitali.",
    "Straightforward enquiries": "Maswali ya moja kwa moja",
    "Study options • Property information": "Chaguo za masomo • Taarifa za mali",
    "Study, property, and digital enquiries.":
      "Maswali kuhusu masomo, mali na huduma za kidijitali.",
    "Ask us about current study information, property details, or digital services. We will confirm what is available.":
      "Ulizia taarifa za sasa za masomo, mali au huduma za kidijitali. Tutathibitisha kinachopatikana.",
    "Study information": "Taarifa za masomo",
    "Ask about current admissions information and study options. Final International University (FIU) is the only confirmed recruitment relationship.":
      "Ulizia taarifa za sasa za udahili na masomo. Final International University (FIU) ndiyo uhusiano pekee wa udahili uliothibitishwa katika muktadha wa mradi.",
    "Current programmes and entry requirements need confirmation":
      "Programu na masharti ya kujiunga ya sasa yanahitaji kuthibitishwa",
    "Fees, scholarship terms, and intakes may change":
      "Ada, masharti ya ufadhili na vipindi vya udahili vinaweza kubadilika",
    "Check visa requirements with the relevant authorities":
      "Thibitisha masharti ya visa kwa mamlaka husika",
    "Property information": "Taarifa za mali",
    "Ask about the property listing shown on this site. Availability, price, and particulars need current confirmation.":
      "Ulizia tangazo la mali lililo kwenye tovuti hii. Upatikanaji, bei na maelezo vinahitaji uthibitisho wa sasa.",
    "Current availability on enquiry": "Ulizia upatikanaji wa sasa",
    "Details should be confirmed before proceeding": "Thibitisha maelezo kabla ya kuendelea",
    "Independent advice may be appropriate": "Fikiria kupata ushauri huru",
    "Digital services": "Huduma za kidijitali",
    "Digital Services": "Huduma za Kidijitali",
    "Study Options & Admissions Enquiries": "Chaguo za Masomo na Maswali ya Udahili",
    "Discuss your study plans and ask about current admissions information. Final International University (FIU) is the only confirmed recruitment relationship.":
      "Jadili mipango yako ya masomo na uulizie taarifa za sasa za udahili. Final International University (FIU) ndiyo uhusiano pekee wa udahili uliothibitishwa katika muktadha wa mradi.",
    "Available programmes, fees, and entry requirements need confirmation from the institution.":
      "Programu, ada na masharti ya kujiunga yanahitaji kuthibitishwa na taasisi.",
    "Visa and immigration requirements should be checked with the relevant authorities.":
      "Thibitisha masharti ya visa na uhamiaji kwa mamlaka husika.",
    "Property Information": "Taarifa za Mali",
    "Contact us to ask about property information and any current listing details.":
      "Wasiliana nasi kuulizia taarifa za mali na maelezo ya matangazo ya sasa.",
    "Availability and pricing should be confirmed for each listing.":
      "Upatikanaji na bei vinapaswa kuthibitishwa kwa kila tangazo.",
    "Property details should be reviewed independently before making a decision.":
      "Maelezo ya mali yanapaswa kuchunguzwa kwa kujitegemea kabla ya kufanya uamuzi.",
    "Contact us to discuss your digital service requirements.":
      "Wasiliana nasi kujadili mahitaji yako ya huduma za kidijitali.",
    "Scope, availability, and pricing are discussed per enquiry.":
      "Wigo, upatikanaji na bei hujadiliwa kwa kila ombi.",
    "Sarcon №87 Property Listing": "Tangazo la Mali la Sarcon №87",
    "Sarcon №87 Property Listing | Frankedu Global":
      "Tangazo la Mali la Sarcon №87 | Frankedu Global",
    "Sarcon №87 · Enquiry": "Sarcon №87 · Ulizia",
    "View photographs associated with the Sarcon №87 property listing and contact Frankedu Global to ask about current details.":
      "Tazama picha zinazohusiana na tangazo la mali la Sarcon №87 na uwasiliane na Frankedu Global kuulizia maelezo ya sasa.",
    "Price details not published": "Taarifa za bei hazijachapishwa",
    "Photograph associated with the Sarcon №87 property listing.":
      "Picha inayohusiana na tangazo la mali la Sarcon №87.",
    "This page shows photographs associated with the Sarcon №87 property listing. Contact us to ask about its current details.":
      "Ukurasa huu unaonyesha picha zinazohusiana na tangazo la mali la Sarcon №87. Wasiliana nasi kuulizia maelezo yake ya sasa.",
    "Property particulars, price, location, and availability need confirmation before proceeding.":
      "Maelezo ya mali, bei, eneo na upatikanaji vinahitaji kuthibitishwa kabla ya kuendelea.",
    "Photographs available": "Picha zinapatikana",
    "Confirm current availability": "Thibitisha upatikanaji wa sasa",
    "Frankedu Global shares information about study options, property, and digital services. Contact us to ask what is currently available.":
      "Frankedu Global hushiriki taarifa kuhusu masomo, mali na huduma za kidijitali. Wasiliana nasi kuulizia kinachopatikana kwa sasa.",
    "Admissions, fees, availability, and other details can change. Ask us to confirm current information before making a decision.":
      "Udahili, ada, upatikanaji na maelezo mengine yanaweza kubadilika. Wasiliana nasi kuthibitisha taarifa za sasa kabla ya kufanya uamuzi.",
    "No assumed details": "Hakuna taarifa zinazodhaniwa",
    "We distinguish confirmed information from details that still need to be checked.":
      "Tunatofautisha taarifa zilizothibitishwa na maelezo ambayo bado yanahitaji kukaguliwa.",
    "A clear next step": "Hatua inayofuata iliyo wazi",
    "Contact us with your question and we will discuss the information or service you are looking for.":
      "Wasiliana nasi ukiwa na swali lako ili tujadili taarifa au huduma unayotafuta.",
    "Contact us to discuss a digital service request.":
      "Wasiliana nasi kujadili ombi la huduma za kidijitali.",
    "Scope and availability confirmed per enquiry":
      "Wigo na upatikanaji huthibitishwa kwa kila ombi",
    "Pricing discussed before work begins": "Bei hujadiliwa kabla ya kazi kuanza",
    "Study destinations.": "Nchi za masomo.",
    "Browse destinations listed on this site. Current programmes, admissions, costs, and dates vary; contact us to ask about specific options.":
      "Vinjari nchi zilizoorodheshwa kwenye tovuti hii. Programu, udahili, gharama na tarehe za sasa hutofautiana; wasiliana nasi kuulizia chaguo mahususi.",
    "Property listing.": "Tangazo la mali.",
    "One property listing is shown here. Ask us to confirm its current availability and details.":
      "Tangazo moja la mali linaonyeshwa hapa. Wasiliana nasi kuthibitisha upatikanaji na maelezo ya sasa.",
    "Listing information may change. Confirm current details before making a decision.":
      "Taarifa za tangazo zinaweza kubadilika. Thibitisha maelezo ya sasa kabla ya kufanya uamuzi.",
    "Have a question about your next step?": "Una swali kuhusu hatua yako inayofuata?",
    "Contact Frankedu Global to discuss study information, a property listing, or digital services.":
      "Wasiliana na Frankedu Global kujadili taarifa za masomo, tangazo la mali au huduma za kidijitali.",
    "University directory": "Orodha ya vyuo vikuu",
    "Browse institutions by destination. Final International University (FIU) is the only confirmed recruitment relationship; contact us about current admissions details.":
      "Vinjari taasisi kulingana na nchi. Final International University (FIU) ndiyo uhusiano pekee wa udahili uliothibitishwa katika muktadha wa mradi; wasiliana nasi kuhusu taarifa za sasa za udahili.",
    "Destinations to ask about.": "Nchi za kuulizia.",
    "Browse the destinations listed here. Contact us to ask about current study options; programmes, fees, and dates are not listed until confirmed.":
      "Vinjari nchi zilizoorodheshwa hapa. Wasiliana nasi kuulizia chaguo za sasa za masomo; programu, ada na tarehe haziorodheshwi hadi zithibitishwe.",
    "Ask about options": "Ulizia chaguo",
    "No current scholarship details are published. Contact us to ask about information confirmed by the institution.":
      "Hakuna maelezo ya sasa ya ufadhili yaliyochapishwa. Wasiliana nasi kuulizia taarifa zilizothibitishwa na taasisi.",
    "No current scholarship listings": "Hakuna matangazo ya sasa ya ufadhili",
    "Award amounts, eligibility, and deadlines need current confirmation before they can be published.":
      "Kiasi cha ufadhili, ustahiki na tarehe za mwisho vinahitaji uthibitisho wa sasa kabla ya kuchapishwa.",
    "How we can help": "Jinsi tunavyoweza kusaidia",
    "Ask about study information, property details, or digital services. Scope and availability are confirmed per enquiry.":
      "Ulizia taarifa za masomo, maelezo ya mali au huduma za kidijitali. Wigo na upatikanaji huthibitishwa kwa kila ombi.",
    "About Frankedu Global": "Kuhusu Frankedu Global",
    "Study and property information": "Taarifa za masomo na mali",
    "What we do": "Tunachofanya",
    "Clear information for your next decision.": "Taarifa zilizo wazi kwa uamuzi wako unaofuata.",
    "We share study information and property details, and discuss digital-service enquiries. Ask us to confirm what is currently available.":
      "Tunashiriki taarifa za masomo na mali, na kujadili maombi ya huduma za kidijitali. Wasiliana nasi kuthibitisha kinachopatikana kwa sasa.",
    "Message us on WhatsApp or prepare an email using the form below.":
      "Tutumie ujumbe kupitia WhatsApp au andaa barua pepe ukitumia fomu iliyo hapa chini.",
    "Tell us what you would like to ask": "Tuambie ungependa kuuliza nini",
    "Housing and property enquiries.": "Maswali kuhusu makazi na mali.",
    "Browse the available sections below. Listings are shown only when current details are available.":
      "Vinjari sehemu zilizo hapa chini. Matangazo huonyeshwa tu taarifa za sasa zinapopatikana.",
    "Ask us whether current accommodation information is available.":
      "Ulizia kama taarifa za sasa za malazi zinapatikana.",
    "Ask about accommodation →": "Ulizia kuhusu malazi →",
    "View the property listing and ask us to confirm its current details.":
      "Tazama tangazo la mali na utuombe kuthibitisha maelezo yake ya sasa.",
    "View property information →": "Tazama taarifa za mali →",
    "No current listings": "Hakuna matangazo ya sasa",
    "There are no marketplace listings published at this time. Contact us to ask about current options.":
      "Hakuna matangazo ya soko yaliyochapishwa kwa sasa. Wasiliana nasi kuulizia chaguo za sasa.",
    "No marketplace listings": "Hakuna matangazo ya bidhaa sokoni",
    "No marketplace product listings are published at this time. Use the Real Estate section above to view the separate property listing.":
      "Hakuna matangazo ya bidhaa sokoni yaliyochapishwa kwa sasa. Tumia sehemu ya Mali Isiyohamishika hapo juu kuona tangazo tofauti la nyumba.",
    "Accommodation enquiries": "Maswali kuhusu malazi",
    "No accommodation listings are currently published. Contact us to ask whether current information is available.":
      "Hakuna matangazo ya malazi yaliyochapishwa kwa sasa. Wasiliana nasi kuulizia kama taarifa za sasa zinapatikana.",
    "Ask about availability": "Ulizia upatikanaji",
    "One property listing is shown here. Contact us to confirm its current availability and details.":
      "Tangazo moja la mali linaonyeshwa hapa. Wasiliana nasi kuthibitisha upatikanaji na maelezo ya sasa.",
    "Ask about this listing": "Ulizia kuhusu tangazo hili",
    "This property listing is not available. Contact us if you need assistance.":
      "Tangazo hili la mali halipatikani. Wasiliana nasi ukihitaji msaada.",
    "Ask us to confirm current availability and property details before proceeding.":
      "Wasiliana nasi kuthibitisha upatikanaji na maelezo ya mali kabla ya kuendelea.",
    "Listing information": "Taarifa za tangazo",
    "Property listing": "Tangazo la mali",
    "Contact us to ask about current availability, property details, and viewing arrangements.":
      "Wasiliana nasi kuulizia upatikanaji wa sasa, maelezo ya mali na mipango ya kuitembelea.",
    "Before proceeding": "Kabla ya kuendelea",
    "Confirm the property particulars and seek independent professional advice before making a decision.":
      "Thibitisha maelezo ya mali na utafute ushauri huru wa kitaalamu kabla ya kufanya uamuzi.",
    "Compare English-taught programmes": "Linganisha programu zinazofundishwa kwa Kiingereza",
    "Compare countries, visas & intakes": "Linganisha nchi, visa na vipindi vya udahili",
    "Scholarship information": "Taarifa za ufadhili wa masomo",
    "Intake planning, visa & arrival support": "Mipango ya udahili, visa na msaada wa kuwasili",
    "Student essentials & trusted community listings":
      "Mahitaji ya wanafunzi na matangazo ya jumuiya",
    "Dorms & apartments near campus": "Mabweni na vyumba karibu na chuo",
    "Property purchases & rentals": "Ununuzi na upangishaji wa mali",
    "Our mission, team & personal guidance": "Dhamira yetu, timu na mwongozo wa kibinafsi",
    "Message our advisory team": "Tuma ujumbe kwa timu yetu ya ushauri",
    "Clear guidance for students choosing where — and how — to study abroad.":
      "Mwongozo wazi kwa wanafunzi wanaochagua mahali na namna ya kusoma nje ya nchi.",
    Explore: "Chunguza",
    Students: "Wanafunzi",
    "Start an application": "Anza maombi",
    "Student dashboard": "Dashibodi ya mwanafunzi",
    Accommodation: "Malazi",
    "Real Estate": "Mali isiyohamishika",
    "All rights reserved.": "Haki zote zimehifadhiwa.",
    Home: "Nyumbani",
    "Verified listing": "Tangazo limethibitishwa",
    "Template — verify before publishing": "Kiolezo — thibitisha kabla ya kuchapisha",
    "Apply Now": "Omba sasa",
    Close: "Funga",
    "Ask a question": "Uliza swali",
    Enquire: "Uliza maelezo",
    Reserve: "Hifadhi",
    "Request details": "Omba maelezo",
    "View Details": "Tazama maelezo",
    "Ask us for current admissions information for this institution.":
      "Wasiliana nasi kupata taarifa za sasa za udahili katika taasisi hii.",
    "Contact us to ask about current study options.":
      "Wasiliana nasi kuulizia chaguo za sasa za masomo.",
    "Contact us for current intake information":
      "Wasiliana nasi kupata taarifa za sasa kuhusu vipindi vya udahili.",
    "United States": "Marekani",
    Available: "Inapatikana",
    "Degree level": "Kiwango cha shahada",
    "Tuition fee": "Ada ya masomo",
    Intake: "Kipindi cha udahili",
    "Application fee": "Ada ya maombi",
    "Scholarship availability": "Upatikanaji wa ufadhili",
    Duration: "Muda",
    Tuition: "Ada ya masomo",
    Language: "Lugha",
    "Talk to Frankedu": "Zungumza na Frankedu",
    "Not sure where to start?": "Hujui pa kuanzia?",
    "Let’s make a plan.": "Tupange pamoja.",
    "Page not found": "Ukurasa haujapatikana",
    "The page you're looking for doesn't exist or has been moved.":
      "Ukurasa unaoutafuta haupo au umehamishwa.",
    "This page didn't load": "Ukurasa huu haukufunguka",
    "Try again": "Jaribu tena",
    "Go home": "Rudi mwanzo",
    "Education • Real Estate • Creative • Beyond": "Elimu • Mali • Ubunifu • Mengineyo",
    "Your Future.": "Mustakabali wako.",
    "Study Abroad • Invest in Property • Build Your Brand • Live Better":
      "Soma nje • Wekeza kwenye mali • Jenga chapa yako • Ishi vizuri",
    "Study destination": "Nchi ya masomo",
    "Course or subject": "Kozi au somo",
    "Find Universities": "Tafuta vyuo vikuu",
    "Verified Global Guidance": "Mwongozo wa kimataifa uliothibitishwa",
    "Our Services": "Huduma zetu",
    "One Global Brand. Multiple Opportunities.": "Chapa moja ya kimataifa. Fursa nyingi.",
    "Explore All Services": "Chunguza huduma zote",
    "Education & Admissions": "Elimu na udahili",
    "Browse Universities": "Vinjari vyuo vikuu",
    "Properties & Investment": "Mali na uwekezaji",
    "Verified homes & investment assets": "Nyumba na mali za uwekezaji zilizothibitishwa",
    "Explore Properties": "Chunguza mali",
    "Creative & Digital": "Ubunifu na teknolojia",
    "Brand identity, web & media": "Utambulisho wa chapa, tovuti na vyombo vya habari",
    "Get a Quote": "Omba bei",
    "Study & Living Destinations": "Nchi za masomo na makazi",
    "Popular Destinations.": "Nchi maarufu.",
    "View All Destinations": "Tazama nchi zote",
    "Study • Invest • Live": "Soma • Wekeza • Ishi",
    "Institutions & Pathways": "Taasisi na njia za masomo",
    "Browse All Universities": "Vinjari vyuo vyote",
    "Real Estate Opportunities": "Fursa za mali",
    "Featured Properties.": "Mali zilizoangaziwa.",
    "Explore All Properties": "Chunguza mali zote",
    "Start Today": "Anza leo",
    "Let's Build Your Future Together.": "Tujenge mustakabali wako pamoja.",
    "Book a Consultation": "Panga mashauriano",
    "Find the right university.": "Tafuta chuo kinachokufaa.",
    Destination: "Nchi",
    "All destinations": "Nchi zote",
    Subject: "Somo",
    "All subjects": "Masomo yote",
    Clear: "Futa",
    "university found": "chuo kimepatikana",
    "universities found": "vyuo vimepatikana",
    "Turn your ambitions into a study plan.": "Geuza malengo yako kuwa mpango wa masomo.",
    "Study options at": "Chaguo za masomo katika",
    "Filter by field, study level, and university. Programme listings appear here once details are confirmed; contact us to discuss current study options.":
      "Chuja kwa eneo la masomo, kiwango cha masomo na chuo kikuu. Programu zitaorodheshwa hapa baada ya maelezo yake kuthibitishwa; wasiliana nasi kujadili chaguo za sasa.",
    "Field of Study": "Eneo la Masomo",
    "Study Level": "Kiwango cha Masomo",
    "No verified programme listings yet": "Bado hakuna programu zilizothibitishwa zilizochapishwa",
    "We have not published programme listings because their details have not been confirmed. Contact us to discuss current study options.":
      "Hatujachapisha orodha ya programu kwa sababu maelezo yake bado hayajathibitishwa. Wasiliana nasi kujadili chaguo za sasa za masomo.",
    Level: "Kiwango",
    "All levels": "Viwango vyote",
    University: "Chuo kikuu",
    "All universities": "Vyuo vyote",
    Foundation: "Msingi",
    "Bachelor's": "Shahada ya kwanza",
    "Master's": "Shahada ya uzamili",
    PhD: "Shahada ya uzamivu",
    "Study destinations": "Nchi za masomo",
    "Choose where your degree takes you.": "Chagua nchi ya masomo yako.",
    Intakes: "Vipindi vya udahili",
    "Tuition range": "Kiwango cha ada",
    "View universities": "Tazama vyuo vikuu",
    Amount: "Kiasi",
    Deadline: "Tarehe ya mwisho",
    "Apply with support": "Omba kwa msaada",
    "Check eligibility": "Angalia ustahiki",
    "Student support": "Msaada wa wanafunzi",
    "Support for every part of your next step.": "Msaada katika kila hatua inayofuata.",
    "Start your application": "Anza maombi yako",
    Step: "Hatua",
    "Everything you need to settle in.": "Kila unachohitaji ili kuanza maisha.",
    Housing: "Makazi",
    Property: "Mali",
    All: "Zote",
    "A place to live before you land.": "Makazi tayari kabla ya kuwasili.",
    "Back to marketplace": "Rudi sokoni",
    "Property Listing Not Found": "Tangazo la mali halijapatikana",
    "Back to Real Estate Listings": "Rudi kwenye matangazo ya mali",
    "Enquire on WhatsApp": "Uliza kupitia WhatsApp",
    "All properties": "Mali zote",
    "Foreign national eligible*": "Raia wa kigeni anastahiki*",
    "Expand photo in fullscreen": "Panua picha kwenye skrini nzima",
    "Previous photo": "Picha iliyotangulia",
    "Next photo": "Picha inayofuata",
    Photo: "Picha",
    "Select photo:": "Chagua picha:",
    "Verified Property Highlights": "Sifa za mali zilizothibitishwa",
    "Buyer & Title Eligibility Notice": "Taarifa kuhusu ustahiki wa mnunuzi na hati",
    "Verified Listing": "Tangazo lililothibitishwa",
    "Key Information": "Taarifa muhimu",
    Reference: "Rejea",
    "Property type": "Aina ya mali",
    Location: "Mahali",
    "Map location": "Mahali kwenye ramani",
    "Supplied upon enquiry": "Hutolewa ukiuliza",
    Status: "Hali",
    Pricing: "Bei",
    "Buyer eligibility": "Ustahiki wa mnunuzi",
    "Arrange a Viewing": "Panga kutembelea",
    "Official Advisory Support": "Msaada rasmi wa ushauri",
    "Close photo preview": "Funga hakiki ya picha",
    Application: "Maombi",
    "Start your application.": "Anza maombi yako.",
    "Applying to": "Unaomba katika",
    "Your details": "Taarifa zako",
    "Study plan": "Mpango wa masomo",
    Documents: "Nyaraka",
    Review: "Kagua",
    "Full name": "Jina kamili",
    "Email address": "Anwani ya barua pepe",
    "Phone / WhatsApp number": "Nambari ya simu / WhatsApp",
    Nationality: "Uraia",
    "University (optional)": "Chuo kikuu (si lazima)",
    "Programme (optional)": "Programu (si lazima)",
    "Preferred intake": "Kipindi unachopendelea",
    "January 2027": "Januari 2027",
    "February 2027": "Februari 2027",
    "Passport copy": "Nakala ya pasipoti",
    "Academic transcripts": "Nakala za matokeo ya masomo",
    "English proficiency proof": "Uthibitisho wa ujuzi wa Kiingereza",
    "Statement of purpose": "Barua ya madhumuni",
    "No documents are uploaded or sent in this step.":
      "Hakuna nyaraka zinazopakiwa au kutumwa katika hatua hii.",
    Name: "Jina",
    Programme: "Programu",
    "Programme level": "Kiwango cha programu",
    Back: "Rudi",
    Continue: "Endelea",
    "Continue to WhatsApp": "Endelea kwenda WhatsApp",
    "Student Preview": "Hakiki ya mwanafunzi",
    "Prototype Preview — Demonstration Only": "Hakiki ya mfano — kwa maonyesho pekee",
    "Applicant Dashboard Preview": "Hakiki ya dashibodi ya mwombaji",
    "New application": "Maombi mapya",
    Applications: "Maombi",
    complete: "yamekamilika",
    "Saved universities": "Vyuo vilivyohifadhiwa",
    "Document checklist": "Orodha ya nyaraka",
    Account: "Akaunti",
    "Welcome back": "Karibu tena",
    Password: "Nenosiri",
    "Forgot password?": "Umesahau nenosiri?",
    "Create your account": "Fungua akaunti yako",
    "Create account (integration ready)": "Fungua akaunti (tayari kuunganishwa)",
    "Frank guidance for global study.": "Mwongozo wa wazi wa masomo ya kimataifa.",
    "Company & Heritage": "Kampuni na historia",
    "Personal, transparent guidance from day one.":
      "Mwongozo wa kibinafsi na wazi tangu siku ya kwanza.",
    Established: "Ilianzishwa",
    "How we work": "Jinsi tunavyofanya kazi",
    "What you can expect.": "Unachoweza kutarajia.",
    Team: "Timu",
    "People behind the plan.": "Watu walio nyuma ya mpango.",
    "Let’s talk about your next step.": "Tuongee kuhusu hatua yako inayofuata.",
    "Social Channels": "Mitandao ya kijamii",
    "Preferred destination": "Nchi unayopendelea",
    "Tell us about your study plans": "Tuambie kuhusu mipango yako ya masomo",
    "Continue in email": "Endelea kwa barua pepe",
    Breadcrumb: "Njia ya ukurasa",
    "Photo Gallery Lightbox": "Matunzio ya picha",
    "Switch to English": "Badili kwenda Kiingereza",
    "Türkçe diline geç": "Badili kwenda Kituruki",
    "Explore Programmes": "Chunguza programu za masomo",
    "We connect students, families, and investors to verified global opportunities through world-class university admissions, trusted property advisory, and professional services.":
      "Tunawaunganisha wanafunzi, familia na wawekezaji na fursa za kimataifa zilizothibitishwa, udahili wa vyuo na huduma za kitaalamu.",
    "Education, real estate, creative services, and property care — all delivered under one trusted name.":
      "Elimu, mali, huduma za ubunifu na utunzaji wa nyumba chini ya jina moja linaloaminika.",
    "End-to-end guidance matching your academic background and aspirations with verified institutions worldwide.":
      "Mwongozo kamili unaolingana na historia yako ya masomo na malengo yako na taasisi zilizothibitishwa duniani.",
    "University Admissions & Programme Matching": "Udahili wa vyuo na ulinganishaji wa programu",
    "Scholarships up to 100%*": "Ufadhili wa masomo hadi asilimia 100*",
    "Visa Guidance & Interview Prep": "Mwongozo wa visa na maandalizi ya mahojiano",
    "Student Dorms & Accommodation": "Mabweni na malazi ya wanafunzi",
    "Airport Pickup & Arrival Reception": "Mapokezi na usafiri kutoka uwanja wa ndege",
    "Strategic property acquisition, design-refurbished villas, and coastal residences across North Cyprus, UK, and UAE.":
      "Ununuzi wa mali, nyumba zilizokarabatiwa na makazi ya pwani Kaskazini mwa Saiprasi, Uingereza na UAE.",
    "North Cyprus Residential Villas": "Nyumba za makazi Kaskazini mwa Saiprasi",
    "Seafront Resort Residences": "Makazi ya mapumziko kando ya bahari",
    "Property Acquisition Advisory": "Ushauri wa ununuzi wa mali",
    "UK & Dubai Opportunities": "Fursa Uingereza na Dubai",
    "Brand development, bespoke websites, student portfolio polish, and creative digital solutions by Frankedu.":
      "Ukuzaji wa chapa, tovuti maalum, uboreshaji wa jalada la mwanafunzi na suluhisho za kidijitali za Frankedu.",
    "Brand Identity & Logo Design": "Utambulisho wa chapa na usanifu wa nembo",
    "Modern Website Development": "Utengenezaji wa tovuti za kisasa",
    "Academic CV & Portfolio Polish": "Uboreshaji wa CV ya kitaaluma na jalada",
    "Social & Digital Marketing": "Masoko ya kijamii na kidijitali",
    "Creative Media Solutions": "Suluhisho za vyombo vya habari na ubunifu",
    "Professional residential cleaning, student move-in preparation, and dependable property care services in North Cyprus.":
      "Usafi wa nyumba, maandalizi ya wanafunzi kuhamia na utunzaji wa mali Kaskazini mwa Saiprasi.",
    "Move-in & Move-out Turnover Cleaning": "Usafi wakati wa kuingia na kutoka",
    "Student Apartment Refresh": "Usafi na uandaaji upya wa nyumba ya mwanafunzi",
    "Residential & Commercial Care": "Utunzaji wa nyumba na biashara",
    "Flexible Service Scheduling": "Ratiba ya huduma inayobadilika",
    "Local On-the-Ground Team": "Timu ya eneo husika",
    "Explore high-demand study hubs and receive verified guidance based on your academic goals, budget, and preferred intake.":
      "Chunguza nchi maarufu za masomo na upate mwongozo uliothibitishwa kulingana na malengo yako, bajeti na kipindi unachopendelea.",
    "Straightforward guidance from your shortlist to your arrival plans — with every requirement clearly explained.":
      "Mwongozo wazi kutoka kuchagua vyuo hadi kupanga kuwasili, huku kila sharti likielezwa.",
    "Housing, essentials and trusted services from the Frankedu community.":
      "Makazi, mahitaji ya msingi na huduma zinazoaminika kutoka jumuiya ya Frankedu.",
    "Verified student housing options near campus, managed separately from property investments.":
      "Makazi ya wanafunzi yaliyothibitishwa karibu na chuo, yanayosimamiwa tofauti na uwekezaji wa mali.",
    "Curated opportunities across North Cyprus, the UK, and selected Dubai/UAE markets. Student accommodation is managed separately.":
      "Fursa zilizochaguliwa Kaskazini mwa Saiprasi, Uingereza na baadhi ya masoko ya Dubai/UAE. Malazi ya wanafunzi yanasimamiwa kando.",
    "Frankedu Global provides direct assistance for property viewing, map location verification, and purchase coordination in North Cyprus.":
      "Frankedu Global husaidia moja kwa moja kutembelea mali, kuthibitisha eneo kwenye ramani na kuratibu ununuzi Kaskazini mwa Saiprasi.",
    "Independent conveyancing recommended for all real estate transactions. Contact our team for verified information and assistance.":
      "Ushauri huru wa kisheria unapendekezwa kwa miamala yote ya mali. Wasiliana na timu yetu upate taarifa zilizothibitishwa na msaada.",
    "A beautifully renovated villa finished with a design-led approach and prepared for resale. This property is suitable for buyers looking for a refreshed home or investment opportunity in North Cyprus.":
      "Nyumba iliyokarabatiwa kwa umakini na kuandaliwa kuuzwa tena. Mali hii inaweza kuwafaa wanunuzi wanaotafuta nyumba iliyoboreshwa au fursa ya uwekezaji Kaskazini mwa Saiprasi.",
    "Full property photographs and the exact map location are available upon request. Contact Frankedu Global for viewing arrangements and dedicated purchasing assistance.":
      "Picha zote na eneo halisi kwenye ramani hutolewa ukiomba. Wasiliana na Frankedu Global kupanga ziara na kupata msaada wa ununuzi.",
    "Renovated and design-refurbished villa": "Nyumba iliyokarabatiwa na kupangwa upya",
    "North Cyprus location": "Eneo la Kaskazini mwa Saiprasi",
    "Full property photo gallery available": "Matunzio kamili ya picha za mali yanapatikana",
    "Viewing and purchase assistance available": "Msaada wa kutembelea na kununua unapatikana",
    "Cyprus / North Cyprus": "Saiprasi / Kaskazini mwa Saiprasi",
    "Europe / Mediterranean": "Ulaya / Mediterania",
    "United Kingdom": "Uingereza",
    "North America": "Amerika Kaskazini",
    "Europe / Nordic": "Ulaya / Nchi za Nordic",
    Germany: "Ujerumani",
    Poland: "Polandi",
    Finland: "Ufini",
    Netherlands: "Uholanzi",
    Australia: "Australia",
    China: "China",
    Oceania: "Oceania",
    "On-campus student residence": "Makazi ya wanafunzi ndani ya chuo",
    Dormitory: "Bweni",
    "Inquire for semester rates": "Uliza kuhusu ada za muhula",
    "Campus vicinity, North Cyprus": "Karibu na chuo, Kaskazini mwa Saiprasi",
    "Utilities included": "Gharama za huduma zimejumuishwa",
    "Campus security": "Usalama wa chuo",
    "High-speed Wi-Fi": "Wi-Fi ya kasi",
    "Inquire for availability": "Uliza kuhusu upatikanaji",
    "Shared student apartment": "Nyumba ya pamoja ya wanafunzi",
    "Shared flat": "Nyumba ya pamoja",
    "Student quarter, North Cyprus": "Eneo la wanafunzi, Kaskazini mwa Saiprasi",
    "Fully furnished": "Ina samani zote",
    "Walking distance to transit": "Umbali wa kutembea hadi usafiri wa umma",
    "Dedicated study space": "Sehemu maalum ya kusomea",
    "Private student studio apartment": "Studio binafsi ya mwanafunzi",
    Apartment: "Fleti",
    "City centre, North Cyprus": "Katikati ya jiji, Kaskazini mwa Saiprasi",
    "Self-contained kitchen": "Jiko la kujitegemea",
    "Air conditioning": "Kiyoyozi",
    "Private balcony": "Balconi binafsi",
    "Student homestay & residential accommodation": "Makazi ya mwanafunzi kwa familia",
    Homestay: "Makazi ya familia",
    "Residential area, North Cyprus": "Eneo la makazi, Kaskazini mwa Saiprasi",
    "Safe residential setting": "Eneo salama la makazi",
    "Furnished bedroom": "Chumba chenye samani",
    "Local community immersion": "Kujifunza maisha ya jumuiya ya eneo",
    "Price on inquiry": "Uliza kuhusu bei",
    "Sarcon №87 · For Sale": "Sarcon №87 · Inauzwa",
    "Renovated / design-refurbished villa": "Nyumba iliyokarabatiwa / kupangwa upya",
    "For sale": "Inauzwa",
    "Exact map location supplied upon enquiry": "Eneo halisi hutolewa ukiomba",
    "Sample Applicant (Prototype Preview)": "Mwombaji wa mfano (hakiki ya programu)",
    "International Applicant": "Mwombaji wa kimataifa",
    "Upcoming Intake": "Kipindi kijacho cha udahili",
    "Sample Programme Application (Prototype Preview)": "Maombi ya mfano (hakiki ya programu)",
    "Under review": "Yanapitiwa",
    "Financial evidence": "Uthibitisho wa fedha",
    "Frank & transparent": "Wazi na waaminifu",
    "Honest, realistic advice regarding admissions criteria, visa regulations, and living costs — with no overselling.":
      "Ushauri wa kweli kuhusu vigezo vya udahili, kanuni za visa na gharama za maisha bila ahadi zilizopitiliza.",
    "Comprehensive support": "Msaada kamili",
    "From programme matching and visa preparation to arrival reception, accommodation, and property investment guidance.":
      "Kuanzia kuchagua programu na kuandaa visa hadi mapokezi, malazi na ushauri wa uwekezaji wa mali.",
    "Supported destinations": "Nchi zinazoungwa mkono",
    "Scholarship range": "Kiwango cha ufadhili",
    "Up to 100%": "Hadi asilimia 100",
    "Inquire for current intakes": "Uliza kuhusu vipindi vya sasa vya udahili",
    "Scholarship-eligible (up to 100% at selected institutions)":
      "Ufadhili unapatikana (hadi 100% katika taasisi zilizochaguliwa)",
    "Undergraduate and postgraduate pathways across England, Scotland, Wales, and Northern Ireland.":
      "Njia za shahada ya kwanza na uzamili kote England, Scotland, Wales na Northern Ireland.",
    "Intensive 1-year master's degrees": "Shahada za uzamili za mwaka mmoja",
    "Graduate Route post-study work visa opportunities":
      "Fursa za visa ya kazi ya Graduate Route baada ya masomo",
    "Admissions and visa advisory support": "Msaada wa ushauri wa udahili na visa",
    "Colleges and universities offering co-op work terms and post-graduation pathways.":
      "Vyuo vinavyotoa vipindi vya masomo pamoja na kazi na njia za baada ya kuhitimu.",
    "Post-Graduation Work Permit (PGWP) eligible programmes":
      "Programu zinazostahiki kibali cha kazi baada ya kuhitimu (PGWP)",
    "Co-op work placements and internship pathways":
      "Uwekaji kazini na nafasi za mafunzo kwa vitendo",
    "Undergraduate and postgraduate diploma pathways":
      "Njia za diploma za shahada ya kwanza na uzamili",
    "Renowned engineering, business, and research programmes at public and private institutions.":
      "Programu maarufu za uhandisi, biashara na utafiti katika taasisi za umma na binafsi.",
    "English-taught undergraduate and master's programmes":
      "Programu za shahada ya kwanza na uzamili zinazofundishwa kwa Kiingereza",
    "18-month post-study job seeker visa": "Visa ya miezi 18 ya kutafuta kazi baada ya masomo",
    "Strong industrial and technological ecosystem": "Mfumo imara wa viwanda na teknolojia",
    "High-quality European education with accessible tuition fees and vibrant university cities.":
      "Elimu bora ya Ulaya yenye ada nafuu na miji hai ya vyuo vikuu.",
    "Schengen Area European standard qualifications":
      "Sifa za elimu za kiwango cha Ulaya katika eneo la Schengen",
    "Affordable living costs and medical/technical faculties":
      "Gharama nafuu za maisha na vyuo vya tiba/ufundi",
    "English-medium bachelor's and master's tracks":
      "Programu za shahada ya kwanza na uzamili kwa Kiingereza",
    "Leading Nordic education focused on innovation, research, technology, and applied sciences.":
      "Elimu bora ya Nordic inayolenga ubunifu, utafiti, teknolojia na sayansi tumizi.",
    "Top-ranked global education model": "Mfumo wa elimu unaotambulika duniani",
    "Post-study work and residency pathways": "Njia za kazi na ukaazi baada ya masomo",
    "High quality of life and modern learning environments":
      "Maisha bora na mazingira ya kisasa ya kujifunzia",
    "One of continental Europe's largest catalogues of English-taught degree programmes.":
      "Mojawapo ya orodha kubwa zaidi za programu za shahada kwa Kiingereza barani Ulaya.",
    "Extensive English-taught programmes at research and applied universities":
      "Programu nyingi za Kiingereza katika vyuo vya utafiti na sayansi tumizi",
    "One-year 'Orientation Year' (zoekjaar) post-study work visa":
      "Visa ya kazi ya mwaka mmoja ya 'Orientation Year' (zoekjaar)",
    "Central European location and international student community":
      "Eneo la Ulaya ya Kati na jumuiya ya wanafunzi wa kimataifa",
    "Globally recognized degrees with strong student support and post-study work opportunities.":
      "Shahada zinazotambuliwa duniani pamoja na msaada wa wanafunzi na fursa za kazi baada ya masomo.",
    "Work rights during study and Temporary Graduate visas":
      "Haki ya kufanya kazi wakati wa masomo na visa za Temporary Graduate",
    "World-class campus facilities and high living standards":
      "Miundombinu bora ya chuo na viwango vya juu vya maisha",
    "Undergraduate, postgraduate, and vocational training options":
      "Chaguo za shahada ya kwanza, uzamili na mafunzo ya ufundi",
    "International study hub with modern university campuses and generous scholarship programmes.":
      "Kituo cha masomo cha kimataifa chenye kampasi za kisasa na programu za ufadhili.",
    "Government, provincial, and university scholarship options":
      "Ufadhili wa serikali, mikoa na vyuo vikuu",
    "Expanding English-taught degree offerings":
      "Programu za shahada kwa Kiingereza zinazoongezeka",
    "Exposure to one of the world's leading economic ecosystems":
      "Fursa ya kufahamu mojawapo ya mifumo mikuu ya uchumi duniani",
    "Message Frankedu Global to discuss countries, courses, scholarships, tuition, and your application pathway.":
      "Tuma ujumbe kwa Frankedu Global kujadili nchi, kozi, ufadhili, ada na njia ya maombi yako.",
    "Something went wrong on our end. You can try refreshing or head back home.":
      "Hitilafu imetokea. Jaribu kupakia upya au urudi mwanzo.",
    "Germany, UK, Cyprus…": "Ujerumani, Uingereza, Saiprasi…",
    "Business, Engineering, IT…": "Biashara, uhandisi, TEHAMA…",
    "University Admissions & Matching": "Udahili wa vyuo na ulinganishaji wa programu",
    "Eco Luxury & Property Care": "Eco Luxury na utunzaji wa mali",
    "Turnover cleaning & maintenance": "Usafi wa nyumba na matengenezo",
    "Talk to our advisory team in Lefkoşa or connect directly online for university applications, property viewings, and professional services.":
      "Zungumza na timu yetu ya ushauri Lefkoşa au wasiliana nayo mtandaoni kuhusu maombi ya vyuo, kutembelea mali na huduma za kitaalamu.",
    "Inquire for this destination": "Uliza kuhusu nchi hii",
    "Programmes at": "Programu katika",
    "programmes found": "programu zimepatikana",
    "Funding that fits your plan.": "Ufadhili unaolingana na mpango wako.",
    "Dormitories, shared flats and private apartments near campus.":
      "Mabweni, nyumba za pamoja na fleti binafsi karibu na chuo.",
    "Browse accommodation →": "Vinjari malazi →",
    "Buy or rent long-term — including student investment properties.":
      "Nunua au pangisha kwa muda mrefu, pamoja na mali za uwekezaji wa wanafunzi.",
    "Browse real estate →": "Vinjari mali →",
    "Property & Investment": "Mali na uwekezaji",
    "Property for families, buyers and investors.": "Mali kwa familia, wanunuzi na wawekezaji.",
    "The requested property is unavailable or may have been updated.":
      "Mali uliyoomba haipatikani au huenda imesasishwa.",
    "Please check our current property opportunities or contact our advisors directly for the latest available inventory.":
      "Angalia fursa za sasa za mali au wasiliana na washauri wetu kupata orodha mpya.",
    "A design-refurbished villa prepared for resale in North Cyprus. Complete verified property photography and viewing assistance available.":
      "Nyumba iliyokarabatiwa kwa mtindo wa kisasa na kuandaliwa kuuzwa tena Kaskazini mwa Saiprasi. Picha zilizothibitishwa na msaada wa ziara vinapatikana.",
    "Status:": "Hali:",
    of: "kati ya",
    "Complete four short steps, then send your details to our advisor on WhatsApp.":
      "Kamilisha hatua nne fupi kisha utume taarifa zako kwa mshauri kupitia WhatsApp.",
    "Hello Frankedu Global, I'd like guidance with my study application.":
      "Habari Frankedu Global, ningependa kupata mwongozo kuhusu maombi yangu ya masomo.",
    "Continue opens WhatsApp with these details for you to review and send. Documents are not uploaded or sent in this step.":
      "Ukiendelea, WhatsApp itafunguka na taarifa hizi ili uzikague na kuzituma. Nyaraka hazipakwi wala kutumwa katika hatua hii.",
    Email: "Barua pepe",
    Phone: "Simu",
    "Demonstration tracker for programme applications and document checklists.":
      "Kifuatiliaji cha maonyesho cha maombi ya programu na orodha za nyaraka.",
    "Need help with a document?": "Unahitaji msaada kuhusu nyaraka?",
    "Your counsellor replies within 24 hours.": "Mshauri wako atajibu ndani ya saa 24.",
    "Message counsellor": "Mtumie ujumbe mshauri",
    "Sign out (prototype) →": "Toka (mfano) →",
    "Student account access will be connected here when the application system is ready.":
      "Ufikiaji wa akaunti ya mwanafunzi utaunganishwa hapa mfumo wa maombi utakapokuwa tayari.",
    "Ready for authentication integration": "Tayari kwa kuunganisha uthibitishaji wa mtumiaji",
    "Log in (integration ready)": "Ingia (tayari kuunganishwa)",
    "New to Frankedu?": "Je, wewe ni mgeni Frankedu?",
    "Preview student dashboard →": "Hakiki dashibodi ya mwanafunzi →",
    "Start your global study journey": "Anza safari yako ya masomo ya kimataifa",
    "Create your profile when you’re ready to save opportunities and begin an application.":
      "Fungua wasifu wako ukiwa tayari kuhifadhi fursa na kuanza maombi.",
    "Country of residence": "Nchi unayoishi",
    "Confirm password": "Thibitisha nenosiri",
    "Already have an account?": "Tayari una akaunti?",
    "Log in": "Ingia",
    "Get in touch": "Wasiliana nasi",
    "Verified Guidance": "Mwongozo uliothibitishwa",
    "Direct advisory for university admissions, scholarships, and overseas property.":
      "Ushauri wa moja kwa moja kuhusu udahili wa vyuo, ufadhili na mali nje ya nchi.",
    "Message on WhatsApp": "Tuma ujumbe WhatsApp",
    "Contact us": "Wasiliana nasi",
    "Reach us on WhatsApp for the fastest reply, or prepare an email below.":
      "Wasiliana nasi WhatsApp upate jibu la haraka, au andaa barua pepe hapa chini.",
    "Frankedu Global website enquiry": "Ujumbe kutoka tovuti ya Frankedu Global",
    Office: "Ofisi",
    "This opens your email app with the message ready. You will need to send it there; the website does not submit or store it.":
      "Programu yako ya barua pepe itafunguka na ujumbe ukiwa tayari. Utahitaji kuutuma humo; tovuti haitumi wala kuhifadhi ujumbe.",
    "Scholarships up to 100% for eligible students at selected institutions":
      "Ufadhili hadi asilimia 100 kwa wanafunzi wanaostahiki katika taasisi zilizochaguliwa",
    "Affordable cost of living and student accommodation":
      "Gharama nafuu za maisha na malazi ya wanafunzi",
    Europe: "Ulaya",
    "Inquire for current intake cycles": "Uliza kuhusu vipindi vya sasa vya udahili",
    "Contact advisor for verified fee schedules":
      "Wasiliana na mshauri upate ratiba ya ada iliyothibitishwa",
    Canada: "Kanada",
    "Airport pickup & meet-and-greet": "Mapokezi na usafiri kutoka uwanja wa ndege",
    "Inquire upon booking": "Uliza unapoweka nafasi",
    "Ercan / Larnaca Airport": "Uwanja wa ndege wa Ercan / Larnaca",
    "Personalized arrival reception and transfer directly to student accommodation.":
      "Mapokezi ya kibinafsi wakati wa kuwasili na usafiri wa moja kwa moja hadi malazi ya mwanafunzi.",
    "Local SIM & student banking onboarding":
      "Msaada wa SIM ya eneo na huduma za benki za wanafunzi",
    "Lefkoşa & Girne": "Lefkoşa na Girne",
    "Guided onboarding for a local phone number, student banking, and essential accounts.":
      "Mwongozo wa kupata nambari ya simu ya eneo, huduma za benki za wanafunzi na akaunti muhimu.",
    "Campus & city orientation walk": "Ziara ya kutambulisha chuo na jiji",
    "North Cyprus": "Kaskazini mwa Saiprasi",
    "Orientation covering campus facilities, public transit, supermarkets, and student amenities.":
      "Ziara inayotambulisha huduma za chuo, usafiri wa umma, maduka na huduma za wanafunzi.",
    "Academic textbooks & study bundle": "Vitabu vya masomo na kifurushi cha kujifunzia",
    Books: "Vitabu",
    "Core university course textbooks and study guides from previous intake cohorts.":
      "Vitabu muhimu vya masomo ya chuo na miongozo ya kujifunzia ya wanafunzi wa awali.",
    "Student study desk & ergonomic chair": "Dawati la kusomea na kiti cha mwanafunzi",
    Furniture: "Samani",
    Lefkoşa: "Lefkoşa",
    "Compact desk and seating set ideal for student flat or dorm room setups.":
      "Dawati dogo na kiti kinachofaa kwa nyumba au chumba cha bweni cha mwanafunzi.",
    "Campus city bicycle": "Baiskeli ya chuo na jiji",
    Transport: "Usafiri",
    "Reliable city bicycle with lock and safety lights for easy campus commute.":
      "Baiskeli ya mjini ya kuaminika yenye kufuli na taa za usalama kwa safari rahisi kwenda chuoni.",
    "Renovated Villa for Sale in North Cyprus":
      "Nyumba iliyokarabatiwa inauzwa Kaskazini mwa Saiprasi",
    "Renovated Villa for Sale in North Cyprus | Frankedu Global":
      "Nyumba iliyokarabatiwa inauzwa Kaskazini mwa Saiprasi | Frankedu Global",
    "Explore Sarcon №87, a renovated villa for sale in North Cyprus. View the property gallery and contact Frankedu Global for viewing and purchase assistance.":
      "Chunguza Sarcon №87, nyumba iliyokarabatiwa inayouzwa Kaskazini mwa Saiprasi. Tazama picha na uwasiliane na Frankedu Global kuhusu ziara na msaada wa ununuzi.",
    "Sarcon 87 renovated villa in North Cyprus – exterior street view and gated entrance":
      "Nyumba ya Sarcon 87 iliyokarabatiwa Kaskazini mwa Saiprasi – mwonekano wa nje na lango la kuingia",
    "Exterior Street View & Gated Entrance": "Mwonekano wa nje na lango",
    "Cover / Main Exterior": "Picha kuu / nje ya nyumba",
    "Sarcon 87 renovated villa in North Cyprus – surrounding coastal neighborhood and Mediterranean sea views":
      "Nyumba ya Sarcon 87 iliyokarabatiwa Kaskazini mwa Saiprasi – kitongoji cha pwani na mandhari ya Bahari ya Mediterania",
    "Surrounding Coastal Neighborhood & Sea View": "Kitongoji cha pwani na mandhari ya bahari",
    "Location & Setting": "Mahali na mazingira",
    "Sarcon 87 renovated villa in North Cyprus – spacious double-height living room with exposed timber beams":
      "Nyumba ya Sarcon 87 iliyokarabatiwa Kaskazini mwa Saiprasi – sebule pana yenye dari refu na mihimili ya mbao",
    "Double-Height Living Room": "Sebule yenye dari refu",
    "Living Space": "Sehemu ya kuishi",
    "Sarcon 87 renovated villa in North Cyprus – ground-floor living area, wrought-iron staircase, and hallway entrance":
      "Nyumba ya Sarcon 87 iliyokarabatiwa Kaskazini mwa Saiprasi – sebule ya chini, ngazi za chuma na mlango wa korido",
    "Living Area & Feature Staircase": "Sebule na ngazi maalum",
    "Interior Architecture": "Usanifu wa ndani",
    "Sarcon 87 renovated villa in North Cyprus – contemporary renovated kitchen and open-plan dining space":
      "Nyumba ya Sarcon 87 iliyokarabatiwa Kaskazini mwa Saiprasi – jiko la kisasa na sehemu wazi ya kula",
    "Renovated Kitchen & Dining": "Jiko lililokarabatiwa na sehemu ya kula",
    "Kitchen & Dining": "Jiko na sehemu ya kula",
    "Hi, I'm interested in Sarcon №87 (Renovated Villa for Sale in North Cyprus). Could you share verified details and viewing availability?":
      "Habari, ninavutiwa na Sarcon №87 (nyumba iliyokarabatiwa inayouzwa Kaskazini mwa Saiprasi). Tafadhali nitumie taarifa zilizothibitishwa na muda wa ziara.",
    "Sarcon №87: Renovated Villa for Sale": "Sarcon №87: Nyumba iliyokarabatiwa inauzwa",
    "Renovated Villa": "Nyumba iliyokarabatiwa",
    "Design-refurbished villa": "Nyumba iliyokarabatiwa kwa usanifu maalum",
    "Full photo gallery available": "Matunzio kamili ya picha yanapatikana",
    "Foreign buyer eligible*": "Mnunuzi wa kigeni anastahiki*",
    "Immediate / For sale": "Inapatikana mara moja / inauzwa",
    "North Cyprus: Residential, Off-Plan & Investment Properties":
      "Kaskazini mwa Saiprasi: nyumba, miradi inayoendelea na mali za uwekezaji",
    "Inquire for current opportunities": "Uliza kuhusu fursa za sasa",
    "Residential properties": "Nyumba za makazi",
    "Off-plan developments": "Miradi inayojengwa",
    "Investment properties": "Mali za uwekezaji",
    "Inquire for details": "Uliza maelezo zaidi",
    "Seafront Resort Residences development in Esentepe, North Cyprus":
      "Mradi wa Seafront Resort Residences Esentepe, Kaskazini mwa Saiprasi",
    "United Kingdom: Residential & Investment Opportunities":
      "Uingereza: fursa za makazi na uwekezaji",
    "Residential & Investment": "Makazi na uwekezaji",
    "Residential opportunities": "Fursa za makazi",
    "Acquisition and advisory guidance": "Mwongozo wa ununuzi na ushauri",
    "Dubai/UAE: Selected Investment Opportunities": "Dubai/UAE: fursa maalum za uwekezaji",
    "Selected Investment Opportunities": "Fursa maalum za uwekezaji",
    "Dubai / UAE": "Dubai / UAE",
    "Selected property opportunities": "Fursa maalum za mali",
    "Investor acquisition advisory": "Ushauri wa ununuzi kwa wawekezaji",
    "Market opportunities": "Fursa za soko",
    "Final International University Scholarships":
      "Ufadhili wa masomo wa Final International University",
    "Up to 100% for eligible students": "Hadi asilimia 100 kwa wanafunzi wanaostahiki",
    "Undergraduate & Postgraduate": "Shahada ya kwanza na uzamili",
    "Contact advisor": "Wasiliana na mshauri",
    "Scholarships can be up to 100% for eligible students at selected institutions based on academic merit, quota availability, or early application.":
      "Katika taasisi zilizochaguliwa, wanafunzi wanaostahiki wanaweza kupata ufadhili hadi asilimia 100 kulingana na ufaulu, nafasi zilizopo au maombi ya mapema.",
    "Merit-based waivers and institutional awards available across supported destinations. Assessed upon academic profile review.":
      "Msamaha wa ada na tuzo za taasisi kulingana na ufaulu zinapatikana katika nchi zinazoungwa mkono. Tathmini hufanywa baada ya kupitia rekodi ya masomo.",
    "Business & Management": "Biashara na usimamizi",
    "Engineering & Technology": "Uhandisi na teknolojia",
    "Computer Science & IT": "Sayansi ya kompyuta na TEHAMA",
    "Health Sciences & Nursing": "Sayansi ya afya na uuguzi",
    "Law & International Relations": "Sheria na uhusiano wa kimataifa",
    "Hospitality & Tourism": "Ukarimu na utalii",
    "Architecture & Fine Arts": "Usanifu majengo na sanaa",
    "Social Sciences & Humanities": "Sayansi za jamii na ubinadamu",
    "End-to-end guidance matching your academic background and aspirations with verified institutions.":
      "Mwongozo kamili unaolingana na historia yako ya masomo na malengo yako na taasisi zilizothibitishwa.",
    "Programme matching across 9+ supported destinations":
      "Ulinganishaji wa programu katika nchi zaidi ya 9 zinazoungwa mkono",
    "Document readiness & academic credential check":
      "Maandalizi ya nyaraka na ukaguzi wa vyeti vya masomo",
    "Official portal submission & offer letter follow-up":
      "Kutuma maombi kwenye tovuti rasmi na kufuatilia barua ya ofa",
    "Scholarships can be up to 100% for eligible students at selected institutions — we guide your application.":
      "Ufadhili unaweza kufikia asilimia 100 kwa wanafunzi wanaostahiki katika taasisi zilizochaguliwa; tunakuongoza katika maombi.",
    "Up to 100% scholarship evaluation at selected institutions":
      "Tathmini ya ufadhili hadi asilimia 100 katika taasisi zilizochaguliwa",
    "Merit and country-quota matching": "Ulinganishaji kulingana na ufaulu na nafasi za nchi",
    "Transparent fee planning before you commit": "Mipango wazi ya ada kabla ya kufanya uamuzi",
    "Structured support to prepare a compliant student visa application with proper documentation.":
      "Msaada uliopangwa wa kuandaa maombi ya visa ya mwanafunzi yanayokidhi masharti na nyaraka zinazofaa.",
    "Financial evidence and sponsorship checklist": "Orodha ya uthibitisho wa fedha na udhamini",
    "Embassy and consular interview preparation": "Maandalizi ya mahojiano ya ubalozi na konseli",
    "Visa submission timing & appointment advice":
      "Ushauri kuhusu muda wa kuwasilisha visa na miadi",
    "Verified student dormitories and rentals near campus, kept strictly separate from investment property.":
      "Mabweni na nyumba za kupanga zilizothibitishwa karibu na chuo, zinazosimamiwa tofauti kabisa na mali za uwekezaji.",
    "On-campus and off-campus student housing options": "Makazi ya wanafunzi ndani na nje ya chuo",
    "Airport pickup and meet-and-greet reception": "Mapokezi na usafiri kutoka uwanja wa ndege",
    "Local SIM card & bank account onboarding":
      "Msaada wa SIM ya eneo na kufungua akaunti ya benki",
    "Strategic property acquisition, rentals, and capital growth advisory across our primary markets.":
      "Ushauri wa kimkakati kuhusu ununuzi wa mali, upangishaji na ongezeko la thamani katika masoko yetu makuu.",
    "North Cyprus: residential, off-plan and investment properties":
      "Kaskazini mwa Saiprasi: nyumba, miradi inayoendelea na mali za uwekezaji",
    "United Kingdom: residential and investment opportunities":
      "Uingereza: fursa za makazi na uwekezaji",
    "Dubai/UAE: selected investment opportunities": "Dubai/UAE: fursa maalum za uwekezaji",
    "Guidance for post-study career opportunities alongside creative branding and digital design solutions.":
      "Mwongozo kuhusu fursa za kazi baada ya masomo pamoja na suluhisho za chapa na usanifu wa kidijitali.",
    "Post-study work route insights across key destinations":
      "Taarifa kuhusu njia za kazi baada ya masomo katika nchi kuu",
    "Professional CV and application profile review":
      "Mapitio ya kitaalamu ya CV na wasifu wa maombi",
    "Graphic, web design & branding solutions by Frankedu":
      "Suluhisho za michoro, usanifu wa tovuti na chapa kutoka Frankedu",
    "Kyrenia (Girne)": "Kyrenia (Girne)",
    "Bachelor's, Master's, PhD": "Shahada ya kwanza, uzamili, uzamivu",
    "Programmes available across confirmed faculties (contact advisor)":
      "Programu zinapatikana katika vitivo vilivyothibitishwa (wasiliana na mshauri)",
    "Contact advisor for intake schedules": "Wasiliana na mshauri kuhusu vipindi vya udahili",
    "Residential, Off-Plan & Investment": "Makazi, miradi inayoendelea na uwekezaji",
    "Scholarships & Financial Guidance": "Ufadhili wa masomo na mwongozo wa kifedha",
    "Student Visa Guidance & Interview Prep":
      "Mwongozo wa visa ya mwanafunzi na maandalizi ya mahojiano",
    "Student Accommodation & Relocation": "Malazi ya wanafunzi na msaada wa kuhamia",
    "Property & Investment Advisory": "Ushauri kuhusu mali na uwekezaji",
    "Career Support & Digital Services": "Msaada wa kazi na huduma za kidijitali",
    "Contact advisor for verified fee schedule":
      "Wasiliana na mshauri upate ratiba ya ada iliyothibitishwa",
    "Explore university options & tuition": "Chunguza chaguo za vyuo na ada",
    "Contact us about study destinations and university admissions.":
      "Wasiliana nasi kuhusu nchi za masomo na udahili wa vyuo.",
    "Global Opportunities.": "Fursa za kimataifa.",
    "Study guidance • Property information": "Mwongozo wa masomo • Taarifa za mali",
    "Study options & scholarships": "Chaguo za masomo na ufadhili",
    "Guidance on study options based on your academic background and aspirations.":
      "Mwongozo kuhusu chaguo za masomo kulingana na historia na malengo yako ya kitaaluma.",
    "Buyer Eligibility Information*": "Taarifa za ustahiki wa mnunuzi*",
    "Explore study destinations and discuss options based on your academic goals, budget, and preferred intake.":
      "Chunguza nchi za masomo na ujadili chaguo kulingana na malengo yako ya kitaaluma, bajeti na kipindi unachopendelea.",
    "University Pathways.": "Njia za masomo ya chuo kikuu.",
    "We have a confirmed recruitment relationship with Final International University (FIU). Contact us for current programme and admissions details.":
      "Tuna uhusiano wa udahili uliothibitishwa na Final International University (FIU). Wasiliana nasi kwa taarifa za sasa kuhusu programu na udahili.",
    "Explore property opportunities across North Cyprus and selected international markets.":
      "Chunguza fursa za mali Kaskazini mwa Saiprasi na katika baadhi ya masoko ya kimataifa.",
    "*Buyer/title eligibility information is included in the listing and should be independently confirmed during legal conveyancing.":
      "*Taarifa za ustahiki wa mnunuzi na hati zilizo kwenye tangazo zinapaswa kuthibitishwa kwa kujitegemea wakati wa uhamisho wa kisheria.",
    "We have a confirmed recruitment relationship with Final International University (FIU). Contact us to discuss other study options.":
      "Tuna uhusiano wa udahili uliothibitishwa na Final International University (FIU). Wasiliana nasi kujadili chaguo nyingine za masomo.",
    "Contact us to discuss study options for this destination.":
      "Wasiliana nasi kujadili chaguo za masomo katika nchi hii.",
    "Search by subject and level. Contact us for current programme details and fee information.":
      "Tafuta kwa somo na kiwango. Wasiliana nasi kwa taarifa za sasa kuhusu programu na ada.",
    "Programme and admission information can change. Contact us for current details about available programmes, faculties, and requirements.":
      "Taarifa za programu na udahili zinaweza kubadilika. Wasiliana nasi kupata taarifa za sasa kuhusu programu, vitivo na masharti yanayopatikana.",
    "Compare key study destinations side by side. Contact us to discuss options for destinations not listed.":
      "Linganisha nchi kuu za masomo. Wasiliana nasi kujadili chaguo za nchi ambazo hazijaorodheshwa.",
    "Scholarship details depend on the institution and eligibility criteria. Contact us for current information.":
      "Taarifa za ufadhili hutegemea taasisi na vigezo vya ustahiki. Wasiliana nasi kupata taarifa za sasa.",
    "Listing states the title is suitable for a foreign national*":
      "Tangazo linasema hati inamfaa raia wa kigeni*",
    "Listing states title is suitable for foreign buyers*":
      "Tangazo linasema hati inawafaa wanunuzi wa kigeni*",
    "*Buyer/title eligibility information in the listing should be independently confirmed during legal conveyancing.":
      "*Taarifa za ustahiki wa mnunuzi na hati zilizo kwenye tangazo zinapaswa kuthibitishwa kwa kujitegemea wakati wa uhamisho wa kisheria.",
    "Frankedu Global provides guidance for students, families, and investors navigating university admissions, scholarships, student accommodation, and overseas property opportunities.":
      "Frankedu Global hutoa mwongozo kwa wanafunzi, familia na wawekezaji kuhusu udahili wa vyuo, ufadhili, malazi ya wanafunzi na fursa za mali nje ya nchi.",
    "Clear information": "Taarifa zilizo wazi",
    "We aim to provide clear information about admissions, tuition, and scholarship terms. Contact us for current details.":
      "Tunalenga kutoa taarifa zilizo wazi kuhusu udahili, ada na masharti ya ufadhili. Wasiliana nasi kupata maelezo ya sasa.",
    "Frankedu Global provides guidance for students and families. Contact us for current admissions, tuition, and scholarship details.":
      "Frankedu Global hutoa mwongozo kwa wanafunzi na familia. Wasiliana nasi kupata taarifa za sasa kuhusu udahili, ada na ufadhili.",
    "Company & Approach": "Kampuni na mtazamo",
    Brand: "Chapa",
    "Customer-facing brand": "Chapa inayotumika kwa wateja",
    Address: "Anwani",
    "Contact us online about university applications, property viewings, and professional services.":
      "Wasiliana nasi mtandaoni kuhusu maombi ya chuo, kutembelea mali na huduma za kitaalamu.",
    "English-medium degree programmes and scholarship opportunities at Final International University (FIU).":
      "Programu za shahada zinazofundishwa kwa Kiingereza na fursa za ufadhili katika Final International University (FIU).",
    "We help students, families, and investors explore study options, property information, and professional services.":
      "Tunawasaidia wanafunzi, familia na wawekezaji kuchunguza chaguo za masomo, taarifa za mali na huduma za kitaalamu.",
    "Personalized Guidance": "Mwongozo wa kibinafsi",
    "Property information & investment options": "Taarifa za mali na chaguo za uwekezaji",
    "Scholarships up to 100% for eligible students at Final International University (FIU)":
      "Ufadhili wa hadi asilimia 100 kwa wanafunzi wanaostahiki katika Final International University (FIU)",
    "Scholarship opportunities up to 100% at Final International University (FIU)":
      "Fursa za ufadhili wa hadi asilimia 100 katika Final International University (FIU)",
    "Scholarship-eligible (up to 100% at Final International University (FIU))":
      "Fursa za ufadhili wa hadi asilimia 100 katika Final International University (FIU)",
    "Scholarship opportunities at Final International University (FIU) can be up to 100% for eligible students. Contact us for current eligibility and award details.":
      "Ufadhili katika Final International University (FIU) unaweza kufikia asilimia 100 kwa wanafunzi wanaostahiki. Wasiliana nasi kwa vigezo na maelezo ya sasa.",
    "Scholarships up to 100% for eligible students":
      "Ufadhili wa hadi asilimia 100 kwa wanafunzi wanaostahiki",
    "Study guidance by destination and subject": "Mwongozo wa masomo kulingana na nchi na somo",
    "At Final International University (FIU), scholarships can be up to 100% for eligible students. Contact us for current details.":
      "Katika Final International University (FIU), ufadhili unaweza kufikia asilimia 100 kwa wanafunzi wanaostahiki. Wasiliana nasi kupata maelezo ya sasa.",
    "Scholarship opportunities at FIU for eligible students":
      "Fursa za ufadhili katika FIU kwa wanafunzi wanaostahiki",
    "Contact us for current scholarship criteria and award details":
      "Wasiliana nasi kwa vigezo na maelezo ya sasa ya ufadhili",
    "Review current tuition details before applying":
      "Kagua maelezo ya sasa ya ada kabla ya kutuma maombi",
    "FIU scholarship range": "Kiwango cha ufadhili wa FIU",
    "FIU scholarships up to 100% for eligible students":
      "Ufadhili wa FIU wa hadi asilimia 100 kwa wanafunzi wanaostahiki",
    "Contact advisor for current tuition information":
      "Wasiliana na mshauri kupata taarifa za sasa za ada",
    "Student dormitories and rentals near campus, kept strictly separate from investment property.":
      "Mabweni na nyumba za kupangisha karibu na chuo, zinazotenganishwa na mali za uwekezaji.",
  },
};

export function localizeText(locale: Locale, value: string): string {
  if (locale === "en") return value;
  const translated = phrases[locale]?.[value];
  if (translated) return translated;
  const applicationHelp = value.match(/^Hi, I need help with my application(?: (.*))?\.$/);
  const scholarshipEligibility = value.match(/^Hi, I'd like to know if I'm eligible for (.+)\.$/);
  const propertyPhoto = value.match(/^Photo ([1-5])$/);
  const propertyListingEnquiry = value.match(
    /^Hello Frankedu Global, I'm interested in "(.+)"\. Could you share current information\?$/,
  );
  if (propertyPhoto) {
    const photoLabel = locale === "tr" ? "Fotoğraf" : locale === "fr" ? "Photo" : "Picha";
    return `${photoLabel} ${propertyPhoto[1]}`;
  }
  if (locale === "tr") {
    if (value === "Hello Frankedu Global, I'd like to learn more about your services.")
      return "Merhaba Frankedu Global, hizmetleriniz hakkında daha fazla bilgi almak istiyorum.";
    if (applicationHelp)
      return `Merhaba, başvurumla ilgili yardıma ihtiyacım var.${applicationHelp[1] ? ` ${applicationHelp[1]}` : ""}`;
    if (scholarshipEligibility)
      return `${scholarshipEligibility[1]} için uygun olup olmadığımı öğrenmek istiyorum.`;
    if (propertyListingEnquiry)
      return `Merhaba Frankedu Global, "${propertyListingEnquiry[1]}" ilanıyla ilgileniyorum. Güncel bilgi alabilir miyim?`;
  }
  if (locale === "fr") {
    if (value === "Hello Frankedu Global, I'd like to learn more about your services.")
      return "Bonjour Frankedu Global, je souhaiterais en savoir plus sur vos services.";
    if (applicationHelp)
      return `Bonjour, j’ai besoin d’aide pour ma candidature.${applicationHelp[1] ? ` ${applicationHelp[1]}` : ""}`;
    if (scholarshipEligibility)
      return `Je souhaiterais savoir si je suis admissible à ${scholarshipEligibility[1]}.`;
    if (propertyListingEnquiry)
      return `Bonjour Frankedu Global, l’annonce « ${propertyListingEnquiry[1]} » m’intéresse. Pourriez-vous partager les informations actuelles ?`;
    const course = value.match(/^Hello Frankedu Global, I'd like to ask about (.+) at (.+)\.$/);
    if (course)
      return `Bonjour Frankedu Global, je souhaite me renseigner sur ${course[1]} à ${course[2]}.`;
    const listing = value.match(
      /^Hello Frankedu Global, I'm interested in "(.+)" \((.+)\)\. Could you share more information\?$/,
    );
    if (listing)
      return `Bonjour Frankedu Global, le bien « ${listing[1]} » (${listing[2]}) m’intéresse. Pourriez-vous m’en dire plus ?`;
    const market = value.match(
      /^Hello Frankedu Global, I'm interested in "(.+)" on the marketplace\. Could you share more information\?$/,
    );
    if (market)
      return `Bonjour Frankedu Global, l’article « ${market[1]} » sur le marché m’intéresse. Pourriez-vous m’en dire plus ?`;
  } else if (locale === "sw") {
    if (value === "Hello Frankedu Global, I'd like to learn more about your services.")
      return "Habari Frankedu Global, ningependa kupata maelezo zaidi kuhusu huduma zenu.";
    if (applicationHelp)
      return `Habari, ninahitaji msaada kuhusu maombi yangu.${applicationHelp[1] ? ` ${applicationHelp[1]}` : ""}`;
    if (scholarshipEligibility)
      return `Ningependa kujua ikiwa ninastahiki ${scholarshipEligibility[1]}.`;
    if (propertyListingEnquiry)
      return `Habari Frankedu Global, ninavutiwa na tangazo la "${propertyListingEnquiry[1]}". Tafadhali shiriki taarifa za sasa.`;
    const course = value.match(/^Hello Frankedu Global, I'd like to ask about (.+) at (.+)\.$/);
    if (course)
      return `Habari Frankedu Global, ningependa kuuliza kuhusu ${course[1]} katika ${course[2]}.`;
    const listing = value.match(
      /^Hello Frankedu Global, I'm interested in "(.+)" \((.+)\)\. Could you share more information\?$/,
    );
    if (listing)
      return `Habari Frankedu Global, ninavutiwa na "${listing[1]}" (${listing[2]}). Tafadhali nitumie maelezo zaidi.`;
    const market = value.match(
      /^Hello Frankedu Global, I'm interested in "(.+)" on the marketplace\. Could you share more information\?$/,
    );
    if (market)
      return `Habari Frankedu Global, ninavutiwa na "${market[1]}" sokoni. Tafadhali nitumie maelezo zaidi.`;
  }
  return value;
}

export function localizeTree<T>(locale: Locale, value: T): T {
  if (typeof value === "string") return localizeText(locale, value) as T;
  if (typeof value === "function") {
    return ((...args: unknown[]) =>
      localizeText(locale, String((value as (...values: unknown[]) => unknown)(...args)))) as T;
  }
  if (Array.isArray(value)) return value.map((item) => localizeTree(locale, item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        key === "href" || key === "slug" || key.endsWith("Slug") || key === "src"
          ? item
          : localizeTree(locale, item),
      ]),
    ) as T;
  }
  return value;
}
