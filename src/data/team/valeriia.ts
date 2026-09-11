import type { TeamMember } from "./shared";
import { teamMemberPageUrl } from "./shared";

/**
 * Valeriia Tiertyshnikova, APRN — single source of truth for her bio page,
 * team-page card, JSON-LD, and the botox flow's "Meet your provider" link.
 *
 * All facts below (education, license number, services) were supplied
 * directly by the business — this file does not add or infer anything
 * beyond that. If a fact changes (license renewal, new services, etc.),
 * update it here once.
 */
export const VALERIIA_SLUG = "valeriia-tiertyshnikova";

export const valeriia: TeamMember = {
  slug: VALERIIA_SLUG,
  name: "Valeriia Tiertyshnikova, APRN",
  firstName: "Valeriia",
  credentials: "APRN",
  role: "Board-Certified Advanced Practice Registered Nurse, Aesthetic Specialist",
  category: "Injectables & Medical",
  photoUrl:
    "https://res.cloudinary.com/dnuxtgg11/image/upload/v1788136190/IMG_3256_yloyjg.jpg",

  metaTitle: "Valeriia Tiertyshnikova, APRN | Nurse Practitioner",
  metaDescription:
    "Meet Valeriia Tiertyshnikova, APRN — Kami Aesthetics' board-certified nurse practitioner in Aventura, FL, trained at the University of Miami. Book a consultation.",

  shortBio:
    "Valeriia Tiertyshnikova, APRN is a board-certified Advanced Practice Registered Nurse and aesthetic specialist with a clinical dermatology background from the University of Miami Miller School of Medicine's Jozic Lab. She provides neuromodulators, dermal fillers, PRP/PRF, and laser treatments at Kami Aesthetics, with a focus on natural-looking, individualized results.",

  fullBio: [
    "Valeriia Tiertyshnikova, APRN brings a clinical dermatology foundation to her aesthetic practice at Kami Aesthetics. Her background includes research experience at the University of Miami Miller School of Medicine's Jozic Lab within the Department of Dermatology & Cutaneous Surgery, giving her an evidence-based understanding of skin biology that informs every treatment plan she builds.",
    "That foundation shapes how she approaches injectables and energy-based devices alike. Rather than treating each concern in isolation, Valeriia evaluates facial anatomy, skin quality, and a patient's goals together — using neuromodulators, dermal fillers, PRP/PRF, IPL photorejuvenation, and the ResurFX fractional laser to produce results that read as refreshed, not altered. Natural proportion and skin health guide her dosing and technique decisions at every visit.",
    "Valeriia is a board-certified Advanced Practice Registered Nurse, licensed by the Florida Department of Health (License #APRN11043386), and practices at Kami Aesthetics under the clinic's medical director delegation protocol. Patient safety and clear, honest expectations are central to her consultations — she takes the time to explain what a treatment can and cannot do before recommending it.",
  ],

  servicesLabel: "Key Services",
  services: [
    "Neuromodulators",
    "Dermal Fillers",
    "PRP/PRF",
    "IPL Photorejuvenation",
    "ResurFX Fractional Laser",
  ],
  medicalSpecialty: ["Dermatology", "Aesthetic Medicine"],

  academicAffiliation: {
    institution: "University of Miami Miller School of Medicine",
    url: "https://med.miami.edu/labs/jozic-lab/lab-members",
  },

  license: {
    number: "APRN11043386",
    credentialName: "Advanced Practice Registered Nurse License",
    issuingBody: "Florida Department of Health",
    verificationUrl: "https://mqa-internet.doh.state.fl.us/mqasearchservices/healthcareproviders",
  },
  badge: {
    icon: "shield",
    eyebrow: "Licensed & Verified",
    label: "APRN · Florida License #APRN11043386",
  },

  authorityLinks: [
    {
      type: "academic",
      label: "University of Miami Miller School of Medicine",
      url: "https://med.miami.edu/labs/jozic-lab/lab-members",
    },
    {
      type: "license",
      label: "Florida Department of Health (License #APRN11043386)",
      url: "https://mqa-internet.doh.state.fl.us/mqasearchservices/healthcareproviders",
    },
    {
      type: "linkedin",
      label: "LinkedIn Profile",
      url: "https://www.linkedin.com/in/valeriia-tiertyshnikova-a77b4920a/",
    },
    {
      type: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/valeriia.aesthetic/",
    },
  ],

  bookingTrackService: "botox",
};

export const VALERIIA_PAGE_URL = teamMemberPageUrl(valeriia);
