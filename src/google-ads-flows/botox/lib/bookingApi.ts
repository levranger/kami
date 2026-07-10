import type {
  BookingApiAdapter,
  ContactInfo,
  TreatmentGoal,
  ProductPreference,
  AppointmentType,
  AttributionData,
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
    concerns: string[];
    goal: TreatmentGoal | null;
    attribution: AttributionData;
  }) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (process.env.NODE_ENV === "development") {
      console.log("[Mock API] Partial lead submitted:", {
        name: data.contactInfo.fullName,
        concerns: data.concerns,
        goal: data.goal,
      });
    }
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
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (process.env.NODE_ENV === "development") {
      console.log("[Mock API] Booking request submitted:", {
        name: data.contactInfo.fullName,
        appointmentType: data.appointmentType,
        date: data.selectedDate,
        time: data.selectedTime,
      });
    }
    return { bookingRequestId: generateId("bkng") };
  },

  async revalidateSlot(date: string, time: string, _appointmentType: AppointmentType) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (process.env.NODE_ENV === "development") {
      console.log("[Mock API] Revalidating slot:", date, time);
    }
    return { available: true };
  },
};

const productionAdapter: BookingApiAdapter = {
  async submitPartialLead() {
    throw new Error("Production Mangomint/Zapier integration not implemented.");
  },
  async submitBookingRequest() {
    throw new Error("Production booking integration not implemented.");
  },
  async revalidateSlot() {
    throw new Error("Production slot revalidation not implemented.");
  },
};

export function getBookingApi(): BookingApiAdapter {
  return MODE === "mock" ? mockAdapter : productionAdapter;
}