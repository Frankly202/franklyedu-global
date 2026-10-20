import sarconCover from "@/assets/sarcon/sarcon-01-cover.webp";
import sarconCoverPreview from "@/assets/sarcon/sarcon-01-cover-preview.webp";
import sarconCoverThumbnail from "@/assets/sarcon/sarcon-01-cover-thumb.webp";
import sarconSurroundings from "@/assets/sarcon/sarcon-02-surroundings.webp";
import sarconSurroundingsPreview from "@/assets/sarcon/sarcon-02-surroundings-preview.webp";
import sarconSurroundingsThumbnail from "@/assets/sarcon/sarcon-02-surroundings-thumb.webp";
import sarconLivingRoom from "@/assets/sarcon/sarcon-03-living-room.webp";
import sarconLivingRoomPreview from "@/assets/sarcon/sarcon-03-living-room-preview.webp";
import sarconLivingRoomThumbnail from "@/assets/sarcon/sarcon-03-living-room-thumb.webp";
import sarconStaircase from "@/assets/sarcon/sarcon-04-staircase.webp";
import sarconStaircasePreview from "@/assets/sarcon/sarcon-04-staircase-preview.webp";
import sarconStaircaseThumbnail from "@/assets/sarcon/sarcon-04-staircase-thumb.webp";
import sarconKitchen from "@/assets/sarcon/sarcon-05-kitchen.webp";
import sarconKitchenPreview from "@/assets/sarcon/sarcon-05-kitchen-preview.webp";
import sarconKitchenThumbnail from "@/assets/sarcon/sarcon-05-kitchen-thumb.webp";

/**
 * Central content and data configuration for Frankedu Global.
 * Contains university information, service offerings, and supported destinations.
 */

export interface Destination {
  slug: string;
  name: string;
  region: string;
}

export const destinations: Destination[] = [
  {
    slug: "cyprus",
    name: "Cyprus / North Cyprus",
    region: "Europe / Mediterranean",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "Europe",
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
  },
  {
    slug: "poland",
    name: "Poland",
    region: "Europe",
  },
  {
    slug: "finland",
    name: "Finland",
    region: "Europe / Nordic",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    region: "Europe",
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Oceania",
  },
  {
    slug: "china",
    name: "China",
    region: "Asia",
  },
  {
    slug: "united-states",
    name: "United States",
    region: "North America",
  },
];

export const subjects = [
  "Business & Management",
  "Engineering & Technology",
  "Computer Science & IT",
  "Health Sciences & Nursing",
  "Law & International Relations",
  "Hospitality & Tourism",
  "Architecture & Fine Arts",
  "Social Sciences & Humanities",
];

export interface University {
  slug: string;
  name: string;
  src?: string;
  logoMark?: string;
  logoSurface?: "dark";
  summary: string;
  country: string;
  countrySlug: string;
  city: string;
  intake?: string;
  officialUrl?: string;
  showOnHome?: boolean;
  studyAreas?: string[];
  studyAreasUrl?: string;
  catalogueExamples?: {
    notice: string;
    englishGuidance?: string;
    levelCoverage?: string;
    sources?: { label: string; url: string }[];
    levels: {
      level?: Course["level"];
      documents?: string;
      groups: { subject: string; programmes: string[] }[];
    }[];
  };
  scholarship?: { summary: string; sourceUrl?: string };
  feeInfo?: {
    summary: string;
    sourceUrl?: string;
    costEstimate?: {
      caption: string;
      note: string;
      rows: { expense: string; undergraduate: string; graduate: string }[];
    };
    selectedSchedule?: {
      caption: string;
      rows: {
        programme: string;
        beforeScholarship: string;
        scholarshipFigure: string;
        total: string;
      }[];
    };
    schedule?: {
      caption: string;
      amountLabel?: string;
      rows: { programme: string; annualTuition: string }[];
    };
  };
}

