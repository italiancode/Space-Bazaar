/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'space-bazaar.vercel.app',
      'shop.spacex.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'space-bazaar.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shop.spacex.com',
        port: '',
        pathname: '/cdn/**',
      }
    ],
  },
}

module.exports = nextConfig 