# Betrieb

Wie diese Webseite betrieben wird, und was im Störungsfall zu tun ist. Issue #26,
Abschluss des VPS-Umzugs (#16).

Die Runbooks der einzelnen Umzugsschritte liegen in `docs/plans` und beschreiben,
**wie** die Umgebung entstanden ist. Dieses Dokument beschreibt, **wie sie läuft**.

## Betriebsmodell

```
Merge auf main
  → GitHub Actions baut das Image        (build-image.yml)
  → Push nach GHCR, Tag sha-<commit>     (privates Package)
  → deploy.yml setzt den Tag in Dokploy und deployt
  → Dokploy zieht das Image, Swarm tauscht den Container
  → Traefik terminiert TLS und routet auf Port 3000
```

| Was | Wo |
|---|---|
| Build | GitHub Actions, nie auf dem Server |
| Image | `ghcr.io/theaussie86/wa-website`, privates Package, die letzten fünf Versionen |
| Betrieb | Hostinger VPS `1889924` (KVM 4, 4 vCPU, 16 GB), `186.240.157.55` |
| Plattform | Dokploy `v0.29.14`, Docker im Swarm-Mode, Traefik `3.6.7` als Ingress |
| Panel | `https://manage.weissteiner-automation.com`, Port 3000 in der Firewall zu |
| Anwendung | Application `7SegzhqX2qLM3NY75qGPR`, Swarm-Service `wa-website-9lxi34` |
| DNS | IONOS, manuell, TTL 300 |

Die Anwendung ist zustandslos: Inhalte liegen als Markdown und MDX im Repository,
strukturierte Daten in der Datenbank. Kein Volume mit Nutzdaten, keine Datenmigration
bei einem Deploy. Das einzige Volume ist der Bildcache des Optimizers
(`wa-website-image-cache` auf `/app/.next/cache/images`) - Verlust kostet Rechenzeit,
keine Daten, und ist der vorgesehene Weg, den Cache zu leeren.

Dokploy **baut nichts**. Es zieht ein fertiges Image und betreibt es. Wer im Panel
nach einem Build-Log sucht, sucht an der falschen Stelle - Build-Logs liegen in
GitHub Actions, Deploy-Logs im Panel.

Ein Deploy läuft `start-first`: der neue Container bekommt erst Traffic, wenn sein
Health-Check (`/api/health`) greift, danach verschwindet der alte. Wird der neue nie
gesund, dreht Swarm von selbst zurück.

## Rollback

Es gibt zwei Ebenen. Sie decken verschiedene Fehler ab, und die Wahl der falschen
kostet genau die Zeit, die die niedrige TTL eingekauft hat.

**Erst das Fehlerbild bestimmen:**

```bash
curl -sS -o /dev/null -w '%{http_code} %{remote_ip}\n' https://weissteiner-automation.com/
curl -sS https://weissteiner-automation.com/api/health
```

| Beobachtung | Ebene |
|---|---|
| Seite antwortet, aber falsch: Fehlerseite, kaputtes Layout, defekte Funktion | 1 - Image-Tag |
| `/api/health` antwortet, die Anwendung verhält sich seit dem letzten Merge anders | 1 - Image-Tag |
| Gar keine Antwort, Timeout, Zertifikatsfehler, Traefik-404, Panel nicht erreichbar | 2 - DNS |
| Server nicht erreichbar, Dokploy defekt, Plattform in unklarem Zustand | 2 - DNS |

Im Zweifel Ebene 2: sie holt die Besucher in Minuten zurück auf eine funktionierende
Seite und lässt Zeit für die Ursachensuche. Ebene 1 lässt sich danach in Ruhe machen.

### Ebene 1 - Anwendungsfehler über den Image-Tag

Der Code ist kaputt, die Plattform nicht. Zurück auf einen früheren SHA-Tag, ohne
Rebuild und ohne Panel-Login:

```bash
gh workflow run deploy.yml -f image=ghcr.io/theaussie86/wa-website:sha-<commit>
```

Den passenden Tag findet man im Log des zugehörigen Build-Laufs:

```bash
gh run list --workflow=build-image.yml --limit 10
gh run view <run-id> --log | grep -o 'Gebautes Image: .*'
```

Wirkt binnen Minuten. Der Workflow wartet auf den Abschluss des Deployments und liest den
gesetzten Tag zurück. **Ein grüner Lauf belegt die Konfiguration, nicht die Laufzeit:** er
zeigt, dass der alte Tag eingetragen ist und Dokploy das Deployment ohne Fehler
abgeschlossen hat. Ein Container, der nach dem Start umkippt, fällt dabei nicht auf. Der
Beleg dafür ist der Smoke-Test, siehe unten.

**Das Fenster ist fünf Builds groß.** `build-image.yml` räumt ältere Package-Versionen
auf. Wer weiter zurück muss, baut den alten Commit neu - zwei Schritte, weil der
Deploy-Job in `build-image.yml` nur auf `main` läuft:

```bash
git branch rollback-<commit> <commit>
git push origin rollback-<commit>
gh workflow run build-image.yml --ref rollback-<commit>   # baut, deployt nicht
# danach den frisch gebauten Tag von Hand deployen:
gh workflow run deploy.yml -f image=ghcr.io/theaussie86/wa-website:sha-<commit>
```

`--ref` nimmt nur Branch- oder Tag-Namen, keinen Commit-SHA. Deshalb der Umweg über einen
Branch; er kann danach weg.

### Ebene 2 - Plattform- oder Serverfehler über DNS

Die VPS oder Dokploy sind das Problem. Zurück auf das Shared Hosting, das unverändert
weiterläuft. Die Records liegen bei **IONOS**, nicht bei Hostinger, und werden von Hand
gesetzt:

| Name | Typ | Wert zurück auf | TTL |
|---|---|---|---|
| `@` | A | `82.25.102.149` | 300 |
| `www` | A | `82.25.102.149` | 300 |

Nur diese beiden Einträge. MX (Google Workspace), SPF sowie die Verifizierungen von
Brevo, Google und Pinterest bleiben unberührt - ein Fehler dort trifft die
Geschäfts-Mailadresse und wiegt schwerer als jede Webseitenstörung.

Wirkt nach spätestens fünf Minuten. Prüfen **gegen einen öffentlichen Resolver**, nicht
gegen den eigenen:

```bash
dig +short @1.1.1.1 weissteiner-automation.com A
curl -sS -o /dev/null -w '%{http_code} %{remote_ip}\n' https://weissteiner-automation.com/
```

Der eigene Router cacht selbst; ein lokaler Flush fragt ihn nur erneut. Details in
`docs/plans/2026-08-08-dokploy-panel-https.md`.

Das Shared Hosting bringt sein eigenes Zertifikat mit. TLS wird immer dort terminiert,
wo der Traffic ankommt - nach dem Zurückschalten ist das wieder Hostinger.

**Beim Zurückschalten auf die VPS gilt derselbe Traefik-Neustart wie beim Cutover**,
siehe unten.

## Zugangsdaten

Genau eine Stelle ist jeweils die Quelle der Wahrheit. Kopien altern.

| Was | Liegt in | Quelle der Wahrheit |
|---|---|---|
| Laufzeit-Variablen der Anwendung (9 Stück: Datenbank, Brevo, Gmail-Service-Account, JWT-Secret) | Dokploy, Anwendung → Environment | **Dokploy** |
| GHCR-Token für den Image-Pull | Dokploy, Registry `ghcr` (`cAzlEWfYzyYkLL3UGbyI9`) | **Dokploy** |
| Dokploy-API-Key für den Deploy | GitHub-Repository-Secret `DOKPLOY_API_KEY` | **Passwortmanager** |
| `NEXT_PUBLIC_GTM_ID` | GitHub-Repository-*Variable* | GitHub |
| SSH-Zugang zur VPS | lokaler SSH-Key, Host-Alias `cwe-dokploy` | Passwortmanager |
| Panel-Login | `manage.weissteiner-automation.com` | Passwortmanager |

Was **nicht** existiert und auch nicht entstehen soll:

- Keine Anwendungs-Secrets im Repository. `.env.example` enthält nur Platzhalter, der
  CI-Build arbeitet damit - er braucht keine echten Werte.
- Keine Secrets im Image. Die Laufzeit-Variablen werden erst vom Container gelesen.
- Kein SSH-Schlüssel in den GitHub-Secrets. Der Deploy läuft über HTTPS mit API-Key.
- `.env.local` ist lokale Entwicklung, keine Referenz für die Produktion.

Zwei Dinge, die man wissen muss:

**Der Dokploy-API-Key ist kein enger Schlüssel.** Er kann alles, was das Panel kann,
einschließlich `registry.all` - und Dokploy gibt Registry-Passwörter dort im Klartext
zurück. Der API-Key ist damit faktisch so wertvoll wie das GHCR-Token. "Nur ein API-Key
statt SSH" ist eine Verbesserung, keine Isolierung. Bei Verdacht: Key im Panel
rotieren und das Repository-Secret neu setzen. Herleitung in
`docs/plans/2026-08-08-dokploy-app-from-ghcr.md`.

**Der mehrzeilige `GOOGLE_PRIVATE_KEY`** wird in Dokploy **ohne Anführungszeichen** als
eine Zeile mit literalen `\n` eingetragen. Landen die Anführungszeichen im Wert, beginnt
der Schlüssel mit `"-----BEGIN` und jede Mail-Signatur scheitert. Begründung in
`docs/plans/2026-08-08-dokploy-app-from-ghcr.md`.

## Registry-Token

Das Personal Access Token, mit dem die VPS das Image aus GHCR zieht.

| | |
|---|---|
| Art | klassisches PAT (`ghp_`-Präfix), kein fine-grained Token |
| Ablauf | **kein Ablaufdatum** - gültig bis zum Widerruf |
| Rechte | `read:packages` |
| Angelegt | 2026-08-08, im Zuge von #21 |
| Liegt in | Dokploy, Registry `ghcr` (`cAzlEWfYzyYkLL3UGbyI9`) |
| Zu finden unter | GitHub → Settings → Developer settings → Personal access tokens |

Ein klassisches PAT ohne Ablauf, bewusst so gewählt. #16 hatte ein fine-grained Token mit
einem Jahr Laufzeit vorgesehen; die Entscheidung dagegen ist getroffen und liegt beim
Betreiber.

**Was daraus folgt:**

- **Kein Kalendereintrag nötig.** Deployments können nicht an einem abgelaufenen Token
  scheitern, weil es nicht abläuft. Das Token endet ausschließlich dort, wo es jemand
  widerruft.
- **Der Widerruf ist der einzige Hebel.** Bei Verdacht auf Kompromittierung ist er auch
  der einzige - es gibt kein Ablaufdatum, das die Lage von selbst entschärft.
- **Wird doch einmal ein Ablauf gesetzt**, gehört ein Kalendereintrag dazu. Ab dem
  Ablauftag schlägt der Image-Pull fehl, und das Bild ist irreführend: Build in GitHub
  Actions grün, Image liegt in GHCR, und erst das Deployment in Dokploy endet mit `error`.
  Die laufende Seite bleibt dabei online, es geht nur nichts Neues mehr live.

**Rotation:** neues Token mit ausschließlich `read:packages` erzeugen, in Dokploy unter
der Registry `ghcr` eintragen, einen Deploy auslösen, erst danach das alte Token
widerrufen. Reihenfolge einhalten - wer zuerst widerruft, kann den neuen Wert nicht mehr
prüfen, ohne die Produktion anzufassen.

Das TLS-Zertifikat der Domain läuft dagegen ab, braucht aber ebenfalls keinen
Kalendereintrag - Traefik erneuert es selbst.

## Prüfen, ob alles läuft

Der Smoke-Test aus #23 prüft die HTTP-Oberfläche von außen: Statuscodes, Inhalte und
echte Seiteneffekte. Er ist der Abnahmetest nach jedem größeren Eingriff.

```bash
# Gegen die Live-Domain, inklusive Zertifikat und www-Weiterleitung
./scripts/smoke-test.sh

# Gegen die Server-Adresse, am DNS vorbei - für Prüfungen ohne Live-Traffic
./scripts/smoke-test.sh --ip 186.240.157.55
```

Zwei Prüfungen haben echte Seiteneffekte und laufen nur auf Zuruf:

```bash
--contact          # sendet eine echte Kontaktanfrage; die Mail muss im Postfach ankommen
--doi <email>      # läuft den Double-Opt-in durch; die Adresse muss in Brevo bestätigt sein
```

Warum der Test so geschnitten ist, welche Prüfung welche Bruchstelle abdeckt und was ein
Statuscode allein **nicht** belegt, steht in
`docs/plans/2026-08-11-smoke-test-vps.md`. Kurzform: ein 200 beweist keine Seite, und
eine Datenbankverbindung beweist nur ein Schreibvorgang.

**Erwarteter Stand:** alles grün bis auf den Schreibpfad in die Datenbank - das
Freebie-Backend wird gerade ersetzt (#47). Ein zweiter roter Punkt ist ein echter Befund.

Für einen schnellen Blick zwischendurch:

```bash
curl -sS https://weissteiner-automation.com/api/health          # {"status":"ok"}
ssh cwe-dokploy 'docker ps --filter name=wa-website'            # Up ... (healthy)
```

## Stolperfallen

**Traefik fordert Zertifikate nur beim Laden der Konfiguration an, nicht periodisch.**
Scheitert ein Versuch, wird er nicht von selbst wiederholt. Beim Cutover standen die
Domains bereits eingetragen, der letzte Versuch lag drei Tage zurück und war
fehlgeschlagen - und Traefik hat danach nie wieder gefragt. Speichern der Domain im
Panel ändert die Konfigurationsdatei nicht und löst deshalb nichts aus. Das kostete rund
40 Minuten Zertifikatswarnung für jeden Besucher.

Nach jeder Änderung an den A-Records gehört deshalb dazu:

```bash
ssh cwe-dokploy 'docker restart dokploy-traefik'
```

Traefik läuft hier als **normaler Container**, nicht als Swarm-Service.
`docker service update --force dokploy-traefik` und `docker service logs` laufen ins
Leere - richtig sind `docker restart` und `docker logs`.

**Ein Deploy während eines DNS-Wechsels kann scheitern.** Der Runner erreicht das Panel
unter `manage.weissteiner-automation.com` dann womöglich nicht und bricht mit
`curl: (28) Connection timed out` ab. Das Image liegt bereits in GHCR, nur der Tag wurde
nie gesetzt. Kaputt geht dabei nichts - die alte Version läuft weiter. Reparatur:

```bash
gh run rerun <run-id> --failed
```

**Drei Merges kurz hintereinander erzeugen einen abgebrochenen Deploy-Lauf.** GitHub hält
pro Concurrency-Gruppe nur einen wartenden Lauf. Sieht nach Fehlschlag aus, ist harmlos -
das neueste Image gewinnt.

**Der eigene Resolver ist beim Prüfen von DNS-Änderungen kein Zeuge.** Immer gegen
`@1.1.1.1` prüfen oder mit `--resolve` am Cache vorbei. Die gefährliche Variante: die alte
Adresse zeigt auf ein funktionierendes Shared Hosting, der Cutover sieht deshalb aus, als
sei nichts passiert.

**Ein von Hand in die Router-Datei der Anwendung eingetragener Traefik-Router überlebt
den nächsten Deploy nicht.** Dokploy erzeugt die Datei jedes Mal neu. Haltbar ist nur die
Kombination aus globaler Middleware-Datei (Settings → Traefik → Middlewares) und dem
`middlewares`-Feld der Domain - so hängt die `www`-Weiterleitung dort. Der genaue Weg
steht in `docs/plans/2026-08-08-dokploy-app-from-ghcr.md`.

## Das Shared Hosting

Läuft unverändert weiter unter `82.25.102.149` und ist der Rückweg der Ebene 2. Es kostet
Geld und veraltet inhaltlich mit jedem Deploy auf die VPS - es ist ein Rückweg für
Plattformfehler, keine zweite Produktion.

**Abschalten frühestens**, wenn alle folgenden Punkte zutreffen:

- Mindestens zwei Wochen störungsfreier Betrieb auf der VPS, ohne genutzten Rückweg.
- Ein Deploy und ein Rollback über Ebene 1 wurden im Alltag mindestens einmal gefahren.
- Geprüft, dass auf dem Hosting-Paket nichts anderes mehr liegt: weitere Domains,
  Postfächer, Datenbanken, Cronjobs. Die Geschäfts-Mail läuft über Google Workspace und
  hängt an den MX-Records, nicht am Hosting - das ist vor der Kündigung trotzdem
  einmal zu bestätigen.
- Ein Backup der letzten Dateistände ist gezogen.

Die Kündigung erfolgt manuell im hPanel und ist bewusst nicht automatisiert. Danach
existiert Ebene 2 nicht mehr; Plattformfehler werden dann über einen Neuaufbau der
Anwendung in Dokploy behandelt - das Image in GHCR und dieses Dokument reichen dafür aus.

## Server und Panel

```bash
ssh cwe-dokploy                       # root auf der VPS
docker ps                             # laufende Container
docker logs --tail 100 dokploy-traefik
```

Das Panel ist über `https://manage.weissteiner-automation.com` erreichbar. Wird es
unerreichbar - etwa weil das Zertifikat fehlt -, führt der SSH-Tunnel direkt auf Port
3000 daran vorbei:

```bash
ssh -N -L 13000:localhost:3000 cwe-dokploy
# dann http://localhost:13000
```

Der Tunnel ist von Traefik und Zertifikaten unabhängig und bleibt der letzte Rückweg ins
Panel. Die Firewall lässt von außen nur 22, 80 und 443 durch.

## Weiterlesen

| Datei | Inhalt |
|---|---|
| `docs/plans/2026-08-08-ghcr-build-push.md` | Image-Build und GHCR |
| `docs/plans/2026-08-08-dokploy-app-from-ghcr.md` | Anwendung, Health-Check, `www`-Weiterleitung, Laufzeit-Variablen |
| `docs/plans/2026-08-08-deploy-trigger-from-actions.md` | Auto-Deploy und Rollback über GitHub Actions |
| `docs/plans/2026-08-08-dokploy-panel-https.md` | Panel-Subdomain, Zertifikate, DNS-Cache-Fallen |
| `docs/plans/2026-08-09-bildgewicht-und-image-cache.md` | Bildcache-Volume, samt Anlegen über `scripts/dokploy-image-cache-volume.sh` |
| `docs/plans/2026-08-11-smoke-test-vps.md` | Prüfablauf und Begründung jeder einzelnen Prüfung |
| Issue #16 | Entscheidungen des Umzugs, mit Begründung |
