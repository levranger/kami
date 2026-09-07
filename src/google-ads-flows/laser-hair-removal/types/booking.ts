// Two visible decision steps: pick a time, then leave contact details.
export type BookingStep = 1 | 2;

export interface ContactInfo {
  fullName: string;
  phone: string;
  /** Optional — the appointment request does not require an email address. */
  email: string;
}

export interface AttributionData {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingVariant?: string;
  referrer?: string;
  landingPageUrl?: string;
  funnelStartedAt?: string;
}

export interface AvailableDate {
  date: string; // ISO date string YYYY-MM-DD
  dayOfWeek: string;
  displayDate: string;
  available: boolean;
}

export interface AvailableTime {
  time: string; // HH:mm format
  displayTime: string;
  available: boolean;
}

export interface AvailabilityProvider {
  getAvailableDates(): Promise<AvailableDate[]>;
  getAvailableTimes(date: string): Promise<AvailableTime[]>;
}

/** Immutable description of the promotional offer, carried on every request. */
export interface OfferSummary {
  id: string;
  name: string;
  areasLabel: string;
  price: number;
  value: number;
}

export interface BookingRequest {
  bookingRequestId: string;
  offer: OfferSummary;
  contactInfo: ContactInfo;
  marketingConsent: boolean;
  selectedDate: string;
  selectedTime: string;
  attribution: AttributionData;
}

export interface BeforeAfterSlide {
  id: string;
  area: string;
  beforeImage: string;
  afterImage: string;
  testimonial: string;
}

export const STEP_NAMES: Record<BookingStep, string> = {
  1: "Appointment",
  2: "Contact",
};
