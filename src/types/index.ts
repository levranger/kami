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

export type StatIconKey = "duration" | "downtime" | "results" | "sessions" | "evaluation" | "formulation" | "administration" | "plan";

export interface UniqueSection {
  type:
    | "before-after"
    | "technology"
    | "process-steps"
    | "results-gallery"
    | "what-to-expect"
    | "iv-menu"
    | "disclaimer"
    | "comparison"
    | "expect-groups"
    | "info-list"
    | "safety-info";
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
  /** "comparison" — exactly 2 columns (e.g. Radiesse vs. HA Fillers). */
  comparisonColumns?: { title: string; points: string[] }[];
  /** "expect-groups" — e.g. Before / During / After. */
  groups?: { label: string; points: string[] }[];
  /** "info-list" and "safety-info" — flat bullet points. */
  points?: string[];
  /** "safety-info" — optional second bullet list (e.g. common temporary effects), with its own label. */
  points2?: string[];
  points2Label?: string;
  /** "info-list" and "safety-info" — trailing note, rendered with emphasis (e.g. "Individual results vary."). */
  note?: string;
  /** "safety-info" — link to an official external safety-information resource. */
  link?: { label: string; href: string };
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
  /** Overrides just the bottom (Final CTA) button label. Defaults to heroCtaLabel. */
  bottomCtaLabel?: string;
  /** Renders a secondary "Call (phone)" button next to the primary hero CTA. */
  heroShowPhoneCta?: boolean;
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
  /** Short qualifying note rendered under the "Treatment Areas" heading, e.g. clarifying that areas depend on the selected product. */
  areasNote?: string;
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
