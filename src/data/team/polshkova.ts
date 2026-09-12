import type { TeamMember } from "./shared";
import { teamMemberPageUrl } from "./shared";

/**
 * Valeriia Polshkova — single source of truth for her bio page and
 * team-page card. All facts below (role, specialties) were supplied
 * directly by the business.
 *
 * NOTE: no Sunbiz / Instagram URL was supplied for her yet, so they're not
 * in `authorityLinks` — a wrong company-registry or profile link is worse
 * than none. Add the real Sunbiz document URL and Instagram here once you
 * have them; the bio page and schema will pick them up automatically.
 */
export const POLSHKOVA_SLUG = "valeriia-polshkova";

export const polshkova: TeamMember = {
  slug: POLSHKOVA_SLUG,
  name: "Valeriia Polshkova",
  firstName: "Valeriia",
  credentials: "Aesthetic Specialist",
  role: "Aesthetic Specialist",
  category: "Laser & Electrolysis",
  photoUrl:
    "https://res.cloudinary.com/dnuxtgg11/image/upload/v1789096038/5241F5CD-FD25-46A9-9C82-6F26BF2485A7_ziygxz.png",

  metaTitle: "Valeriia Polshkova | Aesthetic Specialist",
  metaDescription:
    "Meet Valeriia Polshkova, aesthetic specialist at Kami Aesthetics in Aventura, FL, specializing in laser hair removal and electrolysis.",

  shortBio:
    "Valeriia Polshkova is an aesthetic specialist at Kami Aesthetics, specializing in laser hair removal, electrolysis, and energy-based aesthetic treatments. Her precise, practical approach helps clients in Aventura, FL achieve their aesthetic goals safely and effectively.",

  fullBio: [
    "Valeriia Polshkova is an aesthetic specialist at Kami Aesthetics, focused on laser hair removal, electrolysis, and other energy-based aesthetic treatments. Her approach centers on treatments that are safe, effective, and grounded in a precise understanding of skin and hair biology.",
    "Working on the clinic's Lumenis Splendor X and other energy-based devices, Valeriia takes a precise, practical approach to every session — calibrating settings to each client's skin type and treatment area rather than applying a one-size-fits-all protocol. That attention to technique is what lets her deliver consistent, visible results while keeping treatments as comfortable as possible.",
    "Valeriia is invested in how Kami Aesthetics treats its clients day to day: with clear expectations, individualized treatment plans, and continuity of care across sessions. Clients working with her in Aventura, FL can expect a provider who is as attentive to their comfort and goals as she is to the technical details of the treatment itself.",
  ],

  servicesLabel: "Key Services",
  services: ["Laser Hair Removal", "Electrolysis", "Energy-Based Aesthetic Treatments"],
  knowsAbout: ["Laser Hair Removal", "Electrolysis", "Energy-Based Aesthetic Treatments"],

  badge: {
    icon: "sparkles",
    eyebrow: "Kami Aesthetics",
    label: "Aesthetic Specialist",
  },

  authorityLinks: [
    {
      type: "linkedin",
      label: "LinkedIn Profile",
      url: "https://www.linkedin.com/in/valeriia-polshkova-80aaaa215/",
    },
  ],

  bookingTrackService: "laser-hair-removal",
};

export const POLSHKOVA_PAGE_URL = teamMemberPageUrl(polshkova);
