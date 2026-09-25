# Meta website Lead measurement — staged, disabled by default

This integration is scoped to `/booking/laser-hair-removal`. It is not a site-wide Pixel.

## Activation gates

- Get business approval for this specific opt-in measurement and review the health/wellness data restriction implications. A generic event name does not make prohibited data permissible.
- Keep dataset/domain **Core setup** restrictions on. Domain `kamiaesthetics.com` is assigned **Health & wellness - other** by Meta.
- Disable automatic advanced matching and automatic events in dataset `958339362247309` before activation. The code also sets `autoConfig: false` before initialization.
- Update/review the site's privacy notice for this new optional data sharing before enabling it.
- Audit any independently managed GTM tags to avoid a second Pixel or duplicate event outside the consent gate.
- The current CSP in `next.config.mjs` blocks Meta's SDK/endpoints. Prepare a narrowly scoped policy allowance for the selected route as part of the approved activation; do not disable CSP or add broad wildcards. This has not been changed yet.
- Enable `NEXT_PUBLIC_META_LEAD_TRACKING=true` only for the deployment approved for verification/rollout; it is off when unset.
- Confirm a synthetic request reaches Meta Test Events as exactly one standard `Lead`, with no treatment/contact/appointment/custom data. Confirm URL restrictions in the event view. Do not count it as a real business lead or revenue.
- Confirm the browser request contains no unintended fields before rollout. If the actual SDK transmission exceeds the approved design, leave this disabled and revise.

## Behavior

- No SDK, cookies, or events are added by this integration without explicit opt-in.
- A browser Global Privacy Control or Do Not Track signal denies measurement.
- The optional choice is separate from SMS marketing and never blocks booking.
- The manual `Lead` signal is called only after the appointment request API returns success.
- Empty event parameters: no names, email addresses, phone numbers, treatment/offer labels, amounts, or requested dates/times.
- A random UUID distinct from the booking ID is used for same-page deduplication.
- No PageView, ViewContent, Schedule, Purchase, or treatment-specific custom Meta events.
- Existing Google analytics are preserved, not forwarded wholesale to Meta.
- Conversions API is not implemented by this change.
- Reloading the confirmation is not a new lead; rejecting or withdrawing consent does not replay earlier conversions.

Meta's SDK may transmit device/network/cookie data as part of its normal operation; only an actual request inspection establishes the complete transmission. Core setup is not a substitute for the advertiser's compliance obligations.

## Campaign

New draft: `120250327968820049`. Leads objective, Website location, standard Lead event, $25/day **additional** budget. Existing `Must Have Package $149 / IG` remains at $40/day and must not be reduced. Keep all other campaigns unchanged.

## Official references

- https://developers.facebook.com/documentation/meta-pixel/advanced (manual-only autoConfig; trackSingle)
- https://www.facebook.com/business/help/124742407297678 (Core setup)
- https://www.facebook.com/business/help/361948878201809 (prohibited information)

## Current state

Local implementation only. Feature disabled until the gates above pass. Do not claim the campaign is live or the tracking verified solely because the code compiles.

Verification on September 24, 2026:

- 11 isolated Node tests passed (consent, privacy signals, storage failure/expiry, deduplication, SDK exceptions, and successful/unsuccessful API response classification). These use mocks and do not submit a real booking or send an event.
- TypeScript check and whitespace diff check passed.
- Local browser: optional notice renders; Decline leaves booking navigation available; change-choice control works; decline persists on reload; no Meta script/image is inserted in the declined state; no captured console errors/warnings.
- No live DB-to-Meta end-to-end test, production deployment, tracking activation, or ad publication has occurred.
- Draft audience verified: Aventura +12 miles; geographic-interest expansion off; 18–65+, all genders; no custom audience or interest restriction. Existing account placement exclusions are retained, with spending into excluded placements off.
- Ad creative/destination still need preparation and review before publication.
