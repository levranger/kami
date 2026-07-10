interface MobileStickyFooterProps {
  estimateText?: string;
  show: boolean;
}

export function MobileStickyFooter({ estimateText, show }: MobileStickyFooterProps) {
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-2 backdrop-blur-sm md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      {estimateText && <p className="text-center text-xs font-medium text-rose-700">{estimateText}</p>}
    </div>
  );
}