---
title: "Rechnungsverarbeitung automatisieren: Schritt für Schritt"
date: "2026-03-05T11:00:00Z"
author:
  name: "Christoph Weissteiner"
  picture: "/images/author/christoph-weissteiner.webp"
excerpt: "Von der eingehenden Rechnung bis zur Zahlung - so automatisieren Sie Ihre Rechnungsverarbeitung. Mit konkreten Tools, Kosten und einer Schritt-für-Schritt-Anleitung."
coverImage: "/blog/rechnungsverarbeitung-automatisieren-schritt-fuer-schritt/cover.webp"
ogImage:
  url: "/blog/rechnungsverarbeitung-automatisieren-schritt-fuer-schritt/cover.webp"
---

Rechnungsverarbeitung ist einer der dankbarsten Prozesse für Automatisierung. Er ist repetitiv, fehleranfällig und kostet überproportional viel Zeit. In diesem Artikel zeige ich Ihnen, wie Sie ihn Schritt für Schritt automatisieren - von der Ist-Analyse bis zur laufenden Lösung.

## Der typische Ist-Zustand

Bevor wir über Automatisierung sprechen, schauen wir uns an, wie Rechnungsverarbeitung in den meisten KMUs heute aussieht:

1. Rechnung kommt per E-Mail (oder Post, Fax, Lieferantenportal)
2. Jemand öffnet die E-Mail und speichert den Anhang
3. Rechnungsdaten werden manuell abgelesen
4. Daten werden ins Buchhaltungssystem eingetragen
5. Prüfung: Stimmt die Rechnung mit der Bestellung überein?
6. Weiterleitung an den Freigeber (oft per E-Mail oder physisch)
7. Freigeber prüft und gibt frei (oder nicht)
8. Zurück an Buchhaltung zur Zahlungsvorbereitung
9. Zahlung wird ausgelöst
10. Archivierung

**Der Zeitaufwand:** Pro Rechnung 5-15 Minuten, je nach Komplexität. Bei 100 Rechnungen pro Monat sind das 8-25 Stunden reine Bearbeitungszeit - ohne Nachfragen, Klärungen und Korrekturen.

## Automatisierung in 5 Schritten

### Schritt 1: Eingangskanäle konsolidieren

Das erste Ziel: Alle Rechnungen an einem Ort sammeln.

**Die Umsetzung:**

- Dedizierte E-Mail-Adresse für Rechnungen (z.B. rechnung@firma.de)
- Lieferanten bitten, nur noch dorthin zu senden
- Post-Rechnungen scannen und an dieselbe Adresse weiterleiten
- Lieferantenportale: Automatischen Download einrichten wo möglich

**Warum wichtig:** Solange Rechnungen über fünf verschiedene Kanäle kommen, ist jede Automatisierung nur halb so effektiv. Die Konsolidierung ist kein technisches Problem, sondern ein organisatorisches - und lohnt sich auch ohne weitere Automatisierung.

**Aufwand:** 1-2 Wochen für die Umstellung, dann minimal.

### Schritt 2: Automatische Datenextraktion (OCR)

Kernstück der Automatisierung: Software liest die Rechnungsdaten automatisch aus.

**Was extrahiert wird:**

- Lieferantenname und -adresse
- Rechnungsnummer und -datum
- Fälligkeitsdatum
- Einzelpositionen (Menge, Beschreibung, Preis)
- Netto, MwSt., Brutto
- Bankverbindung
- Bestellreferenz (falls vorhanden)

**Tool-Optionen:**

| Tool | Typ | Erkennungsrate | Kosten/Monat |
|------|-----|----------------|--------------|
| GetMyInvoices | Cloud | 85-95% | ab 25 EUR |
| DATEV Unternehmen Online | Cloud | 90-98% | ab 15 EUR |
| Klippa | Cloud/API | 90-95% | ab 49 EUR |
| Rossum | Enterprise | 95-99% | auf Anfrage |
| Open Source (Tesseract + eigene Logik) | Self-hosted | 70-85% | 0 EUR (aber Entwicklungsaufwand) |

**Realistische Erwartungen:** Keine OCR-Lösung erreicht 100% Genauigkeit. Planen Sie mit 10-20% manueller Nachbearbeitung - aber das ist immer noch drastisch weniger als 100% manuelle Eingabe.

**Aufwand:** 2-4 Wochen für Einrichtung und Training (die meisten Tools lernen aus Korrekturen).

### Schritt 3: Automatischer Abgleich mit Bestellungen

Hier wird es interessant: Die extrahierten Rechnungsdaten werden automatisch mit offenen Bestellungen abgeglichen.

**Die Logik:**

