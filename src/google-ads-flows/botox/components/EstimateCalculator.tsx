import type { EstimateSummary, ProductPreference } from "../types/booking";
import { products, formatEstimateRange, getProductLabel, concerns } from "../lib/estimates";

interface EstimateCalculatorProps {
  estimateSummary: EstimateSummary;
  selectedConcerns: string[];
  selectedGoal: string | null;
  productPreference: ProductPreference;
  estimateAcknowledged: boolean;
  onProductChange: (pref: ProductPreference) => void;
  onAcknowledge: (val: boolean) => void;
  onContinue: () => void;
  onBack: () => void;
  onEditConcerns: () => void;
  onEditGoal: () => void;
  error?: string;
}

export function EstimateCalculator({
  estimateSummary,
  selectedConcerns,
  selectedGoal,
  productPreference,
  estimateAcknowledged,
  onProductChange,
  onAcknowledge,
  onContinue,
  onBack,
  onEditConcerns,
  onEditGoal,
  error,
}: EstimateCalculatorProps) {
  const concernNames = selectedConcerns
    .map((id) => concerns.find((c) => c.id === id)?.name)
    .filter(Boolean);

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Your Estimate</h2>
      <p className="mb-6 text-sm text-slate-600">
        Based on your selections, here is a preliminary estimate.
      </p>

      {error && (
        <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Summary Card */}
      <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* Concerns */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-slate-400">Selected Concerns</p>
            <p className="text-sm text-slate-700">{concernNames.join(", ")}</p>
          </div>
          <button onClick={onEditConcerns} className="text-xs font-medium text-amber-700 hover:underline">
            Edit
          </button>
        </div>

        {/* Goal */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-slate-400">Treatment Goal</p>
            <p className="text-sm capitalize text-slate-700">{selectedGoal?.replace(/-/g, " ") || "—"}</p>
          </div>
          <button onClick={onEditGoal} className="text-xs font-medium text-amber-700 hover:underline">
            Edit
          </button>
        </div>

        {/* Estimated Units */}
        <div className="mb-3">
          <p className="text-xs font-medium uppercase text-slate-400">Estimated Treatment Range</p>
          <p className="text-lg font-bold text-slate-900">
            {formatEstimateRange(estimateSummary.estimatedUnits)} units
          </p>
          <p className="text-xs text-slate-500">
            Based on {getProductLabel(productPreference)}
          </p>
        </div>

        {/* Estimated Price */}
        <div className="mb-3">
          <p className="text-xs font-medium uppercase text-slate-400">Estimated Cost</p>
          <p className="text-2xl font-bold text-amber-700">
            {formatEstimateRange(estimateSummary.estimatedPrice, "$")}
          </p>
        </div>

        {/* Duration */}
        <div className="mb-3">
          <p className="text-xs font-medium uppercase text-slate-400">Estimated Duration</p>
          <p className="text-sm text-slate-700">{estimateSummary.estimatedDurationMinutes} minutes</p>
        </div>

        {/* Deposit */}
        <div>
          <p className="text-xs font-medium uppercase text-slate-400">Due Today</p>
          <p className="text-sm text-slate-700">
            {estimateSummary.depositAmount > 0
              ? `$${estimateSummary.depositAmount} deposit`
              : "No deposit required"}
          </p>
        </div>
      </div>

      {/* Product Preference */}
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-slate-700">Product Preference (optional)</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onProductChange("no-preference")}
            className={`rounded-lg border-2 p-2 text-xs font-medium transition ${
              productPreference === "no-preference"
                ? "border-amber-600 bg-amber-50 text-amber-800"
                : "border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            No preference
          </button>
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => onProductChange(p.id as ProductPreference)}
              className={`rounded-lg border-2 p-2 text-xs font-medium transition ${
                productPreference === p.id
                  ? "border-amber-600 bg-amber-50 text-amber-800"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {p.name} (${p.pricePerUnit}/unit)
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Your provider will recommend the appropriate product and dose after evaluating your goals and facial movement.
        </p>
      </div>

      {/* Consultation Required */}
      {estimateSummary.consultationRequired && (
        <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
          A consultation is required for one or more of your selected concerns.
        </div>
      )}

      {/* Disclaimer & Acknowledgement */}
      <div className="mb-4 rounded-lg bg-slate-50 p-3">
        <p className="mb-3 text-xs text-slate-500">{estimateSummary.disclaimer}</p>
        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={estimateAcknowledged}
            onChange={(e) => onAcknowledge(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-xs text-slate-600">
            I understand this is an estimate and that my provider will determine the final product, dose, and price.
          </span>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 rounded-lg border border-slate-300 py-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!estimateAcknowledged}
          className="flex-1 rounded-lg bg-amber-700 py-4 text-base font-semibold text-white shadow transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}