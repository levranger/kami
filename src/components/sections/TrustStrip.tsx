import { Shield, Sparkles, Cpu, Star } from "lucide-react";

const trustItems = [
  { icon: Cpu, title: "Advanced Technology", description: "Lumenis Splendor X" },
  { icon: Sparkles, title: "All Skin Types", description: "Safe & effective for all" },
  { icon: Shield, title: "Medical-Grade", description: "FDA-cleared equipment" },
  { icon: Star, title: "5-Star Experience", description: "Exceptional client care" },
];

export default function TrustStrip() {
  return (
    <section className="py-12 md:py-16 bg-warm-white border-y border-warm-border" aria-label="Why trust Kami Aesthetics">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {trustItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-white border border-warm-border flex items-center justify-center mb-3 group-hover:border-gold transition-colors duration-300" aria-hidden="true">
                <item.icon className="h-5 w-5 text-gold" />
              </div>
              <p className="font-inter text-sm font-semibold text-[#1A1A1A] tracking-wide">{item.title}</p>
              <p className="font-inter text-xs text-warm-gray mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
