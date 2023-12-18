/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ["image.bmit.co.kr", "file.o-lens.com", "lenstown.co.kr"],
  },
};

module.exports = nextConfig;
