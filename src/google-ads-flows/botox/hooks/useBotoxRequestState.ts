import { useCallback, useEffect, useRef, useState } from "react";

export type RequestStep = 1 | 2;

export interface RequestContact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const emptyContact: RequestContact = { firstName: "", lastName: "", phone: "", email: "" };

const STORAGE_KEY = "kami_botox_request_v1";
const EXPIRY_MS = 24 * 60 * 60 * 1000;

interface Persisted {
  savedAt: number;
  currentStep: RequestStep;
  preferredDate: string | null;
  preferredTime: string | null;
}

function loadPersisted(): Partial<Persisted> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Persisted;
    if (Date.now() - data.savedAt > EXPIRY_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Short-flow state for the Botox appointment request. Contact details are held
 * in memory only; the non-sensitive step/date/time are persisted so a refresh
 * mid-flow doesn't lose progress (same approach as the LHR flow).
 */
export function useBotoxRequestState() {
  const initialized = useRef(false);
  const persisted = !initialized.current ? loadPersisted() : null;
  initialized.current = true;

  const [currentStep, setCurrentStep] = useState<RequestStep>(
    // Clamp to a valid step — guards against a persisted value from an older
    // flow version (e.g. a 3-step layout) that no longer exists.
    Math.min(Math.max(Number(persisted?.currentStep) || 1, 1), 2) as RequestStep,
  );
  const [preferredDate, setPreferredDate] = useState<string | null>(persisted?.preferredDate ?? null);
  const [preferredTime, setPreferredTime] = useState<string | null>(persisted?.preferredTime ?? null);
  const [contact, setContact] = useState<RequestContact>(emptyContact);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ savedAt: Date.now(), currentStep, preferredDate, preferredTime }),
      );
    } catch {
      /* storage unavailable */
    }
  }, [currentStep, preferredDate, preferredTime]);

  const nextStep = useCallback(() => setCurrentStep((s) => Math.min(s + 1, 2) as RequestStep), []);
  const previousStep = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 1) as RequestStep), []);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setPreferredDate(null);
    setPreferredTime(null);
    setContact(emptyContact);
    setMarketingConsent(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);

  return {
    currentStep,
    preferredDate,
    preferredTime,
    contact,
    marketingConsent,
    setPreferredDate,
    setPreferredTime,
    setContact,
    setMarketingConsent,
    nextStep,
    previousStep,
    reset,
  };
}
