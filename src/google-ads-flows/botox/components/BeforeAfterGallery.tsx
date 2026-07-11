"use client";

import { useState, useRef, useCallback } from "react";

const slides = [
  {
    id: "forehead-1",
    concern: "Forehead Lines",
    beforeImage: "https://res.cloudinary.com/dnuxtgg11/image/upload/v1783740366/botox-before_oswgjh.png",
    afterImage: "https://res.cloudinary.com/dnuxtgg11/image/upload/v1783740366/botox-after_hegcpm.png",
    testimonial: "I still looked like myself — just more rested.",
  },
];

export function BeforeAfterGallery() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleDrag = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPosition(pct);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp   = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging.current) handleDrag(e.clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { if (e.touches[0]) handleDrag(e.touches[0].clientX); };

  const slide = slides[0];

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h3 className="mb-4 text-center text-lg font-bold text-slate-900">Before &amp; After</h3>

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl cursor-ew-resize bg-slate-100 select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        role="slider"
        aria-label={`Before and after comparison for ${slide.concern}. Drag to compare.`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
      >
        {/* After — full size, sits behind */}
        <img
          src={slide.afterImage}
          alt={`After Botox treatment — ${slide.concern}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />

        {/* Before — clipped from the right */}
        <img
          src={slide.beforeImage}
          alt={`Before Botox treatment — ${slide.concern}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          loading="lazy"
          draggable={false}
        />

        {/* Divider handle */}
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
        <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded">
          Before
        </div>
        <div className="absolute top-3 right-3 bg-amber-700/80 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded">
          After
        </div>
      </div>

      {/* Caption */}
      <div className="mt-3 text-center">
        <p className="text-sm font-medium text-amber-700">{slide.concern}</p>
        <p className="mt-1 text-sm italic text-slate-600">&ldquo;{slide.testimonial}&rdquo;</p>
      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        Individual results vary. Images are for illustration purposes.
      </p>
    </section>
  );
}
