import { Sparkles } from "lucide-react";

export default function ResultsGallerySection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: { label: string; description: string }[];
}) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Results</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">{title}</h2>
          {subtitle && <p className="font-inter text-warm-gray mt-3 max-w-lg mx-auto text-sm leading-relaxed">{subtitle}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item) => (
            <div key={item.label} className="bg-warm-white border border-warm-border p-8 rounded-sm hover-lift group">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                <Sparkles className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-playfair text-lg font-semibold text-[#1A1A1A] mb-2">{item.label}</h3>
              <p className="font-inter text-sm text-warm-gray leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
