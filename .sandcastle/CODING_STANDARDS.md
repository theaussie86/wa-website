# Coding Standards

Verbindliche Konventionen dieses Repositories. Der Review-Agent lädt diese Datei über
`@.sandcastle/CODING_STANDARDS.md`, damit Standards zur Review-Zeit greifen, ohne bei der
Umsetzung Tokens zu kosten.

Jede Regel hier gilt für neuen und geänderten Code. Bestehender Code, der eine Regel verletzt,
wird nicht im Vorbeigehen umgeschrieben - das gehört in ein eigenes Issue.

## Style

**Sprache.** Bezeichner, Typen und ADRs sind Englisch. Ausgenommen sind Namen, die eine deutsche
Route oder einen deutschen Fachbegriff spiegeln - `src/app/_components/bestaetigt.tsx` mit der
Komponente `Bestaetigt` und ihrem Prop `titel` bedient die Routen `.../bestaetigt` und heißt deshalb so.

Nutzertexte und Kommentare sind Deutsch mit echten Umlauten: `ä`, `ö`, `ü`, `ß`. Keine
`ae`/`oe`/`ue`/`ss`-Ersetzungen. Einzige Ausnahme sind Dateinamen und URL-Slugs auf der Platte, etwa
`src/app/prozessautomatisierung-allgaeu` oder `_posts/ki-fuer-kleine-unternehmen-groesste-chance.md`.
Ältere Dateien mit englischen Kommentaren (`src/lib/cookie-config.ts`) bleiben stehen; neue
Kommentare dort werden trotzdem Deutsch geschrieben.

**Kommentare begründen das Warum.** Ein Kommentar, der beschreibt, was die nächste Zeile ohnehin
sagt, wird entfernt. Ein Kommentar, der die verworfene Alternative und ihre Konsequenz festhält,
bleibt. Referenzimplementierungen: `next.config.ts` (warum `minimumCacheTTL` von 30 Tagen auf einen
Tag gefallen ist), `Dockerfile` (warum `.next/cache/images` vor dem Volume-Mount existieren muss),
`src/app/api/health/route.ts` (warum der Liveness-Check bewusst keine Fremdsysteme prüft).

**Benennung.** Dateien kebab-case (`post-header.tsx`, `cookie-config.ts`). Komponenten und Typen
PascalCase, Funktionen und Variablen camelCase, Konstanten auf Modulebene SCREAMING_SNAKE_CASE
(`EMAIL_REGEX` in `src/lib/validation.ts`, `SITE_NAME` in `src/lib/constants.ts`).

**Imports** laufen über den Alias `@/` aus `tsconfig.json`, nicht über `../../`-Ketten.

**Exports.** `page.tsx`, `layout.tsx` und `route.ts` brauchen den Default-Export, den Next vorgibt.
Neue Komponenten bekommen einen benannten Export (`export function Button` in
`src/app/_components/button.tsx`). Der Bestand ist gemischt - `header.tsx`, `alert.tsx` und
`container.tsx` exportieren default, `footer.tsx` beides. Das ist Altlast, kein Vorbild, und kein
Grund für einen Umbau in einem fachlichen PR.

**TypeScript läuft strict.** Kein `any`, keine `as`-Casts, die nur einen Typfehler wegdrücken. Wenn
ein Typ nicht passt, ist die Datenform falsch modelliert.

**Styling** passiert über Tailwind-Klassen im JSX. Eigene Farben, Schatten und Schriften kommen aus
den Tokens in `tailwind.config.ts` (`primary`, `accent-600`, `charcoal`, `warm-white`) - eine neue
Farbe der eigenen Palette wird erst Token, dann benutzt, nie inline als Hex.

Hex-Werte sind an drei Stellen legitim und dort auch im Bestand:

- Fremde Markenfarben, die nicht zur eigenen Palette gehören: `#25D366` (WhatsApp) in
  `src/app/kontakt/page.tsx`, `#0077b5` (LinkedIn) in `src/app/datenschutz/page.tsx`.
