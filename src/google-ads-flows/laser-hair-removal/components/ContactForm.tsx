import { useState } from "react";
import type { ContactInfo, ScreeningFlags } from "../types/booking";
import { formatPhoneUS, normalizePhone } from "../lib/phone";
import type { ValidationError } from "../lib/validation";

interface ContactFormProps {
  contactInfo: ContactInfo;
  screeningFlags: ScreeningFlags;
  marketingConsent: boolean;
  onContactChange: (info: ContactInfo) => void;
  onScreeningChange: (flags: ScreeningFlags) => void;
  onMarketingConsentChange: (consent: boolean) => void;
  errors: ValidationError[];
}

export default function ContactForm({
  contactInfo,
  screeningFlags,
  marketingConsent,
  onContactChange,
  onScreeningChange,
  onMarketingConsentChange,
  errors,
}: ContactFormProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const getError = (field: string) => {
    if (!touched[field] && errors.length === 0) return null;
    return errors.find((e) => e.field === field)?.message || null;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const showScreeningWarning = screeningFlags.sensitiveSkin || screeningFlags.recentlyTanned;

  return (
    <div>
      <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">
        Your Contact Details
      </h2>
      <p className="font-inter text-sm text-warm-gray mb-6">
        We&apos;ll use this to confirm your appointment.
      </p>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block font-inter text-sm font-medium text-[#1A1A1A] mb-1.5">
            Full Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            value={contactInfo.fullName}
            onChange={(e) => onContactChange({ ...contactInfo, fullName: e.target.value })}
            onBlur={() => handleBlur("fullName")}
            aria-required="true"
            aria-invalid={!!getError("fullName")}
            aria-describedby={getError("fullName") ? "fullName-error" : undefined}
            className={`w-full px-4 py-3 rounded-sm border font-inter text-sm transition-colors min-h-[48px] ${
              getError("fullName") ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-gold"
            } outline-none focus-visible:ring-2 focus-visible:ring-gold/50`}
            placeholder="Jane Smith"
          />
          {getError("fullName") && (
            <p id="fullName-error" className="font-inter text-xs text-red-500 mt-1" role="alert">
              {getError("fullName")}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-inter text-sm font-medium text-[#1A1A1A] mb-1.5">
            Mobile Phone <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            value={formatPhoneUS(contactInfo.phone)}
            onChange={(e) => {
              const digits = normalizePhone(e.target.value);
              onContactChange({ ...contactInfo, phone: digits });
            }}
            onBlur={() => handleBlur("phone")}
            aria-required="true"
            aria-invalid={!!getError("phone")}
            aria-describedby={getError("phone") ? "phone-error" : undefined}
            className={`w-full px-4 py-3 rounded-sm border font-inter text-sm transition-colors min-h-[48px] ${
              getError("phone") ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-gold"
            } outline-none focus-visible:ring-2 focus-visible:ring-gold/50`}
            placeholder="(555) 555-5555"
          />
          {getError("phone") && (
            <p id="phone-error" className="font-inter text-xs text-red-500 mt-1" role="alert">
              {getError("phone")}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-inter text-sm font-medium text-[#1A1A1A] mb-1.5">
            Email Address <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={contactInfo.email}
            onChange={(e) => onContactChange({ ...contactInfo, email: e.target.value.trim() })}
            onBlur={() => handleBlur("email")}
            aria-required="true"
            aria-invalid={!!getError("email")}
            aria-describedby={getError("email") ? "email-error" : undefined}
            className={`w-full px-4 py-3 rounded-sm border font-inter text-sm transition-colors min-h-[48px] ${
              getError("email") ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-gold"
            } outline-none focus-visible:ring-2 focus-visible:ring-gold/50`}
            placeholder="jane@example.com"
          />
          {getError("email") && (
            <p id="email-error" className="font-inter text-xs text-red-500 mt-1" role="alert">
              {getError("email")}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-2" />

        {/* Optional: New Patient */}
        <label className="flex items-center gap-3 cursor-pointer min-h-[48px]">
          <input
            type="checkbox"
            checked={contactInfo.isNewPatient}
            onChange={(e) => onContactChange({ ...contactInfo, isNewPatient: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold"
          />
          <span className="font-inter text-sm text-[#1A1A1A]">I&apos;m a new patient</span>
        </label>

        {/* Optional: Screening */}
        <div className="space-y-3">
          <p className="font-inter text-xs font-medium text-warm-gray uppercase tracking-wider">
            Optional — helps us prepare
          </p>
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={screeningFlags.sensitiveSkin}
              onChange={(e) => onScreeningChange({ ...screeningFlags, sensitiveSkin: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold"
            />
            <span className="font-inter text-sm text-[#1A1A1A]">I have sensitive skin</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={screeningFlags.recentlyTanned}
              onChange={(e) => onScreeningChange({ ...screeningFlags, recentlyTanned: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold"
            />
            <span className="font-inter text-sm text-[#1A1A1A]">I&apos;ve had significant sun exposure recently</span>
          </label>
        </div>

        {/* Screening warning */}
        {showScreeningWarning && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm" role="alert">
            <p className="font-inter text-sm text-amber-700">
              A consultation or test spot may be required before treatment.
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-100 my-2" />

        {/* SMS Marketing Consent */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => onMarketingConsentChange(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold mt-0.5 flex-shrink-0"
          />
          <span className="font-inter text-xs text-warm-gray leading-relaxed">
            I agree to receive occasional automated promotional text messages from Kami Aesthetics.
            Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to unsubscribe.
            {" "}
            <a href="#" className="text-gold underline">Privacy Policy</a>
            {" · "}
            <a href="#" className="text-gold underline">Terms</a>
            {" · "}
            <a href="#" className="text-gold underline">SMS Terms</a>
          </span>
        </label>
      </div>
    </div>
  );
}