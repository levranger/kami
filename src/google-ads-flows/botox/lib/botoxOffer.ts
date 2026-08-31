import { BOOKING_URL, PHONE_NUMBER, PHONE_HREF, MAPS_URL } from "@/data/constants";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Botox $10/unit promotional landing page — single source of truth
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every promotional term rendered on /booking/botox is read from this file.
 *  Change price / expiration / minimums / deposit here and the whole page
 *  updates. Anything marked `TODO` is a real value the business still needs to
 *  supply — do NOT guess it inside the components.
 */

export interface BotoxOfferConfig {
  /** Advertised promo price. Must stay 10 for this campaign landing page. */
  pricePerUnit: number;
  currency: string;
  /** Branded product name, with the registered-trademark mark. */
  productName: string;
  newClientsOnly: boolean;
  /** TODO: confirm the minimum unit purchase for the promo (e.g. 20). null = not yet supplied. */
  minimumUnits: number | null;
  /** TODO: promo end date as ISO "YYYY-MM-DD". null = not yet supplied. */
  expirationDate: string | null;
  /** TODO: eligible treatment areas for the promo price, or null to leave unstated. */
  eligibleAreas: string[] | null;
  /** Eligibility + dosing are always determined at the in-person consultation. */
  consultationRequired: boolean;
  /** TODO: does the promo require a booking deposit? null = not yet supplied. */
  depositRequired: boolean | null;
  /** TODO: deposit amount in dollars, used only when depositRequired is true. */
  depositAmount: number | null;
  combinableWithOtherOffers: boolean;
}

export const botoxOffer: BotoxOfferConfig = {
  pricePerUnit: 10,
  currency: "$",
  productName: "Botox® Cosmetic",
  newClientsOnly: true,
  minimumUnits: null, // TODO
  expirationDate: null, // TODO — ISO date, e.g. "2026-09-30"
  eligibleAreas: null, // TODO — e.g. ["Forehead lines", "Frown lines", "Crow's feet"]
  consultationRequired: true,
  depositRequired: null, // TODO
  depositAmount: null, // TODO — dollars, only if depositRequired
  combinableWithOtherOffers: false,
};

/**
 * Dedicated Mangomint booking destination for the $10/unit promo.
 *
 * TODO: create a dedicated "$10/unit Botox Promotion" service / deep link inside
 * Mangomint and paste its URL here. Until then this falls back to the shared
 * clinic booking link (BOOKING_URL), which lands on Mangomint's generic
 * "Book for one person / Book for a group" screen — not ideal for paid traffic.
 */
export const BOTOX_PROMO_BOOKING_URL: string = BOOKING_URL;

/** Open the booking destination in a new tab (keeps the landing page + pixels alive). */
export const BOOKING_OPENS_IN_NEW_TAB = true;

/**
 * Treating provider. Sourced from Kami's clinical delegation documentation:
 * Valeriia Tiertyshnikova, NP — authorized for neuromodulator (wrinkle-relaxer)
 * procedures under the medical director's delegation protocol. Botulinum toxin
 * is explicitly within the clinic's supervised services.
 */
export const provider = {
  name: "Valeriia Tiertyshnikova",
  credential: "NP", // Nurse Practitioner
  /** TODO: NP license number / issuing board, if it should be displayed (e.g. "FL APRN #..."). */
  licenseNumber: null as string | null,
  /** Approved professional headshot. */
  photoUrl:
    "https://res.cloudinary.com/dnuxtgg11/image/upload/v1788136190/IMG_3256_yloyjg.jpg" as
      | string
      | null,
  /**
   * TODO: confirm / replace with marketing-approved bio copy. The sentence below
   * is derived only from the delegation documentation — it makes no new claims.
   */
  bio:
    "Valeriia Tiertyshnikova is a nurse practitioner at Kami Aesthetics who performs " +
    "neuromodulator treatments under the clinic's medical director delegation protocol, " +
    "with dosing tailored to each patient's facial anatomy and goals.",
  /** TODO: URL of a provider bio page, if one exists. null hides the "Meet your provider" link. */
  meetProviderUrl: null as string | null,
};

