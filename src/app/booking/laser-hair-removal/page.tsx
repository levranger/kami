/**
 * /booking/laser-hair-removal
 *
 * Google Ads landing page for laser hair removal campaigns.
 * Renders the fixed $149 Must-Have offer booking flow — no site chrome.
 *
 * Traffic source: paid search (Google Ads)
 * Robots: noindex (set in parent booking/layout.tsx)
 */

import { LaserHairRemovalBookingFlow } from "@/google-ads-flows/laser-hair-removal";
import MetaMeasurementConsent from "@/components/MetaMeasurementConsent";

export default function LaserHairRemovalBookingPage() {
  return <><MetaMeasurementConsent /><LaserHairRemovalBookingFlow /></>;
}
