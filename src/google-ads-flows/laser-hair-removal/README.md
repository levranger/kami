# Laser Hair Removal Booking Flow — Kami Aesthetics

A production-ready, mobile-first Google Ads booking funnel for laser hair removal.

## Setup

```bash
pnpm install
pnpm run dev
```

## Example Integration

```tsx
import { LaserHairRemovalBookingFlow } from "@/google-ads-flows/laser-hair-removal";

export default function LaserHairRemovalBookingPage() {
  return <LaserHairRemovalBookingFlow />;
}
```

The flow is accessible at `/booking/laser-hair-removal` in the current app.

## Required Dependencies

All dependencies are already included in the main project:
- React 18+
- React Router DOM
- Tailwind CSS
- lucide-react (icons)
- TypeScript 5+

No additional third-party packages required.

## Configuration

### Mock vs Production Mode

The funnel operates in `mock` mode by default. Change in `lib/bookingApi.ts`:

```ts
const FUNNEL_MODE: FunnelMode = "mock"; // Change to "production" when ready
```

In production mode, unimplemented integrations will throw clear errors instead of pretending to work.

### Image Replacement

Replace placeholder before/after images in `components/BeforeAfterSlider.tsx`:
- `/images/laser/underarms-before.webp`
- `/images/laser/underarms-after.webp`
- etc.

### Pricing Configuration

All pricing is centralized in `components/AreaSelector.tsx` (treatment areas) and `lib/pricing.ts` (package calculations).

### Integration Adapters

| Adapter | File | Status |
|---------|------|--------|
| Availability (Mangomint) | `lib/mockAvailability.ts` | Mock |
| Lead Capture | `lib/bookingApi.ts` | Mock |
| Booking Submission | `lib/bookingApi.ts` | Mock |
| Stripe Deposit | `lib/bookingApi.ts` | Interface only |
| Analytics (GA4) | `lib/analytics.ts` | Dev logger |
| Zapier Webhook | `lib/bookingApi.ts` | Interface only |

### Privacy/Terms Links

Update placeholder links in `components/ContactForm.tsx`:
- Privacy Policy URL
- Terms URL
- SMS Terms URL

### External URLs

- Preparation Guide: Update link in `components/ConfirmationPage.tsx`
- Google Maps: Already configured for 2999 NE 191st St, Aventura, FL 33180

## Production Checklist

- [ ] Replace placeholder before/after images
- [ ] Confirm patient photo consent
- [ ] Validate package pricing with business
- [ ] Connect real Mangomint availability
- [ ] Connect Stripe deposit ($50)
- [ ] Connect booking creation API
- [ ] Connect transactional SMS/email notifications
- [ ] Add real privacy and SMS terms pages
- [ ] Test Google Ads conversion events (gclid, gbraid, wbraid)
- [ ] Test all mobile breakpoints (375px, 390px, 430px)
- [ ] Test stale-slot handling
- [ ] Verify no PII is sent to analytics
- [ ] Test keyboard navigation and screen reader
- [ ] Verify 200% zoom layout

## Architecture

```
laser-hair-removal/
├── LaserHairRemovalBookingFlow.tsx  — Main orchestrator
├── index.ts                        — Public export
├── components/
│   ├── LandingHero.tsx            — Google Ads landing section
│   ├── ProgressIndicator.tsx      — Step 1-5 progress bar
│   ├── AreaSelector.tsx           — Step 1: Treatment area selection
│   ├── PackageSelector.tsx        — Step 2: Package selection
│   ├── ContactForm.tsx            — Step 3: Contact details
│   ├── DateTimeSelector.tsx       — Step 4: Date/time selection
│   ├── ReviewBooking.tsx          — Step 5: Review and submit
│   ├── ConfirmationPage.tsx       — Post-submission confirmation
│   ├── PriceSummary.tsx           — Reusable pricing display
│   ├── BeforeAfterSlider.tsx      — Before/after comparison slider
│   ├── MobileStickyFooter.tsx     — Sticky CTA bar
│   └── TrustSection.tsx           — Trust indicators
├── hooks/
│   ├── useBookingState.ts         — Central state management
│   └── useAttributionTracking.ts  — Google Ads attribution
├── lib/
│   ├── pricing.ts                 — Centralized pricing logic
│   ├── validation.ts              — Form validation rules
│   ├── phone.ts                   — Phone formatting/validation
│   ├── analytics.ts               — Typed analytics wrapper
│   ├── storage.ts                 — localStorage persistence
│   ├── bookingApi.ts              — API adapters (mock + interfaces)
│   └── mockAvailability.ts        — Mock availability provider
├── types/
│   └── booking.ts                 — All TypeScript interfaces
└── styles/
    └── booking.css                — Slider and animation styles
```