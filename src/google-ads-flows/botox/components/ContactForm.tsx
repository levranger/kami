import type { ContactInfo } from "../types/booking";
import { formatPhoneUS, normalizePhone } from "../lib/phone";

interface ContactFormProps {
  contactInfo: ContactInfo;
  marketingConsent: boolean;
  onContactChange: (info: ContactInfo) => void;
  onMarketingConsentChange: (val: boolean) => void;
  onContinue: () => void;
  onBack: () => void;
  errors: string[];
}

export function ContactForm({
  contactInfo,
  marketingConsent,
  onContactChange,
  onMarketingConsentChange,
  onContinue,
  onBack,
  errors,
}: ContactFormProps) {
  function handlePhoneChange(value: string) {
    const normalized = normalizePhone(value);
    onContactChange({ ...contactInfo, phone: normalized });
  }

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Your Details</h2>
      <p className="mb-6 text-sm text-slate-600">We need a few details to complete your request.</p>

      {errors.length > 0 && (
        <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3">
          {errors.map((err, i) => (
            <p key={i} className="text-sm text-red-700">{err}</p>
          ))}
        </div>
      )}

      {/* Contact Fields */}
      <div className="mb-6 space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-slate-700">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            value={contactInfo.fullName}
            onChange={(e) => onContactChange({ ...contactInfo, fullName: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
            Mobile Phone *
          </label>
          <input
            id="phone"
            type="tel"
            value={formatPhoneUS(contactInfo.phone)}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="(555) 555-5555"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => onContactChange({ ...contactInfo, email: e.target.value.trim() })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="jane@example.com"
          />
        </div>

        {/* Minimal optional questions */}
        <div className="space-y-3 pt-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={contactInfo.isNewPatient}
              onChange={(e) => onContactChange({ ...contactInfo, isNewPatient: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-slate-600">I'm a new patient</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={contactInfo.hasSensitiveSkin}
              onChange={(e) => onContactChange({ ...contactInfo, hasSensitiveSkin: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-slate-600">I have sensitive skin</span>
          </label>
        </div>

        <p className="text-xs text-slate-400 italic">
          You'll complete a full health screening at your appointment.
        </p>
      </div>

      {/* SMS Consent */}
      <div className="mb-6">
        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => onMarketingConsentChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-xs text-slate-500">
            I agree to receive occasional automated promotional text messages from Kami Aesthetics. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to unsubscribe.
          </span>
        </label>
        <p className="mt-1 text-xs text-slate-400">
          <a href="#" className="underline">Privacy Policy</a> · <a href="#" className="underline">Terms</a> · <a href="#" className="underline">SMS Terms</a>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 rounded-lg border border-slate-300 py-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="flex-1 rounded-lg bg-amber-700 py-4 text-base font-semibold text-white shadow transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}