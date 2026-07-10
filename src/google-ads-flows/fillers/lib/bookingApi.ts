import type {
  BookingApiAdapter,
  ContactInfo,
  TreatmentGoal,
  AppointmentType,
  EstimateSummary,
} from "../types/booking";

type ApiMode = "mock" | "production";
const MODE: ApiMode = "mock";

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const mockAdapter: BookingApiAdapter = {
  async submitPartialLead(data: {
    contactInfo: ContactInfo;
    areas: string[];
    goal: TreatmentGoal | null;
    attributionToken: string | null;
  }) {
    await new Promise((r) => setTimeout(r, 800));
    if (process.env.NODE_ENV === "development") {
      console.log("[Mock API] Partial lead:", { name: data.contactInfo.fullName, areas: data.areas });
    }
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
    await new Promise((r) => setTimeout(r, 1200));
    if (process.env.NODE_ENV === "development") {
      console.log("[Mock API] Booking request:", { name: data.contactInfo.fullName, date: data.selectedDate, time: data.selectedTime });
    }
    return { bookingRequestId: generateId("filler") };
  },
};

const productionAdapter: BookingApiAdapter = {
  async submitPartialLead() { throw new Error("Production integration not implemented."); },
  async submitBookingRequest() { throw new Error("Production integration not implemented."); },
};

export function getBookingApi(): BookingApiAdapter {
  return MODE === "mock" ? mockAdapter : productionAdapter;
}