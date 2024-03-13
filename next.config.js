/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.bmit.co.kr", "file.o-lens.com", "lenstown.co.kr"],
  },
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = nextConfig;
