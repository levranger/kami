// Navigation service categories for the header dropdown
export const navCategories = [
  { slug: "lasers", title: "Lasers", href: "/services/lasers" },
  { slug: "injectables", title: "Injectables", href: "/services/injectables" },
  { slug: "wellness", title: "Wellness", href: "/services/wellness" },
] as const;

// Keep for any legacy references
export const navServices = [
  { slug: "laser-hair-removal", title: "Laser Hair Removal", href: "/services/lasers/laser-hair-removal" },
  { slug: "ipl-treatments", title: "IPL Treatments", href: "/services/lasers/ipl-treatments" },
  { slug: "resurfx", title: "ResurFX", href: "/services/lasers/resurfx" },
  { slug: "botox", title: "Botox", href: "/services/injectables/botox" },
  { slug: "dermal-fillers", title: "Dermal Fillers", href: "/services/injectables/dermal-fillers" },
  { slug: "prp-therapy", title: "PRP Therapy", href: "/services/wellness/prp-therapy" },
  { slug: "iv-therapy", title: "IV Therapy", href: "/services/wellness/iv-therapy" },
  { slug: "weight-loss", title: "Medical Weight Loss", href: "/services/wellness/weight-loss" },
] as const;
