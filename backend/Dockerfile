FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose backend port
EXPOSE 8888

# Run migrations first, then start server
CMD ["sh", "-c", "npx knex migrate:latest --knexfile knexfile.cjs && node ./server.js"]
