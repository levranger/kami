import { track } from "@/lib/track";
import type { AttributionData } from "../types/booking";
import { MUST_HAVE_OFFER, OFFER_ID } from "./offers";

// ─────────────────────────────────────────────────────────────────────────────
//  Analytics for the $149 New Client Must-Have laser hair removal funnel.
//
//  This is an offer-specific funnel. Every event carries `offer_id` so it can
//  be analysed independently. Google Ads attribution (GCLID / GBRAID / WBRAID)
//  and UTM parameters are preserved on the entry events. There are no
//  area-selection or package-selection events — the offer is fixed.
//
//  Canonical events, in the order they fire:
//    laser_landing_view
//    laser_offer_redeem_clicked
//    laser_booking_flow_started
//    laser_datetime_selected
//    laser_contact_info_entered
//    laser_booking_completed   ← primary conversion (carries value/currency)
//    laser_booking_error
// ─────────────────────────────────────────────────────────────────────────────

const OFFER_PARAMS = { offer_id: OFFER_ID } as const;

type PartialAttribution = Partial<AttributionData>;

function attributionParams(a: PartialAttribution) {
  return {
    gclid: a.gclid,
    gbraid: a.gbraid,
    wbraid: a.wbraid,
    utm_source: a.utmSource,
    utm_medium: a.utmMedium,
    utm_campaign: a.utmCampaign,
    utm_term: a.utmTerm,
    utm_content: a.utmContent,
    entry_source: a.utmSource || a.referrer || undefined,
  };
}

export const laserAnalytics = {
  trackLandingView: (attribution: PartialAttribution) => {
    track("laser_landing_view", {
      landing_page: "laser_hair_removal",
      ...OFFER_PARAMS,
      ...attributionParams(attribution),
    });
  },

  // Fired on the single "Redeem This Offer" CTA click on the landing page.
  trackOfferRedeemClicked: (attribution: PartialAttribution) => {
    track("laser_offer_redeem_clicked", {
      ...OFFER_PARAMS,
      ...attributionParams(attribution),
    });
  },

  trackFlowStarted: (attribution: PartialAttribution) => {
    track("laser_booking_flow_started", {
      ...OFFER_PARAMS,
      ...attributionParams(attribution),
    });
  },

  trackDateTimeSelected: (date: string, time: string) => {
    track("laser_datetime_selected", {
      appointment_date: date,
      appointment_time: time,
      ...OFFER_PARAMS,
    });
  },

  trackContactInfoEntered: (marketingConsent: boolean) => {
    track("laser_contact_info_entered", {
      marketing_consent: marketingConsent,
      ...OFFER_PARAMS,
    });
  },

  // Primary conversion — fired only on a successful submit. `value` is the
  // requested offer price at submit time, not confirmed or collected revenue.
  trackBookingCompleted: () => {
    track("laser_booking_completed", {
      value: MUST_HAVE_OFFER.price,
      currency: "USD",
      ...OFFER_PARAMS,
    });
  },

  trackBookingError: (errorMessage: string) => {
    track("laser_booking_error", {
      error_message: errorMessage,
      ...OFFER_PARAMS,
    });
  },
};
