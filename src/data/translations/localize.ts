import type { Locale } from "@/lib/locale";

const phrases: Partial<Record<Exclude<Locale, "en">, Record<string, string>>> = {
  tr: {
    "Admissions document guidance — confirm with the university":
      "Başvuru belgesi rehberi — üniversiteyle teyit edin",
    "Computing and Engineering": "Bilişim ve Mühendislik",
    "Health and Life Sciences": "Sağlık ve Yaşam Bilimleri",
    "Social Sciences and Humanities": "Sosyal ve Beşerî Bilimler",
    Accounting: "Muhasebe",
    "Computer Science": "Bilgisayar Bilimi",
    IT: "Bilgi Teknolojisi",
    "Biological Sciences": "Biyolojik Bilimler",
    "Public Health": "Halk Sağlığı",
    "Undergraduate estimate": "Lisans tahmini",
    "Graduate estimate": "Lisansüstü tahmini",
    "Tuition — per semester": "Öğrenim ücreti — dönem başına",
    "Fees — per semester": "Harçlar — dönem başına",
    "Books and supplies — per semester": "Kitaplar ve malzemeler — dönem başına",
    "Housing — per semester": "Barınma — dönem başına",
    "Food — per semester": "Yemek — dönem başına",
    "Transportation — per semester": "Ulaşım — dönem başına",
    "Personal expenses — per semester": "Kişisel giderler — dönem başına",
    "Estimated annual total — fall and spring": "Tahmini yıllık toplam — güz ve bahar",
    "Official degree catalogue": "Resmî derece programı kataloğu",
    "Official cost estimates": "Resmî maliyet tahminleri",
    "Official international document guidance": "Resmî uluslararası belge rehberi",
    "Official graduate admissions guidance": "Resmî lisansüstü kabul rehberi",
    "FIU 2026/2027 — supplied non-Florida-resident on-campus estimates (USD)":
      "FIU 2026/2027 — sağlanan Florida dışı ikamet edenler için kampüs içi tahminler (USD)",
    "FIU’s supplied 2026/2027 non-Florida-resident on-campus cost estimates are shown on View Courses. These are estimates, not guaranteed final costs. F-1/J-1 students generally pay applicable non-Florida-resident rates; additional charges may apply. Confirm deposits, deadlines and financial-documentation requirements directly with FIU; no fixed initial payment is stated.":
      "FIU'nun sağlanan 2026/2027 Florida dışı ikamet edenler için kampüs içi maliyet tahminleri Programları Gör bölümünde gösterilir. Bunlar tahminlerdir, garanti edilmiş nihai maliyetler değildir. F-1/J-1 öğrencileri genellikle geçerli Florida dışı ikamet tarifelerini öder; ek ücretler uygulanabilir. Depozitoları, son tarihleri ve mali belge koşullarını doğrudan FIU ile teyit edin; sabit ilk ödeme belirtilmemiştir.",
    "Expense rows are per semester; estimated annual totals cover fall and spring. The official annual budgets include other allowances, including loan-origination allowances omitted from these supplied rows; not every budget allowance is a charge payable by every student. FIU publishes multiple budgets; confirm the applicable pathway, programme and budget with FIU. These estimates are not scholarship prices or guaranteed invoices.":
      "Gider satırları dönem başınadır; tahmini yıllık toplamlar güz ve baharı kapsar. Resmî yıllık bütçeler, sağlanan satırlarda yer almayan kredi kullandırım payları dahil diğer payları içerir; her bütçe kalemi her öğrencinin ödeyeceği bir ücret değildir. FIU birden fazla bütçe yayımlar; geçerli başvuru yolunu, programı ve bütçeyi FIU ile teyit edin. Bu tahminler burslu fiyatlar veya garanti edilmiş faturalar değildir.",
    "FIU catalogue examples supplied by Frank, not confirmed current degree records. Confirm exact degree titles, availability, teaching language, duration, intake and requirements against FIU’s official degree catalogue. Undergraduate examples are grouped at Bachelor’s level; graduate examples have no confirmed Master’s or doctoral assignment.":
      "Frank'ın sağladığı FIU katalog örnekleridir; teyit edilmiş güncel derece kayıtları değildir. Kesin derece adlarını, uygunluğu, eğitim dilini, süreyi, öğrenci alımını ve koşulları FIU'nun resmî kataloğuyla teyit edin. Lisans örnekleri lisans seviyesinde gruplandırılmıştır; lisansüstü örneklerinin teyit edilmiş yüksek lisans veya doktora ataması yoktur.",
    "Supplied levels: Bachelor’s, Master’s and doctoral. Graduate examples appear only without a study-level filter; they are not duplicated as confirmed Master’s or PhD programmes.":
      "Sağlanan seviyeler: lisans, yüksek lisans ve doktora. Lisansüstü örnekleri yalnızca eğitim seviyesi filtresi yokken görünür; teyit edilmiş yüksek lisans veya doktora programları olarak çoğaltılmaz.",
    "Bachelor’s document guidance: official secondary-school records and English translations where needed; transfer applicants may need post-secondary transcripts and course-by-course evaluations. Confirm the application, test evidence and immigration documents for your admission pathway with FIU. Requirements vary by pathway and programme.":
      "Lisans belgesi rehberi: resmî ortaöğretim kayıtları ve gerektiğinde İngilizce çevirileri; yatay geçiş adayları yükseköğretim transkriptleri ve ders bazında değerlendirmelere ihtiyaç duyabilir. Başvuru yolunuz için başvuruyu, sınav belgelerini ve göçmenlik belgelerini FIU ile teyit edin. Koşullar başvuru yoluna ve programa göre değişir.",
    "Master’s and PhD document guidance: official post-secondary transcripts and degree records, with translations and evaluations where required. Departments may request a statement of purpose, recommendation letters, CV and research/writing samples, or a separate application, interview or audition. Confirm English evidence and immigration/financial documents with FIU. Requirements vary by admission pathway and programme; this is not a universal checklist or eligibility guarantee.":
      "Yüksek lisans ve doktora belgesi rehberi: gerektiğinde çeviri ve değerlendirmelerle resmî yükseköğretim transkriptleri ve derece kayıtları. Bölümler amaç yazısı, referans mektupları, özgeçmiş ve araştırma/yazı örnekleri veya ayrı başvuru, mülakat ya da seçme isteyebilir. İngilizce belgelerini ve göçmenlik/mali belgeleri FIU ile teyit edin. Koşullar başvuru yoluna ve programa göre değişir; bu evrensel kontrol listesi veya uygunluk garantisi değildir.",
    "Selected fee examples below are separate from the filtered catalogue names; they do not confirm a programme level or current availability.":
      "Aşağıdaki seçili ücret örnekleri filtrelenen katalog adlarından ayrıdır; program seviyesini veya güncel uygunluğu teyit etmez.",
    "Associate degree": "Ön lisans",
    "Programme examples — level unassigned": "Program örnekleri — seviye atanmamış",
    "NEU 2026/2027 — selected programme annual fee examples (EUR)":
      "NEU 2026/2027 — seçili programların yıllık ücret örnekleri (EUR)",
    "Annual tuition before scholarship": "Burs öncesi yıllık öğrenim ücreti",
    "Listed 50% scholarship figure / special scholarship":
      "Listelenen %50 burslu tutar / özel burs",
    "Total including VAT/administrative fee": "KDV/idari ücret dahil toplam",
    "No scholarship figure listed": "Burslu tutar listelenmemiş",
    "Special scholarship listed; figure not supplied": "Özel burs listelenmiş; tutar sağlanmamış",
    "Selected programmes from the supplied NEU 2026/2027 schedule are shown on View Courses, separating annual tuition before scholarship, the listed scholarship figure and total including VAT/administrative fee. Unlisted scholarship figures are not zero; Pharmacy has a special scholarship listed without a tuition figure. Programme availability and language of instruction vary and require confirmation. The initial deposit and payment schedule remain unconfirmed; contact FranklyEdu to confirm payable fees with NEU.":
      "Sağlanan NEU 2026/2027 çizelgesindeki seçili programlar Programları Gör bölümünde gösterilir; burs öncesi yıllık öğrenim ücreti, listelenen burslu tutar ve KDV/idari ücret dahil toplam ayrı tutulur. Listelenmeyen burslu tutarlar sıfır değildir; Eczacılık için burslu öğrenim tutarı verilmeden özel burs listelenmiştir. Programların açık olması ve eğitim dili değişir, teyit gerektirir. İlk depozito ve ödeme takvimi teyit edilmemiştir; ödenecek ücretleri NEU ile teyit etmek için FranklyEdu ile iletişime geçin.",
    "NEU catalogue examples supplied by Frank, not confirmed current programme-level records. Programme availability and language of instruction vary and must be confirmed with NEU. Duration, intake, programme-specific requirements and current fees require confirmation. Named examples have no confirmed level assignment and are shown only when no study-level filter is selected.":
      "Frank'ın sağladığı NEU katalog örnekleridir; teyit edilmiş güncel program kayıtları değildir. Programların açık olması ve eğitim dili değişir ve NEU ile teyit edilmelidir. Süre, öğrenci alımı, programa özgü koşullar ve güncel ücretler teyit gerektirir. İsimli örneklerin teyit edilmiş seviye ataması yoktur; yalnızca eğitim seviyesi filtresi seçilmediğinde gösterilir.",
    "Supplied level coverage: Associate degree, Bachelor’s, Master’s and PhD. No named Associate degree, Master’s or PhD offerings are confirmed here; no named example is assigned to a level.":
      "Sağlanan seviye kapsamı: Ön lisans, lisans, yüksek lisans ve doktora. Burada isimli ön lisans, yüksek lisans veya doktora programı teyit edilmemektedir; hiçbir isimli örnek bir seviyeye atanmamıştır.",
    "Banking and Finance": "Bankacılık ve Finans",
    "Artificial Intelligence Engineering": "Yapay Zekâ Mühendisliği",
    "Cyber Security Engineering": "Siber Güvenlik Mühendisliği",
    "Information Systems Engineering": "Bilişim Sistemleri Mühendisliği",
    "Management Information Systems": "Yönetim Bilişim Sistemleri",
    "Data Analysis Engineering": "Veri Analizi Mühendisliği",
    "Biomedical Engineering": "Biyomedikal Mühendisliği",
    "Industrial Engineering": "Endüstri Mühendisliği",
    "Veterinary Medicine": "Veteriner Hekimliği",
    "Catalogue examples — availability unconfirmed":
      "Katalog örnekleri — güncel uygunluk teyit edilmemiştir",
    "catalogue examples match these filters": "katalog örneği bu filtrelerle eşleşiyor",
    "Admissions document guidance — reconfirm with CIU":
      "Başvuru belgesi rehberi — CIU ile yeniden teyit edin",
    "CIU catalogue examples supplied by Frank, not confirmed current programme-level records. Availability, duration, intake, teaching language, programme-specific requirements and fees require confirmation with CIU. These examples are not selectable confirmed courses in the application form.":
      "Frank'ın sağladığı CIU katalog örnekleridir; teyit edilmiş güncel program kayıtları değildir. Programın açık olması, süre, öğrenci alımı, eğitim dili, programa özgü koşullar ve ücretler CIU ile teyit edilmelidir. Bu örnekler başvuru formunda teyit edilmiş dersler olarak seçilemez.",
    "Supplied notes cite IELTS 5.5 or TOEFL iBT 65; some applicants may take an on-campus proficiency exam. These are not confirmed programme-specific thresholds. Reconfirm accepted English evidence and any exam option with CIU.":
      "Sağlanan notlarda IELTS 5.5 veya TOEFL iBT 65 belirtilir; bazı adaylar kampüste yeterlik sınavına girebilir. Bunlar teyit edilmiş programa özgü eşikler değildir. Kabul edilen İngilizce belgelerini ve varsa sınav seçeneğini CIU ile yeniden teyit edin.",
    "Bachelor’s document guidance: application form, secondary certificate (WAEC/NECO/equivalent), passport or accepted ID, English evidence where required, and other requested documents. Confirm the exact list with CIU.":
      "Lisans belgesi rehberi: başvuru formu, ortaöğretim diploması (WAEC/NECO/eşdeğeri), pasaport veya kabul edilen kimlik, gerektiğinde İngilizce belgesi ve talep edilen diğer belgeler. Kesin listeyi CIU ile teyit edin.",
    "Master’s document guidance: bachelor’s certificate, transcripts, passport or accepted ID, CV, and English evidence where required. Confirm the exact list with CIU.":
      "Yüksek lisans belgesi rehberi: lisans diploması, transkriptler, pasaport veya kabul edilen kimlik, özgeçmiş ve gerektiğinde İngilizce belgesi. Kesin listeyi CIU ile teyit edin.",
    "PhD document guidance: bachelor’s and master’s qualifications, transcripts, CV, research proposal, and English evidence where required. Confirm the exact list with CIU.":
      "Doktora belgesi rehberi: lisans ve yüksek lisans yeterlikleri, transkriptler, özgeçmiş, araştırma önerisi ve gerektiğinde İngilizce belgesi. Kesin listeyi CIU ile teyit edin.",
    "Tuition varies by programme, scholarship and academic year; use CIU’s tuition calculator on its official website. Confirm the exact initial payment from the student’s official offer letter. Contact FranklyEdu for guidance on confirming these details with CIU.":
      "Öğrenim ücreti programa, bursa ve akademik yıla göre değişir; CIU'nun resmî web sitesindeki öğrenim ücreti hesaplayıcısını kullanın. Kesin ilk ödemeyi öğrencinin resmî kabul teklif mektubundan teyit edin. Bu ayrıntıları CIU ile teyit etme konusunda rehberlik için FranklyEdu ile iletişime geçin.",
    "North Nicosia": "Kuzey Lefkoşa",
    "Northern Cyprus": "Kuzey Kıbrıs",
    "Accounting and Finance": "Muhasebe ve Finans",
    "Human Resource Management": "İnsan Kaynakları Yönetimi",
    Economics: "Ekonomi",
    "Computer Engineering": "Bilgisayar Mühendisliği",
    "Software Engineering": "Yazılım Mühendisliği",
    "Civil Engineering": "İnşaat Mühendisliği",
    "Electrical and Electronic Engineering": "Elektrik ve Elektronik Mühendisliği",
    "Mechanical Engineering": "Makine Mühendisliği",
    "Information Technology": "Bilgi Teknolojisi",
    "Physiotherapy and Rehabilitation": "Fizyoterapi ve Rehabilitasyon",
    "Nutrition and Dietetics": "Beslenme ve Diyetetik",
    Psychology: "Psikoloji",
    "English Language Teaching": "İngilizce Öğretmenliği",
    "Tourism and Hotel Management": "Turizm ve Otel İşletmeciliği",
    "Graphic Design": "Grafik Tasarım",
    MBA: "İşletme Yüksek Lisansı (MBA)",
    Finance: "Finans",
    Aviation: "Havacılık",
    "Postgraduate studies": "Lisansüstü eğitim",
    "The supplied 2026/2027 regular Master’s tuition for international students is quoted with a 25% scholarship. The university’s stated conditions apply; confirm applicability with the University of Kyrenia through FranklyEdu.":
      "Uluslararası öğrenciler için sağlanan 2026/2027 standart yüksek lisans öğrenim ücreti %25 burslu olarak belirtilmiştir. Üniversitenin belirttiği koşullar geçerlidir; geçerliliğini FranklyEdu aracılığıyla Girne Üniversitesi ile teyit edin.",
    "For 2026/2027, the published regular Master’s tuition for international students with a 25% scholarship is €1,272 per semester. The published regular Master’s programme fee covers four academic semesters, subject to the university’s stated conditions. No total programme fee is stated here. Undergraduate tuition and initial payments must be confirmed for the selected programme with the University of Kyrenia through FranklyEdu.":
      "2026/2027 için uluslararası öğrencilere yönelik yayımlanmış %25 burslu standart yüksek lisans öğrenim ücreti dönem başına €1,272'dir. Yayımlanmış standart yüksek lisans program ücreti, üniversitenin belirttiği koşullara tabi olarak dört akademik dönemi kapsar. Burada toplam program ücreti belirtilmemektedir. Lisans öğrenim ücreti ve ilk ödemeler, seçilen program için FranklyEdu aracılığıyla Girne Üniversitesi ile teyit edilmelidir.",
    "GAU 2025/2026 — published annual tuition schedule (EUR)":
      "GAU 2025/2026 — yayımlanmış yıllık öğrenim ücreti çizelgesi (EUR)",
    "Annual tuition (2025/2026)": "Yıllık öğrenim ücreti (2025/2026)",
    "This Frank-supplied published fee schedule is for 2025/2026 only. These figures are not confirmed 2026/2027 rates. Separately from tuition, the supplied schedule lists an additional registration and activity fee of €500 yearly for the listed degree programmes. This charge is not included in the tuition figures; its applicability has not been independently verified for every category. Ask FranklyEdu to confirm current tuition and applicable charges with GAU.":
      "Frank'ın sağladığı bu yayımlanmış ücret çizelgesi yalnızca 2025/2026 içindir. Bu tutarlar teyit edilmiş 2026/2027 ücretleri değildir. Sağlanan çizelgede, öğrenim ücretinden ayrı olarak listelenen derece programları için yıllık €500 ek kayıt ve etkinlik ücreti yer alır. Bu ücret öğrenim ücreti tutarlarına dahil değildir; her kategori için geçerliliği bağımsız olarak doğrulanmamıştır. Güncel öğrenim ücretini ve geçerli ek ücretleri GAU ile teyit etmek için FranklyEdu ile iletişime geçin.",
    Business: "İşletme",
    "Architecture and several other faculties": "Mimarlık ve diğer bazı fakülteler",
    "Civil Aviation Management": "Sivil Havacılık İşletmeciliği",
    Pilotage: "Pilotaj",
    "Master’s programmes": "Yüksek lisans programları",
    "PhD programmes": "Doktora programları",
    "Annual advance-payment fee (75% scholarship)": "Yıllık peşin ücret (%75 burs)",
    "EMU 2026/2027 — supplied annual advance-payment fees with a 75% scholarship (USD)":
      "EMU 2026/2027 — sağlanan %75 burslu yıllık peşin ücretler (USD)",
    "Frank's supplied 2026/2027 fees are for eligible new international students with a 75% scholarship, not a guaranteed award for every applicant. The linked general EMU schedule lists other scholarship tiers and a country-specific 75% tier for Turkmenistan. Confirm eligibility for the supplied 75% fees and your payable amount with EMU through FranklyEdu.":
      "Frank'ın sağladığı 2026/2027 ücretleri, %75 burslu uygun yeni uluslararası öğrenciler içindir; her başvuru sahibine garanti edilen bir burs değildir. Bağlantı verilen genel EMU çizelgesinde diğer burs kademeleri ve Türkmenistan'a özgü %75 kademesi yer alır. Sağlanan %75 burslu ücretlere uygunluğunuzu ve ödenecek tutarı FranklyEdu aracılığıyla EMU ile teyit edin.",
    "These Frank-supplied published 2026/2027 annual advance-payment fees in USD apply to eligible new international students with a 75% scholarship. They are not instalment prices or registration deposit amounts. Confirm the applicable faculty or category, scholarship eligibility and payable amount with EMU. The current registration deposit and instalment arrangements must be confirmed with EMU.":
      "Frank'ın sağladığı yayımlanmış 2026/2027 yıllık peşin ücretleri USD cinsindedir ve %75 burslu uygun yeni uluslararası öğrenciler için geçerlidir. Bunlar taksit tutarları veya kayıt depozitosu tutarları değildir. Geçerli fakülteyi veya kategoriyi, burs uygunluğunu ve ödenecek tutarı EMU ile teyit edin. Güncel kayıt depozitosu ve taksit düzenlemeleri EMU ile teyit edilmelidir.",
    "Arts and Sciences": "Fen ve Edebiyat",
    "Associate degree programmes": "Ön lisans programları",
    "NEU 2026/2027 — supplied annual tuition after scholarship (EUR)":
      "NEU 2026/2027 — sağlanan burs sonrası yıllık öğrenim ücretleri (EUR)",
    "The supplied NEU 2026/2027 information states that the standard undergraduate scholarship is up to 50% for international students in most departments, excluding Medicine and Dentistry. Ask FranklyEdu to confirm eligibility and payable fees with the university.":
      "Sağlanan NEU 2026/2027 bilgilerine göre, Tıp ve Diş Hekimliği hariç çoğu bölümde uluslararası öğrencilere standart lisans bursu %50'ye kadar sunulmaktadır. Uygunluk koşullarını ve ödenecek ücretleri üniversiteyle teyit etmek için FranklyEdu ile iletişime geçin.",
    "Additional administrative and other fees may apply. The published total fee for most programmes with €2,800 annual tuition is €3,225 per year; this is distinct from tuition alone and is not a confirmed total for every programme. The initial deposit and payment schedule are unconfirmed. Contact FranklyEdu to confirm these details with the university.":
      "Ek idari ve diğer ücretler uygulanabilir. Yıllık öğrenim ücreti €2,800 olan çoğu program için yayımlanan toplam ücret yıllık €3,225'tir; bu tutar yalnızca öğrenim ücretinden farklıdır ve her program için teyit edilmiş bir toplam değildir. İlk depozito ve ödeme takvimi teyit edilmemiştir. Bu ayrıntıları üniversiteyle teyit etmek için FranklyEdu ile iletişime geçin.",
    "International Business": "Uluslararası İşletme",
    "Human Resources Management": "İnsan Kaynakları Yönetimi",
    Marketing: "Pazarlama",
    "Computer Information Systems": "Bilgisayar Bilgi Sistemleri",
    Nursing: "Hemşirelik",
    "Engineering programmes": "Mühendislik programları",
    "Dentistry (English)": "Diş Hekimliği (İngilizce)",
    "Current programme-specific entry requirements need confirmation from Hof.":
      "Programa özgü güncel kabul koşulları Hof'tan teyit edilmelidir.",
    "Hof's general admissions page lists TOEFL iBT 90 or IELTS 6.5 for English-taught programmes and German B2 for German-taught programmes; it does not confirm this programme's specific thresholds.":
      "Hof'un genel kabul sayfasında İngilizce programlar için TOEFL iBT 90 veya IELTS 6.5, Almanca programlar için Almanca B2 belirtilir; bu bilgiler söz konusu programın özel eşiklerini doğrulamaz.",
    "A nursing-science or nursing-related higher-education degree with 210 ECTS; at least 180 ECTS is required, including at least 30 ECTS in nursing-science modules.":
      "Hemşirelik bilimi veya hemşirelikle ilgili bir alanda 210 AKTS'lik yükseköğretim derecesi; hemşirelik bilimi modüllerinde en az 30 AKTS dahil olmak üzere en az 180 AKTS gereklidir.",
    "Permission to use a professional title under §1(1), sentence 1 of the German Nursing Professions Act (PflBG) is required.":
      "Alman Hemşirelik Meslekleri Yasası (PflBG) §1(1) cümle 1 uyarınca meslek unvanını kullanma izni gerekir.",
    "A first higher-education degree in nursing or a related field; alternatively, another higher-education degree together with completed nursing vocational training.":
      "Hemşirelik veya ilgili bir alanda ilk yükseköğretim derecesi; alternatif olarak başka bir yükseköğretim derecesi ve tamamlanmış hemşirelik meslek eğitimi.",
    "Relevant professional work alongside study: at least 12 hours per week; 20 hours are recommended.":
      "Eğitimle birlikte ilgili alanda haftada en az 12 saat çalışma; 20 saat önerilir.",
    "A motivation letter of about three pages is part of the application.":
      "Başvuruya yaklaşık üç sayfalık bir motivasyon mektubu eklenmelidir.",
    "Business Administration": "İşletme",
    "International Relations": "Uluslararası İlişkiler",
    "Computer and Information Technologies": "Bilgisayar ve Bilgi Teknolojileri",
    Engineering: "Mühendislik",
    "Nursing and Health Sciences": "Hemşirelik ve Sağlık Bilimleri",
    Education: "Eğitim",
    Pharmacy: "Eczacılık",
    Architecture: "Mimarlık",
    "Tourism and Hospitality": "Turizm ve Otelcilik",
    "Master’s and PhD programmes": "Yüksek lisans ve doktora programları",
    "Arts & Sciences": "Sanat ve Fen Bilimleri",
    "Business and Economics": "İşletme ve Ekonomi",
    Communication: "İletişim",
    "Computer and Information Sciences": "Bilgisayar ve Bilgi Bilimleri",
    Tourism: "Turizm",
    Law: "Hukuk",
    "Health Sciences": "Sağlık Bilimleri",
    Dentistry: "Diş Hekimliği",
    Medicine: "Tıp",
    "Fee information": "Ücret bilgileri",
    "University fee source": "Üniversitenin ücret kaynağı",
    "EMU's 2026/27 schedule shows scholarship-priced tiers of 60%, 65%, and 70% for most faculties, 30%–45% for Medicine and Dentistry, and 75% for Turkmenistan. It does not define individual eligibility; confirm your tier and payable amount with EMU.":
      "EMU'nun 2026/27 çizelgesinde çoğu fakülte için %60, %65 ve %70; Tıp ve Diş Hekimliği için %30–%45, Türkmenistan için %75 burs kademeleriyle fiyatlar listelenir. Bireysel uygunluk koşulları belirtilmemiştir; burs kademenizi ve ödenecek tutarı EMU'dan teyit edin.",
    "EMU's official 2026/27 schedule lists annual advance-payment tuition in USD by faculty and scholarship tier. For most faculties, it lists $6,400 at 60%, $5,750 at 65%, and $5,100 at 70%; a separate 75% tier is listed for Turkmenistan. Medicine and Dentistry use 30%–45% tiers in the schedule. Fees include the Student Services Fund, VAT and filing fee; English-preparation books and exams add $250 per semester. Confirm the applicable faculty, award eligibility and payable amount with EMU.":
      "EMU'nun resmi 2026/27 çizelgesi, fakülte ve burs kademesine göre yıllık peşin öğrenim ücretlerini USD cinsinden listeler. Çoğu fakültede %60 için $6,400, %65 için $5,750 ve %70 için $5,100; Türkmenistan için ayrı %75 kademesi yer alır. Tıp ve Diş Hekimliği için çizelgede %30–%45 kademeleri bulunur. Ücrete Öğrenci Hizmetleri Fonu, KDV ve kayıt dosyalama ücreti dahildir; İngilizce hazırlık kitap ve sınav ücretleri dönem başına $250 eklenir. Uygun fakülteyi, burs kademesini ve ödenecek tutarı EMU'dan teyit edin.",
    "BAU's official international fee page lists a Master's course-registration fee of $600 per course (at least three courses plus a $300 annual social fund paid in advance: $2,100) and a PhD course-registration fee of $1,200 per course (at least two courses plus the fund: $2,700). The page does not identify an academic year. These course-based advance payments are not confirmed acceptance or visa deposits, or full programme costs; the page states that 5% VAT is included. Confirm the intake and payable amount with BAU.":
      "BAU'nun resmi uluslararası ücret sayfasında yüksek lisans ders kayıt ücreti ders başına $600 (en az üç ders ve yıllık $300 sosyal fonun peşin ödenmesi: $2.100), doktora ders kayıt ücreti ise ders başına $1.200 (en az iki ders ve fon: $2.700) olarak belirtilir. Sayfa akademik yılı belirtmez. Ders esaslı bu peşin ödemeler, teyit edilmiş kabul veya vize depozitosu ya da programın toplam ücreti değildir; sayfaya göre %5 KDV dahildir. Kayıt dönemini ve ödenecek tutarı BAU'dan teyit edin.",
    "Browse the published programme catalogue. Current named listings are German nursing Master's programmes; other programmes appear after their details are verified. Confirm current availability, fees, and admission requirements directly with the institution.":
      "Yayımlanan program kataloğuna göz atın. Şu anda listelenen isimli programlar Almanya'daki hemşirelik yüksek lisans programlarıdır; diğer programlar ayrıntıları doğrulandıktan sonra eklenir. Güncel uygunluk, ücretler ve kabul koşullarını doğrudan kurumdan teyit edin.",
    "Browse published programmes with university source links. The current named listings are German nursing Master's programmes; confirm programme availability, fees, and admission requirements with each institution.":
      "Üniversite kaynak bağlantılarıyla yayımlanan programları inceleyin. Şu anda listelenen isimli programlar Almanya'daki hemşirelik yüksek lisans programlarıdır; program uygunluğunu, ücretleri ve kabul koşullarını her kurumdan teyit edin.",
    "CIU offers a 50% international undergraduate tuition scholarship; additional academic scholarships may be available. Exact payable tuition depends on the programme and scholarship. Confirm eligibility and payable tuition with CIU through FranklyEdu before applying or making any payment.":
      "CIU, uluslararası lisans öğrencilerine %50 öğrenim ücreti bursu sunar; ek akademik burslar da mevcut olabilir. Ödenecek kesin öğrenim ücreti programa ve bursa bağlıdır. Başvuru yapmadan veya herhangi bir ödeme gerçekleştirmeden önce uygunluk koşullarını ve ödenecek öğrenim ücretini FranklyEdu aracılığıyla CIU ile teyit edin.",
    "Confirm the exact initial payment amount using the student's official acceptance letter or invoice. Contact FranklyEdu for guidance on confirming this amount with CIU.":
      "Kesin ilk ödeme tutarını öğrencinin resmî kabul mektubunu veya faturasını kullanarak teyit edin. Bu tutarı CIU ile teyit etme konusunda rehberlik için FranklyEdu ile iletişime geçin.",
    "Refer to the institution's official site for current programmes and admissions information.":
      "Güncel program ve kabul bilgileri için kurumun resmî sitesine başvurun.",
    "University site": "Üniversite sitesi",
    "Programme source": "Program kaynağı",
    "Admissions info": "Kabul bilgileri",
    "Ask about programme": "Programı sorun",
    "Compare programme details before you take the next step.":
      "Sonraki adımınızı atmadan önce program ayrıntılarını karşılaştırın.",
    "No programmes match these filters": "Bu filtrelerle eşleşen program yok",
    "Clear a filter to see the current listings. Some intake and admissions details still need confirmation directly with the institution.":
      "Güncel programları görmek için bir filtreyi temizleyin. Kayıt ve kabul bilgilerinin bazıları kurumdan doğrudan teyit edilmelidir.",
    "Start / intake": "Başlangıç / kayıt dönemi",
    "Application window": "Başvuru dönemi",
    "Entry requirements": "Kabul koşulları",
    "Information to confirm": "Teyit edilmesi gereken bilgi",
    "Frankedu document-sharing deadline": "Frankedu belge paylaşım son tarihi",
    "Before you apply": "Başvurmadan önce",
    "Programme details and admission decisions belong to each university and may change. This website does not submit an application. Visa decisions are made by the relevant authorities; admission, visas, professional recognition, employment, and job outcomes are not guaranteed. Confirm current requirements and fees with the university before applying.":
      "Program ayrıntıları ve kabul kararları ilgili üniversiteye aittir ve değişebilir. Bu web sitesi başvuru göndermez. Vize kararları ilgili makamlarca verilir; kabul, vize, mesleki tanınma, iş veya istihdam sonucu garanti edilmez. Başvurmadan önce güncel koşulları ve ücretleri üniversiteden teyit edin.",
    "Spring 2027 availability not confirmed": "2027 Bahar dönemi uygunluğu teyit edilmedi",
    "Not confirmed in current official sources": "Mevcut resmî kaynaklarda teyit edilmedi",
    "Current duration not confirmed": "Güncel program süresi teyit edilmedi",
    "Current fees not confirmed": "Güncel ücretler teyit edilmedi",
    "Programme-specific language requirements need confirmation":
      "Programa özgü dil koşulları teyit edilmelidir",
    "Ask Hof to confirm current programme-specific academic and language requirements.":
      "Güncel programa özgü akademik ve dil koşullarını Hof'tan teyit edin.",
    "General Hof language rules: English-taught programmes require TOEFL iBT 90 or IELTS 6.5; German-taught programmes require B2. These do not confirm the requirements for this programme.":
      "Hof'un genel dil kuralları: İngilizce programlarda TOEFL iBT 90 veya IELTS 6.5; Almanca programlarda B2 gerekir. Bu bilgiler söz konusu programın özel koşullarını doğrulamaz.",
    "The available official programme flyer is dated 2025, and the programme-specific page is currently unavailable. Confirm that the programme and Spring 2027 intake are open directly with Hof.":
      "Erişilebilen resmî program broşürü 2025 tarihlidir ve programa özel sayfa şu anda kullanılamamaktadır. Programın ve 2027 Bahar dönemi alımının açık olduğunu doğrudan Hof'tan teyit edin.",
    "Frankedu document-sharing deadline: 15 November 2026. This is a preparation target set by Frankedu, not a confirmed Hof application deadline.":
      "Frankedu belge paylaşım son tarihi: 15 Kasım 2026. Bu, Frankedu'nun belirlediği hazırlık hedefidir; Hof tarafından teyit edilmiş başvuru son tarihi değildir.",
    "3 theoretical study semesters; full-time": "3 teorik dönem; tam zamanlı",
    "A student-services contribution is payable at OTH; see the current fee schedule for the amount.":
      "OTH'ye öğrenci hizmetleri katkı payı ödenir; tutar için güncel ücret çizelgesine bakın.",
    "Summer semester 2027; exact start date not specified by OTH":
      "2027 Yaz dönemi; kesin başlangıç tarihi OTH tarafından belirtilmemiştir",
    "15 November–15 January for summer semesters; confirm the year-specific dates in the OTH portal.":
      "Yaz dönemleri için 15 Kasım–15 Ocak; yıla özgü tarihleri OTH portalından teyit edin.",
    "German; DSH 3 or equivalent is required by the start of study.":
      "Almanca; eğitimin başlangıcına kadar DSH 3 veya eşdeğeri gerekir.",
    "A higher-education degree with 210 ECTS; at least 180 ECTS must be in nursing or a related field, including at least 30 ECTS in nursing-science modules.":
      "210 AKTS'lik yükseköğretim derecesi; en az 180 AKTS hemşirelik veya ilgili bir alanda, en az 30 AKTS ise hemşirelik bilimi modüllerinde olmalıdır.",
    "A permit to use a professional title under §1(1), sentence 1 PflBG is required.":
      "PflBG §1(1) cümle 1 uyarınca meslek unvanını kullanma izni gerekir.",
    "The university states that the programme is offered subject to a sufficient number of qualified applications. Confirm current availability and requirements directly with OTH.":
      "Üniversite, programın yeterli sayıda nitelikli başvuruya bağlı olarak açıldığını belirtir. Güncel uygunluğu ve koşulları doğrudan OTH'den teyit edin.",
    "5 semesters; part-time": "5 dönem; yarı zamanlı",
    "Current fees and semester contributions need confirmation with EHS.":
      "Güncel ücretler ve dönem katkı payı EHS'den teyit edilmelidir.",
    "Summer semester; the university lists 1 March as the start date.":
      "Yaz dönemi; üniversite başlangıç tarihini 1 Mart olarak belirtir.",
    "5 January annually; confirm the 2027 deadline with EHS.":
      "Her yıl 5 Ocak; 2027 son tarihini EHS'den teyit edin.",
    "German; C1 is required for applicants with foreign qualifications.":
      "Almanca; yabancı yeterliliklerle başvuranlar için C1 gerekir.",
    "First degree in nursing or a related field; alternatively, another degree plus completed nursing vocational training.":
      "Hemşirelik veya ilgili bir alanda ilk yükseköğretim derecesi; alternatif olarak başka bir derece ve tamamlanmış hemşirelik meslek eğitimi.",
    "Relevant professional work alongside study: at least 12 hours weekly; 20 hours recommended.":
      "Eğitimle birlikte ilgili alanda haftada en az 12 saat çalışma; 20 saat önerilir.",
    "Application includes a motivation letter of about three pages.":
      "Başvuruya yaklaşık üç sayfalık bir motivasyon mektubu eklenmelidir.",
    "Confirm the 2027 intake, application requirements and current fees directly with EHS before making plans.":
      "Plan yapmadan önce 2027 alımını, başvuru koşullarını ve güncel ücretleri doğrudan EHS'den teyit edin.",
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
    "Admissions document guidance — confirm with the university":
      "Documents de candidature — à confirmer auprès de l’université",
    "Computing and Engineering": "Informatique et ingénierie",
    "Health and Life Sciences": "Santé et sciences de la vie",
    "Social Sciences and Humanities": "Sciences sociales et humaines",
    Accounting: "Comptabilité",
    "Computer Science": "Informatique",
    IT: "Technologies de l’information",
    "Biological Sciences": "Sciences biologiques",
    "Public Health": "Santé publique",
    "Undergraduate estimate": "Estimation de premier cycle",
    "Graduate estimate": "Estimation de cycles supérieurs",
    "Tuition — per semester": "Scolarité — par semestre",
    "Fees — per semester": "Frais — par semestre",
    "Books and supplies — per semester": "Livres et fournitures — par semestre",
    "Housing — per semester": "Logement — par semestre",
    "Food — per semester": "Alimentation — par semestre",
    "Transportation — per semester": "Transport — par semestre",
    "Personal expenses — per semester": "Dépenses personnelles — par semestre",
    "Estimated annual total — fall and spring": "Total annuel estimé — automne et printemps",
    "Official degree catalogue": "Catalogue officiel des diplômes",
    "Official cost estimates": "Estimations officielles des coûts",
    "Official international document guidance": "Documents internationaux : guide officiel",
    "Official graduate admissions guidance": "Admissions aux cycles supérieurs : guide officiel",
    "FIU 2026/2027 — supplied non-Florida-resident on-campus estimates (USD)":
      "FIU 2026/2027 — estimations communiquées sur campus pour non-résidents de Floride (USD)",
    "FIU’s supplied 2026/2027 non-Florida-resident on-campus cost estimates are shown on View Courses. These are estimates, not guaranteed final costs. F-1/J-1 students generally pay applicable non-Florida-resident rates; additional charges may apply. Confirm deposits, deadlines and financial-documentation requirements directly with FIU; no fixed initial payment is stated.":
      "Les estimations FIU 2026/2027 communiquées pour les non-résidents de Floride sur campus figurent dans Voir les formations. Ce sont des estimations, non des coûts finaux garantis. Les étudiants F-1/J-1 paient généralement les tarifs applicables aux non-résidents de Floride ; des frais supplémentaires peuvent s’appliquer. Confirmez dépôts, échéances et justificatifs financiers directement auprès de FIU ; aucun paiement initial fixe n’est indiqué.",
    "Expense rows are per semester; estimated annual totals cover fall and spring. The official annual budgets include other allowances, including loan-origination allowances omitted from these supplied rows; not every budget allowance is a charge payable by every student. FIU publishes multiple budgets; confirm the applicable pathway, programme and budget with FIU. These estimates are not scholarship prices or guaranteed invoices.":
      "Les lignes de dépenses sont par semestre ; les totaux annuels estimés couvrent l’automne et le printemps. Les budgets annuels officiels incluent d’autres provisions, dont les frais de mise en place de prêt omis des lignes communiquées ; chaque provision n’est pas une somme due par chaque étudiant. FIU publie plusieurs budgets ; confirmez le parcours, la formation et le budget applicables auprès de FIU. Ces estimations ne sont ni des tarifs avec bourse ni des factures garanties.",
    "FIU catalogue examples supplied by Frank, not confirmed current degree records. Confirm exact degree titles, availability, teaching language, duration, intake and requirements against FIU’s official degree catalogue. Undergraduate examples are grouped at Bachelor’s level; graduate examples have no confirmed Master’s or doctoral assignment.":
      "Exemples du catalogue FIU communiqués par Frank, non des fiches de diplômes actuels confirmés. Confirmez les intitulés exacts, la disponibilité, la langue, la durée, la rentrée et les conditions dans le catalogue officiel de FIU. Les exemples de premier cycle sont regroupés au niveau licence ; aucun niveau master ou doctorat n’est confirmé pour les exemples de cycles supérieurs.",
    "Supplied levels: Bachelor’s, Master’s and doctoral. Graduate examples appear only without a study-level filter; they are not duplicated as confirmed Master’s or PhD programmes.":
      "Niveaux communiqués : licence, master et doctorat. Les exemples de cycles supérieurs apparaissent uniquement sans filtre de niveau ; ils ne sont pas dupliqués comme masters ou doctorats confirmés.",
    "Bachelor’s document guidance: official secondary-school records and English translations where needed; transfer applicants may need post-secondary transcripts and course-by-course evaluations. Confirm the application, test evidence and immigration documents for your admission pathway with FIU. Requirements vary by pathway and programme.":
      "Documents indicatifs pour la licence : dossiers officiels du secondaire et traductions anglaises si nécessaires ; les candidats en transfert peuvent devoir fournir des relevés postsecondaires et des évaluations cours par cours. Confirmez la candidature, les justificatifs de tests et les documents d’immigration selon votre parcours auprès de FIU. Les conditions varient selon le parcours et la formation.",
    "Master’s and PhD document guidance: official post-secondary transcripts and degree records, with translations and evaluations where required. Departments may request a statement of purpose, recommendation letters, CV and research/writing samples, or a separate application, interview or audition. Confirm English evidence and immigration/financial documents with FIU. Requirements vary by admission pathway and programme; this is not a universal checklist or eligibility guarantee.":
      "Documents indicatifs pour le master et le doctorat : relevés postsecondaires et diplômes officiels, avec traductions et évaluations si requises. Les départements peuvent demander une lettre de motivation, des recommandations, un CV et des travaux de recherche/rédaction, ou une candidature distincte, un entretien ou une audition. Confirmez les justificatifs d’anglais et documents d’immigration/financiers auprès de FIU. Les conditions varient selon le parcours et la formation ; ce n’est ni une liste universelle ni une garantie d’éligibilité.",
    "Selected fee examples below are separate from the filtered catalogue names; they do not confirm a programme level or current availability.":
      "Les exemples de frais sélectionnés ci-dessous sont distincts des noms filtrés du catalogue ; ils ne confirment ni le niveau ni la disponibilité actuelle d’une formation.",
    "Associate degree": "Diplôme de cycle court",
    "Programme examples — level unassigned": "Exemples de formations — niveau non attribué",
    "NEU 2026/2027 — selected programme annual fee examples (EUR)":
      "NEU 2026/2027 — exemples de frais annuels de formations sélectionnées (EUR)",
    "Annual tuition before scholarship": "Frais de scolarité annuels avant bourse",
    "Listed 50% scholarship figure / special scholarship":
      "Montant indiqué avec bourse de 50 % / bourse spéciale",
    "Total including VAT/administrative fee": "Total incluant TVA/frais administratifs",
    "No scholarship figure listed": "Aucun montant avec bourse indiqué",
    "Special scholarship listed; figure not supplied":
      "Bourse spéciale indiquée ; montant non communiqué",
    "Selected programmes from the supplied NEU 2026/2027 schedule are shown on View Courses, separating annual tuition before scholarship, the listed scholarship figure and total including VAT/administrative fee. Unlisted scholarship figures are not zero; Pharmacy has a special scholarship listed without a tuition figure. Programme availability and language of instruction vary and require confirmation. The initial deposit and payment schedule remain unconfirmed; contact FranklyEdu to confirm payable fees with NEU.":
      "Les formations sélectionnées du barème NEU 2026/2027 communiqué figurent dans Voir les formations, en distinguant les frais de scolarité annuels avant bourse, le montant indiqué avec bourse et le total incluant TVA/frais administratifs. Les montants avec bourse non indiqués ne sont pas nuls ; une bourse spéciale est indiquée en pharmacie sans montant de scolarité avec bourse. La disponibilité et la langue d’enseignement varient et sont à confirmer. Le dépôt initial et l’échéancier restent non confirmés ; contactez FranklyEdu pour confirmer les frais à payer auprès de NEU.",
    "NEU catalogue examples supplied by Frank, not confirmed current programme-level records. Programme availability and language of instruction vary and must be confirmed with NEU. Duration, intake, programme-specific requirements and current fees require confirmation. Named examples have no confirmed level assignment and are shown only when no study-level filter is selected.":
      "Exemples du catalogue NEU communiqués par Frank, et non des fiches de formations actuelles confirmées. La disponibilité et la langue d’enseignement varient et doivent être confirmées auprès de NEU. Durée, rentrée, conditions propres aux formations et frais actuels sont à confirmer. Aucun niveau n’est confirmé pour les exemples nommés ; ils ne sont affichés que sans filtre de niveau d’études.",
    "Supplied level coverage: Associate degree, Bachelor’s, Master’s and PhD. No named Associate degree, Master’s or PhD offerings are confirmed here; no named example is assigned to a level.":
      "Niveaux communiqués : diplôme de cycle court, licence, master et doctorat. Aucune formation nommée de cycle court, master ou doctorat n’est confirmée ici ; aucun exemple nommé n’est attribué à un niveau.",
    "Banking and Finance": "Banque et finance",
    "Artificial Intelligence Engineering": "Génie de l’intelligence artificielle",
    "Cyber Security Engineering": "Génie de la cybersécurité",
    "Information Systems Engineering": "Génie des systèmes d’information",
    "Management Information Systems": "Systèmes d’information de gestion",
    "Data Analysis Engineering": "Génie de l’analyse de données",
    "Biomedical Engineering": "Génie biomédical",
    "Industrial Engineering": "Génie industriel",
    "Veterinary Medicine": "Médecine vétérinaire",
    "Browse source-linked programme records and clearly labelled university catalogue examples. Confirm current availability, fees and requirements with the university.":
      "Consultez les fiches de formations avec leurs sources et les exemples des catalogues universitaires clairement identifiés. Confirmez la disponibilité, les frais et les conditions actuels auprès de l’université.",
    "Browse this university’s programme records or labelled catalogue examples. Examples do not confirm current availability; check details with the institution.":
      "Consultez les fiches de formations ou les exemples du catalogue identifiés pour cette université. Les exemples ne confirment pas la disponibilité actuelle ; vérifiez les détails auprès de l’établissement.",
    "Catalogue examples — availability unconfirmed":
      "Exemples du catalogue — disponibilité non confirmée",
    "catalogue examples match these filters": "exemples du catalogue correspondent à ces filtres",
    "Admissions document guidance — reconfirm with CIU":
      "Documents de candidature — à reconfirmer auprès de CIU",
    "CIU catalogue examples supplied by Frank, not confirmed current programme-level records. Availability, duration, intake, teaching language, programme-specific requirements and fees require confirmation with CIU. These examples are not selectable confirmed courses in the application form.":
      "Exemples du catalogue CIU communiqués par Frank, et non des fiches de formations actuelles confirmées. Disponibilité, durée, rentrée, langue d’enseignement, conditions et frais propres à chaque formation sont à confirmer auprès de CIU. Ces exemples ne sont pas sélectionnables comme formations confirmées dans le formulaire de candidature.",
    "Supplied notes cite IELTS 5.5 or TOEFL iBT 65; some applicants may take an on-campus proficiency exam. These are not confirmed programme-specific thresholds. Reconfirm accepted English evidence and any exam option with CIU.":
      "Les notes communiquées citent IELTS 5.5 ou TOEFL iBT 65 ; certains candidats peuvent passer un examen de compétence sur le campus. Ces seuils ne sont pas confirmés pour chaque formation. Reconfirmez les justificatifs d’anglais acceptés et toute possibilité d’examen auprès de CIU.",
    "Bachelor’s document guidance: application form, secondary certificate (WAEC/NECO/equivalent), passport or accepted ID, English evidence where required, and other requested documents. Confirm the exact list with CIU.":
      "Documents indicatifs pour la licence : formulaire de candidature, diplôme du secondaire (WAEC/NECO/équivalent), passeport ou pièce d’identité acceptée, justificatif d’anglais si requis et autres documents demandés. Confirmez la liste exacte auprès de CIU.",
    "Master’s document guidance: bachelor’s certificate, transcripts, passport or accepted ID, CV, and English evidence where required. Confirm the exact list with CIU.":
      "Documents indicatifs pour le master : diplôme de licence, relevés de notes, passeport ou pièce d’identité acceptée, CV et justificatif d’anglais si requis. Confirmez la liste exacte auprès de CIU.",
    "PhD document guidance: bachelor’s and master’s qualifications, transcripts, CV, research proposal, and English evidence where required. Confirm the exact list with CIU.":
      "Documents indicatifs pour le doctorat : diplômes de licence et de master, relevés de notes, CV, projet de recherche et justificatif d’anglais si requis. Confirmez la liste exacte auprès de CIU.",
    "Tuition varies by programme, scholarship and academic year; use CIU’s tuition calculator on its official website. Confirm the exact initial payment from the student’s official offer letter. Contact FranklyEdu for guidance on confirming these details with CIU.":
      "Les frais de scolarité varient selon la formation, la bourse et l’année universitaire ; utilisez le calculateur de frais sur le site officiel de CIU. Confirmez le paiement initial exact à partir de la lettre officielle d’offre d’admission de l’étudiant. Contactez FranklyEdu pour être accompagné dans la confirmation de ces détails auprès de CIU.",
    "North Nicosia": "Nicosie-Nord",
    "Northern Cyprus": "Chypre du Nord",
    "Accounting and Finance": "Comptabilité et finance",
    "Human Resource Management": "Gestion des ressources humaines",
    Economics: "Économie",
    "Computer Engineering": "Génie informatique",
    "Software Engineering": "Génie logiciel",
    "Civil Engineering": "Génie civil",
    "Electrical and Electronic Engineering": "Génie électrique et électronique",
    "Mechanical Engineering": "Génie mécanique",
    "Information Technology": "Technologies de l’information",
    "Physiotherapy and Rehabilitation": "Kinésithérapie et réadaptation",
    "Nutrition and Dietetics": "Nutrition et diététique",
    Psychology: "Psychologie",
    "English Language Teaching": "Enseignement de l’anglais",
    "Tourism and Hotel Management": "Gestion du tourisme et de l’hôtellerie",
    "Graphic Design": "Design graphique",
    MBA: "Master en administration des affaires (MBA)",
    Finance: "Finance",
    Aviation: "Aviation",
    "Postgraduate studies": "Études de deuxième et troisième cycles",
    "The supplied 2026/2027 regular Master’s tuition for international students is quoted with a 25% scholarship. The university’s stated conditions apply; confirm applicability with the University of Kyrenia through FranklyEdu.":
      "Les frais de scolarité du master standard 2026/2027 communiqués pour les étudiants internationaux sont indiqués avec une bourse de 25 %. Les conditions énoncées par l’université s’appliquent ; confirmez leur applicabilité auprès de l’Université de Kyrenia par l’intermédiaire de FranklyEdu.",
    "For 2026/2027, the published regular Master’s tuition for international students with a 25% scholarship is €1,272 per semester. The published regular Master’s programme fee covers four academic semesters, subject to the university’s stated conditions. No total programme fee is stated here. Undergraduate tuition and initial payments must be confirmed for the selected programme with the University of Kyrenia through FranklyEdu.":
      "Pour 2026/2027, les frais de scolarité publiés du master standard pour les étudiants internationaux avec une bourse de 25 % sont de €1,272 par semestre. Les frais publiés du programme de master standard couvrent quatre semestres universitaires, sous réserve des conditions énoncées par l’université. Aucun montant total du programme n’est indiqué ici. Les frais de scolarité de premier cycle et les paiements initiaux doivent être confirmés pour la formation choisie auprès de l’Université de Kyrenia par l’intermédiaire de FranklyEdu.",
    "GAU 2025/2026 — published annual tuition schedule (EUR)":
      "GAU 2025/2026 — barème publié des frais de scolarité annuels (EUR)",
    "Annual tuition (2025/2026)": "Frais de scolarité annuels (2025/2026)",
    "This Frank-supplied published fee schedule is for 2025/2026 only. These figures are not confirmed 2026/2027 rates. Separately from tuition, the supplied schedule lists an additional registration and activity fee of €500 yearly for the listed degree programmes. This charge is not included in the tuition figures; its applicability has not been independently verified for every category. Ask FranklyEdu to confirm current tuition and applicable charges with GAU.":
      "Ce barème publié, communiqué par Frank, concerne uniquement 2025/2026. Ces montants ne sont pas des tarifs confirmés pour 2026/2027. Séparément des frais de scolarité, le barème communiqué indique des frais supplémentaires d’inscription et d’activités de €500 par an pour les formations diplômantes mentionnées. Ces frais ne sont pas inclus dans les montants de scolarité ; leur application à chaque catégorie n’a pas été vérifiée de manière indépendante. Contactez FranklyEdu pour confirmer les frais de scolarité actuels et les frais applicables auprès de GAU.",
    Business: "Commerce",
    "Architecture and several other faculties": "Architecture et plusieurs autres facultés",
    "Civil Aviation Management": "Gestion de l’aviation civile",
    Pilotage: "Pilotage",
    "Master’s programmes": "Formations de master",
    "PhD programmes": "Formations doctorales",
    "Annual advance-payment fee (75% scholarship)":
      "Frais annuels payables à l’avance (bourse de 75 %)",
    "EMU 2026/2027 — supplied annual advance-payment fees with a 75% scholarship (USD)":
      "EMU 2026/2027 — frais annuels communiqués, payables à l’avance, avec une bourse de 75 % (USD)",
    "Frank's supplied 2026/2027 fees are for eligible new international students with a 75% scholarship, not a guaranteed award for every applicant. The linked general EMU schedule lists other scholarship tiers and a country-specific 75% tier for Turkmenistan. Confirm eligibility for the supplied 75% fees and your payable amount with EMU through FranklyEdu.":
      "Les frais 2026/2027 communiqués par Frank concernent les nouveaux étudiants internationaux éligibles avec une bourse de 75 %, sans garantie d’attribution à chaque candidat. Le barème général EMU en lien présente d’autres niveaux de bourse et un niveau de 75 % propre au Turkménistan. Confirmez votre éligibilité aux tarifs communiqués avec une bourse de 75 % et le montant à payer auprès de l’EMU par l’intermédiaire de FranklyEdu.",
    "These Frank-supplied published 2026/2027 annual advance-payment fees in USD apply to eligible new international students with a 75% scholarship. They are not instalment prices or registration deposit amounts. Confirm the applicable faculty or category, scholarship eligibility and payable amount with EMU. The current registration deposit and instalment arrangements must be confirmed with EMU.":
      "Ces frais annuels publiés pour 2026/2027, communiqués par Frank, payables à l’avance en USD, concernent les nouveaux étudiants internationaux éligibles avec une bourse de 75 %. Ce ne sont ni des montants d’échéances ni des dépôts d’inscription. Confirmez la faculté ou catégorie applicable, l’éligibilité à la bourse et le montant à payer auprès de l’EMU. Le dépôt d’inscription actuel et les modalités de paiement échelonné doivent être confirmés auprès de l’EMU.",
    "Arts and Sciences": "Arts et sciences",
    "Associate degree programmes": "Formations de diplôme de cycle court",
    "Programme / category": "Formation / catégorie",
    "Annual tuition after scholarship": "Frais de scolarité annuels après bourse",
    "NEU 2026/2027 — supplied annual tuition after scholarship (EUR)":
      "NEU 2026/2027 — frais de scolarité annuels après bourse communiqués (EUR)",
    "The supplied NEU 2026/2027 information states that the standard undergraduate scholarship is up to 50% for international students in most departments, excluding Medicine and Dentistry. Ask FranklyEdu to confirm eligibility and payable fees with the university.":
      "Selon les informations NEU 2026/2027 communiquées, la bourse standard de premier cycle peut atteindre 50 % pour les étudiants internationaux dans la plupart des départements, hors médecine et dentisterie. Contactez FranklyEdu pour confirmer l’éligibilité et les frais à payer auprès de l’université.",
    "Additional administrative and other fees may apply. The published total fee for most programmes with €2,800 annual tuition is €3,225 per year; this is distinct from tuition alone and is not a confirmed total for every programme. The initial deposit and payment schedule are unconfirmed. Contact FranklyEdu to confirm these details with the university.":
      "Des frais administratifs et autres frais supplémentaires peuvent s’appliquer. Pour la plupart des formations dont les frais de scolarité annuels sont de €2,800, le montant total publié est de €3,225 par an ; il se distingue des seuls frais de scolarité et n’est pas un total confirmé pour chaque formation. Le dépôt initial et l’échéancier de paiement ne sont pas confirmés. Contactez FranklyEdu pour confirmer ces détails auprès de l’université.",
    "International Business": "Commerce international",
    "Human Resources Management": "Gestion des ressources humaines",
    Marketing: "Marketing",
    "Computer Information Systems": "Systèmes d’information informatiques",
    Nursing: "Soins infirmiers",
    "Engineering programmes": "Formations en ingénierie",
    "Dentistry (English)": "Dentisterie (en anglais)",
    "Current programme-specific entry requirements need confirmation from Hof.":
      "Les conditions d’admission actuelles propres à cette formation doivent être confirmées auprès de Hof.",
    "Hof's general admissions page lists TOEFL iBT 90 or IELTS 6.5 for English-taught programmes and German B2 for German-taught programmes; it does not confirm this programme's specific thresholds.":
      "La page générale d’admission de Hof indique TOEFL iBT 90 ou IELTS 6.5 pour les formations en anglais et un niveau B2 en allemand pour celles en allemand ; elle ne confirme pas les seuils propres à cette formation.",
    "A nursing-science or nursing-related higher-education degree with 210 ECTS; at least 180 ECTS is required, including at least 30 ECTS in nursing-science modules.":
      "Un diplôme d’enseignement supérieur en sciences infirmières ou dans un domaine lié aux soins infirmiers de 210 ECTS ; au moins 180 ECTS sont requis, dont au moins 30 ECTS en modules de sciences infirmières.",
    "Permission to use a professional title under §1(1), sentence 1 of the German Nursing Professions Act (PflBG) is required.":
      "Une autorisation d’utiliser un titre professionnel au titre du §1(1), phrase 1 de la loi allemande sur les professions infirmières (PflBG) est requise.",
    "A first higher-education degree in nursing or a related field; alternatively, another higher-education degree together with completed nursing vocational training.":
      "Un premier diplôme d’enseignement supérieur en soins infirmiers ou dans un domaine connexe ; sinon, un autre diplôme d’enseignement supérieur accompagné d’une formation professionnelle infirmière achevée.",
    "Relevant professional work alongside study: at least 12 hours per week; 20 hours are recommended.":
      "Activité professionnelle pertinente pendant les études : au moins 12 heures par semaine ; 20 heures recommandées.",
    "A motivation letter of about three pages is part of the application.":
      "La candidature comprend une lettre de motivation d’environ trois pages.",
    "Study areas": "Domaines d’études",
    "Study areas require confirmation with the university.":
      "Les domaines d’études doivent être confirmés auprès de l’université.",
    "University study information": "Informations universitaires sur les études",
    "Fee information": "Informations sur les frais",
    "University fee source": "Source des frais universitaires",
    "Arts & Sciences": "Arts et sciences",
    "Business and Economics": "Commerce et économie",
    Communication: "Communication",
    "Computer and Information Sciences": "Informatique et sciences de l’information",
    Tourism: "Tourisme",
    Law: "Droit",
    "Health Sciences": "Sciences de la santé",
    Dentistry: "Dentisterie",
    Medicine: "Médecine",
    "EMU's 2026/27 schedule shows scholarship-priced tiers of 60%, 65%, and 70% for most faculties, 30%–45% for Medicine and Dentistry, and 75% for Turkmenistan. It does not define individual eligibility; confirm your tier and payable amount with EMU.":
      "Le barème EMU 2026/27 présente des tarifs selon des niveaux de bourse de 60 %, 65 % et 70 % pour la plupart des facultés, de 30 % à 45 % pour la médecine et la dentisterie, ainsi qu’un niveau de 75 % pour le Turkménistan. Les critères d’éligibilité individuels ne sont pas précisés ; confirmez votre niveau et le montant à payer auprès de l’EMU.",
    "EMU's official 2026/27 schedule lists annual advance-payment tuition in USD by faculty and scholarship tier. For most faculties, it lists $6,400 at 60%, $5,750 at 65%, and $5,100 at 70%; a separate 75% tier is listed for Turkmenistan. Medicine and Dentistry use 30%–45% tiers in the schedule. Fees include the Student Services Fund, VAT and filing fee; English-preparation books and exams add $250 per semester. Confirm the applicable faculty, award eligibility and payable amount with EMU.":
      "Le barème officiel EMU 2026/27 indique les frais annuels payables à l’avance, en USD, selon la faculté et le niveau de bourse. Pour la plupart des facultés : 6 400 $ à 60 %, 5 750 $ à 65 % et 5 100 $ à 70 % ; un niveau distinct de 75 % est indiqué pour le Turkménistan. Les facultés de médecine et de dentisterie utilisent des niveaux de 30 % à 45 %. Les frais incluent le fonds des services étudiants, la TVA et les frais de dossier d’inscription ; les livres et examens de préparation en anglais coûtent 250 $ par semestre en supplément. Confirmez la faculté, l’éligibilité et le montant à payer auprès de l’EMU.",
    "BAU's official international fee page lists a Master's course-registration fee of $600 per course (at least three courses plus a $300 annual social fund paid in advance: $2,100) and a PhD course-registration fee of $1,200 per course (at least two courses plus the fund: $2,700). The page does not identify an academic year. These course-based advance payments are not confirmed acceptance or visa deposits, or full programme costs; the page states that 5% VAT is included. Confirm the intake and payable amount with BAU.":
      "La page officielle des frais internationaux de BAU indique des frais d’inscription de 600 $ par cours de master (au moins trois cours et 300 $ de fonds social annuel payés à l’avance : 2 100 $) et de 1 200 $ par cours de doctorat (au moins deux cours et le fonds : 2 700 $). La page ne précise pas l’année universitaire. Ces paiements anticipés calculés par cours ne sont ni un dépôt d’admission ou de visa confirmé ni le coût total de la formation ; la page indique que la TVA de 5 % est incluse. Confirmez l’année d’admission et le montant à payer auprès de BAU.",
    "Browse the published programme catalogue. Current named listings are German nursing Master's programmes; other programmes appear after their details are verified. Confirm current availability, fees, and admission requirements directly with the institution.":
      "Consultez le catalogue des formations publiées. Les formations nommées actuellement répertoriées sont des masters en sciences infirmières en Allemagne ; les autres formations seront ajoutées après vérification de leurs détails. Confirmez auprès de l’établissement la disponibilité, les frais et les conditions d’admission actuels.",
    "Browse published programmes with university source links. The current named listings are German nursing Master's programmes; confirm programme availability, fees, and admission requirements with each institution.":
      "Consultez les formations publiées et leurs sources universitaires. Les formations nommées actuellement répertoriées sont des masters en sciences infirmières en Allemagne ; confirmez auprès de chaque établissement la disponibilité, les frais et les conditions d’admission.",
    "No confirmed scholarship details are published for this university.":
      "Aucun détail confirmé sur les bourses n’est publié pour cette université.",
    "University scholarship information": "Informations universitaires sur les bourses",
    "View Courses": "Voir les formations",
    "FranklyEdu provides application guidance and does not directly submit applications to universities.":
      "FranklyEdu accompagne votre candidature et ne la dépose pas directement auprès des universités.",
    "Browse published programmes for this university. Study areas are not individual programme listings; confirm current availability and admission requirements with the institution.":
      "Consultez les formations publiées pour cette université. Les domaines d’études ne sont pas des fiches de formation ; confirmez les disponibilités et conditions d’admission auprès de l’établissement.",
    "No verified programme listings yet for this university":
      "Aucune formation vérifiée n’est encore publiée pour cette université",
    "This does not mean the university has no programmes. Contact us for current information; individual programmes are added only after their details have been verified.":
      "Cela ne signifie pas que l’université ne propose aucune formation. Contactez-nous pour des informations actuelles ; les formations sont ajoutées uniquement après vérification de leurs détails.",
    "Business Administration": "Administration des entreprises",
    "International Relations": "Relations internationales",
    "Computer and Information Technologies": "Informatique et technologies de l’information",
    Engineering: "Ingénierie",
    "Nursing and Health Sciences": "Soins infirmiers et sciences de la santé",
    Education: "Sciences de l’éducation",
    Pharmacy: "Pharmacie",
    Architecture: "Architecture",
    "Tourism and Hospitality": "Tourisme et hôtellerie",
    "Master’s and PhD programmes": "Masters et doctorats",
    "CIU offers a 50% international undergraduate tuition scholarship; additional academic scholarships may be available. Exact payable tuition depends on the programme and scholarship. Confirm eligibility and payable tuition with CIU through FranklyEdu before applying or making any payment.":
      "CIU propose une bourse couvrant 50 % des frais de scolarité de premier cycle pour les étudiants internationaux ; des bourses académiques supplémentaires peuvent être disponibles. Les frais de scolarité exacts à payer dépendent de la formation et de la bourse. Confirmez l’éligibilité et les frais à payer auprès de CIU par l’intermédiaire de FranklyEdu avant toute candidature ou tout paiement.",
    "Confirm the exact initial payment amount using the student's official acceptance letter or invoice. Contact FranklyEdu for guidance on confirming this amount with CIU.":
      "Confirmez le montant exact du paiement initial à l’aide de la lettre officielle d’admission ou de la facture de l’étudiant. Contactez FranklyEdu pour être accompagné dans la confirmation de ce montant auprès de CIU.",
    "Refer to the institution's official site for current programmes and admissions information.":
      "Consultez le site officiel de l’établissement pour connaître les formations et admissions actuelles.",
    "University site": "Site de l’université",
    "Programme source": "Source de la formation",
    "Admissions info": "Admissions",
    "Ask about programme": "Se renseigner",
    "Compare programme details before you take the next step.":
      "Comparez les détails des formations avant de poursuivre.",
    "No programmes match these filters": "Aucune formation ne correspond à ces filtres",
    "Clear a filter to see the current listings. Some intake and admissions details still need confirmation directly with the institution.":
      "Supprimez un filtre pour voir les formations disponibles. Certaines dates et informations d’admission doivent encore être confirmées auprès de l’établissement.",
    "Start / intake": "Début / rentrée",
    "Application window": "Période de candidature",
    "Entry requirements": "Conditions d’admission",
    "Information to confirm": "Informations à confirmer",
    "Frankedu document-sharing deadline": "Date limite d’envoi des documents à Frankedu",
    "Before you apply": "Avant de postuler",
    "Programme details and admission decisions belong to each university and may change. This website does not submit an application. Visa decisions are made by the relevant authorities; admission, visas, professional recognition, employment, and job outcomes are not guaranteed. Confirm current requirements and fees with the university before applying.":
      "Les détails des formations et les décisions d’admission relèvent de chaque université et peuvent changer. Ce site ne dépose pas de candidature. Les autorités compétentes prennent les décisions de visa ; l’admission, les visas, la reconnaissance professionnelle, l’emploi et les débouchés ne sont pas garantis. Vérifiez les conditions et frais actuels auprès de l’université avant de postuler.",
    "Spring 2027 availability not confirmed": "Disponibilité au printemps 2027 non confirmée",
    "Not confirmed in current official sources":
      "Non confirmé par les sources officielles consultées",
    "Current duration not confirmed": "Durée actuelle non confirmée",
    "Current fees not confirmed": "Frais actuels non confirmés",
    "Programme-specific language requirements need confirmation":
      "Les exigences linguistiques propres à la formation doivent être confirmées",
    "Ask Hof to confirm current programme-specific academic and language requirements.":
      "Demandez à Hof de confirmer les conditions académiques et linguistiques actuelles de la formation.",
    "General Hof language rules: English-taught programmes require TOEFL iBT 90 or IELTS 6.5; German-taught programmes require B2. These do not confirm the requirements for this programme.":
      "Règles linguistiques générales de Hof : TOEFL iBT 90 ou IELTS 6.5 pour les formations en anglais ; niveau B2 en allemand pour celles en allemand. Ces règles ne confirment pas les exigences propres à cette formation.",
    "The available official programme flyer is dated 2025, and the programme-specific page is currently unavailable. Confirm that the programme and Spring 2027 intake are open directly with Hof.":
      "La brochure officielle disponible date de 2025 et la page dédiée à la formation n’est actuellement pas accessible. Vérifiez directement auprès de Hof que la formation et la rentrée du printemps 2027 sont ouvertes.",
    "Frankedu document-sharing deadline: 15 November 2026. This is a preparation target set by Frankedu, not a confirmed Hof application deadline.":
      "Date limite d’envoi des documents à Frankedu : 15 novembre 2026. Il s’agit d’un objectif de préparation fixé par Frankedu, et non d’une date limite de candidature confirmée par Hof.",
    "3 theoretical study semesters; full-time": "3 semestres théoriques ; à temps plein",
    "A student-services contribution is payable at OTH; see the current fee schedule for the amount.":
      "Une contribution aux services étudiants est due à l’OTH ; consultez le barème actuel pour connaître son montant.",
    "Summer semester 2027; exact start date not specified by OTH":
      "Semestre d’été 2027 ; la date exacte de début n’est pas précisée par l’OTH",
    "15 November–15 January for summer semesters; confirm the year-specific dates in the OTH portal.":
      "Du 15 novembre au 15 janvier pour les semestres d’été ; vérifiez les dates annuelles sur le portail de l’OTH.",
    "German; DSH 3 or equivalent is required by the start of study.":
      "Allemand ; un niveau DSH 3 ou équivalent est requis avant le début des études.",
    "A higher-education degree with 210 ECTS; at least 180 ECTS must be in nursing or a related field, including at least 30 ECTS in nursing-science modules.":
      "Un diplôme d’enseignement supérieur de 210 ECTS ; au moins 180 ECTS en soins infirmiers ou domaine connexe, dont au moins 30 ECTS en sciences infirmières.",
    "A permit to use a professional title under §1(1), sentence 1 PflBG is required.":
      "Une autorisation d’utiliser un titre professionnel au titre du §1(1), phrase 1 de la PflBG est requise.",
    "The university states that the programme is offered subject to a sufficient number of qualified applications. Confirm current availability and requirements directly with OTH.":
      "L’université indique que la formation dépend d’un nombre suffisant de candidatures qualifiées. Vérifiez sa disponibilité et ses conditions directement auprès de l’OTH.",
    "5 semesters; part-time": "5 semestres ; à temps partiel",
    "Current fees and semester contributions need confirmation with EHS.":
      "Les frais actuels et contributions semestrielles doivent être confirmés auprès de l’EHS.",
    "Summer semester; the university lists 1 March as the start date.":
      "Semestre d’été ; l’université indique le 1er mars comme date de début.",
    "5 January annually; confirm the 2027 deadline with EHS.":
      "Le 5 janvier chaque année ; confirmez la date limite 2027 auprès de l’EHS.",
    "German; C1 is required for applicants with foreign qualifications.":
      "Allemand ; le niveau C1 est requis pour les candidats titulaires de qualifications étrangères.",
    "First degree in nursing or a related field; alternatively, another degree plus completed nursing vocational training.":
      "Premier diplôme en soins infirmiers ou domaine connexe ; sinon, un autre diplôme accompagné d’une formation professionnelle infirmière achevée.",
    "Relevant professional work alongside study: at least 12 hours weekly; 20 hours recommended.":
      "Activité professionnelle pertinente pendant les études : au moins 12 heures par semaine ; 20 heures recommandées.",
    "Application includes a motivation letter of about three pages.":
      "La candidature comprend une lettre de motivation d’environ trois pages.",
    "Confirm the 2027 intake, application requirements and current fees directly with EHS before making plans.":
      "Avant tout projet, confirmez directement auprès de l’EHS la rentrée 2027, les conditions de candidature et les frais actuels.",
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
    "Continue opens WhatsApp with these details for you to review and send. Documents are not uploaded or sent in this step. FranklyEdu provides application guidance and does not directly submit applications to universities.":
      "Continuer ouvre WhatsApp avec ces informations pour que vous puissiez les vérifier et les envoyer. Aucun document n’est téléversé ni envoyé à cette étape. FranklyEdu accompagne votre candidature et ne la dépose pas directement auprès des universités.",
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
    "Admissions document guidance — confirm with the university":
      "Mwongozo wa hati za udahili — thibitisha na chuo kikuu",
    "Computing and Engineering": "Kompyuta na Uhandisi",
    "Health and Life Sciences": "Afya na Sayansi za Uhai",
    "Social Sciences and Humanities": "Sayansi za Jamii na Binadamu",
    Accounting: "Uhasibu",
    "Computer Science": "Sayansi ya Kompyuta",
    IT: "Teknolojia ya Habari",
    "Biological Sciences": "Sayansi za Biolojia",
    "Public Health": "Afya ya Umma",
    "Undergraduate estimate": "Makadirio ya shahada ya kwanza",
    "Graduate estimate": "Makadirio ya masomo ya uzamili na uzamivu",
    "Tuition — per semester": "Ada ya masomo — kwa muhula",
    "Fees — per semester": "Ada nyingine — kwa muhula",
    "Books and supplies — per semester": "Vitabu na vifaa — kwa muhula",
    "Housing — per semester": "Makazi — kwa muhula",
    "Food — per semester": "Chakula — kwa muhula",
    "Transportation — per semester": "Usafiri — kwa muhula",
    "Personal expenses — per semester": "Matumizi binafsi — kwa muhula",
    "Estimated annual total — fall and spring": "Jumla ya mwaka iliyokadiriwa — vuli na masika",
    "Official degree catalogue": "Katalogi rasmi ya shahada",
    "Official cost estimates": "Makadirio rasmi ya gharama",
    "Official international document guidance": "Mwongozo rasmi wa hati za kimataifa",
    "Official graduate admissions guidance": "Mwongozo rasmi wa udahili wa uzamili na uzamivu",
    "FIU 2026/2027 — supplied non-Florida-resident on-campus estimates (USD)":
      "FIU 2026/2027 — makadirio yaliyotolewa ya chuoni kwa wasio wakazi wa Florida (USD)",
    "FIU’s supplied 2026/2027 non-Florida-resident on-campus cost estimates are shown on View Courses. These are estimates, not guaranteed final costs. F-1/J-1 students generally pay applicable non-Florida-resident rates; additional charges may apply. Confirm deposits, deadlines and financial-documentation requirements directly with FIU; no fixed initial payment is stated.":
      "Makadirio ya FIU ya 2026/2027 yaliyotolewa ya gharama za chuoni kwa wasio wakazi wa Florida yanaonyeshwa kwenye Angalia programu. Haya ni makadirio, si gharama za mwisho zilizohakikishwa. Wanafunzi wa F-1/J-1 kwa kawaida hulipa viwango vinavyotumika kwa wasio wakazi wa Florida; ada za ziada zinaweza kutumika. Thibitisha amana, tarehe za mwisho na mahitaji ya hati za fedha moja kwa moja na FIU; hakuna malipo ya awali ya kudumu yaliyotajwa.",
    "Expense rows are per semester; estimated annual totals cover fall and spring. The official annual budgets include other allowances, including loan-origination allowances omitted from these supplied rows; not every budget allowance is a charge payable by every student. FIU publishes multiple budgets; confirm the applicable pathway, programme and budget with FIU. These estimates are not scholarship prices or guaranteed invoices.":
      "Mistari ya matumizi ni kwa muhula; jumla za mwaka zilizokadiriwa zinahusu vuli na masika. Bajeti rasmi za mwaka zinajumuisha makadirio mengine, yakiwemo ya kuanzisha mkopo yaliyoachwa katika mistari iliyotolewa; si kila kipengele cha bajeti ni ada inayolipwa na kila mwanafunzi. FIU huchapisha bajeti nyingi; thibitisha njia, programu na bajeti inayotumika na FIU. Makadirio haya si bei za ufadhili au ankara zilizohakikishwa.",
    "FIU catalogue examples supplied by Frank, not confirmed current degree records. Confirm exact degree titles, availability, teaching language, duration, intake and requirements against FIU’s official degree catalogue. Undergraduate examples are grouped at Bachelor’s level; graduate examples have no confirmed Master’s or doctoral assignment.":
      "Mifano ya katalogi ya FIU iliyotolewa na Frank, si rekodi za sasa za shahada zilizothibitishwa. Thibitisha majina halisi ya shahada, upatikanaji, lugha, muda, udahili na mahitaji katika katalogi rasmi ya FIU. Mifano ya shahada ya kwanza imepangwa katika ngazi hiyo; mifano ya masomo ya juu haina mgawanyo uliothibitishwa wa uzamili au uzamivu.",
    "Supplied levels: Bachelor’s, Master’s and doctoral. Graduate examples appear only without a study-level filter; they are not duplicated as confirmed Master’s or PhD programmes.":
      "Ngazi zilizotolewa: shahada ya kwanza, uzamili na uzamivu. Mifano ya masomo ya juu huonekana tu bila kichujio cha ngazi; hairudiwi kama programu zilizothibitishwa za uzamili au uzamivu.",
    "Bachelor’s document guidance: official secondary-school records and English translations where needed; transfer applicants may need post-secondary transcripts and course-by-course evaluations. Confirm the application, test evidence and immigration documents for your admission pathway with FIU. Requirements vary by pathway and programme.":
      "Mwongozo wa hati za shahada ya kwanza: rekodi rasmi za sekondari na tafsiri za Kiingereza inapohitajika; waombaji wanaohama wanaweza kuhitaji nakala za matokeo ya baada ya sekondari na tathmini ya kila kozi. Thibitisha maombi, ushahidi wa mitihani na hati za uhamiaji kwa njia yako ya udahili na FIU. Mahitaji hutofautiana kwa njia na programu.",
    "Master’s and PhD document guidance: official post-secondary transcripts and degree records, with translations and evaluations where required. Departments may request a statement of purpose, recommendation letters, CV and research/writing samples, or a separate application, interview or audition. Confirm English evidence and immigration/financial documents with FIU. Requirements vary by admission pathway and programme; this is not a universal checklist or eligibility guarantee.":
      "Mwongozo wa hati za uzamili na uzamivu: nakala rasmi za matokeo na rekodi za shahada baada ya sekondari, pamoja na tafsiri na tathmini inapohitajika. Idara zinaweza kuomba barua ya malengo, barua za mapendekezo, wasifu na mifano ya utafiti/uandishi, au maombi tofauti, mahojiano au majaribio. Thibitisha ushahidi wa Kiingereza na hati za uhamiaji/fedha na FIU. Mahitaji hutofautiana kwa njia ya udahili na programu; huu si orodha ya jumla au dhamana ya ustahiki.",
    "Selected fee examples below are separate from the filtered catalogue names; they do not confirm a programme level or current availability.":
      "Mifano ya ada zilizochaguliwa hapa chini ni tofauti na majina ya katalogi yaliyochujwa; haithibitishi ngazi ya programu au upatikanaji wa sasa.",
    "Associate degree": "Shahada ya ngazi ya associate",
    "Programme examples — level unassigned": "Mifano ya programu — ngazi haijapangiwa",
    "NEU 2026/2027 — selected programme annual fee examples (EUR)":
      "NEU 2026/2027 — mifano ya ada za mwaka za programu zilizochaguliwa (EUR)",
    "Annual tuition before scholarship": "Ada ya masomo ya mwaka kabla ya ufadhili",
    "Listed 50% scholarship figure / special scholarship":
      "Kiasi kilichoorodheshwa kwa ufadhili wa 50% / ufadhili maalumu",
    "Total including VAT/administrative fee": "Jumla ikijumuisha VAT/ada ya utawala",
    "No scholarship figure listed": "Hakuna kiasi cha ufadhili kilichoorodheshwa",
    "Special scholarship listed; figure not supplied":
      "Ufadhili maalumu umeorodheshwa; kiasi hakijatolewa",
    "Selected programmes from the supplied NEU 2026/2027 schedule are shown on View Courses, separating annual tuition before scholarship, the listed scholarship figure and total including VAT/administrative fee. Unlisted scholarship figures are not zero; Pharmacy has a special scholarship listed without a tuition figure. Programme availability and language of instruction vary and require confirmation. The initial deposit and payment schedule remain unconfirmed; contact FranklyEdu to confirm payable fees with NEU.":
      "Programu zilizochaguliwa kutoka ratiba ya NEU 2026/2027 iliyotolewa zinaonyeshwa kwenye Angalia programu, zikitenganisha ada ya masomo ya mwaka kabla ya ufadhili, kiasi kilichoorodheshwa kwa ufadhili na jumla ikijumuisha VAT/ada ya utawala. Kiasi cha ufadhili kisichoorodheshwa si sifuri; Famasia ina ufadhili maalumu ulioorodheshwa bila kiasi cha ada ya masomo baada ya ufadhili. Upatikanaji wa programu na lugha ya kufundishia hutofautiana na vinahitaji uthibitisho. Amana ya awali na ratiba ya malipo bado hazijathibitishwa; wasiliana na FranklyEdu ili kuthibitisha ada zinazolipwa na NEU.",
    "NEU catalogue examples supplied by Frank, not confirmed current programme-level records. Programme availability and language of instruction vary and must be confirmed with NEU. Duration, intake, programme-specific requirements and current fees require confirmation. Named examples have no confirmed level assignment and are shown only when no study-level filter is selected.":
      "Mifano ya katalogi ya NEU iliyotolewa na Frank, si rekodi za sasa za programu zilizothibitishwa. Upatikanaji wa programu na lugha ya kufundishia hutofautiana na lazima vithibitishwe na NEU. Muda, udahili, mahitaji ya kila programu na ada za sasa zinahitaji uthibitisho. Mifano yenye majina haina ngazi iliyothibitishwa na huonyeshwa tu wakati hakuna kichujio cha ngazi ya masomo kilichochaguliwa.",
    "Supplied level coverage: Associate degree, Bachelor’s, Master’s and PhD. No named Associate degree, Master’s or PhD offerings are confirmed here; no named example is assigned to a level.":
      "Ngazi zilizotolewa: shahada ya ngazi ya associate, shahada ya kwanza, uzamili na uzamivu. Hakuna programu zenye majina za associate, uzamili au uzamivu zilizothibitishwa hapa; hakuna mfano wenye jina uliopangiwa ngazi.",
    "Banking and Finance": "Benki na Fedha",
    "Artificial Intelligence Engineering": "Uhandisi wa Akili Bandia",
    "Cyber Security Engineering": "Uhandisi wa Usalama wa Mtandao",
    "Information Systems Engineering": "Uhandisi wa Mifumo ya Habari",
    "Management Information Systems": "Mifumo ya Habari ya Usimamizi",
    "Data Analysis Engineering": "Uhandisi wa Uchambuzi wa Data",
    "Biomedical Engineering": "Uhandisi wa Tiba",
    "Industrial Engineering": "Uhandisi wa Viwanda",
    "Veterinary Medicine": "Udaktari wa Mifugo",
    "Browse source-linked programme records and clearly labelled university catalogue examples. Confirm current availability, fees and requirements with the university.":
      "Angalia rekodi za programu zenye viungo vya vyanzo na mifano ya katalogi za vyuo vikuu iliyowekwa alama wazi. Thibitisha upatikanaji wa sasa, ada na mahitaji na chuo kikuu.",
    "Browse this university’s programme records or labelled catalogue examples. Examples do not confirm current availability; check details with the institution.":
      "Angalia rekodi za programu au mifano ya katalogi iliyowekwa alama ya chuo hiki. Mifano haithibitishi upatikanaji wa sasa; hakiki maelezo na taasisi.",
    "Catalogue examples — availability unconfirmed":
      "Mifano ya katalogi — upatikanaji haujathibitishwa",
    "catalogue examples match these filters": "mifano ya katalogi inalingana na vichujio hivi",
    "Admissions document guidance — reconfirm with CIU":
      "Mwongozo wa hati za udahili — thibitisha tena na CIU",
    "CIU catalogue examples supplied by Frank, not confirmed current programme-level records. Availability, duration, intake, teaching language, programme-specific requirements and fees require confirmation with CIU. These examples are not selectable confirmed courses in the application form.":
      "Mifano ya katalogi ya CIU iliyotolewa na Frank, si rekodi za sasa za programu zilizothibitishwa. Upatikanaji, muda, udahili, lugha ya kufundishia, mahitaji na ada za kila programu zinahitaji uthibitisho na CIU. Mifano hii haiwezi kuchaguliwa kama kozi zilizothibitishwa katika fomu ya maombi.",
    "Supplied notes cite IELTS 5.5 or TOEFL iBT 65; some applicants may take an on-campus proficiency exam. These are not confirmed programme-specific thresholds. Reconfirm accepted English evidence and any exam option with CIU.":
      "Maelezo yaliyotolewa yanataja IELTS 5.5 au TOEFL iBT 65; baadhi ya waombaji wanaweza kufanya mtihani wa umahiri chuoni. Hivi si viwango vilivyothibitishwa kwa kila programu. Thibitisha tena ushahidi wa Kiingereza unaokubalika na chaguo lolote la mtihani na CIU.",
    "Bachelor’s document guidance: application form, secondary certificate (WAEC/NECO/equivalent), passport or accepted ID, English evidence where required, and other requested documents. Confirm the exact list with CIU.":
      "Mwongozo wa hati za shahada ya kwanza: fomu ya maombi, cheti cha sekondari (WAEC/NECO/sawa), pasipoti au kitambulisho kinachokubalika, ushahidi wa Kiingereza unapohitajika na hati nyingine zinazoombwa. Thibitisha orodha kamili na CIU.",
    "Master’s document guidance: bachelor’s certificate, transcripts, passport or accepted ID, CV, and English evidence where required. Confirm the exact list with CIU.":
      "Mwongozo wa hati za uzamili: cheti cha shahada ya kwanza, nakala za matokeo, pasipoti au kitambulisho kinachokubalika, wasifu na ushahidi wa Kiingereza unapohitajika. Thibitisha orodha kamili na CIU.",
    "PhD document guidance: bachelor’s and master’s qualifications, transcripts, CV, research proposal, and English evidence where required. Confirm the exact list with CIU.":
      "Mwongozo wa hati za uzamivu: sifa za shahada ya kwanza na uzamili, nakala za matokeo, wasifu, pendekezo la utafiti na ushahidi wa Kiingereza unapohitajika. Thibitisha orodha kamili na CIU.",
    "Tuition varies by programme, scholarship and academic year; use CIU’s tuition calculator on its official website. Confirm the exact initial payment from the student’s official offer letter. Contact FranklyEdu for guidance on confirming these details with CIU.":
      "Ada ya masomo hutofautiana kwa programu, ufadhili na mwaka wa masomo; tumia kikokotoo cha ada cha CIU kwenye tovuti yake rasmi. Thibitisha malipo halisi ya awali kutoka barua rasmi ya ofa ya udahili ya mwanafunzi. Wasiliana na FranklyEdu kwa mwongozo wa kuthibitisha maelezo haya na CIU.",
    "North Nicosia": "Nicosia Kaskazini",
    "Northern Cyprus": "Saiprasi ya Kaskazini",
    "Accounting and Finance": "Uhasibu na Fedha",
    "Human Resource Management": "Usimamizi wa Rasilimali Watu",
    Economics: "Uchumi",
    "Computer Engineering": "Uhandisi wa Kompyuta",
    "Software Engineering": "Uhandisi wa Programu",
    "Civil Engineering": "Uhandisi wa Ujenzi",
    "Electrical and Electronic Engineering": "Uhandisi wa Umeme na Elektroniki",
    "Mechanical Engineering": "Uhandisi wa Mitambo",
    "Information Technology": "Teknolojia ya Habari",
    "Physiotherapy and Rehabilitation": "Tiba ya Viungo na Urekebishaji",
    "Nutrition and Dietetics": "Lishe na Sayansi ya Ulaji",
    Psychology: "Saikolojia",
    "English Language Teaching": "Ufundishaji wa Kiingereza",
    "Tourism and Hotel Management": "Usimamizi wa Utalii na Hoteli",
    "Graphic Design": "Ubunifu wa Picha",
    MBA: "Uzamili wa Usimamizi wa Biashara (MBA)",
    Finance: "Fedha",
    Aviation: "Usafiri wa Anga",
    "Postgraduate studies": "Masomo ya uzamili na uzamivu",
    "The supplied 2026/2027 regular Master’s tuition for international students is quoted with a 25% scholarship. The university’s stated conditions apply; confirm applicability with the University of Kyrenia through FranklyEdu.":
      "Ada iliyotolewa ya masomo ya kawaida ya uzamili ya 2026/2027 kwa wanafunzi wa kimataifa imetajwa kwa ufadhili wa 25%. Masharti yaliyotajwa na chuo kikuu yanatumika; thibitisha matumizi yake na Chuo Kikuu cha Kyrenia kupitia FranklyEdu.",
    "For 2026/2027, the published regular Master’s tuition for international students with a 25% scholarship is €1,272 per semester. The published regular Master’s programme fee covers four academic semesters, subject to the university’s stated conditions. No total programme fee is stated here. Undergraduate tuition and initial payments must be confirmed for the selected programme with the University of Kyrenia through FranklyEdu.":
      "Kwa 2026/2027, ada iliyochapishwa ya masomo ya kawaida ya uzamili kwa wanafunzi wa kimataifa wenye ufadhili wa 25% ni €1,272 kwa muhula. Ada iliyochapishwa ya programu ya kawaida ya uzamili inahusisha mihula minne ya kitaaluma, kwa kuzingatia masharti yaliyotajwa na chuo kikuu. Hakuna jumla ya ada ya programu iliyotajwa hapa. Ada ya masomo ya shahada ya kwanza na malipo ya awali lazima zithibitishwe kwa programu iliyochaguliwa na Chuo Kikuu cha Kyrenia kupitia FranklyEdu.",
    "GAU 2025/2026 — published annual tuition schedule (EUR)":
      "GAU 2025/2026 — ratiba iliyochapishwa ya ada ya masomo ya mwaka (EUR)",
    "Annual tuition (2025/2026)": "Ada ya masomo ya mwaka (2025/2026)",
    "This Frank-supplied published fee schedule is for 2025/2026 only. These figures are not confirmed 2026/2027 rates. Separately from tuition, the supplied schedule lists an additional registration and activity fee of €500 yearly for the listed degree programmes. This charge is not included in the tuition figures; its applicability has not been independently verified for every category. Ask FranklyEdu to confirm current tuition and applicable charges with GAU.":
      "Ratiba hii ya ada iliyochapishwa na kutolewa na Frank ni ya 2025/2026 pekee. Kiasi hiki si viwango vilivyothibitishwa vya 2026/2027. Kando na ada ya masomo, ratiba iliyotolewa ina ada ya ziada ya usajili na shughuli ya €500 kwa mwaka kwa programu za shahada zilizoorodheshwa. Ada hii haijajumuishwa katika kiasi cha ada ya masomo; matumizi yake kwa kila kundi hayajathibitishwa kwa kujitegemea. Wasiliana na FranklyEdu ili kuthibitisha ada ya sasa ya masomo na ada zinazotumika na GAU.",
    Business: "Biashara",
    "Architecture and several other faculties": "Usanifu Majengo na vitivo vingine kadhaa",
    "Civil Aviation Management": "Usimamizi wa Usafiri wa Anga wa Kiraia",
    Pilotage: "Uendeshaji wa Ndege",
    "Master’s programmes": "Programu za uzamili",
    "PhD programmes": "Programu za uzamivu",
    "Annual advance-payment fee (75% scholarship)":
      "Ada ya mwaka ya kulipwa mapema (ufadhili wa 75%)",
    "EMU 2026/2027 — supplied annual advance-payment fees with a 75% scholarship (USD)":
      "EMU 2026/2027 — ada za mwaka zilizotolewa za kulipwa mapema kwa ufadhili wa 75% (USD)",
    "Frank's supplied 2026/2027 fees are for eligible new international students with a 75% scholarship, not a guaranteed award for every applicant. The linked general EMU schedule lists other scholarship tiers and a country-specific 75% tier for Turkmenistan. Confirm eligibility for the supplied 75% fees and your payable amount with EMU through FranklyEdu.":
      "Ada za 2026/2027 zilizotolewa na Frank ni kwa wanafunzi wapya wa kimataifa wanaostahiki wenye ufadhili wa 75%, si tuzo iliyohakikishwa kwa kila mwombaji. Ratiba ya jumla ya EMU iliyounganishwa ina viwango vingine vya ufadhili na kiwango cha 75% maalumu kwa Turkmenistan. Thibitisha ustahiki wa ada zilizotolewa za ufadhili wa 75% na kiasi chako cha kulipa na EMU kupitia FranklyEdu.",
    "These Frank-supplied published 2026/2027 annual advance-payment fees in USD apply to eligible new international students with a 75% scholarship. They are not instalment prices or registration deposit amounts. Confirm the applicable faculty or category, scholarship eligibility and payable amount with EMU. The current registration deposit and instalment arrangements must be confirmed with EMU.":
      "Ada hizi zilizochapishwa za mwaka wa 2026/2027 za kulipwa mapema kwa USD, zilizotolewa na Frank, zinawahusu wanafunzi wapya wa kimataifa wanaostahiki wenye ufadhili wa 75%. Si bei za malipo ya awamu wala kiasi cha amana ya usajili. Thibitisha kitivo au kundi husika, ustahiki wa ufadhili na kiasi cha kulipa na EMU. Amana ya sasa ya usajili na mipango ya malipo ya awamu lazima ithibitishwe na EMU.",
    "Arts and Sciences": "Sanaa na Sayansi",
    "Associate degree programmes": "Programu za shahada ya ngazi ya associate",
    "Programme / category": "Programu / kundi",
    "Annual tuition after scholarship": "Ada ya masomo ya mwaka baada ya ufadhili",
    "NEU 2026/2027 — supplied annual tuition after scholarship (EUR)":
      "NEU 2026/2027 — ada za masomo za mwaka baada ya ufadhili zilizotolewa (EUR)",
    "The supplied NEU 2026/2027 information states that the standard undergraduate scholarship is up to 50% for international students in most departments, excluding Medicine and Dentistry. Ask FranklyEdu to confirm eligibility and payable fees with the university.":
      "Taarifa zilizotolewa za NEU 2026/2027 zinaeleza kuwa ufadhili wa kawaida wa shahada ya kwanza ni hadi 50% kwa wanafunzi wa kimataifa katika idara nyingi, isipokuwa Udaktari na Udaktari wa Meno. Wasiliana na FranklyEdu ili kuthibitisha ustahiki na ada zinazopaswa kulipwa na chuo kikuu.",
    "Additional administrative and other fees may apply. The published total fee for most programmes with €2,800 annual tuition is €3,225 per year; this is distinct from tuition alone and is not a confirmed total for every programme. The initial deposit and payment schedule are unconfirmed. Contact FranklyEdu to confirm these details with the university.":
      "Ada za ziada za utawala na ada nyingine zinaweza kutumika. Jumla ya ada iliyochapishwa kwa programu nyingi zenye ada ya masomo ya mwaka ya €2,800 ni €3,225 kwa mwaka; hii ni tofauti na ada ya masomo pekee na si jumla iliyothibitishwa kwa kila programu. Amana ya awali na ratiba ya malipo hazijathibitishwa. Wasiliana na FranklyEdu ili kuthibitisha maelezo haya na chuo kikuu.",
    "International Business": "Biashara ya Kimataifa",
    "Human Resources Management": "Usimamizi wa Rasilimali Watu",
    Marketing: "Masoko",
    "Computer Information Systems": "Mifumo ya Taarifa za Kompyuta",
    Nursing: "Uuguzi",
    "Engineering programmes": "Programu za uhandisi",
    "Dentistry (English)": "Udaktari wa Meno (Kiingereza)",
    "Current programme-specific entry requirements need confirmation from Hof.":
      "Masharti ya sasa ya kujiunga na programu hii yanahitaji kuthibitishwa na Hof.",
    "Hof's general admissions page lists TOEFL iBT 90 or IELTS 6.5 for English-taught programmes and German B2 for German-taught programmes; it does not confirm this programme's specific thresholds.":
      "Ukurasa wa jumla wa udahili wa Hof unataja TOEFL iBT 90 au IELTS 6.5 kwa programu za Kiingereza na Kijerumani B2 kwa programu za Kijerumani; hauthibitishi viwango mahususi vya programu hii.",
    "A nursing-science or nursing-related higher-education degree with 210 ECTS; at least 180 ECTS is required, including at least 30 ECTS in nursing-science modules.":
      "Shahada ya elimu ya juu ya sayansi ya uuguzi au fani inayohusiana na uuguzi yenye ECTS 210; angalau ECTS 180 zinahitajika, ikijumuisha angalau ECTS 30 za masomo ya sayansi ya uuguzi.",
    "Permission to use a professional title under §1(1), sentence 1 of the German Nursing Professions Act (PflBG) is required.":
      "Kibali cha kutumia cheo cha kitaaluma chini ya §1(1), sentensi ya 1 ya Sheria ya Ujerumani ya Taaluma za Uuguzi (PflBG) kinahitajika.",
    "A first higher-education degree in nursing or a related field; alternatively, another higher-education degree together with completed nursing vocational training.":
      "Shahada ya kwanza ya elimu ya juu ya uuguzi au fani inayohusiana; au shahada nyingine ya elimu ya juu pamoja na mafunzo kamili ya kitaaluma ya uuguzi.",
    "Relevant professional work alongside study: at least 12 hours per week; 20 hours are recommended.":
      "Kazi husika sambamba na masomo: angalau saa 12 kwa wiki; saa 20 zinapendekezwa.",
    "A motivation letter of about three pages is part of the application.":
      "Maombi yanajumuisha barua ya motisha ya takriban kurasa tatu.",
    "Study areas": "Maeneo ya masomo",
    "Study areas require confirmation with the university.":
      "Maeneo ya masomo yanahitaji kuthibitishwa na chuo kikuu.",
    "University study information": "Taarifa za masomo za chuo kikuu",
    "Fee information": "Taarifa za ada",
    "University fee source": "Chanzo cha ada cha chuo kikuu",
    "Arts & Sciences": "Sanaa na Sayansi",
    "Business and Economics": "Biashara na Uchumi",
    Communication: "Mawasiliano",
    "Computer and Information Sciences": "Sayansi za Kompyuta na Habari",
    Tourism: "Utalii",
    Law: "Sheria",
    "Health Sciences": "Sayansi za Afya",
    Dentistry: "Udaktari wa Meno",
    Medicine: "Udaktari",
    "EMU's 2026/27 schedule shows scholarship-priced tiers of 60%, 65%, and 70% for most faculties, 30%–45% for Medicine and Dentistry, and 75% for Turkmenistan. It does not define individual eligibility; confirm your tier and payable amount with EMU.":
      "Ratiba ya EMU ya 2026/27 inaonyesha bei za viwango vya ufadhili vya 60%, 65% na 70% kwa vitivo vingi, 30%–45% kwa Udaktari na Udaktari wa Meno, na 75% kwa Turkmenistan. Haielezi ustahiki wa mtu binafsi; thibitisha kiwango chako na kiasi cha kulipa na EMU.",
    "EMU's official 2026/27 schedule lists annual advance-payment tuition in USD by faculty and scholarship tier. For most faculties, it lists $6,400 at 60%, $5,750 at 65%, and $5,100 at 70%; a separate 75% tier is listed for Turkmenistan. Medicine and Dentistry use 30%–45% tiers in the schedule. Fees include the Student Services Fund, VAT and filing fee; English-preparation books and exams add $250 per semester. Confirm the applicable faculty, award eligibility and payable amount with EMU.":
      "Ratiba rasmi ya EMU ya 2026/27 inaonyesha ada za mwaka za kulipwa mapema kwa USD kulingana na kitivo na kiwango cha ufadhili. Kwa vitivo vingi: $6,400 kwa 60%, $5,750 kwa 65% na $5,100 kwa 70%; kiwango tofauti cha 75% kimeorodheshwa kwa Turkmenistan. Vitivo vya udaktari na udaktari wa meno vina viwango vya 30%–45%. Ada zinajumuisha Mfuko wa Huduma za Wanafunzi, VAT na ada ya usajili; vitabu na mitihani ya maandalizi ya Kiingereza ni $250 kwa muhula wa ziada. Thibitisha kitivo, ustahiki na kiasi cha kulipa na EMU.",
    "BAU's official international fee page lists a Master's course-registration fee of $600 per course (at least three courses plus a $300 annual social fund paid in advance: $2,100) and a PhD course-registration fee of $1,200 per course (at least two courses plus the fund: $2,700). The page does not identify an academic year. These course-based advance payments are not confirmed acceptance or visa deposits, or full programme costs; the page states that 5% VAT is included. Confirm the intake and payable amount with BAU.":
      "Ukurasa rasmi wa ada za wanafunzi wa kimataifa wa BAU unaonyesha ada ya usajili wa kozi ya uzamili ni $600 kwa kozi (angalau kozi tatu pamoja na mfuko wa kijamii wa mwaka wa $300 hulipwa mapema: $2,100), na ada ya usajili wa kozi ya uzamivu ni $1,200 kwa kozi (angalau kozi mbili pamoja na mfuko: $2,700). Ukurasa hautaji mwaka wa masomo. Malipo haya ya mapema yanayokokotolewa kwa kozi si amana iliyothibitishwa ya kukubaliwa au visa, wala gharama kamili ya programu; ukurasa unasema VAT ya 5% imejumuishwa. Thibitisha muhula wa kujiunga na kiasi cha kulipa na BAU.",
    "Browse the published programme catalogue. Current named listings are German nursing Master's programmes; other programmes appear after their details are verified. Confirm current availability, fees, and admission requirements directly with the institution.":
      "Angalia katalogi ya programu zilizochapishwa. Programu zenye majina zilizoorodheshwa sasa ni programu za uzamili za uuguzi nchini Ujerumani; programu nyingine huongezwa baada ya maelezo yake kuthibitishwa. Thibitisha upatikanaji wa sasa, ada na masharti ya udahili moja kwa moja na taasisi.",
    "Browse published programmes with university source links. The current named listings are German nursing Master's programmes; confirm programme availability, fees, and admission requirements with each institution.":
      "Angalia programu zilizochapishwa pamoja na viungo vya vyanzo vya vyuo vikuu. Programu zenye majina zilizoorodheshwa sasa ni programu za uzamili za uuguzi nchini Ujerumani; thibitisha upatikanaji, ada na masharti ya udahili na kila taasisi.",
    "No confirmed scholarship details are published for this university.":
      "Hakuna maelezo yaliyothibitishwa ya ufadhili yaliyochapishwa kwa chuo hiki.",
    "University scholarship information": "Taarifa za ufadhili za chuo kikuu",
    "View Courses": "Angalia programu",
    "FranklyEdu provides application guidance and does not directly submit applications to universities.":
      "FranklyEdu hutoa mwongozo wa maombi na haitumi maombi moja kwa moja kwa vyuo vikuu.",
    "Browse published programmes for this university. Study areas are not individual programme listings; confirm current availability and admission requirements with the institution.":
      "Angalia programu zilizochapishwa kwa chuo hiki. Maeneo ya masomo si orodha ya programu mahususi; thibitisha upatikanaji na masharti ya sasa ya udahili na taasisi.",
    "No verified programme listings yet for this university":
      "Bado hakuna programu zilizothibitishwa zilizoorodheshwa kwa chuo hiki",
    "This does not mean the university has no programmes. Contact us for current information; individual programmes are added only after their details have been verified.":
      "Hii haimaanishi kuwa chuo hakina programu. Wasiliana nasi kwa taarifa za sasa; programu mahususi huongezwa tu baada ya maelezo yake kuthibitishwa.",
    "Business Administration": "Usimamizi wa Biashara",
    "International Relations": "Uhusiano wa Kimataifa",
    "Computer and Information Technologies": "Teknolojia za Kompyuta na Habari",
    Engineering: "Uhandisi",
    "Nursing and Health Sciences": "Uuguzi na Sayansi za Afya",
    Education: "Elimu",
    Pharmacy: "Famasia",
    Architecture: "Usanifu Majengo",
    "Tourism and Hospitality": "Utalii na Ukarimu",
    "Master’s and PhD programmes": "Programu za uzamili na uzamivu",
    "CIU offers a 50% international undergraduate tuition scholarship; additional academic scholarships may be available. Exact payable tuition depends on the programme and scholarship. Confirm eligibility and payable tuition with CIU through FranklyEdu before applying or making any payment.":
      "CIU inatoa ufadhili wa 50% wa ada ya masomo kwa wanafunzi wa kimataifa wa shahada ya kwanza; ufadhili wa ziada wa kitaaluma unaweza kupatikana. Ada halisi ya masomo inayopaswa kulipwa inategemea programu na ufadhili. Thibitisha ustahiki na ada ya masomo inayopaswa kulipwa na CIU kupitia FranklyEdu kabla ya kutuma maombi au kufanya malipo yoyote.",
    "Confirm the exact initial payment amount using the student's official acceptance letter or invoice. Contact FranklyEdu for guidance on confirming this amount with CIU.":
      "Thibitisha kiasi halisi cha malipo ya awali kwa kutumia barua rasmi ya kukubaliwa au ankara ya mwanafunzi. Wasiliana na FranklyEdu kwa mwongozo wa kuthibitisha kiasi hiki na CIU.",
    "Refer to the institution's official site for current programmes and admissions information.":
      "Tazama tovuti rasmi ya taasisi kwa taarifa za sasa za programu na udahili.",
    "University site": "Tovuti ya chuo",
    "Programme source": "Chanzo cha programu",
    "Admissions info": "Taarifa za udahili",
    "Ask about programme": "Uliza kuhusu programu",
    "Compare programme details before you take the next step.":
      "Linganisha maelezo ya programu kabla ya kuendelea.",
    "No programmes match these filters": "Hakuna programu zinazolingana na vichujio hivi",
    "Clear a filter to see the current listings. Some intake and admissions details still need confirmation directly with the institution.":
      "Ondoa kichujio ili kuona programu zilizoorodheshwa. Baadhi ya tarehe na taarifa za udahili zinahitaji kuthibitishwa moja kwa moja na taasisi.",
    "Start / intake": "Mwanzo / kipindi cha masomo",
    "Application window": "Kipindi cha kutuma maombi",
    "Entry requirements": "Masharti ya kujiunga",
    "Information to confirm": "Taarifa za kuthibitisha",
    "Frankedu document-sharing deadline": "Tarehe ya mwisho ya kutuma nyaraka kwa Frankedu",
    "Before you apply": "Kabla ya kutuma maombi",
    "Programme details and admission decisions belong to each university and may change. This website does not submit an application. Visa decisions are made by the relevant authorities; admission, visas, professional recognition, employment, and job outcomes are not guaranteed. Confirm current requirements and fees with the university before applying.":
      "Maelezo ya programu na maamuzi ya udahili huamuliwa na kila chuo kikuu na yanaweza kubadilika. Tovuti hii haiwasilishi maombi. Maamuzi ya visa hufanywa na mamlaka husika; udahili, visa, utambuzi wa taaluma, ajira na matokeo ya kazi hayajahakikishwa. Thibitisha masharti na ada za sasa na chuo kabla ya kutuma maombi.",
    "Spring 2027 availability not confirmed":
      "Upatikanaji wa muhula wa Machi 2027 haujathibitishwa",
    "Not confirmed in current official sources": "Haijathibitishwa katika vyanzo rasmi vya sasa",
    "Current duration not confirmed": "Muda wa sasa wa programu haujathibitishwa",
    "Current fees not confirmed": "Ada za sasa hazijathibitishwa",
    "Programme-specific language requirements need confirmation":
      "Masharti ya lugha ya programu hii yanahitaji kuthibitishwa",
    "Ask Hof to confirm current programme-specific academic and language requirements.":
      "Uliza Hof ithibitishe masharti ya sasa ya kitaaluma na lugha ya programu hii.",
    "General Hof language rules: English-taught programmes require TOEFL iBT 90 or IELTS 6.5; German-taught programmes require B2. These do not confirm the requirements for this programme.":
      "Masharti ya jumla ya lugha ya Hof: programu za Kiingereza zinahitaji TOEFL iBT 90 au IELTS 6.5; programu za Kijerumani zinahitaji B2. Haya hayathibitishi masharti ya programu hii.",
    "The available official programme flyer is dated 2025, and the programme-specific page is currently unavailable. Confirm that the programme and Spring 2027 intake are open directly with Hof.":
      "Kijitabu rasmi cha programu kinachopatikana ni cha mwaka 2025, na ukurasa maalum wa programu haupatikani kwa sasa. Thibitisha moja kwa moja na Hof kuwa programu na kipindi cha Machi 2027 vimefunguliwa.",
    "Frankedu document-sharing deadline: 15 November 2026. This is a preparation target set by Frankedu, not a confirmed Hof application deadline.":
      "Tarehe ya mwisho ya kutuma nyaraka kwa Frankedu: 15 Novemba 2026. Hii ni tarehe ya maandalizi iliyowekwa na Frankedu, si tarehe ya mwisho ya maombi iliyothibitishwa na Hof.",
    "3 theoretical study semesters; full-time": "Muhula 3 wa masomo ya nadharia; muda wote",
    "A student-services contribution is payable at OTH; see the current fee schedule for the amount.":
      "Mchango wa huduma za wanafunzi hulipwa kwa OTH; tazama jedwali la ada za sasa kwa kiasi.",
    "Summer semester 2027; exact start date not specified by OTH":
      "Muhula wa kiangazi 2027; OTH haijataja tarehe kamili ya kuanza",
    "15 November–15 January for summer semesters; confirm the year-specific dates in the OTH portal.":
      "Tarehe 15 Novemba–15 Januari kwa mihula ya kiangazi; thibitisha tarehe za mwaka husika kwenye tovuti ya OTH.",
    "German; DSH 3 or equivalent is required by the start of study.":
      "Kijerumani; DSH 3 au kiwango kinacholingana kinahitajika kabla ya masomo kuanza.",
    "A higher-education degree with 210 ECTS; at least 180 ECTS must be in nursing or a related field, including at least 30 ECTS in nursing-science modules.":
      "Shahada ya elimu ya juu yenye ECTS 210; angalau ECTS 180 ziwe za uuguzi au fani inayohusiana, ikijumuisha angalau ECTS 30 za masomo ya sayansi ya uuguzi.",
    "A permit to use a professional title under §1(1), sentence 1 PflBG is required.":
      "Kibali cha kutumia cheo cha kitaaluma chini ya §1(1), sentensi ya 1 ya PflBG kinahitajika.",
    "The university states that the programme is offered subject to a sufficient number of qualified applications. Confirm current availability and requirements directly with OTH.":
      "Chuo kinasema programu itatolewa ikiwa kutakuwa na idadi ya kutosha ya maombi yanayokidhi vigezo. Thibitisha upatikanaji na masharti ya sasa moja kwa moja na OTH.",
    "5 semesters; part-time": "Mihula 5; muda wa sehemu",
    "Current fees and semester contributions need confirmation with EHS.":
      "Ada na michango ya muhula ya sasa inahitaji kuthibitishwa na EHS.",
    "Summer semester; the university lists 1 March as the start date.":
      "Muhula wa kiangazi; chuo kimetaja tarehe 1 Machi kuwa tarehe ya kuanza.",
    "5 January annually; confirm the 2027 deadline with EHS.":
      "Tarehe 5 Januari kila mwaka; thibitisha tarehe ya mwisho ya 2027 na EHS.",
    "German; C1 is required for applicants with foreign qualifications.":
      "Kijerumani; kiwango cha C1 kinahitajika kwa waombaji wenye sifa za kigeni.",
    "First degree in nursing or a related field; alternatively, another degree plus completed nursing vocational training.":
      "Shahada ya kwanza ya uuguzi au fani inayohusiana; au shahada nyingine pamoja na mafunzo kamili ya kitaaluma ya uuguzi.",
    "Relevant professional work alongside study: at least 12 hours weekly; 20 hours recommended.":
      "Kazi husika sambamba na masomo: angalau saa 12 kwa wiki; saa 20 zinapendekezwa.",
    "Application includes a motivation letter of about three pages.":
      "Maombi yanajumuisha barua ya motisha ya takriban kurasa tatu.",
    "Confirm the 2027 intake, application requirements and current fees directly with EHS before making plans.":
      "Kabla ya kupanga, thibitisha moja kwa moja na EHS kipindi cha 2027, masharti ya maombi na ada za sasa.",
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
    "Continue opens WhatsApp with these details for you to review and send. Documents are not uploaded or sent in this step. FranklyEdu provides application guidance and does not directly submit applications to universities.":
      "Ukiendelea, WhatsApp itafunguka na taarifa hizi ili uzikague na kuzituma. Nyaraka hazipakwi wala kutumwa katika hatua hii. FranklyEdu hutoa mwongozo wa maombi na haitumi maombi moja kwa moja kwa vyuo vikuu.",
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
  const universityEnquiry = value.match(
    /^Hello Frankedu Global, I'd like to ask about current admissions information at (.+)\.$/,
  );
  if (propertyPhoto) {
    const photoLabel = locale === "tr" ? "Fotoğraf" : locale === "fr" ? "Photo" : "Picha";
    return `${photoLabel} ${propertyPhoto[1]}`;
  }
  if (locale === "tr") {
    if (universityEnquiry)
      return `Merhaba Frankedu Global, ${universityEnquiry[1]} kurumunun güncel kabul bilgileri hakkında bilgi almak istiyorum.`;
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
    if (universityEnquiry)
      return `Bonjour Frankedu Global, je souhaite me renseigner sur les admissions actuelles à ${universityEnquiry[1]}.`;
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
    if (universityEnquiry)
      return `Habari Frankedu Global, ningependa kuuliza kuhusu udahili wa sasa katika ${universityEnquiry[1]}.`;
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
