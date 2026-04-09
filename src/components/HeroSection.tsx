"use client";

import HeroImage from "@/components/HeroImage";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/data/content";

const HERO_IMAGE = "hero-main_mxhbyc";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0" aria-hidden="true">
        <HeroImage
          src={HERO_IMAGE}
          alt="Kami Aesthetics treatment room in Aventura, Florida — premium laser hair removal and aesthetic services"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-[#1A1A1A]/50 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="h-px w-12 bg-gold" aria-hidden="true" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold">Aventura, Florida</span>
          </div>

          <h1 id="hero-heading" className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Laser Hair Removal
            <br />
            <span className="text-gold" aria-hidden="true">&amp;</span>
            <span className="sr-only"> and </span> Aesthetic
            <br />
            Treatments
          </h1>

          <p className="font-inter text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Experience premium results with the Lumenis Splendor X — the gold standard in laser technology. Advanced treatments for every skin type, delivered with precision and care.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-white font-inter text-sm tracking-wider px-8 py-6 rounded-none transition-all duration-300 group">
                Book Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline" className="!bg-transparent border-white/40 text-white hover:border-gold hover:text-gold font-inter text-sm tracking-wider px-8 py-6 rounded-none transition-all duration-300">
                View Services
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
    </section>
  );
}
