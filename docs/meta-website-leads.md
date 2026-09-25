# Meta website Lead measurement — consent-controlled activation

This integration is scoped to `/booking/laser-hair-removal`. It is not a site-wide Pixel.

## Activation gates

- Get business approval for this specific opt-in measurement and review the health/wellness data restriction implications. A generic event name does not make prohibited data permissible.
- Keep dataset/domain **Core setup** restrictions on. Domain `kamiaesthetics.com` is assigned **Health & wellness - other** by Meta.
- Disable automatic advanced matching and automatic events in dataset `958339362247309` before activation. The code also sets `autoConfig: false` before initialization.
- Update/review the site's privacy notice for this new optional data sharing before enabling it.
- Audit any independently managed GTM tags to avoid a second Pixel or duplicate event outside the consent gate.
- The baseline CSP in `next.config.mjs` blocks Meta's SDK/endpoints. A prepared allowance is gated by `NEXT_PUBLIC_META_LEAD_TRACKING=true` and scoped only to `/booking/laser-hair-removal`; unrelated routes retain their existing policy. This is not deployed or activated.
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

Verification and preparation on September 25, 2026:

- Completed and saved ad `120250327968810049` as `$149 Must-Have | Website request | Laser equipment`. Accurate single-treatment offer, existing laser-equipment image with automatic crops (no generated images), headline `3 areas. One treatment. $149.`, CTA `Request time`. No publication.
- Destination normalized to `https://kamiaesthetics.com/booking/laser-hair-removal`; browser add-on set to None; campaign, ad-set and ad IDs added as UTM parameters. Other campaigns/budgets unchanged.
- Dataset automatic advanced matching switched Off; all displayed customer-information fields Off. Automatic events already Off. Core setup remains On.
- GTM-NPBMWR8S audited in Tag Manager: live/latest version 29, five Google tags, no Meta/Custom HTML tag; workspace has zero changes. No GTM mutation.
- Prepared privacy notice updates for Mangomint, Resend and optional Meta measurement. Local only.
- All 11 isolated tracking/API classification tests passed; TypeScript, production build, diff whitespace check, and CSP gate/route-scope assertions passed.
- Local production build: privacy notice renders; laser offer and request-date step load; no captured error/warning logs, no error overlay, no Meta SDK script in disabled state. No booking submitted, no notification email sent, no Meta event sent.
- Event-blocking Review is gated by an `I acknowledge` agreement. Action-time user confirmation requested, not yet received or accepted. This acknowledgment is not evidence that a treatment-derived event is permitted.
- Still required: finish event eligibility review; establish policy-compatible event criteria; verify actual SDK transmission and exactly one synthetic event in Test Events; approve/perform production activation and final ad publication. Do not claim end-to-end tracking or delivery is verified.

Creative correction, September 25, 2026: User requested retaining the original $149 offer video. Replaced the image with `Kami_Must_Have_149_Cat_Walk.mp4` (720 × 1280, 0:12), verified against source ad `120217528837780049` in campaign `120217528837770049`. Renamed draft `$149 Must-Have | Website request | Original Cat Walk video`. Removed all three related-media selections; uploaded media shows one selected. Website URL, no Messenger add-on, UTM parameters and Request time CTA retained. All edits saved; no publication or tracking activation. Source campaign unmodified. Video itself retains its original embedded 4–6 sessions claim; no video editing was requested or performed.

## Activation work — September 25, 2026

User explicitly authorized Pixel activation and subsequently confirmed the Meta acknowledgment. Accepted the acknowledgment; Event statuses showed Action required (None), Blocked (None), Confirmed (None). This is not affirmative policy clearance for treatment-derived data.

Preview `dpl_2oyWmjLCwK6xFYKngNTx7cmy2wn2` built successfully. Browser verified no SDK before opt-in; Decline persisted through reload; Allow loaded fbevents.js and the configuration script for dataset 958339362247309; no captured browser warnings/errors. Withdrawal returned the interface to Off. No booking or Lead event was submitted during this check.

Production activation uses NEXT_PUBLIC_META_LEAD_TRACKING=true, also saved in Vercel Production environment for subsequent builds. Production candidate: `dpl_4bBUed7Q5Zy8oCVKMD7x5xjq32Fd`. Scope remains only the laser offer page. Automatic matching/events remain off, Core setup on. Consent is revoked when the consent component unmounts.

A successful request-to-Meta Lead transmission, full payload inspection, and attribution remain unverified. Do not represent this as verified conversion optimization or a launched ad campaign. Final production browser verification is recorded in the task review artifact.
