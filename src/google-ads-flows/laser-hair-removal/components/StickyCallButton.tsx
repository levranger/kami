"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/data/content";
import { isStaffedHours } from "../lib/businessHours";

interface StickyCallButtonProps {
  // Lifts the pill above MobileStickyFooter when that's on screen, so it
  // never overlaps the (dominant) Continue button.
  liftForStickyFooter: boolean;
}

const PILL_CLASSES =
  "flex items-center gap-1.5 rounded-full border border-warm-border bg-white/95 px-3 py-1.5 font-inter text-xs text-warm-gray shadow-sm backdrop-blur-sm hover:text-gold hover:border-gold transition-colors";

// Only ever shows the "Call us" pill during staffed hours — outside those
// hours it renders nothing, so it never competes with the (dominant)
// Continue button when no one's there to pick up.
export default function StickyCallButton({ liftForStickyFooter }: StickyCallButtonProps) {
  const [staffed, setStaffed] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setStaffed(isStaffedHours());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // Resolved on the client only — the server has no timezone context, so
  // rendering a guess there would just mean a hydration mismatch a second later.
  if (!staffed) return null;

  const positionClasses = `fixed right-4 z-40 transition-[bottom] duration-200 ${
    liftForStickyFooter ? "bottom-24" : "bottom-4"
  }`;

  return (
    <a
      href={PHONE_HREF}
      data-track="phone_click"
      data-track-location="laser_funnel_sticky"
      className={`${positionClasses} ${PILL_CLASSES}`}
      aria-label={`Questions? Call us at ${PHONE_NUMBER}`}
    >
      <Phone className="h-3 w-3 text-gold" aria-hidden="true" />
      Questions? Call {PHONE_NUMBER}
    </a>
  );
}
