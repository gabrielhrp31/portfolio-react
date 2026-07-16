/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
};

module.exports = nextConfig;