/** Google rating already shown on the page. */
export const GOOGLE_RATING = 5.0;
/** TODO: total Google review count. null renders the rating without a count. */
export const GOOGLE_REVIEW_COUNT: number | null = null;
/**
 * Clinic's public Google listing (reviews are visible here).
 * TODO: swap for a direct "see all reviews" URL if the Google placeId link is known.
 */
export const GOOGLE_REVIEWS_URL = MAPS_URL;

/**
 * Official Botox® Cosmetic (AbbVie / Allergan Aesthetics) safety documents.
 * TODO: paste the exact manufacturer / FDA URLs — do not approximate them.
 * An empty string renders the item as "link pending".
 */
export const BOTOX_SAFETY_LINKS = {
  importantSafetyInformation: "", // TODO
  medicationGuide: "", // TODO
  fullPrescribingInformation: "", // TODO
};

export const POLICY_LINKS = {
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
  /** TODO: create a Cancellation / Deposit policy page and set its path here. */
  cancellationDepositPolicy: "", // TODO
};

/**
 * Clinic identity block for this landing page.
 *
 * NOTE: the campaign brief specifies "Suite 906 / Miami, FL 33180". The
 * site-wide constant `ADDRESS` in src/data/constants.ts uses
 * "Floor 9 / Aventura, FL 33180". TODO: confirm which address string is correct
 * for the paid campaign and reconcile the two.
 */
export const clinicInfo = {
  name: "Kami Aesthetics",
  addressLine1: "2999 NE 191st St, Suite 906",
  addressLine2: "Miami, FL 33180",
  phone: PHONE_NUMBER,
  phoneHref: PHONE_HREF,
  mapsUrl: MAPS_URL,
};

/** Before/After representation for the promo landing page. */
export const beforeAfterConfig = {
  /**
   * TODO: set true ONLY when written photo consent for these exact images is on
   * file. While false, the section renders as an illustrative simulation with no
   * testimonial and is not presented as clinical evidence.
   */
  isGenuineConsentedPatientResult: false,
  treatmentArea: "Forehead Lines",
  /** TODO: e.g. "2 weeks after treatment" — only if documented for these images. */
  timingAfterTreatment: null as string | null,
  beforeImage:
    "https://res.cloudinary.com/dnuxtgg11/image/upload/v1783740366/botox-before_oswgjh.png",
  afterImage:
    "https://res.cloudinary.com/dnuxtgg11/image/upload/v1783740366/botox-after_hegcpm.png",
};

/** "$10/unit" — the canonical price string for this campaign. */
export function formatOfferPrice(): string {
  return `${botoxOffer.currency}${botoxOffer.pricePerUnit}/unit`;
}

/** Human-readable promo expiration, or null when no date is configured. */
export function formatExpiration(): string | null {
  if (!botoxOffer.expirationDate) return null;
  const d = new Date(`${botoxOffer.expirationDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/**
 * Concise fine-print lines, built only from values that are actually set.
 * Missing config values are omitted rather than invented.
 */
export function buildPromoTerms(): string[] {
  const lines: string[] = [];

  if (botoxOffer.newClientsOnly) lines.push("New clients only.");
  if (botoxOffer.minimumUnits != null) lines.push(`${botoxOffer.minimumUnits}-unit minimum.`);

  const exp = formatExpiration();
  lines.push(exp ? `Valid through ${exp}.` : "Valid for a limited time.");

  if (botoxOffer.eligibleAreas && botoxOffer.eligibleAreas.length > 0) {
    lines.push(`Eligible areas: ${botoxOffer.eligibleAreas.join(", ")}.`);
  }

  if (botoxOffer.consultationRequired) {
    lines.push(
      "Treatment eligibility and dosing are determined during consultation by a licensed medical provider.",
    );
  }

  if (botoxOffer.depositRequired) {
    lines.push(
      botoxOffer.depositAmount != null
        ? `A ${botoxOffer.currency}${botoxOffer.depositAmount} booking deposit is required and is applied to your treatment.`
        : "A booking deposit is required and is applied to your treatment.",
    );
  }

  lines.push(
    botoxOffer.combinableWithOtherOffers
      ? "May be combined with other offers only where stated."
      : "Cannot be combined with other offers, discounts, or rewards unless otherwise stated.",
  );

  lines.push("Individual results vary.");

  return lines;
}
