import { User, Zap, MapPin, Clock } from "lucide-react";

const trustItems = [
  {
    icon: User,
    text: "Personalized treatment plans",
  },
  {
    icon: Zap,
    text: "Modern laser technology",
  },
  {
    icon: MapPin,
    text: "Serving Aventura and Miami",
  },
  {
    icon: Clock,
    text: "Flexible appointment times",
  },
];

export default function TrustSection() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-8" aria-label="Why choose Kami Aesthetics">
      {trustItems.map((item) => (
        <div
          key={item.text}
          className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-sm px-3 py-3"
        >
          <item.icon className="h-4 w-4 text-gold flex-shrink-0" aria-hidden="true" />
          <span className="font-inter text-xs text-white/80">{item.text}</span>
        </div>
      ))}
    </div>
  );
}