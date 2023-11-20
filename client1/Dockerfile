FROM node

WORKDIR /app/

COPY package.json .

COPY . .

RUN npm install express

EXPOSE 8001

CMD ["node", "client.js"]