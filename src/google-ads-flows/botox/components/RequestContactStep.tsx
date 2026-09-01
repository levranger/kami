import type { RequestContact } from "../hooks/useBotoxRequestState";
import { formatPhoneUS, normalizePhone } from "../lib/phone";

interface RequestContactStepProps {
  contact: RequestContact;
  marketingConsent: boolean;
  onContactChange: (c: RequestContact) => void;
  onMarketingConsentChange: (v: boolean) => void;
  errors: string[];
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";

export function RequestContactStep({
  contact,
  marketingConsent,
  onContactChange,
  onMarketingConsentChange,
  errors,
}: RequestContactStepProps) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Your contact details</h2>
      <p className="mb-5 text-sm text-slate-600">
        We&apos;ll use your phone to confirm — most people hear back by text or call.
      </p>

      {errors.length > 0 && (
        <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3">
          {errors.map((e) => (
            <p key={e} className="text-sm text-red-700">
              {e}
            </p>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-slate-700">
              First name *
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              value={contact.firstName}
              onChange={(e) => onContactChange({ ...contact, firstName: e.target.value })}
              className={inputClass}
              placeholder="Jane"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-slate-700">
              Last name *
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              value={contact.lastName}
              onChange={(e) => onContactChange({ ...contact, lastName: e.target.value })}
              className={inputClass}
              placeholder="Smith"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
            Mobile phone *
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={formatPhoneUS(contact.phone)}
            onChange={(e) => onContactChange({ ...contact, phone: normalizePhone(e.target.value) })}
            className={inputClass}
            placeholder="(555) 555-5555"
          />
          <p className="mt-1 text-xs text-slate-400">We confirm most appointments by text or call.</p>
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email *
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={contact.email}
            onChange={(e) => onContactChange({ ...contact, email: e.target.value.trim() })}
            className={inputClass}
            placeholder="jane@example.com"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-2 pt-1">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => onMarketingConsentChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-xs text-slate-500">
            I agree to receive automated text messages from Kami Aesthetics about my request. Consent is not a
            condition of purchase. Message and data rates may apply. Reply STOP to opt out.
          </span>
        </label>
      </div>
    </div>
  );
}
