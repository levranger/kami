import { buildPromoTerms } from "../lib/botoxOffer";

interface PromoTermsProps {
  /** "compact" — single flowing paragraph (under the hero price). "block" — bulleted list (offer card). */
  variant?: "compact" | "block";
  className?: string;
}

/**
 * Promotion fine print. Visible and legible, but intentionally not visually
 * dominant. Every line is generated from the central botoxOffer config.
 */
export function PromoTerms({ variant = "compact", className = "" }: PromoTermsProps) {
  const lines = buildPromoTerms();

  if (variant === "compact") {
    return (
      <p
        className={`mx-auto max-w-xl text-[11px] leading-relaxed text-slate-400 ${className}`}
      >
        {lines.join(" ")}
      </p>
    );
  }

  return (
    <ul
      className={`mx-auto max-w-sm space-y-1 text-left text-[11px] leading-relaxed text-slate-400 ${className}`}
    >
      {lines.map((line) => (
        <li key={line} className="flex gap-1.5">
          <span aria-hidden className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}
