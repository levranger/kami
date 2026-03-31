import { Star } from "lucide-react";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="section-padding bg-white" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Client Love</span>
            <div className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2 id="testimonials-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">What Our Clients Say</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 3).map((t) => <TestimonialCard key={t.name} testimonial={t} />)}
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          {testimonials.slice(3, 5).map((t) => <TestimonialCard key={t.name} testimonial={t} />)}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: { name: string; rating: number; text: string; treatment: string } }) {
  return (
    <article className="bg-warm-white border border-warm-border p-8 rounded-sm hover-lift" aria-label={`Review by ${testimonial.name} for ${testimonial.treatment}`}>
      <div className="flex gap-0.5 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
        ))}
      </div>
      <blockquote>
        <p className="font-inter text-sm text-[#1A1A1A] leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
      </blockquote>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-inter text-sm font-semibold text-[#1A1A1A]">{testimonial.name}</p>
          <p className="font-inter text-xs text-warm-gray mt-0.5">{testimonial.treatment}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center" aria-hidden="true">
          <span className="font-playfair text-gold text-sm font-semibold">{testimonial.name.charAt(0)}</span>
        </div>
      </div>
    </article>
  );
}
