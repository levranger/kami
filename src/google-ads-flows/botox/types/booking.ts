export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6;

export type TreatmentGoal =
  | "very-natural"
  | "balanced"
  | "maximum-smoothing"
  | "provider-recommendation";

export type AppointmentType =
  | "wrinkle-relaxer-treatment"
  | "consultation-and-treatment"
  | "consultation-only"
  | "provider-review";

export type ProductPreference =
  | "no-preference"
  | "botox"
  | "dysport"
  | "xeomin";

export type ProductSelectionMode =
  | "provider-decides"
  | "patient-preference"
  | "single-product";

export interface NumericRange {
  min: number;
  max: number;
}

export interface TreatmentConcern {
  id: string;
  name: string;
  category: string;
  description: string;
  estimateRange: NumericRange | null;
  consultationRequired?: boolean;
}

export interface ProductConfig {
  id: string;
  name: string;
  pricingModel: "per-unit";
  pricePerUnit: number;
}

export interface OverlapRule {
  concernIds: string[];
  adjustmentMultiplier: number;
}

export interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
  isNewPatient: boolean;
  hasSensitiveSkin: boolean;
}

export interface AttributionData {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingVariant?: string;
  referrer?: string;
  landingPageUrl?: string;
  funnelStartedAt?: string;
}

export interface EstimateSummary {
  referenceProductId: string;
  selectedConcernCount: number;
  estimatedUnits: NumericRange | null;
  estimatedPrice: NumericRange | null;
  selectedProductPreference: ProductPreference;
  estimatedDurationMinutes: number;
  consultationRequired: boolean;
  providerReviewRequired: boolean;
  depositAmount: number;
  disclaimer: string;
}

export interface TreatmentGoalOption {
  id: TreatmentGoal;
  name: string;
  description: string;
  multiplier: number;
  badge?: string;
}

export interface AvailableDate {
  date: string;
  dayOfWeek: string;
  available: boolean;
  slots: number;
}

export interface AvailableTime {
  time: string;
  display: string;
  available: boolean;
}

export interface AvailabilityProvider {
  getAvailableDates(appointmentType: AppointmentType): Promise<AvailableDate[]>;
  getAvailableTimes(
    date: string,
    appointmentType: AppointmentType
  ): Promise<AvailableTime[]>;
}

export interface BeforeAfterImage {
  id: string;
  concern: string;
  beforeImage: string;
  afterImage: string;
  timeline: string;
  testimonial: string;
}

export interface DepositConfig {
  standardTreatment: number;
  consultationOnly: number;
  providerReview: number;
}

export interface BookingState {
  currentStep: BookingStep;
  selectedConcerns: string[];
  selectedGoal: TreatmentGoal | null;
  selectedProductPreference: ProductPreference;
  contactInfo: ContactInfo;
  appointmentType: AppointmentType;
  selectedDate: string | null;
  selectedTime: string | null;
  marketingConsent: boolean;
  attribution: AttributionData;
  estimateSummary: EstimateSummary | null;
  estimateAcknowledged: boolean;
  leadId: string | null;
  bookingRequestId: string | null;
}

export interface BookingApiAdapter {
  submitPartialLead(data: {
    contactInfo: ContactInfo;
    concerns: string[];
    goal: TreatmentGoal | null;
    attribution: AttributionData;
  }): Promise<{ leadId: string }>;

  submitBookingRequest(data: {
    contactInfo: ContactInfo;
    concerns: string[];
    goal: TreatmentGoal | null;
    productPreference: ProductPreference;
    appointmentType: AppointmentType;
    selectedDate: string;
    selectedTime: string;
    marketingConsent: boolean;
    attribution: AttributionData;
    estimateSummary: EstimateSummary | null;
  }): Promise<{ bookingRequestId: string }>;

  revalidateSlot(date: string, time: string, appointmentType: AppointmentType): Promise<{ available: boolean }>;
}