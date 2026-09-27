# Design: Der Betriebsordner

Stand 27.09.2026. Gilt für die ganze Website. Produktwahrheit: `PRODUCT.md`. Begründung und Seitenaufbau: `docs/design/relaunch-2026-09-brief.md`.

## Idee

Die Seite ist der Betriebsordner des Inhabers, aufgeschlagen: seine Anleitung, die mit jeder Korrektur wächst. Jede Sektion ist entweder Ordnerleinen (blaue Fläche), Pappe (Grund) oder ein Blatt darauf.

## Farbe

| Rolle | Token | Wert | Einsatz |
|---|---|---|---|
| Ordnerleinen | `primary` | `#003970` | ganze Flächen: Header, Hero, Zusammenarbeit, Footer. Headlines auf hellem Grund |
| Ordnerrücken | `primary-600` / `-700` / `-800` | `#002D5A` / `#002244` / `#00172E` | Rücken, Griffloch, Regalboden |
| Pappe | `pappe` | `#E8EBEE` | Grund, auf dem Blätter liegen |
| Blatt | `white` | `#FFFFFF` | Blätter, ruhige Sektionen |
| Stift | `accent` / `accent-600` | `#D86B00` / `#AD5600` | nur Korrekturen des Inhabers, aktive Registertabe. Nie Button, nie Fläche |
| Haftnotiz | `accent-100` | `#FDE7D1` | "Gemerkt für die Anleitung" |
| Text | `charcoal` | `#2D3436` | Fließtext, gedämpft mindestens `/75` |

Kein Creme, keine Verläufe, keine Pastell-Panels.

## Schrift

Archivo (variabel, `wght` + `wdth`), eine Familie.

- `type-display`: `font-stretch: 78%`, Gewicht 640, Tracking -0.022em. Headlines, max 6rem.
- `type-label`: `font-stretch: 70%`, Gewicht 600, Versalien, +0.06em. Nur für Taben, Rückenschilder, Tabellenköpfe, Bildunterschriften. Nie als Label über einer Überschrift.
- Fließtext: normale Breite, 17-18px, Zeilenhöhe 1.65-1.7.

## Bauteile

- **Sheet** (`_components/sheet.tsx`): weißes Blatt, 2px Radius, weicher Schatten mit Versatz, zwei Lochungen in Grundfarbe (links hoch, oben quer).
- **Tab**: Registertabe am Blattrand (rechts senkrecht oder oben). Orange nur für das Aufgeschlagene.
- **Button**: rechteckiges Etikett, 4px Radius. `primary` auf hell, `light` auf Blau, Alternative immer Textlink.
- **PageHead** (`_components/page-head.tsx`): Kopf jeder Unterseite, blaues Ordnerleinen wie der Hero, rechts optional Blatt oder Portrait. `size="md"` für lange Titel (Blog).
- **Kontaktblatt** (`home/closing.tsx`, auf Unterseiten über `CTASection` mit eigener Frage): letztes Register jeder Seite.
- **Gestrichene Liste**: "Nicht"-Aussagen als `<del>` mit Stiftstrich, daneben die Gegenposition in `type-display` (Über mich, Leistungen).
- **Regal**: drei schmale Ordner (`primary-600`) mit senkrechtem Rückenschild und Griffloch auf einem Regalboden, daneben die Schritte als Liste.
- **Tab rechts**: 40 x 128px, 12.5px, reicht für "Nachfassen".
- Icons: Lucide, Strich 1.5.

## Bewegung

Ein einziger Moment im Hero (rund 4 Sekunden): Blatt legt sich hin, Zeilen erscheinen, der Stift streicht die Floskel (wachsende Linie, auch über Zeilenumbrüche), der Satz der Kundin erscheint, die Hashtags werden gestrichen, die Haftnotiz klebt, "Passt so" wird zu "Freigegeben". Sonst keine Einblendungen. `prefers-reduced-motion` zeigt den Endzustand.

## Verboten

Labels über Überschriften, 01/02/03-Nummern, gleich große Icon-Karten, Pillen-Buttons, Serif-plus-Creme, Platzhalterbalken statt Text.
