/**
 * HeroImage — LCP-optimized image component.
 *
 * Use this ONLY for the primary above-the-fold image on a page.
 * It always sets `priority` and `fetchPriority="high"` so the browser
 * starts fetching it immediately, before JS executes.
 *
 * CldImage (used when Cloudinary is configured) is built on next/image and
 * generates real per-width srcset candidates via Cloudinary transformation
 * URLs. Each candidate is a distinct optimized file — not the same original
 * served at every breakpoint.
 *
 * GUARDRAILS:
 * - One HeroImage per page. Multiple `priority` images compete and hurt LCP.
 * - `sizes="100vw"` is correct for full-bleed heroes. Adjust if constrained.
 * - alt is required and must be descriptive — Google Image Search reads it.
 * - quality={85} is the sweet spot: visually lossless, meaningfully smaller.
 */

import Image, { type ImageProps } from "next/image";
import { CldImage } from "next-cloudinary";
import { cloudinaryEnabled } from "@/lib/cloudinary";

type HeroImageProps = Omit<ImageProps, "alt" | "priority" | "fetchPriority"> & {
  /** Required. Describe the scene — Google Image Search reads this. */
  alt: string;
};

export default function HeroImage({ src, alt, sizes = "100vw", ...rest }: HeroImageProps) {
  const isCldPublicId =
    cloudinaryEnabled &&
    typeof src === "string" &&
    !src.startsWith("/") &&
    !src.startsWith("http");

  if (isCldPublicId) {
    return (
      <CldImage
        src={src as string}
        alt={alt}
        sizes={sizes}
        format="auto"
        quality={85}
        priority
        fetchPriority="high"
        {...rest}
      />
    );
  }

  // Fallback: Next.js native optimization.
  // Works for local /public assets and remote URLs during dev or before
  // images are uploaded to Cloudinary.
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      priority
      fetchPriority="high"
      {...rest}
    />
  );
}
