import { Star } from "lucide-react";
import type { PlaceData } from "@/lib/google-reviews";

export default function Testimonials({ place }: { place: PlaceData | null }) {
  if (!place || place.reviews.length === 0) return null;

  const rows = [place.reviews.slice(0, 3), place.reviews.slice(3, 6)];

  return (
    <section className="section-padding bg-white" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Client Love</span>
            <div className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2 id="testimonials-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            What Our Clients Say
          </h2>
          {place.rating > 0 && (
            <p className="font-inter text-sm text-warm-gray mt-3">
              <span className="font-semibold text-[#1A1A1A]">{place.rating.toFixed(1)}</span> stars ·{" "}
              {place.totalReviews.toLocaleString()} Google reviews
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {rows[0].map((r) => <ReviewCard key={r.author + r.text.slice(0, 20)} review={r} />)}
        </div>
        {rows[1].length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
            {rows[1].map((r) => <ReviewCard key={r.author + r.text.slice(0, 20)} review={r} />)}
          </div>
        )}

        {/* Google review CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <a
            href={`https://search.google.com/local/reviews?placeid=${place.placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            data-track="directions_click"
            data-track-location="reviews_section"
            className="font-inter text-sm font-medium text-[#1A1A1A] hover:text-gold transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            See all {place.totalReviews} reviews on Google
          </a>
          <span className="hidden sm:block text-warm-border">·</span>
          <a
            href={`https://search.google.com/local/writereview?placeid=${place.placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-sm text-warm-gray hover:text-gold transition-colors duration-200"
          >
            Leave us a review ✦
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: { author: string; rating: number; text: string; relativeTime: string } }) {
  return (
    <article
      className="bg-warm-white border border-warm-border p-8 rounded-sm hover-lift"
      aria-label={`Review by ${review.author}`}
    >
      <div className="flex gap-0.5 mb-4" role="img" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
        ))}
      </div>
      <blockquote>
        <p className="font-inter text-sm text-[#1A1A1A] leading-relaxed mb-6">&ldquo;{review.text}&rdquo;</p>
      </blockquote>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-inter text-sm font-semibold text-[#1A1A1A]">{review.author}</p>
          {review.relativeTime && (
            <p className="font-inter text-xs text-warm-gray mt-0.5">{review.relativeTime}</p>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center" aria-hidden="true">
          <span className="font-playfair text-gold text-sm font-semibold">{review.author.charAt(0)}</span>
        </div>
      </div>
    </article>
  );
}
