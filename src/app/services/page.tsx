import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { categoryDefs } from "@/data/categories";
import { BOOKING_URL } from "@/data/constants";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildPageMetadata({
  title: "Medical Aesthetics Services Aventura FL | Kami Aesthetics",
  description:
    "Explore our full menu of medical aesthetic services in Aventura, FL — laser treatments, injectables, and wellness therapies. Book a free consultation today.",
  canonical: "https://kamiaesthetics.com/services",
  keywords: [
    "medical aesthetics services aventura",
    "med spa services aventura fl",
    "laser hair removal aventura",
    "botox aventura",
    "dermal fillers aventura",
    "aesthetic treatments miami",
  ],
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <AnnouncementBar />
      <Header />
      <main id="main-content" role="main">
        {/* Hero */}
        <section className="section-padding bg-warm-white">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Aventura, FL</span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
              Our Aesthetic Services
            </h1>
            <p className="font-inter text-warm-gray leading-relaxed text-base md:text-lg mb-8">
              At Kami Aesthetics in Aventura, FL, we offer advanced medical aesthetic treatments across three categories — laser treatments, injectables, and wellness therapies. Every service is delivered by trained professionals using the latest technology, tailored to your unique skin and goals.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button className="btn-primary">Book Free Consultation</Button>
            </a>
          </div>
        </section>

        {/* Category Grid */}
        <section className="section-padding" aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="sr-only">Service Categories</h2>
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {categoryDefs.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/services/${cat.slug}`}
                  className="group relative overflow-hidden rounded-sm border border-warm-border hover-lift block"
                  aria-label={`Explore ${cat.title}`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={cat.heroImage}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.heroGradient} opacity-70`} />
                    <div className="absolute bottom-4 left-4">
                      <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold">{cat.tagline}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h2 className="font-playfair text-xl font-semibold text-[#1A1A1A] mb-3 group-hover:text-gold transition-colors duration-200">
                      {cat.title}
                    </h2>
                    <p className="font-inter text-sm text-warm-gray leading-relaxed mb-4">
                      {cat.intro}
                    </p>
                    <span className="font-inter text-xs tracking-wider uppercase text-[#1A1A1A] hover:text-gold flex items-center gap-1 group/btn">
                      Explore {cat.title}
                      <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-warm-white">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-xl">
            <p className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-4">
              Not sure where to start?
            </p>
            <p className="font-inter text-sm text-warm-gray mb-6">
              Book a free consultation and we&apos;ll create a personalized treatment plan for your skin goals.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button className="btn-primary">Book Free Consultation</Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
