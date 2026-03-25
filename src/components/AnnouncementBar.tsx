"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { BOOKING_URL } from "@/data/content";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className="bg-[#1A1A1A] text-white py-2.5 px-4 relative z-50">
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
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
