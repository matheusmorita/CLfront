/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PROJETO_URL: 'https://coinlivre.blocklize.io/projeto/retornar?',
    PROJETO_ID_URL: 'https://coinlivre.blocklize.io/projeto/retornar/',
    GET_USER_INFO: 'https://coinlivre.blocklize.io/usuario/getUserInfo/',
    GET_TRANSACTIONS: 'https://coinlivre.blocklize.io/token/findTransactions/',
    GERAR_PIX: 'https://coinlivre.blocklize.io/token/criar-ordem-pix/',
    COMPRAR_TOKEN: 'https://coinlivre.blocklize.io/token/comprar-token/',
  },
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
