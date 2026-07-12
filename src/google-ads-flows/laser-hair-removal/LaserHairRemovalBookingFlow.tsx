import { useState, useCallback, useRef } from "react";
import { useBookingState } from "./hooks/useBookingState";
import { useAttributionTracking } from "./hooks/useAttributionTracking";
import { laserAnalytics } from "./lib/analytics";
import { validateAreas, validatePackage, validateContact, validateDateTime, validateReview } from "./lib/validation";
import { savePartialLead, submitBookingRequest } from "./lib/bookingApi";
import { clearBookingState } from "./lib/storage";
import { formatCurrency } from "./lib/pricing";
import type { BookingStep, PackageType } from "./types/booking";
import type { ValidationError } from "./lib/validation";

import LandingHero from "./components/LandingHero";
import ProgressIndicator from "./components/ProgressIndicator";
import AreaSelector from "./components/AreaSelector";
import PackageSelector from "./components/PackageSelector";
import ContactForm from "./components/ContactForm";
import DateTimeSelector from "./components/DateTimeSelector";
import ReviewBooking from "./components/ReviewBooking";
import ConfirmationPage from "./components/ConfirmationPage";
import MobileStickyFooter from "./components/MobileStickyFooter";

import "./styles/booking.css";

export default function LaserHairRemovalBookingFlow() {
  const state = useBookingState();
  const [showFunnel, setShowFunnel] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLeadSaving, setIsLeadSaving] = useState(false);
  const funnelRef = useRef<HTMLDivElement>(null);

  // Attribution tracking
  useAttributionTracking(state.attribution, state.setAttribution);

  const handleStartBooking = useCallback(() => {
    setShowFunnel(true);
    laserAnalytics.trackFlowStarted(state.attribution);
    setTimeout(() => {
      funnelRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [state.attribution]);

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
        packageTotal: state.pricingSummary.packageTotal,
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
      {/* Landing Hero */}
      {!showFunnel && <LandingHero onStartBooking={handleStartBooking} />}

      {/* Funnel */}
      {showFunnel && (
        <div ref={funnelRef} className="pb-24">
          <div className="max-w-2xl mx-auto px-4 py-8">
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