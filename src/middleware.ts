/**
 * middleware.ts — Legacy URL handling for WordPress → Next.js migration
 *
 * Responsibilities:
 *   1. Redirect legacy paths with strong semantic equivalents (301)
 *   2. Return 410 Gone for dead pages with no meaningful equivalent
 *   3. Pass everything else through untouched
 *
 * Status codes:
 *   - Redirects use status 301 (Moved Permanently), set explicitly via { status: 301 }.
 *     Note: NextResponse.redirect() defaults to 307; we override to 301.
 *     Next.js config redirects() with permanent:true emits 308, not 301 — that is why
 *     high-confidence redirects are handled here in middleware instead, for true 301 control.
 *   - Gone responses use status 410 with a plain-text body.
 *
 * What this middleware does NOT touch:
 *   - /_next/* (Next.js internals, static chunks, HMR)
 *   - /api/* (API routes)
 *   - Static files: images, fonts, favicon, robots.txt, sitemap.xml, manifest
 *   - All current live pages (they simply fall through to NextResponse.next())
 */

import { NextRequest, NextResponse } from "next/server";
import { legacyRedirects } from "@/lib/seo/legacyRedirects";
import { gonePaths } from "@/lib/seo/gonePaths";
import { normalizePath } from "@/lib/seo/normalizeLegacyPath";
import { OLD_SERVICE_REDIRECTS } from "@/data/categories";

const DEV = process.env.NODE_ENV === "development";

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const normalized = normalizePath(pathname);

  // ── Check service category redirects (old /services/[slug] → new /services/[cat]/[slug]) ──
  const serviceRedirect = OLD_SERVICE_REDIRECTS[normalized];
  if (serviceRedirect) {
    const url = request.nextUrl.clone();
    url.pathname = serviceRedirect;
    if (DEV) console.log(`[service-redirect] 301 ${pathname} → ${serviceRedirect}`);
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── Check redirect map ────────────────────────────────────────────────────
  const redirectTarget = legacyRedirects[normalized];
  if (redirectTarget) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTarget;
    // Preserve query string (e.g. UTM params on old indexed URLs)
    if (DEV) console.log(`[legacy-redirect] 301 ${pathname} → ${redirectTarget}`);
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── Check gone set ────────────────────────────────────────────────────────
  if (gonePaths.has(normalized)) {
    if (DEV) console.log(`[legacy-gone] 410 ${pathname}`);
    return new NextResponse("Gone", {
      status: 410,
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  // ── Dead language namespaces ──────────────────────────────────────────────
  // The site is English-only and will never serve /ru/ or /es/ again.
  // Any path under these prefixes not explicitly redirected above is 410 Gone,
  // not 404 — these pages existed and were indexed; 410 accelerates deindexing.
  if (normalized.startsWith("/ru/") || normalized.startsWith("/es/")) {
    if (DEV) console.log(`[legacy-gone] 410 ${pathname} (unknown language namespace)`);
    return new NextResponse("Gone", {
      status: 410,
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/).*)",],
};
