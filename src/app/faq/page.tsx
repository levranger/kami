import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import FAQPageClient from "@/components/FAQPageClient";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { siteSEO } from "@/data/content";
import { faqCategories, allFAQsForSchema } from "@/data/faq";

const BOOKING_URL = "https://kami.myaestheticrecord.com/online-booking";
const CANONICAL = "https://kamiaesthetics.com/faq";

export const metadata: Metadata = {
  title: "FAQ – Kami Aesthetics | Laser Hair Removal, Botox & More in Aventura FL",
  description:
    "Got questions about laser hair removal, Botox, fillers, or PRP in Aventura FL? Find answers to the most common questions about treatments at Kami Aesthetics.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "FAQ – Kami Aesthetics | Laser Hair Removal, Botox & More in Aventura FL",
    description:
      "Got questions about laser hair removal, Botox, fillers, or PRP in Aventura FL? Find answers to the most common questions about treatments at Kami Aesthetics.",
    url: CANONICAL,
    
    siteName: siteSEO.siteName,
    images: [{ url: siteSEO.defaultOgImage, width: 1200, height: 630, alt: "FAQ – Kami Aesthetics" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ – Kami Aesthetics | Laser Hair Removal, Botox & More in Aventura FL",
    description:
      "Got questions about laser hair removal, Botox, fillers, or PRP in Aventura FL? Find answers to the most common questions about treatments at Kami Aesthetics.",
    images: [siteSEO.defaultOgImage],
  },
};

export default function FAQPage() {
  const faqSchema = buildFAQSchema(allFAQsForSchema);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteSEO.baseUrl },
    { name: "FAQ", url: CANONICAL },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[faqSchema, breadcrumbSchema]} />
      <a href="#faq-main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Header />

      <main id="faq-main-content" role="main">
        {/* Hero */}
        <section className="bg-[#1A1A1A] py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gold" aria-hidden="true" />
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold">Common Questions</span>
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-4">
                Frequently Asked Questions
              </h1>
              <p className="font-inter text-base text-white/60 leading-relaxed max-w-lg mb-8">
                Everything you need to know about laser hair removal, Botox, fillers, PRP, and IPL treatments at our Aventura clinic.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-inter text-sm font-medium tracking-wide px-7 py-3.5 rounded-sm transition-colors duration-200"
              >
                Book Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Interactive FAQ */}
        <section className="bg-warm-white" aria-label="Frequently asked questions">
          <FAQPageClient categories={faqCategories} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
