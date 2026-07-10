# Botox & Wrinkle Relaxer Booking Funnel

Production-ready, mobile-first Google Ads booking funnel for Kami Aesthetics.

## Setup

```bash
npm install
npm run dev
```

## Integration

```tsx
import { BotoxBookingFlow } from "@/google-ads-flows/botox";

export default function BotoxBookingPage() {
  return <BotoxBookingFlow />;
}
```

## Configuration

### Product Configuration
Edit `lib/estimates.ts` to update:
- Product names and per-unit pricing
- Concern estimate ranges
- Treatment-goal multipliers
- Overlap adjustment rules
- Deposit rules

### Mock vs Production Mode
Edit `lib/bookingApi.ts`:
- `mode: "mock"` — uses simulated API responses
- `mode: "production"` — requires real integrations (will throw errors if not connected)

### Image Replacement
Replace placeholder paths in `components/BeforeAfterGallery.tsx` with approved patient photos.

### Integration Adapters
- **Mangomint**: Replace `mockAvailabilityProvider` in `lib/mockAvailability.ts`
- **Stripe**: Add deposit collection in `lib/bookingApi.ts` submission flow
- **Zapier**: Add webhook call in booking submission
- **Analytics**: Replace console logger in `lib/analytics.ts` with GA4 gtag calls

### Privacy & Legal Links
Update placeholder links in `components/ContactForm.tsx`:
- Privacy Policy URL
- Terms of Service URL
- SMS Terms URL

### Other Configuration
- Pre-treatment guide URL in `components/ConfirmationPage.tsx`
- Directions URL in `components/ConfirmationPage.tsx`
- Phone number throughout components

## Production Checklist

- [ ] Confirm all advertised product names
- [ ] Validate unit pricing with clinic
- [ ] Validate estimate ranges with medical leadership
- [ ] Validate overlap rules
- [ ] Confirm deposit policy
- [ ] Replace placeholder images with approved patient photos
- [ ] Confirm photo consent for all before/after images
- [ ] Connect Mangomint availability API
- [ ] Connect Stripe for deposit collection
- [ ] Connect booking creation to Mangomint
- [ ] Connect transactional SMS/email notifications
- [ ] Add privacy policy and SMS terms URLs
- [ ] Test Google Ads conversion tracking end-to-end
- [ ] Verify no medical data enters analytics
- [ ] Verify no sensitive data enters localStorage
- [ ] Test clinical-routing rules (pregnancy, allergies, etc.)
- [ ] Test stale-slot handling
- [ ] Test all mobile breakpoints (375px, 390px, 430px)

## Future Production Submission Sequence

1. Revalidate slot availability
2. Create a temporary slot hold
3. Collect deposit via Stripe
4. Confirm booking in Mangomint
5. Send transactional SMS/email
6. Record lead and booking data
7. Fire confirmed booking conversion to Google Ads
8. Show final confirmation