export type BookingStep = 1 | 2 | 3 | 4 | 5;

// "landing" = marketing hero shown first, user clicks "Start Booking".
// "booking" = paid-traffic entry (?start=booking) — opens directly on
// Step 1, no hero, no click required.
export type EntryMode = "landing" | "booking";

export type PackageType = "single" | "four" | "six";

export interface TreatmentArea {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
  isNewPatient: boolean;
}

export interface ScreeningFlags {
  sensitiveSkin: boolean;
  recentlyTanned: boolean;
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

export interface PricingSummary {
  baseSessionPrice: number;
  sessionCount: number;
  discountPercentage: number;
  discountedSessionPrice: number;
  packageTotal: number;
  savings: number;
  depositAmount: number;
  remainingBalance: number;
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

export interface BookingRequest {
  bookingRequestId: string;
  selectedAreas: TreatmentArea[];
  selectedPackage: PackageType;
  contactInfo: ContactInfo;
  screeningFlags: ScreeningFlags;
  marketingConsent: boolean;
  selectedDate: string;
  selectedTime: string;
  pricingSummary: PricingSummary;
  attribution: AttributionData;
}

export interface LeadCapturePayload {
  fullName: string;
  phone: string;
  email: string;
  isNewPatient: boolean;
  selectedAreas: string[];
  selectedPackage: PackageType;
  attribution: AttributionData;
}

export interface ApiResponse<T> {
  status: "idle" | "loading" | "success" | "error";
  data?: T;
  error?: string;
}

export interface BeforeAfterSlide {
  id: string;
  area: string;
  beforeImage: string;
  afterImage: string;
  testimonial: string;
}

export type FunnelMode = "mock" | "production";

export const DEPOSIT_AMOUNT = 50;

export const STEP_NAMES: Record<BookingStep, string> = {
  1: "Areas",
  2: "Package",
  3: "Contact",
  4: "Appointment",
  5: "Review",
};