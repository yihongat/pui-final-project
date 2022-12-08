/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/pui-final-project",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ggpht.com",
      },
    ],
  },
};

module.exports = nextConfig;
