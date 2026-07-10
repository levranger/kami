import { CheckCircle } from "lucide-react";
import type { BookingState } from "../types/booking";
import { fillerTreatmentAreas } from "../lib/config";
import { formatCurrencyRange } from "../lib/estimates";
import { formatPhoneUS } from "../lib/phone";

interface ConfirmationPageProps {
  state: BookingState;
  bookingRequestId: string;
}

export function ConfirmationPage({ state, bookingRequestId }: ConfirmationPageProps) {
  const areaNames = state.selectedAreas.map((id) => fillerTreatmentAreas.find((a) => a.id === id)?.name).filter(Boolean);
  const label = state.appointmentType.replace(/filler-/g, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center"><CheckCircle className="h-16 w-16 text-green-500" /></div>
      <h2 className="mb-2 text-2xl font-bold text-slate-900">Appointment Request Received</h2>
      <p className="mb-6 text-sm text-slate-600">We'll contact you shortly to confirm your appointment and send a health screening form to complete before your visit.</p>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm">
        <div className="mb-3"><p className="text-xs font-medium uppercase text-slate-400">Request ID</p><p className="font-mono text-sm text-slate-700">{bookingRequestId}</p></div>
        <div className="mb-3"><p className="text-xs font-medium uppercase text-slate-400">Appointment Type</p><p className="text-sm text-slate-700">{label}</p></div>
        <div className="mb-3"><p className="text-xs font-medium uppercase text-slate-400">Treatment Areas</p><p className="text-sm text-slate-700">{areaNames.join(", ")}</p></div>
        <div className="mb-3"><p className="text-xs font-medium uppercase text-slate-400">Requested Date & Time</p><p className="text-sm text-slate-700">{state.selectedDate && new Date(state.selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {state.selectedTime} ET</p></div>
        {state.estimateSummary?.estimatedPrice && <div className="mb-3"><p className="text-xs font-medium uppercase text-slate-400">Estimated Price Range</p><p className="text-sm text-slate-700">{formatCurrencyRange(state.estimateSummary.estimatedPrice)}</p></div>}
        <div><p className="text-xs font-medium uppercase text-slate-400">Contact Phone</p><p className="text-sm text-slate-700">{formatPhoneUS(state.contactInfo.phone)}</p></div>
      </div>

      <p className="mb-6 text-xs text-slate-400">Your appointment is not finalized until provider availability, clinical review, and any required deposit are confirmed.</p>

      <div className="grid grid-cols-2 gap-3">
        <a href="#" className="rounded-lg border border-slate-300 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50">Pre-Treatment Guide</a>
        <a href="#" className="rounded-lg border border-slate-300 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50">Get Directions</a>
        <a href="tel:+13055551234" className="rounded-lg border border-slate-300 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50">Call the Clinic</a>
        <a href="/" className="rounded-lg border border-slate-300 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50">Return to Website</a>
      </div>
    </div>
  );
}