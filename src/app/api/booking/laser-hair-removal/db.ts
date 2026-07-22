import { sql } from "@/lib/db";
import type { BookingPayload } from "./types";

let schemaReady: Promise<unknown> | null = null;

function ensureSchema() {
  if (!schemaReady) {
    schemaReady = sql`
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
    `.catch((err) => {
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
      pricing_summary, attribution
    ) VALUES (
      ${payload.bookingRequestId},
      ${payload.contactInfo.fullName},
      ${payload.contactInfo.phone},
      ${payload.contactInfo.email},
      ${payload.contactInfo.isNewPatient},
      ${JSON.stringify(payload.selectedAreas)},
      ${payload.selectedPackage},
      ${payload.selectedDate},
      ${payload.selectedTime},
      ${JSON.stringify(payload.pricingSummary)},
      ${payload.attribution ? JSON.stringify(payload.attribution) : null}
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
