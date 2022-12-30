FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install


COPY . .

EXPOSE 5000
CMD ["node", "app.js"]