1. Bestellreferenz in der Rechnung vorhanden?
2. → Ja: Direkt mit dieser Bestellung abgleichen
3. → Nein: Suche nach passender Bestellung (Lieferant + ungefährer Betrag + Zeitraum)
4. Stimmen Menge, Preis und Artikel überein?
5. → Ja: Automatisch zur Freigabe
6. → Nein: Markierung zur manuellen Prüfung

**Abweichungstoleranz definieren:** In der Praxis erlauben viele Unternehmen kleine Abweichungen (z.B. ±2% oder ±50 EUR) für automatische Freigabe. Das beschleunigt den Prozess erheblich.

**Technische Voraussetzung:** Ihr ERP/Warenwirtschaftssystem muss über eine API ansprechbar sein, oder Sie exportieren Bestelldaten regelmäßig in ein Format, das die Automatisierung lesen kann.

**Aufwand:** 1-3 Wochen, stark abhängig von Ihren bestehenden Systemen.

### Schritt 4: Freigabe-Workflow automatisieren

Rechnungen müssen freigegeben werden - aber die Weiterleitung und Erinnerung kann automatisch passieren.

**Der automatisierte Workflow:**

1. Rechnung ist geprüft und bereit zur Freigabe
2. System ermittelt den richtigen Freigeber anhand von:
   - Kostenstelle
   - Betrag (bei höheren Beträgen andere/zusätzliche Freigeber)
   - Lieferant (z.B. IT-Rechnungen an IT-Leitung)
3. Freigeber erhält Benachrichtigung mit Link zur Rechnung
4. Freigabe per Klick (oder App)
5. Bei Nicht-Reaktion: Automatische Erinnerung nach X Tagen
6. Bei Ablehnung: Zurück an Buchhaltung mit Kommentar

**Tool-Optionen:**

- **Dedizierte Lösungen:** Candis, Moss, Spendesk (kombinieren oft OCR + Freigabe)
- **Workflow-Tools:** Microsoft Power Automate, n8n, Make (wenn Sie selbst bauen)
- **In Buchhaltungssoftware:** Viele moderne Lösungen haben eingebaute Freigabe-Workflows

**Aufwand:** 1-2 Wochen für Einrichtung, dann laufende Pflege wenn sich Zuständigkeiten ändern.

### Schritt 5: Integration ins Buchhaltungssystem

Der letzte Schritt: Die freigegebene Rechnung landet automatisch im Buchhaltungssystem.

**Was automatisiert wird:**

- Buchungssatz wird erstellt
- Korrekte Kontierung (Sachkonto, Kostenstelle, Projekt)
- MwSt.-Behandlung
- Fälligkeitsdatum für Zahlungslauf
- Verknüpfung mit Original-Beleg (GoBD-konform)

**Wichtig:** Die meisten Buchhaltungsprogramme haben Import-Schnittstellen (DATEV-Format, CSV, API). Die Herausforderung ist, die Daten in das richtige Format zu bringen und die Kontierung automatisch zu bestimmen.

**Kontierungslogik:** Am einfachsten: Feste Zuordnung pro Lieferant (Lieferant X = immer Konto Y). Komplexer: Regelbasiert nach Rechnungsinhalt. Am aufwendigsten: KI-gestützte Kontierungsvorschläge (lohnt sich erst bei hohem Volumen).

**Aufwand:** 2-4 Wochen, je nach Buchhaltungssystem und gewünschtem Automatisierungsgrad.

## Beispiel-Setup für ein mittelständisches Unternehmen

**Ausgangslage:**
- 150 Eingangsrechnungen pro Monat
- DATEV als Buchhaltung
- SAP Business One als ERP
- Rechnungen kommen zu 80% per E-Mail, 20% Post

**Lösung:**

1. **Eingang:** Dedizierte E-Mail-Adresse, Post wird gescannt
2. **OCR:** GetMyInvoices (extrahiert Daten, speichert Originale)
3. **Abgleich:** Eigene Logik mit n8n (vergleicht mit SAP-Bestellungen)
4. **Freigabe:** Microsoft Teams + Power Automate (Freigeber bekommen Nachricht, klicken Approve)
5. **Buchung:** Export im DATEV-Format, automatischer Import

**Kosten:**
- GetMyInvoices: 49 EUR/Monat
- n8n Cloud: 20 EUR/Monat
- Power Automate: im Microsoft 365 enthalten
- Einmaliger Setup-Aufwand: ca. 8.000 EUR

**Ergebnis:**
- 70% der Rechnungen laufen vollautomatisch durch
- 25% brauchen kurze manuelle Prüfung
- 5% sind Sonderfälle (wie vorher)
- Zeitersparnis: ca. 20 Stunden pro Monat

## Häufige Stolpersteine - und wie Sie sie vermeiden

### "Unsere Lieferanten schicken Rechnungen in allen möglichen Formaten"

