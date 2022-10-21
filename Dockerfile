# # ! ## ESTAGIO 01 - Maquina com dependencias do angular 
FROM node:16.18.0-buster as angular-cli

RUN npm install -g npm@8.19.2
RUN yarn global add @angular/cli@14.1.0 
RUN yarn global add @angular/core@14.1.0

RUN ng version

# # ! ## ESTAGIO 02 - Maquina para armazenar as dependencias 
FROM angular-cli as environment-angular-dependences

# ## Configurando variáveis de Ambiente
ENV APP_HOME=/app
# ENV NODE_ENV=production

# # ## diretorio de trabalho
WORKDIR "$APP_HOME"

# # ## copia a aplicacao para dentro da maquina
COPY package.json .
# COPY package-lock.json .

# # ## baixa as dependencias
RUN yarn install --frozen-lockfile
# RUN npm install --save-exact

COPY ./ ./

# # ! ## ESTAGIO 03 - Maquina para armazenasr as dependencias 
FROM environment-angular-dependences as environment-angular-build

# ## Configurando variáveis de Ambiente
ENV APP_HOME=/app
# ENV NODE_ENV=production

# # ## diretorio de trabalho
WORKDIR "$APP_HOME"

RUN npm run build