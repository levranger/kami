import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BeforeAfterImage } from "../types/booking";

const galleryItems: BeforeAfterImage[] = [
  {
    id: "forehead-1",
    concern: "Forehead Lines",
    beforeImage: "/images/botox/forehead-before.webp",
    afterImage: "/images/botox/forehead-after.webp",
    timeline: "Results shown after follow-up",
    testimonial: "I still looked like myself—just more rested.",
  },
  {
    id: "frown-1",
    concern: "Frown Lines",
    beforeImage: "/images/botox/frown-before.webp",
    afterImage: "/images/botox/frown-after.webp",
    timeline: "Results shown at 2-week follow-up",
    testimonial: "People keep telling me I look refreshed.",
  },
  {
    id: "crows-1",
    concern: "Crow's Feet",
    beforeImage: "/images/botox/crows-before.webp",
    afterImage: "/images/botox/crows-after.webp",
    timeline: "Results shown after follow-up",
    testimonial: "My smile lines are so much softer now.",
  },
];

export function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const item = galleryItems[currentIndex];

  function next() {
    setCurrentIndex((i) => (i + 1) % galleryItems.length);
  }

  function prev() {
    setCurrentIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h3 className="mb-4 text-center text-lg font-bold text-slate-900">Before & After</h3>

      <div className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* Area Label */}
        <p className="mb-2 text-center text-sm font-medium text-amber-700">{item.concern}</p>

        {/* Image Comparison */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
            <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
              Before
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
            <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
              After
            </div>
          </div>
        </div>

        {/* Timeline */}
        <p className="mb-1 text-center text-xs text-slate-500">{item.timeline}</p>

        {/* Testimonial */}
        <p className="mb-3 text-center text-sm italic text-slate-600">"{item.testimonial}"</p>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 transition hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs text-slate-400">
            {currentIndex + 1} / {galleryItems.length}
          </span>
          <button
            onClick={next}
            aria-label="Next"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 transition hover:bg-slate-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        Individual results vary. Images are placeholders for approved patient photos.
      </p>
    </section>
  );
}