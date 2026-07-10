import type {
  TreatmentConcern,
  TreatmentGoal,
  ProductPreference,
  ProductConfig,
  NumericRange,
  EstimateSummary,
  OverlapRule,
  DepositConfig,
  AppointmentType,
} from "../types/booking";

export const products: ProductConfig[] = [
  { id: "botox", name: "Botox Cosmetic", pricingModel: "per-unit", pricePerUnit: 14 },
  { id: "dysport", name: "Dysport", pricingModel: "per-unit", pricePerUnit: 5 },
  { id: "xeomin", name: "Xeomin", pricingModel: "per-unit", pricePerUnit: 13 },
];

export const concerns: TreatmentConcern[] = [
  { id: "forehead-lines", name: "Forehead Lines", category: "Upper Face", description: "Horizontal lines across the forehead", estimateRange: { min: 8, max: 20 } },
  { id: "frown-lines", name: "Frown Lines", category: "Upper Face", description: "Lines between the eyebrows", estimateRange: { min: 15, max: 30 } },
  { id: "crows-feet", name: "Crow's Feet", category: "Upper Face", description: "Lines around the outer eyes", estimateRange: { min: 12, max: 30 } },
  { id: "bunny-lines", name: "Bunny Lines", category: "Mid Face", description: "Lines along the sides of the nose", estimateRange: { min: 4, max: 10 } },
  { id: "lip-flip", name: "Lip Flip", category: "Lower Face", description: "Subtle upper-lip enhancement", estimateRange: { min: 4, max: 8 } },
  { id: "gummy-smile", name: "Gummy Smile", category: "Lower Face", description: "Reduce excessive gum display", estimateRange: { min: 4, max: 8 } },
  { id: "chin-dimpling", name: "Chin Dimpling", category: "Lower Face", description: "Smooth an orange-peel chin texture", estimateRange: { min: 4, max: 10 } },
  { id: "downturned-mouth", name: "Downturned Mouth", category: "Lower Face", description: "Soften downward pull at the mouth corners", estimateRange: { min: 4, max: 10 } },
  { id: "jawline-slimming", name: "Jawline Slimming", category: "Jaw & Neck", description: "Masseter treatment for a slimmer jaw appearance", estimateRange: { min: 30, max: 60 } },
  { id: "neck-bands", name: "Neck Bands", category: "Jaw & Neck", description: "Soften visible vertical neck bands", estimateRange: { min: 20, max: 50 } },
  { id: "excessive-sweating", name: "Excessive Sweating", category: "Other", description: "Consultation for underarm sweating", estimateRange: { min: 50, max: 100 }, consultationRequired: true },
  { id: "not-sure", name: "Not Sure", category: "Consultation", description: "Let the provider recommend a treatment plan", estimateRange: null },
];

export const goalOptions = [
  { id: "very-natural" as TreatmentGoal, name: "Very Natural", description: "Subtle softening while preserving more movement", multiplier: 0.8 },
  { id: "balanced" as TreatmentGoal, name: "Balanced", description: "Noticeable smoothing with natural facial movement", multiplier: 1.0, badge: "Most Popular" },
  { id: "maximum-smoothing" as TreatmentGoal, name: "Maximum Smoothing", description: "Stronger correction with less movement in treated areas", multiplier: 1.15 },
  { id: "provider-recommendation" as TreatmentGoal, name: "Provider Recommendation", description: "I'm not sure—recommend the best approach after assessment", multiplier: 1.0 },
];

export const overlapRules: OverlapRule[] = [
  { concernIds: ["forehead-lines", "frown-lines"], adjustmentMultiplier: 0.9 },
  { concernIds: ["forehead-lines", "frown-lines", "crows-feet"], adjustmentMultiplier: 0.88 },
];

export const depositConfig: DepositConfig = {
  standardTreatment: 50,
  consultationOnly: 0,
  providerReview: 0,
};

