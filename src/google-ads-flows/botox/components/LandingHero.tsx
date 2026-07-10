import { Star } from "lucide-react";

interface LandingHeroProps {
  onGetEstimate: () => void;
}

export function LandingHero({ onGetEstimate }: LandingHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        {/* Branding */}
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-amber-700">
          Kami Aesthetics
        </p>

        {/* Headline */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Look refreshed, not overdone
        </h1>

        {/* Supporting Copy */}
        <p className="mx-auto mb-6 max-w-xl text-base text-slate-600 md:text-lg">
          Personalized wrinkle-relaxer treatments with natural-looking results.
          Treatment plan tailored by a qualified provider.
        </p>

        {/* Starting Price */}
        <p className="mb-4 text-sm text-slate-500">
          Starting at <span className="font-semibold text-slate-800">$14/unit</span> · Botox Cosmetic
        </p>

        {/* Social Proof */}
        <div className="mb-8 flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-2 text-sm text-slate-500">5.0 · Google Reviews</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onGetEstimate}
            className="w-full rounded-lg bg-amber-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto"
          >
            Get My Estimate
          </button>
          <a
            href="tel:+13055551234"
            className="w-full rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-amber-600 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto"
          >
            Book a Consultation
          </a>
        </div>

        {/* Trust Items */}
        <div className="mt-10 grid grid-cols-2 gap-3 text-left text-sm text-slate-600 md:grid-cols-3">
          {[
            "Personalized dosing",
            "Natural-looking approach",
            "Qualified medical provider",
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