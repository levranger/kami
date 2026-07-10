import { useEffect, useRef } from "react";
import type { AttributionData } from "../types/booking";

export function useAttributionTracking(): AttributionData {
  const attributionRef = useRef<AttributionData>({});

  useEffect(() => {
    if (attributionRef.current.funnelStartedAt) return;

    const params = new URLSearchParams(window.location.search);

    attributionRef.current = {
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
    };
  }, []);

  return attributionRef.current;
}