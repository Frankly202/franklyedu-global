import northCyprusResortImage from "@/assets/properties/seafront-resort-esentepe.png";
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
      "English-medium degree programmes and scholarship opportunities at Final International University (FIU).",
    highlights: [
      "Confirmed recruitment relationship: Final International University (FIU)",
      "Scholarships up to 100% for eligible students at Final International University (FIU)",
      "Affordable cost of living and student accommodation",
    ],
    intakes: "Inquire for current intakes",
    tuitionRange: "Scholarship opportunities up to 100% at Final International University (FIU)",
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
    tuitionRange: "Contact advisor for current tuition information",
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
    tuitionRange: "Contact advisor for current tuition information",
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
    tuitionRange: "Contact advisor for current tuition information",
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
    tuitionRange: "Contact advisor for current tuition information",
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
    tuitionRange: "Contact advisor for current tuition information",
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
    tuitionRange: "Contact advisor for current tuition information",
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
    tuitionRange: "Contact advisor for current tuition information",
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
    tuitionRange: "Contact advisor for current tuition information",
  },
  {
    slug: "united-states",
    name: "United States",
    region: "North America",
    blurb: "Contact us to ask about current study options.",
    highlights: [],
    intakes: "Contact us for current intake information",
    tuitionRange: "Contact us for current tuition information",
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
  src: string;
  summary: string;
  country: string;
  countrySlug: string;
  city: string;
  intake?: string;
  subjects: string[];
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
  },
  {
    slug: "cyprus-international-university",
    name: "Cyprus International University",
    src: "/Uni-Logos/CIU-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Nicosia",
    subjects: [],
  },
  {
    slug: "university-of-kyrenia",
    name: "University of Kyrenia (Girne Üniversitesi)",
    src: "/Uni-Logos/girne-uni-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Kyrenia (Girne)",
    subjects: [],
  },
  {
    slug: "university-of-memphis",
    name: "University of Memphis",
    src: "/Uni-Logos/memphis-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "United States",
    countrySlug: "united-states",
    city: "Memphis, Tennessee",
    subjects: [],
  },
  {
    slug: "pace-university",
    name: "Pace University",
    src: "/Uni-Logos/pace-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "United States",
    countrySlug: "united-states",
    city: "New York City and Westchester County",
    subjects: [],
  },
  {
    slug: "university-of-sunderland",
    name: "University of Sunderland",
    src: "/Uni-Logos/university-sunderland-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    city: "Sunderland, England",
    subjects: [],
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

/** Specific courses will be populated once individual programme details are confirmed. */
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
      "Scholarship opportunities at Final International University (FIU) can be up to 100% for eligible students. Contact us for current eligibility and award details.",
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
    description: "Guidance on study options based on your academic background and aspirations.",
    details: [
      "Study guidance by destination and subject",
      "Document readiness & academic credential check",
      "Official portal submission & offer letter follow-up",
    ],
  },
  {
    slug: "scholarships",
    title: "Scholarships & Financial Guidance",
    description:
      "At Final International University (FIU), scholarships can be up to 100% for eligible students. Contact us for current details.",
    details: [
      "Scholarship opportunities at FIU for eligible students",
      "Contact us for current scholarship criteria and award details",
      "Review current tuition details before applying",
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
      "Student dormitories and rentals near campus, kept strictly separate from investment property.",
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
  bedrooms?: number;
  features: string[];
  availableFrom: string;
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
  status: string;
  location: string;
  locationNote: string;
  priceDisplay: string;
  buyerEligibility: string;
  disclaimer: string;
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
    title: "Renovated Villa for Sale in North Cyprus",
    seoTitle: "Renovated Villa for Sale in North Cyprus | Frankedu Global",
    seoDescription:
      "Explore Sarcon №87, a renovated villa for sale in North Cyprus. View the property gallery and contact Frankedu Global for viewing and purchase assistance.",
    eyebrow: "Sarcon №87 · For Sale",
    reference: "Sarcon №87 / ID3423",
    propertyType: "Renovated / design-refurbished villa",
    status: "For sale",
    location: "North Cyprus",
    locationNote: "Exact map location supplied upon enquiry",
    priceDisplay: "Price on inquiry",
    buyerEligibility: "Listing states the title is suitable for a foreign national*",
    disclaimer:
      "*Buyer/title eligibility information in the listing should be independently confirmed during legal conveyancing.",
    description: [
      "A beautifully renovated villa finished with a design-led approach and prepared for resale. This property is suitable for buyers looking for a refreshed home or investment opportunity in North Cyprus.",
      "Full property photographs and the exact map location are available upon request. Contact Frankedu Global for viewing arrangements and dedicated purchasing assistance.",
    ],
    highlights: [
      "Renovated and design-refurbished villa",
      "North Cyprus location",
      "Full property photo gallery available",
      "Viewing and purchase assistance available",
      "Listing states title is suitable for foreign buyers*",
    ],
    gallery: [
      {
        src: sarconCover,
        previewSrc: sarconCoverPreview,
        thumbnailSrc: sarconCoverThumbnail,
        width: 1600,
        alt: "Sarcon 87 renovated villa in North Cyprus – exterior street view and gated entrance",
        title: "Exterior Street View & Gated Entrance",
        category: "Cover / Main Exterior",
      },
      {
        src: sarconSurroundings,
        previewSrc: sarconSurroundingsPreview,
        thumbnailSrc: sarconSurroundingsThumbnail,
        width: 1136,
        alt: "Sarcon 87 renovated villa in North Cyprus – surrounding coastal neighborhood and Mediterranean sea views",
        title: "Surrounding Coastal Neighborhood & Sea View",
        category: "Location & Setting",
      },
      {
        src: sarconLivingRoom,
        previewSrc: sarconLivingRoomPreview,
        thumbnailSrc: sarconLivingRoomThumbnail,
        width: 1920,
        alt: "Sarcon 87 renovated villa in North Cyprus – spacious double-height living room with exposed timber beams",
        title: "Double-Height Living Room",
        category: "Living Space",
      },
      {
        src: sarconStaircase,
        previewSrc: sarconStaircasePreview,
        thumbnailSrc: sarconStaircaseThumbnail,
        width: 1920,
        alt: "Sarcon 87 renovated villa in North Cyprus – ground-floor living area, wrought-iron staircase, and hallway entrance",
        title: "Living Area & Feature Staircase",
        category: "Interior Architecture",
      },
      {
        src: sarconKitchen,
        previewSrc: sarconKitchenPreview,
        thumbnailSrc: sarconKitchenThumbnail,
        width: 1920,
        alt: "Sarcon 87 renovated villa in North Cyprus – contemporary renovated kitchen and open-plan dining space",
        title: "Renovated Kitchen & Dining",
        category: "Kitchen & Dining",
      },
    ],
    contactEmail: "emmanuel@frankedu-global.com",
    contactPhone: "+90 548 850 4146",
    whatsappMessage:
      "Hi, I'm interested in Sarcon №87 (Renovated Villa for Sale in North Cyprus). Could you share verified details and viewing availability?",
  },
];

