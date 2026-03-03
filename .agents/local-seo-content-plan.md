# Local SEO & Content Plan

## Ziel
Besseres lokales Ranking + nachhaltige Blog-Strategie aufbauen

---

## Phase 1: Technische SEO-Grundlagen (Woche 1)

### 1.1 robots.txt erstellen
- [x] Datei `public/robots.txt` anlegen
- [x] Sitemap-Referenz einfügen
- [x] Wichtige Pfade erlauben, unwichtige ausschliessen

### 1.2 Sitemap.xml implementieren
- [x] Next.js Sitemap-Generierung einrichten (`app/sitemap.ts`)
- [x] Alle wichtigen Seiten inkludieren (inkl. Impressum & Datenschutz)
- [ ] Bei Google Search Console einreichen

### 1.3 Schema Markup erweitern
- [x] LocalBusiness → ProfessionalService (erledigt)
- [x] Öffnungszeiten hinzugefügt (erledigt)
- [x] sameAs mit Google Maps + LinkedIn (erledigt)
- [x] Service Schema für jede Leistung hinzufügen (3 Services: Prozessautomatisierung, Web-/App-Entwicklung, KI-Integration)

---

## Phase 2: Lokale Landing Pages (Woche 2-3)

### 2.1 Regionale Seiten erstellen
Ziel: Lokale Suchbegriffe abdecken

| Seite | Target Keywords |
|-------|-----------------|
| `/prozessautomatisierung-allgaeu` | "Prozessautomatisierung Allgäu", "Automatisierung Memmingen" |
| `/ki-beratung-bayern` | "KI Beratung Bayern", "KI Mittelstand Süddeutschland" |
| `/softwareentwicklung-dach` | "Individuelle Software DACH", "Fullstack Entwickler Allgäu" |

### 2.2 Struktur pro lokale Seite
- H1 mit lokalem Bezug
- Lokale Referenzen (Kunden aus der Region erwähnen, falls möglich)
- Eingebettete Google Maps Karte
- LocalBusiness Schema mit spezifischer areaServed
- CTA zu Kontaktseite

---

## Phase 3: Blog-Aufbau (Woche 3-6)

### 3.1 Content Pillars definieren

**Pillar 1: Prozessautomatisierung** (SEO-fokussiert)
- Suchintention: Informational + Commercial

**Pillar 2: KI im Mittelstand** (Thought Leadership)
- Suchintention: Informational

**Pillar 3: Praxisberichte** (Trust Building)
- Case Studies, Learnings, Behind-the-Scenes

### 3.2 Erste Blog-Artikel (Priorität)

| # | Titel | Pillar | Suchintention | Priorität |
|---|-------|--------|---------------|-----------|
| 1 | "Was kostet Prozessautomatisierung im Mittelstand?" | Automatisierung | Decision | Hoch |
| 2 | "5 Prozesse die jedes KMU automatisieren sollte" | Automatisierung | Awareness | Hoch |
| 3 | "Rechnungsverarbeitung automatisieren: Schritt für Schritt" | Automatisierung | Consideration | Mittel |
| 4 | "KI für KMU: Ein realistischer Einstieg ohne Hype" | KI | Awareness | Mittel |
| 5 | "Automatisierung selbst bauen vs. Agentur vs. Freelancer" | Automatisierung | Decision | Hoch |

### 3.3 Blog-Artikel Template

```markdown
---
title: "[Keyword] - [Nutzenversprechen]"
excerpt: "Max 160 Zeichen für Meta Description"
date: "YYYY-MM-DD"
author: "Christoph Weissteiner"
coverImage: "/blog/[slug]/cover.jpg"
---

## [H2 mit Keyword-Variation]

[Einleitung - Problem ansprechen, Keyword in ersten 100 Wörtern]

## [Hauptteil - 3-5 H2 Abschnitte]

### [H3 für Unterpunkte]

## Fazit

[Zusammenfassung + CTA]

---

**Nächster Schritt:** [Link zu Kontakt oder verwandtem Artikel]
```

### 3.4 SEO-Checkliste pro Artikel
- [ ] Keyword in Titel, H1, URL, ersten 100 Wörtern
- [ ] Meta Description (150-160 Zeichen) mit CTA
- [ ] Mindestens 2 interne Links (Leistungen, Kontakt, andere Artikel)
- [ ] Alt-Text für alle Bilder
- [ ] Article Schema wird automatisch generiert
- [ ] Mindestens 1.500 Wörter für Hauptthemen

---

## Phase 4: Ongoing (laufend)

### 4.1 Google Business Profile
- [ ] Wöchentlicher/zweiwöchentlicher Beitrag
- [ ] Auf Bewertungen antworten (falls vorhanden)
- [ ] Fotos aktuell halten

### 4.2 Content Kalender
- Ziel: 2 Artikel pro Monat
- 1x SEO-fokussiert (Prozessautomatisierung)
- 1x Thought Leadership oder Case Study

### 4.3 Performance Tracking
- Google Search Console einrichten (falls nicht vorhanden)
- Monatlich Rankings für Ziel-Keywords prüfen
- Blog-Traffic analysieren

---

## Nächste konkrete Schritte

1. **Heute:** robots.txt + sitemap.ts erstellen
2. **Diese Woche:** Service Schema hinzufügen
3. **Nächste Woche:** Ersten Blog-Artikel schreiben (Kosten-Thema)
4. **In 2 Wochen:** Erste lokale Landing Page erstellen

---

## Ressourcen

- [Google Rich Results Test](https://search.google.com/test/rich-results) - Schema prüfen
- [Google Search Console](https://search.google.com/search-console) - Indexierung überwachen
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance prüfen
