import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.near.social',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow any hostname for development
        port: '',
        pathname: '**',
      }
    ],
    domains: ['ipfs.near.social'],
  },
  // Enable static image imports
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/i,
      type: 'asset/resource'
    });
    return config;
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  }
};

export default nextConfig;
