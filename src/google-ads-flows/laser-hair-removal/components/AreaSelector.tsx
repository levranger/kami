import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import type { TreatmentArea } from "../types/booking";
import { formatCurrency } from "../lib/pricing";
import { MUST_HAVE_OFFER_AREA_IDS, MUST_HAVE_OFFER_PRICE, isMustHaveOfferCombo } from "../lib/offers";

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
  title?: string;
  description?: string;
}

export default function AreaSelector({
  selectedAreas,
  onAreasChange,
  errors,
  title = "Select Treatment Areas",
  description = "Choose one or more areas for your laser hair removal treatment.",
}: AreaSelectorProps) {
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

  const mustHaveAreas = treatmentAreas.filter((a) => MUST_HAVE_OFFER_AREA_IDS.includes(a.id));
  const mustHaveRegularPrice = mustHaveAreas.reduce((sum, a) => sum + a.price, 0);
  const hasMustHaveOffer = isMustHaveOfferCombo(selectedAreas);

  const handleSelectMustHaveOffer = () => {
    setShowError(false);
    onAreasChange(mustHaveAreas);
  };

  return (
    <div>
      <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">
        {title}
      </h2>
      <p className="font-inter text-sm text-warm-gray mb-6">
        {description}
      </p>

      {/* Must-Have offer — a real, flat $149 price for this exact combo
          (not a marketing teaser), so it's surfaced before the area grid. */}
      <div
        className={`mb-6 rounded-sm border-2 p-4 transition-colors ${
          hasMustHaveOffer ? "border-green-500 bg-green-50" : "border-gold bg-gold/5"
        }`}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="flex items-center gap-1.5 font-inter text-[10px] font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              New Client Must-Have
            </p>
            <p className="font-playfair text-lg font-bold text-[#1A1A1A] mt-1">
              Bikini + Underarms + Half Legs — {formatCurrency(MUST_HAVE_OFFER_PRICE)}
            </p>
            <p className="font-inter text-xs text-warm-gray mt-1">
              {formatCurrency(mustHaveRegularPrice)} value when booked separately.
            </p>
          </div>
          {hasMustHaveOffer ? (
            <span className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-green-700 min-h-[44px]">
              <Check className="h-4 w-4" aria-hidden="true" />
              Offer applied
            </span>
          ) : (
            <div className="flex flex-col items-end gap-1.5">
              <p className="font-inter text-[11px] text-warm-gray">No payment required today.</p>
              <button
                onClick={handleSelectMustHaveOffer}
                className="font-inter text-sm font-semibold text-white bg-gold hover:bg-gold-dark px-4 py-2.5 rounded-sm transition-colors min-h-[44px]"
              >
                Get This Offer
              </button>
            </div>
          )}
        </div>
      </div>

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

      {/* Reassurance — package/upsell decisions now happen in person at the
          appointment, not online, so this is shown before the user moves on
          to picking a date/time. */}
      <div className="mt-6 space-y-1.5">
        <p className="font-inter text-xs text-warm-gray">No payment required today.</p>
        <p className="font-inter text-xs text-warm-gray">
          Multi-session packages and savings are available at your appointment.
        </p>
      </div>

      {/* Expose setShowError for parent validation trigger */}
      <input type="hidden" data-show-error={showError} ref={(el) => {
        if (el) (el as HTMLInputElement & { triggerError: () => void }).triggerError = () => setShowError(true);
      }} />
    </div>
  );
}

export { treatmentAreas };