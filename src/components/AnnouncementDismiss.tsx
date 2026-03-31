"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementDismiss() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return <style>{`.announcement-bar{display:none}`}</style>;
  return (
    <button
      onClick={() => setHidden(true)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
      aria-label="Close announcement"
    >
      <X className="h-4 w-4" />
    </button>
  );
}
