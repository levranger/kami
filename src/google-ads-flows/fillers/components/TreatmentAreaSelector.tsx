import { Check } from "lucide-react";
import { fillerTreatmentAreas } from "../lib/config";

interface TreatmentAreaSelectorProps {
  selectedAreas: string[];
  onSelect: (areas: string[]) => void;
  onContinue: () => void;
  error?: string;
}

export function TreatmentAreaSelector({ selectedAreas, onSelect, onContinue, error }: TreatmentAreaSelectorProps) {
  const categories = [...new Set(fillerTreatmentAreas.map((a) => a.category))];

  function toggleArea(id: string) {
    if (id === "not-sure") {
      onSelect(selectedAreas.includes("not-sure") ? [] : ["not-sure"]);
      return;
    }
    const withoutNotSure = selectedAreas.filter((a) => a !== "not-sure");
    if (withoutNotSure.includes(id)) {
      onSelect(withoutNotSure.filter((a) => a !== id));
    } else {
      onSelect([...withoutNotSure, id]);
    }
  }

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">What would you like to enhance?</h2>
      <p className="mb-6 text-sm text-slate-600">Select all areas you'd like to discuss with your provider.</p>

      {error && (
        <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {categories.map((category) => (
        <div key={category} className="mb-5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{category}</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {fillerTreatmentAreas.filter((a) => a.category === category).map((area) => {
              const isSelected = selectedAreas.includes(area.id);
              return (
                <button
                  key={area.id}
                  onClick={() => toggleArea(area.id)}
                  aria-pressed={isSelected}
                  className={`flex min-h-[52px] items-center gap-3 rounded-lg border-2 p-3 text-left transition-all ${isSelected ? "border-rose-600 bg-rose-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                >
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${isSelected ? "bg-rose-600" : "border border-slate-300"}`}>
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{area.name}</p>
                    <p className="text-xs text-slate-500">{area.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={onContinue}
        disabled={selectedAreas.length === 0}
        className="mt-4 w-full rounded-lg bg-rose-700 py-4 text-base font-semibold text-white shadow transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}