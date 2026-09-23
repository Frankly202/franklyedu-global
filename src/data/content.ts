/**
 * Mock/editable content for FranklyEdu Global.
 * All listings are placeholders — replace with verified data before publishing.
 */

export interface Destination {
  slug: string;
  name: string;
  region: string;
  blurb: string;
  highlights: string[];
  intakes: string;
  tuitionRange: string;
}

export const destinations: Destination[] = [
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
    blurb: "Public universities, English-taught programmes, and clear application guidance.",
    highlights: [
      "Low or no tuition at public universities",
      "Strong engineering & research",
      "18-month post-study work visa",
    ],
    intakes: "October / April",
    tuitionRange: "€0 – €20,000 / year",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "Europe",
    blurb: "Explore undergraduate and postgraduate pathways across the UK.",
    highlights: [
      "One-year master's degrees",
      "Graduate Route visa",
      "Globally ranked institutions",
    ],
    intakes: "September / January",
    tuitionRange: "£12,000 – £38,000 / year",
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    blurb: "Choose from diverse programmes and map the right intake for you.",
    highlights: [
      "Post-graduation work permit",
      "Co-op programmes",
      "Pathway to permanent residence",
    ],
    intakes: "September / January / May",
    tuitionRange: "CAD 15,000 – 40,000 / year",
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Oceania",
    blurb: "Plan a study route with support from programme search through enrolment.",
    highlights: ["Work rights while studying", "High quality of life", "Temporary graduate visa"],
    intakes: "February / July",
    tuitionRange: "AUD 20,000 – 45,000 / year",
  },
  {
    slug: "cyprus-malta-netherlands",
    name: "Cyprus, Malta & Netherlands",
    region: "Europe",
    blurb: "Compare European study options with help on entry, fees, and next steps.",
    highlights: ["Affordable tuition", "English-taught degrees", "Flexible entry requirements"],
    intakes: "September / February",
    tuitionRange: "€3,500 – €15,000 / year",
  },
  {
    slug: "china",
    name: "China",
    region: "Asia",
    blurb: "Discover international study options and prepare a strong application.",
    highlights: [
      "Generous government scholarships",
      "Modern campuses",
      "Growing English-taught catalogue",
    ],
    intakes: "September / March",
    tuitionRange: "$2,500 – $10,000 / year",
  },
];

export const subjects = [
  "Business",
  "Engineering",
  "Health & Medicine",
  "Computer Science",
  "Law",
  "Arts & Design",
  "Hospitality & Tourism",
];

export interface University {
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  city: string;
  degreeLevels: string;
  courses: string;
  subjects: string[];
  tuition: string;
  intake: string;
  applicationFee: string;
  scholarship: string;
  verified: boolean;
}

