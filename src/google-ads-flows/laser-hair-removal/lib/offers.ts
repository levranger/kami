// ─────────────────────────────────────────────────────────────────────────────
//  The single source of truth for the paid-search laser hair removal offer.
//  Every surface — landing page, funnel, confirmation, analytics metadata and
//  the submitted booking payload — reads the offer from here so the wording,
//  price and value can never drift apart.
//
//  Canonical wording (use verbatim, do NOT substitute "Bikini" / "Legs"):
//
//    NEW CLIENT MUST-HAVE
//    Full Brazilian + Underarms + Half Legs — $149
//    $289 regular combined value
// ─────────────────────────────────────────────────────────────────────────────

/** Stable, non-PII identifier so this offer can be analysed on its own. */
export const OFFER_ID = "lhr_must_have_149";

export interface OfferArea {
  name: string;
  /** Individual single-session price — the $289 value is the sum of these. */
  price: number;
}

export const MUST_HAVE_OFFER = {
  id: OFFER_ID,
  name: "New Client Must-Have",
  /** Canonical areas phrase. Render this string exactly, everywhere. */
  areasLabel: "Full Brazilian + Underarms + Half Legs",
  price: 149,
  value: 289,
  laser: "Lumenis Splendor X",
  areas: [
    { name: "Full Brazilian", price: 109 },
    { name: "Underarms", price: 60 },
    { name: "Half Legs", price: 120 },
  ] as OfferArea[],
  /**
   * Subtle promotional terms shown near the landing-page offer CTA. Only
   * terms actually intended to apply — no expiration date unless one is
   * configured here.
   */
  terms: [
    "New clients only.",
    "One promotional treatment.",
    "Cannot be combined with other offers.",
    "Appointment subject to availability.",
  ],
} as const;

/** Compact canonical price string, e.g. "$149". */
export function formatOfferPrice(): string {
  return `$${MUST_HAVE_OFFER.price}`;
}

/** Compact canonical value string, e.g. "$289". */
export function formatOfferValue(): string {
  return `$${MUST_HAVE_OFFER.value}`;
}

/** The offer summary attached to analytics events and the booking payload. */
export function offerSummary() {
  return {
    id: MUST_HAVE_OFFER.id,
    name: MUST_HAVE_OFFER.name,
    areasLabel: MUST_HAVE_OFFER.areasLabel,
    price: MUST_HAVE_OFFER.price,
    value: MUST_HAVE_OFFER.value,
  };
}
