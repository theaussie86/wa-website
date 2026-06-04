---
title: "Low-Code vs Code im Mittelstand 2026: Was lohnt sich?"
date: "2026-06-04T08:00:00Z"
author:
  name: "Christoph Weissteiner"
  picture: "/images/author/christoph-weissteiner.webp"
excerpt: "Low-Code vs Code im Mittelstand 2026: Wann n8n reicht, wann eigener Code günstiger ist und warum Zapier und Make oft teurer werden. Klare Empfehlung."
coverImage: "/blog/no-code-low-code-vs-code-mittelstand-2026/cover.webp"
ogImage:
  url: "/blog/no-code-low-code-vs-code-mittelstand-2026/cover.webp"
---

Niemand fragt heute noch "welches Auto kaufe ich". Die Frage ist: E-Auto oder Verbrenner. Erst danach kommt die Marke. Bei Automatisierung im Mittelstand ist es 2026 genauso. Die Diskussion "Zapier oder Make oder n8n" ist die falsche Diskussion. Die echte Entscheidung lautet: Low-Code vs Code im Mittelstand. Und wer das nicht versteht, baut sich gerade leise technische Schulden auf, die in zwei Jahren weh tun werden.

Ich baue seit Jahren Automationen bei KMU im Allgäu. Fertigung, Handwerk, Dienstleistung. Und was ich aktuell sehe: Die Schwelle zwischen "klick dir das in einem No-Code-Tool zusammen" und "schreib es als richtigen Code" verschiebt sich gerade massiv. Nicht wegen neuer Tools. Sondern weil KI das Schreiben von Code für 90 Prozent der Anwendungsfälle entkoppelt hat von "ich brauche dafür einen Entwickler".

Dieser Artikel ist meine Meinung dazu, wann was Sinn macht. Ohne Hype, mit konkreten Zahlen, und mit der Empfehlung, die ich auch meinen Kunden gebe.

## Die drei Wege 2026: No-Code, Low-Code, Code

Damit wir vom Gleichen reden, kurz die Ebenen:

**No-Code (Zapier, Make):** Du klickst Trigger und Aktionen zusammen. Kein Code, keine Variablen-Logik im klassischen Sinn. Make Pro liegt bei rund 16 Euro im Monat, Zapier wird schnell teurer sobald du mehr als ein paar tausend Tasks pro Monat fährst. Stärke: In 20 Minuten läuft was. Schwäche: Sobald die Logik verzweigt, wirst du wahnsinnig.

**Low-Code (n8n, Pipedream):** Du hast immer noch eine visuelle Oberfläche, aber unter der Haube kannst du Code-Blöcke einschieben, eigene HTTP-Requests bauen, Daten transformieren. n8n Cloud liegt bei etwa 20 Euro im Monat, self-hosted auf einem kleinen Server bei ca. 5 bis 10 Euro. Stärke: Du kommst weit ohne Entwickler, aber wenn es kniffelig wird, bist du nicht blockiert. Das ist der Sweet Spot für die meisten KMU heute.

**Code (Python, TypeScript, Node):** Du schreibst die Logik selbst. Läuft als Skript, als kleiner Server, als Serverless Function. Hosting bei Anbietern wie Hetzner oder Fly.io kostet 5 bis 20 Euro im Monat - egal ob 100 oder 100.000 Durchläufe. Stärke: Volle Kontrolle, kein Vendor Lock-in, beliebig komplex. Schwäche bisher: Du brauchst jemanden, der das schreibt und wartet.

Genau dieser letzte Punkt hat sich 2024 und 2025 fundamental verändert.

## Was sich seit 2024 verändert hat

Bis vor zwei Jahren war "Code schreiben" Spezialwissen. Wenn du als Geschäftsführer entschieden hast, eine Automation als Skript bauen zu lassen statt in Make, hieß das: Entwickler einstellen oder eine Agentur beauftragen. Beides teuer, beides langsam, beides mit Abhängigkeit.

Mit Tools wie Claude Code, Cursor und Codex ist das nicht mehr wahr. Ich baue heute bei Kunden Automatisierungen, bei denen die KI 80 bis 90 Prozent des Codes schreibt. Ich beschreibe, was passieren soll, ich prüfe das Ergebnis, ich teste es. Was früher zwei Tage Entwicklerarbeit war, ist heute zwei Stunden begleitete KI-Arbeit.

Das ist der gleiche Bruch wie bei Maschinen in der Fertigung. Mehr dazu habe ich in [KI für KMU - der realistische Einstieg ohne Hype](/blog/ki-fuer-kmu-realistischer-einstieg-ohne-hype) geschrieben. Die Kurzform: KI verschiebt nicht nur, was möglich ist. KI verschiebt vor allem, was wirtschaftlich ist.

