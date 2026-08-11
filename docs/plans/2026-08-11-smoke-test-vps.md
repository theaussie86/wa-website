# Smoke-Test der VPS-Umgebung vor dem DNS-Cutover

Issue #23, Teil des VPS-Umzugs (#16). Setzt die Dokploy-Anwendung aus #21 und den
Auto-Deploy aus #22 voraus.

Geprüft wird die HTTP-Oberfläche des laufenden Containers von außen - Statuscodes,
Inhalte, tatsächliche Seiteneffekte. Kein Test kennt Dateipfade im Image, den
Layer-Aufbau oder Dokploy-Interna. Das ist der höchstmögliche Seam: er deckt
Image-Build, Standalone-Runner, Umgebungsvariablen, Routing und Anwendungslogik in
einem ab.

## Ausführen

```bash
# Vor dem Cutover: gegen die Server-Adresse, Host-Header gesetzt.
# Die Live-Domain wird dabei nicht angefasst.
./scripts/smoke-test.sh --ip 186.240.157.55

# Nach dem Cutover: gegen die echte Domain, inklusive Zertifikat und www.
./scripts/smoke-test.sh
```

Zwei Prüfungen haben echte Seiteneffekte und laufen nur auf Zuruf:

```bash
--contact          # sendet eine echte Kontaktanfrage; die Mail wird zugestellt
--doi <email>      # läuft den Double-Opt-in-Pfad durch; die Adresse muss in
                   # Brevo als bestätigter Kontakt existieren
```

Der Schreibtest des Fortschritts ruft die Server Action zweimal auf - einmal setzen,
einmal zurücknehmen. Der Datenbestand ist danach unverändert.

## Warum der Test so geschnitten ist

**Ein Statuscode allein beweist wenig.** #34 hat gezeigt, dass ein leerer Seitenbaum
serverseitig mit Status 200 ausgeliefert werden kann. Jede Seitenprüfung verlangt
deshalb zusätzlich einen Textbaustein im Markup.

**Der Image-Optimizer wird mit `Accept: image/webp` angefragt.** Ohne diesen Header
antwortet Next mit dem Ausgangsformat, und der Encoder läuft nie. Genau der Schritt
bricht, wenn `sharp` gegen die falsche libc gebaut wurde - der einzige native
Abhängigkeitskandidat unter Alpine/musl.

**Der Bestätigungslink wird absolut verglichen, nicht nur am Pfad.** Ein
Pfad-Vergleich hat den Fehler aus #44 zunächst durchgelassen: Der Nutzer klickt
diesen Link in seinem Mailprogramm, ein falscher Host macht ihn wertlos.

**Der Supabase-Nachweis braucht einen Schreibvorgang.** Status 200 auf der
Kapitelseite beweist die Datenbankverbindung nicht: `getCompletedChapters()`
verschluckt jeden Fehler und liefert eine leere Liste, die Seite rendert trotzdem.
Erst der Aufruf von `toggleChapterComplete` zeigt, ob wirklich geschrieben wird.
Die ID der Server Action wechselt mit jedem Build und wird deshalb aus den
ausgelieferten Chunks gelesen statt fest verdrahtet.

**Das Kontaktformular gilt erst mit zugestellter Mail als bestanden.** `success:true`
heißt nur, dass die Gmail-API den Auftrag angenommen hat - das ist der Nachweis, dass
der mehrzeilige `GOOGLE_PRIVATE_KEY` korrekt beim Container ankommt. Die Zustellung
selbst wird im Postfach geprüft, das Skript kann das nicht.

## Ergebnis (2026-08-11, gegen 186.240.157.55)

Erster Lauf: 12 bestanden, 2 fehlgeschlagen. Nach dem Fix von #44: **13 bestanden,
1 fehlgeschlagen.**

| Prüfung | Ergebnis |
|---|---|
| Health-Endpoint liefert `{"status":"ok"}` | grün |
| Startseite, Blog-Übersicht, Blogartikel, Kontaktseite mit Inhalt | grün |
| Statische Assets aus `public/` | grün |
| Image-Optimizer transkodiert nach WebP (100 KB) | grün |
| Kontaktformular angenommen, Mail zugestellt | grün |
| Brevo-Kontaktprüfung im Bestätigungspfad | grün |
| JWT-Token signiert und als Cookie gesetzt | grün |
| Guide-Kapitel mit Token erreichbar, ohne Token gesperrt | grün |
| Bestätigungslink zeigt auf die richtige Adresse | grün seit #44 |
| Fortschritt lässt sich in die Datenbank schreiben | **rot - #47** |

Beide gefundenen Fehler sind keine Regressionen des Umzugs. Sie wurden gegen das
bestehende Shared Hosting gegengeprüft und treten dort genauso auf - der Smoke-Test
hat sie sichtbar gemacht, nicht erzeugt.

Die Container-Plattform selbst ist damit bestätigt: Image, Standalone-Runner,
Routing, `sharp`, MDX-Verarbeitung im Dateisystem, Gmail-Service-Account inklusive
mehrzeiligem privaten Schlüssel und das JWT-Secret arbeiten auf der VPS.

**Bis #47 erledigt ist, lautet das erwartete Ergebnis 13 grün und 1 rot.** Das
Supabase-Projekt existiert nicht mehr (NXDOMAIN); das Freebie-Backend wird durch
selbst gehostetes PocketBase ersetzt. Der rote Schreibpfad ist die Abnahme für #47,
kein offener Punkt des Umzugs - er bleibt bewusst rot stehen, statt aus dem Test
entfernt zu werden.

## Nebenbefunde für den Cutover (#25)

**Die TTL steht bereits auf 300 Sekunden.** Der Rückweg wirkt damit in Minuten.

**`www` ist derzeit ein CNAME auf die Hauptdomain**, kein eigener A-Record:

```
www.weissteiner-automation.com. CNAME weissteiner-automation.com.
weissteiner-automation.com.     A     82.25.102.149
```

Die Entscheidung in #16 lautet: eigener A-Record auf dieselbe Adresse, kein CNAME.
Beim Cutover wird der CNAME also nicht umgehängt, sondern durch einen A-Record
ersetzt.

**Das Shared Hosting steht noch** unter `82.25.102.149` und bleibt der Rückweg.
