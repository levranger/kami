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
