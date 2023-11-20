FROM node

WORKDIR /app/

COPY package.json .

COPY . .

RUN npm install express

EXPOSE 8000

CMD ["node", "app.js"]