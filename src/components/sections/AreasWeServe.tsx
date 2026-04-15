import { MapPin } from "lucide-react";

const areas = [
  "Aventura",
  "Hallandale Beach",
  "Sunny Isles Beach",
  "North Miami Beach",
  "Golden Beach",
  "Bal Harbour",
  "Surfside",
];

export default function AreasWeServe() {
  return (
    <section className="bg-warm-white border-t border-warm-border py-12 md:py-16" aria-labelledby="areas-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
            <h2
              id="areas-heading"
              className="font-inter text-xs font-semibold tracking-[0.3em] uppercase text-gold"
            >
              Areas We Serve
            </h2>
          </div>

            <a href="https://maps.app.goo.gl/DDRGkNyiJhX6JPuZ6" target="_blank" rel="noopener noreferrer" className="font-inter text-sm text-warm-gray hover:text-gold transition-colors duration-200 leading-relaxed mb-8 max-w-xl mx-auto block">
              Located at 2999 NE 191st St in Aventura, we&apos;re minutes away from
              Hallandale Beach, Sunny Isles Beach, North Miami Beach, and Golden
              Beach — making us the premier med spa for clients across Miami-Dade
              and Broward County.
            </a>

          <ul
            className="flex flex-wrap justify-center gap-2"
            aria-label="Service areas"
          >
            {areas.map((area) => (
              <li
                key={area}
                className="font-inter text-xs text-[#1A1A1A] bg-white border border-warm-border px-4 py-2 rounded-sm"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
