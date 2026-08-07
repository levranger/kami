import Link from "next/link";

// Compact, persistent brand bar shown above every one of the five booking
// steps (both entry modes) so users never lose their bearings mid-funnel.
// The links open the main site in a new tab — this funnel's progress lives
// only in this tab's React state, so navigating away in-place would blow
// away everything the client has already selected.
export default function FunnelBrandHeader() {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-baseline gap-1.5"
        aria-label="Kami Aesthetics — Home (opens in a new tab)"
        data-track="booking_website_clicked"
        data-track-location="funnel_header_logo"
      >
        <span className="font-playfair text-sm font-bold text-[#1A1A1A] tracking-tight">KAMI</span>
        <span className="font-inter text-[9px] font-normal tracking-[0.25em] uppercase text-warm-gray">
          Aesthetics
        </span>
      </Link>
      <Link
        href="/services"
        target="_blank"
        rel="noopener noreferrer"
        className="font-inter text-[10px] text-warm-gray/70 hover:text-gold underline underline-offset-2 transition-colors"
        data-track="booking_website_clicked"
        data-track-location="funnel_header_services"
      >
        Explore our services
      </Link>
    </div>
  );
}
