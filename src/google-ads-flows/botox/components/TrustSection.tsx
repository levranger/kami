import { Shield, Heart, UserCheck, MapPin, Clock, Phone } from "lucide-react";

const trustItems = [
  { icon: Heart, label: "Personalized dosing" },
  { icon: Shield, label: "Natural-looking approach" },
  { icon: UserCheck, label: "Qualified medical provider" },
  { icon: MapPin, label: "Serving Aventura & Miami" },
  { icon: Clock, label: "Quick appointment times" },
  { icon: Phone, label: "Follow-up support" },
];

export function TrustSection() {
  return (
    <section className="border-t border-slate-100 bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
          Why Choose Kami Aesthetics
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-amber-600" />
              <span className="text-sm text-slate-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}