export const universities: University[] = [
  {
    slug: "final-international-university",
    name: "Final International University (FIU)",
    src: "/Uni-Logos/FIU-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Kyrenia (Girne)",
    officialUrl: "https://www.final.edu.tr/",
  },
  {
    slug: "cyprus-international-university",
    name: "Cyprus International University",
    src: "/Uni-Logos/CIU-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "Northern Cyprus",
    countrySlug: "cyprus",
    city: "North Nicosia",
    officialUrl: "https://ciu.edu.tr/en",
    studyAreas: [
      "Business Administration",
      "International Relations",
      "Computer and Information Technologies",
      "Engineering",
      "Nursing and Health Sciences",
      "Education",
      "Pharmacy",
      "Architecture",
      "Tourism and Hospitality",
      "Master’s and PhD programmes",
    ],
    studyAreasUrl: "https://ciu.edu.tr/en/study",
    scholarship: {
      summary:
        "CIU offers a 50% international undergraduate tuition scholarship; additional academic scholarships may be available. Exact payable tuition depends on the programme and scholarship. Confirm eligibility and payable tuition with CIU through FranklyEdu before applying or making any payment.",
      sourceUrl: "https://ciu.edu.tr/en/become-student/international/fees-and-scholarships",
    },
    feeInfo: {
      summary:
        "Tuition varies by programme, scholarship and academic year; use CIU’s tuition calculator on its official website. Confirm the exact initial payment from the student’s official offer letter. Contact FranklyEdu for guidance on confirming these details with CIU.",
    },
    catalogueExamples: {
      notice:
        "CIU catalogue examples supplied by Frank, not confirmed current programme-level records. Availability, duration, intake, teaching language, programme-specific requirements and fees require confirmation with CIU. These examples are not selectable confirmed courses in the application form.",
      englishGuidance:
        "Supplied notes cite IELTS 5.5 or TOEFL iBT 65; some applicants may take an on-campus proficiency exam. These are not confirmed programme-specific thresholds. Reconfirm accepted English evidence and any exam option with CIU.",
      levels: [
        {
          level: "Bachelor's",
          documents:
            "Bachelor’s document guidance: application form, secondary certificate (WAEC/NECO/equivalent), passport or accepted ID, English evidence where required, and other requested documents. Confirm the exact list with CIU.",
          groups: [
            {
              subject: "Business & Management",
              programmes: [
                "Business Administration",
                "International Business",
                "Accounting and Finance",
                "Marketing",
                "Human Resource Management",
                "Economics",
              ],
            },
            {
              subject: "Engineering & Technology",
              programmes: [
                "Computer Engineering",
                "Software Engineering",
                "Civil Engineering",
                "Electrical and Electronic Engineering",
                "Mechanical Engineering",
              ],
            },
            { subject: "Computer Science & IT", programmes: ["Information Technology"] },
            {
              subject: "Health Sciences & Nursing",
              programmes: [
                "Nursing",
                "Pharmacy",
                "Physiotherapy and Rehabilitation",
                "Nutrition and Dietetics",
              ],
            },
            {
              subject: "Social Sciences & Humanities",
              programmes: ["Psychology", "English Language Teaching"],
            },
            {
              subject: "Law & International Relations",
              programmes: ["International Relations", "Law"],
            },
            {
              subject: "Architecture & Fine Arts",
              programmes: ["Architecture", "Interior Architecture", "Graphic Design"],
            },
            { subject: "Hospitality & Tourism", programmes: ["Tourism and Hotel Management"] },
          ],
        },
        {
          level: "Master's",
          documents:
            "Master’s document guidance: bachelor’s certificate, transcripts, passport or accepted ID, CV, and English evidence where required. Confirm the exact list with CIU.",
          groups: [
            { subject: "Business & Management", programmes: ["MBA", "Finance"] },
            { subject: "Law & International Relations", programmes: ["International Relations"] },
            {
              subject: "Engineering & Technology",
              programmes: ["Computer Engineering", "Engineering"],
            },
            { subject: "Computer Science & IT", programmes: ["Information Technology"] },
            { subject: "Social Sciences & Humanities", programmes: ["Education", "Psychology"] },
          ],
        },
        {
          level: "PhD",
          documents:
            "PhD document guidance: bachelor’s and master’s qualifications, transcripts, CV, research proposal, and English evidence where required. Confirm the exact list with CIU.",
          groups: [
            { subject: "Business & Management", programmes: ["Business Administration"] },
            { subject: "Engineering & Technology", programmes: ["Engineering"] },
            { subject: "Computer Science & IT", programmes: ["Information Technology"] },
            {
              subject: "Social Sciences & Humanities",
              programmes: ["Education", "English Language Teaching"],
            },
            { subject: "Law & International Relations", programmes: ["International Relations"] },
          ],
        },
      ],
    },
  },
  {
    slug: "university-of-kyrenia",
    name: "University of Kyrenia (Girne Üniversitesi)",
    src: "/Uni-Logos/girne-uni-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Kyrenia (Girne)",
    officialUrl: "https://kyrenia.edu.tr/?lang=en",
    studyAreas: ["Aviation", "Business", "Engineering", "Health Sciences", "Postgraduate studies"],
    scholarship: {
      summary:
        "The supplied 2026/2027 regular Master’s tuition for international students is quoted with a 25% scholarship. The university’s stated conditions apply; confirm applicability with the University of Kyrenia through FranklyEdu.",
    },
    feeInfo: {
      summary:
        "For 2026/2027, the published regular Master’s tuition for international students with a 25% scholarship is €1,272 per semester. The published regular Master’s programme fee covers four academic semesters, subject to the university’s stated conditions. No total programme fee is stated here. Undergraduate tuition and initial payments must be confirmed for the selected programme with the University of Kyrenia through FranklyEdu.",
    },
  },
  {
    slug: "near-east-university",
    name: "Near East University",
    src: "/Uni-Logos/Near_East_University-logo.svg",
    summary: "Ask us for current admissions information for this institution.",
    country: "Northern Cyprus",
    countrySlug: "cyprus",
    city: "Nicosia",
    officialUrl: "https://neu.edu.tr/?lang=en",
    scholarship: {
      summary:
        "The supplied NEU 2026/2027 information states that the standard undergraduate scholarship is up to 50% for international students in most departments, excluding Medicine and Dentistry. Ask FranklyEdu to confirm eligibility and payable fees with the university.",
    },
    feeInfo: {
      summary:
        "Selected programmes from the supplied NEU 2026/2027 schedule are shown on View Courses, separating annual tuition before scholarship, the listed scholarship figure and total including VAT/administrative fee. Unlisted scholarship figures are not zero; Pharmacy has a special scholarship listed without a tuition figure. Programme availability and language of instruction vary and require confirmation. The initial deposit and payment schedule remain unconfirmed; contact FranklyEdu to confirm payable fees with NEU.",
      selectedSchedule: {
        caption: "NEU 2026/2027 — selected programme annual fee examples (EUR)",
        rows: [
          {
            programme: "Business Administration",
            beforeScholarship: "€5,600",
            scholarshipFigure: "€2,800",
            total: "€3,225",
          },
          {
            programme: "International Business",
            beforeScholarship: "€5,600",
            scholarshipFigure: "€2,800",
            total: "€3,225",
          },
          {
            programme: "Computer Engineering",
            beforeScholarship: "€5,600",
            scholarshipFigure: "€2,800",
            total: "€3,225",
          },
          {
            programme: "Software Engineering",
            beforeScholarship: "€5,600",
            scholarshipFigure: "€2,800",
            total: "€3,225",
          },
          {
            programme: "Nursing",
            beforeScholarship: "€5,600",
            scholarshipFigure: "€2,800",
            total: "€3,225",
          },
          {
            programme: "Architecture",
            beforeScholarship: "€5,600",
            scholarshipFigure: "€2,800",
            total: "€3,225",
          },
          {
            programme: "Medicine",
            beforeScholarship: "€12,600",
            scholarshipFigure: "No scholarship figure listed",
            total: "€13,515",
          },
          {
            programme: "Dentistry (English)",
            beforeScholarship: "€11,600",
            scholarshipFigure: "No scholarship figure listed",
            total: "€12,465",
          },
          {
            programme: "Pharmacy",
            beforeScholarship: "€8,600",
            scholarshipFigure: "Special scholarship listed; figure not supplied",
            total: "€4,800",
          },
        ],
      },
    },
    catalogueExamples: {
      notice:
        "NEU catalogue examples supplied by Frank, not confirmed current programme-level records. Programme availability and language of instruction vary and must be confirmed with NEU. Duration, intake, programme-specific requirements and current fees require confirmation. Named examples have no confirmed level assignment and are shown only when no study-level filter is selected.",
      levelCoverage:
        "Supplied level coverage: Associate degree, Bachelor’s, Master’s and PhD. No named Associate degree, Master’s or PhD offerings are confirmed here; no named example is assigned to a level.",
      levels: [
        {
          groups: [
            {
              subject: "Business & Management",
              programmes: [
                "Business Administration",
                "International Business",
                "Economics",
                "Banking and Finance",
                "Human Resource Management",
                "Marketing",
              ],
            },
            {
              subject: "Law & International Relations",
              programmes: ["International Relations", "Law"],
            },
            {
              subject: "Computer Science & IT",
              programmes: [
                "Computer Engineering",
                "Software Engineering",
                "Artificial Intelligence Engineering",
                "Cyber Security Engineering",
                "Information Systems Engineering",
                "Management Information Systems",
                "Data Analysis Engineering",
              ],
            },
            {
              subject: "Engineering & Technology",
              programmes: [
                "Civil Engineering",
                "Electrical and Electronic Engineering",
                "Mechanical Engineering",
                "Biomedical Engineering",
                "Industrial Engineering",
              ],
            },
            {
              subject: "Health Sciences & Nursing",
              programmes: [
                "Medicine",
                "Dentistry",
                "Pharmacy",
                "Nursing",
                "Physiotherapy and Rehabilitation",
                "Nutrition and Dietetics",
                "Veterinary Medicine",
              ],
            },
            {
              subject: "Architecture & Fine Arts",
              programmes: ["Architecture", "Interior Architecture"],
            },
            { subject: "Hospitality & Tourism", programmes: ["Tourism and Hotel Management"] },
            { subject: "Social Sciences & Humanities", programmes: ["English Language Teaching"] },
          ],
        },
      ],
    },
  },
  {
    slug: "eastern-mediterranean-university",
    name: "Eastern Mediterranean University",
    src: "/Uni-Logos/emu-logo-horizontalwhite-en.svg",
    logoSurface: "dark",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Famagusta",
    officialUrl: "https://www.emu.edu.tr/en",
    studyAreas: [
      "Arts & Sciences",
      "Business and Economics",
      "Communication",
      "Computer and Information Sciences",
      "Tourism",
      "Engineering",
      "Architecture",
      "Education",
      "Law",
      "Health Sciences",
    ],
    scholarship: {
      summary:
        "Frank's supplied 2026/2027 fees are for eligible new international students with a 75% scholarship, not a guaranteed award for every applicant. The linked general EMU schedule lists other scholarship tiers and a country-specific 75% tier for Turkmenistan. Confirm eligibility for the supplied 75% fees and your payable amount with EMU through FranklyEdu.",
      sourceUrl:
        "https://www.emu.edu.tr/media/assets/files/tuition-fees/2026-2027-newly-registered-international-tuition-fees.pdf?ver=1",
    },
    feeInfo: {
      summary:
        "These Frank-supplied published 2026/2027 annual advance-payment fees in USD apply to eligible new international students with a 75% scholarship. They are not instalment prices or registration deposit amounts. Confirm the applicable faculty or category, scholarship eligibility and payable amount with EMU. The current registration deposit and instalment arrangements must be confirmed with EMU.",
      sourceUrl:
        "https://www.emu.edu.tr/media/assets/files/tuition-fees/2026-2027-newly-registered-international-tuition-fees.pdf?ver=1",
      schedule: {
        caption:
          "EMU 2026/2027 — supplied annual advance-payment fees with a 75% scholarship (USD)",
        amountLabel: "Annual advance-payment fee (75% scholarship)",
        rows: [
          { programme: "Business and Economics", annualTuition: "$4,450" },
          { programme: "Arts and Sciences", annualTuition: "$4,450" },
          { programme: "Communication", annualTuition: "$4,450" },
          { programme: "Computer and Information Sciences", annualTuition: "$4,450" },
          { programme: "Architecture", annualTuition: "$4,450" },
          { programme: "Engineering", annualTuition: "$4,700" },
          { programme: "Pharmacy", annualTuition: "$5,485" },
          { programme: "Dentistry", annualTuition: "$10,000" },
          { programme: "Medicine", annualTuition: "$14,510" },
          { programme: "Associate degree programmes", annualTuition: "$3,409" },
        ],
      },
    },
  },
  {
    slug: "girne-american-university",
    name: "Girne American University",
    src: "/Uni-Logos/girne-american-university-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Kyrenia",
    officialUrl: "https://www.gau.edu.tr/en/",
    feeInfo: {
      summary:
        "This Frank-supplied published fee schedule is for 2025/2026 only. These figures are not confirmed 2026/2027 rates. Separately from tuition, the supplied schedule lists an additional registration and activity fee of €500 yearly for the listed degree programmes. This charge is not included in the tuition figures; its applicability has not been independently verified for every category. Ask FranklyEdu to confirm current tuition and applicable charges with GAU.",
      schedule: {
        caption: "GAU 2025/2026 — published annual tuition schedule (EUR)",
        amountLabel: "Annual tuition (2025/2026)",
        rows: [
          { programme: "Business", annualTuition: "€7,700" },
          { programme: "Architecture and several other faculties", annualTuition: "€8,000" },
          { programme: "Pharmacy", annualTuition: "€11,000" },
          { programme: "Medicine", annualTuition: "€13,000" },
          { programme: "Civil Aviation Management", annualTuition: "€6,500" },
          { programme: "Pilotage", annualTuition: "€10,000" },
          { programme: "Associate degree programmes", annualTuition: "€6,500" },
          { programme: "Master’s programmes", annualTuition: "€8,000" },
          { programme: "PhD programmes", annualTuition: "€12,500" },
        ],
      },
    },
  },
  {
    slug: "european-university-of-lefke",
    name: "European University of Lefke",
    src: "/Uni-Logos/european-university-of-lefke-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Lefke",
    officialUrl: "https://www.eul.edu.tr/en/",
  },
  {
    slug: "cyprus-health-and-social-sciences-university",
    name: "Cyprus Health and Social Sciences University (KSTU)",
    src: "/Uni-Logos/kstu-logo.webp",
    logoSurface: "dark",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Güzelyurt",
    officialUrl: "https://www.kstu.edu.tr/",
  },
  {
    slug: "bahcesehir-cyprus-university",
    name: "Bahçeşehir Cyprus University",
    src: "/Uni-Logos/bau-cyprus-logo.webp",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Nicosia",
    officialUrl: "https://baucyprus.edu.tr/",
    feeInfo: {
      summary:
        "BAU's official international fee page lists a Master's course-registration fee of $600 per course (at least three courses plus a $300 annual social fund paid in advance: $2,100) and a PhD course-registration fee of $1,200 per course (at least two courses plus the fund: $2,700). The page does not identify an academic year. These course-based advance payments are not confirmed acceptance or visa deposits, or full programme costs; the page states that 5% VAT is included. Confirm the intake and payable amount with BAU.",
      sourceUrl: "https://www.baucyprus.edu.tr/tuition-fees",
    },
  },
  {
    slug: "florida-international-university",
    name: "Florida International University (FIU)",
    src: "/Uni-Logos/florida-international-university-logo.png",
    logoSurface: "dark",
    summary: "Ask us for current admissions information for this institution.",
    country: "United States",
    countrySlug: "united-states",
    city: "Miami, Florida",
    officialUrl: "https://www.fiu.edu/",
    studyAreas: [
      "Business",
      "Computing and Engineering",
      "Health and Life Sciences",
      "Social Sciences and Humanities",
    ],
    studyAreasUrl: "https://www.fiu.edu/academics/degrees-and-programs/",
    feeInfo: {
      summary:
        "FIU’s supplied 2026/2027 non-Florida-resident on-campus cost estimates are shown on View Courses. These are estimates, not guaranteed final costs. F-1/J-1 students generally pay applicable non-Florida-resident rates; additional charges may apply. Confirm deposits, deadlines and financial-documentation requirements directly with FIU; no fixed initial payment is stated.",
      costEstimate: {
        caption: "FIU 2026/2027 — supplied non-Florida-resident on-campus estimates (USD)",
        note: "Expense rows are per semester; estimated annual totals cover fall and spring. The official annual budgets include other allowances, including loan-origination allowances omitted from these supplied rows; not every budget allowance is a charge payable by every student. FIU publishes multiple budgets; confirm the applicable pathway, programme and budget with FIU. These estimates are not scholarship prices or guaranteed invoices.",
        rows: [
          { expense: "Tuition — per semester", undergraduate: "$11,376", graduate: "$10,317" },
          { expense: "Fees — per semester", undergraduate: "$104", graduate: "$199" },
          { expense: "Books and supplies — per semester", undergraduate: "$675", graduate: "$500" },
          { expense: "Housing — per semester", undergraduate: "$5,025", graduate: "$5,025" },
          { expense: "Food — per semester", undergraduate: "$2,595", graduate: "$2,595" },
          { expense: "Transportation — per semester", undergraduate: "$1,515", graduate: "$1,515" },
          {
            expense: "Personal expenses — per semester",
            undergraduate: "$1,784",
            graduate: "$1,784",
          },
          {
            expense: "Estimated annual total — fall and spring",
            undergraduate: "$46,198",
            graduate: "$44,006",
          },
        ],
      },
    },
    catalogueExamples: {
      notice:
        "FIU catalogue examples supplied by Frank, not confirmed current degree records. Confirm exact degree titles, availability, teaching language, duration, intake and requirements against FIU’s official degree catalogue. Undergraduate examples are grouped at Bachelor’s level; graduate examples have no confirmed Master’s or doctoral assignment.",
      levelCoverage:
        "Supplied levels: Bachelor’s, Master’s and doctoral. Graduate examples appear only without a study-level filter; they are not duplicated as confirmed Master’s or PhD programmes.",
      sources: [
        {
          label: "Official degree catalogue",
          url: "https://www.fiu.edu/academics/degrees-and-programs/",
        },
        {
          label: "Official cost estimates",
          url: "https://onestop.fiu.edu/finances/estimate-your-costs/",
        },
        {
          label: "Official international document guidance",
          url: "https://admissions.fiu.edu/international/submit-documents/",
        },
        {
          label: "Official graduate admissions guidance",
          url: "https://admissions.fiu.edu/international/graduate-school/",
        },
      ],
      levels: [
        {
          level: "Bachelor's",
          documents:
            "Bachelor’s document guidance: official secondary-school records and English translations where needed; transfer applicants may need post-secondary transcripts and course-by-course evaluations. Confirm the application, test evidence and immigration documents for your admission pathway with FIU. Requirements vary by pathway and programme.",
          groups: [
            {
              subject: "Business & Management",
              programmes: [
                "Accounting",
                "Finance",
                "Business Administration",
                "International Business",
                "Marketing",
              ],
            },
            { subject: "Computer Science & IT", programmes: ["Computer Science", "IT"] },
            { subject: "Engineering & Technology", programmes: ["Engineering"] },
            {
              subject: "Health Sciences & Nursing",
              programmes: ["Nursing", "Biological Sciences", "Public Health"],
            },
            {
              subject: "Social Sciences & Humanities",
              programmes: ["Psychology", "Communication"],
            },
            { subject: "Law & International Relations", programmes: ["International Relations"] },
          ],
        },
        {
          documents:
            "Master’s and PhD document guidance: official post-secondary transcripts and degree records, with translations and evaluations where required. Departments may request a statement of purpose, recommendation letters, CV and research/writing samples, or a separate application, interview or audition. Confirm English evidence and immigration/financial documents with FIU. Requirements vary by admission pathway and programme; this is not a universal checklist or eligibility guarantee.",
          groups: [
            {
              subject: "Business & Management",
              programmes: ["Business Administration", "Finance", "Accounting"],
            },
            { subject: "Computer Science & IT", programmes: ["Computer Science"] },
            { subject: "Engineering & Technology", programmes: ["Engineering"] },
            { subject: "Health Sciences & Nursing", programmes: ["Public Health"] },
            { subject: "Law & International Relations", programmes: ["International Relations"] },
            { subject: "Social Sciences & Humanities", programmes: ["Psychology", "Education"] },
          ],
        },
      ],
    },
  },
  {
    slug: "university-of-memphis",
    name: "University of Memphis",
    src: "/Uni-Logos/memphis-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "United States",
    countrySlug: "united-states",
    city: "Memphis, Tennessee",
    officialUrl: "https://www.memphis.edu/",
  },
  {
    slug: "pace-university",
    name: "Pace University",
    src: "/Uni-Logos/pace-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "United States",
    countrySlug: "united-states",
    city: "New York City and Westchester County",
    officialUrl: "https://www.pace.edu/",
  },
  {
    slug: "university-of-sunderland",
    name: "University of Sunderland",
    src: "/Uni-Logos/university-sunderland-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    city: "Sunderland, England",
    officialUrl: "https://www.sunderland.ac.uk/",
  },
  {
    slug: "hof-university-of-applied-sciences",
    name: "Hof University of Applied Sciences",
    src: "/Uni-Logos/hof-logo.gif",
    summary:
      "Refer to the institution's official site for current programmes and admissions information.",
    country: "Germany",
    countrySlug: "germany",
    city: "Hof",
    studyAreas: ["Nursing and Health Sciences"],
    studyAreasUrl:
      "https://www.hof-university.com/fileadmin/user_upload/ask/Flyer_internat_Stdg/Flyer_CCN_web_01-2025.pdf",
    showOnHome: false,
    officialUrl:
      "https://www.hof-university.com/studying-at-hof-university/application-and-admission.html",
  },
  {
    slug: "oth-regensburg",
    name: "OTH Regensburg",
    src: "/Uni-Logos/oth-regensburg-logo.svg",
    summary:
      "Refer to the institution's official site for current programmes and admissions information.",
    country: "Germany",
    countrySlug: "germany",
    city: "Regensburg",
    studyAreas: ["Nursing and Health Sciences"],
    studyAreasUrl:
      "https://www.oth-regensburg.de/studiengang/advanced-nursing-practice-studieren-master-1",
    showOnHome: false,
    officialUrl:
      "https://www.oth-regensburg.de/studiengang/advanced-nursing-practice-studieren-master-1",
  },
  {
    slug: "evangelische-hochschule-dresden",
    name: "Evangelische Hochschule Dresden",
    src: "/Uni-Logos/ehs-dresden-logo.png",
    summary:
      "Refer to the institution's official site for current programmes and admissions information.",
    country: "Germany",
    countrySlug: "germany",
    city: "Dresden",
    studyAreas: ["Nursing and Health Sciences"],
    studyAreasUrl:
      "https://ehs-dresden.de/studium/studiengaenge/pflege-und-gesundheit/pflege-schwerpunkt-community-health-nursing-chnadvanced-nursing-practice-anp-master-berufsbegleitend/eckdaten-des-studiengangs/",
    showOnHome: false,
    officialUrl:
      "https://ehs-dresden.de/studium/studiengaenge/pflege-und-gesundheit/pflege-schwerpunkt-community-health-nursing-chnadvanced-nursing-practice-anp-master-berufsbegleitend/eckdaten-des-studiengangs/",
  },
];

