export default function TechnologySection({
  title,
  subtitle,
  content,
  items,
}: {
  title: string;
  subtitle?: string;
  content?: string;
  items: { label: string; description: string }[];
}) {
  return (
    <section className="section-padding bg-[#1A1A1A]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Technology</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
          {subtitle && <p className="font-inter text-white/50 text-sm mb-6">{subtitle}</p>}
          {content && <p className="font-inter text-white/70 text-sm leading-relaxed mb-12 max-w-3xl">{content}</p>}
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item.label} className="border border-white/10 p-6 rounded-sm hover:border-gold/30 transition-colors duration-300">
                <h3 className="font-inter text-sm font-semibold text-gold mb-2">{item.label}</h3>
                <p className="font-inter text-sm text-white/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
