/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  env: {
    NEXT_PUBLIC_SOCKET_URL: "https://coinlivre.blocklize.io/",
    NEXT_PUBLIC_PROJETO_URL: "https://coinlivre.blocklize.io/projeto/retornar?",
    NEXT_PUBLIC_PROJETO_ID_URL: "https://coinlivre.blocklize.io/projeto/retornar/",
    NEXT_PUBLIC_GET_USER_INFO: "https://coinlivre.blocklize.io/usuario/getUserInfo/",
    NEXT_PUBLIC_GET_TRANSACTIONS: "https://coinlivre.blocklize.io/token/findTransactions/",
    NEXT_PUBLIC_GERAR_PIX: "https://coinlivre.blocklize.io/token/criar-ordem-pix/",
    NEXT_PUBLIC_COMPRAR_TOKEN: "https://coinlivre.blocklize.io/token/comprar-token/",
    NEXT_PUBLIC_REQUEST_LOGIN: "https://coinlivre.blocklize.io/usuario/requestLogin/",
    NEXT_PUBLIC_CADASTRAR_USER: "https://coinlivre.blocklize.io/usuario/cadastrarUser/",
    NEXT_PUBLIC_GET_USER_CADASTRO: "https://coinlivre.blocklize.io/usuario/getUserCadastro/",
    NEXT_PUBLIC_AUTH_LOGIN: "https://greg.blocklize.io/auth/login",
    NEXT_PUBLIC_UPLOAD_PROFILE_PHOTO: "https://coinlivre.blocklize.io/usuario/upload-foto/",
    NEXT_PUBLIC_UPLOAD_BACKGROUND_PHOTO: "https://coinlivre.blocklize.io/usuario/upload-foto-background/",
    NEXT_PUBLIC_CRIAR_PROJETO: "https://coinlivre.blocklize.io/projeto/criarProjeto",
    NEXT_PUBLIC_UPLOAD_BACKGROUND_PROJETO: "https://coinlivre.blocklize.io/projeto/uploadBackgroundProjeto",
    NEXT_PUBLIC_UPLOAD_DOCUMENTS_PROJETO: "https://coinlivre.blocklize.io/projeto/uploadFilesProjeto",
    NEXT_PUBLIC_DELETE_PROJETO: "https://coinlivre.blocklize.io/projeto/deletar/",
    NEXT_PUBLIC_UPDATE_PROJETO: "https://coinlivre.blocklize.io/projeto/atualizar/",
    NEXT_PUBLIC_GET_EMISSOR: "https://coinlivre.blocklize.io/emissor/retornar?limit=",
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
