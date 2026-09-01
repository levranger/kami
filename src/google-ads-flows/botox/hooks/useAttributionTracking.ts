import { useEffect, useRef, useState } from "react";
import type { AttributionData } from "../types/booking";

/**
 * Capture Google Ads + UTM attribution from the URL, once per session.
 * Returns state (not a ref) so consumers re-render when it populates and never
 * submit a stale/empty attribution object.
 */
export function useAttributionTracking(): AttributionData {
  const [attribution, setAttribution] = useState<AttributionData>({});
  const captured = useRef(false);

  useEffect(() => {
    if (captured.current) return;
    captured.current = true;

    const params = new URLSearchParams(window.location.search);
    setAttribution({
      gclid: params.get("gclid") || undefined,
      gbraid: params.get("gbraid") || undefined,
      wbraid: params.get("wbraid") || undefined,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmTerm: params.get("utm_term") || undefined,
      utmContent: params.get("utm_content") || undefined,
      landingPageUrl: window.location.href,
      referrer: document.referrer || undefined,
      funnelStartedAt: new Date().toISOString(),
    });
  }, []);

  return attribution;
}
