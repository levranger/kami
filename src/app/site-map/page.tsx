import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildPageMetadata } from "@/lib/seo";
import { siteSEO, servicePages } from "@/data/content";

export const metadata: Metadata = buildPageMetadata({
  title: "Site Map | Kami Aesthetics Aventura, FL",
  description: "Browse all pages on the Kami Aesthetics website — services, blog, and more.",
  canonical: `${siteSEO.baseUrl}/site-map`,
  noIndex: false,
});

export default function SiteMapPage() {
  return (
    <div className="min-h-screen bg-white">
      <a href="#sitemap-main" className="skip-to-content">Skip to main content</a>
      <Header />
      <main id="sitemap-main" role="main" className="section-padding">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h1 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-10">Site Map</h1>

          <section className="mb-10">
            <h2 className="font-inter text-sm font-semibold tracking-wider uppercase text-gold mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li><Link href="/" className="font-inter text-sm text-[#1A1A1A] hover:text-gold transition-colors">Home</Link></li>
              <li><Link href="/blog" className="font-inter text-sm text-[#1A1A1A] hover:text-gold transition-colors">Blog</Link></li>
              <li><Link href="/privacy-policy" className="font-inter text-sm text-[#1A1A1A] hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="font-inter text-sm text-[#1A1A1A] hover:text-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-inter text-sm font-semibold tracking-wider uppercase text-gold mb-4">Services</h2>
            <ul className="space-y-2">
              {servicePages.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-inter text-sm text-[#1A1A1A] hover:text-gold transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
