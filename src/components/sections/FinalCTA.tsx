import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { BOOKING_URL, PHONE_NUMBER, PHONE_HREF } from "@/data/content";

const CTA_IMAGE =
  "https://mgx-backend-cdn.metadl.com/generate/images/1059255/2026-03-25/9644fd27-0fc8-4ec0-a260-addf6811ffba.png";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={CTA_IMAGE}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/75" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Start Your Journey</span>
            <div className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>

          <h2 id="cta-heading" className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4">
            Book Your Consultation<br /><span className="text-gold">Today</span>
          </h2>

          <p className="font-inter text-white/70 text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Take the first step toward your aesthetic goals. Our team is ready to create a personalized treatment plan just for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-white font-inter text-sm tracking-wider px-10 py-6 rounded-none transition-all duration-300 group">
                Book Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Button>
            </a>
            <a href={PHONE_HREF} className="flex items-center gap-2 font-inter text-sm text-white/80 hover:text-gold transition-colors duration-200" aria-label={`Call us at ${PHONE_NUMBER}`}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
