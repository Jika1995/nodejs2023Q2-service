FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:dev"]