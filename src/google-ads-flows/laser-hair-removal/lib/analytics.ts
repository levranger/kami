import { track } from "@/lib/track";
import type { AttributionData, PackageType, EntryMode } from "../types/booking";

// Centralized experiment metadata for the current laser funnel A/B test.
export const LASER_EXPERIMENT_ID = "laser_step_order_v1";
export const LASER_VARIANT_ID = "contact_before_datetime";

// Funnel events read the variant through this function rather than the
// constant directly, so a future dynamic assignment (cookie, experiment
// SDK, etc.) only needs to change this one place.
function getVariantId(): string {
  return LASER_VARIANT_ID;
}

function experimentParams() {
  return { experiment_id: LASER_EXPERIMENT_ID, variant_id: getVariantId() };
}

// Separate, independent A/B test: does paid traffic convert better skipping
// straight to Step 1 (?start=booking) vs. seeing the marketing hero first?
// Kept distinct from LASER_EXPERIMENT_ID above (that one tests step order
// *within* the funnel) — this one only tags the entry-point events.
export const ENTRY_EXPERIMENT_ID = "laser_entry_page_v1";
export const ENTRY_VARIANT_DIRECT_TO_AREA_SELECTION = "direct_to_area_selection";
export const ENTRY_VARIANT_HERO_BEFORE_BOOKING = "hero_before_booking";

function entryExperimentParams(entryMode: EntryMode) {
  return {
    experiment_id: ENTRY_EXPERIMENT_ID,
    variant_id:
      entryMode === "booking" ? ENTRY_VARIANT_DIRECT_TO_AREA_SELECTION : ENTRY_VARIANT_HERO_BEFORE_BOOKING,
  };
}

// Names/numbers used for laser_step_viewed, keyed by BookingStep (1-5) plus
// a synthetic step 6 for the post-submit confirmation screen.
export const STEP_VIEW_NAMES: Record<number, string> = {
  1: "areas",
  2: "package",
  3: "contact",
  4: "datetime",
  5: "review",
  6: "confirmation",
};

export const laserAnalytics = {
  trackLandingView: (attribution: { gclid?: string; gbraid?: string; wbraid?: string }) => {
    track("laser_landing_view", {
      landing_page: "laser_hair_removal",
      gclid: attribution.gclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid,
      ...experimentParams(),
    });
  },

  trackFlowStarted: (attribution: AttributionData, entryMode: EntryMode) => {
    track("laser_booking_flow_started", {
      gclid: attribution.gclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid,
      ...entryExperimentParams(entryMode),
    });
  },

  trackAreaSelected: (areaIds: string[]) => {
    track("laser_area_selected", {
      // Pipe-delimited so GA4 can report on it as a plain string dimension.
      area_ids: areaIds.join("|"),
      number_of_areas: areaIds.length,
      ...experimentParams(),
    });
  },

  trackPackageSelected: (packageType: PackageType, sessionsCount: number, totalPrice: number) => {
    track("laser_package_selected", {
      package_type: packageType,
      sessions: sessionsCount,
      total_price: totalPrice,
      ...experimentParams(),
    });
  },

  trackStepCompleted: (step: number, timeSeconds: number, data?: Record<string, string | number | boolean>) => {
    track("laser_step_completed", { step, time_on_step_seconds: timeSeconds, ...data });
  },

  trackContactInfoEntered: (isNewPatient: boolean, screeningReviewRequired: boolean) => {
    track("laser_contact_info_entered", {
      is_new_patient: isNewPatient,
      screening_review_required: screeningReviewRequired,
      ...experimentParams(),
    });
  },

  trackDateTimeSelected: (date: string, time: string) => {
    track("laser_datetime_selected", {
      appointment_date: date,
      appointment_time: time,
      ...experimentParams(),
    });
  },

  trackBookingCompleted: (data: {
    packageType: PackageType;
    sessions: number;
    packageTotal: number;
    areaIds: string[];
    isNewPatient: boolean;
  }) => {
    track("laser_booking_completed", {
      package_type: data.packageType,
      sessions: data.sessions,
      package_total: data.packageTotal,
      // Requested package price at submit time, not confirmed/collected revenue.
      value: data.packageTotal,
      currency: "USD",
      area_ids: data.areaIds.join("|"),
      number_of_areas: data.areaIds.length,
      is_new_patient: data.isNewPatient,
      ...experimentParams(),
    });
  },

  trackBookingError: (errorMessage: string) => {
    track("laser_booking_error", { error_message: errorMessage, ...experimentParams() });
  },

  // `entryMode` is only meaningful (and only passed) for step 1 — that's the
  // screen affected by the hero-vs-direct entry test. Later steps keep the
  // step-order experiment tag via experimentParams(), unchanged.
  trackStepViewed: (stepName: string, stepNumber: number, entryMode?: EntryMode) => {
    track("laser_step_viewed", {
      step_name: stepName,
      step_number: stepNumber,
      ...(stepNumber === 1 && entryMode ? entryExperimentParams(entryMode) : experimentParams()),
    });
  },

  trackPageExit: (step: number, timeOnPageSeconds: number) => {
    track("laser_page_exit", { step, time_on_page_seconds: timeOnPageSeconds });
  },

  trackScrollDepth: (depth: number) => {
    track("laser_scroll_depth", { depth_percent: depth });
  },

  trackFormFieldFocus: (fieldName: string) => {
    track("laser_form_field_focus", { field_name: fieldName });
  },

  trackFormFieldChange: (fieldName: string) => {
    track("laser_form_field_change", { field_name: fieldName });
  },

  trackFormError: (fieldName: string, error: string) => {
    track("laser_form_error", { field_name: fieldName, error_message: error });
  },
};
