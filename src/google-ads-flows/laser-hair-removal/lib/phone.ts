/**
 * Strip all non-digit characters from a phone string.
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Format a US phone number as (XXX) XXX-XXXX.
 * Accepts partial input and formats progressively.
 */
export function formatPhoneUS(value: string): string {
  const digits = normalizePhone(value);

  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Validate that a phone number has exactly 10 US digits.
 */
export function isValidUSPhone(phone: string): boolean {
  const digits = normalizePhone(phone);
  return digits.length === 10;
}