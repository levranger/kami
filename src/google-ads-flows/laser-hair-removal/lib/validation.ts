import type { ContactInfo } from "../types/booking";
import { isValidUSPhone } from "./phone";

export interface ValidationError {
  field: string;
  message: string;
}

/** Validate email format. */
export function isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email.trim().toLowerCase());
}

/**
 * Contact step. Full name and mobile phone are required; email is optional
 * and only validated for format when the visitor chooses to provide it.
 */
export function validateContact(contactInfo: ContactInfo): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!contactInfo.fullName.trim()) {
    errors.push({ field: "fullName", message: "Full name is required." });
  }

  if (!contactInfo.phone.trim()) {
    errors.push({ field: "phone", message: "Mobile phone is required." });
  } else if (!isValidUSPhone(contactInfo.phone)) {
    errors.push({ field: "phone", message: "Please enter a valid 10-digit US phone number." });
  }

  if (contactInfo.email.trim() && !isValidEmail(contactInfo.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address, or leave it blank." });
  }

  return errors;
}

/** Appointment step. Both a date and a time slot must be chosen. */
export function validateDateTime(
  selectedDate: string | null,
  selectedTime: string | null
): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!selectedDate) {
    errors.push({ field: "date", message: "Please select an appointment date." });
  }
  if (!selectedTime) {
    errors.push({ field: "time", message: "Please select an appointment time." });
  }
  return errors;
}
