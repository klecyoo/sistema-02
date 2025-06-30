# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa de produção
FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY .env.example .env

EXPOSE 3000

CMD ["node", "dist/server.js"]