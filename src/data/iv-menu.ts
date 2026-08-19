// ─── IV Menu — Centralized Typed Data ───
// Provider-guided IV options shown on the IV Therapy page. Copy is intentionally
// descriptive rather than promotional: no dosages, prices, or outcome claims —
// eligibility and formulation are determined by a provider after evaluation.

export type IVMenuCategory = "Core Wellness" | "Beauty & Antioxidants" | "Energy & Performance" | "Comprehensive & Personalized";

export const IV_MENU_CATEGORIES: IVMenuCategory[] = ["Core Wellness", "Beauty & Antioxidants", "Energy & Performance", "Comprehensive & Personalized"];

export interface IVMenuItem {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  category: IVMenuCategory;
}

export const ivMenu: IVMenuItem[] = [
  {
    slug: "myers-cocktail",
    name: "Myers' Cocktail",
    tagline: "The foundational blend",
    description: "A classic formulation combining core vitamins and minerals in a single infusion.",
    ingredients: ["Vitamin C", "B-Complex", "Magnesium", "Calcium"],
    category: "Core Wellness",
  },
  {
    slug: "immune-support-iv",
    name: "Immune Support IV",
    tagline: "Seasonal formulation",
    description: "A blend of vitamins and minerals often used to support the body's immune system.",
    ingredients: ["Vitamin C", "Zinc", "B-Complex", "Vitamin D"],
    category: "Core Wellness",
  },
  {
    slug: "hydration-minerals-iv",
    name: "Hydration & Minerals IV",
    tagline: "Fluid and electrolyte replenishment",
    description: "A straightforward formulation focused on fluid volume and core electrolytes.",
    ingredients: ["Electrolytes", "Magnesium", "Potassium"],
    category: "Core Wellness",
  },
  {
    slug: "total-wellness-iv",
    name: "Total Wellness IV",
    tagline: "Broad-spectrum formulation",
    description: "A comprehensive blend combining vitamins, minerals, and antioxidant-focused ingredients in one infusion.",
    ingredients: ["Vitamin C", "B-Complex", "Zinc", "Glutathione"],
    category: "Core Wellness",
  },
  {
    slug: "beauty-glow-iv",
    name: "Beauty Glow IV",
    tagline: "Skin-focused formulation",
    description: "A formulation centered on nutrients commonly associated with skin, hair, and nail support.",
    ingredients: ["Biotin", "Vitamin C", "Glutathione", "B-Complex"],
    category: "Beauty & Antioxidants",
  },
  {
    slug: "radiance-antioxidant-iv",
    name: "Radiance + Antioxidant IV",
    tagline: "Antioxidant-focused blend",
    description: "A formulation centered on glutathione and other antioxidant-focused ingredients.",
    ingredients: ["Glutathione", "Vitamin C", "Alpha Lipoic Acid", "B-Complex"],
    category: "Beauty & Antioxidants",
  },
  {
    slug: "vitamin-c-iv",
    name: "Vitamin C IV",
    tagline: "Single-nutrient formulation",
    description: "A focused formulation built around vitamin C, dosed according to provider evaluation.",
    ingredients: ["Vitamin C", "Electrolytes"],
    category: "Beauty & Antioxidants",
  },
  {
    slug: "energy-vitality-iv",
    name: "Energy & Vitality IV",
    tagline: "B-vitamin forward blend",
    description: "A formulation built around B-vitamins and amino acids commonly associated with energy metabolism.",
    ingredients: ["Vitamin B12", "B-Complex", "Amino Blend", "Taurine"],
    category: "Energy & Performance",
  },
  {
    slug: "recovery-performance-iv",
    name: "Recovery & Performance IV",
    tagline: "Post-activity formulation",
    description: "A blend of electrolytes, amino acids, and minerals selected to support post-activity recovery.",
    ingredients: ["Electrolytes", "Amino Blend", "Magnesium", "B-Complex"],
    category: "Energy & Performance",
  },
  {
    slug: "amino-performance-iv",
    name: "Amino Performance IV",
    tagline: "Amino-acid focused blend",
    description: "A formulation centered on amino acids commonly associated with muscle and performance support.",
    ingredients: ["Amino Blend", "Taurine", "B-Complex", "Electrolytes"],
    category: "Energy & Performance",
  },
  {
    slug: "custom-iv-therapy",
    name: "Custom IV Therapy",
    tagline: "Individually formulated",
    description: "A fully individualized formulation built with your provider based on evaluation and goals.",
    ingredients: ["Provider-Selected Ingredients"],
    category: "Comprehensive & Personalized",
  },
];
