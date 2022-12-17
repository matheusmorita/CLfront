/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["pt-BR"],
    defaultLocale: "pt-BR",
  },
  images: {
    domains: ["parsefiles.back4app.com"]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/quem-somos',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
