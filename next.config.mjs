/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for S3/CloudFront
  output: 'export',
  images: {
    // Next/Image optimization is disabled for export
    unoptimized: true,
  },
}

export default nextConfig

