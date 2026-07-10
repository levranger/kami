type BotoxEventName =
  | "botox_booking_flow_started"
  | "botox_concern_selected"
  | "botox_goal_selected"
  | "botox_estimate_viewed"
  | "botox_contact_completed"
  | "botox_screening_completed"
  | "botox_slot_selected"
  | "botox_review_viewed"
  | "botox_booking_request_submitted"
  | "botox_booking_request_completed"
  | "botox_booking_error";

interface EventProperties {
  step?: number;
  concernIds?: string[];
  concernCount?: number;
  treatmentGoal?: string;
  productPreference?: string;
  estimatedUnitBucket?: string;
  estimatedPriceBucket?: string;
  appointmentType?: string;
  depositAmount?: number;
  providerReviewRequired?: boolean;
  isNewPatient?: boolean;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  errorMessage?: string;
}

function isGAAvailable(): boolean {
  return typeof window !== "undefined" && typeof (window as unknown as Record<string, unknown>).gtag === "function";
}

export function trackEvent(eventName: BotoxEventName, properties?: EventProperties): void {
  if (isGAAvailable()) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", eventName, properties);
  } else if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, properties);
  }
}

export function trackFlowStarted(attribution: { gclid?: string; gbraid?: string; wbraid?: string }): void {
  trackEvent("botox_booking_flow_started", { ...attribution });
}

export function trackConcernSelected(concernIds: string[]): void {
  trackEvent("botox_concern_selected", { concernIds, concernCount: concernIds.length });
}

export function trackGoalSelected(goal: string): void {
  trackEvent("botox_goal_selected", { treatmentGoal: goal });
}

export function trackEstimateViewed(priceBucket: string, unitBucket: string): void {
  trackEvent("botox_estimate_viewed", { estimatedPriceBucket: priceBucket, estimatedUnitBucket: unitBucket });
}

export function trackBookingCompleted(appointmentType: string, depositAmount: number): void {
  trackEvent("botox_booking_request_completed", { appointmentType, depositAmount });
}

export function trackBookingError(errorMessage: string): void {
  trackEvent("botox_booking_error", { errorMessage });
}