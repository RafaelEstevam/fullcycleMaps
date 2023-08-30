FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "dev:local"]

EXPOSE 3000