import { BOOKING_URL } from "@/data/content";
import AnnouncementDismiss from "./AnnouncementDismiss";

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar bg-[#1A1A1A] text-white py-2.5 px-4 relative z-50">
      <div className="container mx-auto flex items-center justify-center">
        <p className="text-sm font-inter tracking-wide text-center">
          <span className="text-gold font-medium">✦</span>
          <span className="mx-2">
            New Clients: <strong className="text-gold">$149</strong> Laser Package — Bikini + Underarms + Half Legs
          </span>
          <span className="text-gold font-medium">—</span>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-gold hover:text-gold-light underline underline-offset-2 transition-colors duration-200"
          >
            Book Now
          </a>
          <span className="ml-2 text-gold font-medium">✦</span>
        </p>
        <AnnouncementDismiss />
      </div>
    </div>
  );
}