export const universities: University[] = [
  {
    slug: "tu-berlin-template",
    name: "University listing template — Germany",
    country: "Germany",
    countrySlug: "germany",
    city: "Berlin",
    degreeLevels: "To be confirmed",
    courses: "Add verified course data",
    subjects: ["Engineering", "Computer Science"],
    tuition: "To be confirmed",
    intake: "October / April",
    applicationFee: "Check university",
    scholarship: "Add verified scholarship details",
    verified: false,
  },
  {
    slug: "canada-template",
    name: "University listing template — Canada",
    country: "Canada",
    countrySlug: "canada",
    city: "Toronto",
    degreeLevels: "To be confirmed",
    courses: "Add verified course data",
    subjects: ["Business", "Health & Medicine"],
    tuition: "To be confirmed",
    intake: "January / September",
    applicationFee: "Check university",
    scholarship: "Add verified scholarship details",
    verified: false,
  },
  {
    slug: "uk-template",
    name: "University listing template — United Kingdom",
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    city: "Manchester",
    degreeLevels: "To be confirmed",
    courses: "Add verified course data",
    subjects: ["Business", "Law"],
    tuition: "To be confirmed",
    intake: "January / September",
    applicationFee: "Check university",
    scholarship: "Add verified scholarship details",
    verified: false,
  },
  {
    slug: "eastern-mediterranean-university",
    name: "Eastern Mediterranean University",
    country: "Cyprus, Malta & Netherlands",
    countrySlug: "cyprus-malta-netherlands",
    city: "Famagusta",
    degreeLevels: "Bachelor's, Master's, PhD",
    courses: "110+ programmes",
    subjects: ["Engineering", "Business", "Arts & Design", "Hospitality & Tourism"],
    tuition: "From €3,800 / year",
    intake: "September / February",
    applicationFee: "None",
    scholarship: "Up to 50% merit scholarship",
    verified: true,
  },
  {
    slug: "university-of-melbourne-template",
    name: "University listing template — Australia",
    country: "Australia",
    countrySlug: "australia",
    city: "Melbourne",
    degreeLevels: "To be confirmed",
    courses: "Add verified course data",
    subjects: ["Health & Medicine", "Computer Science"],
    tuition: "To be confirmed",
    intake: "February / July",
    applicationFee: "Check university",
    scholarship: "Add verified scholarship details",
    verified: false,
  },
  {
    slug: "china-template",
    name: "University listing template — China",
    country: "China",
    countrySlug: "china",
    city: "Shanghai",
    degreeLevels: "To be confirmed",
    courses: "Add verified course data",
    subjects: ["Engineering", "Business"],
    tuition: "To be confirmed",
    intake: "September / March",
    applicationFee: "Check university",
    scholarship: "Add verified scholarship details",
    verified: false,
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
}

export const courses: Course[] = [
  {
    slug: "bsc-computer-engineering",
    title: "BSc Computer Engineering",
    university: "Eastern Mediterranean University",
    universitySlug: "eastern-mediterranean-university",
    country: "Cyprus, Malta & Netherlands",
    level: "Bachelor's",
    subject: "Engineering",
    duration: "4 years",
    tuition: "€4,200 / year",
    intake: "September / February",
    language: "English",
  },
  {
    slug: "mba-international-business",
    title: "MBA International Business",
    university: "Eastern Mediterranean University",
    universitySlug: "eastern-mediterranean-university",
    country: "Cyprus, Malta & Netherlands",
    level: "Master's",
    subject: "Business",
    duration: "1.5 years",
    tuition: "€5,900 / year",
    intake: "September / February",
    language: "English",
  },
  {
    slug: "msc-data-science",
    title: "MSc Data Science (template)",
    university: "University listing template — Germany",
    universitySlug: "tu-berlin-template",
    country: "Germany",
    level: "Master's",
    subject: "Computer Science",
    duration: "2 years",
    tuition: "To be confirmed",
    intake: "October",
    language: "English",
  },
  {
    slug: "bsc-nursing",
    title: "BSc Nursing (template)",
    university: "University listing template — United Kingdom",
    universitySlug: "uk-template",
    country: "United Kingdom",
    level: "Bachelor's",
    subject: "Health & Medicine",
    duration: "3 years",
    tuition: "To be confirmed",
    intake: "September",
    language: "English",
  },
  {
    slug: "llm-international-law",
    title: "LLM International Law (template)",
    university: "University listing template — United Kingdom",
    universitySlug: "uk-template",
    country: "United Kingdom",
    level: "Master's",
    subject: "Law",
    duration: "1 year",
    tuition: "To be confirmed",
    intake: "September / January",
    language: "English",
  },
  {
    slug: "diploma-hospitality",
    title: "Diploma in Hospitality Management (template)",
    university: "University listing template — Canada",
    universitySlug: "canada-template",
    country: "Canada",
    level: "Foundation",
    subject: "Hospitality & Tourism",
    duration: "2 years",
    tuition: "To be confirmed",
    intake: "January / May / September",
    language: "English",
  },
  {
    slug: "ba-graphic-design",
    title: "BA Graphic Design (template)",
    university: "University listing template — Australia",
    universitySlug: "university-of-melbourne-template",
    country: "Australia",
    level: "Bachelor's",
    subject: "Arts & Design",
    duration: "3 years",
    tuition: "To be confirmed",
    intake: "February / July",
    language: "English",
  },
  {
    slug: "phd-mechanical-engineering",
    title: "PhD Mechanical Engineering (template)",
    university: "University listing template — China",
    universitySlug: "china-template",
    country: "China",
    level: "PhD",
    subject: "Engineering",
    duration: "3–4 years",
    tuition: "To be confirmed",
    intake: "September",
    language: "English",
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

export const scholarships: Scholarship[] = [
  {
    slug: "emu-merit",
    name: "EMU Merit Scholarship",
    provider: "Eastern Mediterranean University",
    country: "Cyprus, Malta & Netherlands",
    amount: "25% – 50% tuition",
    level: "Bachelor's & Master's",
    deadline: "Rolling",
    summary: "Automatic tuition reduction based on academic results at admission.",
  },
  {
    slug: "daad-template",
    name: "Government scholarship (template)",
    provider: "To be confirmed",
    country: "Germany",
    amount: "Add verified amount",
    level: "Master's & PhD",
    deadline: "To be confirmed",
    summary: "Placeholder for a verified funded programme for international graduates.",
  },
  {
    slug: "chevening-template",
    name: "Fully funded master's (template)",
    provider: "To be confirmed",
    country: "United Kingdom",
    amount: "Add verified amount",
    level: "Master's",
    deadline: "To be confirmed",
    summary: "Placeholder for a verified one-year master's award including living costs.",
  },
  {
    slug: "canada-entrance",
    name: "Entrance award (template)",
    provider: "To be confirmed",
    country: "Canada",
    amount: "Add verified amount",
    level: "Bachelor's",
    deadline: "To be confirmed",
    summary: "Placeholder for automatic entrance awards for high-achieving applicants.",
  },
  {
    slug: "csc-template",
    name: "Government scholarship (template)",
    provider: "To be confirmed",
    country: "China",
    amount: "Add verified amount",
    level: "All levels",
    deadline: "To be confirmed",
    summary: "Placeholder for tuition, accommodation and stipend support.",
  },
  {
    slug: "australia-awards-template",
    name: "Regional award (template)",
    provider: "To be confirmed",
    country: "Australia",
    amount: "Add verified amount",
    level: "Master's",
    deadline: "To be confirmed",
    summary: "Placeholder for full awards for students from eligible countries.",
  },
];

export interface SupportService {
  slug: string;
  title: string;
  description: string;
  details: string[];
}

export const supportServices: SupportService[] = [
  {
    slug: "intakes",
    title: "January & September Intakes",
    description: "Plan your timeline around key intakes, deadlines, and document preparation.",
    details: [
      "Intake calendar for each destination",
      "Personal deadline checklist",
      "Document readiness review",
    ],
  },
  {
    slug: "tuition",
    title: "Tuition Fees & Scholarships",
    description:
      "Understand verified tuition, application costs, and available scholarship pathways.",
    details: ["Verified fee breakdowns", "Scholarship matching", "Budget planning per year"],
  },
  {
    slug: "admission",
    title: "Admission Requirements",
    description: "Know which academic, language, and document requirements to prepare.",
    details: [
      "Grade & transcript guidance",
      "IELTS / TOEFL alternatives",
      "Statement of purpose review",
    ],
  },
  {
    slug: "visa",
    title: "Student Visa Guidance",
    description:
      "Get organised for your visa route, financial evidence, and interview preparation.",
    details: ["Financial evidence checklist", "Interview practice", "Appointment support"],
  },
  {
    slug: "dependents",
    title: "Dependent & Spouse Guidance",
    description: "Learn the key considerations when planning a study move with family.",
    details: [
      "Eligibility by country",
      "Family accommodation options",
      "School enrolment for children",
    ],
  },
  {
    slug: "application",
    title: "Application Support",
    description: "Receive practical help preparing a complete, accurate application submission.",
    details: ["Application review", "Portal submission", "Offer & acceptance follow-up"],
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

export const marketplaceItems: MarketplaceItem[] = [
  {
    slug: "textbooks-bundle",
    title: "Engineering textbooks bundle",
    category: "Books",
    price: "€60",
    location: "Famagusta",
    description: "Second-year mechanical engineering set, lightly used.",
  },
  {
    slug: "study-desk",
    title: "Study desk & chair",
    category: "Furniture",
    price: "€45",
    location: "Famagusta",
    description: "Compact desk, ideal for a studio flat.",
  },
  {
    slug: "airport-pickup",
    title: "Airport pickup — Ercan",
    category: "Services",
    price: "€35",
    location: "Ercan Airport",
    description: "Meet & greet service straight to your accommodation.",
  },
  {
    slug: "sim-card-setup",
    title: "Local SIM & bank setup",
    category: "Services",
    price: "Free with application",
    location: "Online",
    description: "Guided onboarding for a local number and student bank account.",
  },
  {
    slug: "bicycle",
    title: "City bicycle",
    category: "Transport",
    price: "€90",
    location: "Famagusta",
    description: "Well-maintained bicycle with lock and lights.",
  },
  {
    slug: "ielts-prep",
    title: "IELTS preparation sessions",
    category: "Tutoring",
    price: "€15 / hr",
    location: "Online",
    description: "Small-group sessions with a certified tutor.",
  },
];

export interface Listing {
  slug: string;
  title: string;
  type: string;
  price: string;
  location: string;
  bedrooms: number;
  features: string[];
  availableFrom: string;
}

export const accommodationListings: Listing[] = [
  {
    slug: "campus-studio",
    title: "On-campus studio",
    type: "Dormitory",
    price: "€260 / month",
    location: "EMU Campus, Famagusta",
    bedrooms: 1,
    features: ["Bills included", "Wi-Fi", "Shared kitchen"],
    availableFrom: "September 2026",
  },
  {
    slug: "shared-flat-2",
    title: "Shared 2-bedroom flat",
    type: "Shared flat",
    price: "€220 / month per room",
    location: "Sakarya, Famagusta",
    bedrooms: 2,
    features: ["Furnished", "5 min to campus", "Balcony"],
    availableFrom: "September 2026",
  },
  {
    slug: "private-1-bed",
    title: "Private 1-bedroom apartment",
    type: "Apartment",
    price: "€420 / month",
    location: "City centre, Famagusta",
    bedrooms: 1,
    features: ["Furnished", "Air conditioning", "Parking"],
    availableFrom: "October 2026",
  },
  {
    slug: "homestay",
    title: "Homestay with local family",
    type: "Homestay",
    price: "€350 / month",
    location: "Famagusta",
    bedrooms: 1,
    features: ["Meals included", "Quiet area", "Language practice"],
    availableFrom: "Rolling",
  },
];

export const realEstateListings: Listing[] = [
  {
    slug: "sea-view-apartment",
    title: "Sea-view 2+1 apartment",
    type: "For sale",
    price: "€145,000",
    location: "Long Beach, Iskele",
    bedrooms: 2,
    features: ["Sea view", "Communal pool", "Title deed ready"],
    availableFrom: "Immediate",
  },
  {
    slug: "student-investment-studio",
    title: "Student investment studio",
    type: "For sale",
    price: "€68,000",
    location: "Famagusta",
    bedrooms: 1,
    features: ["Rental guarantee", "Near campus", "Fully furnished"],
    availableFrom: "Immediate",
  },
  {
    slug: "family-villa",
    title: "3+1 family villa",
    type: "For sale",
    price: "€235,000",
    location: "Yeni Boğaziçi",
    bedrooms: 3,
    features: ["Private garden", "Solar panels", "Garage"],
    availableFrom: "Q1 2027",
  },
  {
    slug: "long-term-rental",
    title: "Long-term 2+1 rental",
    type: "For rent",
    price: "€600 / month",
    location: "Famagusta",
    bedrooms: 2,
    features: ["Unfurnished", "Pet friendly", "12-month lease"],
    availableFrom: "November 2026",
  },
];

export const aboutContent = {
  mission:
    "FranklyEdu Global helps students compare destinations, understand real costs, and submit complete applications — with clear guidance at every step.",
  values: [
    {
      title: "Verified first",
      text: "We only publish tuition, scholarship, and entry details once they are confirmed with the institution.",
    },
    {
      title: "Frank guidance",
      text: "Straight answers about costs, visas, and outcomes — no overselling.",
    },
    {
      title: "End-to-end",
      text: "From shortlist to arrival, including accommodation and settling in.",
    },
  ],
  stats: [
    { label: "Destinations", value: "10+" },
    { label: "Partner institutions", value: "40+" },
    { label: "Intakes per year", value: "3" },
    { label: "Response time", value: "< 24h" },
  ],
  team: [
    { name: "Frank Adeyemi", role: "Founder & Lead Counsellor" },
    { name: "Amara Okafor", role: "Admissions Specialist" },
    { name: "Deniz Kaya", role: "Accommodation & Real Estate" },
  ],
};

/** Mock data for the student dashboard prototype. */
export const mockStudent = {
  name: "Chidera Nwosu",
  email: "chidera@example.com",
  nationality: "Nigerian",
  targetIntake: "September 2026",
  savedUniversities: ["eastern-mediterranean-university", "uk-template", "canada-template"],
  applications: [
    {
      id: "APP-2041",
      programme: "BSc Computer Engineering",
      university: "Eastern Mediterranean University",
      status: "Offer received",
      progress: 80,
    },
    {
      id: "APP-2057",
      programme: "MSc Data Science (template)",
      university: "University listing template — Germany",
      status: "Documents pending",
      progress: 40,
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
