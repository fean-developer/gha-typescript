# Use uma imagem oficial do Node.js como a base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install 

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .


# Defina o entrypoint
ENTRYPOINT ["npm", "run", "build"]