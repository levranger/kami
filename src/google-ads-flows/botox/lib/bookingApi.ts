import type {
  BookingApiAdapter,
  ContactInfo,
  TreatmentGoal,
  ProductPreference,
  AppointmentType,
  AttributionData,
  EstimateSummary,
} from "../types/booking";

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const adapter: BookingApiAdapter = {
  async submitPartialLead(_data) {
    // Fire-and-forget partial lead — no API call needed at this stage
    return { leadId: generateId("lead") };
  },

  async submitBookingRequest(data: {
    contactInfo: ContactInfo;
    concerns: string[];
    goal: TreatmentGoal | null;
    productPreference: ProductPreference;
    appointmentType: AppointmentType;
    selectedDate: string;
    selectedTime: string;
    marketingConsent: boolean;
    attribution: AttributionData;
    estimateSummary: EstimateSummary | null;
  }) {
    const bookingRequestId = generateId("btx");

    const res = await fetch("/api/booking/botox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, bookingRequestId }),
    });

    if (!res.ok) throw new Error(`Botox booking API error: ${res.status}`);

    return { bookingRequestId };
  },

  async revalidateSlot(_date, _time, _appointmentType) {
    // Slot revalidation — implement when live availability is wired up
    return { available: true };
  },
};

export function getBookingApi(): BookingApiAdapter {
  return adapter;
}

// ─── $10/unit promo appointment request ──────────────────────────────────────
// Lead-capture-first, manual confirmation — mirrors the LHR submitBookingRequest
// contract. Posts to the shared /api/booking/botox endpoint (Resend emails +
// Postgres row); Kami staff confirm availability and add the appointment to
// Mangomint by hand. This never touches Mangomint directly.

export interface BotoxRequestContact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface BotoxRequestInput {
  contact: BotoxRequestContact;
  preferredDate: string; // ISO YYYY-MM-DD
  preferredTime: string; // window label, e.g. "Morning (9am–12pm)"
  treatmentArea: string | null; // option id, optional
  treatmentAreaLabel: string | null;
  marketingConsent: boolean;
  offer: { pricePerUnit: number; label: string };
  meta: { service: string; offer: string; source: string; campaign: string };
  attribution: AttributionData;
}

export async function submitBotoxRequest(
  input: BotoxRequestInput,
): Promise<{ requestId: string }> {
  const requestId = generateId("btxreq");

  const res = await fetch("/api/booking/botox", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind: "promo_request", requestId, ...input }),
  });

  if (!res.ok) throw new Error(`Botox request API error: ${res.status}`);

  return { requestId };
}
