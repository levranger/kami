import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { servicePages } from "@/data/content";
import { BOOKING_URL } from "@/data/constants";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";


export const metadata: Metadata = buildPageMetadata({
  title: "Medical Aesthetics Services Aventura FL | Kami Aesthetics",
  description:
    "Explore our full menu of medical aesthetic services in Aventura, FL — laser hair removal, IPL photofacial, ResurFX, Botox, dermal fillers, and PRP therapy. Book a free consultation today.",
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
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main-content" role="main">
        {/* Hero */}
        <section className="section-padding bg-warm-white">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">
                Aventura, FL
              </span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
              Our Aesthetic Services
            </h1>
            <p className="font-inter text-warm-gray leading-relaxed text-base md:text-lg">
              At Kami Aesthetics in Aventura, FL, we offer a curated selection of
              advanced medical aesthetic treatments — from laser hair removal and
              skin rejuvenation to injectables and regenerative therapies. Every
              service is delivered by trained professionals using the latest
              technology, tailored to your unique skin and goals.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding" aria-labelledby="services-list-heading">
          <h2 id="services-list-heading" className="sr-only">
            All Services
          </h2>
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {servicePages.map((service) => (
                <div
                  key={service.slug}
                  className="bg-white border border-warm-border p-6 rounded-sm hover-lift group flex flex-col"
                >
                  <h2 className="font-playfair text-xl font-semibold text-[#1A1A1A] mb-3 group-hover:text-gold transition-colors duration-200">
                    {service.title}
                  </h2>
                  <p className="font-inter text-sm text-warm-gray leading-relaxed mb-6 flex-1">
                    {service.shortDescription}
                  </p>
                  <Link href={`/services/${service.slug}`}>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-inter text-xs tracking-wider uppercase text-[#1A1A1A] hover:text-gold group/btn"
                    >
                      Learn More
                      <ArrowRight className="ml-1.5 h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </div>
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
              Book a free consultation and we&apos;ll create a personalized
              treatment plan for your skin goals.
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
