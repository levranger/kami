"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/data/constants";
import { botoxAnalytics } from "../lib/analytics";
import { isStaffedHours } from "../lib/businessHours";

interface StickyCallButtonProps {
  /** Where this instance lives — for analytics ("landing" | "request_flow"). */
  location: string;
  /** Lift above the mobile sticky footer so it never overlaps the primary button. */
  liftForStickyFooter?: boolean;
}

const PILL =
  "flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:border-amber-300 hover:text-amber-800";

/**
 * Floating "call us" pill. Only shown during staffed phone hours (Mon–Sat
 * 9am–8pm ET) so it never invites a call no one can answer. Mirrors the LHR
 * funnel's StickyCallButton, styled for the Botox landing page.
 */
export function StickyCallButton({ location, liftForStickyFooter = false }: StickyCallButtonProps) {
  const [staffed, setStaffed] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setStaffed(isStaffedHours());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // Resolved client-side only — server has no timezone context.
  if (!staffed) return null;

  const position = `fixed right-4 z-40 transition-[bottom] duration-200 ${
    liftForStickyFooter ? "bottom-24 md:bottom-6" : "bottom-4"
  }`;

  return (
    <a
      href={PHONE_HREF}
      onClick={() => botoxAnalytics.trackCallClicked(location)}
      className={`${position} ${PILL}`}
      aria-label={`Questions? Call us at ${PHONE_NUMBER}`}
    >
      <Phone className="h-3 w-3 text-amber-600" aria-hidden="true" />
      Questions? Call {PHONE_NUMBER}
    </a>
  );
}