- Kontexte ohne Tailwind: `src/app/opengraph-image.tsx` und `twitter-image.tsx` rendern über den
  Image-Renderer mit Inline-Styles, ebenso die Syntax-Highlight-Overrides unter
  `src/app/second-brain-anleitung/guide/_components/`.
- `<meta name="theme-color">` in `src/app/layout.tsx`.

## Umgebungsvariablen und Secrets

Env-Vars werden **zur Laufzeit** gelesen, im Funktionsrumpf, nicht auf Modulebene. Muster:
`getSupabaseAdmin()` in `src/lib/supabase.ts`, `getSecret()` in `src/lib/guide-auth.ts`. Grund: Das
Container-Image wird einmal gebaut und in jeder Umgebung mit anderen Werten gestartet - was zur
Build-Zeit gelesen wird, ist eingebrannt.

Fehlt eine Variable, wird laut gescheitert (`throw new Error("GUIDE_JWT_SECRET is not configured")`),
nicht still ein Fallback benutzt.

Einzige Ausnahme ist `NEXT_PUBLIC_GTM_ID`: Die ID landet im Client-Bundle, muss deshalb zur Build-Zeit
bekannt sein und wird im `Dockerfile` als `ARG` durchgereicht. Fehlt sie, rendern
`src/app/_components/cookie-consent/gtm-script.tsx` und `consent-default-script.tsx` nichts und der
Build läuft trotzdem durch. Eine zweite `NEXT_PUBLIC_`-Variable braucht eine Begründung im PR.

Secrets gehören nie ins Repository, nie ins Image und nie in die GitHub-Actions-Secrets. Echte Werte
liegen im Panel der Hosting-Plattform. `.github/workflows/ci.yml` hält Platzhalter, damit der Build
nicht an fehlenden Vars scheitert - **eine neue Env-Var wird dort mit Dummy-Wert ergänzt**, sonst
bricht CI.

## Cookies und Drittanbieter

`src/lib/cookie-config.ts` ist die einzige Quelle für Cookies und Drittanbieter. Ein neuer Dienst
bekommt dort einen Eintrag in `SERVICES` mit `category`, `isActive` und - falls er Cookies setzt -
der `cookies`-Liste. Banner (`src/app/_components/cookie-consent/banner.tsx`) und Dienstliste
(`service-list.tsx`) leiten sich daraus ab.

Ein Dienst wird nirgends hart verdrahtet, weder im Banner noch in `src/app/datenschutz/page.tsx`.
`isActive` bleibt `false`, solange der Dienst nicht wirklich eingebunden ist.

**Einwilligung.** Google-Dienste laufen über Consent Mode. Der Default-Zustand steht **vor** dem
Container: `consent-default-script.tsx` läuft als `beforeInteractive`-Inline-Skript, liest die
gespeicherte Einwilligung selbst aus dem `localStorage` und setzt `consent default` - ohne Eintrag
`denied` für alle Kategorien. Spätere Änderungen schiebt `pushConsentToDataLayer` in `provider.tsx`
als `consent update` nach, synchron beim Speichern und vor dem `consent_updated`-Event.
`gtm-script.tsx` lädt nur noch den Container.

