import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/app/prose.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { blogPosts, servicePages, BOOKING_URL, siteSEO } from "@/data/content";
import { buildBreadcrumbSchema, buildFAQSchema, buildPageMetadata } from "@/lib/seo";
import { SLUG_TO_CATEGORY } from "@/data/categories";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return buildPageMetadata(post.seo);
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteSEO.baseUrl },
    { name: "Blog", url: `${siteSEO.baseUrl}/blog` },
    { name: post.title, url: post.seo.canonical },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Kami Aesthetics" },
    publisher: {
      "@type": "Organization",
      name: "Kami Aesthetics",
      logo: { "@type": "ImageObject", url: "https://kamiaesthetics.com/KAMI.svg" },
    },
    description: post.seo.description,
  };

  const schemas = [breadcrumbSchema, articleSchema, ...(post.faq ? [buildFAQSchema(post.faq)] : [])];

  const otherPosts = blogPosts.filter((p) => p.slug !== params.slug);
  const relatedServices = servicePages.filter((s) => {
    const cat = post.category.toLowerCase();
    if (cat.includes("laser")) return s.slug === "laser-hair-removal";
    if (cat.includes("ipl") || cat.includes("skin")) return s.slug === "ipl-photofacial" || s.slug === "resurfx";
    if (cat.includes("technology")) return s.slug === "laser-hair-removal" || s.slug === "ipl-photofacial";
    return false;
  });

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={schemas} />
      <a href="#blogpost-main-content" className="skip-to-content">Skip to main content</a>
      <Header />
      <main id="blogpost-main-content" role="main">
        <section className="bg-[#1A1A1A] py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
                <Link href="/" className="font-inter text-xs text-white/70 hover:text-gold transition-colors">Home</Link>
                <span className="text-white/30" aria-hidden="true">/</span>
                <Link href="/blog" className="font-inter text-xs text-white/70 hover:text-gold transition-colors">Blog</Link>
                <span className="text-white/30" aria-hidden="true">/</span>
                <span className="font-inter text-xs text-gold line-clamp-1">{post.title}</span>
              </nav>
              <span className="font-inter text-[10px] tracking-wider uppercase text-gold font-semibold bg-gold/10 px-3 py-1 rounded-sm inline-block mb-4">
                {post.category}
              </span>
              <h1 id="blogpost-title" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-white/70">
                <span className="flex items-center gap-1.5 font-inter text-sm">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5 font-inter text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
              <article className="lg:col-span-2" aria-labelledby="blogpost-title">
                {post.image && (
                  <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-sm">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {post.body ? (
                  <div className="prose-blog">{post.body}</div>
                ) : (
                  <div className="bg-warm-white border border-warm-border rounded-sm p-8 md:p-12 text-center">
                    <p className="font-playfair text-2xl text-[#1A1A1A]/30 mb-4">Coming Soon</p>
                    <p className="font-inter text-sm text-warm-gray leading-relaxed max-w-md mx-auto">{post.excerpt}</p>
                    <div className="mt-8">
                      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-gold hover:bg-gold-dark text-white font-inter text-sm tracking-wider px-8 rounded-none transition-all duration-300">
                          Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                )}

                {relatedServices.length > 0 && (
                  <div className="mt-12">
                    <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-6">Related Services</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {relatedServices.map((s) => (
                        <Link key={s.slug} href={`/services/${SLUG_TO_CATEGORY[s.slug] ?? ""}/${s.slug}`} className="bg-warm-white border border-warm-border p-5 rounded-sm hover-lift group block">
                          <h4 className="font-inter text-sm font-semibold text-[#1A1A1A] group-hover:text-gold transition-colors mb-1">{s.title}</h4>
                          <p className="font-inter text-xs text-warm-gray line-clamp-2">{s.shortDescription}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  <div className="bg-[#1A1A1A] p-6 rounded-sm">
                    <h3 className="font-playfair text-lg font-bold text-white mb-2">Ready to Get Started?</h3>
                    <p className="font-inter text-sm text-white/60 mb-4">Book your free consultation at Kami Aesthetics in Aventura.</p>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gold hover:bg-gold-dark text-white font-inter text-sm tracking-wider rounded-none py-5 transition-all duration-300">
                        Book Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>

                  {otherPosts.length > 0 && (
                    <div className="bg-warm-white border border-warm-border p-6 rounded-sm">
                      <h4 className="font-inter text-sm font-semibold text-[#1A1A1A] mb-4">More Articles</h4>
                      <div className="space-y-4">
                        {otherPosts.map((p) => (
                          <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                            <h5 className="font-inter text-sm font-medium text-[#1A1A1A] group-hover:text-gold transition-colors leading-snug mb-1">{p.title}</h5>
                            <span className="font-inter text-xs text-warm-gray">{p.readTime}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
