/**
 * LEGACY REDIRECT MAP — WordPress → Next.js migration
 *
 * Migration policy:
 *   - Only redirect when intent is strong and the destination is semantically close.
 *   - Duplicate homepage slugs → /
 *   - Service-intent pages (how-it-works, area pages, language equivalents) → /services/laser-hair-removal
 *   - /ru/services-ru and /es/services-esp → /services (judgment call: these were the
 *     multilingual services index; /services is the closest English equivalent)
 *   - Dead informational pages (faq, about, quiz, redesign pages, old articles) → 410 (see gonePaths.ts)
 *   - No broad language catch-alls. Every path is explicit.
 *
 * Paths are stored WITHOUT trailing slash (normalized at runtime by middleware).
 * The root "/" is the only exception.
 *
 * Status code note:
 *   Next.js redirects() with permanent:true emits 308, not 301.
 *   Middleware NextResponse.redirect() also emits 308 by default.
 *   We pass { status: 301 } explicitly in middleware for true 301 behavior.
 *   308 is correctly followed by all modern crawlers including Googlebot, but
 *   301 is used here for maximum compatibility with legacy crawlers and tools.
 */

export const legacyRedirects: Record<string, string> = {
  // ── Duplicate homepage slugs ──────────────────────────────────────────────
  "/home-page": "/",
  "/ru/home-page-ru": "/",
  "/es/home-page-esp": "/",

  // ── Service-intent: how-it-works / types-of-hair-removal ─────────────────
  "/how-it-works": "/services/laser-hair-removal",
  "/types-of-hair-removal": "/services/laser-hair-removal",
  "/ru/types-of-hair-removal-ru": "/services/laser-hair-removal",
  "/es/types-of-hair-removal-esp": "/services/laser-hair-removal",

  // ── English service-area pages ────────────────────────────────────────────
  "/services_lazer/stomach": "/services/laser-hair-removal",
  "/services_lazer/nail-fungus": "/services/laser-hair-removal",
  "/services_lazer/legs": "/services/laser-hair-removal",
  "/services_lazer/underarms": "/services/laser-hair-removal",
  "/services_lazer/full-face": "/services/laser-hair-removal",
  "/services_lazer/bikini": "/services/laser-hair-removal",
  "/services_lazer/chest": "/services/laser-hair-removal",
  "/services_lazer/buttocks": "/services/laser-hair-removal",
  "/services_lazer/back": "/services/laser-hair-removal",
  "/services_lazer/arms": "/services/laser-hair-removal",

  // ── Russian service-area pages ────────────────────────────────────────────
  "/ru/services_lazer/спина": "/services/laser-hair-removal",
  "/ru/services_lazer/ягодицы": "/services/laser-hair-removal",
  "/ru/services_lazer/руки": "/services/laser-hair-removal",
  "/ru/services_lazer/подмышки": "/services/laser-hair-removal",
  "/ru/services_lazer/ноги": "/services/laser-hair-removal",
  "/ru/services_lazer/живот": "/services/laser-hair-removal",
  "/ru/services_lazer/грудь": "/services/laser-hair-removal",
  "/ru/services_lazer/грибок-ногтей": "/services/laser-hair-removal",
  "/ru/services_lazer/все-лицо": "/services/laser-hair-removal",
  "/ru/services_lazer/бикини": "/services/laser-hair-removal",

  // ── Spanish service-area pages ────────────────────────────────────────────
  "/es/services_lazer/rostro-completo": "/services/laser-hair-removal",
  "/es/services_lazer/piernas": "/services/laser-hair-removal",
  "/es/services_lazer/pecho": "/services/laser-hair-removal",
  "/es/services_lazer/nalgas": "/services/laser-hair-removal",
  "/es/services_lazer/hongos-en-las-unas": "/services/laser-hair-removal",
  "/es/services_lazer/estomago": "/services/laser-hair-removal",
  "/es/services_lazer/espalda": "/services/laser-hair-removal",
  "/es/services_lazer/brazos": "/services/laser-hair-removal",
  "/es/services_lazer/bikini-esp": "/services/laser-hair-removal",
  "/es/services_lazer/axilas": "/services/laser-hair-removal",

  // ── Language service index pages (judgment call) ──────────────────────────
  // These were the multilingual "all services" index pages. /services is the
  // closest English equivalent — broader intent than a single service page.
  "/ru/services-ru": "/services",
  "/es/services-esp": "/services",
};
