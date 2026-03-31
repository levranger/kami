"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.467990071206!2d-80.1417244!3d25.9526878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9adb6e7f31865%3A0x3d52fcb6e4c39a8d!2sKami%20Aesthetics!5e0!3m2!1sen!2sus!4v1774623599275!5m2!1sen!2sus";

export default function MapEmbed() {
  const [active, setActive] = useState(false);

  return (
    <section aria-label="Our location" className="w-full">
      {active ? (
        <iframe
          src={MAP_SRC}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kami Aesthetics location on Google Maps"
        />
      ) : (
        <button
          onClick={() => setActive(true)}
          className="w-full h-[400px] bg-[#1A1A1A] flex flex-col items-center justify-center gap-3 cursor-pointer group"
          aria-label="Load interactive map for Kami Aesthetics"
        >
          <MapPin className="h-8 w-8 text-gold" aria-hidden="true" />
          <span className="font-inter text-sm text-white/70 group-hover:text-white transition-colors">
            2999 NE 191st St, Aventura, FL — Click to load map
          </span>
        </button>
      )}
    </section>
  );
}
