export interface BookingPayload {
  bookingRequestId: string;
  selectedAreas: { id: string; name: string; price: number }[];
  selectedPackage: "single" | "four" | "six";
  contactInfo: {
    fullName: string;
    phone: string;
    email: string;
    isNewPatient: boolean;
  };
  selectedDate: string;
  selectedTime: string;
  pricingSummary: {
    baseSessionPrice: number;
    sessionCount: number;
    discountPercentage: number;
    discountedSessionPrice: number;
    packageTotal: number;
    savings: number;
    depositAmount: number;
  };
  attribution?: Record<string, string | undefined>;
}
