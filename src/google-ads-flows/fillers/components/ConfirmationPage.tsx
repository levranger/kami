"use client";

import { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import type { BookingState } from "../types/booking";
import { fillerTreatmentAreas } from "../lib/config";
import { formatCurrencyRange } from "../lib/estimates";
import { formatPhoneUS } from "../lib/phone";

interface ConfirmationPageProps {
  state: BookingState;
  bookingRequestId: string;
}

const prepGuideItems = [
  {
    heading: "Avoid blood thinners for 24–48 hours",
    body: "Stop aspirin, ibuprofen, fish oil, vitamin E, and alcohol for at least 24–48 hours before your appointment to reduce bruising.",
  },
  {
    heading: "Come with a clean face",
    body: "Arrive with no makeup, moisturizer, or skincare on the treatment areas. Clean skin is required for accurate placement.",
  },
  {
    heading: "Skip retinoids and actives for 3 days",
    body: "Discontinue retinol, AHAs, BHAs, and prescription topicals on the treatment areas 3 days before your appointment.",
  },
  {
    heading: "Avoid dental work the week before",
    body: "If you're having lip or facial filler, avoid dental procedures for at least one week prior — dental work can increase swelling risk.",
  },
  {
    heading: "Stay hydrated",
    body: "Well-hydrated skin responds better to filler. Drink plenty of water in the days leading up to your appointment.",
  },
  {
    heading: "Swelling is normal for 24–72 hours",
    body: "Some swelling, tenderness, and light bruising is expected. Final results are visible after 2 weeks once swelling fully resolves.",
  },
];

export function ConfirmationPage({ state, bookingRequestId }: ConfirmationPageProps) {
  const [showPrepGuide, setShowPrepGuide] = useState(false);

  const areaNames = state.selectedAreas
    .map((id) => fillerTreatmentAreas.find((a) => a.id === id)?.name)
    .filter(Boolean);

  const label = state.appointmentType
    .replace(/filler-/g, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <h2 className="mb-2 text-2xl font-bold text-slate-900">Appointment Request Received</h2>
      <p className="mb-6 text-sm text-slate-600">
        We'll contact you shortly to confirm your appointment and send a health screening form to complete before your visit.
      </p>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm">
        <div className="mb-3"><p className="text-xs font-medium uppercase text-slate-400">Request ID</p><p className="font-mono text-sm text-slate-700">{bookingRequestId}</p></div>
        <div className="mb-3"><p className="text-xs font-medium uppercase text-slate-400">Appointment Type</p><p className="text-sm text-slate-700">{label}</p></div>
        <div className="mb-3"><p className="text-xs font-medium uppercase text-slate-400">Treatment Areas</p><p className="text-sm text-slate-700">{areaNames.join(", ")}</p></div>
        <div className="mb-3">
          <p className="text-xs font-medium uppercase text-slate-400">Requested Date &amp; Time</p>
          <p className="text-sm text-slate-700">
            {state.selectedDate && new Date(state.selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            {" "}at {state.selectedTime} ET
          </p>
        </div>
        {state.estimateSummary?.estimatedPrice && (
          <div className="mb-3"><p className="text-xs font-medium uppercase text-slate-400">Estimated Price Range</p><p className="text-sm text-slate-700">{formatCurrencyRange(state.estimateSummary.estimatedPrice)}</p></div>
        )}
        <div><p className="text-xs font-medium uppercase text-slate-400">Contact Phone</p><p className="text-sm text-slate-700">{formatPhoneUS(state.contactInfo.phone)}</p></div>
      </div>

      <p className="mb-6 text-xs text-slate-400">
        Your appointment is not finalized until provider availability, clinical review, and any required deposit are confirmed.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setShowPrepGuide(true)}
          className="rounded-lg border border-slate-300 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Pre-Treatment Guide
        </button>
        <a
          href="https://maps.app.goo.gl/KVmjcmSCnA3Mpfqw8"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-slate-300 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Get Directions
        </a>
        <a
          href="tel:+19544697153"
          className="rounded-lg border border-slate-300 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Call the Clinic
        </a>
        <a
          href="/"
          className="rounded-lg border border-slate-300 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Return to Website
        </a>
      </div>

      {/* Prep Guide Modal */}
      {showPrepGuide && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4 pb-4 sm:pb-0"
          role="dialog"
          aria-modal="true"
          aria-label="Dermal Filler Pre-Treatment Guide"
          onClick={(e) => { if (e.target === e.currentTarget) setShowPrepGuide(false); }}
        >
          <div className="bg-white rounded-t-2xl sm:rounded-xl w-full max-w-lg max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="text-left">
                <h3 className="font-semibold text-lg text-slate-900">Pre-Treatment Guide</h3>
                <p className="text-xs text-slate-500 mt-0.5">Dermal Fillers</p>
              </div>
              <button
                onClick={() => setShowPrepGuide(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5 space-y-5">
              {prepGuideItems.map((item, idx) => (
                <div key={idx} className="text-left">
                  <p className="text-sm font-semibold text-slate-900 mb-1">{idx + 1}. {item.heading}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
              <div className="pt-2 pb-1 text-center">
                <p className="text-xs text-slate-400">Questions? Call or text us at{" "}
                  <a href="tel:+19544697153" className="text-rose-700 hover:underline">(954) 469-7153</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
