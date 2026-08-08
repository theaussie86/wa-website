# App in Dokploy aus GHCR betreiben

Issue #21, Teil des VPS-Umzugs (#16). Baut auf dem Image aus #20 und dem HTTPS-Panel aus #18 auf.

Ziel: Die Webseite läuft auf der neuen VPS als Docker-Deployment aus GHCR, hinter Traefik,
mit Health-Check. Die Live-Domain bleibt unangetastet - geprüft wird über die Server-Adresse
mit gesetztem Host-Header. Das Shared Hosting läuft unverändert weiter.

## Identifikatoren

Diese Werte braucht #22 für den Deploy-Trigger:

| Was | Wert |
|---|---|
| Projekt | `AVTwc57NrDC3ixEIQKqse` - "Weissteiner Automation Webseite" |
| Environment | `Tltx6Kj1ac9ooLT1rqXnz` - `production` (Default) |
| **Application-ID** | **`7SegzhqX2qLM3NY75qGPR`** |
| Swarm-Service | `wa-website-9lxi34` |
| Registry-Credential | `cAzlEWfYzyYkLL3UGbyI9` - `ghcr` |

`appName` wird von Dokploy mit einem Zufallssuffix versehen, auch wenn beim Anlegen ein
eigener Wert mitgeschickt wird. Das ist gewollt (Eindeutigkeit im Swarm) und kein Fehler.

## Konfiguration

