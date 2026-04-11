import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homepageFAQs } from "@/data/content";

export default function FAQ() {
  return (
    <section id="faq" className="section-padding bg-warm-white" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Common Questions</span>
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
            </div>
            <h2 id="faq-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {homepageFAQs.map((faq, index) => (
              <details key={index} className="bg-white border border-warm-border rounded-sm px-6 group open:border-gold/50 transition-colors duration-200">
                <summary className="font-inter text-sm font-semibold text-[#1A1A1A] hover:text-gold py-5 cursor-pointer list-none flex items-center justify-between gap-4">
                  {faq.question}
                  <svg className="h-4 w-4 flex-shrink-0 text-gold transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="font-inter text-sm text-warm-gray leading-relaxed pb-5">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 font-inter text-sm font-medium text-gold hover:text-gold-dark transition-colors duration-200"
            >
              See all frequently asked questions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
