import { PHONE_NUMBER } from "@/data/constants";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Shared shape for individual team-member bio pages (/team/<slug>).
 * ─────────────────────────────────────────────────────────────────────────────
 *  One data file per person (see valeriia.ts, goldberg.ts) implements
 *  `TeamMember`; `TeamMemberBio` renders it and `buildTeamMemberProfilePageSchema`
 *  produces its structured data. Adding the next team member is: a new data
 *  file + a three-line page.tsx — no new component or schema code.
 */

export const TEAM_BASE_URL = "https://kamiaesthetics.com";

/** Determines which icon + micro-styling an outbound authority link gets. */
export type AuthorityLinkType = "academic" | "license" | "linkedin" | "instagram" | "patent" | "other";

export interface AuthorityLink {
  type: AuthorityLinkType;
  label: string;
  url: string;
  /** Include this link in the Person schema's `sameAs` array. Default true —
   *  set false for purely internal/navigational links (e.g. our own /team
   *  page) that don't independently corroborate identity the way an
   *  external profile, license record, or publication does. */
  sameAs?: boolean;
}

export interface TeamMemberLicense {
  number: string;
  /** e.g. "Advanced Practice Registered Nurse License", "Medical License" */
  credentialName: string;
  issuingBody: string;
  verificationUrl: string;
}

export interface TeamMemberAcademicAffiliation {
  institution: string;
  url?: string;
}

export type TeamMemberBadgeIcon = "shield" | "award" | "sparkles";

/** The small credentials/status box under the photo — UI-only, decoupled
 *  from `license` so a non-licensed role can still show
 *  a badge without implying a license that doesn't exist. */
export interface TeamMemberBadge {
  icon: TeamMemberBadgeIcon;
  eyebrow: string;
  label: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  firstName: string;
  credentials: string;
  role: string;
  /** Short eyebrow label above the name, e.g. "Injectables & Medical". */
  category: string;
  photoUrl: string;

  /** <title> — the root layout appends " | Kami Aesthetics" itself, so this
   *  must never repeat the brand name. */
  metaTitle: string;
  /** <meta name="description"> — keep to ~155–160 chars for SERP display. */
  metaDescription: string;

  /** 2–3 sentence card copy — team-page preview, other landing pages. */
  shortBio: string;
  /** Full bio — one paragraph per array entry, rendered on the bio page. */
  fullBio: string[];

  /** Heading over the services/focus-areas pill list, e.g. "Key Services". */
  servicesLabel: string;
  services: string[];

  medicalSpecialty?: string[];
  knowsAbout?: string[];
  academicAffiliation?: TeamMemberAcademicAffiliation;
  /** Drives the `hasCredential` schema property. Independent of `badge`. */
  license?: TeamMemberLicense;
  /** The visible credentials/status box under the photo. Independent of
   *  `license` — e.g. a general team-member badge with no license behind it. */
  badge?: TeamMemberBadge;

  /** Outbound authority links, in display order. Also become the schema's
   *  `sameAs` array — one list, one source of truth. Empty when no verified
   *  external profile exists yet; never fabricate a placeholder URL here. */
  authorityLinks: AuthorityLink[];

  /** data-track-service value for the booking CTA. */
  bookingTrackService: string;
  /** Overrides the default "Book a Consultation with {firstName}" CTA copy —
   *  useful for roles that don't perform treatments themselves. */
  ctaLabel?: string;
}

export function teamMemberPageUrl(member: Pick<TeamMember, "slug">): string {
  return `${TEAM_BASE_URL}/team/${member.slug}`;
}

/** Schema.org Person structured data for one team member's bio page. */
export function buildTeamMemberPersonSchema(member: TeamMember) {
  const pageUrl = teamMemberPageUrl(member);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${pageUrl}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.shortBio,
    image: member.photoUrl,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    telephone: PHONE_NUMBER,
    ...(member.medicalSpecialty ? { medicalSpecialty: member.medicalSpecialty } : {}),
    ...(member.knowsAbout ? { knowsAbout: member.knowsAbout } : {}),
    ...(member.academicAffiliation
      ? {
          affiliation: {
            "@type": "CollegeOrUniversity",
            name: member.academicAffiliation.institution,
            ...(member.academicAffiliation.url ? { url: member.academicAffiliation.url } : {}),
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: member.academicAffiliation.institution,
          },
        }
      : {}),
    // Matches the address shape already used by the team-page Person schemas
    // (src/app/team/page.tsx).
    worksFor: {
      "@type": "MedicalBusiness",
      name: "Kami Aesthetics",
      url: TEAM_BASE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "2999 NE 191st St, Floor 9",
        addressLocality: "Aventura",
        addressRegion: "FL",
        postalCode: "33180",
        addressCountry: "US",
      },
    },
    ...(member.license
      ? {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "license",
            name: member.license.credentialName,
            identifier: member.license.number,
            recognizedBy: {
              "@type": "GovernmentOrganization",
              name: member.license.issuingBody,
              url: member.license.verificationUrl,
            },
          },
        }
      : {}),
    ...(() => {
      const sameAs = member.authorityLinks
        .filter((link) => link.sameAs !== false)
        .map((link) => link.url);
      return sameAs.length > 0 ? { sameAs } : {};
    })(),
  };
}

/**
 * Wraps the Person schema in ProfilePage per Google's profile-page guidance —
 * signals the page's primary purpose is this one person's profile.
 */
export function buildTeamMemberProfilePageSchema(member: TeamMember) {
  const pageUrl = teamMemberPageUrl(member);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profilepage`,
    url: pageUrl,
    mainEntity: buildTeamMemberPersonSchema(member),
  };
}
