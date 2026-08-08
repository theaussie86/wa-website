# Image in GitHub Actions bauen und nach GHCR pushen

Issue #20, Teil des VPS-Umzugs (#16). Baut auf dem Dockerfile aus #17 auf.

Ziel: Jeder Push auf `main` erzeugt ein Image in der GitHub Container Registry, getaggt mit
dem kurzen Commit-SHA und `latest`. Der Build läuft ausschließlich in Actions, nie auf dem
Server. Alte Package-Versionen werden im selben Lauf aufgeräumt.

## Was der Workflow tut

`.github/workflows/build-image.yml`, ausgelöst durch Push auf `main` (und manuell über
`workflow_dispatch`):

1. Login an `ghcr.io` mit dem automatisch bereitgestellten `GITHUB_TOKEN`.
2. Build mit buildx und GitHub-Actions-Layer-Cache (`type=gha`, `mode=max`).
3. Push unter zwei Tags: `sha-<7 Zeichen>` und - nur auf `main` - `latest`.
4. Löschen alter Package-Versionen, die letzten fünf bleiben.

Der bestehende CI-Workflow (Typecheck und Build) bleibt unverändert und läuft parallel.

## Entscheidungen, die im Workflow stecken

| Punkt | Warum so |
|---|---|
| `packages: write` statt eines eigenen Tokens | `GITHUB_TOKEN` existiert nur für die Dauer des Laufs. Ein dauerhaftes PAT braucht erst die VPS (lesend, #21). |
| `labels` aus `docker/metadata-action` | Setzt `org.opencontainers.image.source`. Erst dadurch verknüpft GHCR das Package mit dem Repository - und erst dann darf `GITHUB_TOKEN` Versionen löschen. Ohne das Label scheitert der Aufräumschritt mit 403. |
| `provenance: false` | buildx legt sonst pro Push ein zusätzliches Attestation-Manifest als eigene Package-Version an. Die Retention würde dann Attestations mitzählen statt fünf echte Images zu behalten. |
| `setup-buildx-action` | Der Default-Docker-Driver kann `type=gha` nicht. Ohne diesen Schritt gibt es schlicht keinen Cache. |
| `cancel-in-progress: false` | Zwei schnell aufeinanderfolgende Merges dürfen sich nicht gegenseitig abbrechen. Der abgebrochene Commit hätte sonst kein Image - und damit fehlt genau der Rollback-Anker, der bei einem kaputten Folge-Merge gebraucht wird. Die Läufe reihen sich stattdessen auf. |
| `latest` nur auf dem Default-Branch | `workflow_dispatch` lässt sich auf jedem Branch starten. Ohne `enable={{is_default_branch}}` würde ein manueller Lauf `latest` auf ungeprüften Code zeigen lassen. Der SHA-Tag bleibt unbeschränkt: er benennt den Commit, aus dem er stammt, und taugt zum Testen eines Branch-Images. |
| GTM-ID als Repository-*Variable* | Der Wert steht ohnehin im ausgelieferten HTML. Als Secret wäre er in Logs maskiert, ohne irgendetwas zu schützen. |

## Einmalige Einrichtung (erledigt)

Repository-Variable (kein Secret):

```bash
gh variable set NEXT_PUBLIC_GTM_ID --body "GTM-T2XKWWV8"
```

Fehlt die Variable, ist das Build-Argument leer, `gtm-script.tsx` rendert nichts und der
Build läuft trotzdem durch - Tracking ist dann still aus.

## Sichtbarkeit des Packages

Das Repository ist öffentlich, ein neu angelegtes GHCR-Package ist es **nicht**: GHCR legt
Packages beim ersten Push privat an, unabhängig von der Repository-Sichtbarkeit. Es gibt
nichts umzustellen - aber es ist zu prüfen, weil ein versehentlich öffentliches Package den
kompilierten Quellcode ausliefert.

Nach dem ersten Lauf im UI kontrollieren:
`https://github.com/users/theaussie86/packages/container/package/wa-website` →
**Package settings** → Danger Zone zeigt die aktuelle Sichtbarkeit.

## Verifikation

Nach dem ersten Push auf `main`:

```bash
# Lauf beobachten
gh run watch

# Package existiert, Tags stimmen
gh api /user/packages/container/wa-website/versions \
  --jq '.[] | {id, tags: .metadata.container.tags, created: .created_at}'
```

Erwartet: eine Version mit den Tags `sha-<kurzer SHA>` und `latest`.

Ohne Zugangsdaten darf nichts kommen (Package ist privat):

```bash
curl -sS -o /dev/null -w '%{http_code}\n' \
  https://ghcr.io/v2/theaussie86/wa-website/manifests/latest
# erwartet: 401
```

Pull und Start von außen, mit einem Token, das `read:packages` kann:

```bash
echo "$GHCR_READ_TOKEN" | docker login ghcr.io -u theaussie86 --password-stdin
docker pull ghcr.io/theaussie86/wa-website:sha-<kurzer SHA>
docker run --rm -p 3000:3000 ghcr.io/theaussie86/wa-website:sha-<kurzer SHA>

curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/          # 200
curl -s http://localhost:3000/api/health                                  # Erfolgsobjekt
```

Die GTM-ID steht **nicht** im initialen HTML - aber nicht, weil das so gedacht wäre: der
gesamte Seitenbaum fehlt im serverseitigen HTML (siehe #34). Die ID wird zur Build-Zeit in
einen JS-Chunk inlined, dort wird geprüft:

```bash
found=""
for CH in $(curl -sf http://localhost:3000/ \
    | grep -oE '/_next/static/chunks/[A-Za-z0-9._%-]+\.js' | sort -u); do
  if curl -sf "http://localhost:3000$CH" | grep -q 'GTM-T2XKWWV8'; then
    echo "gefunden in $CH"; found=1; break
  fi
done
[ -n "$found" ] || { echo "GTM-ID NICHT gefunden - Build-Argument prüfen"; exit 1; }
```

Der `found`-Zweig ist nicht Kosmetik: ohne ihn schweigt die Schleife gleichermaßen, wenn die
ID fehlt, wenn der Container nicht läuft und wenn `grep` keinen Chunk findet. Stille wäre
sonst sowohl das Erfolgs- als auch jedes Fehlersignal.

Cache-Wirkung: nach einer reinen Textänderung erneut pushen und die Dauer des Schritts
"Build und Push" mit dem ersten Lauf vergleichen. Der erste Lauf hat keinen Cache und baut
alles; der zweite darf nur die Stufen ab `COPY . .` neu bauen.

Retention: nach dem sechsten Lauf zählen.

```bash
gh api /user/packages/container/wa-website/versions --jq 'length'
# erwartet: <= 5
```

## Ergebnis (erster Lauf, 2026-08-08)

Lauf `31278632248` auf `main` (Merge-Commit `d363d22`), Job "Build & Push to GHCR": erfolgreich.

| Kriterium | Ergebnis |
|---|---|
| Push auf `main` erzeugt ein Image | Ja, Lauf grün |
| Tags | `sha-d363d22` und `latest` - beide aus `DOCKER_METADATA_OUTPUT_JSON` bestätigt |
| Package mit dem Repository verknüpft | `org.opencontainers.image.source=https://github.com/theaussie86/wa-website` im Manifest |
| Anonymer Abruf | `https://ghcr.io/v2/theaussie86/wa-website/manifests/latest` liefert 401; mit anonymem Registry-Token 404. Das Package ist nicht öffentlich abrufbar, obwohl das Repository öffentlich ist |
| Aufräumschritt | Lief ohne Fehler durch (kein 403). Es gab erst eine Version, also nichts zu löschen |

Noch offen, weil erst mehr Läufe nötig sind: die Cache-Wirkung im zweiten Lauf und die
Retention ab dem sechsten Lauf. Beide Prüfbefehle stehen oben.

Ein Pull von außen braucht ein Token mit `read:packages`. Das lokale `gh`-Token hat den
Scope nicht (`gh auth refresh -h github.com -s read:packages`); das dauerhafte
Registry-Credential der VPS entsteht ohnehin erst in #21 und deckt diese Prüfung mit ab.

## Fallen

**Aufräumschritt scheitert mit 403.** Das Package ist nicht mit dem Repository verknüpft.
Ursache ist fast immer ein fehlendes `org.opencontainers.image.source`-Label, also ein
weggelassenes `labels:` im Build-Schritt. Bereits gepushte, unverknüpfte Packages verknüpfen
sich nicht rückwirkend - dann im UI unter **Package settings → Manage Actions access** das
Repository hinzufügen.

**Mehr als fünf Versionen trotz Retention.** Meist Attestation-Manifeste. `provenance: false`
prüfen.

**Cache greift nicht.** `setup-buildx-action` fehlt, oder der Cache ist nach sieben Tagen
ohne Zugriff von GitHub verworfen worden (normales Verhalten, kein Fehler). Auch das
10-GB-Limit pro Repository räumt nach LRU auf.

**Build hängt an `npm ci`.** Der Lockfile hat sich geändert, damit ist die Dependency-Stufe
kalt. Das ist der teure Fall und genau der, den der Cache nicht abfangen kann.

## Nicht Teil dieser Änderung

- Deploy-Trigger gegen die Dokploy-API (#22).
- Registry-Credential der VPS, das PAT mit `read:packages` (#21).
- Health-Endpoint und Dockerfile (#17, erledigt).
