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

# Build-Time-Variablen: Beide Werte landen im ausgelieferten Bundle und
# müssen deshalb schon beim Build bekannt sein. Fehlt die GTM-ID, rendert
# gtm-script.tsx nichts; fehlt der reCAPTCHA-Site-Key, rendert
# spam-protection.tsx kein Skript. Der Build läuft in beiden Fällen durch -
# ohne Site-Key weist der Server aber jede Formulareinsendung ab, weil kein
# Token entsteht.
ARG NEXT_PUBLIC_GTM_ID=""
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY=""
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
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

# Ablage des Image-Optimizers. Muss im Image existieren und nextjs gehören,
# bevor hier ein Volume hängt: Docker übernimmt Rechte und Eigentümer des
# vorhandenen Pfades in ein frisches Volume. Fehlt das Verzeichnis, gehört
# der Mount-Punkt root und der Optimizer kann nichts schreiben - er
# transkodiert dann bei jedem Abruf neu, ohne dass etwas sichtbar bricht.
RUN mkdir -p /app/.next/cache/images && chown -R nextjs:nodejs /app/.next/cache

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
