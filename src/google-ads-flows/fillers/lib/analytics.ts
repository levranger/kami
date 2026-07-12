import { track } from "@/lib/track";
import type { AppointmentType, TreatmentGoal } from "../types/booking";

export const fillersAnalytics = {
  trackAreaSelected: (areaIds: string[]) => {
    track("fillers_area_selected", { areaIds, areaCount: areaIds.length });
  },

  trackGoalSelected: (goal: TreatmentGoal) => {
    track("fillers_goal_selected", { goal });
  },

  trackStepCompleted: (step: number, timeSeconds: number, data?: Record<string, string | number | boolean>) => {
    track("fillers_step_completed", { step, time_on_step_seconds: timeSeconds, ...data });
  },

  trackContactInfoEntered: () => {
    track("fillers_contact_info_entered");
  },

  trackDateTimeSelected: (date: string, time: string) => {
    track("fillers_datetime_selected", { appointment_date: date, appointment_time: time });
  },

  trackBookingCompleted: (data: { appointmentType: AppointmentType; depositAmount?: number }) => {
    track("fillers_booking_completed", { ...data });
  },

  trackBookingError: (errorMessage: string) => {
    track("fillers_booking_error", { error_message: errorMessage });
  },

  trackPageExit: (step: number, timeOnPageSeconds: number) => {
    track("fillers_page_exit", { step, time_on_page_seconds: timeOnPageSeconds });
  },

  trackScrollDepth: (depth: number) => {
    track("fillers_scroll_depth", { depth_percent: depth });
  },

  trackFormFieldFocus: (fieldName: string) => {
    track("fillers_form_field_focus", { field_name: fieldName });
  },

  trackFormFieldChange: (fieldName: string) => {
    track("fillers_form_field_change", { field_name: fieldName });
  },

  trackFormError: (fieldName: string, error: string) => {
    track("fillers_form_error", { field_name: fieldName, error_message: error });
  },
};
