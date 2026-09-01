"use client";

interface PrimaryOfferCtaProps {
  /** Where this CTA lives — passed to the parent for analytics. */
  placement: "hero" | "offer_section" | "page_bottom" | "sticky_mobile";
  /** Opens the on-site appointment-request flow. */
  onStart: (placement: string) => void;
  label?: string;
  fullWidth?: boolean;
  className?: string;
}

/**
 * The one primary call-to-action for the $10/unit campaign.
 *
 * It no longer links to Mangomint. It starts the on-site appointment-request
 * flow (BotoxRequestFlow); Kami staff confirm availability and add the
 * appointment to Mangomint manually. Plain button, no outbound navigation.
 */
export function PrimaryOfferCta({
  placement,
  onStart,
  label = "Request Appointment",
  fullWidth = false,
  className = "",
}: PrimaryOfferCtaProps) {
  return (
    <button
      type="button"
      onClick={() => onStart(placement)}
      data-cta="botox-promo-request"
      className={`inline-flex min-h-[52px] items-center justify-center rounded-lg bg-amber-700 px-8 py-4 text-center text-base font-semibold text-white shadow-lg transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
        fullWidth ? "w-full" : "w-full sm:w-auto"
      } ${className}`}
    >
      {label}
    </button>
  );
}
