import { useState } from "react";
import { Check } from "lucide-react";
import type { TreatmentArea } from "../types/booking";
import { formatCurrency } from "../lib/pricing";

const treatmentAreas: TreatmentArea[] = [
  { id: "underarms",  name: "Underarms",      category: "Body", price: 60  },
  { id: "brazilian",  name: "Full Brazilian",  category: "Body", price: 109 },
  { id: "half-legs",  name: "Half Legs",       category: "Body", price: 120 },
  { id: "full-legs",  name: "Full Legs",       category: "Body", price: 210 },
  { id: "full-arms",  name: "Full Arms",       category: "Body", price: 130 },
  { id: "full-face",  name: "Full Face",       category: "Body", price: 70  },
  { id: "full-body",  name: "Full Body",       category: "Body", price: 600 },
];

const categories = ["Body"];

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
      // Full body is exclusive — deselect everything else
      onAreasChange(isSelected(area) ? [] : [area]);
    } else {
      // Individual area — deselect full-body if active, then toggle this area
      const withoutFullBody = selectedAreas.filter((a) => a.id !== "full-body");
      onAreasChange(
        isSelected(area)
          ? withoutFullBody.filter((a) => a.id !== area.id)
          : [...withoutFullBody, area]
      );
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