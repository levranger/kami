import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata, buildFAQSchema } from "@/lib/seo";
import { siteSEO, localBusinessSchema, homepageFAQs } from "@/data/content";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import NewClientOffer from "@/components/sections/NewClientOffer";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChoose from "@/components/sections/WhyChoose";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const MapEmbed = dynamic(() => import("@/components/sections/MapEmbed"), { ssr: false });

export const metadata: Metadata = buildPageMetadata(siteSEO.homeSEO);

export default function HomePage() {
  const faqSchema = buildFAQSchema(homepageFAQs);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[localBusinessSchema, faqSchema]} />
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main-content" role="main">
        <HeroSection />
        <TrustStrip />
        <NewClientOffer />
        <ServicesGrid />
        <WhyChoose />
        <Gallery />
        <Testimonials />
        <FAQ />
        <MapEmbed />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
