import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.BOOKING_FROM_EMAIL   ?? "bookings@kamiaesthetics.com";
const NOTIFY = process.env.BOOKING_NOTIFICATION_EMAIL ?? "shk.lab.fl@gmail.com";

interface FillersPayload {
  bookingRequestId: string;
  contactInfo: {
    fullName: string;
    phone: string;
    email: string;
    isNewPatient: boolean;
    hasSensitiveSkin: boolean;
  };
  selectedAreas: string[];
  selectedGoal: string | null;
  appointmentType: string;
  selectedDate: string;
  selectedTime: string;
  estimateSummary: {
    estimatedSyringes?: { min: number; max: number } | null;
    estimatedPrice?: { min: number; max: number } | null;
    depositAmount: number;
  } | null;
  attribution?: Record<string, string | undefined>;
}

function formatDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}
function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h > 12 ? h - 12 : h}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}
function formatRange(r: { min: number; max: number } | null | undefined, prefix = "") {
  if (!r) return "TBD";
  return `${prefix}${r.min}–${prefix}${r.max}`;
}

function clientHtml(p: FillersPayload): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9f7f5;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f5;padding:40px 16px;">
<tr><td align="center"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:4px;border:1px solid #e8e0d8;">
  <tr><td style="background:#1a1a1a;padding:32px 40px;text-align:center;">
    <p style="margin:0;color:#c9a96e;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Kami Aesthetics</p>
    <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:400;font-family:Georgia,serif;">Appointment Request Received</h1>
  </td></tr>
  <tr><td style="padding:36px 40px;">
    <p style="margin:0 0 20px;color:#3a3a3a;font-size:15px;line-height:1.6;">Hi ${p.contactInfo.fullName.split(" ")[0]},</p>
    <p style="margin:0 0 24px;color:#3a3a3a;font-size:15px;line-height:1.6;">
      We've received your dermal filler appointment request. Our team will reach out shortly to confirm availability and next steps.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f5;border:1px solid #e8e0d8;border-radius:4px;margin-bottom:24px;">
    <tr><td style="padding:24px;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Treatment Areas</p>
      <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${p.selectedAreas.join(", ") || "—"}</p>
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Estimated Price Range</p>
      <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${formatRange(p.estimateSummary?.estimatedPrice, "$")}</p>
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Requested Date &amp; Time</p>
      <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${formatDate(p.selectedDate)} at ${formatTime(p.selectedTime)}</p>
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Request ID</p>
      <p style="margin:0;font-size:12px;color:#888;font-family:monospace;">${p.bookingRequestId}</p>
    </td></tr></table>
    <p style="margin:0 0 8px;color:#3a3a3a;font-size:14px;line-height:1.6;">
      A member of our team will call or text you at <strong>${p.contactInfo.phone}</strong> to confirm your slot.
    </p>
    <p style="margin:24px 0 0;color:#888;font-size:13px;">Questions? <a href="tel:+19544697153" style="color:#c9a96e;text-decoration:none;">(954) 469-7153</a></p>
  </td></tr>
  <tr><td style="background:#f9f7f5;border-top:1px solid #e8e0d8;padding:20px 40px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#aaa;">Kami Aesthetics &bull; 2999 NE 191st St, Aventura, FL 33180</p>
  </td></tr>
</table></td></tr></table>
</body></html>`;
}

function staffHtml(p: FillersPayload): string {
  const attribution = p.attribution
    ? Object.entries(p.attribution).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(" &bull; ")
    : "—";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 16px;">
<tr><td align="center"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:4px;border:1px solid #ddd;">
  <tr><td style="background:#1a1a1a;padding:20px 32px;">
    <p style="margin:0;color:#c9a96e;font-size:11px;letter-spacing:2px;text-transform:uppercase;">New Booking Request</p>
    <p style="margin:4px 0 0;color:#fff;font-size:18px;">Dermal Fillers</p>
  </td></tr>
  <tr><td style="padding:28px 32px;">
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Client</p>
    <p style="margin:0 0 20px;font-size:16px;font-weight:600;color:#1a1a1a;">${p.contactInfo.fullName}</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="50%" style="padding-bottom:16px;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Phone</p>
          <p style="margin:0;font-size:14px;color:#1a1a1a;"><a href="tel:${p.contactInfo.phone}" style="color:#1a1a1a;">${p.contactInfo.phone}</a></p>
        </td>
        <td width="50%" style="padding-bottom:16px;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Email</p>
          <p style="margin:0;font-size:14px;color:#1a1a1a;">${p.contactInfo.email}</p>
        </td>
      </tr>
      <tr>
        <td width="50%" style="padding-bottom:16px;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">New Patient</p>
          <p style="margin:0;font-size:14px;color:#1a1a1a;">${p.contactInfo.isNewPatient ? "Yes" : "No"}</p>
        </td>
        <td width="50%" style="padding-bottom:16px;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Requested Slot</p>
          <p style="margin:0;font-size:14px;color:#1a1a1a;">${formatDate(p.selectedDate)}<br>${formatTime(p.selectedTime)}</p>
        </td>
      </tr>
    </table>
    <hr style="border:none;border-top:1px solid #eee;margin:8px 0 20px;">
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Treatment Areas</p>
    <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${p.selectedAreas.join(", ") || "—"}</p>
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Goal</p>
    <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${p.selectedGoal ?? "—"}</p>
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Estimate</p>
    <p style="margin:0 0 4px;font-size:14px;color:#1a1a1a;">${formatRange(p.estimateSummary?.estimatedSyringes)} syringes &mdash; ${formatRange(p.estimateSummary?.estimatedPrice, "$")}</p>
    <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">Deposit: $${p.estimateSummary?.depositAmount ?? 50}</p>
    <hr style="border:none;border-top:1px solid #eee;margin:8px 0 20px;">
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Attribution</p>
    <p style="margin:0 0 16px;font-size:12px;color:#888;">${attribution}</p>
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Request ID</p>
    <p style="margin:0;font-size:12px;color:#888;font-family:monospace;">${p.bookingRequestId}</p>
  </td></tr>
</table></td></tr></table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as FillersPayload;

    const [clientResult, staffResult] = await Promise.allSettled([
      resend.emails.send({
        from: `Kami Aesthetics <${FROM}>`,
        to: payload.contactInfo.email,
        subject: "Your Dermal Filler Appointment Request — Kami Aesthetics",
        html: clientHtml(payload),
      }),
      resend.emails.send({
        from: `Kami Bookings <${FROM}>`,
        to: NOTIFY,
        subject: `New Fillers Booking — ${payload.contactInfo.fullName} — ${payload.selectedDate}`,
        html: staffHtml(payload),
      }),
    ]);

    if (clientResult.status === "rejected") {
      console.error("[Fillers API] Client email failed:", clientResult.reason);
    } else if (clientResult.value.error) {
      console.error("[Fillers API] Client email Resend error:", clientResult.value.error);
    }

    if (staffResult.status === "rejected") {
      console.error("[Fillers API] Staff email failed:", staffResult.reason);
    } else if (staffResult.value.error) {
      console.error("[Fillers API] Staff email Resend error:", staffResult.value.error);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Fillers API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
