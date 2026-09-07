export interface BookingPayload {
  bookingRequestId: string;
  offer: {
    id: string;
    name: string;
    areasLabel: string;
    price: number;
    value: number;
  };
  contactInfo: {
    fullName: string;
    phone: string;
    /** May be an empty string — email is optional in the funnel. */
    email: string;
  };
  marketingConsent: boolean;
  selectedDate: string;
  selectedTime: string;
  attribution?: Record<string, string | undefined>;
}
