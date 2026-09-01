import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { saveBotoxRequest, markBotoxEmailResults } from "./db";
import type { BotoxRequestPayload } from "./types";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.BOOKING_FROM_EMAIL         ?? "bookings@kamiaesthetics.com";
const NOTIFY = process.env.BOOKING_NOTIFICATION_EMAIL ?? "shk.lab.fl@gmail.com";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

function fullName(p: BotoxRequestPayload) {
  return `${p.contact.firstName} ${p.contact.lastName}`.trim();
}

// ── Email: client acknowledgement (request pending — NOT confirmed) ───────────

function clientHtml(p: BotoxRequestPayload): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9f7f5;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f5;padding:40px 16px;">
<tr><td align="center"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:4px;border:1px solid #e8e0d8;">
  <tr><td style="background:#1a1a1a;padding:32px 40px;text-align:center;">
    <p style="margin:0;color:#c9a96e;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Kami Aesthetics</p>
    <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:400;font-family:Georgia,serif;">We've received your request</h1>
  </td></tr>
  <tr><td style="padding:36px 40px;">
    <p style="margin:0 0 20px;color:#3a3a3a;font-size:15px;line-height:1.6;">Hi ${p.contact.firstName},</p>
    <p style="margin:0 0 24px;color:#3a3a3a;font-size:15px;line-height:1.6;">
      Thank you for requesting a Botox&reg; Cosmetic appointment. <strong>Your appointment is not confirmed yet.</strong>
      Our team will review your preferred time and contact you shortly &mdash; usually by text or call &mdash; to confirm availability.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f5;border:1px solid #e8e0d8;border-radius:4px;margin-bottom:24px;">
    <tr><td style="padding:24px;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Offer</p>
      <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${p.offer.label} &mdash; $${p.offer.pricePerUnit}/unit</p>
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Preferred Date &amp; Time</p>
      <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${formatDate(p.preferredDate)} &mdash; ${p.preferredTime}</p>
      ${p.treatmentAreaLabel ? `<p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Treatment Interest</p>
      <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${p.treatmentAreaLabel}</p>` : ""}
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Request ID</p>
      <p style="margin:0;font-size:12px;color:#888;font-family:monospace;">${p.requestId}</p>
    </td></tr></table>
    <p style="margin:0 0 8px;color:#3a3a3a;font-size:14px;line-height:1.6;">
      Please keep an eye on your phone at <strong>${p.contact.phone}</strong>. Final dosing and treatment eligibility
      are determined at your visit by a licensed medical provider.
    </p>
    <p style="margin:24px 0 0;color:#888;font-size:13px;">Questions? <a href="tel:+19544697153" style="color:#c9a96e;text-decoration:none;">(954) 469-7153</a></p>
  </td></tr>
  <tr><td style="background:#f9f7f5;border-top:1px solid #e8e0d8;padding:20px 40px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#aaa;">Kami Aesthetics &bull; 2999 NE 191st St, Suite 906, Miami, FL 33180</p>
  </td></tr>
