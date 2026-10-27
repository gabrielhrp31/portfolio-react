/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // Keep headroom for admin image uploads (portfolio / site media).
    serverActions: {
      bodySizeLimit: "10mb",
    },
    serverComponentsExternalPackages: ["pdfkit"],
  },
  serverExternalPackages: ["pdfkit"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Cap at 1200 — hero/services use sizes max 1200px (desktop PageSpeed).
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [64, 96, 128, 256, 384],
    // Remote hosts are rendered with unoptimized next/image (see OptimizedImage).
    // Local /assets and /uploads go through the built-in AVIF/WebP optimizer.
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

module.exports = nextConfig;
