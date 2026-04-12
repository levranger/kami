import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/content";
import { categoryDefs, SLUG_TO_CATEGORY } from "@/data/categories";
import { treatments } from "@/data/treatments";

const BASE = "https://kamiaesthetics.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categoryDefs.map((c) => ({
    url: `${BASE}/services/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = treatments
    .map((t) => {
      const cat = SLUG_TO_CATEGORY[t.slug];
      if (!cat) return null;
      return {
        url: `${BASE}/services/${cat}/${t.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date).toISOString(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes, ...blogRoutes];
}
