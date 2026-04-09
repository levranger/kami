/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow Cloudinary CDN as a remote image source.
    // next-cloudinary uses CldImage (built on next/image) so remotePatterns
    // must include res.cloudinary.com for Next's image optimizer to accept it.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      // Keep the existing CDN in case any images still reference it directly.
      { protocol: "https", hostname: "mgx-backend-cdn.metadl.com" },
    ],
  },
  async redirects() {
    return [
      // Trailing-slash canonical dedup for /services.
      // Handled here (not middleware) so it fires before any page render.
      // Note: permanent:true in Next.js config emits 308, not 301.
      // All other legacy redirects are handled in middleware.ts with true 301s.
      { source: "/services/", destination: "/services", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://res.cloudinary.com https://mgx-backend-cdn.metadl.com https://www.google-analytics.com https://www.googletagmanager.com",
              "font-src 'self'",
              "frame-src https://www.google.com https://www.googletagmanager.com https://book.squareup.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
