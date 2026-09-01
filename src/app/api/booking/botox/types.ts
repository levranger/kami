export interface BotoxRequestPayload {
  kind: "promo_request";
  requestId: string;
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  preferredDate: string; // ISO YYYY-MM-DD
  preferredTime: string; // window label
  treatmentArea: string | null; // option id
  treatmentAreaLabel: string | null;
  marketingConsent: boolean;
  offer: { pricePerUnit: number; label: string };
  meta: { service: string; offer: string; source: string; campaign: string };
  attribution?: Record<string, string | undefined>;
}