| Feld | Wert | Warum |
|---|---|---|
| `sourceType` | `docker` | Dokploy baut nichts, es zieht und betreibt. |
| `dockerImage` | `ghcr.io/theaussie86/wa-website:sha-d363d22` | Konkreter SHA-Tag, nicht `latest`. Ein Redeploy startet damit garantiert dieselbe Version. Rollback = früheren SHA eintragen. |
| `registryId` | `cAzlEWfYzyYkLL3UGbyI9` | Zugangsdaten hängen an der Registry, nicht an der Anwendung. Eine Token-Rotation trifft dann eine Stelle statt jeder App. |
| `replicas` | 1 | Eine Box, zustandslose App. |
| `cpuLimit` / `memoryLimit` | leer | Dedizierte VPS, bewusste Entscheidung aus #16. |
| Domains | `weissteiner-automation.com`, `www.weissteiner-automation.com`, beide Port 3000, HTTPS, `letsencrypt` | Schon jetzt eingetragen, damit Traefik beim Cutover (#25) sofort ein Zertifikat zieht. |

### Health-Check

```json
{
  "Test": ["CMD-SHELL", "wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1"],
  "Interval": 10000000000,
  "Timeout": 3000000000,
  "StartPeriod": 15000000000,
  "Retries": 3
}
```

Zwei Details, an denen man sonst hängenbleibt:

- **Die Zeiten sind Nanosekunden**, nicht Sekunden oder Millisekunden - Dokploy reicht das
  Objekt unverändert an die Docker-Swarm-API durch. `"Interval": 10` bedeutet 10 Nanosekunden
  und erzeugt einen Health-Check, der praktisch dauerhaft läuft.
- `wget` ist im Image vorhanden (BusyBox aus `node:24-alpine`), `curl` nicht. Der Check darf
  nichts voraussetzen, was nur im Builder-Stage lag.

Der Endpunkt selbst (`/api/health`, aus #17) prüft bewusst keine Fremdsysteme - sonst legt
ein Supabase-Ausfall die funktionierende Webseite per Restart-Loop lahm.

### Update-Strategie

```json
{"Parallelism": 1, "Order": "start-first", "Delay": 5000000000,
 "FailureAction": "rollback", "Monitor": 30000000000, "MaxFailureRatio": 0}
```

Dokploy legt Anwendungen **ohne** `updateConfigSwarm` an. Der Swarm-Default ist dann
`stop-first`: bei einer einzelnen Replica wird der alte Container gestoppt, bevor der neue
startet - jeder Deploy erzeugt ein Loch. Genau das verlangt die Anforderung nicht.

Mit `start-first` plus Health-Check bekommt der neue Container erst dann Traffic, wenn seine
Gesundheitsprüfung greift; erst danach verschwindet der alte. `FailureAction: rollback` sorgt
dafür, dass ein Image, das nicht gesund wird, automatisch zurückgedreht wird statt die Seite
offline zu nehmen.

### `www` auf die Hauptdomain umleiten

Damit es nur eine kanonische URL gibt, leitet `www` dauerhaft auf die Hauptdomain um. Die
Umleitung erledigt Traefik, nicht die Anwendung.

Wichtig ist der **Weg**: Die Router-Datei der Anwendung
(`application.readTraefikConfig` / `updateTraefikConfig`) wird von Dokploy bei **jedem** Deploy
neu erzeugt. Ein dort von Hand eingetragener Router ist nach dem nächsten Push weg. Haltbar
ist nur die Kombination aus globaler Middleware-Datei und dem `middlewares`-Feld der Domain -
beides überlebt die Regeneration, weil Dokploy sie beim Erzeugen einsetzt.

Erstens die Middleware in `middlewares.yml` (Panel: **Settings → Traefik → Middlewares**,
API: `settings.updateMiddlewareTraefikConfig`). Der bestehende Eintrag `redirect-to-https`
muss erhalten bleiben - die Datei wird komplett ersetzt, nicht ergänzt:

```yaml
http:
  middlewares:
    redirect-to-https:
      redirectScheme:
        scheme: https
        permanent: true
    redirect-www:
      redirectRegex:
        regex: "^https?://www\\.weissteiner-automation\\.com/(.*)"
        replacement: "https://weissteiner-automation.com/${1}"
        permanent: true
```

Zweitens die Middleware an die `www`-Domain hängen (Panel: **Domains → www… → Advanced →
Middlewares**, API: `domain.update` mit `"middlewares": ["redirect-www"]`). Nur an `www`,
niemals an die Hauptdomain - sonst entsteht eine Endlosschleife.

Dokploy setzt die Middleware daraufhin auf den `websecure`-Router von `www`. Der `web`-Router
behält `redirect-to-https`. Ein Aufruf von `http://www…` läuft dadurch über zwei Sprünge
(`→ https://www…  → https://…`); ein Aufruf von `https://www…` über einen. Zwei Sprünge sind
für Suchmaschinen unkritisch.

Geprüft vor dem Cutover, am DNS vorbei:

```bash
curl -sSk --resolve www.weissteiner-automation.com:443:186.240.157.55 -o /dev/null \
  -w '%{http_code} -> %{redirect_url}\n' \
  'https://www.weissteiner-automation.com/blog/irgendein-artikel?a=1'
# erwartet: 301 -> https://weissteiner-automation.com/blog/irgendein-artikel?a=1
```

Pfad und Query müssen erhalten bleiben - sonst landen alle bestehenden `www`-Links auf der
Startseite und die Umleitung vernichtet genau die SEO-Signale, die sie bündeln soll.

### Laufzeit-Variablen

Gesetzt sind genau die neun Variablen, die der Code zur Laufzeit liest:

```
SUPABASE_URL, SUPABASE_SECRET_KEY, BREVO_API_KEY,
GMAIL_USER_EMAIL, GMAIL_FROM_ALIAS, CONTACT_RECIPIENT_EMAIL,
GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GUIDE_JWT_SECRET
```

`NEXT_PUBLIC_GTM_ID` steht bewusst **nicht** dabei: der Wert ist Build-Zeit-only und liegt
bereits im Bundle (#20). Zur Laufzeit gesetzt hätte er keine Wirkung.

**Der mehrzeilige private Schlüssel.** In `.env.local` liegt er als eine physische Zeile mit
literalen `\n`-Sequenzen, umschlossen von Anführungszeichen. In Dokploy wird er
**ohne Anführungszeichen und ohne Expansion** eingetragen - also weiterhin eine Zeile mit
literalen `\n`. `src/lib/gmail.ts:34` macht selbst `.replace(/\\n/g, "\n")`.

Das ist die einzige Variante, die in beiden Fällen funktioniert:

- Reicht Dokploy den Wert unverändert durch, repariert ihn der Code.
- Expandiert Dokploy `\n` in echte Zeilenumbrüche (dotenv-Verhalten bei doppelten
  Anführungszeichen), ist der Wert schon korrekt und `replace` ein No-op.

Der Fehlerfall, den man vermeiden will: die Anführungszeichen landen als Teil des Werts im
Container. Dann beginnt der Schlüssel mit `"-----BEGIN` und jede JWT-Signatur scheitert.

## Fallen

**Dokploy speichert Registry-Passwörter im Klartext** und gibt sie über `GET /api/registry.all`
an jeden zurück, der einen API-Key hat. Der Dokploy-API-Key ist damit faktisch so wertvoll wie
das GHCR-Token selbst. Konsequenz: Wer den API-Key kompromittiert, hat Lesezugriff auf die
Registry - ein weiteres Argument dafür, dass das PAT nur `read:packages` kann.

**Kein `latest` eintragen.** `latest` würde bei jedem Redeploy etwas anderes starten können,
ohne dass sich die Konfiguration ändert. Der SHA-Tag ist der Rollback-Anker.

**Let's Encrypt vor dem Cutover.** Die beiden Domains sind eingetragen, aber DNS zeigt noch auf
das Shared Hosting. Die HTTP-01-Challenge scheitert deshalb zwangsläufig. Das ist erwartet und
kein Fehler - Traefik versucht es erneut, und beim Cutover (#25) klappt es sofort. Nicht in
einer Schleife neu auslösen: Let's Encrypt hat Rate Limits.

**Prüfungen vor dem Cutover brauchen `--resolve` und `-k`.** `--resolve` geht am DNS und an
jedem Resolver-Cache vorbei, `-k` toleriert das noch fehlende Zertifikat. Ohne beides prüft
man das Shared Hosting und merkt es nicht (siehe DNS-Cache-Falle in
`2026-08-08-dokploy-panel-https.md`).

## Verifikation

```bash
export DOKPLOY_API_KEY='...'
APP=7SegzhqX2qLM3NY75qGPR
IP=186.240.157.55
PANEL=https://manage.weissteiner-automation.com

# Konfiguration
curl -sS -H "x-api-key: $DOKPLOY_API_KEY" "$PANEL/api/application.one?applicationId=$APP" \
  | python3 -c 'import sys,json;d=json.load(sys.stdin);print(json.dumps({k:d.get(k) for k in
    ("sourceType","dockerImage","registryId","applicationStatus","healthCheckSwarm","updateConfigSwarm")},indent=1))'

# HTTP-Oberfläche über die Server-Adresse, Live-Domain unberührt
curl -sSk --resolve weissteiner-automation.com:443:$IP https://weissteiner-automation.com/api/health
curl -sSk --resolve weissteiner-automation.com:443:$IP -o /dev/null -w '%{http_code}\n' \
  https://weissteiner-automation.com/
curl -sSk --resolve www.weissteiner-automation.com:443:$IP -o /dev/null -w '%{http_code}\n' \
  https://www.weissteiner-automation.com/

# Shared Hosting weiterhin live (ohne --resolve, also über echtes DNS)
curl -sS -o /dev/null -w '%{http_code} %{remote_ip}\n' https://weissteiner-automation.com/

# Keine Secrets im Image
docker image inspect ghcr.io/theaussie86/wa-website:sha-d363d22 \
  --format '{{range .Config.Env}}{{println .}}{{end}}'
```

Verfügbarkeit während eines Redeploys - der eigentliche Beweis für `start-first`:

```bash
curl -sS -X POST "$PANEL/api/application.deploy" -H "x-api-key: $DOKPLOY_API_KEY" \
  -H 'Content-Type: application/json' -d "{\"applicationId\":\"$APP\"}"
for i in $(seq 1 20); do
  curl -sSk --max-time 5 --resolve weissteiner-automation.com:443:$IP -o /dev/null \
    -w "$i %{http_code}\n" https://weissteiner-automation.com/api/health
  sleep 2
done
```

## Ergebnis (verifiziert am 2026-08-08)

| Akzeptanzkriterium | Ergebnis |
|---|---|
| Registry-Zugangsdaten hinterlegt | `ghcr` / `theaussie86`, Pull von `sha-d363d22` von außen erfolgreich |
| Token nur Lese-Rechte auf Packages, mit Ablaufdatum | **Nicht automatisiert geprüft** - siehe unten |
| Docker-Image-Deployment, kein Build auf dem Server | `sourceType: docker`, kein Build-Schritt in der Anwendung |
| Referenzierter Tag ist ein SHA-Tag | `ghcr.io/theaussie86/wa-website:sha-d363d22` |
| Alle Laufzeit-Variablen gesetzt | 9 Variablen, SHA-256 jedes Werts stimmt mit `.env.local` überein |
| Keine Secrets im Image | Image-`ENV` enthält nur `PATH`, `NODE_VERSION`, `YARN_VERSION`, `NODE_ENV`, `NEXT_TELEMETRY_DISABLED`, `PORT`, `HOSTNAME`; keine `.env`-Datei in `/app` |
| Keine Secrets im Repository | `.env*.local` von `.gitignore:34` erfasst, getrackt ist nur `.env.example` mit Platzhaltern; `.dockerignore` schließt `.env` und `.env.*` aus |
| Mehrzeiliger privater Schlüssel unverfälscht im Container | `POST /api/contact` liefert `{"success":true}` - die Gmail-API hat die mit dem Schlüssel signierte JWT akzeptiert. Bei verfälschtem Schlüssel scheitert die Signatur und die Route antwortet mit 500 |
| Gesundheitsprüfung zeigt auf den Health-Endpoint | `healthCheckSwarm` gesetzt, `/api/health` liefert `{"status":"ok"}` über Traefik |
| Container bekommt erst nach erfolgreicher Prüfung Traffic | Docker meldet den laufenden Task als `Up … (healthy)`; beim Redeploy waren neuer und alter Container gleichzeitig `running`, der alte beendete sich rund 9 Sekunden nach dem Start des neuen. Siehe Einschränkung unten |
| Haupt- und `www`-Domain eingetragen, DNS unverändert | Beide Domains in Dokploy; `dig @1.1.1.1` liefert weiterhin `82.25.102.149` für beide |
| Startseite über die Server-Adresse mit Host-Header | 200, 53409 Bytes, `<title>Machen statt warten \| Weissteiner Automation</title>` - **aber der Body ist leer, siehe #34** |
| Bisheriger Betrieb auf dem Shared Hosting unverändert | 200 von `82.25.102.149`, gültiges Zertifikat (`ssl_verify_result: 0`) |

Zusätzlich geprüft, weil es die Bruchstellen des Umzugs sind:

| Prüfung | Ergebnis | Deckt ab |
|---|---|---|
| `https://www…/blog/<slug>?a=1` | 301 auf `https://weissteiner-automation.com/blog/<slug>?a=1` | Kanonische Domain, Pfad und Query erhalten |
| `http://www…` | 301 auf `https://www…`, von dort 301 auf die Hauptdomain | Zwei Sprünge, siehe oben |
| Hauptdomain | weiterhin 200, keine Weiterleitung | Keine Umleitungsschleife |
| Blogartikel | 200 | MDX-Quellen und Dateisystem-Zugriff im Container |
| `/_next/image?url=%2Fgruenten.jpg&w=640&q=75` | 200, `image/webp`, 36848 Bytes | `sharp` unter Alpine/musl - der einzige native Abhängigkeitskandidat |
| `/logo-wide.svg`, `/robots.txt` | 200 | Statische Assets aus `public` |
| GTM-ID im Bundle | `GTM-T2XKWWV8` in `/_next/static/chunks/2a60ktk6zp3u-.js` | Build-Argument aus #20 |
| Container-Benutzer | `uid=1001(nextjs)`, nicht root | #16, User Story 27 |

## Was diese Verifikation übersehen hat

Die Zeile "Startseite über die Server-Adresse" ist mit `200` und dem `<title>` belegt - und
beide Belege sind wertlos. Der `<title>` kommt aus `<head>` über die Metadata-API, und die
53409 Bytes sind fast vollständig RSC-Flight-Payload in `<script>`-Tags. **Der `<body>`
enthält 38 Zeichen Markup.** Die Seite rendert serverseitig nichts (#34).

Aufgefallen ist das erst im Code-Review, nicht beim Deployment. Zwei Lehren:

- **Ein Statuscode belegt keine Seite.** Wer "Startseite abrufbar" prüfen will, muss die
  Größe des `<body>` ohne `<script>` messen. Der Befehl steht in #34; er gehört in den
  Smoke-Test aus #23.
- Der Befund ist **kein Regress dieses Umzugs**: Shared Hosting und Container liefern
  byteidentische 53409 Bytes. Das Akzeptanzkriterium "Startseite ist über die Server-Adresse
  abrufbar" ist damit erfüllt - der Container verhält sich exakt wie die Produktion. Die
  leere Seite ist ein eigenes, älteres Problem.

Der ursprüngliche Verdacht war ein anderer: dass die GTM-ID fehlt, weil `GTMScript` hinter
der Cookie-Einwilligung sitzt. Das stimmt nicht - `gtm-script.tsx` rendert das `<Script>`,
sobald `GTM_ID` gesetzt ist; die Einwilligung steuert nur die Consent-Mode-Pushes in den
`dataLayer`. Die ID fehlt im HTML aus demselben Grund wie alles andere: es gibt kein
serverseitiges Markup. Die Prüfung in `2026-08-08-ghcr-build-push.md` ist entsprechend
korrigiert.

## Einschränkung des Zero-Downtime-Nachweises

Der erste Versuch, `start-first` zu belegen, war wertlos: 20 Proben im 2-Sekunden-Takt,
gestartet direkt nach dem Deploy-Aufruf. Dieses Fenster kann komplett gegen den **alten**,
noch laufenden Container gelaufen sein - der Image-Pull und `StartPeriod: 15s` gehen voraus.
"0 nicht-200" wäre dann auch bei `stop-first` herausgekommen.

`applicationStatus` taugt nicht als Abbruchbedingung: der Wert springt binnen Sekunden zurück
auf `done`, während Swarm noch rollt.

Belastbar ist stattdessen der Container-Wechsel selbst:

```bash
curl -sS -H "x-api-key: $DOKPLOY_API_KEY" \
  "$PANEL/api/docker.getContainersByAppNameMatch?appName=wa-website-9lxi34"
```

Beobachtet wurde:

```
5bf18b66085c  running  Up 33 seconds (healthy)
f3fbbdcc7a87  exited   Exited (143) 24 seconds ago
```

Das belegt zweierlei: der Health-Check ist im laufenden Swarm-Service aktiv und meldet
`healthy`, und der alte Container endete rund 9 Sekunden **nach** dem Start des neuen - also
`start-first`. Wer die Verfügbarkeit selbst messen will, muss gegen den Wechsel der
Container-ID abbrechen, nicht gegen eine feste Anzahl Proben.

## Offen

**Token-Scopes und Ablaufdatum sind nicht maschinell geprüft.** Das hinterlegte Token ist ein
klassisches PAT (`ghp_`-Präfix), kein fine-grained Token. Klassische PATs können `read:packages`
allein tragen und ein Ablaufdatum haben, erfüllen das Kriterium also - aber ob dieses Token
das tut, ist von außen nicht einsehbar. Einmal manuell nachsehen unter
**GitHub → Settings → Developer settings → Personal access tokens**: Scopes müssen genau
`read:packages` sein, Ablauf in einem Jahr. Kalendereintrag für die Rotation nicht vergessen -
ohne sie schlagen Deployments ab dem Ablauftag beim Image-Pull fehl.

**Die leere serverseitige Seite (#34)** ist offen, aber kein Blocker für diesen Umzug - siehe
oben.

## Nicht Teil dieser Änderung

- Deploy-Trigger aus GitHub Actions (#22) - `autoDeploy` steht auf `true`, es fehlt nur der
  HTTP-POST aus dem Workflow. Die Application-ID steht oben.
- Vollständiger Smoke-Test inklusive Double-Opt-in-Pfad (#23). Er muss die Body-Größe messen,
  nicht nur den Statuscode - siehe oben.
- DNS-Umstellung (#25). Die `www`-Weiterleitung ist hier bereits eingerichtet und geprüft,
  weil sie ohne DNS-Änderung testbar war.
- Persistenter Cache für den Image-Optimizer (#24).
- Die leere serverseitige Seite (#34).
