import type { EstimateSummary as EstimateSummaryType } from "../types/booking";
import { formatSyringeRange, formatCurrencyRange } from "../lib/estimates";
import { fillerTreatmentAreas } from "../lib/config";

interface EstimateSummaryProps {
  summary: EstimateSummaryType;
  selectedAreas: string[];
  selectedGoal: string | null;
  estimateAcknowledged: boolean;
  onAcknowledge: (val: boolean) => void;
  onContinue: () => void;
  onBack: () => void;
  onEditAreas: () => void;
  onEditGoal: () => void;
  error?: string;
}

export function EstimateSummaryComponent({
  summary,
  selectedAreas,
  selectedGoal,
  estimateAcknowledged,
  onAcknowledge,
  onContinue,
  onBack,
  onEditAreas,
  onEditGoal,
  error,
}: EstimateSummaryProps) {
  const areaNames = selectedAreas.map((id) => fillerTreatmentAreas.find((a) => a.id === id)?.name).filter(Boolean);

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Preliminary Estimate</h2>
      <p className="mb-6 text-sm text-slate-600">Based on your selections, here is a preliminary estimate.</p>

      {error && (
        <div role="alert" aria-live="polite" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-slate-400">Selected Areas</p>
            <p className="text-sm text-slate-700">{areaNames.join(", ")}</p>
          </div>
          <button onClick={onEditAreas} className="text-xs font-medium text-rose-700 hover:underline">Edit</button>
        </div>

        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-slate-400">Desired Result</p>
            <p className="text-sm capitalize text-slate-700">{selectedGoal?.replace(/-/g, " ") || "—"}</p>
          </div>
          <button onClick={onEditGoal} className="text-xs font-medium text-rose-700 hover:underline">Edit</button>
        </div>

        {summary.automatedEstimateDisabled ? (
          <div className="mb-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
            A provider consultation is required to determine the appropriate treatment plan for your selected area(s). An automated estimate is not available.
          </div>
        ) : (
          <>
            <div className="mb-3">
              <p className="text-xs font-medium uppercase text-slate-400">Estimated Product</p>
              <p className="text-lg font-bold text-slate-900">{formatSyringeRange(summary.estimatedSyringes)}</p>
            </div>
            <div className="mb-3">
              <p className="text-xs font-medium uppercase text-slate-400">Estimated Treatment Price</p>
              <p className="text-2xl font-bold text-rose-700">{formatCurrencyRange(summary.estimatedPrice)}</p>
              <p className="text-xs text-slate-500">Final recommendations are made after an in-person assessment.</p>
            </div>
          </>
        )}

        <div className="mb-3">
          <p className="text-xs font-medium uppercase text-slate-400">Estimated Duration</p>
          <p className="text-sm text-slate-700">{summary.estimatedDurationMinutes} minutes</p>
        </div>

        {summary.consultationRequired && (
          <div className="mb-3 rounded-lg bg-blue-50 p-2 text-xs text-blue-700">Consultation required for selected area(s)</div>
        )}

        <div>
          <p className="text-xs font-medium uppercase text-slate-400">Due Today</p>
          <p className="text-sm text-slate-700">{summary.depositAmount > 0 ? `$${summary.depositAmount} deposit` : "No deposit required"}</p>
        </div>
      </div>

      <div className="mb-4 rounded-lg bg-slate-50 p-3">
        <p className="mb-3 text-xs text-slate-500">{summary.disclaimer}</p>
        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={estimateAcknowledged}
            onChange={(e) => onAcknowledge(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
          />
          <span className="text-xs text-slate-600">
            I understand this is a preliminary estimate and that my provider will determine the final treatment plan and price.
          </span>
        </label>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 rounded-lg border border-slate-300 py-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50">Back</button>
        <button onClick={onContinue} disabled={!estimateAcknowledged} className="flex-1 rounded-lg bg-rose-700 py-4 text-base font-semibold text-white shadow transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50">Continue</button>
      </div>
    </div>
  );
}