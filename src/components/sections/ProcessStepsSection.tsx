export default function ProcessStepsSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: { label: string; description: string }[];
}) {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">The Process</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">{title}</h2>
          {subtitle && <p className="font-inter text-warm-gray mt-3 max-w-lg mx-auto text-sm leading-relaxed">{subtitle}</p>}
        </div>

        <div className="max-w-3xl mx-auto">
          {items.map((item, idx) => (
            <div key={item.label} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center flex-shrink-0">
                  <span className="font-inter text-xs font-bold text-gold">{idx + 1}</span>
                </div>
                {idx < items.length - 1 && <div className="w-px h-full bg-gold/20 min-h-[40px]" />}
              </div>
              <div className="pb-10">
                <h3 className="font-inter text-sm font-semibold text-[#1A1A1A] mb-1">{item.label}</h3>
                <p className="font-inter text-sm text-warm-gray leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
