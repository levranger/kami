"use client";

import AppImage from "@/components/AppImage";
import { Zap, ShieldCheck, Award, Heart } from "lucide-react";
import { SPLENDOR_X_IMAGE } from "@/data/content";

const reasons = [
  { icon: Zap, title: "Splendor X Technology", description: "The world's first BLEND X™ technology combining Alexandrite and Nd:YAG lasers for superior results on all skin types — faster, safer, and more comfortable." },
  { icon: Award, title: "Premium Results", description: "We don't cut corners. Every treatment is performed with medical-grade precision to deliver visible, lasting results you can trust." },
  { icon: ShieldCheck, title: "Safety & Expertise", description: "Our licensed professionals undergo rigorous training on the latest protocols. Your safety and comfort are our top priorities." },
  { icon: Heart, title: "Personalized Care", description: "Every client receives a customized treatment plan designed around their unique skin type, goals, and lifestyle." },
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="section-padding bg-white" aria-labelledby="why-choose-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-sm overflow-hidden h-[500px]">
              <AppImage
                src={SPLENDOR_X_IMAGE}
                alt="Lumenis Splendor X laser system — the world's most advanced dual-wavelength laser for hair removal, used at Kami Aesthetics in Aventura"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 to-transparent" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-6 -right-4 md:right-8 bg-white border border-warm-border shadow-lg p-5 rounded-sm" aria-label="Number 1 laser platform worldwide">
              <p className="font-playfair text-2xl font-bold text-gold">#1</p>
              <p className="font-inter text-xs text-warm-gray mt-1">Laser Platform<br />Worldwide</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Why Kami</span>
            </div>
            <h2 id="why-choose-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Why Choose<br />Kami Aesthetics
            </h2>
            <p className="font-inter text-sm text-warm-gray leading-relaxed mb-10">
              We invest in the best technology and talent so you get the best results — period.
            </p>
            <div className="space-y-8">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-warm-white border border-warm-border flex items-center justify-center group-hover:border-gold transition-colors duration-300" aria-hidden="true">
                    <reason.icon className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-inter text-sm font-semibold text-[#1A1A1A] mb-1">{reason.title}</h3>
                    <p className="font-inter text-sm text-warm-gray leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
