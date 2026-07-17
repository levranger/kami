"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useBookingState } from "./hooks/useBookingState";
import { useAttributionTracking } from "./hooks/useAttributionTracking";
import { laserAnalytics, STEP_VIEW_NAMES } from "./lib/analytics";
import { validateAreas, validatePackage, validateContact, validateDateTime, validateReview } from "./lib/validation";
import { savePartialLead, submitBookingRequest } from "./lib/bookingApi";
import { clearBookingState } from "./lib/storage";
import { formatCurrency } from "./lib/pricing";
import type { BookingStep, PackageType, EntryMode } from "./types/booking";
import type { ValidationError } from "./lib/validation";

import LandingHero from "./components/LandingHero";
import CompactTrustHeader from "./components/CompactTrustHeader";
import ProgressIndicator from "./components/ProgressIndicator";
import AreaSelector from "./components/AreaSelector";
import PackageSelector from "./components/PackageSelector";
import ContactForm from "./components/ContactForm";
import DateTimeSelector from "./components/DateTimeSelector";
import ReviewBooking from "./components/ReviewBooking";
import ConfirmationPage from "./components/ConfirmationPage";
import MobileStickyFooter from "./components/MobileStickyFooter";

import "./styles/booking.css";

interface LaserHairRemovalBookingFlowProps {
  // Set at the page level from the `?start=booking` query param, before the
  // client ever renders — this is what lets Step 1 be the first paint for
  // paid traffic with no hero flash. Defaults to "landing" for any other
  // consumer that doesn't pass it explicitly.
  initialEntryMode?: EntryMode;
}

