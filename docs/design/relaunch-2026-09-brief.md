# Design-Relaunch September 2026

*Stand: 2026-09-26. Ersetzt `homepage-relaunch-brief.md` (Juli, "Machen statt warten").*
Begriffe: `CONTEXT.md`. Inhaltliche Quelle: Vault `strategy/` (`nische.md`, `signature-system.md`, `avatar.md`).

## Ziel

Die Seite sieht aus wie eine 0815-gevibecodete Seite. Sie soll wirken wie von einem
Highend-Designer, zugeschnitten auf ein Service-Business. Gleichzeitig wechselt die Botschaft
auf den Vault-Stand: **KI-Arbeitsplatz, Qualität statt Menge.**

## Entscheidungen

| Thema | Entscheidung |
|---|---|
| Botschaft | Vault-Stand. Führt mit **KI-Arbeitsplatz**, nicht mit "Deine Redaktion" |
| Art Direction | Editorial nach Vorbild **granola.ai**: riesige Serif-Headline, ein echtes Artefakt, sonst Ruhe |
| Farben | Bleiben: Primary `#003970`, Accent `#D86B00` (Text/Buttons: `#AD5600`), Warm-White `#FAF9F7`, Charcoal `#2D3436`, Ink `#00172E` |
| Schrift | **Newsreader** (Headlines, optische Größen) + **Inter** (Fließtext, UI). Bree Serif und Raleway fliegen raus |
| Hero-Artefakt | Nachgebaute Fenster-Szene in HTML/CSS, kein Screenshot. Zeigt einen Angebotsentwurf, der vorbereitet daliegt. Dahinter Collage in Markenfarben (Blau-Fläche, Orange-Streifen, Grünten-Ausschnitt) |
| Umfang | Phase 1: Design-System (Tokens, Schrift, Buttons, Header, Footer) + Startseite inkl. neuer Copy. Phase 2: Unterseiten. SEO-Landingpages warten auf #66 |
| Copy | Claude entwirft aus dem Vault, Christoph redigiert |

## Seitenaufbau Startseite

Jede Sektion eine andere Form, genau ein Hauptdarsteller.

1. **Hero** - Headline (Serif, riesig) + zwei Zeilen Subline + ein Button. Rechts die Fenster-Szene.
2. **Das Problem** - ein großes Zitat, nur Typo: Hilfe eingekauft, Mittelmaß zurück, wieder selbst gemacht.
3. **Der Kerngedanke** - "Bessere Methoden werden bezahlbar." Vorher/Nachher: nach Zeitbudget vs. nach Lehrbuch.
4. **So arbeitest du** - Fenster in drei Zuständen, abwechselnd mit Text: du sprichst rein, KI bereitet vor, du urteilst.
5. **So läuft die Zusammenarbeit** - drei Blöcke (Fundament, Entwickeln, Zementieren). **Kein Zeitversprechen, kein Preis** (Stufe 0). Einzige dunkle Sektion (Ink).
6. **Wer dahintersteckt** - Portrait groß, du arbeitest selbst so. Einziger Ort für Allgäu/Memmingen.
7. **Abschluss** - persönliche Zeile, 15 Minuten (Cal), WhatsApp als leise Alternative.

Gestrichen: Testimonials (keine Freigaben), Region im Hero, Problem-Karten-Grids.

## Design-Regeln

- Ein Hauptdarsteller pro Sektion. Alles andere tritt zurück.
- Sektionsabstand mindestens 112px Desktop.
- Keine Verläufe, Blobs, Glows, farbigen Schatten. Hintergründe einfarbig.
- Buttons als Pille (wie Granola). Primär: Primary-Blau gefüllt. Sekundär: Textlink.
- Fenster und Karten: Radius 12-16px, feiner Rand, kaum Schatten.
- Headlines `text-wrap: balance`. Fließtext max. ~65 Zeichen breit.
- Motion sparsam: einmaliges Reveal, Fenster-Text baut sich auf. Nur `transform`/`opacity`, immer mit `prefers-reduced-motion`-Fallback.
- Icons: Lucide, Strich 1.5. Keine Emojis.
- Lighthouse Accessibility 100.

## Harte Sprachregeln

Echte Umlaute, keine Gedankenstriche, "KI" ohne Artikel, Anrede Du, keine Ausrufezeichen.
Nicht "KI macht das für dich", sondern: du sprichst rein, KI bereitet vor, du entscheidest.
Aufhänger Qualität ("so gut, wie es gehört"), Menge nur als Beleg.
