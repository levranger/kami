/**
 * Normalize a URL pathname for legacy redirect/gone lookups.
 *
 * Rules:
 *   - Strip trailing slash, EXCEPT for the root path "/"
 *   - Lowercase (legacy WP paths were all lowercase)
 *   - Do NOT decode percent-encoded characters here — Cyrillic slugs arrive
 *     already decoded from Next.js middleware's request.nextUrl.pathname
 */
export function normalizePath(pathname: string): string {
  if (pathname === "/") return "/";
  const stripped = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  try { return decodeURIComponent(stripped); } catch { return stripped; }
}
