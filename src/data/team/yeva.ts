import type { TeamMember } from "./shared";
import { teamMemberPageUrl } from "./shared";

/**
 * Yeva Polshkova — single source of truth for her bio page and team-page
 * card. All facts below (role, responsibilities) were supplied directly by
 * the business.
 *
 * NOTE: no Sunbiz URL was supplied for her yet, so it's not in
 * `authorityLinks` — a wrong company-registry link is worse than none. Add
 * the real Sunbiz document URL here once you have it.
 */
export const YEVA_SLUG = "yeva-polshkova";

export const yeva: TeamMember = {
  slug: YEVA_SLUG,
  name: "Yeva Polshkova",
  firstName: "Yeva",
  credentials: "Operations Manager",
  role: "Operations Manager",
  category: "Operations",
  photoUrl:
    "https://res.cloudinary.com/dnuxtgg11/image/upload/v1788295246/yeva-operations_manager_tznwgx.jpg",

  metaTitle: "Yeva Polshkova | Operations Manager",
  metaDescription:
    "Meet Yeva Polshkova, Operations Manager at Kami Aesthetics in Aventura, FL — overseeing scheduling, client care, and daily clinic operations.",

  shortBio:
    "Yeva Polshkova is the Operations Manager at Kami Aesthetics and often the first person clients connect with. She oversees scheduling, client communication, and daily operations, making sure every visit to the Aventura, FL practice feels organized, welcoming, and personal.",

  fullBio: [
    "Yeva Polshkova leads day-to-day operations at Kami Aesthetics in Aventura, FL. From coordinating the appointment calendar to keeping the practice running smoothly behind the scenes, she's the operational backbone that lets the clinical team focus on patient care.",
    "As Operations Manager, Yeva is typically a client's first point of contact — whether by phone, message, or in person — and she treats that first interaction as the foundation of the Kami Aesthetics experience. Clear communication, accurate scheduling, and a warm welcome are the standard she holds every touchpoint to.",
    "Yeva's focus is on making each visit feel personal rather than transactional. By staying closely involved in scheduling and client communication, she helps ensure continuity of care — so clients feel known and looked after every time they walk through the door, not just on their first visit.",
  ],

  servicesLabel: "Key Responsibilities",
  services: [
    "Clinic Operations",
    "Patient Scheduling",
    "Client Communication",
    "Client Experience",
  ],
  knowsAbout: [
    "Clinic Operations",
    "Patient Scheduling",
    "Client Communication",
    "Client Experience",
  ],

  badge: {
    icon: "sparkles",
    eyebrow: "Kami Aesthetics",
    label: "Operations Manager",
  },

  authorityLinks: [
    {
      type: "other",
      label: "Kami Aesthetics Operations",
      url: "https://kamiaesthetics.com/team",
      // Internal navigational link — doesn't independently corroborate
      // identity, so it's excluded from the schema's `sameAs` array.
      sameAs: false,
    },
    {
      type: "instagram",
      label: "@solomarso",
      url: "https://instagram.com/solomarso",
    },
  ],

  bookingTrackService: "general",
  ctaLabel: "Book an Appointment",
};

export const YEVA_PAGE_URL = teamMemberPageUrl(yeva);
