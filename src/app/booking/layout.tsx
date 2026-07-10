import type { Metadata } from "next";

/**
 * Booking layout — used exclusively for Google Ads landing pages.
 *
 * - Strips the site header and footer so the page has zero leakage away
 *   from the conversion funnel.
 * - Sets robots=noindex so these pages never appear in organic search.
 *   (Google Ads traffic is paid; we don't want duplicate / thin content
 *   competing with the main service pages.)
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Intentionally renders children only — no Header, AnnouncementBar, or Footer.
  return <>{children}</>;
}
