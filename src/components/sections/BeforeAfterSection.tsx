export default function BeforeAfterSection({
  title,
  subtitle,
  pairs,
}: {
  title: string;
  subtitle?: string;
  pairs: { area: string; before: string; after: string; image?: string }[];
}) {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Real Results</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">{title}</h2>
          {subtitle && <p className="font-inter text-warm-gray mt-3 max-w-lg mx-auto text-sm leading-relaxed">{subtitle}</p>}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pairs.map((pair) => (
            <div key={pair.area} className="bg-white border border-warm-border rounded-sm overflow-hidden hover-lift">
              {pair.image && (
                <div className="relative">
                  <img src={pair.image} alt={`Before and after ${pair.area}`} className="w-full h-48 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-3 pb-2">
                    <span className="font-inter text-[10px] tracking-wider uppercase text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-sm">Before</span>
                    <span className="font-inter text-[10px] tracking-wider uppercase text-white bg-gold/80 backdrop-blur-sm px-2 py-0.5 rounded-sm">After</span>
                  </div>
                </div>
              )}
              <div className="bg-[#1A1A1A] px-5 py-3">
                <h3 className="font-inter text-sm font-semibold text-white">{pair.area}</h3>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <span className="font-inter text-[10px] tracking-wider uppercase text-warm-gray font-semibold">Before</span>
                  <p className="font-inter text-sm text-[#1A1A1A] mt-1">{pair.before}</p>
                </div>
                <div className="h-px bg-warm-border" />
                <div>
                  <span className="font-inter text-[10px] tracking-wider uppercase text-gold font-semibold">After</span>
                  <p className="font-inter text-sm text-[#1A1A1A] mt-1">{pair.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
