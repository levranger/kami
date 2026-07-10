import type {
  FillerTreatmentArea,
  FillerProduct,
  OverlapRule,
  TreatmentGoalOption,
  TreatmentGoal,
  DepositConfig,
} from "../types/booking";

export const fillerTreatmentAreas: FillerTreatmentArea[] = [
  { id: "lips", name: "Lips", category: "Lips & Mouth", description: "Enhance shape, definition, symmetry, or volume", estimateRange: { min: 0.5, max: 1 } },
  { id: "lip-lines", name: "Lines Around the Lips", category: "Lips & Mouth", description: "Discuss softening vertical lines around the lips", estimateRange: { min: 0.5, max: 1 } },
  { id: "smile-lines", name: "Smile Lines", category: "Lips & Mouth", description: "Discuss support around the nose and mouth", estimateRange: { min: 1, max: 2 } },
  { id: "marionette-lines", name: "Lines Below the Mouth", category: "Lips & Mouth", description: "Discuss support around the lower mouth", estimateRange: { min: 1, max: 2 } },
  { id: "cheeks", name: "Cheeks", category: "Midface", description: "Restore or enhance cheek contour and support", estimateRange: { min: 1, max: 2 } },
  { id: "under-eyes", name: "Under-Eyes", category: "Midface", description: "Consultation for under-eye hollows", estimateRange: null, consultationRequired: true, automatedEstimateDisabled: true },
  { id: "chin", name: "Chin", category: "Profile", description: "Improve chin projection, proportion, or contour", estimateRange: { min: 1, max: 2 } },
  { id: "jawline", name: "Jawline", category: "Profile", description: "Enhance lower-face definition and balance", estimateRange: { min: 2, max: 4 } },
  { id: "temples", name: "Temples", category: "Upper Face", description: "Consultation for temple volume loss", estimateRange: null, consultationRequired: true, automatedEstimateDisabled: true },
  { id: "facial-balancing", name: "Facial Balancing", category: "Comprehensive", description: "Discuss a personalized multi-area plan", estimateRange: { min: 2, max: 5 }, consultationRequired: true },
  { id: "correction-dissolution", name: "Filler Correction or Dissolution", category: "Correction", description: "Provider consultation for prior filler concerns", estimateRange: null, consultationRequired: true, automatedEstimateDisabled: true },
  { id: "not-sure", name: "Not Sure", category: "Consultation", description: "Let the provider recommend an appropriate plan", estimateRange: null },
];

export const fillerProducts: FillerProduct[] = [
  { id: "ha-standard", displayName: "Hyaluronic Acid Filler", pricePerSyringe: 750, enabled: true },
  { id: "ha-premium", displayName: "Premium Hyaluronic Acid Filler", pricePerSyringe: 850, enabled: true },
];

export const goalOptions: TreatmentGoalOption[] = [
  { id: "subtle-refresh" as TreatmentGoal, name: "Subtle Refresh", description: "A conservative enhancement that is intentionally understated", multiplier: 0.75 },
  { id: "balanced-enhancement" as TreatmentGoal, name: "Balanced Enhancement", description: "Noticeable improvement while maintaining natural proportions", multiplier: 1.0, badge: "Most Popular" },
  { id: "more-defined" as TreatmentGoal, name: "More Defined", description: "A more visible enhancement or structural contour", multiplier: 1.25 },
  { id: "provider-recommendation" as TreatmentGoal, name: "Provider Recommendation", description: "I'm not sure—recommend an appropriate approach after assessment", multiplier: 1.0 },
];

export const overlapRules: OverlapRule[] = [
  { areaIds: ["cheeks", "smile-lines"], adjustmentMultiplier: 0.85 },
  { areaIds: ["chin", "jawline"], adjustmentMultiplier: 0.9 },
];

export const depositConfig: DepositConfig = {
  standardConsultationAndPossibleTreatment: 50,
  consultationOnly: 0,
  providerReview: 0,
  correctionConsultation: 0,
  manualReview: 0,
};

export const SYRINGE_ROUND_INCREMENT = 0.5;
export const DEFAULT_PRICE_PER_SYRINGE = fillerProducts[0].pricePerSyringe;