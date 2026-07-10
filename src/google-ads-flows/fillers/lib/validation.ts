import type { BookingStep, ContactInfo, TreatmentGoal } from "../types/booking";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateStep(step: BookingStep, state: {
  selectedAreas: string[];
  selectedGoal: TreatmentGoal | null;
  estimateAcknowledged: boolean;
  contactInfo: ContactInfo;
  selectedDate: string | null;
  selectedTime: string | null;
}): ValidationResult {
  switch (step) {
    case 1: return validateAreas(state.selectedAreas);
    case 2: return validateGoal(state.selectedGoal);
    case 3: return validateEstimate(state.estimateAcknowledged);
    case 4: return validateContact(state.contactInfo);
    case 5: return validateDateTime(state.selectedDate, state.selectedTime);
    case 6: return { valid: true, errors: [] };
    default: return { valid: false, errors: ["Unknown step"] };
  }
}

function validateAreas(areas: string[]): ValidationResult {
  if (areas.length === 0) {
    return { valid: false, errors: ["Please select at least one treatment area."] };
  }
  return { valid: true, errors: [] };
}

function validateGoal(goal: TreatmentGoal | null): ValidationResult {
  if (!goal) {
    return { valid: false, errors: ["Please select your desired result."] };
  }
  return { valid: true, errors: [] };
}

function validateEstimate(acknowledged: boolean): ValidationResult {
  if (!acknowledged) {
    return { valid: false, errors: ["Please acknowledge that this is a preliminary estimate."] };
  }
  return { valid: true, errors: [] };
}

function validateContact(contact: ContactInfo): ValidationResult {
  const errors: string[] = [];
  if (!contact.fullName.trim()) errors.push("Full name is required.");
  const digits = contact.phone.replace(/\D/g, "");
  if (digits.length !== 10) errors.push("Please enter a valid 10-digit US phone number.");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contact.email.trim().toLowerCase())) errors.push("Please enter a valid email address.");
  return { valid: errors.length === 0, errors };
}

function validateDateTime(date: string | null, time: string | null): ValidationResult {
  const errors: string[] = [];
  if (!date) errors.push("Please select a date.");
  if (!time) errors.push("Please select a time.");
  return { valid: errors.length === 0, errors };
}