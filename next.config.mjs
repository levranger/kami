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
};

export default nextConfig;
