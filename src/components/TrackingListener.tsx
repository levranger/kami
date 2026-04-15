"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

// Listens for clicks on any element with data-track="event_name".
// Additional parameters come from data-track-* attributes.
// e.g. <a data-track="booking_click" data-track-location="hero" ...>
export default function TrackingListener() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-track]") as HTMLElement | null;
      if (!el) return;
      const eventName = el.dataset.track!;
      const params: Record<string, string> = {};
      for (const key of Object.keys(el.dataset)) {
        if (key !== "track" && key.startsWith("track")) {
          // data-track-location → location, data-track-service → service
          params[key.replace("track", "").replace(/^./, (c) => c.toLowerCase())] =
            el.dataset[key]!;
        }
      }
      track(eventName, params);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
