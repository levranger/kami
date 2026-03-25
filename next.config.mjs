/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mgx-backend-cdn.metadl.com",
      },
    ],
  },
};

export default nextConfig;
