/**
 * Central content and data configuration for Frankedu Global.
 * Contains verified institutional relationships, service offerings, and supported destinations.
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
    slug: "cyprus",
    name: "Cyprus / North Cyprus",
    region: "Europe / Mediterranean",
    blurb:
      "English-medium degree programmes with generous scholarship opportunities up to 100% at confirmed partner institutions including Final International University (FIU).",
    highlights: [
      "Confirmed recruitment relationship: Final International University (FIU)",
      "Scholarships up to 100% for eligible students at selected institutions",
      "Affordable cost of living and student accommodation",
    ],
    intakes: "Inquire for current intakes",
    tuitionRange: "Scholarship-eligible (up to 100% at selected institutions)",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "Europe",
    blurb:
      "Undergraduate and postgraduate pathways across England, Scotland, Wales, and Northern Ireland.",
    highlights: [
      "Intensive 1-year master's degrees",
      "Graduate Route post-study work visa opportunities",
      "Admissions and visa advisory support",
    ],
    intakes: "Inquire for current intake cycles",
    tuitionRange: "Contact advisor for verified fee schedules",
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    blurb: "Colleges and universities offering co-op work terms and post-graduation pathways.",
    highlights: [
      "Post-Graduation Work Permit (PGWP) eligible programmes",
      "Co-op work placements and internship pathways",
      "Undergraduate and postgraduate diploma pathways",
    ],
    intakes: "Inquire for current intake cycles",
    tuitionRange: "Contact advisor for verified fee schedules",
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
    blurb:
      "Renowned engineering, business, and research programmes at public and private institutions.",
    highlights: [
      "English-taught undergraduate and master's programmes",
      "18-month post-study job seeker visa",
      "Strong industrial and technological ecosystem",
    ],
    intakes: "Inquire for current intake cycles",
    tuitionRange: "Contact advisor for verified fee schedules",
  },
  {
    slug: "poland",
    name: "Poland",
    region: "Europe",
    blurb:
      "High-quality European education with accessible tuition fees and vibrant university cities.",
    highlights: [
      "Schengen Area European standard qualifications",
      "Affordable living costs and medical/technical faculties",
      "English-medium bachelor's and master's tracks",
    ],
    intakes: "Inquire for current intake cycles",
    tuitionRange: "Contact advisor for verified fee schedules",
  },
  {
    slug: "finland",
    name: "Finland",
    region: "Europe / Nordic",
    blurb:
      "Leading Nordic education focused on innovation, research, technology, and applied sciences.",
    highlights: [
      "Top-ranked global education model",
      "Post-study work and residency pathways",
      "High quality of life and modern learning environments",
    ],
    intakes: "Inquire for current intake cycles",
    tuitionRange: "Contact advisor for verified fee schedules",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    region: "Europe",
    blurb: "One of continental Europe's largest catalogues of English-taught degree programmes.",
    highlights: [
      "Extensive English-taught programmes at research and applied universities",
      "One-year 'Orientation Year' (zoekjaar) post-study work visa",
      "Central European location and international student community",
    ],
    intakes: "Inquire for current intake cycles",
    tuitionRange: "Contact advisor for verified fee schedules",
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Oceania",
    blurb:
      "Globally recognized degrees with strong student support and post-study work opportunities.",
    highlights: [
      "Work rights during study and Temporary Graduate visas",
      "World-class campus facilities and high living standards",
      "Undergraduate, postgraduate, and vocational training options",
    ],
    intakes: "Inquire for current intake cycles",
    tuitionRange: "Contact advisor for verified fee schedules",
  },
  {
    slug: "china",
    name: "China",
    region: "Asia",
    blurb:
      "International study hub with modern university campuses and generous scholarship programmes.",
    highlights: [
      "Government, provincial, and university scholarship options",
      "Expanding English-taught degree offerings",
      "Exposure to one of the world's leading economic ecosystems",
    ],
    intakes: "Inquire for current intake cycles",
    tuitionRange: "Contact advisor for verified fee schedules",
  },
];

export const networkDestinationsNotice =
  "Additional study destinations worldwide may also be available through our global education network. Contact us if your desired country is not listed.";

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
    slug: "final-international-university",
    name: "Final International University (FIU)",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Kyrenia (Girne)",
    degreeLevels: "Bachelor's, Master's, PhD",
    courses: "Programmes available across confirmed faculties (contact advisor)",
    subjects: [
      "Business & Management",
      "Engineering & Technology",
      "Computer Science & IT",
      "Health Sciences & Nursing",
      "Law & International Relations",
      "Hospitality & Tourism",
      "Architecture & Fine Arts",
      "Social Sciences & Humanities",
    ],
    tuition: "Contact advisor for verified fee schedule",
    intake: "Contact advisor for intake schedules",
    applicationFee: "Contact advisor",
    scholarship: "Scholarships up to 100% for eligible students at selected institutions",
    verified: true,
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

/** Specific courses will be populated once individual programme details are verified with partner institutions. */
export const courses: Course[] = [];

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
    slug: "fiu-scholarships",
    name: "Final International University Scholarships",
    provider: "Final International University (FIU)",
    country: "Cyprus / North Cyprus",
    amount: "Up to 100% for eligible students",
    level: "Undergraduate & Postgraduate",
    deadline: "Contact advisor",
    summary:
      "Scholarships can be up to 100% for eligible students at selected institutions based on academic merit, quota availability, or early application.",
  },
  {
    slug: "partner-network-scholarships",
    name: "Education Network Institutional Awards",
    provider: "Selected Partner Institutions",
    country: "Supported Network Destinations",
    amount: "Up to 100% for eligible students",
    level: "Undergraduate & Postgraduate",
    deadline: "Contact advisor",
    summary:
      "Merit-based waivers and institutional awards available across supported destinations. Assessed upon academic profile review.",
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
    slug: "admissions",
    title: "University Admissions & Programme Matching",
    description:
      "End-to-end guidance matching your academic background and aspirations with verified institutions.",
    details: [
      "Programme matching across 9+ supported destinations",
      "Document readiness & academic credential check",
      "Official portal submission & offer letter follow-up",
    ],
  },
  {
    slug: "scholarships",
    title: "Scholarships & Financial Guidance",
    description:
      "Scholarships can be up to 100% for eligible students at selected institutions — we guide your application.",
    details: [
      "Up to 100% scholarship evaluation at selected institutions",
      "Merit and country-quota matching",
      "Transparent fee planning before you commit",
    ],
  },
  {
    slug: "visa-guidance",
    title: "Student Visa Guidance & Interview Prep",
    description:
      "Structured support to prepare a compliant student visa application with proper documentation.",
    details: [
      "Financial evidence and sponsorship checklist",
      "Embassy and consular interview preparation",
      "Visa submission timing & appointment advice",
    ],
  },
  {
    slug: "student-accommodation",
    title: "Student Accommodation & Relocation",
    description:
      "Verified student dormitories and rentals near campus, kept strictly separate from investment property.",
    details: [
      "On-campus and off-campus student housing options",
      "Airport pickup and meet-and-greet reception",
      "Local SIM card & bank account onboarding",
    ],
  },
  {
    slug: "property-investment",
    title: "Property & Investment Advisory",
    description:
      "Strategic property acquisition, rentals, and capital growth advisory across our primary markets.",
    details: [
      "North Cyprus: residential, off-plan and investment properties",
      "United Kingdom: residential and investment opportunities",
      "Dubai/UAE: selected investment opportunities",
    ],
  },
  {
    slug: "career-digital",
    title: "Career Support & Digital Services",
    description:
      "Guidance for post-study career opportunities alongside creative branding and digital design solutions.",
    details: [
      "Post-study work route insights across key destinations",
      "Professional CV and application profile review",
      "Graphic, web design & branding solutions by Frankedu",
    ],
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
    slug: "airport-pickup",
    title: "Airport pickup & meet-and-greet",
    category: "Services",
    price: "Inquire upon booking",
    location: "Ercan / Larnaca Airport",
    description: "Personalized arrival reception and transfer directly to student accommodation.",
  },
  {
    slug: "sim-card-setup",
    title: "Local SIM & student banking onboarding",
    category: "Services",
    price: "Inquire upon booking",
    location: "Lefkoşa & Girne",
    description:
      "Guided onboarding for a local phone number, student banking, and essential accounts.",
  },
  {
    slug: "orientation-service",
    title: "Campus & city orientation walk",
    category: "Services",
    price: "Inquire upon booking",
    location: "North Cyprus",
    description:
      "Orientation covering campus facilities, public transit, supermarkets, and student amenities.",
  },
  {
    slug: "textbooks-bundle",
    title: "Academic textbooks & study bundle",
    category: "Books",
    price: "Inquire for availability",
    location: "North Cyprus",
    description: "Core university course textbooks and study guides from previous intake cohorts.",
  },
  {
    slug: "study-desk",
    title: "Student study desk & ergonomic chair",
    category: "Furniture",
    price: "Inquire for availability",
    location: "Lefkoşa",
    description: "Compact desk and seating set ideal for student flat or dorm room setups.",
  },
  {
    slug: "bicycle",
    title: "Campus city bicycle",
    category: "Transport",
    price: "Inquire for availability",
    location: "North Cyprus",
    description: "Reliable city bicycle with lock and safety lights for easy campus commute.",
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
    slug: "campus-dormitory",
    title: "On-campus student residence",
    type: "Dormitory",
    price: "Inquire for semester rates",
    location: "Campus vicinity, North Cyprus",
    bedrooms: 1,
    features: ["Utilities included", "Campus security", "High-speed Wi-Fi"],
    availableFrom: "Inquire for availability",
  },
  {
    slug: "shared-student-flat",
    title: "Shared student apartment",
    type: "Shared flat",
    price: "Inquire for semester rates",
    location: "Student quarter, North Cyprus",
    bedrooms: 2,
    features: ["Fully furnished", "Walking distance to transit", "Dedicated study space"],
    availableFrom: "Inquire for availability",
  },
  {
    slug: "private-student-studio",
    title: "Private student studio apartment",
    type: "Apartment",
    price: "Inquire for semester rates",
    location: "City centre, North Cyprus",
    bedrooms: 1,
    features: ["Self-contained kitchen", "Air conditioning", "Private balcony"],
    availableFrom: "Inquire for availability",
  },
  {
    slug: "homestay-residential",
    title: "Student homestay & residential accommodation",
    type: "Homestay",
    price: "Inquire for semester rates",
    location: "Residential area, North Cyprus",
    bedrooms: 1,
    features: ["Safe residential setting", "Furnished bedroom", "Local community immersion"],
    availableFrom: "Inquire for availability",
  },
];

