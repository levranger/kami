// Push a GA4 event to GTM's dataLayer. Safe to call anywhere — no-ops if GTM isn't loaded.
export function track(eventName: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  (window as unknown as { dataLayer?: unknown[] }).dataLayer ??= [];
  (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
    event: eventName,
    ...params,
  });
}
