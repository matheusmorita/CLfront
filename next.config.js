/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  env: {
    PROJETO_URL: 'https://coinlivre.blocklize.io/projeto/retornar?',
    PROJETO_ID_URL: 'https://coinlivre.blocklize.io/projeto/retornar/',
    GET_USER_INFO: 'https://coinlivre.blocklize.io/usuario/getUserInfo/',
    GET_TRANSACTIONS: 'https://coinlivre.blocklize.io/token/findTransactions/',
    GERAR_PIX: 'https://coinlivre.blocklize.io/token/criar-ordem-pix/',
    COMPRAR_TOKEN: 'https://coinlivre.blocklize.io/token/comprar-token/',
    REQUEST_LOGIN: 'https://coinlivre.blocklize.io/usuario/requestLogin/', 
    CADASTRAR_USER: 'https://coinlivre.blocklize.io/usuario/cadastrarUser/',
    GET_USER_CADASTRO: 'https://coinlivre.blocklize.io/usuario/getUserCadastro/',
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  i18n,
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
