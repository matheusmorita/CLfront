/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const env = require('./.env');

const nextConfig = {
  env,
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: [
      "parsefiles.back4app.com",
      "testecoinlivre.s3.amazonaws.com"
    ],
  },
  async redirects() {
    return [
      {
        source: '/quem-somos',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
