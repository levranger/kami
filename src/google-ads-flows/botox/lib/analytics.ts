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
  // ─── Landing page ───────────────────────────────────────────────────────────

  // Fired once on landing-page mount, before any interaction. Reads the ad
  // params from the caller (which pulls them straight off the URL) since the
  // attribution state populates asynchronously.
  trackLandingView: (attribution: {
    gclid?: string;
    gbraid?: string;
    wbraid?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
  }) => {
    track("botox_landing_view", {
      landing_page: "botox",
      gclid: attribution.gclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid,
      utm_source: attribution.utmSource,
      utm_medium: attribution.utmMedium,
      utm_campaign: attribution.utmCampaign,
      utm_content: attribution.utmContent,
      ...campaignMeta(),
    });
  },

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

  // ─── Request flow ────────────────────────────────────────────────────────────

  trackRequestStarted: (placement: string, attribution: AttributionData) => {
    track("botox_request_started", {
      placement,
      gclid: attribution.gclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid,
      ...campaignMeta(),
    });
  },

  trackDateSelected: (date: string) => {
    track("botox_date_selected", { preferred_date: date, ...campaignMeta() });
  },

  trackTimeSelected: (timeWindow: string) => {
    track("botox_time_selected", { preferred_time: timeWindow, ...campaignMeta() });
  },

  trackRequestStepCompleted: (step: number, stepName: string) => {
    track("botox_request_step_completed", { step, step_name: stepName, ...campaignMeta() });
  },

  trackFormFieldFocus: (fieldName: string) => {
    track("botox_form_field_focus", { field_name: fieldName });
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

  // ─── Success page ────────────────────────────────────────────────────────────

  trackSuccessCtaClicked: (action: "main_site" | "call") => {
    track("botox_success_cta_clicked", { action, ...campaignMeta() });
  },
};
