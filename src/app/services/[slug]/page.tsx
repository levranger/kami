import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Check, Clock, Calendar, Sparkles, Timer, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import TechnologySection from "@/components/sections/TechnologySection";
import ProcessStepsSection from "@/components/sections/ProcessStepsSection";
import ResultsGallerySection from "@/components/sections/ResultsGallerySection";
import { servicePages, newClientOffer, BOOKING_URL, PHONE_NUMBER, PHONE_HREF } from "@/data/content";
import { ADDRESS_SHORT, CITY_STATE } from "@/data/constants";
import { buildFAQSchema, buildServiceSchema, buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import { siteSEO } from "@/data/content";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = servicePages.find((s) => s.slug === params.slug);
  if (!service) return {};
  return buildPageMetadata(service.seo);
}

export default function ServicePage({ params }: Props) {
  const service = servicePages.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const relatedServices = servicePages.filter((s) => service.relatedSlugs.includes(s.slug));
  const otherServices = servicePages.filter((s) => s.slug !== params.slug && !service.relatedSlugs.includes(s.slug));
  const isLaserService = service.slug === "laser-hair-removal";

  const faqSchema = buildFAQSchema(service.faq.map((f) => ({ question: f.q, answer: f.a })));
  const serviceSchema = buildServiceSchema(service);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteSEO.baseUrl },
    { name: "Services", url: `${siteSEO.baseUrl}/#services` },
    { name: service.title, url: service.seo.canonical },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[faqSchema, serviceSchema, breadcrumbSchema]} />
      <a href="#service-main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Header />

      <main id="service-main-content" role="main">
        {/* Hero Banner */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            <Image src={service.heroImage} alt={`${service.title} at Kami Aesthetics Aventura — professional ${service.title.toLowerCase()} treatment in Aventura, FL`} fill priority className="object-cover" sizes="100vw" />
            <div className={`absolute inset-0 bg-gradient-to-r ${service.heroGradient}`} />
          </div>
          <div className="relative z-10 container mx-auto px-4 md:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
              <Link href="/" className="font-inter text-xs text-white/70 hover:text-gold transition-colors">Home</Link>
              <span className="text-white/30" aria-hidden="true">/</span>
              <span className="font-inter text-xs text-white/70">Services</span>
              <span className="text-white/30" aria-hidden="true">/</span>
              <span className="font-inter text-xs text-gold">{service.title}</span>
            </nav>

            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gold" aria-hidden="true" />
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold">{service.locationTag}</span>
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                {service.title}
                <span className="block text-gold text-2xl md:text-3xl mt-2 font-normal">{service.locationTag}</span>
              </h1>
              <p className="font-inter text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                {service.shortDescription}
              </p>

              <div className="flex flex-wrap gap-6 mb-10">
                <QuickStat icon={<Timer className="h-4 w-4" />} label="Duration" value={service.duration} />
                <QuickStat icon={<Clock className="h-4 w-4" />} label="Downtime" value={service.downtime} />
                <QuickStat icon={<Sparkles className="h-4 w-4" />} label="Results" value={service.resultsTimeline} />
                <QuickStat icon={<Calendar className="h-4 w-4" />} label="Sessions" value={service.sessionsNeeded} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-gold hover:bg-gold-dark text-white font-inter text-sm tracking-wider px-8 py-6 rounded-none transition-all duration-300 group">
                    Book {service.title}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </a>
                {isLaserService && (
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="!bg-transparent border-gold text-gold hover:bg-gold hover:text-white font-inter text-sm tracking-wider px-8 py-6 rounded-none transition-all duration-300">
                      $149 New Client Package
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* $149 Offer Banner (Laser only) */}
        {isLaserService && (
          <section className="bg-gradient-to-r from-gold/10 to-gold/5 border-y border-gold/20 py-6">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-inter text-sm font-semibold text-[#1A1A1A]">
                      New Client Special: {newClientOffer.price} Laser Package
                    </p>
                    <p className="font-inter text-xs text-warm-gray">
                      Bikini + Underarms + Half Legs — {newClientOffer.priceNote}
                    </p>
                  </div>
                </div>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gold hover:bg-gold-dark text-white font-inter text-xs tracking-wider px-6 rounded-none transition-all duration-300">
                    Claim Offer <ArrowRight className="ml-1.5 h-3 w-3" />
                  </Button>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
              {/* Left: Description + Benefits */}
              <div className="lg:col-span-2">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
                  About {service.title} in {service.locationTag}
                </h2>
                <p className="font-inter text-sm md:text-base text-warm-gray leading-relaxed mb-10">
                  {service.fullDescription}
                </p>

                <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-6">Key Benefits</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-gold" />
                      </div>
                      <span className="font-inter text-sm text-[#1A1A1A]">{benefit}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-6">Treatment Areas</h3>
                <div className="flex flex-wrap gap-3 mb-12">
                  {service.areas.map((area) => (
                    <span key={area} className="font-inter text-sm px-4 py-2 bg-warm-white border border-warm-border rounded-sm text-[#1A1A1A]">
                      {area}
                    </span>
                  ))}
                </div>

                <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-6">Frequently Asked Questions</h3>
                <ServiceFAQ items={service.faq} />
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  <div className="bg-warm-white border border-warm-border p-8 rounded-sm">
                    <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-2">Ready to Get Started?</h3>
                    <p className="font-inter text-sm text-warm-gray leading-relaxed mb-6">
                      Book your {service.title.toLowerCase()} consultation today.
                    </p>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-gold hover:bg-gold-dark text-white font-inter text-sm tracking-wider rounded-none py-6 transition-all duration-300 group">
                        Book Consultation
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </a>
                    <div className="mt-4 text-center">
                      <span className="font-inter text-xs text-warm-gray">or call us at</span>
                      <br />
                      <a href={PHONE_HREF} className="font-inter text-sm font-semibold text-[#1A1A1A] hover:text-gold transition-colors" aria-label={`Call us at ${PHONE_NUMBER}`}>
                        {PHONE_NUMBER}
                      </a>
                    </div>
                    <div className="border-t border-warm-border my-6" />
                    <div className="space-y-3">
                      <SidebarStat label="Duration" value={service.duration} />
                      <SidebarStat label="Downtime" value={service.downtime} />
                      <SidebarStat label="Results" value={service.resultsTimeline} />
                      <SidebarStat label="Sessions" value={service.sessionsNeeded} />
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] p-6 rounded-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
                      <span className="font-inter text-sm font-semibold text-white">Visit Us</span>
                    </div>
                    <p className="font-inter text-sm text-white/60 leading-relaxed">
                      {ADDRESS_SHORT}<br />{CITY_STATE}
                    </p>
                    <a href={PHONE_HREF} className="font-inter text-sm text-gold hover:text-gold-light mt-2 inline-block transition-colors">
                      {PHONE_NUMBER}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unique Sections */}
        {service.uniqueSections?.map((section, idx) => {
          if (section.type === "before-after") return <BeforeAfterSection key={idx} title={section.title} subtitle={section.subtitle} pairs={section.beforeAfterPairs ?? []} />;
          if (section.type === "technology") return <TechnologySection key={idx} title={section.title} subtitle={section.subtitle} content={section.content} items={section.items ?? []} />;
          if (section.type === "process-steps") return <ProcessStepsSection key={idx} title={section.title} subtitle={section.subtitle} items={section.items ?? []} />;
          if (section.type === "results-gallery") return <ResultsGallerySection key={idx} title={section.title} subtitle={section.subtitle} items={section.items ?? []} />;
          return null;
        })}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="section-padding bg-warm-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-8 bg-gold" />
                  <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Related Treatments</span>
                  <div className="h-px w-8 bg-gold" />
                </div>
                <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A]">You May Also Like</h2>
                <p className="font-inter text-sm text-warm-gray mt-2">Enhance your results with complementary treatments</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedServices.map((t) => (
                  <Link key={t.slug} href={`/services/${t.slug}`} aria-label={`Learn more about ${t.title}`} className="bg-white border border-warm-border p-6 rounded-sm hover-lift group block">
                    <h3 className="font-playfair text-lg font-semibold text-[#1A1A1A] mb-2 group-hover:text-gold transition-colors duration-200">{t.title}</h3>
                    <p className="font-inter text-sm text-warm-gray leading-relaxed mb-4">{t.shortDescription}</p>
                    <span className="font-inter text-xs tracking-wider uppercase text-gold flex items-center gap-1" aria-hidden="true">
                      Learn More <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Other Services */}
        {otherServices.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A]">Explore All Services</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {otherServices.map((t) => (
                  <Link key={t.slug} href={`/services/${t.slug}`} aria-label={`Learn more about ${t.title}`} className="bg-warm-white border border-warm-border p-6 rounded-sm hover-lift group block">
                    <h3 className="font-playfair text-lg font-semibold text-[#1A1A1A] mb-2 group-hover:text-gold transition-colors duration-200">{t.title}</h3>
                    <p className="font-inter text-sm text-warm-gray leading-relaxed mb-4 line-clamp-2">{t.shortDescription}</p>
                    <span className="font-inter text-xs tracking-wider uppercase text-gold flex items-center gap-1" aria-hidden="true">
                      Learn More <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">{service.ctaHeadline}</h2>
            <p className="font-inter text-white/60 text-sm mb-8 max-w-md mx-auto">{service.ctaSubtext}</p>
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

function QuickStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-gold" aria-hidden="true">{icon}</div>
      <div>
        <p className="font-inter text-[10px] uppercase tracking-wider text-white/50">{label}</p>
        <p className="font-inter text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function SidebarStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-inter text-xs text-warm-gray">{label}</span>
      <span className="font-inter text-xs font-medium text-[#1A1A1A]">{value}</span>
    </div>
  );
}
