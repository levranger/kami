"use client";

import { botoxAnalytics } from "../lib/analytics";
import {
  BOTOX_PROMO_BOOKING_URL,
  BOOKING_OPENS_IN_NEW_TAB,
  formatOfferPrice,
} from "../lib/botoxOffer";

type Placement = "hero" | "offer_section" | "page_bottom" | "sticky_mobile";

interface PrimaryOfferCtaProps {
  placement: Placement;
  label?: string;
  fullWidth?: boolean;
  className?: string;
}

/**
 * The one primary call-to-action for the $10/unit campaign.
 *
 * It is a plain anchor to the Mangomint booking destination — navigation works
 * with zero JavaScript, so there are no broken handlers, stuck loading states or
 * hydration issues on any viewport. The click handler only fires analytics.
 */
export function PrimaryOfferCta({
  placement,
  label,
  fullWidth = false,
  className = "",
}: PrimaryOfferCtaProps) {
  const text = label ?? `Book ${formatOfferPrice()} Botox`;

  function handleClick() {
    botoxAnalytics.trackOfferCtaClick(placement);
    botoxAnalytics.trackBookingOpened(BOTOX_PROMO_BOOKING_URL);
  }

  return (
    <a
      href={BOTOX_PROMO_BOOKING_URL}
      target={BOOKING_OPENS_IN_NEW_TAB ? "_blank" : undefined}
      rel={BOOKING_OPENS_IN_NEW_TAB ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      data-cta="botox-promo-booking"
      className={`inline-flex min-h-[52px] items-center justify-center rounded-lg bg-amber-700 px-8 py-4 text-center text-base font-semibold text-white shadow-lg transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
        fullWidth ? "w-full" : "w-full sm:w-auto"
      } ${className}`}
    >
      {text}
    </a>
  );
}
