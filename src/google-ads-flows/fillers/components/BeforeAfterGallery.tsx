import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  { id: "lips-1", area: "Lips", beforeImage: "/images/fillers/lips-before.webp", afterImage: "/images/fillers/lips-after.webp", timeline: "Results shown at 2-week follow-up", testimonial: "My lips look fuller but still natural." },
  { id: "cheeks-1", area: "Cheeks", beforeImage: "/images/fillers/cheeks-before.webp", afterImage: "/images/fillers/cheeks-after.webp", timeline: "Results shown at follow-up", testimonial: "I love the subtle lift it gave my face." },
  { id: "jawline-1", area: "Jawline", beforeImage: "/images/fillers/jawline-before.webp", afterImage: "/images/fillers/jawline-after.webp", timeline: "Results shown at follow-up", testimonial: "My profile looks so much more balanced." },
];

export function BeforeAfterGallery() {
  const [idx, setIdx] = useState(0);
  const item = galleryItems[idx];

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h3 className="mb-4 text-center text-lg font-bold text-slate-900">Before & After</h3>
      <div className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-center text-sm font-medium text-rose-700">{item.area}</p>
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100"><div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">Before</div></div>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100"><div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">After</div></div>
        </div>
        <p className="mb-1 text-center text-xs text-slate-500">{item.timeline}</p>
        <p className="mb-3 text-center text-sm italic text-slate-600">"{item.testimonial}"</p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setIdx((i) => (i - 1 + galleryItems.length) % galleryItems.length)} aria-label="Previous" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:bg-slate-50"><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-xs text-slate-400">{idx + 1} / {galleryItems.length}</span>
          <button onClick={() => setIdx((i) => (i + 1) % galleryItems.length)} aria-label="Next" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:bg-slate-50"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">Individual results vary. Images are placeholders for approved patient photos.</p>
    </section>
  );
}