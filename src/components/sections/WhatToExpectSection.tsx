import AppImage from "@/components/AppImage";

export default function WhatToExpectSection({
  title,
  subtitle,
  items,
  image,
  imageAlt,
}: {
  title: string;
  subtitle?: string;
  items: { label: string; description: string }[];
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">What to Expect</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">{title}</h2>
            {subtitle && <p className="font-inter text-warm-gray text-sm leading-relaxed mb-10">{subtitle}</p>}

            <div>
              {items.map((item, idx) => (
                <div key={item.label} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center flex-shrink-0">
                      <span className="font-inter text-xs font-bold text-gold">{idx + 1}</span>
                    </div>
                    {idx < items.length - 1 && <div className="w-px h-full bg-gold/20 min-h-[32px]" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-inter text-sm font-semibold text-[#1A1A1A] mb-1">{item.label}</h3>
                    <p className="font-inter text-sm text-warm-gray leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {image && (
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-warm-border">
              <AppImage
                src={image}
                alt={imageAlt ?? title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