Und genau das kippt die Kalkulation zwischen Low-Code und Code. Wenn ich einen Workflow in n8n in drei Stunden klicke, und denselben Workflow als Skript in vier Stunden mit Claude Code baue, dann ist Code in vielen Fällen plötzlich konkurrenzfähig. Inklusive Wartung. Ohne monatliche Tool-Gebühr. Ohne Vendor Lock-in.

## Wann Low-Code für den Mittelstand 2026 noch der richtige Weg ist

Bevor jetzt jemand meint, ich würde n8n und Make abschaffen wollen: Nein. Für die meisten KMU ist Low-Code 2026 immer noch der pragmatische Weg. Konkret:

**1. Standard-Integrationen ohne Sondergetränk.** Webhook kommt rein, Datensatz raus ins CRM. Lead-Formular auf der Website schickt eine Slack-Nachricht und legt einen Datensatz in Pipedrive an. Solche Workflows baue ich in n8n in 30 bis 60 Minuten. Für sowas Code zu schreiben ist Overkill.

**2. Workflows, die ein Operations Manager pflegen können soll.** Wenn die Logik so wichtig ist, dass auch jemand ohne Entwickler-Background sie verstehen und anpassen muss - dann ist visuelles Low-Code Gold wert. Niemand im Büro will Pull Requests reviewen. Aber einen n8n-Node anpassen kann man jemandem in zwei Stunden zeigen.

**3. Schnelles Prototyping.** Du willst testen, ob ein Prozess überhaupt funktioniert? Low-Code in einer halben Stunde live, drei Wochen lernen, dann entscheiden ob es bleibt oder ob es richtig gebaut wird. Das ist ein extrem unterschätzter Use Case.

**4. Kleine Volumina, stabile APIs.** Ein paar hundert Durchläufe pro Monat, eine handvoll Tools, die alle gut dokumentierte APIs haben. Da lohnt sich der Schritt zu Code einfach nicht.

Wenn dein Setup so aussieht: Bleib bei n8n. Oder fang damit an. Mehr dazu, wer das eigentlich für dich bauen sollte, habe ich in [Automatisierung selbst bauen vs Agentur vs Freelancer](/blog/automatisierung-selbst-bauen-vs-agentur-vs-freelancer) festgehalten.

## Wann direkt Code im Mittelstand der bessere Weg ist

Jetzt der Teil, bei dem ich öfter widerspreche als zustimme, wenn ich mit anderen Beratern rede:

**1. Komplexe Geschäftslogik mit vielen Sonderfällen.** Eine Auftragsbestätigungs-Pipeline, bei der je nach Kundentyp, Produktgruppe, Lagerbestand und Lieferpartner unterschiedliche Schritte passieren. Das in n8n zu klicken ergibt einen Knoten-Spaghetti, den nach drei Monaten niemand mehr versteht. In 200 Zeilen Python ist das Ding lesbar, testbar und versionierbar.

**2. Performance-kritische Verarbeitung.** Wenn pro Tag fünf- oder sechsstellig viele Events durchlaufen, kostet dich No-Code echtes Geld. Make berechnet pro Operation. Ein Skript auf einem 10-Euro-Server macht das Gleiche zum Fixpreis.

**3. Viele unsaubere Datenquellen.** Excel-Tabellen vom Vertrieb, CSV-Exporte vom ERP, eine Legacy-Datenbank vom Steuerberater. Wenn du wirklich konsolidieren willst, ist Code im Mittelstand fast immer schneller und robuster als ein visuelles Tool. Mehr dazu in [vertikale KI - der Unterschied zu ChatGPT](/blog/vertikale-ki-unterschied-chatgpt), das geht in dieselbe Richtung: spezifisch schlägt generisch.

**4. Wenn die Logik den eigentlichen Geschäftswert ausmacht.** Wenn deine Automatisierung kein "nice to have" ist, sondern ein zentraler Teil davon, wie du Geld verdienst - dann gehört sie in deine Hand, nicht in die eines US-Anbieters, der morgen seine Preise verdreifachen kann.

Bevor du dich für einen Weg entscheidest: Rechne durch, was es dich tatsächlich spart. Ich habe dafür einen kleinen [ROI-Rechner für Prozessautomatisierung](/tools/roi-rechner) gebaut, der dir in zwei Minuten eine Hausnummer liefert. Mehr Hintergrund zur Kostenseite findest du in [was kostet Prozessautomatisierung im Mittelstand](/blog/was-kostet-prozessautomatisierung-mittelstand).

## Die unsichtbaren Kosten von No-Code

Hier wird es unbequem. Die Rechnung "16 Euro im Monat für Make ist günstiger als ein Entwickler" stimmt nur, solange du die unsichtbaren Kosten ignorierst. Aus meiner Erfahrung sind das die vier, die KMU regelmäßig kalt erwischen:

