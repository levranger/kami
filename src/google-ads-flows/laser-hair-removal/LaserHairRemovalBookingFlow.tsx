"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useBookingState } from "./hooks/useBookingState";
import { useAttributionTracking } from "./hooks/useAttributionTracking";
import { laserAnalytics } from "./lib/analytics";
import { validateContact, validateDateTime } from "./lib/validation";
import { submitBookingRequest } from "./lib/bookingApi";
import { clearBookingState } from "./lib/storage";
import { offerSummary } from "./lib/offers";
import type { ValidationError } from "./lib/validation";

import StickyCallButton from "./components/StickyCallButton";
import LandingHero from "./components/LandingHero";
import FunnelBrandHeader from "./components/FunnelBrandHeader";
import ProgressIndicator from "./components/ProgressIndicator";
import OfferReminder from "./components/OfferReminder";
import ContactForm from "./components/ContactForm";
import DateTimeSelector from "./components/DateTimeSelector";
import ConfirmationPage from "./components/ConfirmationPage";
import MobileStickyFooter from "./components/MobileStickyFooter";

import "./styles/booking.css";

export default function LaserHairRemovalBookingFlow() {
  const state = useBookingState();
  const [showFunnel, setShowFunnel] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const funnelRef = useRef<HTMLDivElement>(null);
  const hasFiredLandingViewRef = useRef(false);

  // Attribution tracking — captures GCLID / GBRAID / WBRAID / UTMs once per
  // funnel session and preserves them across refreshes.
  useAttributionTracking(state.attribution, state.setAttribution);

  // Fire laser_landing_view exactly once on mount, before the CTA can be
  // clicked. Reads the ad params straight from the URL since state.attribution
  // is populated asynchronously by the effect above.
  useEffect(() => {
    if (hasFiredLandingViewRef.current) return;
    hasFiredLandingViewRef.current = true;
    const params = new URLSearchParams(window.location.search);
    laserAnalytics.trackLandingView({
      gclid: params.get("gclid") || undefined,
      gbraid: params.get("gbraid") || undefined,
      wbraid: params.get("wbraid") || undefined,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmTerm: params.get("utm_term") || undefined,
      utmContent: params.get("utm_content") || undefined,
    });
  }, []);

  // "Redeem This Offer" on the landing page → straight into date selection.
  const handleStartBooking = useCallback(() => {
    setShowFunnel(true);
    laserAnalytics.trackOfferRedeemClicked(state.attribution);
    laserAnalytics.trackFlowStarted(state.attribution);
    setTimeout(() => {
      funnelRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [state.attribution]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const email = state.contactInfo.email.trim().toLowerCase();
      const result = await submitBookingRequest({
        offer: offerSummary(),
        contactInfo: {
          fullName: state.contactInfo.fullName.trim(),
          phone: state.contactInfo.phone,
          email,
        },
        marketingConsent: state.marketingConsent,
        selectedDate: state.selectedDate!,
        selectedTime: state.selectedTime!,
        attribution: state.attribution,
      });

      state.setBookingRequestId(result.bookingRequestId);
      clearBookingState();
      laserAnalytics.trackBookingCompleted();
    } catch {
      setSubmitError("We couldn't submit your request. Your requested time is still saved — please try again.");
      laserAnalytics.trackBookingError("submission_failed");
    } finally {
      setIsSubmitting(false);
    }
  }, [state]);

  const handleNext = useCallback(async () => {
    setErrors([]);
    setSubmitError(null);

    if (state.currentStep === 1) {
      const stepErrors = validateDateTime(state.selectedDate, state.selectedTime);
      if (stepErrors.length > 0) {
        setErrors(stepErrors);
        return;
      }
      laserAnalytics.trackDateTimeSelected(state.selectedDate!, state.selectedTime!);
      state.nextStep();
      window.scrollTo({ top: funnelRef.current?.offsetTop || 0, behavior: "smooth" });
      return;
    }

    // Step 2 — Contact → submit
    const stepErrors = validateContact(state.contactInfo);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }
    laserAnalytics.trackContactInfoEntered(state.marketingConsent);
    await handleSubmit();
  }, [state, handleSubmit]);

  const handleBack = useCallback(() => {
    setErrors([]);
    state.previousStep();
  }, [state]);

  const handleReturnHome = () => {
    window.location.href = "/";
  };

  // Confirmation — not a numbered step.
  if (state.bookingRequestId) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <ConfirmationPage
            bookingRequestId={state.bookingRequestId}
            selectedDate={state.selectedDate!}
            selectedTime={state.selectedTime!}
            contactPhone={state.contactInfo.phone}
            onReturnHome={handleReturnHome}
          />
        </div>
      </div>
    );
  }

  const ctaLabel = state.currentStep === 1 ? "Continue" : "Request Appointment";
  const nextDisabled =
    state.currentStep === 1 && (!state.selectedDate || !state.selectedTime);

  // Keep the floating call pill off the Contact step so it can never overlap
  // the consent text or the primary CTA on small screens.
  const showCallButton = !showFunnel || state.currentStep === 1;

  return (
    <div className="min-h-screen bg-white">
      {/* Landing hero — for traffic that hasn't started the funnel yet */}
      {!showFunnel && <LandingHero onStartBooking={handleStartBooking} />}

      {showCallButton && <StickyCallButton liftForStickyFooter={showFunnel} />}

      {showFunnel && (
        <div ref={funnelRef} className="pb-24">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <FunnelBrandHeader />

            <div className="mb-8">
              <ProgressIndicator currentStep={state.currentStep} />
            </div>

            {submitError && (
              <div role="alert" aria-live="assertive" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
                <p className="font-inter text-sm text-red-600">{submitError}</p>
                <button
                  onClick={handleSubmit}
                  className="font-inter text-sm text-gold hover:text-gold-dark mt-2 underline"
                >
                  Try again
                </button>
              </div>
            )}

            <div className="step-enter step-enter-active">
              {state.currentStep === 1 && (
                <>
                  <OfferReminder />
                  <DateTimeSelector
                    selectedDate={state.selectedDate}
                    selectedTime={state.selectedTime}
                    onDateChange={state.setSelectedDate}
                    onTimeChange={state.setSelectedTime}
                    errors={errors.filter((e) => e.field === "date" || e.field === "time").map((e) => e.message)}
                  />
                </>
              )}

              {state.currentStep === 2 && (
                <ContactForm
                  contactInfo={state.contactInfo}
                  marketingConsent={state.marketingConsent}
                  onContactChange={state.setContactInfo}
                  onMarketingConsentChange={state.setMarketingConsent}
                  errors={errors}
                />
              )}
            </div>
          </div>

          <MobileStickyFooter
            ctaLabel={ctaLabel}
            onClick={handleNext}
            disabled={isSubmitting || nextDisabled}
            loading={isSubmitting}
            showBack={state.currentStep > 1}
            onBack={handleBack}
          />
        </div>
      )}
    </div>
  );
}
