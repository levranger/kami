import type {
  ServicePageContent,
  Promotion,
  Testimonial,
  BlogPost,
  FAQEntry,
} from "@/types";
import { treatments } from "./treatments";
import { BOOKING_URL, SPLENDOR_X_IMAGE, DEFAULT_OG_IMAGE, INSTAGRAM_URL, FACEBOOK_URL, TIKTOK_URL } from "./constants";
import { laserVsWaxingBody } from "./blog/laser-vs-waxing";
import { splendorXAllSkinTypesBody } from "./blog/splendor-x-skin-types";
import { iplSunDamageBody } from "./blog/ipl-sun-damage";

export * from "./constants";
export { treatments };
export type { ServicePageContent, Promotion, Testimonial, BlogPost, FAQEntry };

const BASE_URL = "https://kamiaesthetics.com";

// ─── Service Pages with SEO ───
const seoMap: Record<string, { title: string; description: string; keywords: string[] }> = {
  "laser-hair-removal": {
    title: "Laser Hair Removal Aventura | Splendor X",
    description:
      "Premium laser hair removal in Aventura, FL with the Lumenis Splendor X. Safe for all skin types. Fast, comfortable, permanent results. Free consultation.",
    keywords: ["laser hair removal aventura", "splendor x laser", "permanent hair removal miami", "laser hair removal all skin types"],
  },
  "ipl-photofacial": {
    title: "IPL Photofacial Aventura | Stellar M22",
    description:
      "Advanced IPL photofacial in Aventura, FL with the Lumenis Stellar M22. Treat sun damage, rosacea, and uneven skin tone. Book your consultation today.",
    keywords: ["ipl photofacial aventura", "stellar m22", "sun damage treatment miami", "rosacea treatment aventura"],
  },
  resurfx: {
    title: "ResurFX Laser Aventura | Skin Resurfacing",
    description:
      "Non-ablative fractional laser resurfacing in Aventura, FL. ResurFX treats acne scars, stretch marks, and fine lines with minimal downtime.",
    keywords: ["resurfx aventura", "fractional laser miami", "acne scar treatment aventura", "skin resurfacing miami"],
  },
  botox: {
    title: "Botox Aventura | Natural-Looking Results",
    description:
      "Expert Botox injections in Aventura, FL. Natural-looking results that smooth wrinkles while preserving your expressions. No downtime, 15-minute treatment.",
    keywords: ["botox aventura", "botox near me", "natural botox miami", "wrinkle treatment aventura"],
  },
  "dermal-fillers": {
    title: "Dermal Fillers Aventura | Lip & Cheek Filler",
    description:
      "Premium dermal fillers in Aventura, FL. Restore volume, enhance contours, and rejuvenate your look with hyaluronic acid fillers. Immediate results.",
    keywords: ["dermal fillers aventura", "lip filler miami", "cheek filler aventura", "juvederm aventura"],
  },
  "prp-therapy": {
    title: "PRP Therapy Aventura | Vampire Facial",
    description:
      "PRP therapy and Vampire Facial in Aventura, FL. Natural growth factors for skin rejuvenation and hair restoration. 100% natural, minimal downtime.",
    keywords: ["prp therapy aventura", "vampire facial miami", "prp hair restoration aventura", "platelet rich plasma miami"],
  },
};

const relatedMap: Record<string, string[]> = {
  "laser-hair-removal": ["ipl-photofacial", "resurfx"],
  "ipl-photofacial": ["resurfx", "laser-hair-removal"],
  resurfx: ["ipl-photofacial", "prp-therapy"],
  botox: ["dermal-fillers", "prp-therapy"],
  "dermal-fillers": ["botox", "prp-therapy"],
  "prp-therapy": ["botox", "resurfx"],
};

const ctaMap: Record<string, { headline: string; subtext: string }> = {
  "laser-hair-removal": {
    headline: "Ready for Smooth, Hair-Free Skin?",
    subtext: "Join hundreds of Aventura clients who trust Kami Aesthetics for permanent laser hair removal with the Splendor X.",
  },
  "ipl-photofacial": {
    headline: "Reveal Your Clearest, Most Radiant Skin",
    subtext: "Book your IPL Stellar M22 consultation and discover how we can transform sun-damaged, uneven skin.",
  },
  resurfx: {
    headline: "Transform Your Skin From Within",
    subtext: "Schedule your ResurFX consultation and start your journey to smoother, more youthful skin.",
  },
  botox: {
    headline: "Look Refreshed, Never Frozen",
    subtext: "Our expert injectors deliver natural Botox results that enhance your beauty without changing who you are.",
  },
  "dermal-fillers": {
    headline: "Restore Volume, Enhance Your Natural Beauty",
    subtext: "Discover how premium dermal fillers can rejuvenate your appearance with immediate, natural-looking results.",
  },
  "prp-therapy": {
    headline: "Rejuvenate Naturally With Your Own Growth Factors",
    subtext: "Experience the power of PRP therapy — the safest, most natural approach to skin and hair rejuvenation.",
  },
};

