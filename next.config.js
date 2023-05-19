/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["en-US", "fr"],
    defaultLocale: "en-US",
    localeDetection: true,
  },
  images: {
    domains: ["freesvg.org", "res.cloudinary.com"],
  }
};

module.exports = nextConfig;
