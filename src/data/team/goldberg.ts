import type { TeamMember } from "./shared";
import { teamMemberPageUrl } from "./shared";

/**
 * Dr. Paul M. Goldberg, MD — single source of truth for his bio page and
 * team-page card. All facts below (experience, patent, license number) were
 * supplied directly by the business — this file does not add or infer
 * anything beyond that.
 */
export const GOLDBERG_SLUG = "paul-goldberg";

export const goldberg: TeamMember = {
  slug: GOLDBERG_SLUG,
  name: "Dr. Paul M. Goldberg, MD",
  firstName: "Dr. Goldberg",
  credentials: "MD",
  role: "Board-Certified Plastic Surgeon, Medical Director",
  category: "Medical Oversight",
  photoUrl:
    "https://res.cloudinary.com/dnuxtgg11/image/upload/v1788368738/goldberg_MD_-_plastic_surgeon_iseuzj.png",

  metaTitle: "Dr. Paul M. Goldberg, MD | Plastic Surgeon",
  metaDescription:
    "Dr. Paul M. Goldberg, MD is the board-certified plastic surgeon and Medical Director at Kami Aesthetics in Aventura, FL, with 45+ years of experience.",

  shortBio:
    "Dr. Paul M. Goldberg, MD is a board-certified plastic surgeon and the Medical Director at Kami Aesthetics, bringing over 45 years of medical experience to the practice. He is an innovator in surgical technique and the inventor of a patented surgical instrument, and provides medical oversight for the clinic's injectable and advanced aesthetic services.",

  fullBio: [
    "Dr. Paul M. Goldberg, MD serves as the Medical Director and supervising physician at Kami Aesthetics, providing medical oversight for the clinic's injectable and advanced aesthetic services. He is a board-certified plastic surgeon with over 45 years of medical experience.",
    "Throughout his career, Dr. Goldberg has been an innovator in surgical technique, holding a U.S. patent for a surgical instrument he invented — U.S. Patent #5,611,811, for a micro and mini hair transplant device. That same drive to refine technique carries into his oversight of Kami Aesthetics' protocols across aesthetic medicine, reconstructive surgery, and skin health.",
    "Patient safety is central to Dr. Goldberg's role at the clinic. His oversight brings an additional layer of clinical expertise and accountability to Kami Aesthetics' treatment protocols, helping ensure every injectable and aesthetic procedure meets a high standard of medical care.",
  ],

  servicesLabel: "Focus Areas",
  services: [
    "Medical Directorship",
    "Aesthetic Medicine",
    "Reconstructive Surgery",
    "Skin Health",
    "Patient Safety",
  ],
  medicalSpecialty: ["Plastic Surgery", "Reconstructive Surgery"],
  knowsAbout: [
    "Medical Directorship",
    "Aesthetic Medicine",
    "Reconstructive Surgery",
    "Skin Health",
    "Patient Safety",
    "Surgical Instrument Design",
  ],

  license: {
    number: "ME93957",
    credentialName: "Medical License (MD)",
    issuingBody: "Florida Department of Health",
    verificationUrl:
      "https://mqa-internet.doh.state.fl.us/MQASearchServices/healthcareproviders/Details?LicInd=91577&ProCde=1501",
  },
  badge: {
    icon: "shield",
    eyebrow: "Licensed & Verified",
    label: "MD · Florida License #ME93957",
  },

  authorityLinks: [
    {
      type: "license",
      label: "Florida Department of Health (License #ME93957)",
      url: "https://mqa-internet.doh.state.fl.us/MQASearchServices/healthcareproviders/Details?LicInd=91577&ProCde=1501",
    },
    {
      type: "patent",
      label: "U.S. Patent #5,611,811 (Micro and mini hair transplant device)",
      url: "https://patents.google.com/patent/US5611811A/en",
    },
  ],

  bookingTrackService: "general",
};

export const GOLDBERG_PAGE_URL = teamMemberPageUrl(goldberg);
