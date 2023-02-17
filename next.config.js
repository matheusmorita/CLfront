/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["pt-BR", 'en-US'],
    defaultLocale: "pt-BR",
  },
  images: {
    domains: ["parsefiles.back4app.com"],
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
