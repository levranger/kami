import { useState } from "react";
import type { BookingState } from "../types/booking";
import { concerns, formatEstimateRange, getProductLabel } from "../lib/estimates";
import { formatPhoneUS } from "../lib/phone";
import { getBookingApi } from "../lib/bookingApi";
import { botoxAnalytics } from "../lib/analytics";

interface ReviewBookingProps {
  state: BookingState;
  onBack: () => void;
  onEditConcerns: () => void;
  onEditGoal: () => void;
  onEditEstimate: () => void;
  onEditContact: () => void;
  onEditAppointment: () => void;
  onComplete: (bookingRequestId: string) => void;
}

export function ReviewBooking({
  state,
  onBack,
  onEditConcerns,
  onEditGoal,
  onEditEstimate,
  onEditContact,
  onEditAppointment,
  onComplete,
}: ReviewBookingProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const concernNames = state.selectedConcerns
    .map((id) => concerns.find((c) => c.id === id)?.name)
    .filter(Boolean);

  async function handleSubmit() {
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const api = getBookingApi();

      // Revalidate slot
      const slotCheck = await api.revalidateSlot(
        state.selectedDate!,
        state.selectedTime!,
        state.appointmentType
      );

      if (!slotCheck.available) {
        setError("That time is no longer available. Please choose another.");
        setSubmitting(false);
        return;
      }

      // Submit booking request
      const result = await api.submitBookingRequest({
        contactInfo: state.contactInfo,
        concerns: state.selectedConcerns,
        goal: state.selectedGoal,
        productPreference: state.selectedProductPreference,
        appointmentType: state.appointmentType,
        selectedDate: state.selectedDate!,
        selectedTime: state.selectedTime!,
        marketingConsent: state.marketingConsent,
        attribution: state.attribution,
        estimateSummary: state.estimateSummary,
      });

      botoxAnalytics.trackBookingCompleted({
        appointmentType: state.appointmentType,
        depositAmount: state.estimateSummary?.depositAmount ?? 0,
      });
      onComplete(result.bookingRequestId);
    } catch (err) {
      const message = err instanceof Error ? err.message : "We couldn't submit your request. Your selections are still saved.";
      setError(message);
      botoxAnalytics.trackBookingError(message);
    } finally {
      setSubmitting(false);
    }
  }

  const appointmentLabel = state.appointmentType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Review Your Request</h2>
      <p className="mb-6 text-sm text-slate-600">Please review your details before submitting.</p>

      {error && (
        <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 space-y-4">
        {/* Appointment Type */}
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs font-medium uppercase text-slate-400">Appointment Type</p>
          <p className="text-sm font-medium text-slate-800">{appointmentLabel}</p>
        </div>

        {/* Concerns */}
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">Treatment Concerns</p>
              <p className="text-sm text-slate-700">{concernNames.join(", ")}</p>
            </div>
            <button onClick={onEditConcerns} className="text-xs font-medium text-amber-700 hover:underline">Edit</button>
          </div>
        </div>

        {/* Goal */}
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">Treatment Goal</p>
              <p className="text-sm capitalize text-slate-700">{state.selectedGoal?.replace(/-/g, " ")}</p>
            </div>
            <button onClick={onEditGoal} className="text-xs font-medium text-amber-700 hover:underline">Edit</button>
          </div>
        </div>

        {/* Estimate */}
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">Estimate</p>
              <p className="text-sm text-slate-700">
                {formatEstimateRange(state.estimateSummary?.estimatedUnits ?? null)} units · {formatEstimateRange(state.estimateSummary?.estimatedPrice ?? null, "$")}
              </p>
              <p className="text-xs text-slate-500">Product: {getProductLabel(state.selectedProductPreference)}</p>
            </div>
            <button onClick={onEditEstimate} className="text-xs font-medium text-amber-700 hover:underline">Edit</button>
          </div>
        </div>

        {/* Date/Time */}
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">Requested Appointment</p>
              <p className="text-sm text-slate-700">
                {state.selectedDate && new Date(state.selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                {" "}at {state.selectedTime} ET
              </p>
            </div>
            <button onClick={onEditAppointment} className="text-xs font-medium text-amber-700 hover:underline">Edit</button>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">Contact</p>
              <p className="text-sm text-slate-700">{state.contactInfo.fullName}</p>
              <p className="text-xs text-slate-500">{formatPhoneUS(state.contactInfo.phone)} · {state.contactInfo.email}</p>
              <p className="text-xs text-slate-500">
                {state.contactInfo.isNewPatient ? "New patient" : "Returning patient"}
                {state.contactInfo.hasSensitiveSkin ? " · Sensitive skin" : ""}
              </p>
            </div>
            <button onClick={onEditContact} className="text-xs font-medium text-amber-700 hover:underline">Edit</button>
          </div>
        </div>

        {/* Marketing */}
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs font-medium uppercase text-slate-400">Marketing SMS</p>
          <p className="text-sm text-slate-700">{state.marketingConsent ? "Opted in" : "Not opted in"}</p>
        </div>


      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 rounded-lg border border-slate-300 py-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-1 rounded-lg bg-amber-700 py-4 text-base font-semibold text-white shadow transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Request Appointment"}
        </button>
      </div>
    </div>
  );
}