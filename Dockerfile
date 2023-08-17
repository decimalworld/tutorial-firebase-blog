FROM node:18-alpine

WORKDIR /app/
RUN npm i -gy @vue/cli
COPY ./package*.json /app/
RUN npm install

EXPOSE 8080
