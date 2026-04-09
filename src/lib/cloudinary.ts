/**
 * Cloudinary delivery configuration.
 *
 * Required environment variables:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME  — your Cloudinary cloud name (public, safe to expose)
 *
 * No upload key or API secret is needed for delivery-only usage.
 * Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local (dev) and your hosting env (prod).
 *
 * Public IDs follow the convention:  kami/<asset-name>
 * e.g.  kami/hero-main
 *       kami/gallery-ipl-full-face
 */

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!CLOUDINARY_CLOUD_NAME && typeof window === "undefined") {
  // Warn at build time, not at runtime in the browser.
  console.warn(
    "[cloudinary] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set. " +
      "Images will fall back to Next.js native optimization."
  );
}

/** True when Cloudinary is properly configured. */
export const cloudinaryEnabled = Boolean(CLOUDINARY_CLOUD_NAME);

/**
 * Responsive width breakpoints used across the app.
 * Cloudinary generates a real, distinct transformed file for each width —
 * no fake srcset where every candidate points to the same original.
 */
export const HERO_WIDTHS = [640, 1080, 1440, 1920] as const;
export const CONTENT_WIDTHS = [320, 640, 960, 1280] as const;
