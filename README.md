# weissteiner-automation.com

Die Webseite von Weissteiner Automation: Leistungsseiten, lokale Landingpages, Blog,
Kontaktformular und die Freebie-Guides hinter dem E-Mail-Opt-in.

Next.js 16 (App Router, React 19), TypeScript, Tailwind CSS 4. Blogartikel liegen als
Markdown in `_posts`, die Guide-Kapitel als MDX unter `src/content`. Strukturierte Daten
(Guide-Fortschritt) liegen in einer selbst gehosteten PocketBase-Instanz auf derselben
VPS, Newsletter-Anmeldungen und Transaktionsmails laufen über Brevo, Kontaktanfragen über
die Gmail API mit Service-Account.

## Lokal starten

```bash
nvm use            # Node-Version aus .nvmrc (24.x)
npm ci
cp .env.example .env.local
npm run dev
```

Läuft auf http://localhost:3000.

| Skript | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver (Turbopack) |
| `npm run build` | Produktionsbuild (`output: "standalone"`) |
| `npm run start` | Produktionsbuild lokal starten |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run sandcastle` | Agenten-Loop aus `.sandcastle` - Werkzeug für die Arbeit am Repository, nicht Teil der Webseite |

Ein Testframework gibt es bewusst nicht. Geprüft wird über Typecheck, Build und
Verhaltensprüfung der laufenden Anwendung von außen.

## Umgebungsvariablen

`.env.example` listet alle Variablen. Bis auf `NEXT_PUBLIC_GTM_ID` werden sie
ausschließlich zur Laufzeit gelesen (Route Handler, Server Components) und gehören
deshalb nicht in den Build und nicht ins Container-Image.

Echte Werte liegen in Dokploy. Weder das Repository noch die GitHub-Actions-Secrets
enthalten Anwendungs-Secrets - der CI-Build arbeitet mit Platzhaltern, weil er keine
echten Werte braucht. Wo welche Zugangsdaten liegen, steht in `docs/betrieb.md`.

`POCKETBASE_URL` ist die einzige Variable, deren Wert sich zwischen Produktion und
lokaler Entwicklung unterscheidet: in Produktion der Netz-Alias `http://pocketbase:8090`
im `dokploy-network`, lokal `http://127.0.0.1:8090` bei laufendem SSH-Tunnel
(`ssh -N -L 8090:127.0.0.1:8090 cwe-dokploy`). Eine öffentlich erreichbare Adresse hat
die Instanz nicht.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/app` | Routen, Seiten und Route Handler (`api/contact`, `api/auth/confirm`, `api/health`) |
| `src/app/_components` | Seiten- und UI-Komponenten inklusive Cookie-Consent |
| `src/lib` | Fachlogik, Konstanten, `cookie-config.ts` als einzige Quelle für Dienste und Cookies |
| `src/content/freebies` | MDX-Kapitel der Freebie-Guides |
| `_posts` | Blogartikel als Markdown mit Frontmatter |
| `public` | Bilder und statische Assets |
| `pocketbase` | Compose-Stack und Schema-Migrationen der PocketBase-Instanz |
| `docs/betrieb.md` | Wie die Webseite betrieben wird, und was im Störungsfall zu tun ist |
| `docs/adr` | Architekturentscheidungen |
| `docs/agents` | Arbeitsanweisungen für Agenten (Issue-Tracker, Triage, Domain-Layout) |
| `docs/plans` | Entwürfe und Runbooks einzelner Vorhaben |

Cookies und eingesetzte Drittanbieterdienste werden an genau einer Stelle gepflegt:
`src/lib/cookie-config.ts`. Der Cookie-Banner liest daraus. Wer einen Dienst hinzufügt
oder entfernt, pflegt diese Datei und gleicht die Datenschutzerklärung
(`src/app/datenschutz`) ab.

## Betrieb

Die Webseite läuft als Docker-Container auf einer eigenen Hostinger-VPS, betrieben von
Dokploy hinter Traefik. Gebaut wird ausschließlich in GitHub Actions, das Image liegt
privat in der GitHub Container Registry. Das bisherige Shared Hosting besteht als Rückweg
weiter.

**Betriebsmodell, beide Rollback-Wege, Zugangsdaten und der Prüfablauf stehen in
`docs/betrieb.md`.** Das ist die Anlaufstelle im Störungsfall.

Drei Workflows:

| Datei | Auslöser | Wirkung |
| --- | --- | --- |
| `ci.yml` | Push und Pull Request auf `main` | Typecheck und Build |
| `build-image.yml` | Push auf `main`, manuell | Image bauen, mit `sha-<commit>` taggen, nach GHCR pushen |
| `deploy.yml` | von `build-image.yml`, manuell | Image-Tag in Dokploy setzen, deployen, auf Abschluss warten |

Ein Merge nach `main` geht damit ohne Handgriff auf die VPS. Ein fehlgeschlagener Build
löst kein Deployment aus. In den Repository-Secrets liegt dafür nur ein Dokploy-API-Key,
kein SSH-Schlüssel.

**Rollback:** `deploy.yml` von Hand mit einem früheren Tag starten -
`gh workflow run deploy.yml -f image=ghcr.io/theaussie86/wa-website:sha-<commit>`. Ohne
Rebuild, solange der Tag in GHCR liegt (die letzten fünf Versionen). Deckt
Anwendungsfehler ab; für Plattform- und Serverfehler gibt es den DNS-Weg zurück auf das
Shared Hosting, siehe `docs/betrieb.md`.

Dazu gehören:

- `Dockerfile` - Multi-Stage-Build auf Basis des `standalone`-Outputs von Next.js.
- `NEXT_PUBLIC_GTM_ID` als einzige Build-Time-Variable, übergeben als Build-Argument.
- `/api/health` - reiner Liveness-Endpunkt ohne Prüfung von Fremdsystemen, in Dokploy als
  Gesundheitsprüfung hinterlegt.

Nach jedem größeren Eingriff prüft `./scripts/smoke-test.sh` die laufende Anwendung von
außen. Die Entscheidungen des Umzugs stehen in Issue #16, die Runbooks der einzelnen
Schritte in `docs/plans`.

## Beitragen

Aufgaben werden als GitHub Issues geführt, siehe `docs/agents/issue-tracker.md`.
Architekturentscheidungen landen als ADR in `docs/adr`.
