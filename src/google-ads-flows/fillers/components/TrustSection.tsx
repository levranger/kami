import { Shield, Heart, UserCheck, MapPin, Clock, Package } from "lucide-react";

const items = [
  { icon: Heart, label: "Personalized treatment plans" },
  { icon: Shield, label: "Natural-looking approach" },
  { icon: UserCheck, label: "Qualified medical provider" },
  { icon: Package, label: "Authentic authorized products" },
  { icon: Clock, label: "Follow-up support" },
  { icon: MapPin, label: "Serving Aventura & Miami" },
];

export function TrustSection() {
  return (
    <section className="border-t border-slate-100 bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">Why Choose Kami Aesthetics</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2"><Icon className="h-4 w-4 shrink-0 text-rose-600" /><span className="text-sm text-slate-600">{label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}