</table></td></tr></table>
</body></html>`;
}

// ── Email: staff notification (lead handoff) ─────────────────────────────────

function staffHtml(p: BotoxRequestPayload): string {
  const attribution = p.attribution
    ? Object.entries(p.attribution).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(" &bull; ")
    : "—";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 16px;">
<tr><td align="center"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:4px;border:1px solid #ddd;">
  <tr><td style="background:#1a1a1a;padding:20px 32px;">
    <p style="margin:0;color:#c9a96e;font-size:11px;letter-spacing:2px;text-transform:uppercase;">New Appointment Request &mdash; confirm manually in Mangomint</p>
    <p style="margin:4px 0 0;color:#fff;font-size:18px;">Botox &mdash; ${p.offer.label}</p>
  </td></tr>
  <tr><td style="padding:28px 32px;">
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Client</p>
    <p style="margin:0 0 20px;font-size:16px;font-weight:600;color:#1a1a1a;">${fullName(p)}</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="50%" style="padding-bottom:16px;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Phone (confirm by text/call)</p>
          <p style="margin:0;font-size:14px;color:#1a1a1a;"><a href="tel:${p.contact.phone}" style="color:#1a1a1a;">${p.contact.phone}</a></p>
        </td>
        <td width="50%" style="padding-bottom:16px;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Email</p>
          <p style="margin:0;font-size:14px;color:#1a1a1a;">${p.contact.email}</p>
        </td>
      </tr>
      <tr>
        <td width="50%" style="padding-bottom:16px;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Preferred Date</p>
          <p style="margin:0;font-size:14px;color:#1a1a1a;">${formatDate(p.preferredDate)}</p>
        </td>
        <td width="50%" style="padding-bottom:16px;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Preferred Time</p>
          <p style="margin:0;font-size:14px;color:#1a1a1a;">${p.preferredTime}</p>
        </td>
      </tr>
    </table>
    <hr style="border:none;border-top:1px solid #eee;margin:8px 0 20px;">
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Treatment Interest (optional)</p>
    <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${p.treatmentAreaLabel ?? "—"}</p>
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Promotion</p>
    <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${p.meta.offer} &mdash; $${p.offer.pricePerUnit}/unit &bull; ${p.meta.service} &bull; source: ${p.meta.source} &bull; campaign: ${p.meta.campaign}</p>
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Marketing SMS consent</p>
    <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${p.marketingConsent ? "Yes" : "No"}</p>
    <hr style="border:none;border-top:1px solid #eee;margin:8px 0 20px;">
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Attribution</p>
    <p style="margin:0 0 16px;font-size:12px;color:#888;">${attribution}</p>
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Request ID</p>
    <p style="margin:0;font-size:12px;color:#888;font-family:monospace;">${p.requestId}</p>
  </td></tr>
</table></td></tr></table>
</body></html>`;
}

// ── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as BotoxRequestPayload;

    if (!payload?.contact?.email || !payload.preferredDate) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Persist the lead first (durable record). If Postgres is unavailable we
    // still send the staff notification below, since that email is the actual
    // hand-off — a customer request must never be blocked by a DB hiccup.
    let dbSaved = false;
    try {
      await saveBotoxRequest(payload);
      dbSaved = true;
    } catch (dbErr) {
      console.error("[Botox API] Failed to save request:", dbErr);
    }

    const [clientResult, staffResult] = await Promise.allSettled([
      resend.emails.send({
        from: `Kami Aesthetics <${FROM}>`,
        to: payload.contact.email,
        subject: "We've received your Botox appointment request — Kami Aesthetics",
        html: clientHtml(payload),
      }),
      resend.emails.send({
        from: `Kami Bookings <${FROM}>`,
        to: NOTIFY,
        subject: `New Botox Request — ${fullName(payload)} — ${payload.preferredDate}`,
        html: staffHtml(payload),
      }),
    ]);

    const clientSent = clientResult.status === "fulfilled" && !clientResult.value.error;
    const staffSent = staffResult.status === "fulfilled" && !staffResult.value.error;

    if (clientResult.status === "rejected") console.error("[Botox API] Client email failed:", clientResult.reason);
    else if (clientResult.value.error) console.error("[Botox API] Client email Resend error:", clientResult.value.error);
    if (staffResult.status === "rejected") console.error("[Botox API] Staff email failed:", staffResult.reason);
    else if (staffResult.value.error) console.error("[Botox API] Staff email Resend error:", staffResult.value.error);

    if (dbSaved) {
      try {
        await markBotoxEmailResults(payload.requestId, { clientSent, staffSent });
      } catch (statusErr) {
        console.error("[Botox API] Failed to update email status:", statusErr);
      }
    }

    // Email failure should not block the on-site confirmation state.
    return NextResponse.json({ success: true, dbSaved }, { status: 200 });
  } catch (err) {
    console.error("[Botox API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    );
  }
}
