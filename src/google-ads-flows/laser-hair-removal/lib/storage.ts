import type { AttributionData } from "../types/booking";

const STORAGE_KEY = "kami_laser_booking_state_v1";
// Bumped to 5: the funnel is now the fixed $149 Must-Have offer with two
// steps (1 = Appointment, 2 = Contact). Area / package selection is gone.
// A persisted currentStep or areas/package from any earlier schema must be
// discarded rather than resumed.
const SCHEMA_VERSION = 5;
const EXPIRATION_HOURS = 24;

interface PersistedState {
  schemaVersion: number;
  savedAt: string;
  currentStep: number;
  selectedDate: string | null;
  selectedTime: string | null;
  attribution: AttributionData;
  funnelStartedAt: string | null;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function isExpired(savedAt: string): boolean {
  const saved = new Date(savedAt).getTime();
  const now = Date.now();
  const expirationMs = EXPIRATION_HOURS * 60 * 60 * 1000;
  return now - saved > expirationMs;
}

/**
 * Save booking state to localStorage. Only non-sensitive scheduling data —
 * contact details are never persisted.
 */
export function saveBookingState(state: {
  currentStep: number;
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
 * Returns null if expired, corrupted, from an old schema, or unavailable.
 */
export function loadBookingState(): Omit<PersistedState, "schemaVersion" | "savedAt"> | null {
  if (!isBrowser()) return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PersistedState;

    if (parsed.schemaVersion !== SCHEMA_VERSION) {
      clearBookingState();
      return null;
    }

    if (isExpired(parsed.savedAt)) {
      clearBookingState();
      return null;
    }

    return {
      currentStep: parsed.currentStep || 1,
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
