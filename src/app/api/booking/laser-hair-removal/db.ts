import { sql } from "@/lib/db";
import type { BookingPayload } from "./types";

let schemaReady: Promise<unknown> | null = null;

// The funnel now submits a fixed offer with no area / package selection. The
// legacy columns (selected_areas, selected_package, pricing_summary,
// is_new_patient) are kept for backward compatibility with existing rows and
// are filled with constant values below so their NOT NULL constraints hold.
const LEGACY_AREAS = [
  { id: "brazilian", name: "Full Brazilian", price: 109 },
  { id: "underarms", name: "Underarms", price: 60 },
  { id: "half-legs", name: "Half Legs", price: 120 },
];
const LEGACY_PRICING = {
  baseSessionPrice: 149,
  sessionCount: 1,
  discountPercentage: 0,
  discountedSessionPrice: 149,
  packageTotal: 149,
  savings: 0,
  depositAmount: 0,
};

function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS laser_hair_removal_bookings (
          id text PRIMARY KEY,
          created_at timestamptz NOT NULL DEFAULT now(),
          full_name text NOT NULL,
          phone text NOT NULL,
          email text NOT NULL,
          is_new_patient boolean NOT NULL,
          selected_areas jsonb NOT NULL,
          selected_package text NOT NULL,
          selected_date text NOT NULL,
          selected_time text NOT NULL,
          pricing_summary jsonb NOT NULL,
          attribution jsonb,
          client_email_sent boolean NOT NULL DEFAULT false,
          staff_email_sent boolean NOT NULL DEFAULT false
        )
      `;
      // Additive, idempotent migration for the $149 fixed-offer funnel.
      await sql`ALTER TABLE laser_hair_removal_bookings ADD COLUMN IF NOT EXISTS offer jsonb`;
      await sql`ALTER TABLE laser_hair_removal_bookings ADD COLUMN IF NOT EXISTS offer_id text`;
      await sql`ALTER TABLE laser_hair_removal_bookings ADD COLUMN IF NOT EXISTS marketing_consent boolean NOT NULL DEFAULT false`;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

export async function saveBooking(payload: BookingPayload) {
  await ensureSchema();
  await sql`
    INSERT INTO laser_hair_removal_bookings (
      id, full_name, phone, email, is_new_patient,
      selected_areas, selected_package, selected_date, selected_time,
      pricing_summary, attribution, offer, offer_id, marketing_consent
    ) VALUES (
      ${payload.bookingRequestId},
      ${payload.contactInfo.fullName},
      ${payload.contactInfo.phone},
      ${payload.contactInfo.email || ""},
      ${false},
      ${JSON.stringify(LEGACY_AREAS)},
      ${"single"},
      ${payload.selectedDate},
      ${payload.selectedTime},
      ${JSON.stringify(LEGACY_PRICING)},
      ${payload.attribution ? JSON.stringify(payload.attribution) : null},
      ${JSON.stringify(payload.offer)},
      ${payload.offer.id},
      ${payload.marketingConsent}
    )
    ON CONFLICT (id) DO NOTHING
  `;
}

export async function markEmailResults(
  bookingRequestId: string,
  results: { clientSent: boolean; staffSent: boolean }
) {
  await sql`
    UPDATE laser_hair_removal_bookings
    SET client_email_sent = ${results.clientSent},
        staff_email_sent = ${results.staffSent}
    WHERE id = ${bookingRequestId}
  `;
}