export default function LaserHairRemovalBookingFlow({
  initialEntryMode = "landing",
}: LaserHairRemovalBookingFlowProps) {
  // Entry mode is fixed for the lifetime of this mount — it's derived once
  // from the URL at the page/server level, not re-derived on the client.
  const [entryMode] = useState<EntryMode>(initialEntryMode);
  const state = useBookingState();
  const [showFunnel, setShowFunnel] = useState(entryMode === "booking");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLeadSaving, setIsLeadSaving] = useState(false);
  const funnelRef = useRef<HTMLDivElement>(null);
  const lastViewedStepRef = useRef<string | null>(null);
  const hasFiredLandingViewRef = useRef(false);
  const hasAutoStartedRef = useRef(false);

  // Attribution tracking
  useAttributionTracking(state.attribution, state.setAttribution);

  // Fire laser_landing_view exactly once on mount — before the user can
  // click the CTA. Reads gclid/gbraid/wbraid straight from the URL instead
  // of state.attribution, since that's set asynchronously by the effect
  // above and wouldn't be populated yet on this same first render.
  useEffect(() => {
    if (hasFiredLandingViewRef.current) return;
    hasFiredLandingViewRef.current = true;
    const params = new URLSearchParams(window.location.search);
    laserAnalytics.trackLandingView({
      gclid: params.get("gclid") || undefined,
      gbraid: params.get("gbraid") || undefined,
      wbraid: params.get("wbraid") || undefined,
    });
  }, []);

  // For paid traffic entering directly at Step 1 (?start=booking), there's
  // no "Start Booking" click to fire laser_booking_flow_started from — so
  // fire it automatically, exactly once, right after the landing view.
  // Reads attribution straight from the URL for the same reason as the
  // landing-view effect above: state.attribution is set asynchronously by
  // useAttributionTracking's effect and isn't populated yet on this same
  // first render.
  useEffect(() => {
    if (entryMode !== "booking") return;
    if (hasAutoStartedRef.current) return;
    hasAutoStartedRef.current = true;
    const params = new URLSearchParams(window.location.search);
    laserAnalytics.trackFlowStarted(
      {
        gclid: params.get("gclid") || undefined,
        gbraid: params.get("gbraid") || undefined,
        wbraid: params.get("wbraid") || undefined,
      },
      entryMode
    );
  }, [entryMode]);

  // Fire laser_step_viewed once per distinct step (dedupes re-renders and
  // React 18 StrictMode's dev-only double effect invocation).
  useEffect(() => {
    if (!showFunnel) return;
    const stepNumber = state.bookingRequestId ? 6 : state.currentStep;
    const stepName = STEP_VIEW_NAMES[stepNumber];
    if (lastViewedStepRef.current === stepName) return;
    lastViewedStepRef.current = stepName;
    laserAnalytics.trackStepViewed(stepName, stepNumber, stepNumber === 1 ? entryMode : undefined);
  }, [showFunnel, state.currentStep, state.bookingRequestId, entryMode]);

  const handleStartBooking = useCallback(() => {
    setShowFunnel(true);
    laserAnalytics.trackFlowStarted(state.attribution, entryMode);
    setTimeout(() => {
      funnelRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [state.attribution, entryMode]);

  const handleNext = useCallback(async () => {
    setErrors([]);
    setSubmitError(null);

    // Validate current step
    let stepErrors: ValidationError[] = [];

    switch (state.currentStep) {
      case 1:
        stepErrors = validateAreas(state.selectedAreas);
        if (stepErrors.length === 0) {
          laserAnalytics.trackAreaSelected(state.selectedAreas.map((a) => a.id));
        }
        break;
      case 2:
        stepErrors = validatePackage(state.selectedPackage);
        if (stepErrors.length === 0) {
          laserAnalytics.trackPackageSelected(
            state.selectedPackage!,
            state.pricingSummary.sessionCount,
            state.pricingSummary.packageTotal
          );
        }
        break;
      case 3:
        stepErrors = validateContact(state.contactInfo);
        if (stepErrors.length === 0) {
          laserAnalytics.trackContactInfoEntered(
            state.contactInfo.isNewPatient,
            state.screeningFlags.sensitiveSkin || state.screeningFlags.recentlyTanned
          );

          // Save partial lead
          setIsLeadSaving(true);
          try {
            const result = await savePartialLead({
              fullName: state.contactInfo.fullName,
              phone: state.contactInfo.phone,
              email: state.contactInfo.email.trim().toLowerCase(),
              isNewPatient: state.contactInfo.isNewPatient,
              selectedAreas: state.selectedAreas.map((a) => a.id),
              selectedPackage: state.selectedPackage!,
              attribution: state.attribution,
            });
            state.setLeadId(result.leadId);
          } catch {
            // Non-blocking — show recoverable error but allow proceeding
            console.warn("Lead capture failed — non-blocking");
          } finally {
            setIsLeadSaving(false);
          }
        }
        break;
      case 4:
        stepErrors = validateDateTime(state.selectedDate, state.selectedTime);
        if (stepErrors.length === 0) {
          laserAnalytics.trackDateTimeSelected(state.selectedDate!, state.selectedTime!);
        }
        break;
      case 5:
        stepErrors = validateReview(
          state.selectedAreas,
          state.selectedPackage,
          state.contactInfo,
          state.selectedDate,
          state.selectedTime
        );
        if (stepErrors.length === 0) {
          // Submit booking
          await handleSubmit();
          return;
        }
        break;
    }

    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }

    state.nextStep();
    window.scrollTo({ top: funnelRef.current?.offsetTop || 0, behavior: "smooth" });
  }, [state]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitBookingRequest({
        selectedAreas: state.selectedAreas,
        selectedPackage: state.selectedPackage!,
        contactInfo: {
          ...state.contactInfo,
          email: state.contactInfo.email.trim().toLowerCase(),
        },
        screeningFlags: state.screeningFlags,
        marketingConsent: state.marketingConsent,
        selectedDate: state.selectedDate!,
        selectedTime: state.selectedTime!,
        pricingSummary: state.pricingSummary,
        attribution: state.attribution,
      });

      state.setBookingRequestId(result.bookingRequestId);
      clearBookingState();

      laserAnalytics.trackBookingCompleted({
        packageType: state.selectedPackage!,
        sessions: state.pricingSummary.sessionCount,
        packageTotal: state.pricingSummary.packageTotal,
        areaIds: state.selectedAreas.map((a) => a.id),
        isNewPatient: state.contactInfo.isNewPatient,
      });
    } catch {
      setSubmitError("We couldn't submit your request. Your selections are still saved. Please try again.");
      laserAnalytics.trackBookingError("submission_failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = useCallback(() => {
    setErrors([]);
    state.previousStep();
  }, [state]);

  const handleEdit = useCallback((step: BookingStep) => {
    setErrors([]);
    state.goToStep(step);
  }, [state]);

  const handleReturnHome = () => {
    window.location.href = "/";
  };

  // If booking is complete, show confirmation
  if (state.bookingRequestId) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <ConfirmationPage
            bookingRequestId={state.bookingRequestId}
            selectedAreas={state.selectedAreas}
            selectedPackage={state.selectedPackage!}
            selectedDate={state.selectedDate!}
            selectedTime={state.selectedTime!}
            contactPhone={state.contactInfo.phone}
            pricingSummary={state.pricingSummary}
            onReturnHome={handleReturnHome}
          />
        </div>
      </div>
    );
  }

  // CTA labels for sticky footer
  const getCtaLabel = (): string => {
    switch (state.currentStep) {
      case 1: return "Continue";
      case 2: return "Continue";
      case 3: return "Continue";
      case 4: return "Continue";
      case 5: return "Request Appointment";
    }
  };

  const getPriceLabel = (): string | undefined => {
    if (state.selectedAreas.length === 0) return undefined;
    if (state.currentStep <= 2 && !state.selectedPackage) {
      return `${formatCurrency(state.pricingSummary.baseSessionPrice)}/session`;
    }
    if (state.selectedPackage) {
      return `${formatCurrency(state.pricingSummary.discountedSessionPrice)}/session`;
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Landing Hero — only for normal/direct traffic that hasn't started the funnel yet */}
      {!showFunnel && <LandingHero onStartBooking={handleStartBooking} />}

      {/* Funnel */}
      {showFunnel && (
        <div ref={funnelRef} className="pb-24">
          <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Compact reassurance header — replaces the large hero for paid
                traffic entering directly at Step 1, so the area selector
                stays near the top of the viewport. */}
            {entryMode === "booking" && <CompactTrustHeader />}

            {/* Progress */}
            <div className="mb-8">
              <ProgressIndicator currentStep={state.currentStep} />
            </div>

            {/* Submit error */}
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

            {/* Step Content */}
            <div className="step-enter step-enter-active">
              {state.currentStep === 1 && (
                <AreaSelector
                  selectedAreas={state.selectedAreas}
                  onAreasChange={state.setSelectedAreas}
                  errors={errors.filter((e) => e.field === "areas").map((e) => e.message)}
                  title={entryMode === "booking" ? "How much does laser hair removal cost?" : undefined}
                  description={
                    entryMode === "booking"
                      ? "Select the areas you would like treated to see your package options and pricing."
                      : undefined
                  }
                />
              )}

              {state.currentStep === 2 && (
                <PackageSelector
                  selectedAreas={state.selectedAreas}
                  selectedPackage={state.selectedPackage}
                  onPackageChange={(pkg: PackageType) => state.setSelectedPackage(pkg)}
                  errors={errors.filter((e) => e.field === "package").map((e) => e.message)}
                />
              )}

              {state.currentStep === 3 && (
                <ContactForm
                  contactInfo={state.contactInfo}
                  screeningFlags={state.screeningFlags}
                  marketingConsent={state.marketingConsent}
                  onContactChange={state.setContactInfo}
                  onScreeningChange={state.setScreeningFlags}
                  onMarketingConsentChange={state.setMarketingConsent}
                  errors={errors}
                />
              )}

              {state.currentStep === 4 && (
                <DateTimeSelector
                  selectedDate={state.selectedDate}
                  selectedTime={state.selectedTime}
                  onDateChange={state.setSelectedDate}
                  onTimeChange={state.setSelectedTime}
                  errors={errors.filter((e) => e.field === "date" || e.field === "time").map((e) => e.message)}
                />
              )}

              {state.currentStep === 5 && state.selectedPackage && state.selectedDate && state.selectedTime && (
                <ReviewBooking
                  selectedAreas={state.selectedAreas}
                  selectedPackage={state.selectedPackage}
                  contactInfo={state.contactInfo}
                  screeningFlags={state.screeningFlags}
                  marketingConsent={state.marketingConsent}
                  selectedDate={state.selectedDate}
                  selectedTime={state.selectedTime}
                  pricingSummary={state.pricingSummary}
                  onEdit={handleEdit}
                />
              )}
            </div>
          </div>

          {/* Sticky Footer */}
          <MobileStickyFooter
            ctaLabel={getCtaLabel()}
            priceLabel={getPriceLabel()}
            onClick={handleNext}
            disabled={isSubmitting || isLeadSaving}
            loading={isSubmitting || isLeadSaving}
            showBack={state.currentStep > 1}
            onBack={handleBack}
          />
        </div>
      )}
    </div>
  );
}