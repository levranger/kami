import type { FAQEntry } from "@/types";
import { siteSEO, localBusinessSchema } from "@/data/content";

export function buildFAQSchema(faqs: FAQEntry[] | { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: "question" in faq ? faq.question : (faq as { q: string; a: string }).q,
      acceptedAnswer: {
        "@type": "Answer",
        text: "answer" in faq ? faq.answer : (faq as { q: string; a: string }).a,
      },
    })),
  };
}

export function buildServiceSchema(service: {
  title: string;
  shortDescription: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "MedicalBusiness",
      name: "Kami Aesthetics",
      address: localBusinessSchema.address,
    },
    areaServed: { "@type": "City", name: "Aventura" },
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildPageMetadata({
  title,
  description,
  canonical,
  ogImage,
  keywords,
  noIndex,
}: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
}) {
  return {
    title,
    description,
    keywords: keywords?.join(", "),
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteSEO.siteName,
      images: [{ url: ogImage ?? siteSEO.defaultOgImage, width: 1200, height: 630, alt: title }],
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage ?? siteSEO.defaultOgImage],
    },
  };
}
