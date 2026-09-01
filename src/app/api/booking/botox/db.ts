import { sql } from "@/lib/db";
import type { BotoxRequestPayload } from "./types";

let schemaReady: Promise<unknown> | null = null;

function ensureSchema() {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS botox_promo_requests (
        id text PRIMARY KEY,
        created_at timestamptz NOT NULL DEFAULT now(),
        first_name text NOT NULL,
        last_name text NOT NULL,
        phone text NOT NULL,
        email text NOT NULL,
        preferred_date text NOT NULL,
        preferred_time text NOT NULL,
        treatment_area text,
        treatment_area_label text,
        marketing_consent boolean NOT NULL DEFAULT false,
        offer jsonb NOT NULL,
        campaign_meta jsonb NOT NULL,
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

export async function saveBotoxRequest(p: BotoxRequestPayload) {
  await ensureSchema();
  await sql`
    INSERT INTO botox_promo_requests (
      id, first_name, last_name, phone, email,
      preferred_date, preferred_time, treatment_area, treatment_area_label,
      marketing_consent, offer, campaign_meta, attribution
    ) VALUES (
      ${p.requestId},
      ${p.contact.firstName},
      ${p.contact.lastName},
      ${p.contact.phone},
      ${p.contact.email},
      ${p.preferredDate},
      ${p.preferredTime},
      ${p.treatmentArea},
      ${p.treatmentAreaLabel},
      ${p.marketingConsent},
      ${JSON.stringify(p.offer)},
      ${JSON.stringify(p.meta)},
      ${p.attribution ? JSON.stringify(p.attribution) : null}
    )
    ON CONFLICT (id) DO NOTHING
  `;
}

export async function markBotoxEmailResults(
  requestId: string,
  results: { clientSent: boolean; staffSent: boolean },
) {
  await sql`
    UPDATE botox_promo_requests
    SET client_email_sent = ${results.clientSent},
        staff_email_sent = ${results.staffSent}
    WHERE id = ${requestId}
  `;
}
