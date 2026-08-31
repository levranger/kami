import { PrimaryOfferCta } from "./PrimaryOfferCta";

interface MobileStickyFooterProps {
  estimateText?: string;
  show: boolean;
  /** When true, render the primary "Book $10/unit Botox" CTA instead of estimate text. */
  offerCta?: boolean;
}

export function MobileStickyFooter({ estimateText, show, offerCta }: MobileStickyFooterProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      {offerCta ? (
        <PrimaryOfferCta placement="sticky_mobile" fullWidth className="!py-3 !shadow-md" />
      ) : (
        estimateText && (
          <p className="text-center text-xs font-medium text-amber-700">{estimateText}</p>
        )
      )}
    </div>
  );
}
