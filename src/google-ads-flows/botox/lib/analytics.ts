import { track } from "@/lib/track";
import type { AttributionData } from "../types/booking";

export const botoxAnalytics = {
  trackFlowStarted: (attribution: AttributionData) => {
    track("botox_booking_flow_started", {
      gclid: attribution.gclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid,
    });
  },

  trackConcernSelected: (concernIds: string[]) => {
    track("botox_concern_selected", { concernIds, concernCount: concernIds.length });
  },

  trackGoalSelected: (goal: string) => {
    track("botox_goal_selected", { goal });
  },

  trackStepCompleted: (step: number, timeSeconds: number, data?: Record<string, string | number | boolean>) => {
    track("botox_step_completed", { step, time_on_step_seconds: timeSeconds, ...data });
  },

  trackContactInfoEntered: () => {
    track("botox_contact_info_entered");
  },

  trackDateTimeSelected: (date: string, time: string) => {
    track("botox_datetime_selected", { appointment_date: date, appointment_time: time });
  },

  trackBookingCompleted: (data: { appointmentType: string; depositAmount: number }) => {
    track("botox_booking_completed", { ...data });
  },

  trackBookingError: (errorMessage: string) => {
    track("botox_booking_error", { error_message: errorMessage });
  },

  trackPageExit: (step: number, timeOnPageSeconds: number) => {
    track("botox_page_exit", { step, time_on_page_seconds: timeOnPageSeconds });
  },

  trackScrollDepth: (depth: number) => {
    track("botox_scroll_depth", { depth_percent: depth });
  },

  trackFormFieldFocus: (fieldName: string) => {
    track("botox_form_field_focus", { field_name: fieldName });
  },

  trackFormFieldChange: (fieldName: string) => {
    track("botox_form_field_change", { field_name: fieldName });
  },

  trackFormError: (fieldName: string, error: string) => {
    track("botox_form_error", { field_name: fieldName, error_message: error });
  },
};
