FROM node:alpine

WORKDIR /app

EXPOSE 4000

COPY package*.json ./

RUN npm i @nestjs/swagger --legacy-peer-deps

COPY . .

CMD ["npm", "run", "start:dev"]