export function calculateConcernEstimateRange(concernIds: string[]): NumericRange | null {
  const selectedConcerns = concerns.filter((c) => concernIds.includes(c.id));
  if (selectedConcerns.length === 0) return null;

  const hasNotSure = concernIds.includes("not-sure");
  if (hasNotSure) return null;

  let min = 0;
  let max = 0;

  for (const concern of selectedConcerns) {
    if (concern.estimateRange) {
      min += concern.estimateRange.min;
      max += concern.estimateRange.max;
    }
  }

  if (min === 0 && max === 0) return null;
  return { min, max };
}

export function applyOverlapAdjustment(range: NumericRange, concernIds: string[]): NumericRange {
  let bestMultiplier = 1.0;

  for (const rule of overlapRules) {
    const allPresent = rule.concernIds.every((id) => concernIds.includes(id));
    if (allPresent && rule.adjustmentMultiplier < bestMultiplier) {
      bestMultiplier = rule.adjustmentMultiplier;
    }
  }

  return {
    min: Math.round(range.min * bestMultiplier),
    max: Math.round(range.max * bestMultiplier),
  };
}

export function applyGoalMultiplier(range: NumericRange, goal: TreatmentGoal): NumericRange {
  const goalOption = goalOptions.find((g) => g.id === goal);
  const multiplier = goalOption?.multiplier ?? 1.0;

  return {
    min: Math.round(range.min * multiplier),
    max: Math.round(range.max * multiplier),
  };
}

export function calculateProductPriceRange(unitRange: NumericRange, productPreference: ProductPreference): NumericRange {
  const product = getProductForPreference(productPreference);
  return {
    min: Math.round(unitRange.min * product.pricePerUnit),
    max: Math.round(unitRange.max * product.pricePerUnit),
  };
}

function getProductForPreference(preference: ProductPreference): ProductConfig {
  if (preference === "no-preference") {
    return products.find((p) => p.id === "botox")!;
  }
  return products.find((p) => p.id === preference) ?? products[0];
}

export function getEstimatedDuration(concernCount: number): number {
  if (concernCount <= 1) return 15;
  if (concernCount <= 3) return 30;
  return 45;
}

export function getDepositAmount(appointmentType: AppointmentType): number {
  switch (appointmentType) {
    case "consultation-only":
      return depositConfig.consultationOnly;
    case "provider-review":
      return depositConfig.providerReview;
    default:
      return depositConfig.standardTreatment;
  }
}

export function calculateEstimateSummary(
  concernIds: string[],
  goal: TreatmentGoal | null,
  productPreference: ProductPreference,
  appointmentType: AppointmentType,
  providerReviewRequired: boolean
): EstimateSummary {
  const hasConsultationRequired = concerns
    .filter((c) => concernIds.includes(c.id))
    .some((c) => c.consultationRequired);

  const baseRange = calculateConcernEstimateRange(concernIds);

  let estimatedUnits: NumericRange | null = null;
  let estimatedPrice: NumericRange | null = null;

  if (baseRange && goal) {
    const adjustedRange = applyOverlapAdjustment(baseRange, concernIds);
    estimatedUnits = applyGoalMultiplier(adjustedRange, goal);
    estimatedPrice = calculateProductPriceRange(estimatedUnits, productPreference);
  }

  return {
    referenceProductId: productPreference === "no-preference" ? "botox" : productPreference,
    selectedConcernCount: concernIds.length,
    estimatedUnits,
    estimatedPrice,
    selectedProductPreference: productPreference,
    estimatedDurationMinutes: getEstimatedDuration(concernIds.length),
    consultationRequired: hasConsultationRequired,
    providerReviewRequired,
    depositAmount: getDepositAmount(appointmentType),
    disclaimer: "This is an estimate only. Actual product, dosage, and price may change after your provider evaluates your facial anatomy, muscle strength, goals, and treatment history.",
  };
}

export function formatEstimateRange(range: NumericRange | null, prefix: string = ""): string {
  if (!range) return "To be determined";
  return `${prefix}${range.min}–${range.max}`;
}

export function getProductLabel(preference: ProductPreference): string {
  if (preference === "no-preference") return "Provider recommendation";
  const product = products.find((p) => p.id === preference);
  return product?.name ?? "Provider recommendation";
}