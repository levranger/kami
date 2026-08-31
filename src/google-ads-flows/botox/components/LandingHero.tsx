import { Star } from "lucide-react";
import { botoxAnalytics } from "../lib/analytics";
import {
  botoxOffer,
  provider,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEWS_URL,
} from "../lib/botoxOffer";
import { PrimaryOfferCta } from "./PrimaryOfferCta";
import { PromoTerms } from "./PromoTerms";

interface LandingHeroProps {
  /** Optional secondary path into the legacy in-page unit/cost estimate tool. */
  onEstimate?: () => void;
}

export function LandingHero({ onEstimate }: LandingHeroProps) {
  const reviewText =
    GOOGLE_REVIEW_COUNT != null
      ? `${GOOGLE_RATING.toFixed(1)} ★ on Google · ${GOOGLE_REVIEW_COUNT}+ reviews`
      : `${GOOGLE_RATING.toFixed(1)} ★ on Google`;

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white px-4 py-8 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        {/* Branding */}
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-amber-700">
          Kami Aesthetics
        </p>

        {/* Headline */}
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Look refreshed, not overdone
        </h1>

        {/* Offer */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-800">
          Limited-Time {botoxOffer.productName} — {botoxOffer.currency}
          {botoxOffer.pricePerUnit}/unit
        </div>

        {/* Supporting Copy */}
        <p className="mx-auto mb-4 max-w-xl text-base text-slate-600 md:text-lg">
          Personalized wrinkle-relaxer treatments with natural-looking results. Treatment
          plan tailored by {provider.name}, {provider.credential}.
        </p>

        {/* Social Proof — clickable, links to the clinic's Google listing */}
        <div className="mb-5 flex items-center justify-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => botoxAnalytics.trackReviewsClicked()}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm text-slate-500 transition hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label={`${reviewText} — opens the Kami Aesthetics Google listing`}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-1">{reviewText}</span>
          </a>
        </div>

        {/* Primary CTA + promotion fine print */}
        <div className="flex flex-col items-center gap-3">
          <PrimaryOfferCta placement="hero" />
          <PromoTerms variant="compact" />
          {onEstimate && (
            <button
              type="button"
              onClick={onEstimate}
              className="text-xs text-slate-500 underline underline-offset-2 hover:text-slate-700"
            >
              Prefer to estimate your units and cost first?
            </button>
          )}
        </div>

        {/* Trust Items */}
        <div className="mt-10 grid grid-cols-2 gap-3 text-left text-sm text-slate-600 md:grid-cols-3">
          {[
            "Personalized dosing",
            "Natural-looking approach",
            `Care from ${provider.name}, ${provider.credential}`,
            "Serving Aventura & Miami",
            "Quick appointment times",
            "Follow-up support",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
