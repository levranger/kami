"use client";

import AppImage from "@/components/AppImage";

// Switch src values to Cloudinary public IDs (e.g. "kami/gallery-ipl-full-face")
// once NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set and images are uploaded.
const galleryItems = [
  { id: 1, area: "Upper Lip", label: "Laser Hair Removal", image: "gallery-laser-upper-lip_hfuwpt", altText: "Before and after laser hair removal results on upper lip area showing smooth, hair-free skin" },
  { id: 2, area: "Full Face", label: "IPL Photofacial", image: "gallery-ipl-full-face_lksa5x", altText: "Before and after IPL photofacial results on full face showing reduced sun damage and even skin tone" },
  { id: 3, area: "Jawline", label: "Dermal Fillers", image: "gallery-fillers-jawline_yqf3u0", altText: "Before and after dermal filler results on jawline showing improved contour and definition" },
  { id: 4, area: "Forehead", label: "Botox", image: "gallery-botox-forehead_xzau0g", altText: "Before and after Botox results on forehead showing smoothed wrinkles and natural expression" },
  { id: 5, area: "Arms", label: "Laser Hair Removal", image: "gallery-laser-arms_z10j9u", altText: "Before and after laser hair removal results on arms showing smooth, hair-free skin" },
  { id: 6, area: "Skin Texture", label: "ResurFX", image: "gallery-resurfx-skin-texture_dcdhrz", altText: "Before and after ResurFX fractional laser results showing improved skin texture and reduced scarring" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding bg-warm-white" aria-labelledby="gallery-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Real Results</span>
            <div className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2 id="gallery-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">Before &amp; After</h2>
          <p className="font-inter text-warm-gray mt-3 max-w-md mx-auto text-sm leading-relaxed">
            See the transformative results our clients experience with our premium treatments.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto" role="list" aria-label="Before and after treatment results gallery">
          {galleryItems.map((item) => (
            <figure key={item.id} className="relative rounded-sm overflow-hidden group" role="listitem">
              <div className="aspect-[4/3] relative">
                <AppImage src={item.image} alt={item.altText} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" loading="lazy" />
              </div>
              <figcaption className="bg-[#1A1A1A] px-4 py-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-playfair text-white text-sm font-semibold truncate">{item.area}</p>
                  <p className="font-inter text-gold text-[10px] tracking-wider uppercase truncate">{item.label}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0" aria-hidden="true">
                  <span className="font-inter text-[9px] tracking-wider uppercase text-white/70 border border-white/20 px-1.5 py-0.5 rounded-sm hidden sm:inline">Before</span>
                  <span className="font-inter text-[9px] tracking-wider uppercase text-white bg-gold/80 px-1.5 py-0.5 rounded-sm hidden sm:inline">After</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
