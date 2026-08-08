# weissteiner-automation.com

Die Webseite von Weissteiner Automation: Leistungsseiten, lokale Landingpages, Blog,
Kontaktformular und die Freebie-Guides hinter dem E-Mail-Opt-in.

Next.js 16 (App Router, React 19), TypeScript, Tailwind CSS 4. Blogartikel liegen als
Markdown in `_posts`, die Guide-Kapitel als MDX unter `src/content`. Strukturierte Daten
(Newsletter-Anmeldungen, Guide-Zugänge) liegen in Supabase, Transaktionsmails laufen über
Brevo, Kontaktanfragen über die Gmail API mit Service-Account.

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

Die Testseite `/test-chatbot` rendert nur unter `npm run dev`. In jedem
Produktionsbuild - lokal wie im Container - liefert sie den Not-Found-Inhalt.

## Umgebungsvariablen

`.env.example` listet alle Variablen. Bis auf `NEXT_PUBLIC_GTM_ID` werden sie
ausschließlich zur Laufzeit gelesen (Route Handler, Server Components) und gehören
deshalb nicht in den Build und nicht ins Container-Image.

Echte Werte liegen im Panel der Hosting-Plattform, künftig in Dokploy. Weder das
Repository noch die GitHub-Actions-Secrets enthalten Anwendungs-Secrets - der CI-Build
arbeitet mit Platzhaltern, weil er keine echten Werte braucht.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/app` | Routen, Seiten und Route Handler (`api/contact`, `api/auth/confirm`, `api/health`) |
| `src/app/_components` | Seiten- und UI-Komponenten inklusive Cookie-Consent |
| `src/lib` | Fachlogik, Konstanten, `cookie-config.ts` als einzige Quelle für Dienste und Cookies |
| `src/content/freebies` | MDX-Kapitel der Freebie-Guides |
| `_posts` | Blogartikel als Markdown mit Frontmatter |
| `public` | Bilder und statische Assets |
| `supabase` | Schema, Migrationen und Seeds |
| `docs/adr` | Architekturentscheidungen |
| `docs/agents` | Arbeitsanweisungen für Agenten (Issue-Tracker, Triage, Domain-Layout) |

Cookies und eingesetzte Drittanbieterdienste werden an genau einer Stelle gepflegt:
`src/lib/cookie-config.ts`. Der Cookie-Banner liest daraus. Wer einen Dienst hinzufügt
oder entfernt, pflegt diese Datei und gleicht die Datenschutzerklärung
(`src/app/datenschutz`) ab.

## Betrieb

**Heute:** Die Webseite läuft auf Hostinger Shared Hosting. Der einzige automatisierte
Ablauf ist der CI-Workflow (`.github/workflows/ci.yml`), der bei jedem Push und Pull
Request auf `main` Typecheck und Build prüft. Einen automatischen Deploy gibt es nicht.

**Ziel:** Betrieb als Docker-Container auf einer eigenen Hostinger-VPS. Das Image wird in
GitHub Actions gebaut, mit dem Commit-SHA getaggt und in die private GitHub Container
Registry gepusht; Dokploy zieht es von dort und betreibt es hinter Traefik mit
Let's-Encrypt-Zertifikat. Rollback heißt dann: in Dokploy den vorherigen SHA-Tag eintragen
und neu deployen.

Vorhanden ist bereits:

- `Dockerfile` - Multi-Stage-Build auf Basis des `standalone`-Outputs von Next.js.
- `NEXT_PUBLIC_GTM_ID` als einzige Build-Time-Variable, übergeben als Build-Argument.
- `/api/health` - reiner Liveness-Endpunkt ohne Prüfung von Fremdsystemen.

Es fehlen noch Build-und-Push-Workflow, Dokploy-Anwendung, Deploy-Trigger und der
DNS-Cutover. Stand und Reihenfolge stehen in Issue #16 und seinen Teilaufgaben.

## Beitragen

Aufgaben werden als GitHub Issues geführt, siehe `docs/agents/issue-tracker.md`.
Architekturentscheidungen landen als ADR in `docs/adr`.
