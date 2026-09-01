import { Check } from "lucide-react";
import { TREATMENT_AREA_OPTIONS } from "../lib/botoxOffer";

interface RequestTreatmentAreaStepProps {
  treatmentArea: string | null;
  onChange: (id: string | null) => void;
}

export function RequestTreatmentAreaStep({ treatmentArea, onChange }: RequestTreatmentAreaStepProps) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">What would you like to treat?</h2>
      <p className="mb-5 text-sm text-slate-600">
        Optional — your injector confirms the right areas and dosing at your visit.
      </p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {TREATMENT_AREA_OPTIONS.map((opt) => {
          const isSelected = treatmentArea === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(isSelected ? null : opt.id)}
              className={`flex min-h-[52px] items-center gap-3 rounded-lg border-2 p-3 text-left transition ${
                isSelected ? "border-amber-600 bg-amber-50" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isSelected ? "bg-amber-600" : "border border-slate-300"
                }`}
              >
                {isSelected && <Check className="h-3 w-3 text-white" />}
              </span>
              <span className="text-sm font-medium text-slate-800">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        You can skip this — tap “Request My Appointment” to send your request as-is.
      </p>
    </div>
  );
}
