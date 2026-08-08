# Bildgewicht reduzieren und Image-Optimizer-Cache persistieren

Issue #24, Teil des VPS-Umzugs (#16). Baut auf der Dokploy-Anwendung aus #21 auf.

Zwei getrennte Ursachen für dieselbe Wirkung - Bilder kosten den Server Rechenzeit:
eine 14-MB-Quelldatei, die jede Variante teuer macht, und ein Cache im
Container-Dateisystem, der bei jedem Deployment verschwindet.

## Teil 1: Die Quelldatei

`public/gruenten.jpg` lag bei 5594x3729 Pixeln und 14,3 MB. Verwendet wird die Datei
an genau einer Stelle: als Hintergrund des Heros (`src/app/_components/hero.tsx`),
mit `fill` und `sizes="100vw"`, hinter einem Verlauf, der links 97 % deckt.

Neu: 2560x1707, 569 KB, mozjpeg q78, Chroma-Subsampling 4:2:0. Faktor 25.

**Warum 2560 und nicht kleiner.** Next liefert nie die Quelldatei aus, sondern
transkodierte Varianten aus `deviceSizes` (640 … 3840). Über der Quellbreite wird
nicht hochskaliert, die 3840er-Variante ist also faktisch 2560 breit. Damit ist das
Bild bis zu einer physischen Breite von 2560 px scharf - alles darunter, inklusive
1440-px-Displays mit doppelter Pixeldichte bis 1280 CSS-Pixel Viewport. Auf einem
4K-Display bleibt eine Spur Weichheit übrig, hinter einem Verlauf mit 74 bis 97 %
Deckung an der Bildmitte.

**Warum die Größe der Quelldatei überhaupt zählt**, obwohl sie nie ausgeliefert wird:
Sie ist die Eingabe jedes Transkodiervorgangs. Gemessen mit sharp 0.34.5, Resize auf
1920 px und WebP q75, bester von drei Läufen:

| Quelle | Zeit pro Variante |
|---|---|
| 14,3 MB, 5594 px | 587 ms |
| 569 KB, 2560 px | 212 ms |

Der Wert im SEO-Audit (`docs/seo-audit-2026-03-06.md`, "< 200 KB") zielte auf die
ausgelieferte Datei und setzt direkte Auslieferung voraus. Über den Optimizer sind es
für die 640er-Variante ohnehin rund 37 KB WebP. Für die Quelle ist die relevante
Größe die Rechenzeit, nicht die Bytes auf der Leitung.

Nicht angefasst: die 14 MB liegen weiterhin in der Git-Historie. Sie herauszuschreiben
hieße, die Historie neu zu schreiben - unverhältnismäßig für einen einmaligen Blob.

## Teil 2: Der Cache

Der Image-Optimizer legt Varianten unter `<distDir>/cache/images` ab
(`next/dist/server/image-optimizer.js:687`). Im Standalone-Container ist das
`/app/.next/cache/images`, und das liegt in der Schreibschicht des Containers. Jedes
Deployment erzeugt einen neuen Container, also einen leeren Cache: jede Variante jedes
Bildes wird danach einmal neu berechnet, mit den Zeiten aus der Tabelle oben.

Ein Docker-Volume auf genau diesem Pfad löst das.

| Was | Wert |
|---|---|
| Mount Type | Volume Mount |
| Volume Name | `wa-website-image-cache` |
| Mount Path | `/app/.next/cache/images` |

**Nur `images`, nicht `/app/.next/cache`.** Unter `cache` liegen auch ISR- und
Fetch-Ergebnisse. Die über ein Deployment zu retten wäre kein Cache-Treffer, sondern
ausgelieferter Inhalt aus einem alten Build.

### Der Preis: der Cache-Schlüssel kennt den Bildinhalt nicht

```js
// next/dist/server/image-optimizer.js:677
static getCacheKey({ href, width, quality, mimeType }) {
  return getHash([CACHE_VERSION, href, width, quality, mimeType])
}
```

Der Upstream-ETag steht nur im Dateinamen des Eintrags, nicht im Schlüssel. Ein
gültiger Eintrag wird ausgeliefert, ohne dass die Quelldatei überhaupt angefasst
wird (`next-server.js:212`).

Solange jedes Deployment einen leeren Cache ausrollte, war das folgenlos - genau
darauf berief sich der bisherige Kommentar zu `minimumCacheTTL: 2592000`. Das
Volume nimmt diese Begründung weg. Wird `public/gruenten.jpg` durch ein anderes
Foto ersetzt, bleibt `href` derselbe, also auch der Schlüssel: Besucher bekämen bis
zu 30 Tage lang das alte Bild, über Deployments hinweg, und ein Redeploy hilft
nicht - nur das Löschen des Volumes.

