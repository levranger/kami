import { Check } from "lucide-react";
import { concerns } from "../lib/estimates";

interface ConcernSelectorProps {
  selectedConcerns: string[];
  onSelect: (concerns: string[]) => void;
  onContinue: () => void;
  error?: string;
}

export function ConcernSelector({ selectedConcerns, onSelect, onContinue, error }: ConcernSelectorProps) {
  const categories = [...new Set(concerns.map((c) => c.category))];

  function toggleConcern(id: string) {
    if (id === "not-sure") {
      onSelect(selectedConcerns.includes("not-sure") ? [] : ["not-sure"]);
      return;
    }

    const withoutNotSure = selectedConcerns.filter((c) => c !== "not-sure");
    if (withoutNotSure.includes(id)) {
      onSelect(withoutNotSure.filter((c) => c !== id));
    } else {
      onSelect([...withoutNotSure, id]);
    }
  }

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Treatment Concerns</h2>
      <p className="mb-6 text-sm text-slate-600">Choose all areas you would like to discuss.</p>

      {error && (
        <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {categories.map((category) => (
        <div key={category} className="mb-5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {category}
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {concerns
              .filter((c) => c.category === category)
              .map((concern) => {
                const isSelected = selectedConcerns.includes(concern.id);
                return (
                  <button
                    key={concern.id}
                    onClick={() => toggleConcern(concern.id)}
                    aria-pressed={isSelected}
                    className={`flex min-h-[52px] items-center gap-3 rounded-lg border-2 p-3 text-left transition-all ${
                      isSelected
                        ? "border-amber-600 bg-amber-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                        isSelected ? "bg-amber-600" : "border border-slate-300"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{concern.name}</p>
                      <p className="text-xs text-slate-500">{concern.description}</p>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      ))}

      <button
        onClick={onContinue}
        disabled={selectedConcerns.length === 0}
        className="mt-4 w-full rounded-lg bg-amber-700 py-4 text-base font-semibold text-white shadow transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}