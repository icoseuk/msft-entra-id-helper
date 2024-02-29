# Stage 1: Build the project
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production

COPY . .
RUN npm run build

# Stage 2: Create the final image
FROM node:20-alpine AS final

WORKDIR /app

COPY --from=builder /app/build/make-token.js ./build/make-token.js

CMD ["node", "./build/make-token.js"]