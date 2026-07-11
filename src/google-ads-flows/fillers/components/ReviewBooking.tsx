import { useState } from "react";
import type { BookingState } from "../types/booking";
import { fillerTreatmentAreas } from "../lib/config";
import { formatSyringeRange, formatCurrencyRange } from "../lib/estimates";
import { formatPhoneUS } from "../lib/phone";
import { getBookingApi } from "../lib/bookingApi";
import { mockAvailabilityProvider } from "../lib/availability";

interface ReviewBookingProps {
  state: BookingState;
  onBack: () => void;
  onEditAreas: () => void;
  onEditGoal: () => void;
  onEditEstimate: () => void;
  onEditContact: () => void;
  onEditAppointment: () => void;
  onComplete: (id: string) => void;
}

export function ReviewBooking({ state, onBack, onEditAreas, onEditGoal, onEditEstimate, onEditContact, onEditAppointment, onComplete }: ReviewBookingProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const areaNames = state.selectedAreas.map((id) => fillerTreatmentAreas.find((a) => a.id === id)?.name).filter(Boolean);
  const label = state.appointmentType.replace(/filler-/g, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  async function handleSubmit() {
    if (submitting) return;
    setSubmitting(true); setError(null);
    try {
      const slotCheck = await mockAvailabilityProvider.revalidateSlot(state.selectedDate!, state.selectedTime!, state.appointmentType);
      if (!slotCheck.available) { setError("That time is no longer available. Please choose another."); setSubmitting(false); return; }

      const api = getBookingApi();
      const result = await api.submitBookingRequest({
        contactInfo: state.contactInfo,
        areas: state.selectedAreas,
        goal: state.selectedGoal,
        appointmentType: state.appointmentType,
        selectedDate: state.selectedDate!,
        selectedTime: state.selectedTime!,
        marketingConsent: state.marketingConsent,
        attributionToken: state.attributionToken,
        estimateSummary: state.estimateSummary,
      });
      onComplete(result.bookingRequestId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't submit your request. Please try again.");
    } finally { setSubmitting(false); }
  }

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Review Your Request</h2>
      <p className="mb-6 text-sm text-slate-600">Please review before submitting.</p>

      {error && <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="mb-6 space-y-4">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs font-medium uppercase text-slate-400">Appointment Type</p>
          <p className="text-sm font-medium text-slate-800">{label}</p>
        </div>

        <div className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start justify-between">
            <div><p className="text-xs font-medium uppercase text-slate-400">Treatment Areas</p><p className="text-sm text-slate-700">{areaNames.join(", ")}</p></div>
            <button onClick={onEditAreas} className="text-xs font-medium text-rose-700 hover:underline">Edit</button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start justify-between">
            <div><p className="text-xs font-medium uppercase text-slate-400">Desired Result</p><p className="text-sm capitalize text-slate-700">{state.selectedGoal?.replace(/-/g, " ")}</p></div>
            <button onClick={onEditGoal} className="text-xs font-medium text-rose-700 hover:underline">Edit</button>
          </div>
        </div>

        {state.estimateSummary && !state.estimateSummary.automatedEstimateDisabled && (
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase text-slate-400">Estimate</p>
                <p className="text-sm text-slate-700">{formatSyringeRange(state.estimateSummary.estimatedSyringes)} · {formatCurrencyRange(state.estimateSummary.estimatedPrice)}</p>
              </div>
              <button onClick={onEditEstimate} className="text-xs font-medium text-rose-700 hover:underline">Edit</button>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">Requested Appointment</p>
              <p className="text-sm text-slate-700">{state.selectedDate && new Date(state.selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {state.selectedTime} ET</p>
            </div>
            <button onClick={onEditAppointment} className="text-xs font-medium text-rose-700 hover:underline">Edit</button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">Contact</p>
              <p className="text-sm text-slate-700">{state.contactInfo.fullName}</p>
              <p className="text-xs text-slate-500">{formatPhoneUS(state.contactInfo.phone)} · {state.contactInfo.email}</p>
              <p className="text-xs text-slate-500">{state.contactInfo.isNewPatient ? "New patient" : "Returning patient"}{state.contactInfo.hasSensitiveSkin ? " · Sensitive skin" : ""}</p>
            </div>
            <button onClick={onEditContact} className="text-xs font-medium text-rose-700 hover:underline">Edit</button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs font-medium uppercase text-slate-400">Marketing SMS</p>
          <p className="text-sm text-slate-700">{state.marketingConsent ? "Opted in" : "Not opted in"}</p>
        </div>


      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 rounded-lg border border-slate-300 py-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50">Back</button>
        <button onClick={handleSubmit} disabled={submitting} className="flex-1 rounded-lg bg-rose-700 py-4 text-base font-semibold text-white shadow transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Submitting..." : "Request Appointment"}</button>
      </div>
    </div>
  );
}