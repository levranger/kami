import type { TreatmentArea, PackageType, PricingSummary } from "../types/booking";
import { DEPOSIT_AMOUNT } from "../types/booking";

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
 * Calculate the base single-session price from selected areas.
 */
export function calculateBaseSessionPrice(selectedAreas: TreatmentArea[]): number {
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
  const remainingBalance = roundCurrency(packageTotal - DEPOSIT_AMOUNT);

  return {
    baseSessionPrice,
    sessionCount,
    discountPercentage,
    discountedSessionPrice,
    packageTotal,
    savings,
    depositAmount: DEPOSIT_AMOUNT,
    remainingBalance: Math.max(0, remainingBalance),
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