**Vendor Lock-in.** Du baust 40 Workflows in Make. Make entscheidet, das Pricing umzustellen, und auf einmal kostet dich das nicht 16 Euro, sondern 160. Das ist nicht hypothetisch. Zapier hat es gemacht, Make hat es gemacht, Airtable hat es gemacht. Du hast dann zwei Optionen: zahlen oder migrieren. Beides teuer.

**Skalierungs-Wall.** 1.000 Operations pro Tag sind unauffällig. 100.000 sind plötzlich vierstellige Monatsrechnungen. Viele KMU merken das erst, wenn der Workflow schon kritisch fürs Tagesgeschäft ist - und dann ist Migrieren mitten im Betrieb richtig unangenehm.

**Die Black Box, wenn was bricht.** Wenn ein n8n-Workflow scheitert, kannst du in der Execution-History genau sehen, was passiert ist. Bei manchen No-Code-Tools ist die Fehleranalyse deutlich dünner. Du weißt, dass es gebrochen ist. Du weißt oft nicht, warum. Das frisst die Zeit, die das Tool dir eigentlich sparen soll.

**"Wartungsfrei" gibt es nicht.** Egal ob No-Code, Low-Code oder Code: APIs ändern sich, Zugangsdaten laufen ab, Edge Cases tauchen auf. Der Mythos, dass No-Code keine Wartung braucht, ist einer der teuersten Glaubenssätze im Mittelstand. Du sparst beim Bauen, du zahlst beim Betrieb.

## Mein Setup bei Kunden 2026

So mache ich es konkret. Kein Dogma. Ein Hybrid-Ansatz, der nüchtern entscheidet, welches Werkzeug wo passt:

**Standard-Workflows in n8n.** Lead-Routing, Slack-Notifications, einfache CRM-Sync, Datenabholung von SaaS-APIs. Alles, was visuell gut lesbar ist und vom Kunden später selbst angepasst werden soll. Selbst gehostet, wo möglich. Kostet wenig, läuft stabil, kein US-Vendor in der Mitte.

**Kritische oder skalierende Logik als Code.** Python oder TypeScript, deployed auf Hetzner oder als Serverless Function. Versionskontrolle in Git. Automatisierte Tests, wo es sich lohnt. Gebaut wird mit Claude Code, ich schreibe nicht jede Zeile selbst - aber ich verstehe und verantworte jede Zeile.

**Konkretes Beispiel.** Bei einem Kunden aus der Fertigung im Oberallgäu hatten wir die Situation: Auftragsbestätigungen mussten aus Anfragen erstellt werden, die per E-Mail, per Webformular und per Telefon reinkamen. Pro Anfrage 8 bis 12 Datenpunkte, je nach Produkt unterschiedlich, Sondertarife für Stammkunden, Lieferzeit-Berechnung nach Lagerbestand. Erster Versuch war in Make. Drei Monate später hatten wir 30 Module, niemand wusste mehr, was passiert, wenn Bedingung X und Bedingung Y gleichzeitig zutreffen.

Wir haben es neu gebaut: Eingangs-Webhooks und E-Mail-Parsing weiterhin in n8n, weil das stabil und visuell gut ist. Die eigentliche Auftragslogik als sauberes Python-Skript, das die Anfrage entgegennimmt, die Sonderfälle abarbeitet und das Ergebnis zurück an n8n gibt. n8n macht dann das Versenden und die Ablage. Aufwand für den Umbau: rund 4 Tage. Laufende Kosten ein Drittel von vorher. Fehlerquote praktisch null, weil die Logik jetzt testbar ist.

Das ist nicht spektakulär. Aber genau so sieht ehrlich gebaute Automatisierung im Mittelstand 2026 aus.

## Fazit: Klare Empfehlung

Wenn du gerade vor der Entscheidung Low-Code vs Code im Mittelstand stehst, ist meine Empfehlung in einem Satz:

**Starte mit n8n für Standard-Workflows. Geh zu Code, sobald die Logik komplex, das Volumen hoch oder die Automatisierung geschäftskritisch wird. Vermeide reine No-Code-Tools wie Zapier oder Make für alles, was länger als ein Jahr laufen soll.**

Das ist nicht die ausgewogene Antwort, die du in den meisten Berater-Texten liest. Es ist die Antwort, die ich Kunden gebe, mit denen ich anschließend an einem Tisch sitzen muss, wenn die Rechnung kommt.

Wenn du herausfinden willst, welcher Weg für deinen konkreten Fall der richtige ist: Ich biete ein 30-minütiges Erstgespräch an, kostenlos und ohne Verpflichtung. Ich höre erst zu, bevor ich etwas vorschlage. Wenn am Ende die Antwort lautet "bleib bei dem, was du hast", dann sage ich dir das genauso ehrlich.

[Erstgespräch buchen](/kontakt)
