import type { PackageType, AttributionData } from "../types/booking";

/**
 * Analytics event names for the laser booking funnel.
 */
export type AnalyticsEvent =
  | "laser_booking_flow_started"
  | "laser_area_selected"
  | "laser_package_selected"
  | "laser_contact_completed"
  | "laser_slot_selected"
  | "laser_review_viewed"
  | "laser_booking_request_submitted"
  | "laser_booking_request_completed"
  | "laser_booking_error";

/**
 * Allowed event properties — never includes PII.
 */
export interface AnalyticsEventProperties {
  step?: number;
  areaIds?: string[];
  numberOfAreas?: number;
  packageType?: PackageType;
  packageTotal?: number;
  depositAmount?: number;
  dateSelected?: string;
  timeSelected?: string;
  isNewPatient?: boolean;
  screeningReviewRequired?: boolean;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  errorMessage?: string;
}

/**
 * Analytics interface — can be swapped with real GA4 implementation.
 */
interface AnalyticsAdapter {
  track(event: AnalyticsEvent, properties?: AnalyticsEventProperties): void;
}

/**
 * No-op analytics implementation for environments without GA.
 */
class NoOpAnalytics implements AnalyticsAdapter {
  track(_event: AnalyticsEvent, _properties?: AnalyticsEventProperties): void {
    // No-op
  }
}

/**
 * Development analytics that logs to console.
 */
class DevAnalytics implements AnalyticsAdapter {
  track(event: AnalyticsEvent, properties?: AnalyticsEventProperties): void {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] ${event}`, properties || {});
    }
  }
}

/**
 * GA4 analytics adapter (placeholder for production).
 */
class GA4Analytics implements AnalyticsAdapter {
  track(event: AnalyticsEvent, properties?: AnalyticsEventProperties): void {
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", event, properties);
    }
  }
}

/**
 * Create the appropriate analytics adapter based on environment.
 */
function createAnalytics(): AnalyticsAdapter {
  if (typeof window === "undefined") return new NoOpAnalytics();
  if (process.env.NODE_ENV === "development") return new DevAnalytics();
  if ("gtag" in window) return new GA4Analytics();
  return new NoOpAnalytics();
}

export const analytics = createAnalytics();

/**
 * Helper to build attribution properties for events.
 */
export function buildAttributionProps(
  attribution: AttributionData
): Pick<AnalyticsEventProperties, "gclid" | "gbraid" | "wbraid"> {
  return {
    gclid: attribution.gclid,
    gbraid: attribution.gbraid,
    wbraid: attribution.wbraid,
  };
}