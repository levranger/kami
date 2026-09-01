import { track } from "@/lib/track";
import type { AttributionData } from "../types/booking";
import { BOTOX_REQUEST_META } from "./botoxOffer";

function campaignMeta() {
  return {
    service: BOTOX_REQUEST_META.service,
    offer: BOTOX_REQUEST_META.offer,
    source: BOTOX_REQUEST_META.source,
    campaign: BOTOX_REQUEST_META.campaign,
  };
}

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

  // ─── $10/unit promo landing page ───

  trackOfferCtaClick: (placement: string) => {
    track("botox_offer_cta_click", { placement });
  },

  trackProviderViewed: () => {
    track("botox_provider_viewed");
  },

  trackReviewsClicked: () => {
    track("botox_reviews_clicked");
  },

  trackCallClicked: (location: string) => {
    track("botox_call_clicked", { location, ...campaignMeta() });
  },

  trackMainSiteClicked: (location: string) => {
    track("botox_main_site_clicked", { location });
  },

  // ─── On-site appointment-request flow (manual confirmation) ───

  trackRequestStarted: (placement: string, attribution: AttributionData) => {
    track("botox_request_started", {
      placement,
      gclid: attribution.gclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid,
      ...campaignMeta(),
    });
  },

  trackRequestStepCompleted: (step: number, stepName: string) => {
    track("botox_request_step_completed", { step, step_name: stepName, ...campaignMeta() });
  },

  trackRequestSubmitted: (data: { treatmentArea?: string | null; attribution: AttributionData }) => {
    track("botox_request_submitted", {
      treatment_area: data.treatmentArea || "not_specified",
      gclid: data.attribution.gclid,
      gbraid: data.attribution.gbraid,
      wbraid: data.attribution.wbraid,
      utm_source: data.attribution.utmSource,
      utm_medium: data.attribution.utmMedium,
      utm_campaign: data.attribution.utmCampaign,
      utm_content: data.attribution.utmContent,
      ...campaignMeta(),
    });
  },

  trackRequestSuccess: (requestId: string) => {
    track("botox_request_success", { request_id: requestId, ...campaignMeta() });
  },

  trackRequestError: (errorMessage: string) => {
    track("botox_request_error", { error_message: errorMessage, ...campaignMeta() });
  },
};
