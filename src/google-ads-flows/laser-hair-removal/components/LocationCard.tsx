import { MapPin } from "lucide-react";
import { MAPS_URL } from "@/data/content";
import { LOCATION_NAME, LOCATION_ADDRESS, LOCATION_PARKING_NOTE } from "../lib/location";

interface LocationCardProps {
  // Distinguishes the Step 3 vs. Step 5 instance in analytics.
  trackLocation: string;
}

// Shown immediately above the Step 3 calendar and repeated on the Step 5
// review, so clients always know where they're headed before they confirm.
export default function LocationCard({ trackLocation }: LocationCardProps) {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-sm border border-warm-border bg-warm-white px-4 py-3">
      <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="font-inter text-sm font-semibold text-[#1A1A1A]">{LOCATION_NAME}</p>
        <p className="font-inter text-xs text-warm-gray mt-0.5">{LOCATION_ADDRESS}</p>
        <p className="font-inter text-xs text-warm-gray mt-0.5">
          {LOCATION_PARKING_NOTE} ·{" "}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors"
            data-track="booking_location_clicked"
            data-track-location={trackLocation}
          >
            View map and directions
          </a>
        </p>
      </div>
    </div>
  );
}
