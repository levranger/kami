"use client";

/**
 * AppImage — migration-friendly wrapper around CldImage / next/image.
 *
 * Drop-in replacement for `import Image from "next/image"`:
 *   import AppImage from "@/components/AppImage"
 *   <Image ... />  →  <AppImage ... />
 *
 * When NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set, images are delivered via
 * Cloudinary's CDN. CldImage is built on top of next/image, so it respects
 * `sizes` and generates real per-width srcset candidates via Cloudinary
 * transformation URLs — not fake srcset pointing to the same original file.
 *
 * When the env var is not set, falls back to Next.js native <Image>.
 *
 * GUARDRAILS:
 * - `alt` is required. Pass alt="" only for genuinely decorative images.
 * - Never pass `priority` here unless the image is the LCP element.
 *   Use <HeroImage> for LCP images instead.
 * - `sizes` should accurately reflect the rendered layout width.
 */

import Image, { type ImageProps } from "next/image";
import { CldImage } from "next-cloudinary";
import { cloudinaryEnabled } from "@/lib/cloudinary";

export type { ImageProps };

type AppImageProps = Omit<ImageProps, "alt"> & {
  /** Required. Pass "" only for decorative images that convey no information. */
  alt: string;
};

export default function AppImage({ src, alt, sizes, ...rest }: AppImageProps) {
  // Use Cloudinary when configured and src is a public ID (no leading slash or protocol).
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
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        // Cloudinary auto-selects WebP/AVIF based on the browser's Accept header.
        format="auto"
        quality="auto"
        {...rest}
      />
    );
  }

  return <Image src={src} alt={alt} sizes={sizes} {...rest} />;
}
