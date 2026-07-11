import type { BookingRequest, LeadCapturePayload } from "../types/booking";

function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}`;
}

// ─── Lead Capture ────────────────────────────────────────────────────────────
// Partial lead (contact step) — fire-and-forget, non-blocking.

export interface LeadCaptureResult {
  leadId: string;
}

export async function savePartialLead(
  payload: LeadCapturePayload
): Promise<LeadCaptureResult> {
  // Partial lead: just generate an ID locally.
  // Future: could POST to a CRM / Zapier webhook here.
  return { leadId: generateId("lead") };
}

// ─── Booking Request Submission ──────────────────────────────────────────────

export interface BookingSubmitResult {
  bookingRequestId: string;
  message: string;
}

export async function submitBookingRequest(
  request: Omit<BookingRequest, "bookingRequestId">
): Promise<BookingSubmitResult> {
  const bookingRequestId = generateId("lhr");

  const payload = { ...request, bookingRequestId };

  const res = await fetch("/api/booking/laser-hair-removal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Booking API error: ${res.status}`);
  }

  return {
    bookingRequestId,
    message: "Appointment request received",
  };
}
