# Servizio PDF su Railway (Playwright + Chromium già nell'immagine base)
FROM mcr.microsoft.com/playwright:v1.49.1-noble

WORKDIR /app

COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/web/package.json ./apps/web/
COPY services/pdf/package.json ./services/pdf/

RUN npm install

COPY tsconfig.base.json ./
COPY packages/shared ./packages/shared
COPY services/pdf ./services/pdf

RUN npm run build -w @allegato-a1/shared
RUN npm run build -w @allegato-a1/pdf-service

ENV NODE_ENV=production
WORKDIR /app/services/pdf

EXPOSE 8787

CMD ["node", "dist/index.js"]
