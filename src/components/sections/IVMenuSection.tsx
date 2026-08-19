import { ArrowRight } from "lucide-react";
import { ivMenu, IV_MENU_CATEGORIES } from "@/data/iv-menu";
import { BOOKING_URL } from "@/data/constants";

export default function IVMenuSection({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">IV Menu</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">{title}</h2>
          {subtitle && <p className="font-inter text-warm-gray mt-3 max-w-xl mx-auto text-sm leading-relaxed">{subtitle}</p>}
        </div>

        <div className="max-w-6xl mx-auto space-y-14">
          {IV_MENU_CATEGORIES.map((category) => {
            const items = ivMenu.filter((item) => item.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-6">{category}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <div key={item.slug} className="bg-white border border-warm-border rounded-sm p-6 flex flex-col hover-lift">
                      <h4 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-1">{item.name}</h4>
                      <p className="font-inter text-xs uppercase tracking-wider text-gold font-medium mb-3">{item.tagline}</p>
                      <p className="font-inter text-sm text-warm-gray leading-relaxed mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.ingredients.map((ingredient) => (
                          <span key={ingredient} className="font-inter text-[11px] px-2.5 py-1 bg-warm-white border border-warm-border rounded-sm text-[#1A1A1A]">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-track="booking_click"
                        data-track-location="iv_menu_card"
                        data-track-service={item.slug}
                        className="mt-auto font-inter text-xs tracking-wider uppercase text-gold flex items-center gap-1 hover:text-gold-dark transition-colors duration-200 group"
                      >
                        Ask About This IV
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
