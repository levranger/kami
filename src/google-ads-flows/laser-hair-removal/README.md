# Laser Hair Removal Booking Flow — Kami Aesthetics

A production-ready, mobile-first Google Ads booking funnel for laser hair removal.

## Offer

The funnel sells one fixed offer, defined once in `lib/offers.ts` and read
everywhere from there (`OFFER_ID = "lhr_must_have_149"`):

```
NEW CLIENT MUST-HAVE
Full Brazilian + Underarms + Half Legs — $149
$289 regular combined value   (Full Brazilian $109 + Underarms $60 + Half Legs $120)
On the Lumenis Splendor X
```

Use the phrase **Full Brazilian + Underarms + Half Legs** verbatim. Do not
substitute "Bikini" or "Legs" anywhere (landing page, funnel, confirmation,
analytics, booking payload, emails).

There is no treatment-area or package selection. The visible flow is:

```
Landing page  →  Step 1 of 2 · Appointment  →  Step 2 of 2 · Contact  →  Confirmation
```

"Redeem This Offer" on the landing page goes straight to date selection.
Confirmation is not a numbered step. Submission is lead-capture only (no
payment) — staff confirm the requested slot by phone/text and book it manually.

### Contact step

Required: full name, mobile phone. Email is optional (validated for format only
if provided). Promotional SMS consent is optional and separate — a request can
be submitted without it.

### Analytics

Offer-specific canonical events, each carrying `offer_id`:

```
laser_landing_view · laser_offer_redeem_clicked · laser_booking_flow_started
laser_datetime_selected · laser_contact_info_entered
laser_booking_completed (primary conversion, value/currency) · laser_booking_error
```

GCLID / GBRAID / WBRAID and UTMs are preserved on the entry events. There are no
area- or package-selection events. GTM/GA4 triggers that referenced the old
`laser_area_selected`, `laser_step_viewed`, `booking_cta_clicked`, or the
`laser_step_order_v1` / `laser_entry_page_v1` experiment params must be updated.

### Booking payload

`POST /api/booking/laser-hair-removal` expects `{ offer, contactInfo, marketingConsent,
selectedDate, selectedTime, attribution }` — no `selectedAreas` / `selectedPackage` /
`pricingSummary`. The DB keeps those legacy columns filled with constants for
backward compatibility (see `api/booking/laser-hair-removal/db.ts`); the `offer`
and `offer_id` columns are the source of truth going forward.

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

### Image Replacement

Replace placeholder before/after images in `components/BeforeAfterSlider.tsx`:
- `/images/laser/underarms-before.webp`
- `/images/laser/underarms-after.webp`
- etc.

### Offer Configuration

Everything about the offer — wording, `$149` price, `$289` value, the three
areas, the Splendor X positioning, promotional terms — lives in `lib/offers.ts`.
`lib/pricing.ts` is now just currency formatting.

### Integration Adapters

| Adapter | File | Status |
|---------|------|--------|
| Availability (Mangomint) | `lib/mockAvailability.ts` | Mock |
| Booking Submission | `lib/bookingApi.ts` → `api/booking/laser-hair-removal` | Live (Postgres + Resend email) |
| Analytics (GA4 via GTM dataLayer) | `lib/analytics.ts` | Live |

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
- [ ] Confirm the offer terms in `lib/offers.ts` are the ones legal/marketing intend
- [ ] Connect real Mangomint availability
- [ ] Point GTM/GA4 + Google Ads conversions at `laser_booking_completed` and drop the old event triggers
- [ ] Add real privacy and SMS terms pages
- [ ] Test Google Ads conversion events (gclid, gbraid, wbraid, UTMs) end to end
- [ ] Test all mobile breakpoints (375px, 390px, 430px) — incl. call pill vs CTA/consent
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
│   ├── LandingHero.tsx            — Google Ads landing section (offer-focused)
│   ├── ProgressIndicator.tsx      — Step 1-2 progress bar
│   ├── OfferReminder.tsx          — Compact offer summary atop the Appointment step
│   ├── DateTimeSelector.tsx       — Step 1: Date/time selection
│   ├── ContactForm.tsx           — Step 2: Contact details (submits the request)
│   ├── ConfirmationPage.tsx       — Post-submission confirmation
│   ├── BeforeAfterSlider.tsx      — Before/after comparison slider
│   ├── MobileStickyFooter.tsx     — Sticky CTA bar
│   ├── StickyCallButton.tsx       — Floating "call us" pill (hidden on Contact step)
│   └── TrustSection.tsx           — Trust indicators
├── hooks/
│   ├── useBookingState.ts         — Central state management
│   └── useAttributionTracking.ts  — Google Ads attribution
├── lib/
│   ├── offers.ts                  — Single source of truth for the $149 offer
│   ├── pricing.ts                 — Currency formatting
│   ├── validation.ts              — Form validation rules
│   ├── phone.ts                   — Phone formatting/validation
│   ├── analytics.ts               — Offer-specific canonical events
│   ├── storage.ts                 — localStorage persistence
│   ├── bookingApi.ts              — Booking submission
│   └── mockAvailability.ts        — Mock availability provider
├── types/
│   └── booking.ts                 — All TypeScript interfaces
└── styles/
    └── booking.css                — Slider and animation styles
```