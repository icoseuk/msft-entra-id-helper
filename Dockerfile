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

COPY --from=builder /app/build/app.js ./srv/app.js

EXPOSE 8888

LABEL org.opencontainers.image.source=https://github.com/icoseuk/msft-entra-id-helper
LABEL org.opencontainers.image.description="A simple service to help with Microsoft Entra ID certificate-based authentication."
LABEL org.opencontainers.image.authors="ICOSE Ltd."

CMD ["node", "./srv/app.js"]