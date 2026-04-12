// Server-only. Never import this in a client component.
// Uses Google Places API (New) — Place Details endpoint.

export interface PlaceReview {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface PlaceData {
  name: string;
  rating: number;
  totalReviews: number;
  reviews: PlaceReview[];
  placeId: string;
}

const ENDPOINT = "https://places.googleapis.com/v1/places";
const FIELDS = "reviews,rating,userRatingCount,displayName";
const MAX_REVIEWS = 6;

export async function getGoogleReviews(): Promise<PlaceData | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_MAPS_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn("[google-reviews] Missing GOOGLE_MAPS_API_KEY or GOOGLE_MAPS_PLACE_ID");
    return null;
  }

  try {
    const res = await fetch(`${ENDPOINT}/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELDS,
      },
      // Revalidate once per day — avoids hitting quota on every request
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error(`[google-reviews] API error ${res.status}: ${await res.text()}`);
      return null;
    }

    const data = await res.json();

    const reviews: PlaceReview[] = (data.reviews ?? [])
      .slice(0, MAX_REVIEWS)
      .map((r: Record<string, unknown>) => ({
        author: (r.authorAttribution as { displayName?: string })?.displayName ?? "Google Reviewer",
        rating: typeof r.rating === "number" ? r.rating : 5,
        text: (r.text as { text?: string })?.text ?? "",
        relativeTime: typeof r.relativePublishTimeDescription === "string"
          ? r.relativePublishTimeDescription
          : "",
      }))
      .filter((r: PlaceReview) => r.text.length > 0);

    return {
      name: (data.displayName as { text?: string })?.text ?? "Kami Aesthetics",
      rating: typeof data.rating === "number" ? data.rating : 0,
      totalReviews: typeof data.userRatingCount === "number" ? data.userRatingCount : 0,
      reviews,
      placeId,
    };
  } catch (err) {
    console.error("[google-reviews] Fetch failed:", err);
    return null;
  }
}