export const realEstateListings: Listing[] = [
  {
    slug: "north-cyprus-properties",
    title: "North Cyprus: Residential, Off-Plan & Investment Properties",
    type: "Residential, Off-Plan & Investment",
    price: "Inquire for current opportunities",
    location: "North Cyprus",
    bedrooms: 0,
    features: ["Residential properties", "Off-plan developments", "Investment properties"],
    availableFrom: "Inquire for details",
  },
  {
    slug: "uk-properties",
    title: "United Kingdom: Residential & Investment Opportunities",
    type: "Residential & Investment",
    price: "Inquire for current opportunities",
    location: "United Kingdom",
    bedrooms: 0,
    features: [
      "Residential opportunities",
      "Investment properties",
      "Acquisition and advisory guidance",
    ],
    availableFrom: "Inquire for details",
  },
  {
    slug: "dubai-uae-opportunities",
    title: "Dubai/UAE: Selected Investment Opportunities",
    type: "Selected Investment Opportunities",
    price: "Inquire for current opportunities",
    location: "Dubai / UAE",
    bedrooms: 0,
    features: [
      "Selected property opportunities",
      "Investor acquisition advisory",
      "Market opportunities",
    ],
    availableFrom: "Inquire for details",
  },
];

export const aboutContent = {
  mission:
    "Founded in September 2023, Frankedu Global provides transparent guidance for students, families, and investors navigating global university admissions, scholarships, student accommodation, and overseas property opportunities.",
  founded: "September 2023",
  office: "Regal Residence, Küçük Kaymaklı, Lefkoşa, North Cyprus",
  values: [
    {
      title: "Verified first",
      text: "We only publish admissions, tuition, and scholarship terms confirmed directly with our partner institutions and verified networks.",
    },
    {
      title: "Frank & transparent",
      text: "Honest, realistic advice regarding admissions criteria, visa regulations, and living costs — with no overselling.",
    },
    {
      title: "Comprehensive support",
      text: "From programme matching and visa preparation to arrival reception, accommodation, and property investment guidance.",
    },
  ],
  stats: [
    { label: "Founded", value: "Sep 2023" },
    { label: "Supported destinations", value: "9" },
    { label: "Scholarship range", value: "Up to 100%" },
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