export interface Course {
  slug: string;
  title: string;
  university: string;
  universitySlug: string;
  country: string;
  level: "Bachelor's" | "Master's" | "PhD" | "Foundation";
  subject: string;
  duration: string;
  tuition: string;
  intake: string;
  language: string;
  applicationWindow: string;
  requirements: string[];
  notice: string;
  officialUrl: string;
  admissionsUrl?: string;
  frankeduDeadline?: string;
}

export const courses: Course[] = [
  {
    slug: "cross-cultural-nursing-practice-hof",
    title: "Cross-Cultural Nursing Practice (M.Sc.)",
    university: "Hof University of Applied Sciences",
    universitySlug: "hof-university-of-applied-sciences",
    country: "Germany",
    level: "Master's",
    subject: "Health Sciences & Nursing",
    duration: "Current duration not confirmed",
    tuition: "Current fees not confirmed",
    intake: "Spring 2027 availability not confirmed",
    applicationWindow: "Not confirmed in current official sources",
    language: "Programme-specific language requirements need confirmation",
    requirements: [
      "Current programme-specific entry requirements need confirmation from Hof.",
      "Hof's general admissions page lists TOEFL iBT 90 or IELTS 6.5 for English-taught programmes and German B2 for German-taught programmes; it does not confirm this programme's specific thresholds.",
    ],
    notice:
      "The available official programme flyer is dated 2025, and the programme-specific page is currently unavailable. Confirm that the programme and Spring 2027 intake are open directly with Hof.",
    officialUrl:
      "https://www.hof-university.com/fileadmin/user_upload/ask/Flyer_internat_Stdg/Flyer_CCN_web_01-2025.pdf",
    admissionsUrl:
      "https://www.hof-university.com/studying-at-hof-university/application-and-admission.html",
    frankeduDeadline:
      "Frankedu document-sharing deadline: 15 November 2026. This is a preparation target set by Frankedu, not a confirmed Hof application deadline.",
  },
  {
    slug: "advanced-nursing-practice-oth-regensburg",
    title: "Advanced Nursing Practice (M.Sc.)",
    university: "OTH Regensburg",
    universitySlug: "oth-regensburg",
    country: "Germany",
    level: "Master's",
    subject: "Health Sciences & Nursing",
    duration: "3 theoretical study semesters; full-time",
    tuition:
      "A student-services contribution is payable at OTH; see the current fee schedule for the amount.",
    intake: "Summer semester 2027; exact start date not specified by OTH",
    applicationWindow:
      "15 November–15 January for summer semesters; confirm the year-specific dates in the OTH portal.",
    language: "German; DSH 3 or equivalent is required by the start of study.",
    requirements: [
      "A nursing-science or nursing-related higher-education degree with 210 ECTS; at least 180 ECTS is required, including at least 30 ECTS in nursing-science modules.",
      "Permission to use a professional title under §1(1), sentence 1 of the German Nursing Professions Act (PflBG) is required.",
    ],
    notice:
      "The university states that the programme is offered subject to a sufficient number of qualified applications. Confirm current availability and requirements directly with OTH.",
    officialUrl:
      "https://www.oth-regensburg.de/studiengang/advanced-nursing-practice-studieren-master-1",
  },
  {
    slug: "community-health-nursing-ehs-dresden",
    title:
      "Pflege – Schwerpunkt Community Health Nursing (CHN)/Advanced Nursing Practice (ANP) (M.Sc.)",
    university: "Evangelische Hochschule Dresden",
    universitySlug: "evangelische-hochschule-dresden",
    country: "Germany",
    level: "Master's",
    subject: "Health Sciences & Nursing",
    duration: "5 semesters; part-time",
    tuition: "Current fees and semester contributions need confirmation with EHS.",
    intake: "Summer semester; the university lists 1 March as the start date.",
    applicationWindow: "5 January annually; confirm the 2027 deadline with EHS.",
    language: "German; C1 is required for applicants with foreign qualifications.",
    requirements: [
      "A first higher-education degree in nursing or a related field; alternatively, another higher-education degree together with completed nursing vocational training.",
      "Relevant professional work alongside study: at least 12 hours per week; 20 hours are recommended.",
      "A motivation letter of about three pages is part of the application.",
    ],
    notice:
      "Confirm the 2027 intake, application requirements and current fees directly with EHS before making plans.",
    officialUrl:
      "https://ehs-dresden.de/studium/studiengaenge/pflege-und-gesundheit/pflege-schwerpunkt-community-health-nursing-chnadvanced-nursing-practice-anp-master-berufsbegleitend/eckdaten-des-studiengangs/",
    admissionsUrl:
      "https://ehs-dresden.de/studium/studiengaenge/pflege-und-gesundheit/pflege-schwerpunkt-community-health-nursing-chnadvanced-nursing-practice-anp-master-berufsbegleitend/studienvoraussetzungen/",
  },
];

