FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Criar diretório para o banco de dados
RUN mkdir -p database

EXPOSE 8080

CMD ["node", "app.js"]