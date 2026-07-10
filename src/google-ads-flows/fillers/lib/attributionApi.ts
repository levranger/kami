/**
 * Attribution Token API
 * Captures advertising parameters on the public landing layer
 * and exchanges them for an opaque token.
 */

interface AttributionParams {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPageUrl?: string;
  referrer?: string;
}

export async function createAttributionToken(params: AttributionParams): Promise<string> {
  // Mock: generate an opaque token
  await new Promise((r) => setTimeout(r, 200));
  const tokenPayload = btoa(JSON.stringify({ ts: Date.now(), ...params }));
  return `attr_${tokenPayload.slice(0, 24)}`;
}

export function captureAttributionParams(): AttributionParams {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    gclid: p.get("gclid") || undefined,
    gbraid: p.get("gbraid") || undefined,
    wbraid: p.get("wbraid") || undefined,
    utmSource: p.get("utm_source") || undefined,
    utmMedium: p.get("utm_medium") || undefined,
    utmCampaign: p.get("utm_campaign") || undefined,
    utmTerm: p.get("utm_term") || undefined,
    utmContent: p.get("utm_content") || undefined,
    landingPageUrl: window.location.href,
    referrer: document.referrer || undefined,
  };
}