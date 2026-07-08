# Auftrag: Homepage-Relaunch Weissteiner Automation

Du implementierst ein abgestimmtes Design- und Messaging-Konzept für die **Startseite** von
Weissteiner Automation (Next.js 16, React 19, Tailwind v4, Framer Motion, Lucide).
Zwei Ziele in einem: die Seite wirkt heute "Einheitsbrei" (viermal dasselbe 3-Spalten-Grid)
und trägt eine veraltete, trockene Botschaft. Beides wird gefixt.

**Messaging-Basis (verbindlich):** `docs/messaging/nordstern.md`. Claim: **Machen statt warten.**
Anrede durchgehend **Du**. Dort steht das komplette Copy Deck, aus dem du die Texte übernimmst.

## Zielgruppe & Ton
Hands-on Geschäftsführer, Inhaber und Manager im Mittelstand, Handwerk und Fertigung
(Allgäu/DACH), die selbst anpacken wollen, statt alles zu delegieren. Feind ist das Warten.
Ton: direkt, auf Augenhöhe, per Du, Klartext. Der, der redet, baut auch. Kontext in
`product-marketing-context.md`.

## Harte Regeln
- Deutsche Inhalte mit **echten Umlauten** (ä ö ü ß), niemals ae/oe/ue/ss im Text.
- **Keine Gedankenstriche**, nur einfache Bindestriche.
- Immer "KI" schreiben, **niemals "die KI"**.
- Anrede durchgehend **Du**. Keine Ausrufezeichen.
- Copy 1:1 aus `docs/messaging/nordstern.md` übernehmen (nicht neu erfinden).
- **Nur die Startseite.** Andere Seiten/Routen nicht anfassen.
- Projekt-Design-Tokens nutzen (`tailwind.config.ts`, `globals.css`), keine rohen Tailwind-Defaultfarben.
- **Lighthouse Accessibility 100**, WCAG-Kontraste einhalten.
- Jede Animation mit `prefers-reduced-motion`-Fallback (Inhalt erscheint dann sofort).
- Kein Voll-Dark-Theme. "Dunkel" meint nur 1 bis 2 einzelne Akzent-Sektionen.

## Relevante Dateien
- Seite: `src/app/page.tsx`
- Sektionen: `src/app/_components/{hero,problem-section,solution-section,services-preview,trust-section,testimonials,cta-section}.tsx`
- Motion: `src/app/_components/animations.tsx`, `rotating-word.tsx`
- Tokens: `tailwind.config.ts`, `src/app/globals.css`
- Links/Konstanten: `src/lib/constants.ts` (`CAL_LINK`, `WHATSAPP_LINK`, `LOCATION`)
- Assets: `public/gruenten.jpg`, `public/images/author/christoph-weissteiner.webp`, Logos in `public/`

## Design-Prinzipien (Filter für jede Entscheidung)
1. **Ein Hauptdarsteller pro Sektion** - eins groß, Rest tritt zurück.
2. **Rhythmus statt Raster-Wiederholung** - jede Sektion eine andere Form.
3. **Motion mit Bedeutung** - Bewegung nur, wenn sie etwas erzählt.
4. **Bodenständig = warm + präzise** - warme Neutraltöne, scharfe Kanten, echte Fotos statt Icons.

## CI- / Token-Update
- Farben bleiben: Primary `#003970`, Accent `#D86B00`, Warm-White `#FAF9F7`, Charcoal `#2D3436`.
- Neue Rolle **Ink** `#00172E` für dunkle Akzent-Sektionen.
- **WCAG-Fix (wichtig):** Weiß auf `#D86B00` erreicht nur ~3,5:1. `btn-primary` auf
  `accent-600 #AD5600` umstellen (~5:1), oder Orange nur für große/fette Schrift und Flächen.
  Kleiner Fließtext nie in Orange, dafür Blau.
- **Spacing-Rhythmus** großzügiger: Sektionen `clamp(64px, 9vw, 108px)` statt heutigem `py-16/24`.
- **Radius bewusst scharf lassen** (`rounded-xs`) als Marken-Trait "handwerklich, präzise".
- **Typo:** Bree Serif (Display) plus Raleway (Body) bleiben. Display-Skala nach oben aufmachen
  für mehr Wucht (fluide `clamp`), `text-wrap: balance` auf Headlines.
