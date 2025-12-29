/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Your subdirectory setup
  basePath: '/qr-generator',

  // 2. The Redirect Logic
  async redirects() {
    return [
      {
        source: '/',
        destination: '/qr-generator',
        permanent: true, // Set to false if you are still testing
        basePath: false, // ⚠️ CRITICAL: This tells Next.js to match the actual domain root, not /qr-generator/
      },
    ]
  },
};

export default nextConfig;