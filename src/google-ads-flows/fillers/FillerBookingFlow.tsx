import { useRef, useState } from "react";
import { useAttributionToken } from "./hooks/useAttributionToken";
import { useFillerBookingState } from "./hooks/useFillerBookingState";
import { validateStep } from "./lib/validation";
import { getBookingApi } from "./lib/bookingApi";
import { formatCurrencyRange } from "./lib/estimates";
import { LandingHero } from "./components/LandingHero";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { TreatmentAreaSelector } from "./components/TreatmentAreaSelector";
import { TreatmentGoalSelector } from "./components/TreatmentGoalSelector";
import { EstimateSummaryComponent } from "./components/EstimateSummary";
import { ContactForm } from "./components/ContactForm";
import { DateTimeSelector } from "./components/DateTimeSelector";
import { ReviewBooking } from "./components/ReviewBooking";
import { ConfirmationPage } from "./components/ConfirmationPage";
import { BeforeAfterGallery } from "./components/BeforeAfterGallery";
import { TrustSection } from "./components/TrustSection";
import { MobileStickyFooter } from "./components/MobileStickyFooter";
import { PrivacyNotice } from "./components/PrivacyNotice";
import type { BookingStep } from "./types/booking";

export function FillerBookingFlow() {
  const attributionToken = useAttributionToken();
  const booking = useFillerBookingState(attributionToken);
  const [showFunnel, setShowFunnel] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [finalId, setFinalId] = useState<string | null>(null);
  const funnelRef = useRef<HTMLDivElement>(null);

  function startFunnel() {
    setShowFunnel(true);
    setTimeout(() => funnelRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  function validate(step: BookingStep): boolean {
    const result = validateStep(step, {
      selectedAreas: booking.selectedAreas,
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
    if (validate(booking.currentStep)) { setErrors([]); booking.nextStep(); }
  }

  function goTo(step: BookingStep) { setErrors([]); booking.goToStep(step); }

  async function handleContactContinue() {
    if (!validate(4)) return;
    setErrors([]);
    try {
      const api = getBookingApi();
      await api.submitPartialLead({ contactInfo: booking.contactInfo, areas: booking.selectedAreas, goal: booking.selectedGoal, attributionToken: booking.attributionToken });
    } catch { /* Don't block */ }
    booking.nextStep();
  }

  function handleComplete(id: string) {
    setFinalId(id);
    setCompleted(true);
    booking.clearSensitiveState();
  }

  const estimateText = booking.estimateSummary?.estimatedPrice ? `Est. ${formatCurrencyRange(booking.estimateSummary.estimatedPrice)}` : undefined;

  if (completed && finalId) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-[840px] px-4 py-8"><ConfirmationPage state={booking} bookingRequestId={finalId} /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <LandingHero onGetEstimate={startFunnel} />
      <BeforeAfterGallery />
      <TrustSection />
      <PrivacyNotice />

      {showFunnel && (
        <div ref={funnelRef} className="mx-auto max-w-[840px] px-4 py-8">
          <ProgressIndicator currentStep={booking.currentStep} />

          {booking.currentStep === 1 && (
            <TreatmentAreaSelector selectedAreas={booking.selectedAreas} onSelect={booking.setSelectedAreas} onContinue={handleNext} error={errors[0]} />
          )}

          {booking.currentStep === 2 && (
            <TreatmentGoalSelector selectedGoal={booking.selectedGoal} onSelect={booking.setSelectedGoal} onContinue={handleNext} onBack={booking.previousStep} error={errors[0]} />
          )}

          {booking.currentStep === 3 && booking.estimateSummary && (
            <EstimateSummaryComponent
              summary={booking.estimateSummary}
              selectedAreas={booking.selectedAreas}
              selectedGoal={booking.selectedGoal}
              estimateAcknowledged={booking.estimateAcknowledged}
              onAcknowledge={booking.setEstimateAcknowledged}
              onContinue={handleNext}
              onBack={booking.previousStep}
              onEditAreas={() => goTo(1)}
              onEditGoal={() => goTo(2)}
              error={errors[0]}
            />
          )}

          {booking.currentStep === 4 && (
            <ContactForm contactInfo={booking.contactInfo} marketingConsent={booking.marketingConsent} onContactChange={booking.setContactInfo} onMarketingConsentChange={booking.setMarketingConsent} onContinue={handleContactContinue} onBack={booking.previousStep} errors={errors} />
          )}

          {booking.currentStep === 5 && (
            <DateTimeSelector appointmentType={booking.appointmentType} selectedDate={booking.selectedDate} selectedTime={booking.selectedTime} onDateSelect={booking.setSelectedDate} onTimeSelect={booking.setSelectedTime} onContinue={handleNext} onBack={booking.previousStep} error={errors[0]} />
          )}

          {booking.currentStep === 6 && (
            <ReviewBooking state={booking} onBack={booking.previousStep} onEditAreas={() => goTo(1)} onEditGoal={() => goTo(2)} onEditEstimate={() => goTo(3)} onEditContact={() => goTo(4)} onEditAppointment={() => goTo(5)} onComplete={handleComplete} />
          )}
        </div>
      )}

      <MobileStickyFooter show={showFunnel && booking.currentStep >= 3} estimateText={estimateText} />
    </div>
  );
}