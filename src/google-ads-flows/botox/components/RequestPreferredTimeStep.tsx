import { useMemo } from "react";
import { Calendar, Clock, Info } from "lucide-react";
import { PREFERRED_TIME_WINDOWS } from "../lib/botoxOffer";

interface RequestPreferredTimeStepProps {
  preferredDate: string | null;
  preferredTime: string | null;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  errors: string[];
}

interface DayOption {
  date: string; // YYYY-MM-DD
  dayName: string;
  dayNum: number;
  month: string;
}

/** Next ~4 weeks of dates, Sundays excluded (clinic closed Sundays). */
function buildDates(): DayOption[] {
  const out: DayOption[] = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  for (let i = 1; out.length < 18 && i <= 40; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) continue; // Sunday
    out.push({
      date: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    });
  }
  return out;
}

export function RequestPreferredTimeStep({
  preferredDate,
  preferredTime,
  onDateChange,
  onTimeChange,
  errors,
}: RequestPreferredTimeStepProps) {
  const dates = useMemo(buildDates, []);

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">When would you like to come in?</h2>
      <p className="mb-4 text-sm text-slate-600">
        Tell us your preferred day and time window. We&apos;ll confirm the exact appointment with you.
      </p>

      <div className="mb-5 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>This is a request, not a confirmed appointment. Our team will contact you to lock in a time.</span>
      </div>

      {errors.length > 0 && (
        <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {errors.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      )}

      {/* Date */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700">Preferred date</h3>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {dates.map((d) => {
            const isSelected = preferredDate === d.date;
            return (
              <button
                key={d.date}
                type="button"
                onClick={() => onDateChange(d.date)}
                aria-pressed={isSelected}
                className={`flex min-h-[52px] flex-col items-center justify-center rounded-lg border-2 p-2 text-center transition ${
                  isSelected ? "border-amber-600 bg-amber-50" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-xs text-slate-500">{d.dayName}</span>
                <span className="text-sm font-semibold text-slate-800">{d.dayNum}</span>
                <span className="text-xs text-slate-400">{d.month}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time window */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700">Preferred time window</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {PREFERRED_TIME_WINDOWS.map((w) => {
            const isSelected = preferredTime === w.label;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => onTimeChange(w.label)}
                aria-pressed={isSelected}
                className={`min-h-[48px] rounded-lg border-2 px-3 py-2 text-sm font-medium transition ${
                  isSelected
                    ? "border-amber-600 bg-amber-50 text-amber-800"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {w.label}
              </button>
            );
          })}
        </div>
      </div>

      {preferredDate && preferredTime && (
        <p className="mt-5 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
          Preferred:{" "}
          {new Date(preferredDate + "T12:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          — {preferredTime}
        </p>
      )}
    </div>
  );
}
