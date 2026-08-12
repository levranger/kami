import type { TreatmentArea, PackageType, PricingSummary } from "../types/booking";
import { DEPOSIT_AMOUNT } from "../types/booking";
import { isMustHaveOfferCombo, MUST_HAVE_OFFER_PRICE } from "./offers";

/**
 * Round a currency amount to the nearest whole dollar.
 * Single centralized rounding function for consistency.
 */
export function roundCurrency(amount: number): number {
  return Math.round(amount);
}

/**
 * Format a number as USD currency string.
 */
export function formatCurrency(amount: number): string {
  return `$${roundCurrency(amount).toLocaleString()}`;
}

/**
 * Calculate the base single-session price from selected areas. Selecting
 * exactly the Must-Have bundle (Bikini + Underarms + Half Legs) overrides
 * the per-area sum with the flat $149 offer price.
 */
export function calculateBaseSessionPrice(selectedAreas: TreatmentArea[]): number {
  if (isMustHaveOfferCombo(selectedAreas)) return MUST_HAVE_OFFER_PRICE;
  return selectedAreas.reduce((sum, area) => sum + area.price, 0);
}

/**
 * Get the discount percentage for a given package type.
 */
export function getDiscountPercentage(packageType: PackageType): number {
  switch (packageType) {
    case "single": return 0;
    case "four":   return 15;
    case "six":    return 25;
  }
}

export function getSessionCount(packageType: PackageType): number {
  switch (packageType) {
    case "single": return 1;
    case "four":   return 4;
    case "six":    return 6;
  }
}

function getDiscountMultiplier(packageType: PackageType): number {
  switch (packageType) {
    case "single": return 1.0;
    case "four":   return 0.85;
    case "six":    return 0.75;
  }
}

/**
 * Calculate the full pricing summary for selected areas and package.
 */
export function calculatePricingSummary(
  selectedAreas: TreatmentArea[],
  selectedPackage: PackageType | null
): PricingSummary {
  const baseSessionPrice = calculateBaseSessionPrice(selectedAreas);
  const pkg = selectedPackage || "single";
  const sessionCount = getSessionCount(pkg);
  const discountPercentage = getDiscountPercentage(pkg);
  const multiplier = getDiscountMultiplier(pkg);

  const discountedSessionPrice = roundCurrency(baseSessionPrice * multiplier);
  const packageTotal = roundCurrency(discountedSessionPrice * sessionCount);
  const fullPrice = baseSessionPrice * sessionCount;
  const savings = roundCurrency(fullPrice - packageTotal);

  return {
    baseSessionPrice,
    sessionCount,
    discountPercentage,
    discountedSessionPrice,
    packageTotal,
    savings,
    depositAmount: DEPOSIT_AMOUNT,
  };
}

/**
 * Calculate package price for display on package cards.
 */
export function calculatePackagePrice(
  selectedAreas: TreatmentArea[],
  packageType: PackageType
): { perSession: number; total: number; savings: number; sessionCount: number } {
  const summary = calculatePricingSummary(selectedAreas, packageType);
  return {
    perSession: summary.discountedSessionPrice,
    total: summary.packageTotal,
    savings: summary.savings,
    sessionCount: summary.sessionCount,
  };
}

/**
 * Lowest advertisable prices for marketing copy (landing page, trust header),
 * derived from the cheapest treatment area rather than a hardcoded figure —
 * so the copy can't drift out of sync with the actual area/package pricing.
 */
export function getStartingPrices(areas: TreatmentArea[]): {
  singleSessionFrom: number;
  packageSessionFrom: number;
} {
  const cheapestArea = areas.reduce((min, area) => (area.price < min.price ? area : min), areas[0]);
  return {
    singleSessionFrom: cheapestArea.price,
    packageSessionFrom: calculatePackagePrice([cheapestArea], "six").perSession,
  };
}