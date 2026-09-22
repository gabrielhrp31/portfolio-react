# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app
# Cap Node heap so npm ci is less likely to OOM-kill a small VPS.
ENV NODE_OPTIONS=--max-old-space-size=1536
ENV npm_config_fund=false
ENV npm_config_audit=false
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
# Cap Node heap so the Next.js build is less likely to OOM-kill a small VPS.
ENV NODE_OPTIONS=--max-old-space-size=1536
ENV npm_config_fund=false
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache su-exec \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Uploads persist via volume mount in compose. Entrypoint chowns the mount
# at container start (image chown alone is hidden by the volume).
RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public/uploads
COPY scripts/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "server.js"]
