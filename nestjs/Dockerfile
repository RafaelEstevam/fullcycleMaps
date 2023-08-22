# FROM node:20-slim

# WORKDIR /home/node/app

# USER node

# COPY . /home/node/app/

# CMD [ "tail", "-f", "/dev/null" ]

# EXPOSE 4000

FROM node:20-slim
WORKDIR /home/node/app
COPY . .
RUN apt-get update -y
RUN apt-get install -y openssl
RUN npm install
CMD ["npm", "run", "start:dev"]
EXPOSE 4000