export interface Scholarship {
  slug: string;
  name: string;
  provider: string;
  country: string;
  amount: string;
  level: string;
  deadline: string;
  summary: string;
}

export const scholarships: Scholarship[] = [];

export interface SupportService {
  slug: string;
  title: string;
  description: string;
  details: string[];
}

export const supportServices: SupportService[] = [
  {
    slug: "admissions",
    title: "Study Options & Admissions Enquiries",
    description:
      "Discuss your study plans and ask about current admissions information. Final International University (FIU) is the only confirmed recruitment relationship.",
    details: [
      "Available programmes, fees, and entry requirements need confirmation from the institution.",
      "Visa and immigration requirements should be checked with the relevant authorities.",
    ],
  },
  {
    slug: "property-investment",
    title: "Property Information",
    description: "Contact us to ask about property information and any current listing details.",
    details: [
      "Availability and pricing should be confirmed for each listing.",
      "Property details should be reviewed independently before making a decision.",
    ],
  },
  {
    slug: "career-digital",
    title: "Digital Services",
    description: "Contact us to discuss your digital service requirements.",
    details: ["Scope, availability, and pricing are discussed per enquiry."],
  },
];

export interface MarketplaceItem {
  slug: string;
  title: string;
  category: string;
  price: string;
  location: string;
  description: string;
}

