import { useState, useEffect } from "react";
import { Calendar, Clock, AlertCircle, RefreshCw } from "lucide-react";
import type { AppointmentType, AvailableDate, AvailableTime } from "../types/booking";
import { mockAvailabilityProvider } from "../lib/mockAvailability";

interface DateTimeSelectorProps {
  appointmentType: AppointmentType;
  selectedDate: string | null;
  selectedTime: string | null;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onContinue: () => void;
  onBack: () => void;
  error?: string;
}

export function DateTimeSelector({
  appointmentType,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onContinue,
  onBack,
  error,
}: DateTimeSelectorProps) {
  const [dates, setDates] = useState<AvailableDate[]>([]);
  const [times, setTimes] = useState<AvailableTime[]>([]);
  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);

  useEffect(() => {
    loadDates();
  }, [appointmentType]);

  useEffect(() => {
    if (selectedDate) {
      loadTimes(selectedDate);
    }
  }, [selectedDate, appointmentType]);

  async function loadDates() {
    setLoadingDates(true);
    setDateError(null);
    try {
      const result = await mockAvailabilityProvider.getAvailableDates(appointmentType);
      setDates(result);
    } catch {
      setDateError("We couldn't load available dates. Please try again.");
    } finally {
      setLoadingDates(false);
    }
  }

  async function loadTimes(date: string) {
    setLoadingTimes(true);
    setTimeError(null);
    try {
      const result = await mockAvailabilityProvider.getAvailableTimes(date, appointmentType);
      setTimes(result);
    } catch {
      setTimeError("We couldn't load available times. Please try again.");
    } finally {
      setLoadingTimes(false);
    }
  }

  const appointmentLabel = appointmentType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Choose Date & Time</h2>
      <p className="mb-1 text-sm text-slate-600">
        Appointment type: <span className="font-medium">{appointmentLabel}</span>
      </p>
      <p className="mb-6 text-xs text-slate-400">All times shown in Eastern Time (ET)</p>

      {error && (
        <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Date Selection */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700">Select a Date</h3>
        </div>

        {loadingDates ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-5 w-5 animate-spin text-amber-600" />
            <span className="ml-2 text-sm text-slate-500">Loading dates...</span>
          </div>
        ) : dateError ? (
          <div className="rounded-lg bg-red-50 p-4 text-center">
            <AlertCircle className="mx-auto mb-2 h-5 w-5 text-red-500" />
            <p className="mb-2 text-sm text-red-700">{dateError}</p>
            <button onClick={loadDates} className="text-sm font-medium text-amber-700 hover:underline">
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {dates.slice(0, 16).map((d) => {
              const dateObj = new Date(d.date + "T12:00:00");
              const dayNum = dateObj.getDate();
              const month = dateObj.toLocaleDateString("en-US", { month: "short" });
              const dayName = d.dayOfWeek.slice(0, 3);
              const isSelected = selectedDate === d.date;

              return (
                <button
                  key={d.date}
                  onClick={() => d.available && onDateSelect(d.date)}
                  disabled={!d.available}
                  className={`flex min-h-[52px] flex-col items-center justify-center rounded-lg border-2 p-2 text-center transition ${
                    isSelected
                      ? "border-amber-600 bg-amber-50"
                      : d.available
                      ? "border-slate-200 hover:border-slate-300"
                      : "cursor-not-allowed border-slate-100 bg-slate-50 opacity-40"
                  }`}
                >
                  <span className="text-xs text-slate-500">{dayName}</span>
                  <span className="text-sm font-semibold text-slate-800">{dayNum}</span>
                  <span className="text-xs text-slate-400">{month}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Select a Time</h3>
          </div>

          {loadingTimes ? (
            <div className="flex items-center justify-center py-6">
              <RefreshCw className="h-5 w-5 animate-spin text-amber-600" />
              <span className="ml-2 text-sm text-slate-500">Loading times...</span>
            </div>
          ) : timeError ? (
            <div className="rounded-lg bg-red-50 p-4 text-center">
              <AlertCircle className="mx-auto mb-2 h-5 w-5 text-red-500" />
              <p className="mb-2 text-sm text-red-700">{timeError}</p>
              <button
                onClick={() => selectedDate && loadTimes(selectedDate)}
                className="text-sm font-medium text-amber-700 hover:underline"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {times.map((t) => {
                const isSelected = selectedTime === t.time;
                return (
                  <button
                    key={t.time}
                    onClick={() => t.available && onTimeSelect(t.time)}
                    disabled={!t.available}
                    className={`min-h-[44px] rounded-lg border-2 px-3 py-2 text-sm font-medium transition ${
                      isSelected
                        ? "border-amber-600 bg-amber-50 text-amber-800"
                        : t.available
                        ? "border-slate-200 text-slate-600 hover:border-slate-300"
                        : "cursor-not-allowed border-slate-100 text-slate-300"
                    }`}
                  >
                    {t.display}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {selectedDate && selectedTime && (
        <div className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          Selected: {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at{" "}
          {times.find((t) => t.time === selectedTime)?.display || selectedTime} ET
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 rounded-lg border border-slate-300 py-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!selectedDate || !selectedTime}
          className="flex-1 rounded-lg bg-amber-700 py-4 text-base font-semibold text-white shadow transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}