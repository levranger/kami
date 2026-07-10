import { useEffect, useRef } from "react";
import type { AttributionData } from "../types/booking";

/**
 * Capture Google Ads and UTM attribution parameters from URL.
 * Preserves original attribution across refreshes — does not overwrite
 * with later navigation values during the same funnel session.
 */
export function useAttributionTracking(
  existingAttribution: AttributionData,
  setAttribution: (data: AttributionData) => void
): void {
  const hasCapture = useRef(false);

  useEffect(() => {
    // Only capture once per funnel session
    if (hasCapture.current) return;
    if (existingAttribution.funnelStartedAt) {
      hasCapture.current = true;
      return;
    }

    const params = new URLSearchParams(window.location.search);

    const attribution: AttributionData = {
      gclid: params.get("gclid") || undefined,
      gbraid: params.get("gbraid") || undefined,
      wbraid: params.get("wbraid") || undefined,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmTerm: params.get("utm_term") || undefined,
      utmContent: params.get("utm_content") || undefined,
      landingVariant: params.get("variant") || undefined,
      referrer: document.referrer || undefined,
      landingPageUrl: window.location.href,
      funnelStartedAt: new Date().toISOString(),
    };

    setAttribution(attribution);
    hasCapture.current = true;
  }, [existingAttribution, setAttribution]);
}