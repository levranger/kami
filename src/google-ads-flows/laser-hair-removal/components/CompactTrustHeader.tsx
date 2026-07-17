import { Star, Zap, ShieldCheck, Tag } from "lucide-react";

// Reassurance strip shown above Step 1 for direct-entry (?start=booking)
// traffic, replacing the full-screen LandingHero. Claims match what's
// already published elsewhere on the site (LandingHero, WhyChoose, etc.) —
// kept short so it never pushes the area selector below the fold on mobile.
const trustItems = [
  { icon: Star, text: "5.0 · 50+ Google Reviews" },
  { icon: Zap, text: "Medical-grade Splendor X technology" },
  { icon: ShieldCheck, text: "Free consultation" },
  { icon: Tag, text: "Packages from $49/session" },
];

export default function CompactTrustHeader() {
  return (
    <div
      className="mb-6 rounded-sm border border-warm-border bg-warm-white px-4 py-3"
      aria-label="Why choose Kami Aesthetics"
    >
      <div className="mb-2 flex items-baseline gap-1.5">
        <span className="font-playfair text-sm font-bold text-[#1A1A1A] tracking-tight">KAMI</span>
        <span className="font-inter text-[9px] font-normal tracking-[0.25em] uppercase text-warm-gray">
          Aesthetics
        </span>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
        {trustItems.map((item) => (
          <li key={item.text} className="flex items-center gap-1.5 font-inter text-xs text-warm-gray">
            <item.icon className="h-3.5 w-3.5 text-gold flex-shrink-0" aria-hidden="true" />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