Deshalb steht die Grenze jetzt bei einem Tag:

```ts
minimumCacheTTL: 86400,
```

Das Ablaufen kostet fast nichts. Next liest danach die Quelldatei erneut ein,
vergleicht den ETag und übernimmt bei Gleichstand den bereits transkodierten Puffer
(`getPreviouslyCachedImageOrNull`, `image-optimizer.js:858`) - neu gerechnet wird
nur, wenn sich die Datei wirklich geändert hat. Der Wert ist zugleich das
`max-age`, das Browser sehen; ein Tag ist dort ebenfalls vertretbar.

Wer eine Bilddatei unter gleichem Pfad austauscht und das Ergebnis sofort sehen
will, löscht das Volume. Das ist die einzige Stelle, an der dieser Cache
Handarbeit verlangt.

### Der Ordner muss vor dem Volume da sein

Im Dockerfile:

```dockerfile
RUN mkdir -p /app/.next/cache/images && chown -R nextjs:nodejs /app/.next/cache
```

Docker übernimmt beim ersten Anhängen eines leeren Volumes Rechte und Eigentümer des
Pfades, der im Image an dieser Stelle liegt. Fehlt der Pfad, legt Docker den
Mount-Punkt an - und der gehört root. Der Prozess läuft als `nextjs` (uid 1001) und
kann dann nicht schreiben.

Das ist der Fehlerfall, den man nicht bemerkt: Der Optimizer wirft keinen sichtbaren
Fehler, er liefert die Bilder weiter aus. Er berechnet sie nur jedes Mal neu - also
exakt der Zustand, den dieses Ticket beseitigen soll, hinter einer Konfiguration, die
korrekt aussieht.

Gegenprobe im lokal gebauten Image:

```
$ docker run --rm --entrypoint sh -v test:/app/.next/cache/nichtvorhanden IMAGE \
    -c 'ls -ld /app/.next/cache/nichtvorhanden; touch .../.probe'
drwxr-xr-x 1 root root ...
touch: /app/.next/cache/nichtvorhanden/.probe: Permission denied

$ docker run --rm --entrypoint sh -v test:/app/.next/cache/images IMAGE \
    -c 'ls -ld /app/.next/cache/images'
drwxr-xr-x 1 nextjs nodejs ...
```

**Daraus folgt eine Reihenfolge:** erst das Image mit dem `mkdir` ausrollen, dann das
Volume anlegen. Umgekehrt merkt sich das Volume das root-Eigentum dauerhaft, und ein
späteres Image repariert das nicht mehr - der Mount überdeckt den Pfad aus dem Image.
Reparatur ist dann nur: Volume entfernen, löschen, neu anlegen.

### Obergrenze

```ts
maximumDiskCacheSize: 128 * 1024 * 1024,
```

Ohne diesen Wert nimmt Next die Hälfte der freien Kapazität des Dateisystems als
Grenze (`disk-lru-cache.external.js:41`). Im Container war das die Schreibschicht,
die ein Deployment ohnehin wegräumte. Auf einem Volume ist es die Systemplatte der
VPS, und die Grenze wäre eine, die man nicht bemerkt, bevor sie erreicht ist.

Die Zahl ist bewusst knapp gehalten. Next baut den LRU beim Start auf, indem es
**jeden** Eintrag einmal vollständig einliest (`initCacheEntries`,
`image-optimizer.js:179`). Diese Kosten gab es bisher nicht, weil der Cache bei
jedem Start leer war. Der reale Bestand - acht Bilder in acht Breiten und zwei
Formaten - liegt im niedrigen zweistelligen MB-Bereich; 128 MB sind zehnfacher
Spielraum, darüber verdrängt der LRU die am längsten ungenutzten Einträge.

### Zwei Container am selben Volume

Beim `start-first`-Rollover laufen der neue und der auslaufende Container einige
Sekunden gleichzeitig, beide mit demselben Volume. `writeToCacheDir` löscht das
Schlüsselverzeichnis und legt es neu an, bevor es schreibt - zwei gleichzeitige
Schreibvorgänge auf denselben Schlüssel können sich also in die Quere kommen.

Der Ausgang ist harmlos: `get()` fängt den Lesefehler ab und behandelt ihn als
Fehltreffer (`image-optimizer.js:754`). Schlimmstenfalls wird eine Variante einmal
zusätzlich berechnet. Kein Grund, dagegen etwas zu bauen.

## Durchführung

