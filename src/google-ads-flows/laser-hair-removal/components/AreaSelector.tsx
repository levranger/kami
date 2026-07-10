import { useState } from "react";
import { Check } from "lucide-react";
import type { TreatmentArea } from "../types/booking";
import { formatCurrency } from "../lib/pricing";

const treatmentAreas: TreatmentArea[] = [
  { id: "upper-lip", name: "Upper Lip", category: "Face", price: 49 },
  { id: "chin", name: "Chin", category: "Face", price: 59 },
  { id: "full-face", name: "Full Face", category: "Face", price: 149 },
  { id: "underarms", name: "Underarms", category: "Upper Body", price: 99 },
  { id: "half-arms", name: "Half Arms", category: "Upper Body", price: 109 },
  { id: "full-arms", name: "Full Arms", category: "Upper Body", price: 149 },
  { id: "chest", name: "Chest", category: "Upper Body", price: 199 },
  { id: "back", name: "Back", category: "Upper Body", price: 249 },
  { id: "bikini", name: "Bikini Line", category: "Lower Body", price: 149 },
  { id: "brazilian", name: "Brazilian", category: "Lower Body", price: 199 },
  { id: "lower-legs", name: "Lower Legs", category: "Lower Body", price: 199 },
  { id: "full-legs", name: "Full Legs", category: "Lower Body", price: 299 },
  { id: "full-body", name: "Full Body", category: "Bundles", price: 599 },
];

const categories = ["Face", "Upper Body", "Lower Body", "Bundles"];

interface AreaSelectorProps {
  selectedAreas: TreatmentArea[];
  onAreasChange: (areas: TreatmentArea[]) => void;
  errors: string[];
}

export default function AreaSelector({ selectedAreas, onAreasChange, errors }: AreaSelectorProps) {
  const [showError, setShowError] = useState(false);

  const isSelected = (area: TreatmentArea) =>
    selectedAreas.some((a) => a.id === area.id);

  const handleToggle = (area: TreatmentArea) => {
    setShowError(false);

    if (area.id === "full-body") {
      // Full body: deselect all others, toggle full-body
      if (isSelected(area)) {
        onAreasChange([]);
      } else {
        onAreasChange([area]);
      }
    } else {
      // Individual area: deselect full-body if selected
      const withoutFullBody = selectedAreas.filter((a) => a.id !== "full-body");

      if (isSelected(area)) {
        onAreasChange(withoutFullBody.filter((a) => a.id !== area.id));
      } else {
        onAreasChange([...withoutFullBody, area]);
      }
    }
  };

  const hasErrors = errors.length > 0 && showError;

  return (
    <div>
      <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">
        Select Treatment Areas
      </h2>
      <p className="font-inter text-sm text-warm-gray mb-6">
        Choose one or more areas for your laser hair removal treatment.
      </p>

      {/* Error message */}
      {hasErrors && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm"
        >
          <p className="font-inter text-sm text-red-600">{errors[0]}</p>
        </div>
      )}

      {/* Area groups */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryAreas = treatmentAreas.filter((a) => a.category === category);
          return (
            <div key={category}>
              <h3 className="font-inter text-xs font-semibold tracking-wider uppercase text-warm-gray mb-3">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryAreas.map((area) => {
                  const selected = isSelected(area);
                  return (
                    <button
                      key={area.id}
                      onClick={() => handleToggle(area)}
                      aria-pressed={selected}
                      aria-label={`${area.name} — ${formatCurrency(area.price)} per session${selected ? " (selected)" : ""}`}
                      className={`relative flex items-center justify-between w-full p-4 rounded-sm border-2 transition-all duration-150 min-h-[52px] text-left ${
                        selected
                          ? "border-gold bg-gold/5 card-selected-pulse"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            selected ? "bg-gold border-gold" : "border-gray-300"
                          }`}
                          aria-hidden="true"
                        >
                          {selected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className="font-inter text-sm font-medium text-[#1A1A1A]">
                          {area.name}
                        </span>
                      </div>
                      <span className="font-inter text-sm font-semibold text-gold">
                        {formatCurrency(area.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expose setShowError for parent validation trigger */}
      <input type="hidden" data-show-error={showError} ref={(el) => {
        if (el) (el as HTMLInputElement & { triggerError: () => void }).triggerError = () => setShowError(true);
      }} />
    </div>
  );
}

export { treatmentAreas };