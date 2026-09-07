import { MUST_HAVE_OFFER } from "../lib/offers";
import { formatCurrency } from "../lib/pricing";

// Compact, visually subtle offer reminder shown at the top of the Appointment
// step. Deliberately not a recreation of the landing-page promo card — it just
// keeps the visitor anchored to what they're requesting, and makes clear that
// picking a visible time is a request, not a confirmed booking.
export default function OfferReminder() {
  return (
    <div className="mb-6 rounded-sm border border-warm-border bg-warm-white px-4 py-3">
      <p className="font-inter text-xs font-semibold text-[#1A1A1A]">
        Your {formatCurrency(MUST_HAVE_OFFER.price)} New Client Offer
      </p>
      <p className="font-inter text-xs text-warm-gray mt-0.5">
        {MUST_HAVE_OFFER.areasLabel}
      </p>
      <p className="font-inter text-xs text-warm-gray mt-1.5">
        No payment required today. Your requested time will be confirmed by our team.
      </p>
    </div>
  );
}