export const marketplaceItems: MarketplaceItem[] = [];

export interface Listing {
  slug: string;
  title: string;
  type: string;
  price: string;
  location?: string;
  bedrooms?: number;
  features: string[];
  availableFrom?: string;
  image?: string;
  imageAlt?: string;
  detailSlug?: string;
}

export interface PropertyGalleryImage {
  src: string;
  previewSrc: string;
  thumbnailSrc: string;
  width: number;
  alt: string;
  title: string;
  category: string;
}

export interface PropertyDetail {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  reference: string;
  propertyType: string;
  location?: string;
  priceDisplay: string;
  description: string[];
  highlights: string[];
  gallery: PropertyGalleryImage[];
  contactEmail: string;
  contactPhone: string;
  whatsappMessage: string;
}

export const propertyDetails: PropertyDetail[] = [
  {
    slug: "sarcon-87-renovated-villa-north-cyprus",
    title: "Sarcon №87 Property Listing",
    seoTitle: "Sarcon №87 Property Listing | Frankedu Global",
    seoDescription:
      "View photographs associated with the Sarcon №87 property listing and contact Frankedu Global to ask about current details.",
    eyebrow: "Sarcon №87 · Enquiry",
    reference: "Sarcon №87",
    propertyType: "Property listing",
    priceDisplay: "Price details not published",
    description: [
      "This page shows photographs associated with the Sarcon №87 property listing. Contact us to ask about its current details.",
      "Property particulars, price, location, and availability need confirmation before proceeding.",
    ],
    highlights: [],
    gallery: [
      {
        src: sarconCover,
        previewSrc: sarconCoverPreview,
        thumbnailSrc: sarconCoverThumbnail,
        width: 1600,
        alt: "Photograph associated with the Sarcon №87 property listing.",
        title: "Photo 1",
        category: "Property listing",
      },
      {
        src: sarconSurroundings,
        previewSrc: sarconSurroundingsPreview,
        thumbnailSrc: sarconSurroundingsThumbnail,
        width: 1136,
        alt: "Photograph associated with the Sarcon №87 property listing.",
        title: "Photo 2",
        category: "Property listing",
      },
      {
        src: sarconLivingRoom,
        previewSrc: sarconLivingRoomPreview,
        thumbnailSrc: sarconLivingRoomThumbnail,
        width: 1920,
        alt: "Photograph associated with the Sarcon №87 property listing.",
        title: "Photo 3",
        category: "Property listing",
      },
      {
        src: sarconStaircase,
        previewSrc: sarconStaircasePreview,
        thumbnailSrc: sarconStaircaseThumbnail,
        width: 1920,
        alt: "Photograph associated with the Sarcon №87 property listing.",
        title: "Photo 4",
        category: "Property listing",
      },
      {
        src: sarconKitchen,
        previewSrc: sarconKitchenPreview,
        thumbnailSrc: sarconKitchenThumbnail,
        width: 1920,
        alt: "Photograph associated with the Sarcon №87 property listing.",
        title: "Photo 5",
        category: "Property listing",
      },
    ],
    contactEmail: "emmanuel@frankedu-global.com",
    contactPhone: "+90 548 850 4146",
    whatsappMessage:
      'Hello Frankedu Global, I\'m interested in "Sarcon №87 Property Listing". Could you share current information?',
  },
];

