import { useState, useCallback, useEffect } from "react";
import type {
  BookingStep,
  BookingState,
  TreatmentGoal,
  ProductPreference,
  ContactInfo,
  AppointmentType,
  AttributionData,
} from "../types/booking";
import { calculateEstimateSummary } from "../lib/estimates";
import { saveState, loadState, clearState } from "../lib/storage";

const initialContact: ContactInfo = {
  fullName: "",
  phone: "",
  email: "",
  isNewPatient: true,
  hasSensitiveSkin: false,
};

function determineAppointmentType(concerns: string[]): AppointmentType {
  if (concerns.includes("not-sure")) return "consultation-and-treatment";
  if (concerns.includes("excessive-sweating")) return "consultation-and-treatment";
  return "consultation-and-treatment";
}

export function useBotoxBookingState(attribution: AttributionData) {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<TreatmentGoal | null>(null);
  const [selectedProductPreference, setSelectedProductPreference] = useState<ProductPreference>("no-preference");
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContact);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [estimateAcknowledged, setEstimateAcknowledged] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [bookingRequestId, setBookingRequestId] = useState<string | null>(null);

  const appointmentType = determineAppointmentType(selectedConcerns);

  const estimateSummary = calculateEstimateSummary(
    selectedConcerns,
    selectedGoal,
    selectedProductPreference,
    appointmentType,
    false
  );

  // Load persisted state on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      if (saved.currentStep) setCurrentStep(saved.currentStep as BookingStep);
      if (saved.selectedConcerns) setSelectedConcerns(saved.selectedConcerns);
      if (saved.selectedGoal) setSelectedGoal(saved.selectedGoal);
      if (saved.selectedProductPreference) setSelectedProductPreference(saved.selectedProductPreference);
      if (saved.selectedDate) setSelectedDate(saved.selectedDate);
      if (saved.selectedTime) setSelectedTime(saved.selectedTime);
    }
  }, []);

  // Save state on changes (non-sensitive only)
  useEffect(() => {
    saveState({
      currentStep,
      selectedConcerns,
      selectedGoal,
      selectedProductPreference,
      selectedDate,
      selectedTime,
      attribution,
      funnelStartedAt: attribution.funnelStartedAt || null,
    });
  }, [currentStep, selectedConcerns, selectedGoal, selectedProductPreference, selectedDate, selectedTime, attribution]);

  const goToStep = useCallback((step: BookingStep) => setCurrentStep(step), []);
  const nextStep = useCallback(() => setCurrentStep((s) => Math.min(s + 1, 6) as BookingStep), []);
  const previousStep = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 1) as BookingStep), []);

  const resetBooking = useCallback(() => {
    setCurrentStep(1);
    setSelectedConcerns([]);
    setSelectedGoal(null);
    setSelectedProductPreference("no-preference");
    setContactInfo(initialContact);
    setSelectedDate(null);
    setSelectedTime(null);
    setMarketingConsent(false);
    setEstimateAcknowledged(false);
    setLeadId(null);
    setBookingRequestId(null);
    clearState();
  }, []);

  const state: BookingState = {
    currentStep,
    selectedConcerns,
    selectedGoal,
    selectedProductPreference,
    contactInfo,
    appointmentType,
    selectedDate,
    selectedTime,
    marketingConsent,
    attribution,
    estimateSummary,
    estimateAcknowledged,
    leadId,
    bookingRequestId,
  };

  return {
    ...state,
    setSelectedConcerns,
    setSelectedGoal,
    setSelectedProductPreference,
    setContactInfo,
    setSelectedDate,
    setSelectedTime,
    setMarketingConsent,
    setEstimateAcknowledged,
    setLeadId,
    setBookingRequestId,
    goToStep,
    nextStep,
    previousStep,
    resetBooking,
  };
}