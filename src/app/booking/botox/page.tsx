"use client";

/**
 * /booking/botox
 *
 * Google Ads landing page for Botox / neurotoxin campaigns.
 * Renders the full multi-step booking funnel — no site chrome.
 *
 * Traffic source: paid search (Google Ads)
 * Robots: noindex (set in parent booking/layout.tsx)
 */

import { BotoxBookingFlow } from "@/google-ads-flows/botox";

export default function BotoxBookingPage() {
  return <BotoxBookingFlow />;
}
