import type {
  BookingApiAdapter,
  ContactInfo,
  TreatmentGoal,
  AppointmentType,
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
    areas: string[];
    goal: TreatmentGoal | null;
    appointmentType: AppointmentType;
    selectedDate: string;
    selectedTime: string;
    marketingConsent: boolean;
    attributionToken: string | null;
    estimateSummary: EstimateSummary | null;
  }) {
    const bookingRequestId = generateId("filler");

    const res = await fetch("/api/booking/fillers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        bookingRequestId,
        selectedAreas: data.areas,
        selectedGoal: data.goal,
        attribution: { attributionToken: data.attributionToken },
      }),
    });

    if (!res.ok) throw new Error(`Fillers booking API error: ${res.status}`);

    return { bookingRequestId };
  },
};

export function getBookingApi(): BookingApiAdapter {
  return adapter;
}