export function getPropertyBySlug(slug: string): PropertyDetail | undefined {
  return propertyDetails.find((p) => p.slug === slug);
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
    slug: "sarcon-87-renovated-villa-north-cyprus",
    title: "Sarcon №87: Renovated Villa for Sale",
    type: "Renovated Villa",
    price: "Price on inquiry",
    location: "North Cyprus",
    features: [
      "Design-refurbished villa",
      "Full photo gallery available",
      "Foreign buyer eligible*",
    ],
    availableFrom: "Immediate / For sale",
    image: sarconCover,
    imageAlt: "Sarcon 87 renovated villa in North Cyprus – exterior street view and gated entrance",
    detailSlug: "sarcon-87-renovated-villa-north-cyprus",
  },
  {
    slug: "north-cyprus-properties",
    title: "North Cyprus: Residential, Off-Plan & Investment Properties",
    type: "Residential, Off-Plan & Investment",
    price: "Inquire for current opportunities",
    location: "North Cyprus",
    bedrooms: 0,
    features: ["Residential properties", "Off-plan developments", "Investment properties"],
    availableFrom: "Inquire for details",
    image: northCyprusResortImage,
    imageAlt: "Seafront Resort Residences development in Esentepe, North Cyprus",
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
    "Frankedu Global provides guidance for students, families, and investors navigating university admissions, scholarships, student accommodation, and overseas property opportunities.",
  office: "Lefkoşa, North Cyprus",
  values: [
    {
      title: "Clear information",
      text: "We aim to provide clear information about admissions, tuition, and scholarship terms. Contact us for current details.",
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
    { label: "Supported destinations", value: "9" },
    { label: "FIU scholarship range", value: "Up to 100%" },
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
