import { Check } from "lucide-react";

export default function ComparisonSection({
  title,
  subtitle,
  columns,
  content,
}: {
  title: string;
  subtitle?: string;
  columns: { title: string; points: string[] }[];
  content?: string;
}) {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Comparison</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">{title}</h2>
          {subtitle && <p className="font-inter text-warm-gray mt-3 max-w-xl mx-auto text-sm leading-relaxed">{subtitle}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {columns.map((col) => (
            <div key={col.title} className="bg-white border border-warm-border rounded-sm p-8">
              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-gold" />
                    </div>
                    <span className="font-inter text-sm text-warm-gray leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {content && (
          <p className="font-inter text-sm text-[#1A1A1A] font-medium text-center max-w-xl mx-auto mt-10">{content}</p>
        )}
      </div>
    </section>
  );
}