**Lösung:** Moderne OCR-Tools kommen mit unterschiedlichen Formaten zurecht. PDF, Bild, auch eingescannte Dokumente. Das Format ist weniger das Problem als die Qualität - schlecht gescannte Dokumente sind schwerer zu lesen.

**Tipp:** Bitten Sie Lieferanten um maschinell erstellte PDFs statt Scans. Das verbessert die Erkennungsrate drastisch.

### "Wir haben viele Sonderfälle"

**Lösung:** Automatisieren Sie zuerst die Standardfälle. Wenn 70% Ihrer Rechnungen einem Muster folgen, automatisieren Sie diese 70%. Die Sonderfälle können weiterhin manuell bearbeitet werden - aber Sie haben trotzdem 70% Arbeit gespart.

### "Unsere Systeme reden nicht miteinander"

**Lösung:** Middleware wie n8n, Make oder Zapier können als Übersetzer fungieren. Wenn Ihr ERP keine API hat: CSV-Export/Import ist oft möglich und kann automatisiert werden.

**Realität:** Bei älteren Systemen ist manchmal die ehrliche Antwort: Die Automatisierung ist möglich, aber der Aufwand rechtfertigt sich erst bei sehr hohem Volumen. In dem Fall: Fokus auf die Schritte, die unabhängig von der ERP-Integration funktionieren (OCR, Freigabe-Workflow).

### "Wie ist das mit der Revisionssicherheit?"

**Lösung:** GoBD-Konformität erfordert, dass Originale unveränderbar archiviert werden und Verarbeitungsschritte nachvollziehbar sind. Die meisten professionellen Tools erfüllen das. Wichtig: Das Original immer aufbewahren, nicht nur die extrahierten Daten.

**Empfehlung:** Klären Sie mit Ihrem Steuerberater, welche Anforderungen für Sie gelten. Die meisten sind weniger streng als befürchtet.

## Kosten-Nutzen-Rechnung

**Beispielrechnung für 150 Rechnungen/Monat:**

| Position | Ohne Automatisierung | Mit Automatisierung |
|----------|---------------------|---------------------|
| Zeitaufwand pro Rechnung | 10 Min | 2 Min (nur Sonderfälle) |
| Monatlicher Zeitaufwand | 25 Stunden | 5 Stunden |
| Kosten (60 EUR/Std intern) | 1.500 EUR | 300 EUR |
| **Ersparnis pro Monat** | - | **1.200 EUR** |
| Toolkosten pro Monat | - | 70-150 EUR |
| **Netto-Ersparnis pro Monat** | - | **1.000-1.100 EUR** |

**Einmalige Kosten:** 5.000-15.000 EUR für Setup (je nach Komplexität)

**Amortisation:** 5-15 Monate

**Nicht eingerechnet:**
- Weniger Fehler = weniger Mahngebühren und Ärger
- Bessere Skontonutzung = direkte Kosteneinsparung
- Schnellere Abschlüsse = bessere Liquiditätsplanung
- Mitarbeiter können sich auf wertschöpfende Arbeit konzentrieren

## Ihr Fahrplan zur automatisierten Rechnungsverarbeitung

**Woche 1-2: Analyse und Vorbereitung**
- Aktuellen Prozess dokumentieren
- Rechnungsvolumen und -typen erfassen
- Schnittstellen der bestehenden Systeme prüfen
- Tool-Auswahl treffen

**Woche 3-4: Pilotphase**
- Tools einrichten (OCR, ggf. Workflow)
- Mit kleiner Rechnungsmenge testen
- OCR-Erkennung trainieren/verbessern
- Freigabe-Workflow definieren

**Woche 5-6: Ausrollen**
- Alle Rechnungen über neuen Prozess laufen lassen
- Monitoring: Was funktioniert, was nicht?
- Feintuning der Automatisierungsregeln

**Ab Woche 7: Optimierung**
- Erkennungsrate verbessern
- Weitere Sonderfälle automatisieren
- Integration vertiefen

## Fazit: Einfach anfangen

Rechnungsverarbeitung zu automatisieren klingt nach einem großen Projekt - und kann es auch sein. Aber Sie müssen nicht alles auf einmal machen.

**Mein Rat:** Starten Sie mit der E-Mail-Konsolidierung und einem OCR-Tool. Das alleine spart schon 30-50% der manuellen Arbeit. Dann erweitern Sie schrittweise.

Die Tools sind da, die Technologie ist ausgereift. Was fehlt, ist oft nur der erste Schritt.

Wenn Sie unsicher sind, wie Rechnungsautomatisierung in Ihrer spezifischen Situation aussehen könnte, [vereinbaren Sie ein Gespräch](/kontakt). In 30 Minuten kann ich einschätzen, welcher Automatisierungsgrad für Sie realistisch und sinnvoll ist.
