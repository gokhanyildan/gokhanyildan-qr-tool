/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Optimization for Docker
  // This reduces the image size significantly by tracing dependencies
  output: 'standalone',

  // 2. Your subdirectory setup
  // All assets and routes will be prefixed with /qr-generator
  basePath: '/qr-generator',

  // 3. The Redirect Logic
  async redirects() {
    return [
      {
        source: '/',
        destination: '/qr-generator',
        permanent: true, // true = 301 (SEO friendly), false = 307 (Temporary)
        basePath: false, // ⚠️ CRITICAL: This tells Next.js to match the actual domain root, not /qr-generator/
      },
    ]
  },
};

export default nextConfig;