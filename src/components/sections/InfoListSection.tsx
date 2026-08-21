import { Check } from "lucide-react";

export default function InfoListSection({
  title,
  subtitle,
  points,
  note,
}: {
  title: string;
  subtitle?: string;
  points: string[];
  note?: string;
}) {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Results</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">{title}</h2>
          {subtitle && <p className="font-inter text-warm-gray text-sm leading-relaxed mb-8 max-w-xl">{subtitle}</p>}

          <ul className="space-y-4 mb-6">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-gold" />
                </div>
                <span className="font-inter text-sm text-[#1A1A1A] leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          {note && <p className="font-inter text-sm text-warm-gray italic border-t border-warm-border pt-5">{note}</p>}
        </div>
      </div>
    </section>
  );
}
