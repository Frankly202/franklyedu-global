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
  src: string;
  summary: string;
  country: string;
  countrySlug: string;
  city: string;
  intake?: string;
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
  },
  {
    slug: "cyprus-international-university",
    name: "Cyprus International University",
    src: "/Uni-Logos/CIU-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Nicosia",
  },
  {
    slug: "university-of-kyrenia",
    name: "University of Kyrenia (Girne Üniversitesi)",
    src: "/Uni-Logos/girne-uni-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "Cyprus / North Cyprus",
    countrySlug: "cyprus",
    city: "Kyrenia (Girne)",
  },
  {
    slug: "university-of-memphis",
    name: "University of Memphis",
    src: "/Uni-Logos/memphis-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "United States",
    countrySlug: "united-states",
    city: "Memphis, Tennessee",
  },
  {
    slug: "pace-university",
    name: "Pace University",
    src: "/Uni-Logos/pace-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "United States",
    countrySlug: "united-states",
    city: "New York City and Westchester County",
  },
  {
    slug: "university-of-sunderland",
    name: "University of Sunderland",
    src: "/Uni-Logos/university-sunderland-logo.png",
    summary: "Ask us for current admissions information for this institution.",
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    city: "Sunderland, England",
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