Jeder Consent-Befehl läuft über einen `gtag()`-Helfer, der das `arguments`-Objekt pusht - einmal in
TypeScript (`provider.tsx`), einmal im Inline-Skript, weil dessen Code vor der Hydration als String
ausgeliefert wird. Ein Array mit demselben Inhalt landet im `dataLayer`, wird von GTM aber nie
ausgewertet (Issue #38) - deshalb wird ein Consent-Befehl **nie** direkt als Array oder Objekt
gepusht. Eigene Events wie `consent_initialized` und `consent_updated` sind keine gtag-Befehle und
bleiben Objekt-Pushes. Siehe `docs/adr/0002-set-consent-mode-before-the-gtm-container.md`.

Dass der Container auch ohne Einwilligung lädt, ist dokumentiertes Altverhalten und kein
Review-Befund. Jedes Skript **ohne** Consent Mode, das Cookies
setzt oder Daten überträgt, darf dagegen erst nach erteilter Einwilligung gerendert werden.

Jede Änderung an `cookie-config.ts` verlangt einen Abgleich mit `src/app/datenschutz` - die Seite ist
rechtlich verbindlicher Text, keine Doku.

## Testing

**Es gibt bewusst kein Testframework.** Kein Jest, kein Vitest, kein Playwright. Der Review-Agent
schlägt weder Tests noch die Einführung eines Frameworks vor und wertet fehlende Unit-Tests nicht als
Befund.

Geprüft wird stattdessen an drei Stellen, genau so wie `.github/workflows/ci.yml` es fährt:

1. `npm run typecheck` - `tsc --noEmit`, strict.
2. `npm run build` - der Next-Build muss durchlaufen.
3. `npm run check:ssr` - der CI-Schritt startet den gebauten Standalone-Server im Laufzeit-Layout des
   `Dockerfile` (`node .next/standalone/server.js`, nicht `next start`, siehe #40), und
   `scripts/check-ssr-body.mjs` misst dagegen pro Pfad die Länge des `<body>` ohne `<script>`-Tags.
   Hintergrund ist Issue #34: Ein Client-Provider, der `children` zurückhält, liefert HTTP 200 mit
   gültigem `<title>` und leerem Body - Statuscode und Titel allein beweisen nichts. Anschließend
   prüft derselbe Schritt, dass die referenzierten Assets aus `.next/static` und `public` auch
   ausgeliefert werden - fehlen sie, bleibt der reine Markup-Check grün.

Verhalten wird von außen gegen die laufende Anwendung geprüft: Statuscode, ausgeliefertes Markup,
Redirect-Ziele, gesetzte Cookies. Eine neue serverseitig gerenderte Seite wird in die Pfadliste des
`check:ssr`-Schritts in `ci.yml` aufgenommen.

Wenn eine Änderung so gebaut ist, dass sie sich von außen nicht prüfen lässt, ist das ein Befund über
den Schnitt des Codes - nicht ein Anlass, ein Testframework zu fordern.

## Architecture

**Verzeichnisse.**

- `src/app/<slug>/page.tsx` - Seiten. Route Handler als `route.ts`, Server Actions als `actions.ts`,
  beide neben der Seite, zu der sie gehören (`src/app/kontakt/actions.ts`).
- `src/app/_components/` - geteilte Komponenten. Mehrteilige Features werden Unterordner
  (`cookie-consent/`, `local-seo/`). Ein `index.ts` als Barrel gibt es nur, wo von außen mehrere
  Komponenten gemeinsam importiert werden (`cookie-consent/index.ts`) - kein Barrel auf Verdacht.
- `src/lib/` - Fachlogik und Integrationen ohne JSX (`supabase.ts`, `gmail.ts`, `guide-auth.ts`,
  `validation.ts`, `constants.ts`).
- `src/interfaces/` - geteilte Typen.
- `src/proxy.ts` - Middleware.
- `_posts/` und `src/content/` - Inhalte als Markdown, zur Laufzeit gerendert und deshalb im Image.

**Keine Abstraktion mit nur einem Aufrufer.** Ein Helper entsteht beim zweiten Aufrufer, nicht
vorsorglich.

**Große Komponenten sind nicht automatisch ein Befund.** `docs/adr/0001-keep-local-seo-page-as-monolith.md`
hält fest, dass `local-seo-page.tsx` bewusst eine Datei bleibt: Editierreibung ist kein Argument, weil
alle Änderungen über einen Agenten laufen, und Wiederverwendung einzelner Abschnitte ist kein aktuelles
Requirement. Eine Zerlegung braucht ein neues Argument, nicht das alte.

**Entscheidungen mit Tragweite werden ADR**, nicht Kommentar: `docs/adr/NNNN-kebab-case-titel.md`,
Englisch, kurz, mit der verworfenen Alternative und ihrer Begründung. Vorbild ist ADR 0001.

Widerspricht eine Änderung einem bestehenden ADR, wird das laut angesprochen statt still überschrieben
(siehe `docs/agents/domain.md`).
