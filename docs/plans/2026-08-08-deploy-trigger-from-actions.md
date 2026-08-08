# Auto-Deploy aus GitHub Actions über die Dokploy-API

Issue #22, Teil des VPS-Umzugs (#16). Baut auf dem Image-Build aus #20 und der in #21
eingerichteten Anwendung auf.

Ziel: Ein Merge nach `main` geht ohne Handgriff live. Der Workflow baut das Image, schiebt es
nach GHCR, trägt den frischen SHA-Tag in Dokploy ein und löst dort das Deployment aus.

## Aufbau

Zwei Workflows statt einem:

| Datei | Rolle |
|---|---|
| `.github/workflows/build-image.yml` | Baut und pusht das Image, ruft anschließend `deploy.yml` auf |
| `.github/workflows/deploy.yml` | Setzt den Image-Tag und deployt - baut selbst nie |

Die Trennung existiert wegen des Rollbacks: `deploy.yml` hat neben `workflow_call` auch ein
`workflow_dispatch` mit dem Feld `image`. Ein Rollback ist damit ein Workflow-Start mit einem
früheren Tag, kein Panel-Login und kein Rebuild.

```
Push auf main
  └─ build (GHCR)
       └─ deploy (needs: build, if: refs/heads/main)
            ├─ application.update   → dockerImage = ghcr.io/…:sha-<commit>
            ├─ application.deploy   → Titel "GitHub Actions <run_id>.<attempt>"
            ├─ deployment.all       → warten bis done | error
            └─ application.one      → dockerImage == erwarteter Tag?
```

## Entscheidungen

**Zwei Aufrufe, nicht einer.** `application.deploy` deployt das, was in der Anwendung steht -
ohne vorheriges `application.update` würde jeder Lauf denselben alten Tag neu ausrollen. Der
Tag muss also erst gesetzt werden, sonst ist die laufende Version nicht der gemergte Commit.

**`application.update`, nicht `application.saveDockerProvider`.** `saveDockerProvider` verlangt
`username`, `password` und `registryUrl` als Pflichtfelder und schreibt sie in die Anwendung -
die Registry-Zugangsdaten müssten dann als GitHub-Secret vorliegen und würden das in #21
bewusst gewählte `registryId`-Modell (Zugangsdaten hängen an der Registry, nicht an der App)
aushebeln. `application.update` nimmt ein partielles Objekt: gesendet wird nur `dockerImage`,
alles andere bleibt unangetastet.

**Der Tag kommt aus `metadata-action`, nicht aus einer zweiten Formel.** Der Schritt liest
`steps.meta.outputs.json` und greift sich den Eintrag mit `:sha-`. Ein selbst gebautes
`sha-${GITHUB_SHA::7}` wäre eine zweite Wahrheit über denselben Wert - ändert sich das Format
in der Action, zeigt der Deploy auf einen Tag, den nie jemand gepusht hat.

**Der Workflow wartet auf das Deployment.** `application.deploy` legt nur einen Job in eine
Queue und kehrt sofort zurück. Ohne Warten wäre ein grüner Workflow keine Aussage: ein
fehlgeschlagener Image-Pull bliebe unbemerkt.

Gewartet wird über `deployment.all` auf den Datensatz mit dem eindeutigen Titel dieses Laufs.
**Nicht über `applicationStatus`** - der springt binnen Sekunden zurück auf `done`, während
Swarm noch rollt (siehe `2026-08-08-dokploy-app-from-ghcr.md`).

