"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAttributionTracking } from "./hooks/useAttributionTracking";
import { botoxAnalytics } from "./lib/analytics";
import { LandingHero } from "./components/LandingHero";
import { OfferSection } from "./components/OfferSection";
import { BeforeAfterGallery } from "./components/BeforeAfterGallery";
import { ProviderCredibility } from "./components/ProviderCredibility";
import { TrustSection } from "./components/TrustSection";
import { SafetyInformation } from "./components/SafetyInformation";
import { ClinicInfo } from "./components/ClinicInfo";
import { MobileStickyFooter } from "./components/MobileStickyFooter";
import { StickyCallButton } from "./components/StickyCallButton";
import { BotoxRequestFlow } from "./BotoxRequestFlow";

/**
 * /booking/botox — $10/unit Botox campaign landing page.
 *
 * The primary CTA no longer sends visitors to Mangomint. It opens an on-site
 * appointment-request flow (lead-capture first, like the LHR flow); Kami staff
 * review the requested time and create the confirmed appointment in Mangomint
 * manually.
 */
export function BotoxBookingFlow() {
  const attribution = useAttributionTracking();
  const [showRequest, setShowRequest] = useState(false);
  const hasFiredLandingViewRef = useRef(false);

  // Fire botox_landing_view exactly once on mount, before the CTA can be
  // clicked. Reads the ad params straight from the URL since attribution
  // state is populated asynchronously by useAttributionTracking.
  useEffect(() => {
    if (hasFiredLandingViewRef.current) return;
    hasFiredLandingViewRef.current = true;
    const params = new URLSearchParams(window.location.search);
    botoxAnalytics.trackLandingView({
      gclid: params.get("gclid") || undefined,
      gbraid: params.get("gbraid") || undefined,
      wbraid: params.get("wbraid") || undefined,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmContent: params.get("utm_content") || undefined,
    });
  }, []);

  const startRequest = useCallback(
    (placement: string) => {
      botoxAnalytics.trackOfferCtaClick(placement);
      botoxAnalytics.trackRequestStarted(placement, attribution);
      setShowRequest(true);
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    [attribution],
  );

  if (showRequest) {
    return <BotoxRequestFlow attribution={attribution} onExit={() => setShowRequest(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28 md:pb-0">
      <LandingHero onRequest={startRequest} />
      <OfferSection onRequest={startRequest} />
      <BeforeAfterGallery />
      <ProviderCredibility />
      <TrustSection />
      <SafetyInformation />
      <ClinicInfo onRequest={startRequest} />

      <MobileStickyFooter show offerCta onOfferCta={startRequest} />
      <StickyCallButton location="landing" liftForStickyFooter />
    </div>
  );
}
