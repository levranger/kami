// ─── CMS-Ready Type Definitions ───
// Designed for easy migration to Sanity, Payload, or any headless CMS.

import type React from "react";

export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  keywords?: string[];
}

export interface UniqueSection {
  type: "before-after" | "technology" | "process-steps" | "results-gallery";
  title: string;
  subtitle?: string;
  content?: string;
  items?: { label: string; description: string }[];
  beforeAfterPairs?: {
    area: string;
    before: string;
    after: string;
    image?: string;
  }[];
}

export interface Treatment {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  heroGradient: string;
  benefits: string[];
  areas: string[];
  faq: { q: string; a: string }[];
  duration: string;
  downtime: string;
  resultsTimeline: string;
  sessionsNeeded: string;
  uniqueSections?: UniqueSection[];
}

export interface ServicePageContent extends Treatment {
  seo: PageSEO;
  locationTag: string;
  relatedSlugs: string[];
  ctaHeadline: string;
  ctaSubtext: string;
}

export interface Promotion {
  id: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  price: string;
  priceNote?: string;
  areas: string[];
  cta: string;
  ctaUrl: string;
  highlight: boolean;
  badge?: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  treatment: string;
  date?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  seo: PageSEO;
  body?: React.ReactNode;
}

export interface BeforeAfterEntry {
  id: string;
  treatment: string;
  area: string;
  beforeDesc: string;
  afterDesc: string;
  image?: string;
  sessions: string;
}

export interface FAQEntry {
  question: string;
  answer: string;
  category?: string;
}