- **Icons:** inline Heroicons-SVGs raus, **Lucide** (bereits Dependency), Strichstärke 1.5.
- **Motion-Tokens:** Easing `cubic-bezier(0.22, 1, 0.36, 1)`, Dauer 0.5 bis 0.7s.

## Sektion-für-Sektion (7 Stück, je andere Form)
Texte aus `docs/messaging/nordstern.md`, Abschnitt Copy Deck / Homepage.

1. **Hero** - Grünten-Foto zurückholen, kräftig statt weggedimmt: Verlauf, der nur die Textseite
   abdunkelt (nicht `bg-white/70` Vollschleier). Text linksbündig, asymmetrisch. Portrait
   (`christoph-weissteiner.webp`) als angeschnittene Kachel = Trust-Anker. Kicker "MACHEN STATT WARTEN",
   H1 "Dein Betrieb wird digital handlungsfähig. In Tagen, nicht Monaten.", CTA "Direkten Draht aufbauen".
   Rotating Word optional, ruhig. Motion: Foto parallaxt langsamer als Text, Load-Reveal gestaffelt.
2. **Problem** - weg von 3 gleichen Karten. Editorial: große linksbündige Aussage ("Warten kostet
   dich mehr als jedes Projekt.") plus 3 Schmerzpunkte (Warteschleife, Abhängigkeit, Kleinkram) als
   nummerierte Zeilen-Liste mit viel Luft. Motion: Zeilen scrubben nacheinander sanft von links ein.
3. **So schnell geht's = Signature-Moment, dunkelblaue Sektion (`#00172E`).**
   ACHTUNG: Inhalt geändert. Nicht mehr "System Stacking". Neue Story: der 3-Schritt "Vom das nervt
   zum läuft" (Kurzer Draht, Schnell umgesetzt, Du machst weiter). Der Scroll-Mechanik bleibt: Sektion
   pinnt (`position: sticky`), die 3 Bausteine bauen sich Schritt für Schritt scroll-gekoppelt auf
   (Framer Motion `useScroll`/`useTransform`). Orange leuchtet auf Dunkel. Reduced-Motion: sofort sichtbar.
4. **Leistungen** - eine große Kachel ("Schnell online") plus zwei kleinere ("Kleinkram läuft von
   selbst", "KI, die du selbst bedienst") = Hierarchie. Echte Vorschau-Bilder statt Outline-Icons.
   Motion: gestaffelt hoch, dezenter Hover (Farbe/leichter Lift, kein scale-1.05-Glow).
5. **Warum ich / Trust** - heute die 4. Kartenreihe. Neu: breite Aussage ("Ein Ansprechpartner. Kein
   Wasserkopf.") plus Portrait und Regionsbezug, Fakten statt Icons (Herr im eigenen Haus, direkt aus
   dem Allgäu, fair und flexibel). Motion: ruhig, hier soll Vertrauen sitzen.
6. **Testimonials** - echte Gesichter, ein starkes Zitat groß als Blickfang, nicht fünf gleiche.
7. **Abschluss-CTA** - persönlich: Foto, direkte Zeile ("Du hast was, das digital schneller gehen
   müsste?"), Cal.com plus WhatsApp. Kein anonymer Button-Balken.

## Motion-Choreografie (sparsam)
Parallax-Tiefe (nur Hero) · Scroll-Reveal gestaffelt, einmalig (alle Sektionen) ·
Sticky-Story (nur "So schnell geht's") · Micro-Hover (Karten/CTAs).
Nur `transform`/`opacity` animieren (GPU, kein Layout-Thrash). Keine Blob-/Glow-Backgrounds,
keine bunten Shadows, kein Effekt-Feuerwerk.

## Vorgehen
1. Erst **Tokens plus Hero plus Signature-Sektion** bauen (Großteil des gefühlten "fresh"-Sprungs).
   Lokal prüfen (`npm run dev`), Lighthouse-A11y checken.
2. Dann restliche Sektionen nachziehen.
3. `typecheck` muss durchlaufen.

## Annahmen (falls nicht anders gesagt, so umsetzen)
- Vorhandenes Portrait `christoph-weissteiner.webp` verwenden.
- Wo keine echten Prozess-Screenshots existieren: markenkonforme, abstrakt-reduzierte Visuals
  statt generischer Stock-Icons.
- Sektions-Reihenfolge bleibt wie in `page.tsx`.
Wenn ein fehlendes Asset dich blockiert: kurz nachfragen statt Platzhalter-Stock einsetzen.