**Der letzte Schritt prüft Konfiguration, nicht Laufzeit.** `application.one` liest dasselbe
Feld zurück, das Schritt 1 geschrieben hat - er belegt, dass der Tag gesetzt wurde, nicht dass
er läuft. Das belegt der Schritt davor: ein fehlgeschlagener Image-Pull endet als Deployment
mit Status `error`. Ob die ausgelieferte Seite auch stimmt, prüft erst der Smoke-Test (#23).

**Kein SSH.** In den Repository-Secrets liegt nur `DOKPLOY_API_KEY`. Ein kompromittiertes
GitHub-Konto bekommt damit keinen Shell-Zugang zum Server.

## Fallen

**Der Dokploy-API-Key ist kein enger Schlüssel.** Er kann alles, was das Panel kann -
einschließlich `registry.all`, das Registry-Passwörter im Klartext zurückgibt (#21). "Nur ein
API-Key statt SSH" ist eine Verbesserung, keine Isolierung. Bei Verdacht: Key im Panel
rotieren und als Repository-Secret neu setzen.

**Das Rollback-Fenster ist fünf Builds groß.** `build-image.yml` räumt mit
`min-versions-to-keep: 5` auf. Ein Tag, der älter ist, existiert in GHCR nicht mehr und lässt
sich nicht mehr deployen. Wer weiter zurück muss, baut den alten Commit über
`workflow_dispatch` auf `build-image.yml` neu.

Der Aufräumschritt läuft deshalb **nur auf `main`**: die Retention zählt Package-Versionen,
nicht Branches. Ein paar manuelle Branch-Builds würden sonst reihum die Tags aus dem
Rollback-Fenster verdrängen - im schlimmsten Fall genau den, auf dem die Produktion steht.

Er steht außerdem auf `continue-on-error: true`. Der Deploy hängt über `needs: build` am
Build-Job; ohne das würde ein Schluckauf der Packages-API ein Deployment verhindern, dessen
Image längst gepusht ist.

**Der Deployment-Titel ist der Anker der Warteschleife.** Dokploy schreibt den bei
`application.deploy` mitgeschickten `title` unverändert in den Deployment-Datensatz; genau
daran findet der Workflow seinen eigenen Lauf wieder. Findet er ihn zwei Minuten lang nicht,
bricht er ab, statt 15 Minuten weiterzupollen - ein stiller Wechsel dieses Verhaltens soll
schnell und deutlich auffallen, nicht als Timeout.

**Nur ein Lauf wartet in der Schlange.** GitHub hält pro Concurrency-Gruppe genau einen
wartenden Lauf; kommt ein dritter dazu, wird der mittlere abgebrochen. Bei drei Merges kurz
hintereinander sieht man deshalb einen abgebrochenen Deploy-Lauf. Für die Produktion ist das
harmlos - das neueste Image gewinnt -, es sieht nur nach Fehlschlag aus.

**`if: github.ref == 'refs/heads/main'`** am Deploy-Job ist nicht dekorativ:
`build-image.yml` hat ein `workflow_dispatch`, das auf jedem Branch laufen kann. Ohne die
Bedingung würde ein manueller Lauf auf einem Feature-Branch ungeprüften Code live schieben.

**`needs: build`** ist das, was "fehlgeschlagener Build löst kein Deployment aus" umsetzt -
kein zusätzlicher `if`-Ausdruck nötig, ein übersprungener oder fehlgeschlagener Job zieht
abhängige Jobs mit.

**Nebenläufige Deploys.** `deploy.yml` hat eine eigene, ref-unabhängige Concurrency-Gruppe
(`deploy-production`, `cancel-in-progress: false`). Zwei gleichzeitige Läufe würden sich sonst
den Image-Tag überschreiben; ein Abbruch mitten im Rollout würde einen halb ausgetauschten
Swarm-Service hinterlassen.

## Verifikation

Nach dem ersten Merge nach `main`:

```bash
export DOKPLOY_API_KEY='...'
APP=7SegzhqX2qLM3NY75qGPR
IP=186.240.157.55
PANEL=https://manage.weissteiner-automation.com

# Läuft der Merge-Commit?
git rev-parse --short=7 origin/main
curl -sS -H "x-api-key: $DOKPLOY_API_KEY" "$PANEL/api/application.one?applicationId=$APP" \
  | jq -r '.dockerImage'

# Antwortet die Anwendung danach?
curl -sSk --resolve weissteiner-automation.com:443:$IP \
  https://weissteiner-automation.com/api/health

# Shared Hosting weiterhin unberührt (ohne --resolve, also über echtes DNS)
curl -sS -o /dev/null -w '%{http_code} %{remote_ip}\n' https://weissteiner-automation.com/
```

Rollback:

```bash
gh workflow run deploy.yml -f image=ghcr.io/theaussie86/wa-website:sha-<alter-commit>
```

Danach dieselbe `application.one`-Prüfung - `dockerImage` muss auf dem alten Tag stehen.

## Ergebnis (verifiziert am 2026-08-08)

| Akzeptanzkriterium | Ergebnis |
|---|---|
| Push auf `main` löst nach erfolgreichem Push automatisch ein Deployment aus | offen - wird beim Merge dieses PRs zum ersten Mal durchlaufen |
| Triviale Textänderung ohne manuellen Eingriff sichtbar | offen |
| Laufende Anwendung referenziert den SHA-Tag des Commits | offen |
| Deploy über HTTPS mit API-Key, kein SSH-Schlüssel in den Secrets | erfüllt - einziges Repository-Secret ist `DOKPLOY_API_KEY` |
| Fehlgeschlagener Build löst kein Deployment aus | erfüllt durch `needs: build` |
| Rollback nachgewiesen | offen |

Die offenen Zeilen lassen sich vor dem Merge nicht belegen: `workflow_dispatch` und der
Aufruf einer wiederverwendbaren Workflow-Datei greifen erst, wenn die Dateien auf `main`
liegen. Direkt nach dem Merge mit den Befehlen oben nachtragen.

## Nicht Teil dieser Änderung

- Vollständiger Smoke-Test nach dem Deploy (#23) - der Workflow prüft den Deployment-Status
  und den Image-Tag, nicht den Inhalt der ausgelieferten Seite.
- DNS-Umstellung auf die VPS (#25).
- Die leere serverseitige Seite (#34).
