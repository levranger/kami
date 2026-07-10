import type { TreatmentArea, PackageType, ContactInfo } from "../types/booking";
import { isValidUSPhone } from "./phone";

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email.trim().toLowerCase());
}

/**
 * Validate Step 1: Treatment area selection.
 */
export function validateAreas(selectedAreas: TreatmentArea[]): ValidationError[] {
  const errors: ValidationError[] = [];
  if (selectedAreas.length === 0) {
    errors.push({ field: "areas", message: "Please select at least one treatment area." });
  }
  return errors;
}

/**
 * Validate Step 2: Package selection.
 */
export function validatePackage(selectedPackage: PackageType | null): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!selectedPackage) {
    errors.push({ field: "package", message: "Please select a package option." });
  }
  return errors;
}

/**
 * Validate Step 3: Contact details.
 */
export function validateContact(contactInfo: ContactInfo): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!contactInfo.fullName.trim()) {
    errors.push({ field: "fullName", message: "Full name is required." });
  }

  if (!contactInfo.phone.trim()) {
    errors.push({ field: "phone", message: "Phone number is required." });
  } else if (!isValidUSPhone(contactInfo.phone)) {
    errors.push({ field: "phone", message: "Please enter a valid 10-digit US phone number." });
  }

  if (!contactInfo.email.trim()) {
    errors.push({ field: "email", message: "Email address is required." });
  } else if (!isValidEmail(contactInfo.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address." });
  }

  return errors;
}

/**
 * Validate Step 4: Date and time selection.
 */
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

/**
 * Validate Step 5: All prior data must still be valid.
 */
export function validateReview(
  selectedAreas: TreatmentArea[],
  selectedPackage: PackageType | null,
  contactInfo: ContactInfo,
  selectedDate: string | null,
  selectedTime: string | null
): ValidationError[] {
  return [
    ...validateAreas(selectedAreas),
    ...validatePackage(selectedPackage),
    ...validateContact(contactInfo),
    ...validateDateTime(selectedDate, selectedTime),
  ];
}