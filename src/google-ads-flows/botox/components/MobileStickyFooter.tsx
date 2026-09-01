import { PrimaryOfferCta } from "./PrimaryOfferCta";

interface StickyAction {
  ctaLabel: string;
  onClick: () => void;
  onBack?: () => void;
  showBack?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

interface MobileStickyFooterProps {
  show: boolean;
  /** Landing-page promo CTA — starts the appointment-request flow. */
  offerCta?: boolean;
  onOfferCta?: (placement: string) => void;
  /** In-flow navigation (Back + primary), LHR-style. Takes precedence over offerCta. */
  action?: StickyAction;
}

export function MobileStickyFooter({ show, offerCta, onOfferCta, action }: MobileStickyFooterProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      {action ? (
        <div className="mx-auto flex max-w-[840px] gap-3">
          {action.showBack && action.onBack && (
            <button
              type="button"
              onClick={action.onBack}
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={action.onClick}
            disabled={action.disabled || action.loading}
            className="flex min-h-[48px] flex-1 items-center justify-center rounded-lg bg-amber-700 py-3 text-base font-semibold text-white shadow-md transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {action.loading ? "Sending…" : action.ctaLabel}
          </button>
        </div>
      ) : offerCta && onOfferCta ? (
        <div className="mx-auto max-w-[840px]">
          <PrimaryOfferCta placement="sticky_mobile" onStart={onOfferCta} fullWidth className="!py-3 !shadow-md" />
        </div>
      ) : null}
    </div>
  );
}
