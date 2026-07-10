import { useState, useCallback } from "react";
import type {
  BookingStep,
  BookingState,
  TreatmentGoal,
  ContactInfo,
  AppointmentType,
} from "../types/booking";
import { calculateEstimateSummary } from "../lib/estimates";
import { fillerTreatmentAreas } from "../lib/config";

const initialContact: ContactInfo = {
  fullName: "",
  phone: "",
  email: "",
  isNewPatient: true,
  hasSensitiveSkin: false,
};

function determineAppointmentType(areaIds: string[]): AppointmentType {
  if (areaIds.includes("correction-dissolution")) return "filler-correction-consultation";
  const areas = fillerTreatmentAreas.filter((a) => areaIds.includes(a.id));
  if (areas.some((a) => a.automatedEstimateDisabled)) return "filler-provider-review";
  if (areaIds.includes("not-sure")) return "filler-consultation-and-possible-treatment";
  if (areas.some((a) => a.consultationRequired)) return "filler-consultation-and-possible-treatment";
  return "filler-consultation-and-possible-treatment";
}

export function useFillerBookingState(attributionToken: string | null) {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<TreatmentGoal | null>(null);
  const [estimateAcknowledged, setEstimateAcknowledged] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContact);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [bookingRequestId, setBookingRequestId] = useState<string | null>(null);

  const appointmentType = determineAppointmentType(selectedAreas);
  const estimateSummary = calculateEstimateSummary(selectedAreas, selectedGoal, appointmentType);

  const goToStep = useCallback((step: BookingStep) => setCurrentStep(step), []);
  const nextStep = useCallback(() => setCurrentStep((s) => Math.min(s + 1, 6) as BookingStep), []);
  const previousStep = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 1) as BookingStep), []);

  const clearSensitiveState = useCallback(() => {
    setContactInfo(initialContact);
    setMarketingConsent(false);
  }, []);

  const resetBooking = useCallback(() => {
    setCurrentStep(1);
    setSelectedAreas([]);
    setSelectedGoal(null);
    setEstimateAcknowledged(false);
    setContactInfo(initialContact);
    setSelectedDate(null);
    setSelectedTime(null);
    setMarketingConsent(false);
    setBookingRequestId(null);
  }, []);

  const state: BookingState = {
    currentStep,
    selectedAreas,
    selectedGoal,
    estimateAcknowledged,
    contactInfo,
    appointmentType,
    selectedDate,
    selectedTime,
    marketingConsent,
    attributionToken,
    estimateSummary,
    bookingRequestId,
  };

  return {
    ...state,
    setSelectedAreas,
    setSelectedGoal,
    setEstimateAcknowledged,
    setContactInfo,
    setSelectedDate,
    setSelectedTime,
    setMarketingConsent,
    setBookingRequestId,
    goToStep,
    nextStep,
    previousStep,
    clearSensitiveState,
    resetBooking,
  };
}