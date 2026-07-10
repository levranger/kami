import type { EstimateSummary } from "../types/booking";
import { formatEstimateRange } from "../lib/estimates";

interface PriceSummaryProps {
  summary: EstimateSummary | null;
}

export function PriceSummary({ summary }: PriceSummaryProps) {
  if (!summary || !summary.estimatedPrice) return null;

  return (
    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-center">
      <p className="text-xs font-medium uppercase text-amber-600">Estimated Range</p>
      <p className="text-lg font-bold text-amber-800">
        {formatEstimateRange(summary.estimatedPrice, "$")}
      </p>
    </div>
  );
}