FROM node:20-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

RUN node --trace-warnings

COPY ./ ./

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate

CMD \
  if [ -f package-lock.json ]; then npm run dev; \
  fi