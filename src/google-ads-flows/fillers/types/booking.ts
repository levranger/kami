export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6;

export type TreatmentGoal =
  | "subtle-refresh"
  | "balanced-enhancement"
  | "more-defined"
  | "provider-recommendation";

export type AppointmentType =
  | "filler-consultation-and-possible-treatment"
  | "filler-consultation-only"
  | "filler-provider-review"
  | "filler-correction-consultation"
  | "manual-clinic-review";

export interface NumericRange {
  min: number;
  max: number;
}

export interface FillerTreatmentArea {
  id: string;
  name: string;
  category: string;
  description: string;
  estimateRange: NumericRange | null;
  consultationRequired?: boolean;
  automatedEstimateDisabled?: boolean;
}

export interface FillerProduct {
  id: string;
  displayName: string;
  pricePerSyringe: number;
  enabled: boolean;
}

export interface OverlapRule {
  areaIds: string[];
  adjustmentMultiplier: number;
}

export interface TreatmentGoalOption {
  id: TreatmentGoal;
  name: string;
  description: string;
  multiplier: number;
  badge?: string;
}

export interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
  isNewPatient: boolean;
  hasSensitiveSkin: boolean;
}

export interface EstimateSummary {
  estimatedSyringes: NumericRange | null;
  estimatedPrice: NumericRange | null;
  consultationRequired: boolean;
  providerReviewRequired: boolean;
  automatedEstimateDisabled: boolean;
  estimatedDurationMinutes: number;
  depositAmount: number;
  disclaimer: string;
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

export interface SlotValidationResult {
  available: boolean;
  message?: string;
}

export interface AvailabilityProvider {
  getAvailableDates(appointmentType: AppointmentType): Promise<AvailableDate[]>;
  getAvailableTimes(date: string, appointmentType: AppointmentType): Promise<AvailableTime[]>;
  revalidateSlot(date: string, time: string, appointmentType: AppointmentType): Promise<SlotValidationResult>;
}

export interface DepositConfig {
  standardConsultationAndPossibleTreatment: number;
  consultationOnly: number;
  providerReview: number;
  correctionConsultation: number;
  manualReview: number;
}

export interface BookingState {
  currentStep: BookingStep;
  selectedAreas: string[];
  selectedGoal: TreatmentGoal | null;
  estimateAcknowledged: boolean;
  contactInfo: ContactInfo;
  appointmentType: AppointmentType;
  selectedDate: string | null;
  selectedTime: string | null;
  marketingConsent: boolean;
  attributionToken: string | null;
  estimateSummary: EstimateSummary | null;
  bookingRequestId: string | null;
}

export interface BookingApiAdapter {
  submitPartialLead(data: {
    contactInfo: ContactInfo;
    areas: string[];
    goal: TreatmentGoal | null;
    attributionToken: string | null;
  }): Promise<{ leadId: string }>;

  submitBookingRequest(data: {
    contactInfo: ContactInfo;
    areas: string[];
    goal: TreatmentGoal | null;
    appointmentType: AppointmentType;
    selectedDate: string;
    selectedTime: string;
    marketingConsent: boolean;
    attributionToken: string | null;
    estimateSummary: EstimateSummary | null;
  }): Promise<{ bookingRequestId: string }>;
}