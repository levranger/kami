import { track } from "@/lib/track";
import type { AttributionData, PackageType } from "../types/booking";

export const laserAnalytics = {
  trackFlowStarted: (attribution: AttributionData) => {
    track("laser_booking_flow_started", {
      gclid: attribution.gclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid,
    });
  },

  trackAreaSelected: (areaIds: string[]) => {
    track("laser_area_selected", { areaIds, numberOfAreas: areaIds.length });
  },

  trackPackageSelected: (packageType: PackageType, sessionsCount: number, totalPrice: number) => {
    track("laser_package_selected", { packageType, sessions: sessionsCount, totalPrice });
  },

  trackStepCompleted: (step: number, timeSeconds: number, data?: Record<string, string | number | boolean>) => {
    track("laser_step_completed", { step, time_on_step_seconds: timeSeconds, ...data });
  },

  trackContactInfoEntered: (isNewPatient: boolean, screeningReviewRequired: boolean) => {
    track("laser_contact_info_entered", { isNewPatient, screeningReviewRequired });
  },

  trackDateTimeSelected: (date: string, time: string) => {
    track("laser_datetime_selected", { appointment_date: date, appointment_time: time });
  },

  trackBookingCompleted: (data: { packageType: PackageType; packageTotal: number }) => {
    track("laser_booking_completed", { ...data });
  },

  trackBookingError: (errorMessage: string) => {
    track("laser_booking_error", { error_message: errorMessage });
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
