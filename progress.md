# Lighthouse Performance Optimization — Progress Tracker

Baseline: Performance 78 | TBT 740ms | LCP 2.7s | FCP 1.3s | JS exec 1.7s | Main-thread 2.4s

---

## PHASE 1 — Identify exactly what is still expensive ✅ COMPLETE
## PHASE 2 — Attack hydration and main-thread work ✅ COMPLETE
## PHASE 3 — Third-party and tracking discipline ✅ COMPLETE
## PHASE 4 — CSS / render path / images ✅ COMPLETE
## PHASE 5 — Concrete implementation plan ✅ COMPLETE
## PHASE 6 — Validation ✅ COMPLETE

---

## Implementation Status

| # | Fix | Status |
|---|-----|--------|
| 1 | Header: split into server shell + HeaderNav/HeaderMobile client islands | ✅ DONE |
| 2 | FooterAnchorLink: eliminated, replaced with plain `<a>` | ✅ DONE |
| 3 | TrustStrip: removed animate-fade-in stagger inline styles | ✅ DONE |
| 4 | Testimonials: removed animate-fade-in stagger inline styles | ✅ DONE |
| 5 | Font weights: Inter 400/500/600 only, Playfair 400/600/700 only (dropped 2 weights) | ✅ DONE |
| 6 | Hero preload: added explicit `<link rel="preload">` for LCP image | ✅ DONE |
| 7 | preconnect: added crossOrigin="anonymous" so TLS handshake applies to image CORS requests | ✅ DONE |
| 8 | GTM: increased idle timeout from 4000→6000ms, fallback from 3500→4000ms | ✅ DONE |
| 9 | prose-legal/prose-blog CSS: moved out of globals.css into prose.css, imported only on blog/legal pages | ✅ DONE |
| 10 | Build verified: ✅ passes with 0 errors |

---

## Build Output (after)
- Homepage First Load JS: 113 kB
- Shared chunks: 87.3 kB
- chunk 117-xxx: 31.7 kB (was 32.4 kB)
- chunk fd9d1056: 53.6 kB (was 53.8 kB)

---

## Next Steps to Verify
1. Run Lighthouse mobile on production after deploy
2. In Chrome DevTools Performance tab — confirm Header hydration task is shorter
3. Confirm no visual regressions: mobile menu, services dropdown, footer anchor links, font rendering
4. Check GTM container for Clarity or other always-on tags — defer them to interaction
