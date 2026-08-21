export default function ExpectGroupsSection({
  title,
  subtitle,
  groups,
}: {
  title: string;
  subtitle?: string;
  groups: { label: string; points: string[] }[];
}) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">What to Expect</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">{title}</h2>
          {subtitle && <p className="font-inter text-warm-gray mt-3 max-w-xl mx-auto text-sm leading-relaxed">{subtitle}</p>}
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {groups.map((group) => (
            <div key={group.label} className="bg-warm-white border border-warm-border rounded-sm p-6">
              <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-4">{group.label}</h3>
              <ul className="space-y-3">
                {group.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span className="font-inter text-sm text-warm-gray leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
