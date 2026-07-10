import { ArrowRight, Star } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import TrustSection from "./TrustSection";

interface LandingHeroProps {
  onStartBooking: () => void;
}

export default function LandingHero({ onStartBooking }: LandingHeroProps) {
  return (
    <section className="bg-[#1A1A1A] relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Content */}
          <div>
            {/* Branding */}
            <div className="mb-6">
              <span className="font-playfair text-2xl font-bold text-white tracking-tight">
                KAMI
              </span>
              <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/50 ml-2">
                Aesthetics
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-4"
            >
              Smooth skin
              <br />
              <span className="text-gold">starts here</span>
            </h1>

            {/* Supporting copy */}
            <p className="font-inter text-sm md:text-base text-white/70 leading-relaxed mb-4 max-w-md">
              Premium laser hair removal with the Lumenis Splendor X. Safe for all skin types.
              Comfortable treatments. Lasting results.
            </p>

            {/* Starting price */}
            <p className="font-inter text-sm text-gold font-medium mb-6">
              Starting at $49/session · Packages available
            </p>

            {/* Social proof placeholder */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                ))}
              </div>
              <span className="font-inter text-xs text-white/60">
                5.0 · 50+ Google Reviews
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={onStartBooking}
              className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-white font-inter text-sm font-semibold tracking-wider px-8 py-4 rounded-sm transition-all duration-200 group flex items-center justify-center gap-2 min-h-[52px]"
            >
              Check Price &amp; Availability
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>

            {/* Trust items */}
            <TrustSection />
          </div>

          {/* Right: Before/After */}
          <div className="hidden lg:block">
            <BeforeAfterSlider />
          </div>
        </div>

        {/* Mobile Before/After */}
        <div className="lg:hidden mt-10">
          <BeforeAfterSlider />
        </div>
      </div>
    </section>
  );
}