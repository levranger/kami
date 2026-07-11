import { Star } from "lucide-react";

interface LandingHeroProps {
  onGetEstimate: () => void;
}

export function LandingHero({ onGetEstimate }: LandingHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-rose-50 to-white px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-rose-700">
          Kami Aesthetics
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Natural-looking volume, tailored to you
        </h1>
        <p className="mx-auto mb-6 max-w-xl text-base text-slate-600 md:text-lg">
          Personalized dermal filler treatments focused on facial balance, proportion, and natural-looking results. Treatment plan tailored by a qualified provider.
        </p>
        <p className="mb-4 text-sm text-slate-500">
          Starting at <span className="font-semibold text-slate-800">$750/syringe</span>
        </p>
        <div className="mb-8 flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-4 w-4 fill-rose-400 text-rose-400" />
          ))}
          <span className="ml-2 text-sm text-slate-500">5.0 · Google Reviews</span>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onGetEstimate}
            className="w-full rounded-lg bg-rose-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:w-auto"
          >
            Get My Estimate
          </button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 text-left text-sm text-slate-600 md:grid-cols-3">
          {[
            "Personalized treatment plans",
            "Natural-looking approach",
            "Qualified medical provider",
            "Authentic authorized products",
            "Follow-up support",
            "Serving Aventura & Miami",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}