/**
 * GONE PATHS — WordPress → Next.js migration
 *
 * These paths return HTTP 410 Gone.
 *
 * 410 is used (not 404) because these pages existed and were indexed.
 * 410 signals to crawlers that the resource is intentionally removed,
 * which accelerates deindexing compared to 404.
 *
 * Paths are stored WITHOUT trailing slash. Middleware normalizes before lookup.
 *
 * Categories:
 *   - Dead informational pages (faq, about, quiz) — no current equivalent
 *   - Redesign/system pages — internal WP artifacts, never had real content
 *   - Old article pages — no sufficiently close replacement exists on the new site
 *   - Multilingual versions of all of the above
 *   - Any /ru/ or /es/ path not explicitly mapped in legacyRedirects.ts
 *     (we do NOT use a catch-all; only known paths are listed here)
 */

export const gonePaths = new Set<string>([
  // ── English: dead informational/system pages ──────────────────────────────
  "/faq",
  "/about-kami-laser",
  "/candidate-quiz",

  // ── English: old article pages (no close replacement) ────────────────────
  "/laser_hair_removal/laser-hair-removal-tailored-for-bodybuilders",
  "/laser_hair_removal/laser-hair-removal-for-hidradenitis-suppurativa",
  "/laser_hair_removal/laser-hair-removal-for-pilonidal-cysts",
  "/laser_hair_removal/laser-hair-removal-for-transgender-clients",
  "/laser_hair_removal/laser-hair-removal-for-folliculitis",
  "/laser_hair_removal/laser-hair-removal-for-brown-skin",
  "/laser_hair_removal/laser-hair-removal-for-active-lifestyle",
  "/laser_hair_removal/laser-hair-removal-for-amputees",
  "/laser_hair_removal/at-home-laser-hair-removal-weighing-the-pros-and-cons",

  // ── Russian: dead informational/system pages ──────────────────────────────
  "/ru/homepage-redesign-ru",
  "/ru/faq-ru",
  "/ru/about-kami-laser-ru",
  "/ru/candidate-quiz-ru",
  "/ru/how-it-works-ru",

  // ── Russian: old article pages ────────────────────────────────────────────
  "/ru/laser_hair_removal/laser-hair-removal-tailored-for-bodybuilders-ru",
  "/ru/laser_hair_removal/laser-hair-removal-for-hidradenitis-suppurativa-ru",
  "/ru/laser_hair_removal/laser-hair-removal-for-pilonidal-cysts-ru",
  "/ru/laser_hair_removal/laser-hair-removal-for-transgender-clients-ru",
  "/ru/laser_hair_removal/laser-hair-removal-for-folliculitis-ru",
  "/ru/laser_hair_removal/laser-hair-removal-for-brown-skin-ru",
  "/ru/laser_hair_removal/laser-hair-removal-for-amputees-ru",
  "/ru/laser_hair_removal/laser-hair-removal-for-active-lifestyle-ru",
  "/ru/laser_hair_removal/at-home-laser-hair-removal-weighing-the-pros-and-cons-ru",

  // ── Spanish: dead informational/system pages ──────────────────────────────
  "/es/homepage-redesign-esp",
  "/es/faq-esp",
  "/es/about-kami-laser-esp",
  "/es/candidate-quiz-esp",

  // ── Spanish: old article pages ────────────────────────────────────────────
  "/es/laser_hair_removal/laser-hair-removal-tailored-for-bodybuilders-esp",
  "/es/laser_hair_removal/laser-hair-removal-for-transgender-clients-esp",
  "/es/laser_hair_removal/laser-hair-removal-for-hidradenitis-suppurativa-esp",
  "/es/laser_hair_removal/laser-hair-removal-for-pilonidal-cysts-esp",
  "/es/laser_hair_removal/laser-hair-removal-for-folliculitis-esp",
  "/es/laser_hair_removal/laser-hair-removal-for-brown-skin-esp",
  "/es/laser_hair_removal/laser-hair-removal-for-amputees-esp",
  "/es/laser_hair_removal/laser-hair-removal-for-active-lifestyle-esp",
  "/es/laser_hair_removal/at-home-laser-hair-removal-weighing-the-pros-and-cons-esp",
]);
