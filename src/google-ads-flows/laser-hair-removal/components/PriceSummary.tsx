import type { PricingSummary } from "../types/booking";
import { formatCurrency } from "../lib/pricing";

interface PriceSummaryProps {
  summary: PricingSummary;
  compact?: boolean;
}

export default function PriceSummary({ summary, compact = false }: PriceSummaryProps) {
  if (compact) {
    return (
      <div className="font-inter text-sm" aria-live="polite" aria-atomic="true">
        <span className="text-[#1A1A1A] font-semibold">
          {formatCurrency(summary.discountedSessionPrice)}/session
        </span>
        {summary.savings > 0 && (
          <span className="text-green-600 ml-2 text-xs">
            Save {formatCurrency(summary.savings)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="bg-warm-white border border-warm-border rounded-sm p-5 space-y-3"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Pricing summary"
    >
      <div className="flex justify-between font-inter text-sm">
        <span className="text-warm-gray">Per session</span>
        <span className="text-[#1A1A1A] font-medium">
          {formatCurrency(summary.discountedSessionPrice)}
        </span>
      </div>
      <div className="flex justify-between font-inter text-sm">
        <span className="text-warm-gray">Sessions</span>
        <span className="text-[#1A1A1A] font-medium">× {summary.sessionCount}</span>
      </div>
      <div className="h-px bg-warm-border" />
      <div className="flex justify-between font-inter text-sm font-semibold">
        <span className="text-[#1A1A1A]">Package total</span>
        <span className="text-[#1A1A1A]">{formatCurrency(summary.packageTotal)}</span>
      </div>
      {summary.savings > 0 && (
        <div className="flex justify-between font-inter text-sm">
          <span className="text-green-600">You save</span>
          <span className="text-green-600 font-medium">
            {formatCurrency(summary.savings)}
          </span>
        </div>
      )}
      <div className="h-px bg-warm-border" />
      <div className="flex justify-between font-inter text-sm">
        <span className="text-warm-gray">Due today (deposit)</span>
        <span className="text-[#1A1A1A] font-semibold">
          {formatCurrency(summary.depositAmount)}
        </span>
      </div>
      <div className="flex justify-between font-inter text-sm">
        <span className="text-warm-gray">Remaining balance</span>
        <span className="text-[#1A1A1A]">{formatCurrency(summary.remainingBalance)}</span>
      </div>
    </div>
  );
}