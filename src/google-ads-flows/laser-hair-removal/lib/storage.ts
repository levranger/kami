import type { TreatmentArea, PackageType, AttributionData } from "../types/booking";

const STORAGE_KEY = "kami_laser_booking_state_v1";
const SCHEMA_VERSION = 1;
const EXPIRATION_HOURS = 24;

interface PersistedState {
  schemaVersion: number;
  savedAt: string;
  currentStep: number;
  selectedAreas: TreatmentArea[];
  selectedPackage: PackageType | null;
  selectedDate: string | null;
  selectedTime: string | null;
  attribution: AttributionData;
  funnelStartedAt: string | null;
}

/**
 * Check if we're in a browser environment.
 */
function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/**
 * Check if persisted state has expired (24 hours).
 */
function isExpired(savedAt: string): boolean {
  const saved = new Date(savedAt).getTime();
  const now = Date.now();
  const expirationMs = EXPIRATION_HOURS * 60 * 60 * 1000;
  return now - saved > expirationMs;
}

/**
 * Save booking state to localStorage.
 * Only persists non-sensitive data.
 */
export function saveBookingState(state: {
  currentStep: number;
  selectedAreas: TreatmentArea[];
  selectedPackage: PackageType | null;
  selectedDate: string | null;
  selectedTime: string | null;
  attribution: AttributionData;
  funnelStartedAt: string | null;
}): void {
  if (!isBrowser()) return;

  try {
    const persisted: PersistedState = {
      schemaVersion: SCHEMA_VERSION,
      savedAt: new Date().toISOString(),
      currentStep: state.currentStep,
      selectedAreas: state.selectedAreas,
      selectedPackage: state.selectedPackage,
      selectedDate: state.selectedDate,
      selectedTime: state.selectedTime,
      attribution: state.attribution,
      funnelStartedAt: state.funnelStartedAt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  } catch {
    // Silently fail — localStorage may be full or unavailable
  }
}

/**
 * Load booking state from localStorage.
 * Returns null if expired, corrupted, or unavailable.
 */
export function loadBookingState(): Omit<PersistedState, "schemaVersion" | "savedAt"> | null {
  if (!isBrowser()) return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PersistedState;

    // Schema version check
    if (parsed.schemaVersion !== SCHEMA_VERSION) {
      clearBookingState();
      return null;
    }

    // Expiration check
    if (isExpired(parsed.savedAt)) {
      clearBookingState();
      return null;
    }

    // Validate basic structure
    if (!Array.isArray(parsed.selectedAreas)) {
      clearBookingState();
      return null;
    }

    return {
      currentStep: parsed.currentStep || 1,
      selectedAreas: parsed.selectedAreas,
      selectedPackage: parsed.selectedPackage,
      selectedDate: parsed.selectedDate,
      selectedTime: parsed.selectedTime,
      attribution: parsed.attribution || {},
      funnelStartedAt: parsed.funnelStartedAt,
    };
  } catch {
    clearBookingState();
    return null;
  }
}

/**
 * Clear all persisted booking state.
 */
export function clearBookingState(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}