import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BeforeAfterSlide } from "../types/booking";

const slides: BeforeAfterSlide[] = [
  {
    id: "underarms-1",
    area: "Underarms",
    beforeImage: "https://res.cloudinary.com/dnuxtgg11/image/upload/v1783737588/lhr1_zfimfu.jpg",
    afterImage: "https://res.cloudinary.com/dnuxtgg11/image/upload/v1783737590/lhr2_tvowku.jpg",
    testimonial: "Noticeably smoother after completing my treatment plan.",
  },
];

export default function BeforeAfterSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleDrag = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleDrag(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDrag(e.touches[0].clientX);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <div className="w-full" aria-label="Before and after treatment results">
      {/* Slider */}
      <div
        ref={sliderRef}
        className="ba-slider relative aspect-[4/3] rounded-sm overflow-hidden cursor-ew-resize bg-gray-100"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        role="slider"
        aria-label={`Before and after comparison for ${slide.area}. Drag to compare.`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
      >
        {/* After — full size, sits behind */}
        <img
          src={slide.afterImage}
          alt={`After laser hair removal treatment on ${slide.area}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />

        {/* Before — same full size, clipped from the right by clip-path.
            Both images are identical dimensions; only the reveal changes. */}
        <img
          src={slide.beforeImage}
          alt={`Before laser hair removal treatment on ${slide.area}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          loading="lazy"
          draggable={false}
        />

        {/* Handle */}
        <div
          className="ba-slider__handle"
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
        <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-inter tracking-wider uppercase px-2 py-1 rounded-sm">
          Before
        </div>
        <div className="absolute top-3 right-3 bg-gold/80 text-white text-[10px] font-inter tracking-wider uppercase px-2 py-1 rounded-sm">
          After
        </div>
      </div>

      {/* Controls + Testimonial */}
      <div className="mt-4 flex items-center justify-between">
        {slides.length > 1 && (
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors"
            aria-label="Previous before and after example"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        <div className="text-center flex-1 px-4">
          <p className="font-inter text-sm text-white/80 italic">
            &ldquo;{slide.testimonial}&rdquo;
          </p>
          <p className="font-inter text-xs text-gold mt-1">{slide.area}</p>
        </div>

        {slides.length > 1 && (
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors"
            aria-label="Next before and after example"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-3" aria-hidden="true">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentSlide ? "bg-gold" : "bg-white/30"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p className="font-inter text-[10px] text-white/40 text-center mt-3">
        Individual results vary. Images are for illustration purposes.
      </p>
    </div>
  );
}