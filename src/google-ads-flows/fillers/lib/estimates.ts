import type {
  NumericRange,
  TreatmentGoal,
  AppointmentType,
  EstimateSummary,
} from "../types/booking";
import {
  fillerTreatmentAreas,
  goalOptions,
  overlapRules,
  depositConfig,
  DEFAULT_PRICE_PER_SYRINGE,
  SYRINGE_ROUND_INCREMENT,
} from "./config";

export function calculateAreaEstimate(areaIds: string[]): NumericRange | null {
  const areas = fillerTreatmentAreas.filter((a) => areaIds.includes(a.id));
  if (areas.length === 0) return null;

  // If any area disables automated estimates, return null
  if (areas.some((a) => a.automatedEstimateDisabled)) return null;

  // If facial-balancing is selected, use its range only (don't double-count)
  const hasFacialBalancing = areaIds.includes("facial-balancing");
  if (hasFacialBalancing) {
    const fb = fillerTreatmentAreas.find((a) => a.id === "facial-balancing");
    return fb?.estimateRange ?? null;
  }

  let min = 0;
  let max = 0;
  for (const area of areas) {
    if (area.estimateRange) {
      min += area.estimateRange.min;
      max += area.estimateRange.max;
    }
  }

  if (min === 0 && max === 0) return null;
  return { min, max };
}

export function applyOverlapRules(range: NumericRange, areaIds: string[]): NumericRange {
  let bestMultiplier = 1.0;
  for (const rule of overlapRules) {
    const allPresent = rule.areaIds.every((id) => areaIds.includes(id));
    if (allPresent && rule.adjustmentMultiplier < bestMultiplier) {
      bestMultiplier = rule.adjustmentMultiplier;
    }
  }
  return {
    min: roundSyringe(range.min * bestMultiplier),
    max: roundSyringe(range.max * bestMultiplier),
  };
}

export function applyGoalMultiplier(range: NumericRange, goal: TreatmentGoal): NumericRange {
  const option = goalOptions.find((g) => g.id === goal);
  const multiplier = option?.multiplier ?? 1.0;
  return {
    min: roundSyringe(range.min * multiplier),
    max: roundSyringe(range.max * multiplier),
  };
}

export function calculatePriceRange(syringeRange: NumericRange): NumericRange {
  return {
    min: Math.round(syringeRange.min * DEFAULT_PRICE_PER_SYRINGE),
    max: Math.round(syringeRange.max * DEFAULT_PRICE_PER_SYRINGE),
  };
}

export function calculateAppointmentDuration(areaCount: number, consultationRequired: boolean): number {
  if (consultationRequired) return 60;
  if (areaCount <= 1) return 30;
  if (areaCount <= 3) return 45;
  return 60;
}

export function getDepositAmount(appointmentType: AppointmentType): number {
  switch (appointmentType) {
    case "filler-consultation-and-possible-treatment":
      return depositConfig.standardConsultationAndPossibleTreatment;
    case "filler-consultation-only":
      return depositConfig.consultationOnly;
    case "filler-provider-review":
      return depositConfig.providerReview;
    case "filler-correction-consultation":
      return depositConfig.correctionConsultation;
    case "manual-clinic-review":
      return depositConfig.manualReview;
    default:
      return 0;
  }
}

export function calculateEstimateSummary(
  areaIds: string[],
  goal: TreatmentGoal | null,
  appointmentType: AppointmentType
): EstimateSummary {
  const areas = fillerTreatmentAreas.filter((a) => areaIds.includes(a.id));
  const consultationRequired = areas.some((a) => a.consultationRequired);
  const automatedEstimateDisabled = areas.some((a) => a.automatedEstimateDisabled);
  const hasNotSure = areaIds.includes("not-sure");
  const hasCorrectionDissolution = areaIds.includes("correction-dissolution");

  const providerReviewRequired = consultationRequired || hasNotSure || hasCorrectionDissolution;

  let estimatedSyringes: NumericRange | null = null;
  let estimatedPrice: NumericRange | null = null;

  if (!automatedEstimateDisabled && !hasNotSure && !hasCorrectionDissolution && goal) {
    const baseRange = calculateAreaEstimate(areaIds);
    if (baseRange) {
      const adjusted = applyOverlapRules(baseRange, areaIds);
      estimatedSyringes = applyGoalMultiplier(adjusted, goal);
      // Ensure min is at least 0.5
      if (estimatedSyringes.min < 0.5) estimatedSyringes.min = 0.5;
      estimatedPrice = calculatePriceRange(estimatedSyringes);
    }
  }

  return {
    estimatedSyringes,
    estimatedPrice,
    consultationRequired,
    providerReviewRequired,
    automatedEstimateDisabled,
    estimatedDurationMinutes: calculateAppointmentDuration(areaIds.length, consultationRequired),
    depositAmount: getDepositAmount(appointmentType),
    disclaimer: "This estimate is not a treatment plan or guarantee. The final recommendation and price may change after your provider evaluates your anatomy, skin, medical history, prior treatments, goals, and product suitability.",
  };
}

export function formatSyringeRange(range: NumericRange | null): string {
  if (!range) return "To be determined";
  if (range.min === range.max) return `${range.min} syringe${range.min !== 1 ? "s" : ""}`;
  return `${range.min}–${range.max} syringes`;
}

export function formatCurrencyRange(range: NumericRange | null): string {
  if (!range) return "To be determined";
  return `$${range.min.toLocaleString()}–$${range.max.toLocaleString()}`;
}

function roundSyringe(value: number): number {
  return Math.round(value / SYRINGE_ROUND_INCREMENT) * SYRINGE_ROUND_INCREMENT;
}