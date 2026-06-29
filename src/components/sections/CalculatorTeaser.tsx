"use client";

import Link from "next/link";
import { Calculator } from "lucide-react";
import { track } from "@/lib/track";

export default function CalculatorTeaser() {
  return (
    <section className="bg-warm-white border-y border-warm-border py-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <Calculator className="h-5 w-5 text-gold" aria-hidden="true" />
            </div>
            <div>
              <p className="font-inter text-sm font-semibold text-[#1A1A1A]">
                See how much you save with laser hair removal
              </p>
              <p className="font-inter text-xs text-warm-gray">
                Compare your current waxing or shaving costs in seconds.
              </p>
            </div>
          </div>
          <Link
            href="/services/lasers/laser-hair-removal#savings-calculator"
            onClick={() => track("calculator_teaser_click", { location: "homepage" })}
            className="flex-shrink-0 font-inter text-sm tracking-wider bg-[#1A1A1A] hover:bg-gold text-white px-6 py-3 transition-colors duration-300"
          >
            Try the Calculator
          </Link>
        </div>
      </div>
    </section>
  );
}
