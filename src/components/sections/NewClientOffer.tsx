import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import { newClientOffer, BOOKING_URL } from "@/data/content";

export default function NewClientOffer() {
  return (
    <section id="specials" className="section-padding bg-[#1A1A1A] relative overflow-hidden" aria-labelledby="offer-heading">
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, #C5A572 1px, transparent 1px), radial-gradient(circle at 75% 75%, #C5A572 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">{newClientOffer.tag}</span>
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
            </div>
            <h2 id="offer-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">{newClientOffer.headline}</h2>
            <p className="font-inter text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">{newClientOffer.description}</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-sm">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="h-5 w-5 text-gold" aria-hidden="true" />
                <span className="font-inter text-sm font-semibold text-gold tracking-wide">Powered by Lumenis Splendor X</span>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-2">Choose Any 3 Areas</h3>
              <p className="font-inter text-sm text-white/50 mb-8">Mix and match from our most popular treatment zones</p>
              <div className="grid sm:grid-cols-3 gap-4 mb-8" role="list" aria-label="Included treatment areas">
                {newClientOffer.areas.map((area) => (
                  <div key={area} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-sm" role="listitem">
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Check className="h-3.5 w-3.5 text-gold" />
                    </div>
                    <span className="font-inter text-sm text-white font-medium">{area}</span>
                  </div>
                ))}
              </div>
              <ul className="space-y-3" aria-label="Splendor X technology benefits">
                {["BLEND X™ dual-wavelength technology", "Safe for ALL skin types (Fitzpatrick I–VI)", "Virtually painless with dual cooling system", "Fastest treatment times in the industry"].map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <Sparkles className="h-3.5 w-3.5 text-gold flex-shrink-0" aria-hidden="true" />
                    <span className="font-inter text-sm text-white/70">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 p-8 md:p-10 rounded-sm flex flex-col justify-between">
              <div>
                {newClientOffer.badge && (
                  <div className="inline-block bg-gold text-white text-[10px] font-inter font-semibold tracking-wider uppercase px-3 py-1 mb-6">{newClientOffer.badge}</div>
                )}
                <div className="mb-2">
                  <span className="font-playfair text-6xl md:text-7xl font-bold text-white">{newClientOffer.price}</span>
                </div>
                {newClientOffer.priceNote && <p className="font-inter text-sm text-white/50 mb-2">{newClientOffer.priceNote}</p>}
                <div className="h-px bg-white/10 my-6" aria-hidden="true" />
                <p className="font-inter text-sm text-white/70 leading-relaxed mb-2">Your introductory session includes:</p>
                <ul className="space-y-2 mb-8" aria-label="What's included">
                  {["Free skin consultation", "Customized treatment settings", "Post-treatment care kit", "No commitment required"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-gold flex-shrink-0" aria-hidden="true" />
                      <span className="font-inter text-sm text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button size="lg" className="w-full bg-gold hover:bg-gold-dark text-white font-inter text-sm tracking-wider px-8 py-6 rounded-none transition-all duration-300 group">
                  {newClientOffer.cta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
