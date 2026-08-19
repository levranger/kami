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

export type StatIconKey = "duration" | "downtime" | "results" | "sessions" | "evaluation" | "formulation" | "administration";

export interface UniqueSection {
  type: "before-after" | "technology" | "process-steps" | "results-gallery" | "what-to-expect" | "iv-menu" | "disclaimer";
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
  image?: string;
  imageAlt?: string;
}

export interface Treatment {
  slug: string;
  title: string;
  shortDescription: string;
  heroValueProp?: string;
  fullDescription: string;
  heroImage: string;
  heroImageAlt?: string;
  heroImagePosition?: string;
  heroGradient: string;
  /** Overrides the uppercase eyebrow line above the H1. Defaults to locationTag. */
  heroEyebrow?: string;
  /** Overrides the full H1 text. Defaults to "{title} {locationTag}". */
  heroH1?: string;
  /** Overrides the hero paragraph. Defaults to shortDescription. */
  heroDescription?: string;
  /** Overrides the primary CTA label used in hero, sidebar, and bottom CTA. Defaults to "Book Now". */
  heroCtaLabel?: string;
  /** Overrides the 4 quick-stat tiles (hero + sidebar). Defaults to duration/downtime/resultsTimeline/sessionsNeeded. */
  heroStats?: { icon: StatIconKey; label: string; value: string }[];
  /** Overrides the "About {title} in {locationTag}" heading. */
  aboutHeading?: string;
  /** Overrides the "Key Benefits" heading. */
  benefitsHeading?: string;
  /** Overrides the sidebar CTA subtext. Defaults to "Book your {title} consultation today." */
  sidebarCtaSubtext?: string;
  /** Hides the Treatment Areas block entirely (used when areas are represented elsewhere, e.g. an IV menu). */
  hideTreatmentAreas?: boolean;
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
  faq?: { question: string; answer: string }[];
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
