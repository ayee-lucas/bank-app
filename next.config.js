/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };

    return config;
  },

  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    serverActions: true,
  },
};

module.exports = nextConfig;
