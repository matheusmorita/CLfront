#Creates a layer from node:alpine image.
FROM node:alpine

#Creates directories
RUN mkdir -p /usr/src/app

#Sets an environment variable
ENV PORT 3033
ENV NEXT_PUBLIC_SOCKET_URL=https://api.coinlivre.com.br/
ENV NEXT_PUBLIC_PROJETO_URL=https://api.coinlivre.com.br/projeto/retornar?
ENV NEXT_PUBLIC_PROJETO_ID_URL=https://api.coinlivre.com.br/projeto/retornar/
ENV NEXT_PUBLIC_GET_USER_INFO=https://api.coinlivre.com.br/usuario/getUserInfo/
ENV NEXT_PUBLIC_GET_TRANSACTIONS=https://api.coinlivre.com.br/token/findTransactions/
ENV NEXT_PUBLIC_GERAR_PIX=https://api.coinlivre.com.br/token/criar-ordem-pix/
ENV NEXT_PUBLIC_COMPRAR_TOKEN=https://api.coinlivre.com.br/token/comprar-token/
ENV NEXT_PUBLIC_REQUEST_LOGIN=https://api.coinlivre.com.br/usuario/requestLogin/
ENV NEXT_PUBLIC_CADASTRAR_USER=https://api.coinlivre.com.br/usuario/cadastrarUser/
ENV NEXT_PUBLIC_GET_USER_CADASTRO=https://api.coinlivre.com.br/usuario/getUserCadastro/
ENV NEXT_PUBLIC_AUTH_LOGIN=https://greg-api.blocklize.io/auth/login
ENV NEXT_PUBLIC_UPLOAD_PROFILE_PHOTO=https://api.coinlivre.com.br/usuario/upload-foto/
ENV NEXT_PUBLIC_UPLOAD_DOCUMENTS_PROJETO=https://api.coinlivre.com.br/projeto/uploadFilesProjeto
ENV NEXT_PUBLIC_UPLOAD_BACKGROUND_PHOTO=https://api.coinlivre.com.br/usuario/upload-foto-background
ENV NEXT_PUBLIC_CRIAR_PROJETO=https://api.coinlivre.com.br/projeto/criarProjeto
ENV NEXT_PUBLIC_UPLOAD_BACKGROUND_PROJETO=https://api.coinlivre.com.br/projeto/uploadBackgroundProjeto

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /usr/src/app

#Copy new files or directories into the filesystem of the container
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

#Execute commands in a new layer on top of the current image and commit the results
RUN npm install

##Copy new files or directories into the filesystem of the container
COPY . /usr/src/app

#Execute commands in a new layer on top of the current image and commit the results
RUN npm run build

#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3033

#Allows you to configure a container that will run as an executable
ENTRYPOINT ["npm", "run", "start"]
