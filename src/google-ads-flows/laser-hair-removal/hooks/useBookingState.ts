import { useState, useCallback, useEffect, useRef } from "react";
import type {
  BookingStep,
  TreatmentArea,
  PackageType,
  ContactInfo,
  ScreeningFlags,
  AttributionData,
  PricingSummary,
} from "../types/booking";
import { calculatePricingSummary } from "../lib/pricing";
import { saveBookingState, loadBookingState, clearBookingState } from "../lib/storage";

export interface BookingState {
  currentStep: BookingStep;
  selectedAreas: TreatmentArea[];
  selectedPackage: PackageType | null;
  selectedDate: string | null;
  selectedTime: string | null;
  contactInfo: ContactInfo;
  screeningFlags: ScreeningFlags;
  marketingConsent: boolean;
  attribution: AttributionData;
  leadId: string | null;
  bookingRequestId: string | null;
  pricingSummary: PricingSummary;
  funnelStartedAt: string | null;

  setSelectedAreas: (areas: TreatmentArea[]) => void;
  setSelectedPackage: (pkg: PackageType) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setContactInfo: (info: ContactInfo) => void;
  setScreeningFlags: (flags: ScreeningFlags) => void;
  setMarketingConsent: (consent: boolean) => void;
  setAttribution: (data: AttributionData) => void;
  setLeadId: (id: string) => void;
  setBookingRequestId: (id: string) => void;

  goToStep: (step: BookingStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetBooking: () => void;
}

const defaultContactInfo: ContactInfo = {
  fullName: "",
  phone: "",
  email: "",
  isNewPatient: false,
};

const defaultScreeningFlags: ScreeningFlags = {
  sensitiveSkin: false,
  recentlyTanned: false,
};

const defaultAttribution: AttributionData = {};

export function useBookingState(): BookingState {
  const initialized = useRef(false);

  // Load persisted state on mount
  const persisted = !initialized.current ? loadBookingState() : null;

  const [currentStep, setCurrentStep] = useState<BookingStep>(
    (persisted?.currentStep as BookingStep) || 1
  );
  const [selectedAreas, setSelectedAreas] = useState<TreatmentArea[]>(
    persisted?.selectedAreas || []
  );
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(
    persisted?.selectedPackage || null
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(
    persisted?.selectedDate || null
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    persisted?.selectedTime || null
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [screeningFlags, setScreeningFlags] = useState<ScreeningFlags>(defaultScreeningFlags);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [attribution, setAttribution] = useState<AttributionData>(
    persisted?.attribution || defaultAttribution
  );
  const [leadId, setLeadId] = useState<string | null>(null);
  const [bookingRequestId, setBookingRequestId] = useState<string | null>(null);
  const [funnelStartedAt] = useState<string | null>(
    persisted?.funnelStartedAt || null
  );

  initialized.current = true;

  // Calculate pricing summary reactively
  const pricingSummary = calculatePricingSummary(selectedAreas, selectedPackage);

  // Persist non-sensitive state on changes
  useEffect(() => {
    saveBookingState({
      currentStep,
      selectedAreas,
      selectedPackage,
      selectedDate,
      selectedTime,
      attribution,
      funnelStartedAt,
    });
  }, [currentStep, selectedAreas, selectedPackage, selectedDate, selectedTime, attribution, funnelStartedAt]);

  const goToStep = useCallback((step: BookingStep) => {
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      return (next <= 5 ? next : prev) as BookingStep;
    });
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev - 1;
      return (next >= 1 ? next : prev) as BookingStep;
    });
  }, []);

  const resetBooking = useCallback(() => {
    setCurrentStep(1);
    setSelectedAreas([]);
    setSelectedPackage(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setContactInfo(defaultContactInfo);
    setScreeningFlags(defaultScreeningFlags);
    setMarketingConsent(false);
    setLeadId(null);
    setBookingRequestId(null);
    clearBookingState();
  }, []);

  return {
    currentStep,
    selectedAreas,
    selectedPackage,
    selectedDate,
    selectedTime,
    contactInfo,
    screeningFlags,
    marketingConsent,
    attribution,
    leadId,
    bookingRequestId,
    pricingSummary,
    funnelStartedAt,

    setSelectedAreas,
    setSelectedPackage,
    setSelectedDate,
    setSelectedTime,
    setContactInfo,
    setScreeningFlags,
    setMarketingConsent,
    setAttribution,
    setLeadId,
    setBookingRequestId,

    goToStep,
    nextStep,
    previousStep,
    resetBooking,
  };
}