/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  env: {
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
    NEXT_PUBLIC_PROJETO_URL: process.env.NEXT_PUBLIC_PROJETO_URL,
    NEXT_PUBLIC_PROJETO_ID_URL: process.env.NEXT_PUBLIC_PROJETO_ID_URL,
    NEXT_PUBLIC_GET_USER_INFO: process.env.NEXT_PUBLIC_GET_USER_INFO,
    NEXT_PUBLIC_GET_TRANSACTIONS: process.env.NEXT_PUBLIC_GET_TRANSACTIONS, 
    NEXT_PUBLIC_GERAR_PIX: process.env.NEXT_PUBLIC_GERAR_PIX,
    NEXT_PUBLIC_COMPRAR_TOKEN: process.env.NEXT_PUBLIC_COMPRAR_TOKEN, 
    NEXT_PUBLIC_REQUEST_LOGIN: process.env.NEXT_PUBLIC_REQUEST_LOGIN, 
    NEXT_PUBLIC_CADASTRAR_USER: process.env.NEXT_PUBLIC_CADASTRAR_USER, 
    NEXT_PUBLIC_GET_USER_CADASTRO: process.env.NEXT_PUBLIC_GET_USER_CADASTRO, 
    NEXT_PUBLIC_AUTH_LOGIN: process.env.NEXT_PUBLIC_AUTH_LOGIN, 
    NEXT_PUBLIC_UPLOAD_PROFILE_PHOTO: process.env.NEXT_PUBLIC_UPLOAD_PROFILE_PHOTO, 
    NEXT_PUBLIC_UPLOAD_BACKGROUND_PHOTO: process.env.NEXT_PUBLIC_UPLOAD_BACKGROUND_PHOTO, 
    NEXT_PUBLIC_CRIAR_PROJETO: process.env.NEXT_PUBLIC_CRIAR_PROJETO, 
    NEXT_PUBLIC_UPLOAD_BACKGROUND_PROJETO: process.env.NEXT_PUBLIC_UPLOAD_BACKGROUND_PROJETO, 
    NEXT_PUBLIC_UPLOAD_DOCUMENTS_PROJETO: process.env.NEXT_PUBLIC_UPLOAD_DOCUMENTS_PROJETO, 
    NEXT_PUBLIC_DELETE_PROJETO: process.env.NEXT_PUBLIC_DELETE_PROJETO, 
    NEXT_PUBLIC_UPDATE_PROJETO: process.env.NEXT_PUBLIC_UPDATE_PROJETO, 
    NEXT_PUBLIC_GET_EMISSOR: process.env.NEXT_PUBLIC_GET_EMISSOR, 
  },
  images: {
    domains: [
      "parsefiles.back4app.com",
      "testecoinlivre.s3.amazonaws.com",
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