export const servicePages: ServicePageContent[] = treatments.map((t) => {
  const seo = seoMap[t.slug];
  return {
    ...t,
    seo: {
      title: seo?.title ?? `${t.title} Aventura | Kami Aesthetics`,
      description: seo?.description ?? t.shortDescription,
      canonical: `${BASE_URL}/services/${t.slug}`,
      keywords: seo?.keywords,
    },
    locationTag: "Aventura, FL",
    relatedSlugs: relatedMap[t.slug] ?? [],
    ctaHeadline: ctaMap[t.slug]?.headline ?? `Ready for ${t.title}?`,
    ctaSubtext: ctaMap[t.slug]?.subtext ?? `Book your ${t.title.toLowerCase()} consultation today.`,
  };
});

// ─── $149 New Client Offer ───
export const newClientOffer: Promotion = {
  id: "new-client-laser-149",
  tag: "New Client Exclusive",
  title: "$149 Must-Have Laser Package",
  headline: "Your First Laser Session — Just $149",
  description:
    "Experience the Lumenis Splendor X difference with our introductory laser hair removal package. Choose any combination of three popular areas and discover why our clients never go back to waxing.",
  price: "$149",
  priceNote: "Regular value $350+",
  areas: ["Bikini Line", "Underarms", "Half Legs"],
  cta: "Claim Your $149 Package",
  ctaUrl: BOOKING_URL,
  highlight: true,
  badge: "Most Popular",
};

// ─── Testimonials ───
export const testimonials: Testimonial[] = [
  { name: "Maria S.", rating: 5, text: "I've been to multiple med spas in Miami, and Kami Aesthetics is in a completely different league. The Splendor X laser was virtually painless and the results after just 3 sessions are incredible.", treatment: "Laser Hair Removal", date: "2026-02" },
  { name: "Jessica L.", rating: 5, text: "The level of professionalism and care here is outstanding. They took the time to explain everything and create a personalized plan. My skin has never looked better after the IPL treatments.", treatment: "IPL Photofacial", date: "2026-01" },
  { name: "Ana R.", rating: 5, text: "Finally found a place that understands what premium service means. From the moment you walk in, everything feels elevated. The Botox results are so natural — exactly what I wanted.", treatment: "Botox", date: "2026-03" },
  { name: "Daniela M.", rating: 5, text: "The ResurFX treatment completely transformed my skin texture. The staff is incredibly knowledgeable and made me feel comfortable throughout the entire process. Highly recommend!", treatment: "ResurFX", date: "2025-12" },
  { name: "Sofia K.", rating: 5, text: "I was nervous about fillers but the team at Kami put me at ease. The results are subtle, natural, and exactly what I envisioned. This is the only place I trust with my face.", treatment: "Dermal Fillers", date: "2026-02" },
];

// ─── Homepage FAQs ───
export const homepageFAQs: FAQEntry[] = [
  { question: "How does laser hair removal work?", answer: "Our Lumenis Splendor X uses BLEND X™ technology, combining Alexandrite and Nd:YAG lasers to target hair follicles beneath the skin. The laser energy is absorbed by the melanin in the hair, disabling the follicle's ability to grow new hair. This dual-wavelength approach allows us to safely and effectively treat all skin types.", category: "Laser Hair Removal" },
  { question: "Is the treatment painful?", answer: "The Splendor X features a built-in cooling system that keeps the skin comfortable throughout treatment. Most clients describe the sensation as a mild, warm snap. It's significantly more comfortable than older laser systems, and many clients find it far less painful than waxing.", category: "Laser Hair Removal" },
  { question: "How many sessions will I need?", answer: "Most clients see optimal results with 6–8 sessions, spaced 4–6 weeks apart. Hair grows in cycles, and the laser is most effective during the active growth phase. During your consultation, we'll create a personalized treatment plan based on your hair type, skin type, and treatment area.", category: "Laser Hair Removal" },
  { question: "Is it safe for all skin types?", answer: "Yes! The Splendor X is one of the few laser systems that is safe and effective for all skin types, including darker skin tones (Fitzpatrick I–VI). The dual-wavelength technology allows us to customize settings for each individual client.", category: "Safety" },
  { question: "What is the downtime after treatment?", answer: "There is minimal to no downtime. You may experience slight redness or warmth in the treated area for a few hours, similar to a mild sunburn. Most clients return to their normal activities immediately after treatment. We'll provide aftercare instructions to ensure the best results.", category: "Recovery" },
  { question: "How much does treatment cost?", answer: "Pricing varies based on the treatment area and package selected. We offer competitive pricing for our premium technology, and package deals provide significant savings. Schedule a free consultation to receive a personalized quote and learn about our current specials.", category: "Pricing" },
];

