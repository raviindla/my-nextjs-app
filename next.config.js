// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allows Next.js to safely optimize and display images from Sanity
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;