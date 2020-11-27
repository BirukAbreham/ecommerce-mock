FROM node:stretch-slim

WORKDIR /home/biruk/Desktop/Gebeya/ecommerce-mock

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]
