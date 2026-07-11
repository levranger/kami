import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.BOOKING_FROM_EMAIL ?? "bookings@kamiaesthetics.com";
const NOTIFY = process.env.BOOKING_NOTIFICATION_EMAIL ?? "shk.lab.fl@gmail.com";

// ── Types ────────────────────────────────────────────────────────────────────

interface BookingPayload {
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

// ── Helpers ──────────────────────────────────────────────────────────────────

const PACKAGE_LABELS: Record<string, string> = {
  single: "Single Session",
  four:   "4-Session Package",
  six:    "6-Session Package",
};

function formatCurrency(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  return `${h > 12 ? h - 12 : h}:${m.toString().padStart(2, "0")} ${period}`;
}

// ── Email: client confirmation ────────────────────────────────────────────────

function clientEmailHtml(p: BookingPayload): string {
  const areas = p.selectedAreas.map((a) => a.name).join(", ");
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f7f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:4px;overflow:hidden;border:1px solid #e8e0d8;">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#c9a96e;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Kami Aesthetics</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:400;font-family:Georgia,serif;">Appointment Request Received</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;color:#3a3a3a;font-size:15px;line-height:1.6;">
              Hi ${p.contactInfo.fullName.split(" ")[0]},
            </p>
            <p style="margin:0 0 24px;color:#3a3a3a;font-size:15px;line-height:1.6;">
              We've received your laser hair removal appointment request. Our team will reach out to you shortly to confirm availability and next steps.
            </p>

            <!-- Summary box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f5;border:1px solid #e8e0d8;border-radius:4px;margin-bottom:24px;">
              <tr><td style="padding:24px;">
                <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Treatment Areas</p>
                <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${areas}</p>

                <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Package</p>
                <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${PACKAGE_LABELS[p.selectedPackage]} &mdash; ${formatCurrency(p.pricingSummary.packageTotal)}</p>

                <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Requested Date &amp; Time</p>
                <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${formatDate(p.selectedDate)} at ${formatTime(p.selectedTime)}</p>

                <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;font-weight:600;">Request ID</p>
                <p style="margin:0;font-size:12px;color:#888;font-family:monospace;">${p.bookingRequestId}</p>
              </td></tr>
            </table>

            <p style="margin:0 0 8px;color:#3a3a3a;font-size:14px;line-height:1.6;">
              <strong>What happens next:</strong> A member of our team will call or text you at <strong>${p.contactInfo.phone}</strong> to confirm your slot and send a deposit link to hold your appointment.
            </p>

            <p style="margin:24px 0 0;color:#888;font-size:13px;line-height:1.6;">
              Questions? Call or text us at <a href="tel:+19544697153" style="color:#c9a96e;text-decoration:none;">(954) 469-7153</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f7f5;border-top:1px solid #e8e0d8;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#aaa;">Kami Aesthetics &bull; 2999 NE 191st St, Aventura, FL 33180</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Email: staff notification ─────────────────────────────────────────────────

function staffEmailHtml(p: BookingPayload): string {
  const areas = p.selectedAreas.map((a) => `${a.name} (${formatCurrency(a.price)})`).join(", ");
  const attribution = p.attribution
    ? Object.entries(p.attribution)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" &bull; ")
    : "—";

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:4px;border:1px solid #ddd;">

        <tr>
          <td style="background:#1a1a1a;padding:20px 32px;">
            <p style="margin:0;color:#c9a96e;font-size:11px;letter-spacing:2px;text-transform:uppercase;">New Booking Request</p>
            <p style="margin:4px 0 0;color:#fff;font-size:18px;">Laser Hair Removal</p>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px;">

            <!-- Client -->
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
            <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">${areas}</p>

            <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Package</p>
            <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;">
              ${PACKAGE_LABELS[p.selectedPackage]} &mdash; <strong>${formatCurrency(p.pricingSummary.packageTotal)}</strong>
              ${p.pricingSummary.savings > 0 ? ` (saves ${formatCurrency(p.pricingSummary.savings)})` : ""}
            </p>

            <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Deposit</p>
            <p style="margin:0 0 20px;font-size:14px;color:#1a1a1a;">${formatCurrency(p.pricingSummary.depositAmount)} to collect</p>

            <hr style="border:none;border-top:1px solid #eee;margin:8px 0 20px;">

            <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Attribution</p>
            <p style="margin:0 0 16px;font-size:12px;color:#888;">${attribution}</p>

            <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;">Request ID</p>
            <p style="margin:0;font-size:12px;color:#888;font-family:monospace;">${p.bookingRequestId}</p>

          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as BookingPayload;

    const { fullName, email } = payload.contactInfo;

    const [clientResult, staffResult] = await Promise.allSettled([
      resend.emails.send({
        from: `Kami Aesthetics <${FROM}>`,
        to: email,
        subject: "Your Laser Hair Removal Request — Kami Aesthetics",
        html: clientEmailHtml(payload),
      }),
      resend.emails.send({
        from: `Kami Bookings <${FROM}>`,
        to: NOTIFY,
        subject: `New LHR Booking — ${fullName} — ${payload.selectedDate}`,
        html: staffEmailHtml(payload),
      }),
    ]);

    if (clientResult.status === "rejected") {
      console.error("[LHR API] Client email failed:", clientResult.reason);
    } else if (clientResult.value.error) {
      console.error("[LHR API] Client email Resend error:", clientResult.value.error);
    }

    if (staffResult.status === "rejected") {
      console.error("[LHR API] Staff email failed:", staffResult.reason);
    } else if (staffResult.value.error) {
      console.error("[LHR API] Staff email Resend error:", staffResult.value.error);
    }

    // Always return success — email failure should not block the booking confirmation
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[LHR API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
