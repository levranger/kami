import { useRef, useState } from "react";
import { useAttributionTracking } from "./hooks/useAttributionTracking";
import { useBotoxBookingState } from "./hooks/useBotoxBookingState";
import { validateStep } from "./lib/validation";
import { trackFlowStarted, trackConcernSelected, trackGoalSelected } from "./lib/analytics";
import { getBookingApi } from "./lib/bookingApi";
import { clearState } from "./lib/storage";
import { LandingHero } from "./components/LandingHero";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { ConcernSelector } from "./components/ConcernSelector";
import { TreatmentGoalSelector } from "./components/TreatmentGoalSelector";
import { EstimateCalculator } from "./components/EstimateCalculator";
import { ContactForm } from "./components/ContactForm";
import { DateTimeSelector } from "./components/DateTimeSelector";
import { ReviewBooking } from "./components/ReviewBooking";
import { ConfirmationPage } from "./components/ConfirmationPage";
import { BeforeAfterGallery } from "./components/BeforeAfterGallery";
import { TrustSection } from "./components/TrustSection";
import { MobileStickyFooter } from "./components/MobileStickyFooter";
import { PriceSummary } from "./components/PriceSummary";
import { formatEstimateRange } from "./lib/estimates";
import type { BookingStep } from "./types/booking";

export function BotoxBookingFlow() {
  const attribution = useAttributionTracking();
  const booking = useBotoxBookingState(attribution);
  const [showFunnel, setShowFunnel] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [finalBookingId, setFinalBookingId] = useState<string | null>(null);
  const funnelRef = useRef<HTMLDivElement>(null);

  function startFunnel() {
    setShowFunnel(true);
    trackFlowStarted(attribution);
    setTimeout(() => {
      funnelRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleStepValidation(step: BookingStep): boolean {
    const result = validateStep(step, {
      selectedConcerns: booking.selectedConcerns,
      selectedGoal: booking.selectedGoal,
      estimateAcknowledged: booking.estimateAcknowledged,
      contactInfo: booking.contactInfo,
      selectedDate: booking.selectedDate,
      selectedTime: booking.selectedTime,
    });
    setErrors(result.errors);
    return result.valid;
  }

  function handleNext() {
    if (handleStepValidation(booking.currentStep)) {
      setErrors([]);
      booking.nextStep();
    }
  }

  function handleGoToStep(step: BookingStep) {
    setErrors([]);
    booking.goToStep(step);
  }

  async function handleContactContinue() {
    if (!handleStepValidation(4)) return;
    setErrors([]);

    // Partial lead capture
    try {
      const api = getBookingApi();
      const result = await api.submitPartialLead({
        contactInfo: booking.contactInfo,
        concerns: booking.selectedConcerns,
        goal: booking.selectedGoal,
        attribution: booking.attribution,
      });
      booking.setLeadId(result.leadId);
    } catch {
      // Don't block funnel on partial lead failure
    }

    booking.nextStep();
  }

  function handleComplete(bookingRequestId: string) {
    setFinalBookingId(bookingRequestId);
    setCompleted(true);
    clearState();
  }

  const estimateText = booking.estimateSummary?.estimatedPrice
    ? `Est. ${formatEstimateRange(booking.estimateSummary.estimatedPrice, "$")}`
    : undefined;

  if (completed && finalBookingId) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-[840px] px-4 py-8">
          <ConfirmationPage state={booking} bookingRequestId={finalBookingId} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Landing Hero */}
      <LandingHero onGetEstimate={startFunnel} />

      {/* Before/After Gallery */}
      <BeforeAfterGallery />

      {/* Trust Section */}
      <TrustSection />

      {/* Funnel */}
      {showFunnel && (
        <div ref={funnelRef} className="mx-auto max-w-[840px] px-4 py-8">
          <ProgressIndicator currentStep={booking.currentStep} />

          {/* Price Summary (visible after step 3) */}
          {booking.currentStep > 3 && <div className="mb-4"><PriceSummary summary={booking.estimateSummary} /></div>}

          {/* Step 1: Concerns */}
          {booking.currentStep === 1 && (
            <ConcernSelector
              selectedConcerns={booking.selectedConcerns}
              onSelect={(c) => {
                booking.setSelectedConcerns(c);
                trackConcernSelected(c);
              }}
              onContinue={handleNext}
              error={errors[0]}
            />
          )}

          {/* Step 2: Goal */}
          {booking.currentStep === 2 && (
            <TreatmentGoalSelector
              selectedGoal={booking.selectedGoal}
              onSelect={(g) => {
                booking.setSelectedGoal(g);
                trackGoalSelected(g);
              }}
              onContinue={handleNext}
              onBack={booking.previousStep}
              error={errors[0]}
            />
          )}

          {/* Step 3: Estimate */}
          {booking.currentStep === 3 && booking.estimateSummary && (
            <EstimateCalculator
              estimateSummary={booking.estimateSummary}
              selectedConcerns={booking.selectedConcerns}
              selectedGoal={booking.selectedGoal}
              productPreference={booking.selectedProductPreference}
              estimateAcknowledged={booking.estimateAcknowledged}
              onProductChange={booking.setSelectedProductPreference}
              onAcknowledge={booking.setEstimateAcknowledged}
              onContinue={handleNext}
              onBack={booking.previousStep}
              onEditConcerns={() => handleGoToStep(1)}
              onEditGoal={() => handleGoToStep(2)}
              error={errors[0]}
            />
          )}

          {/* Step 4: Contact */}
          {booking.currentStep === 4 && (
            <ContactForm
              contactInfo={booking.contactInfo}
              marketingConsent={booking.marketingConsent}
              onContactChange={booking.setContactInfo}
              onMarketingConsentChange={booking.setMarketingConsent}
              onContinue={handleContactContinue}
              onBack={booking.previousStep}
              errors={errors}
            />
          )}

          {/* Step 5: Date & Time */}
          {booking.currentStep === 5 && (
            <DateTimeSelector
              appointmentType={booking.appointmentType}
              selectedDate={booking.selectedDate}
              selectedTime={booking.selectedTime}
              onDateSelect={booking.setSelectedDate}
              onTimeSelect={booking.setSelectedTime}
              onContinue={handleNext}
              onBack={booking.previousStep}
              error={errors[0]}
            />
          )}

          {/* Step 6: Review */}
          {booking.currentStep === 6 && (
            <ReviewBooking
              state={booking}
              onBack={booking.previousStep}
              onEditConcerns={() => handleGoToStep(1)}
              onEditGoal={() => handleGoToStep(2)}
              onEditEstimate={() => handleGoToStep(3)}
              onEditContact={() => handleGoToStep(4)}
              onEditAppointment={() => handleGoToStep(5)}
              onComplete={handleComplete}
            />
          )}
        </div>
      )}

      {/* Mobile Sticky Footer */}
      <MobileStickyFooter show={showFunnel && booking.currentStep >= 3} estimateText={estimateText} />
    </div>
  );
}