Das Volume wird nicht aus dem Repository heraus angelegt - der `DOKPLOY_API_KEY`
liegt als GitHub-Actions-Secret, nicht lokal. Der Weg ist
`scripts/dokploy-image-cache-volume.sh`: fünf Stufen, führt durch das Panel, prüft
per API nach und belegt am Ende selbst, ob der Cache ein Deployment überlebt.

```bash
./scripts/dokploy-image-cache-volume.sh
```

Auszuführen **nach** dem Deployment eines Images, das den `mkdir`-Schritt enthält.
Die erste Stufe fragt genau das ab und zeigt den eingetragenen Tag an.

Der Code dieses Tickets - Dockerfile, `next.config.ts`, die neue Bilddatei und der
Wizard - ist über PR #37 auf `main` gelandet, nicht über einen eigenen PR: eine
parallel laufende Sitzung hatte im selben Arbeitsverzeichnis den Branch gewechselt
und die noch nicht eingecheckten Änderungen mitgenommen. Inhaltlich sind es dieselben
Änderungen; nur die Zuordnung im Verlauf stimmt nicht. Der Build zu diesem Merge ist
das erste Image mit dem Ordner - ab ihm darf das Volume angelegt werden.

## Verifikation

Lokal belegt, im Container aus diesem Dockerfile, mit einem frischen Volume auf
`/app/.next/cache/images`:

| Prüfung | Ergebnis |
|---|---|
| Mount-Punkt gehört dem Laufzeitbenutzer | `drwxr-xr-x nextjs nodejs`, `touch` erfolgreich |
| Erster Abruf einer Variante rechnet | `w=384`: 113 ms |
| Zweiter Abruf kommt aus dem Cache | `w=384`: 5 ms |
| Ablage landet im Volume | 2 Einträge unter `/app/.next/cache/images` |
| Cache überlebt den Containerwechsel | Container ersetzt, Volume behalten, `w=384`: 31 ms |
| Kontrolle im selben Fenster, nie abgerufen | `w=256`: 88 ms - also gerechnet, nicht gelesen |

### Warum der Wizard nicht die Zeit misst

Die Tabelle oben stammt aus einem Container auf demselben Rechner. Gegen die VPS
trägt dieselbe Messung nicht mehr: Der erste Entwurf des Wizards verlangte, dass
der zweite Abruf weniger als die Hälfte des ersten braucht. Nachgemessen über die
echte Leitung waren Treffer und Fehltreffer beide bei rund 0,1 s - die
Transkodierzeit ist seit der Verkleinerung der Quelldatei kleiner als die
Schwankung der Netzlaufzeit. Ein Verhältnis hilft dagegen nicht, weil TCP- und
TLS-Aufbau als **Summand** in beiden Werten stecken, nicht als Faktor. Die Prüfung
hätte auf einer funktionierenden Installation Alarm geschlagen und zum Löschen
eines intakten Volumes geraten.

Next beantwortet die Frage ohnehin direkt:

```
$ curl -sSkI '.../_next/image?url=%2Fgruenten.jpg&q=75&w=128'
x-nextjs-cache: MISS
$ curl -sSkI '.../_next/image?url=%2Fgruenten.jpg&q=75&w=128'
x-nextjs-cache: HIT
```

Der Wizard wertet diesen Header aus - ohne Schwellenwert, ohne Zeitmessung. Die
Gegenprobe bleibt trotzdem Teil der letzten Stufe: eine nie abgerufene Breite muss
nach dem Deployment `MISS` melden. Ohne sie wäre ein `HIT` auch damit erklärbar,
dass gar kein neuer Container läuft.

Beides gegen die Produktion vorab geprüft: `w=128` liefert `MISS`, dann `HIT`.

In Produktion offen, bis der Wizard gelaufen ist: dass das Volume angelegt ist und
ein `HIT` ein Deployment übersteht.

## Was das Ticket bewusst offenlässt

- **Der Container ist nicht mehr zustandslos.** Der Inhalt ist reiner Cache, jederzeit
  verlustfrei löschbar; das Löschen kostet einmalig Rechenzeit, keine Daten. Beim
  nächsten Serverumzug ist es ein Speicher mehr im Gepäck, aber keine Datenmigration.
- **Kein vorgelagerter CDN- oder Proxy-Cache.** Das alte Shared Hosting hat im
  Webserver gecacht, Traefik tut das nicht. Beim aktuellen Traffic unkritisch; wird
  nachgezogen, wenn es messbar weh tut.
- **`deviceSizes` bleibt der Standard.** Weniger Varianten hieße weniger
  Transkodiervorgänge, aber die fallen mit persistentem Cache nur noch einmal pro
  Variante an - der Hebel ist damit weg.
