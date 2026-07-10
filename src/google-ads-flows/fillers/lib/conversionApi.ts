/**
 * Server-side conversion reporting scaffold.
 * In production, this sends conversion data to a first-party endpoint
 * which then reports to Google Ads via the Conversions API.
 */

export async function reportApprovedConversion(data: {
  bookingRequestId: string;
  attributionToken: string | null;
  appointmentType: string;
  estimatedValue?: number;
}): Promise<void> {
  // Mock: log in dev only
  if (process.env.NODE_ENV === "development") {
    console.log("[Mock Conversion API] Reporting conversion:", data);
  }
  await new Promise((r) => setTimeout(r, 100));
}