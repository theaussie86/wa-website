# syntax=docker/dockerfile:1

# Multi-Stage-Build: Dependencies, Build, schlanker Runner.
# Node-Version folgt engines/.nvmrc. Alpine/musl, damit die optionalen
# nativen Abhängigkeiten (sharp, @next/swc) für die Zielplattform
# installiert werden statt vom Host zu stammen.

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Einzige Build-Time-Variable: Die GTM-ID landet im ausgelieferten Bundle
# und muss deshalb schon beim Build bekannt sein. Fehlt sie, rendert
# gtm-script.tsx nichts und der Build läuft trotzdem durch.
ARG NEXT_PUBLIC_GTM_ID=""
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# Nur Laufzeit-Artefakte: Standalone-Server (inkl. der tatsächlich
# benötigten node_modules), statische Assets, public und die MDX-Quellen
# für Blogrouten, die zur Laufzeit gerendert werden.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/_posts ./_posts
COPY --from=builder --chown=nextjs:nodejs /app/src/content ./src/content
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
