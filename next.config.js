/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/inicio", destination: "/", permanent: true },
    ];
  },
};

module.exports = nextConfig;
