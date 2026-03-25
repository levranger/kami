import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts, siteSEO, INSTAGRAM_URL } from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog | Kami Aesthetics Aventura — Laser & Skin Care Tips",
  description:
    "Expert insights on laser hair removal, skin rejuvenation, Botox, fillers, and aesthetic treatments in Aventura, FL.",
  canonical: `${siteSEO.baseUrl}/blog`,
  keywords: ["med spa blog aventura", "laser hair removal tips", "skin care aventura", "aesthetic treatments guide"],
});

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <a href="#blog-main-content" className="skip-to-content">Skip to main content</a>
      <Header />
      <main id="blog-main-content" role="main">
        <section className="bg-[#1A1A1A] py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gold" />
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold">Insights & Guides</span>
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-4">
                The Kami Aesthetics Blog
              </h1>
              <p className="font-inter text-base text-white/60 leading-relaxed max-w-lg">
                Expert insights on laser technology, skin health, and aesthetic treatments from our Aventura clinic.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-warm-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white border border-warm-border rounded-sm overflow-hidden hover-lift group block">
                  <article>
                    <div className="h-48 overflow-hidden bg-[#1A1A1A]">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center">
                          <span className="font-playfair text-2xl text-gold/30">KAMI</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="font-inter text-[10px] tracking-wider uppercase text-gold font-semibold bg-gold/10 px-2 py-0.5 rounded-sm inline-block mb-3">
                        {post.category}
                      </span>
                      <h2 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-gold transition-colors duration-200 leading-snug">
                        {post.title}
                      </h2>
                      <p className="font-inter text-sm text-warm-gray leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-warm-gray">
                          <span className="flex items-center gap-1 font-inter text-xs">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1 font-inter text-xs">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="font-inter text-xs tracking-wider uppercase text-gold flex items-center gap-1 group-hover:gap-2 transition-all duration-200" aria-hidden="true">
                          Read <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="text-center mt-16">
              <p className="font-inter text-sm text-warm-gray">
                More articles coming soon. Follow us on{" "}
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">
                  Instagram
                </a>{" "}
                for the latest updates.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