// ─── Blog Posts ───
export const blogPosts: BlogPost[] = [
  {
    slug: "laser-hair-removal-vs-waxing",
    title: "Laser Hair Removal vs. Waxing: Why Aventura Clients Are Making the Switch",
    excerpt: "Tired of the endless waxing cycle? Discover why laser hair removal with the Splendor X delivers permanent results that save you time, money, and discomfort.",
    category: "Laser Hair Removal",
    date: "2026-03-15",
    readTime: "5 min read",
    image: "/images/service-laser-hair-removal.png",
    body: laserVsWaxingBody,
    seo: {
      title: "Laser Hair Removal vs Waxing in Aventura",
      description: "Compare laser hair removal and waxing. Learn why Aventura clients choose the Splendor X for permanent, painless hair removal.",
      canonical: `${BASE_URL}/blog/laser-hair-removal-vs-waxing`,
      keywords: ["laser hair removal vs waxing", "laser hair removal aventura", "permanent hair removal miami", "splendor x aventura"],
    },
  },
  {
    slug: "splendor-x-all-skin-types",
    title: "Why the Splendor X Is the Safest Laser for All Skin Types",
    excerpt: "Not all lasers are created equal. Learn how the Lumenis Splendor X's BLEND X™ technology makes it the gold standard for safe, effective treatment on every skin tone.",
    category: "Technology",
    date: "2026-03-01",
    readTime: "4 min read",
    image: "/images/splendor-x-laser.png",
    body: splendorXAllSkinTypesBody,
    seo: {
      title: "Splendor X: Safe Laser for All Skin Types",
      description: "Learn why the Lumenis Splendor X is the safest laser for all skin types, including dark skin tones. BLEND X™ technology explained.",
      canonical: `${BASE_URL}/blog/splendor-x-all-skin-types`,
      keywords: ["splendor x all skin types", "laser hair removal dark skin", "fitzpatrick skin type laser", "blend x technology"],
    },
  },
  {
    slug: "ipl-photofacial-sun-damage",
    title: "How IPL Photofacial Reverses Sun Damage: What to Expect",
    excerpt: "Living in South Florida means sun exposure. Discover how the Stellar M22 IPL can reverse years of sun damage and restore your skin's natural radiance.",
    category: "IPL / Skin",
    date: "2026-02-15",
    readTime: "6 min read",
    image: "/images/service-ipl-photofacial.png",
    body: iplSunDamageBody,
    seo: {
      title: "IPL Photofacial for Sun Damage in Aventura",
      description: "Learn how IPL photofacial with the Stellar M22 reverses sun damage, age spots, and rosacea. Aventura's premier skin rejuvenation clinic.",
      canonical: `${BASE_URL}/blog/ipl-photofacial-sun-damage`,
      keywords: ["ipl photofacial sun damage", "stellar m22 aventura", "sun spots treatment miami", "rosacea treatment aventura"],
    },
  },
];

// ─── Site-wide SEO Config ───
export const siteSEO = {
  siteName: "Kami Aesthetics",
  baseUrl: BASE_URL,
  defaultOgImage: DEFAULT_OG_IMAGE,
  homeSEO: {
    title: "Kami Aesthetics | Laser Hair Removal & Med Spa Aventura FL",
    description:
      "Premium laser hair removal & aesthetic treatments in Aventura, FL. Lumenis Splendor X — safe for all skin types. Botox, fillers, IPL, ResurFX. Free consult",
    canonical: BASE_URL,
    keywords: ["med spa aventura", "laser hair removal aventura", "botox aventura", "dermal fillers aventura", "splendor x miami", "kami aesthetics"],
  },
};

// ─── LocalBusiness Schema ───
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${BASE_URL}/#business`,
  name: "Kami Aesthetics",
  description: siteSEO.homeSEO.description,
  url: BASE_URL,
  telephone: "+19544697153",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2999 NE 191st St 906 Floor 9",
    addressLocality: "Aventura",
    addressRegion: "FL",
    postalCode: "33180",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.956, longitude: -80.1426 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  image: SPLENDOR_X_IMAGE,
  priceRange: "$$",
  areaServed: { "@type": "City", name: "Aventura" },
  sameAs: [
    INSTAGRAM_URL,
    FACEBOOK_URL,
    TIKTOK_URL,
  ],
};
