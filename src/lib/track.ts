export type TrackParams = Record<string, string | number | boolean | string[] | undefined>;

// Push a GA4 event to GTM's dataLayer. Safe to call anywhere — no-ops if GTM isn't loaded.
export function track(eventName: string, params?: TrackParams) {
  if (typeof window === "undefined") return;
  (window as unknown as { dataLayer?: unknown[] }).dataLayer ??= [];
  (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...params,
  });
}
