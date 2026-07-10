import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import type { AvailableDate, AvailableTime } from "../types/booking";
import { availabilityProvider } from "../lib/mockAvailability";

interface DateTimeSelectorProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onDateChange: (date: string | null) => void;
  onTimeChange: (time: string | null) => void;
  errors: string[];
}

export default function DateTimeSelector({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  errors,
}: DateTimeSelectorProps) {
  const [dates, setDates] = useState<AvailableDate[]>([]);
  const [times, setTimes] = useState<AvailableTime[]>([]);
  const [datesLoading, setDatesLoading] = useState(true);
  const [timesLoading, setTimesLoading] = useState(false);
  const [datesError, setDatesError] = useState<string | null>(null);
  const [timesError, setTimesError] = useState<string | null>(null);

  // Load available dates
  useEffect(() => {
    loadDates();
  }, []);

  // Load times when date changes
  useEffect(() => {
    if (selectedDate) {
      loadTimes(selectedDate);
    } else {
      setTimes([]);
    }
  }, [selectedDate]);

  async function loadDates() {
    setDatesLoading(true);
    setDatesError(null);
    try {
      const result = await availabilityProvider.getAvailableDates();
      setDates(result);
    } catch {
      setDatesError("We couldn't load available dates. Please try again.");
    } finally {
      setDatesLoading(false);
    }
  }

  async function loadTimes(date: string) {
    setTimesLoading(true);
    setTimesError(null);
    try {
      const result = await availabilityProvider.getAvailableTimes(date);
      setTimes(result);
      // If previously selected time is no longer available, clear it
      if (selectedTime && !result.find((t) => t.time === selectedTime && t.available)) {
        onTimeChange(null);
      }
    } catch {
      setTimesError("We couldn't load available times. Please try again.");
    } finally {
      setTimesLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">
        Choose Date &amp; Time
      </h2>
      <p className="font-inter text-sm text-warm-gray mb-1">
        Select your preferred appointment slot.
      </p>
      <p className="font-inter text-xs text-warm-gray mb-6">
        All times shown in Eastern Time (ET)
      </p>

      {/* Errors */}
      {errors.length > 0 && (
        <div role="alert" aria-live="assertive" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm">
          <p className="font-inter text-sm text-red-600">{errors[0]}</p>
        </div>
      )}

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="font-inter text-sm font-semibold text-[#1A1A1A] mb-3">
          Select a Date
        </h3>

        {datesLoading && (
          <div className="flex items-center justify-center py-8" aria-live="polite">
            <span className="inline-block w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" aria-hidden="true" />
            <span className="font-inter text-sm text-warm-gray ml-3">Loading dates...</span>
          </div>
        )}

        {datesError && (
          <div className="text-center py-6">
            <p className="font-inter text-sm text-red-600 mb-3">{datesError}</p>
            <button
              onClick={loadDates}
              className="inline-flex items-center gap-2 font-inter text-sm text-gold hover:text-gold-dark transition-colors"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {!datesLoading && !datesError && dates.length === 0 && (
          <div className="text-center py-6" aria-live="polite">
            <p className="font-inter text-sm text-warm-gray">
              No available dates found. Please try again later.
            </p>
          </div>
        )}

        {!datesLoading && !datesError && dates.length > 0 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2" role="listbox" aria-label="Available dates">
            {dates.slice(0, 21).map((date) => (
              <button
                key={date.date}
                onClick={() => {
                  onDateChange(date.date);
                  onTimeChange(null);
                }}
                disabled={!date.available}
                role="option"
                aria-selected={selectedDate === date.date}
                aria-label={`${date.dayOfWeek} ${date.displayDate}${!date.available ? " (unavailable)" : ""}`}
                className={`flex flex-col items-center p-2.5 rounded-sm border transition-all min-h-[52px] ${
                  selectedDate === date.date
                    ? "border-gold bg-gold/10 text-gold"
                    : date.available
                    ? "border-gray-200 hover:border-gray-300 text-[#1A1A1A]"
                    : "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                }`}
              >
                <span className="font-inter text-[10px] uppercase tracking-wider">
                  {date.dayOfWeek}
                </span>
                <span className="font-inter text-xs font-medium mt-0.5">
                  {date.displayDate}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="font-inter text-sm font-semibold text-[#1A1A1A] mb-3">
            Select a Time
          </h3>

          {timesLoading && (
            <div className="flex items-center justify-center py-6" aria-live="polite">
              <span className="inline-block w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" aria-hidden="true" />
              <span className="font-inter text-sm text-warm-gray ml-3">Loading times...</span>
            </div>
          )}

          {timesError && (
            <div className="text-center py-6">
              <p className="font-inter text-sm text-red-600 mb-3">{timesError}</p>
              <button
                onClick={() => loadTimes(selectedDate)}
                className="inline-flex items-center gap-2 font-inter text-sm text-gold hover:text-gold-dark transition-colors"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Try again
              </button>
            </div>
          )}

          {!timesLoading && !timesError && times.length === 0 && (
            <div className="text-center py-6" aria-live="polite">
              <p className="font-inter text-sm text-warm-gray">
                No available times for this date. Please select another date.
              </p>
            </div>
          )}

          {!timesLoading && !timesError && times.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" role="listbox" aria-label="Available times">
              {times.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => onTimeChange(slot.time)}
                  disabled={!slot.available}
                  role="option"
                  aria-selected={selectedTime === slot.time}
                  aria-label={`${slot.displayTime}${!slot.available ? " (unavailable)" : ""}`}
                  className={`font-inter text-sm py-3 px-2 rounded-sm border transition-all min-h-[44px] ${
                    selectedTime === slot.time
                      ? "border-gold bg-gold/10 text-gold font-medium"
                      : slot.available
                      ? "border-gray-200 hover:border-gray-300 text-[#1A1A1A]"
                      : "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                  }`}
                >
                  {slot.displayTime}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {selectedDate && selectedTime && (
        <div className="mt-6 p-4 bg-gold/5 border border-gold/20 rounded-sm" aria-live="polite">
          <p className="font-inter text-sm text-[#1A1A1A]">
            <span className="font-medium">Selected:</span>{" "}
            {dates.find((d) => d.date === selectedDate)?.displayDate},{" "}
            {dates.find((d) => d.date === selectedDate)?.dayOfWeek} at{" "}
            {times.find((t) => t.time === selectedTime)?.displayTime} ET
          </p>
        </div>
      )}
    </div>
  );
}