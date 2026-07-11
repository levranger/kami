import { Check } from "lucide-react";
import type { TreatmentArea, PackageType } from "../types/booking";
import { calculatePackagePrice, formatCurrency } from "../lib/pricing";

interface PackageSelectorProps {
  selectedAreas: TreatmentArea[];
  selectedPackage: PackageType | null;
  onPackageChange: (pkg: PackageType) => void;
  errors: string[];
}

interface PackageOption {
  type: PackageType;
  label: string;
  sessions: string;
  badge?: string;
  badgeColor?: string;
}

const packageOptions: PackageOption[] = [
  {
    type: "single",
    label: "Single Session",
    sessions: "1 session",
  },
  {
    type: "four",
    label: "4 Sessions",
    sessions: "4 sessions",
    badge: "Popular",
    badgeColor: "bg-gold text-white",
  },
  {
    type: "six",
    label: "6 Sessions",
    sessions: "6 sessions",
    badge: "Best Value",
    badgeColor: "bg-green-600 text-white",
  },
];

export default function PackageSelector({
  selectedAreas,
  selectedPackage,
  onPackageChange,
  errors,
}: PackageSelectorProps) {
  return (
    <div>
      <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">
        Choose Your Package
      </h2>
      <p className="font-inter text-sm text-warm-gray mb-6">
        Save more with multi-session packages. All prices calculated from your selected areas.
      </p>

      {/* Error message */}
      {errors.length > 0 && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm"
        >
          <p className="font-inter text-sm text-red-600">{errors[0]}</p>
        </div>
      )}

      <div className="space-y-4">
        {packageOptions.map((option) => {
          const pricing = calculatePackagePrice(selectedAreas, option.type);
          const isSelected = selectedPackage === option.type;

          return (
            <button
              key={option.type}
              onClick={() => onPackageChange(option.type)}
              aria-pressed={isSelected}
              aria-label={`${option.label} — ${formatCurrency(pricing.perSession)} per session, ${formatCurrency(pricing.total)} total${pricing.savings > 0 ? `, save ${formatCurrency(pricing.savings)}` : ""}${isSelected ? " (selected)" : ""}`}
              className={`relative w-full text-left p-5 rounded-sm border-2 transition-all duration-150 min-h-[52px] ${
                isSelected
                  ? "border-gold bg-gold/5 card-selected-pulse"
                  : option.type === "six"
                  ? "border-gold/40 bg-white hover:border-gold"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {/* Badge */}
              {option.badge && (
                <div className={`absolute -top-2.5 right-4 ${option.badgeColor} text-[10px] font-inter font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-sm`}>
                  {option.badge}
                </div>
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      isSelected ? "bg-gold border-gold" : "border-gray-300"
                    }`}
                    aria-hidden="true"
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>

                  <div>
                    <p className="font-inter text-base font-semibold text-[#1A1A1A]">
                      {option.label}
                    </p>
                    <p className="font-inter text-xs text-warm-gray mt-0.5">
                      {option.sessions}
                    </p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-right">
                  <p className="font-inter text-lg font-bold text-[#1A1A1A]">
                    {formatCurrency(pricing.perSession)}
                    <span className="text-xs font-normal text-warm-gray">/session</span>
                  </p>
                  <p className="font-inter text-xs text-warm-gray">
                    {formatCurrency(pricing.total)} total
                  </p>
                  {pricing.savings > 0 && (
                    <p className="font-inter text-xs text-green-600 font-medium mt-0.5">
                      You save {formatCurrency(pricing.savings)}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}