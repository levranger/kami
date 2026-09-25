/**
 * Manual-only Meta Lead measurement. Never pass a booking payload to this module.
 * Rollout stays off unless explicitly enabled; the business' Core setup and
 * health-data restrictions must remain enabled and independently reviewed.
 */
export type MetaConsent = "granted" | "denied" | "unset";
export type MetaQueue = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: MetaQueue;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: MetaQueue;
    _fbq?: MetaQueue;
  }
}

export const META_PIXEL_ID = "958339362247309";
export const META_ENABLED = process.env.NEXT_PUBLIC_META_LEAD_TRACKING === "true";
const CONSENT_KEY = "kami_meta_measurement_v1";
const CONSENT_AGE_MS = 90 * 24 * 60 * 60 * 1000;
let memoryConsent: { choice: MetaConsent; at: number } = { choice: "unset", at: 0 };
let initialized = false;
const sentIds = new Set<string>();

export function hasPrivacySignal(): boolean {
  if (typeof navigator === "undefined") return true;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
    || navigator.doNotTrack === "1";
}

export function getMetaConsent(): MetaConsent {
  if (typeof window === "undefined" || hasPrivacySignal()) return "denied";
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(CONSENT_KEY);
  } catch {
    // Only use the temporary choice if storage is actually unavailable.
    return Date.now() - memoryConsent.at < CONSENT_AGE_MS ? memoryConsent.choice : "unset";
  }
  try {
    const stored = JSON.parse(raw || "null");
    if (stored && (stored.choice === "granted" || stored.choice === "denied")
      && typeof stored.at === "number" && stored.at <= Date.now()
      && Date.now() - stored.at < CONSENT_AGE_MS) return stored.choice;
  } catch { /* Malformed, cleared, or expired choices require fresh permission. */ }
  return "unset";
}

export function setMetaConsent(choice: "granted" | "denied"): MetaConsent {
  const effective = hasPrivacySignal() ? "denied" : choice;
  memoryConsent = { choice: effective, at: Date.now() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice: effective, at: Date.now() }));
  } catch { /* An in-memory choice is sufficient for this page visit. */ }
  if (effective === "denied") revokeMetaMeasurement();
  return effective;
}

export function revokeMetaMeasurement(): void {
  if (typeof window === "undefined") return;
  try {
    // Remove unsent events and reinitialize if permission is granted later.
    if (window.fbq && !window.fbq.callMethod) {
      window.fbq.queue = [];
      initialized = false;
    }
    window.fbq?.("consent", "revoke");
  } catch { /* Measurement errors must not affect booking. */ }
}

/** Queue installation only; the consent component loads the SDK separately. */
export function initializeMetaQueue(): boolean {
  if (!META_ENABLED || typeof window === "undefined" || getMetaConsent() !== "granted") return false;
  try {
    if (!window.fbq) {
      const queue = function (...args: unknown[]) {
        if (queue.callMethod) queue.callMethod(...args);
        else queue.queue.push(args);
      } as MetaQueue;
      queue.queue = [];
      queue.push = queue;
      queue.loaded = true;
      queue.version = "2.0";
      window.fbq = queue;
      window._fbq = queue;
    }
    window.fbq("consent", "grant");
    if (!initialized) {
      // Official manual-only option: disable automatic button/form metadata.
      window.fbq("set", "autoConfig", false, META_PIXEL_ID);
      window.fbq("init", META_PIXEL_ID);
      initialized = true;
    }
    // No PageView, ViewContent, Schedule, Purchase, or custom treatment event.
    return true;
  } catch { return false; }
}

/**
 * Must only be called after the server accepts a request. The random event ID
 * is separate from the booking ID; no contact, treatment, price, or time data.
 */
export function trackMetaLead(eventId: string): boolean {
  if (!META_ENABLED || getMetaConsent() !== "granted"
    || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(eventId)
    || sentIds.has(eventId)) return false;
  if (!initializeMetaQueue()) return false;
  try {
    window.fbq!("trackSingle", META_PIXEL_ID, "Lead", {}, { eventID: eventId });
    sentIds.add(eventId);
    return true;
  } catch { return false; }
}
