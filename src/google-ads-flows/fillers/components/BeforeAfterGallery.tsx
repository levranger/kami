"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide =
  | { id: string; area: string; type: "slider"; beforeImage: string; afterImage: string; testimonial: string }
  | { id: string; area: string; type: "after-only"; image: string; testimonial: string };

const slides: Slide[] = [
  {
    id: "facial-1",
    area: "Facial Fillers",
    type: "slider",
    beforeImage: "https://res.cloudinary.com/dnuxtgg11/image/upload/v1783740539/facial-filler-before_mxnxaf.png",
    afterImage: "https://res.cloudinary.com/dnuxtgg11/image/upload/v1783740541/facial-filler-after_hl1kv7.png",
    testimonial: "I love the subtle lift it gave my face.",
  },
  {
    id: "lips-1",
    area: "Lip Filler",
    type: "after-only",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/v1783740407/IMG_1857_zl1ffz.jpg",
    testimonial: "My lips look fuller but still completely natural.",
  },
];

// ── Drag slider (used when we have both before + after) ───────────────────────

function DragSlider({ slide }: { slide: Extract<Slide, { type: "slider" }> }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleDrag = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPosition(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl cursor-ew-resize bg-slate-100 select-none"
      onMouseDown={() => { isDragging.current = true; }}
      onMouseUp={() => { isDragging.current = false; }}
      onMouseLeave={() => { isDragging.current = false; }}
      onMouseMove={(e) => { if (isDragging.current) handleDrag(e.clientX); }}
      onTouchMove={(e) => { if (e.touches[0]) handleDrag(e.touches[0].clientX); }}
      role="slider"
      aria-label={`Before and after comparison for ${slide.area}. Drag to compare.`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
    >
      {/* After — full size behind */}
      <img
        src={slide.afterImage}
        alt={`After ${slide.area}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
      {/* Before — clipped from right */}
      <img
        src={slide.beforeImage}
        alt={`Before ${slide.area}`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        loading="lazy"
        draggable={false}
      />
      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/* Labels */}
      <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded">Before</div>
      <div className="absolute top-3 right-3 bg-rose-700/80 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded">After</div>
    </div>
  );
}

// ── After-only card ───────────────────────────────────────────────────────────

function AfterOnlyCard({ slide }: { slide: Extract<Slide, { type: "after-only" }> }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
      <img
        src={slide.image}
        alt={`${slide.area} result`}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute top-3 right-3 bg-rose-700/80 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded">After</div>
    </div>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export function BeforeAfterGallery() {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h3 className="mb-4 text-center text-lg font-bold text-slate-900">Before &amp; After</h3>

      {slide.type === "slider" ? (
        <DragSlider slide={slide} />
      ) : (
        <AfterOnlyCard slide={slide} />
      )}

      {/* Caption */}
      <div className="mt-3 text-center">
        <p className="text-sm font-medium text-rose-700">{slide.area}</p>
        <p className="mt-1 text-sm italic text-slate-600">&ldquo;{slide.testimonial}&rdquo;</p>
      </div>

      {/* Navigation — only shown when there are multiple slides */}
      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
            aria-label="Previous"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:bg-slate-50 transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-rose-700" : "bg-slate-300"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIdx((i) => (i + 1) % slides.length)}
            aria-label="Next"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:bg-slate-50 transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <p className="mt-3 text-center text-xs text-slate-400">
        Individual results vary. Images are for illustration purposes.
      </p>
    </section>
  );
}
