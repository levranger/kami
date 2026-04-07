/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mgx-backend-cdn.metadl.com",
      },
    ],
  },
  async redirects() {
    return [
      // General pages
      { source: "/services/", destination: "/services", permanent: true },
      { source: "/home-page/", destination: "/", permanent: true },
      { source: "/faq/", destination: "/", permanent: true },
      { source: "/about-kami-laser/", destination: "/", permanent: true },
      { source: "/candidate-quiz/", destination: "/", permanent: true },
      { source: "/how-it-works/", destination: "/services/laser-hair-removal", permanent: true },
      { source: "/types-of-hair-removal/", destination: "/services/laser-hair-removal", permanent: true },

      // Service area pages
      { source: "/services_lazer/stomach/", destination: "/services/laser-hair-removal", permanent: true },
      { source: "/services_lazer/nail-fungus/", destination: "/services/laser-hair-removal", permanent: true },
      { source: "/services_lazer/legs/", destination: "/services/laser-hair-removal", permanent: true },
      { source: "/services_lazer/underarms/", destination: "/services/laser-hair-removal", permanent: true },
      { source: "/services_lazer/full-face/", destination: "/services/laser-hair-removal", permanent: true },
      { source: "/services_lazer/bikini/", destination: "/services/laser-hair-removal", permanent: true },
      { source: "/services_lazer/chest/", destination: "/services/laser-hair-removal", permanent: true },
      { source: "/services_lazer/buttocks/", destination: "/services/laser-hair-removal", permanent: true },
      { source: "/services_lazer/back/", destination: "/services/laser-hair-removal", permanent: true },
      { source: "/services_lazer/arms/", destination: "/services/laser-hair-removal", permanent: true },

      // Old blog articles
      { source: "/laser_hair_removal/laser-hair-removal-tailored-for-bodybuilders/", destination: "/blog", permanent: true },
      { source: "/laser_hair_removal/laser-hair-removal-for-hidradenitis-suppurativa/", destination: "/blog", permanent: true },
      { source: "/laser_hair_removal/laser-hair-removal-for-pilonidal-cysts/", destination: "/blog", permanent: true },
      { source: "/laser_hair_removal/laser-hair-removal-for-transgender-clients/", destination: "/blog", permanent: true },
      { source: "/laser_hair_removal/laser-hair-removal-for-folliculitis/", destination: "/blog", permanent: true },
      { source: "/laser_hair_removal/laser-hair-removal-for-brown-skin/", destination: "/blog", permanent: true },
      { source: "/laser_hair_removal/laser-hair-removal-for-active-lifestyle/", destination: "/blog", permanent: true },
      { source: "/laser_hair_removal/laser-hair-removal-for-amputees/", destination: "/blog", permanent: true },
      { source: "/laser_hair_removal/at-home-laser-hair-removal-weighing-the-pros-and-cons/", destination: "/blog", permanent: true },

      // Language catch-alls (after specific rules)
      { source: "/ru/:path*", destination: "/", permanent: true },
      { source: "/es/:path*", destination: "/", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:lang(ru|es)/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
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
              "img-src 'self' data: blob: https://mgx-backend-cdn.metadl.com https://www.google-analytics.com https://www.googletagmanager.com",
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
