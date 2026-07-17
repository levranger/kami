/**
 * /booking/laser-hair-removal
 *
 * Google Ads landing page for laser hair removal campaigns.
 * Renders the full multi-step booking funnel — no site chrome.
 *
 * Traffic source: paid search (Google Ads)
 * Robots: noindex (set in parent booking/layout.tsx)
 *
 * `?start=booking` (used by the Pricing / Book Online sitelinks) skips the
 * marketing hero and opens directly on Step 1 (treatment-area selection).
 * Parsed here, server-side, so the correct screen is what the client
 * renders on first paint — no hero flash, no post-mount switch.
 */

import { LaserHairRemovalBookingFlow } from "@/google-ads-flows/laser-hair-removal";
import type { EntryMode } from "@/google-ads-flows/laser-hair-removal";

interface LaserHairRemovalBookingPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function LaserHairRemovalBookingPage({
  searchParams,
}: LaserHairRemovalBookingPageProps) {
  const entryMode: EntryMode = searchParams.start === "booking" ? "booking" : "landing";

  return <LaserHairRemovalBookingFlow initialEntryMode={entryMode} />;
}
