import { botoxOffer } from "../lib/botoxOffer";
import { PrimaryOfferCta } from "./PrimaryOfferCta";
import { PromoTerms } from "./PromoTerms";

/**
 * The offer block. Premium, quiet styling — no countdown timers, flashing
 * banners, fake scarcity, spinning animations, red warning colors or coupon
 * chrome. Just a clear price and a clear action.
 */
interface OfferSectionProps {
  onRequest: (placement: string) => void;
}

export function OfferSection({ onRequest }: OfferSectionProps) {
  return (
    <section id="offer" className="scroll-mt-6 bg-white px-4 py-12">
      <div className="mx-auto max-w-md rounded-2xl border border-amber-100 bg-gradient-to-b from-amber-50/60 to-white p-6 text-center shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
          Limited-Time Offer
        </p>

        <h2 className="mt-3 text-lg font-bold text-slate-900">{botoxOffer.productName}</h2>

        <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
          {botoxOffer.currency}
          {botoxOffer.pricePerUnit}
          <span className="align-baseline text-base font-semibold text-slate-500">/unit</span>
        </p>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
          Subtle, customized treatment designed to soften expression lines while keeping you
          looking like yourself.
        </p>

        <div className="mt-6">
          <PrimaryOfferCta placement="offer_section" onStart={onRequest} fullWidth />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Sends an appointment request — not an instant booking. We confirm your time with you.
        </p>

        <PromoTerms variant="block" className="mt-5" />
      </div>
    </section>
  );
}
