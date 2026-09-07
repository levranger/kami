import { useState, useCallback, useEffect, useRef } from "react";
import type { BookingStep, ContactInfo, AttributionData } from "../types/booking";
import { saveBookingState, loadBookingState, clearBookingState } from "../lib/storage";

export interface BookingState {
  currentStep: BookingStep;
  selectedDate: string | null;
  selectedTime: string | null;
  contactInfo: ContactInfo;
  marketingConsent: boolean;
  attribution: AttributionData;
  bookingRequestId: string | null;
  funnelStartedAt: string | null;

  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setContactInfo: (info: ContactInfo) => void;
  setMarketingConsent: (consent: boolean) => void;
  setAttribution: (data: AttributionData) => void;
  setBookingRequestId: (id: string) => void;

  nextStep: () => void;
  previousStep: () => void;
  resetBooking: () => void;
}

const defaultContactInfo: ContactInfo = {
  fullName: "",
  phone: "",
  email: "",
};

const defaultAttribution: AttributionData = {};

export function useBookingState(): BookingState {
  const initialized = useRef(false);

  // Load persisted state on mount
  const persisted = !initialized.current ? loadBookingState() : null;

  const [currentStep, setCurrentStep] = useState<BookingStep>(
    // Clamp a persisted step into the current 1–2 range.
    (Math.min(Math.max(Number(persisted?.currentStep) || 1, 1), 2) as BookingStep)
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(
    persisted?.selectedDate || null
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    persisted?.selectedTime || null
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [attribution, setAttribution] = useState<AttributionData>(
    persisted?.attribution || defaultAttribution
  );
  const [bookingRequestId, setBookingRequestId] = useState<string | null>(null);
  const [funnelStartedAt] = useState<string | null>(
    persisted?.funnelStartedAt || null
  );

  initialized.current = true;

  // Persist non-sensitive scheduling state on changes
  useEffect(() => {
    saveBookingState({
      currentStep,
      selectedDate,
      selectedTime,
      attribution,
      funnelStartedAt,
    });
  }, [currentStep, selectedDate, selectedTime, attribution, funnelStartedAt]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev < 2 ? ((prev + 1) as BookingStep) : prev));
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as BookingStep) : prev));
  }, []);

  const resetBooking = useCallback(() => {
    setCurrentStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setContactInfo(defaultContactInfo);
    setMarketingConsent(false);
    setBookingRequestId(null);
    clearBookingState();
  }, []);

  return {
    currentStep,
    selectedDate,
    selectedTime,
    contactInfo,
    marketingConsent,
    attribution,
    bookingRequestId,
    funnelStartedAt,

    setSelectedDate,
    setSelectedTime,
    setContactInfo,
    setMarketingConsent,
    setAttribution,
    setBookingRequestId,

    nextStep,
    previousStep,
    resetBooking,
  };
}
