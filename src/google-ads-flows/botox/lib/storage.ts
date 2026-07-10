import type { AttributionData, ProductPreference, TreatmentGoal } from "../types/booking";

const STORAGE_KEY = "kami_botox_booking_state_v1";
const SCHEMA_VERSION = 1;
const EXPIRY_MS = 24 * 60 * 60 * 1000;

interface PersistedState {
  version: number;
  savedAt: number;
  currentStep: number;
  selectedConcerns: string[];
  selectedGoal: TreatmentGoal | null;
  selectedProductPreference: ProductPreference;
  selectedDate: string | null;
  selectedTime: string | null;
  attribution: AttributionData;
  funnelStartedAt: string | null;
}

export function saveState(state: Omit<PersistedState, "version" | "savedAt">): void {
  try {
    const data: PersistedState = {
      ...state,
      version: SCHEMA_VERSION,
      savedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage unavailable
  }
}

export function loadState(): Partial<PersistedState> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw) as PersistedState;

    if (data.version !== SCHEMA_VERSION) {
      clearState();
      return null;
    }

    if (Date.now() - data.savedAt > EXPIRY_MS) {
      clearState();
      return null;
    }

    return data;
  } catch {
    clearState();
    return null;
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable
  }
}