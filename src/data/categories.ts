// ─── Service Category Architecture ──────────────────────────────────────────
//
// URL structure:
//   /services/lasers            → laser category page
//   /services/lasers/[slug]     → individual laser service
//   /services/injectables       → injectables category page
//   /services/injectables/[slug]
//   /services/wellness          → wellness category page
//   /services/wellness/[slug]
//
// Old URLs (/services/[slug]) 301 redirect to new category-based URLs via middleware.

const BASE = "https://kamiaesthetics.com";

export type CategorySlug = "lasers" | "injectables" | "wellness";

export interface CategoryDef {
  slug: CategorySlug;
  title: string;
  h1: string;
  tagline: string;
  intro: string;
  heroImage: string;
  heroGradient: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
    keywords: string[];
  };
  serviceSlugs: string[];
}

export const categoryDefs: CategoryDef[] = [
  {
    slug: "lasers",
    title: "Laser Treatments",
    h1: "Laser Treatments in Aventura, FL",
    tagline: "Advanced Laser Technology",
    intro:
      "Our laser treatments use the most advanced platforms available — the Lumenis Splendor X and Stellar M22 — to deliver permanent hair removal, skin rejuvenation, and scar reduction. Every session is calibrated for your skin type by trained professionals at our Aventura clinic.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    seo: {
      title: "Laser Treatments in Aventura FL | Kami Aesthetics",
      description:
        "Professional laser hair removal, IPL photofacial, and ResurFX skin resurfacing in Aventura FL. Advanced technology, personalized care. Book at Kami Aesthetics.",
      canonical: `${BASE}/services/lasers`,
      keywords: ["laser treatments aventura", "laser hair removal aventura", "ipl photofacial aventura", "resurfx aventura"],
    },
    serviceSlugs: ["laser-hair-removal", "ipl-treatments", "resurfx"],
  },
  {
    slug: "injectables",
    title: "Injectable Treatments",
    h1: "Injectable Treatments in Aventura, FL",
    tagline: "Natural-Looking Results",
    intro:
      "Our expert injectors deliver Botox and dermal fillers with precision and artistry, creating results that look refreshed and natural — never overdone. We combine medical expertise with an aesthetic eye to enhance your features while preserving what makes you uniquely you.",
    heroImage: "/images/service-botox.png",
    heroGradient: "from-[#1A1A2A]/85 via-[#1A1A2A]/60 to-[#1A1A2A]/30",
    seo: {
      title: "Botox & Dermal Fillers in Aventura FL | Kami Aesthetics",
      description:
        "Expert Botox and dermal filler injections in Aventura FL. Natural-looking results from a trusted family-owned aesthetics studio. Book today.",
      canonical: `${BASE}/services/injectables`,
      keywords: ["botox aventura", "dermal fillers aventura", "injectables aventura fl", "lip filler aventura"],
    },
    serviceSlugs: ["botox", "dermal-fillers"],
  },
  {
    slug: "wellness",
    title: "Wellness Treatments",
    h1: "Wellness Treatments in Aventura, FL",
    tagline: "Regenerative Care From Within",
    intro:
      "Our wellness treatments harness your body's own healing potential to restore, rejuvenate, and optimize. From PRP therapy and IV vitamin drips to medically supervised weight management, we offer science-backed protocols that work with your biology — not against it.",
    heroImage: "/images/service-prp-therapy.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    seo: {
      title: "PRP Therapy & Wellness Treatments in Aventura FL | Kami Aesthetics",
      description:
        "PRP therapy, IV therapy, and medical weight loss in Aventura FL. Regenerative care using your body's own healing power. Book at Kami Aesthetics.",
      canonical: `${BASE}/services/wellness`,
      keywords: ["prp therapy aventura", "iv therapy aventura", "medical weight loss aventura", "wellness treatments aventura fl"],
    },
    serviceSlugs: ["prp-therapy", "iv-therapy", "weight-loss"],
  },
];

// ─── Slug → Category lookup ───────────────────────────────────────────────────
export const SLUG_TO_CATEGORY: Record<string, CategorySlug> = {
  "laser-hair-removal": "lasers",
  "ipl-treatments": "lasers",
  resurfx: "lasers",
  botox: "injectables",
  "dermal-fillers": "injectables",
  "prp-therapy": "wellness",
  "iv-therapy": "wellness",
  "weight-loss": "wellness",
};

// ─── Canonical URL builder ────────────────────────────────────────────────────
export function getServiceUrl(slug: string): string {
  const cat = SLUG_TO_CATEGORY[slug];
  if (cat) return `/services/${cat}/${slug}`;
  return `/services/${slug}`;
}

// ─── Old slug → new URL (for 301 redirects) ───────────────────────────────────
export const OLD_SERVICE_REDIRECTS: Record<string, string> = {
  "/services/laser-hair-removal": "/services/lasers/laser-hair-removal",
  "/services/ipl-photofacial": "/services/lasers/ipl-treatments",
  "/services/resurfx": "/services/lasers/resurfx",
  "/services/botox": "/services/injectables/botox",
  "/services/dermal-fillers": "/services/injectables/dermal-fillers",
  "/services/prp-therapy": "/services/wellness/prp-therapy",
};

