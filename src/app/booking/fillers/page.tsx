"use client";

/**
 * /booking/fillers
 *
 * Google Ads landing page for dermal filler campaigns.
 * Renders the full multi-step booking funnel — no site chrome.
 *
 * Traffic source: paid search (Google Ads)
 * Robots: noindex (set in parent booking/layout.tsx)
 */

import { FillerBookingFlow } from "@/google-ads-flows/fillers";

export default function FillersBookingPage() {
  return <FillerBookingFlow />;
}
