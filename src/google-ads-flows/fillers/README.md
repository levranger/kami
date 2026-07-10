# Dermal Fillers Booking Funnel

Production-ready, mobile-first Google Ads booking funnel for Kami Aesthetics dermal filler consultations.

## Setup

```bash
pnpm install
pnpm run dev
```

## Integration

```tsx
import { FillerBookingFlow } from "@/google-ads-flows/fillers";

export default function FillerBookingPage() {
  return <FillerBookingFlow />;
}
```

## Configuration

### Treatment Areas & Pricing
Edit `lib/config.ts` to update:
- Treatment areas and syringe estimate ranges
- Product pricing (per-syringe)
- Goal multipliers
- Overlap adjustment rules
- Deposit rules

### Mock vs Production Mode
Edit `lib/bookingApi.ts`:
- `mode: "mock"` — simulated responses
- `mode: "production"` — requires real integrations (throws errors if missing)

### Integration Adapters
- **Mangomint**: Replace `mockAvailabilityProvider` in `lib/availability.ts`
- **Stripe**: Add deposit collection in booking submission flow
- **Secure Notifications**: Add transactional SMS/email in `lib/bookingApi.ts`
- **Attribution**: Replace mock in `lib/attributionApi.ts` with first-party endpoint

### Privacy & Legal
Update placeholder links in `components/ContactForm.tsx`:
- Privacy Policy
- Terms of Service
- SMS Terms
- Notice of Privacy Practices

## Privacy-First Architecture

- No third-party analytics scripts in the protected funnel
- Contact/screening data kept in React memory only (no localStorage)
- Attribution captured on landing layer, exchanged for opaque token
- Sensitive state cleared after submission

**WARNING**: This code uses privacy-conscious technical defaults, but the code alone does not make Kami Aesthetics HIPAA compliant. Compliance requires determining regulatory status, documented risk analysis, organizational policies, workforce training, access controls, vendor agreements, incident procedures, retention rules, and ongoing operational oversight.

## Production Checklist

- [ ] Validate syringe estimate ranges with medical director
- [ ] Validate overlap rules with provider team
- [ ] Confirm product pricing
- [ ] Confirm deposit policy
- [ ] Replace placeholder images with approved patient photos
- [ ] Connect Mangomint availability API
- [ ] Connect Stripe for deposits
- [ ] Connect secure transactional notifications
- [ ] Implement first-party attribution token endpoint
- [ ] Implement server-side conversion reporting
- [ ] Add privacy policy and SMS terms URLs
- [ ] Complete vendor BAA review
- [ ] Define data retention policy
- [ ] Configure log redaction for production
- [ ] Test all mobile breakpoints
- [ ] Accessibility audit