export function getPropertyBySlug(slug: string): PropertyDetail | undefined {
  return propertyDetails.find((p) => p.slug === slug);
}

export const accommodationListings: Listing[] = [];

export const realEstateListings: Listing[] = [
  {
    slug: "sarcon-87-renovated-villa-north-cyprus",
    title: "Sarcon №87 Property Listing",
    type: "Property listing",
    price: "Price details not published",
    features: [],
    image: sarconCover,
    imageAlt: "Photograph associated with the Sarcon №87 property listing.",
    detailSlug: "sarcon-87-renovated-villa-north-cyprus",
  },
];

export const aboutContent = {
  mission:
    "Frankedu Global shares information about study options, property, and digital services. Contact us to ask what is currently available.",
  office: "Lefkoşa, North Cyprus",
  values: [
    {
      title: "Clear information",
      text: "Admissions, fees, availability, and other details can change. Ask us to confirm current information before making a decision.",
    },
    {
      title: "No assumed details",
      text: "We distinguish confirmed information from details that still need to be checked.",
    },
    {
      title: "A clear next step",
      text: "Contact us with your question and we will discuss the information or service you are looking for.",
    },
  ],
  team: [] as { name: string; role: string }[],
};

/** Mock data for the student dashboard prototype. All data is for preview and demonstration purposes only. */
export const mockStudent = {
  name: "Sample Applicant (Prototype Preview)",
  email: "demo@example.com",
  nationality: "International Applicant",
  targetIntake: "Upcoming Intake",
  savedUniversities: ["final-international-university"],
  applications: [
    {
      id: "DEMO-001",
      programme: "Sample Programme Application (Prototype Preview)",
      university: "Final International University (FIU)",
      status: "Under review",
      progress: 50,
    },
  ],
  checklist: [
    { item: "Passport copy", done: true },
    { item: "Academic transcripts", done: true },
    { item: "English proficiency proof", done: false },
    { item: "Statement of purpose", done: false },
    { item: "Financial evidence", done: false },
  ],
};
