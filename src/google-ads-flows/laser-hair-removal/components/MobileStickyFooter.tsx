import { formatCurrency } from "../lib/pricing";

interface MobileStickyFooterProps {
  ctaLabel: string;
  priceLabel?: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  showBack?: boolean;
  onBack?: () => void;
}

export default function MobileStickyFooter({
  ctaLabel,
  priceLabel,
  onClick,
  disabled = false,
  loading = false,
  showBack = false,
  onBack,
}: MobileStickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sticky-footer-safe">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="font-inter text-sm text-warm-gray hover:text-[#1A1A1A] transition-colors px-3 py-2"
            aria-label="Go back to previous step"
          >
            ← Back
          </button>
        )}

        <button
          onClick={onClick}
          disabled={disabled || loading}
          className={`flex-1 font-inter text-sm font-semibold tracking-wide py-4 rounded-sm transition-all duration-200 min-h-[52px] flex items-center justify-center gap-2 ${
            disabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#1A1A1A] text-white hover:bg-gold active:scale-[0.98]"
          }`}
          aria-label={priceLabel ? `${ctaLabel} — ${priceLabel}` : ctaLabel}
        >
          {loading ? (
            <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
          ) : (
            <>
              <span>{ctaLabel}</span>
              {priceLabel && (
                <span className="text-gold">· {priceLabel}</span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export { formatCurrency };