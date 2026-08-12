import type { TreatmentArea } from "../types/booking";

// New-client "Must-Have" bundle: Bikini (Full Brazilian) + Underarms + Half
// Legs for a flat $149. This is a real, bookable price — not a marketing
// teaser — so calculateBaseSessionPrice (lib/pricing.ts) overrides the
// per-area total whenever exactly these three areas are selected, and that
// override price is what's shown and submitted everywhere downstream.
export const MUST_HAVE_OFFER_AREA_IDS: readonly string[] = ["underarms", "brazilian", "half-legs"];
export const MUST_HAVE_OFFER_PRICE = 149;

export function isMustHaveOfferCombo(selectedAreas: TreatmentArea[]): boolean {
  if (selectedAreas.length !== MUST_HAVE_OFFER_AREA_IDS.length) return false;
  const ids = new Set(selectedAreas.map((a) => a.id));
  return MUST_HAVE_OFFER_AREA_IDS.every((id) => ids.has(id));
}
