import { Check } from "lucide-react";
import type { TreatmentGoal } from "../types/booking";
import { goalOptions } from "../lib/config";

interface TreatmentGoalSelectorProps {
  selectedGoal: TreatmentGoal | null;
  onSelect: (goal: TreatmentGoal) => void;
  onContinue: () => void;
  onBack: () => void;
  error?: string;
}

export function TreatmentGoalSelector({ selectedGoal, onSelect, onContinue, onBack, error }: TreatmentGoalSelectorProps) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Desired Result</h2>
      <p className="mb-6 text-sm text-slate-600">What kind of result are you looking for?</p>

      {error && (
        <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <div className="space-y-3">
        {goalOptions.map((option) => {
          const isSelected = selectedGoal === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={`flex min-h-[52px] w-full items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${isSelected ? "border-rose-600 bg-rose-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
            >
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isSelected ? "bg-rose-600" : "border-2 border-slate-300"}`}>
                {isSelected && <Check className="h-3 w-3 text-white" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-800">{option.name}</p>
                  {option.badge && <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">{option.badge}</span>}
                </div>
                <p className="text-xs text-slate-500">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        This preference helps us understand your goals. Your provider will determine whether filler is appropriate and recommend the final product and amount.
      </p>

      <div className="mt-6 flex gap-3">
        <button onClick={onBack} className="flex-1 rounded-lg border border-slate-300 py-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50">Back</button>
        <button onClick={onContinue} disabled={!selectedGoal} className="flex-1 rounded-lg bg-rose-700 py-4 text-base font-semibold text-white shadow transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50">Continue</button>
      </div>
    </div>
  );
}