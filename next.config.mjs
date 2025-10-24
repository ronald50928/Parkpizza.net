/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Generate standalone output
  reactStrictMode: true,
  // Enable SWC minification for faster builds
  swcMinify: true,
}

export default nextConfig
