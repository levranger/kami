import type { BookingRequest, LeadCapturePayload, FunnelMode } from "../types/booking";

const FUNNEL_MODE: FunnelMode = "mock";

/**
 * Generate a unique ID for booking requests and leads.
 */
function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Simulate network delay for mock mode.
 */
function mockDelay(ms: number = 1200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Lead Capture ───────────────────────────────────────────────────

export interface LeadCaptureResult {
  leadId: string;
}

/**
 * Save a partial lead when contact info is completed.
 * Mock implementation logs in dev and returns a generated ID.
 */
export async function savePartialLead(
  payload: LeadCapturePayload
): Promise<LeadCaptureResult> {
  if (FUNNEL_MODE === "production") {
    // Future: POST to /api/leads
    throw new Error("Lead capture not implemented in production mode.");
  }

  await mockDelay(800);

  const leadId = generateId("lead");

  if (process.env.NODE_ENV === "development") {
    // Log payload structure only — never log raw PII in production
    console.log("[Mock Lead Capture]", {
      leadId,
      areas: payload.selectedAreas,
      package: payload.selectedPackage,
      isNewPatient: payload.isNewPatient,
      hasAttribution: Boolean(payload.attribution.gclid || payload.attribution.utmSource),
    });
  }

  return { leadId };
}

// ─── Booking Request Submission ─────────────────────────────────────

export interface BookingSubmitResult {
  bookingRequestId: string;
  message: string;
}

/**
 * Submit the full booking request.
 * Mock implementation simulates success.
 */
export async function submitBookingRequest(
  request: Omit<BookingRequest, "bookingRequestId">
): Promise<BookingSubmitResult> {
  if (FUNNEL_MODE === "production") {
    // Future sequence:
    // 1. Revalidate slot availability
    // 2. Create temporary reservation
    // 3. Collect $50 Stripe deposit
    // 4. Confirm Mangomint booking
    // 5. Trigger transactional SMS/email
    // 6. Fire confirmed booking conversion
    // 7. Show final booking confirmation
    throw new Error("Booking submission not implemented in production mode.");
  }

  await mockDelay(1500);

  const bookingRequestId = generateId("bk");

  if (process.env.NODE_ENV === "development") {
    console.log("[Mock Booking Submit]", {
      bookingRequestId,
      areas: request.selectedAreas.map((a) => a.id),
      package: request.selectedPackage,
      date: request.selectedDate,
      time: request.selectedTime,
      packageTotal: request.pricingSummary.packageTotal,
    });
  }

  return {
    bookingRequestId,
    message: "Appointment request received",
  };
}

// ─── Future Integration Interfaces ──────────────────────────────────

/**
 * Reserve a time slot temporarily (future: Mangomint).
 */
export interface SlotReservation {
  reserveSlot(date: string, time: string): Promise<{ reservationId: string }>;
}

/**
 * Create a Stripe checkout session for deposit (future).
 */
export interface StripeCheckout {
  createStripeCheckout(amount: number, bookingId: string): Promise<{ checkoutUrl: string }>;
}

/**
 * Send booking data to Zapier webhook (future).
 */
export interface ZapierIntegration {
  sendToZapier(booking: BookingRequest): Promise<{ success: boolean }>;
}

/**
 * Track a confirmed conversion (future).
 */
export interface ConversionTracker {
  trackConversion(bookingId: string, value: number): Promise<void>;
}