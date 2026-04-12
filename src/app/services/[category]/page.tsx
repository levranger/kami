import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { categoryDefs } from "@/data/categories";
import { servicePages } from "@/data/content";
import { BOOKING_URL } from "@/data/constants";
import { localBusinessSchema } from "@/data/content";

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return categoryDefs.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = categoryDefs.find((c) => c.slug === params.category);
  if (!cat) return {};
  return buildPageMetadata({
    title: cat.seo.title,
    description: cat.seo.description,
    canonical: cat.seo.canonical,
    keywords: cat.seo.keywords,
  });
}

export default function CategoryPage({ params }: Props) {
  const cat = categoryDefs.find((c) => c.slug === params.category);
  if (!cat) notFound();

  const services = cat.serviceSlugs
    .map((slug) => servicePages.find((s) => s.slug === slug))
    .filter(Boolean) as typeof servicePages;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://kamiaesthetics.com" },
    { name: "Services", url: "https://kamiaesthetics.com/services" },
    { name: cat.title, url: cat.seo.canonical },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[localBusinessSchema, breadcrumbSchema]} />
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <AnnouncementBar />
      <Header />
      <main id="main-content" role="main">

        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={cat.heroImage}
              alt={`${cat.title} at Kami Aesthetics Aventura`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${cat.heroGradient}`} />
          </div>
          <div className="relative z-10 container mx-auto px-4 md:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
              <Link href="/" className="font-inter text-xs text-white/70 hover:text-gold transition-colors">Home</Link>
              <span className="text-white/30" aria-hidden="true">/</span>
              <Link href="/services" className="font-inter text-xs text-white/70 hover:text-gold transition-colors">Services</Link>
              <span className="text-white/30" aria-hidden="true">/</span>
              <span className="font-inter text-xs text-gold">{cat.title}</span>
            </nav>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gold" aria-hidden="true" />
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold">{cat.tagline}</span>
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                {cat.h1}
              </h1>
              <p className="font-inter text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                {cat.intro}
              </p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-white font-inter text-sm tracking-wider px-8 py-6 rounded-none transition-all duration-300 group">
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding" aria-labelledby="services-heading">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 id="services-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                {cat.title}
              </h2>
              <p className="font-inter text-sm text-warm-gray max-w-xl mx-auto">
                Choose a treatment below to learn more and book your consultation.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${params.category}/${service.slug}`}
                  className="bg-white border border-warm-border p-6 rounded-sm hover-lift group flex flex-col"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <div className="relative h-48 mb-5 overflow-hidden rounded-sm">
                    <Image
                      src={service.heroImage}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-[#1A1A1A] mb-3 group-hover:text-gold transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="font-inter text-sm text-warm-gray leading-relaxed mb-6 flex-1">
                    {service.shortDescription}
                  </p>
                  <span className="font-inter text-xs tracking-wider uppercase text-[#1A1A1A] hover:text-gold flex items-center gap-1 group/btn">
                    Learn More
                    <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="font-inter text-white/60 text-sm mb-8 max-w-md mx-auto">
              Book a free consultation and we&apos;ll create a personalized treatment plan for your goals.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-white font-inter text-sm tracking-wider px-10 py-6 rounded-none transition-all duration-300">
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
