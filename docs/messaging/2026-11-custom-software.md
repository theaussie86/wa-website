# Startseite: Custom-Software statt KI-Arbeitsplatz

Stand 19.11.2026. Textentwurf, noch nicht abgenommen. Grundlage: Entscheidung
"2026-11-19 | Custom-Software statt KI-Arbeitsplatz als Aushängeschild" in
`wa-os/memory/decisions.md`. Belege nur aus den vier freigegebenen Projekten
(CaDo, Hahna Brothers, Pinfinity, Förderverein SV Amendingen) und aus
`core/story.md` / `core/ueberzeugungen.md`. Keine Zahlen, keine Zitate von
Kunden, keine Ergebnisse dazuerfunden.

Folgeänderungen, wenn der Entwurf abgenommen ist: `PRODUCT.md` (Product
Purpose, Evidence on Hand, Regel "keine Kundennamen"), `CONTEXT.md` (neue
Begriffe "Software nach Maß", "Partner-Modell", KI-Arbeitsplatz nicht mehr
Startseitenbegriff), `DESIGN.md` (Hero-Moment).

---

## 1. Positionierung

**Hauptsatz**

> Ich baue kleinen Betrieben Software, die sich nach ihren Abläufen richtet
> statt umgekehrt. Und mit Partnern kleine Abo-Lösungen für eine ganze Gruppe.

**Alternativen**

1. Software nach Maß für kleine Betriebe, gebaut von einem, der selbst aus
   der doppelten Datenpflege kommt.
2. Ich baue die Software, die dein Betrieb eigentlich braucht, statt dass du
   dich nach einem Standardprogramm richtest.
3. Eigene Software für kleine Betriebe und für Gruppen, die alle dasselbe
   Problem haben. Klein angefangen, nach und nach ausgebaut.

---

## 2. Meta

**Title** (mit `SITE_NAME`, rund 60 Zeichen)

> Software nach Maß für kleine Betriebe | Weissteiner Automation

**Description** (rund 155 Zeichen)

> Ich baue Software, die sich nach deinem Betrieb richtet, nicht umgekehrt.
> Für deine eigenen Abläufe oder als Abo-Lösung für eine ganze Gruppe.

**Twitter-Description** (kürzer)

> Software, die sich nach deinem Betrieb richtet. Klein angefangen, nach und
> nach ausgebaut.

---

## 3. Navigation

Neue Labels, in dieser Reihenfolge:

| Label | Ziel | Hinweis |
|---|---|---|
| Projekte | `/projekte` (oder vorerst `/#projekte`) | die vier Belege, später je eine Unterseite |
| Partner werden | `/partner` (oder vorerst `/#zusammenarbeit`) | der zweite Weg, Christoph sucht aktiv |
| Über mich | `/ueber-mich` | bleibt |
| Blog | `/blog` | bleibt |
| Kontakt | `/kontakt` | bleibt |
| Button: 15 Minuten reden | Cal | bleibt |

**KI-Arbeitsplatz:** raus aus der Hauptnavigation. Die Seite
`/ki-arbeitsplatz` bleibt online (Links aus Blog und LinkedIn laufen sonst
ins Leere) und wandert in den Footer unter "Weitere Leistungen". Auf der
Startseite höchstens ein Satz am Ende der Zusammenarbeit (siehe 4.5). Wenn
die Navigation mit fünf Punkten zu voll wird, fällt "Kontakt" zuerst, weil der
Button dasselbe tut.

---

## 4. Startseite

Neue Reihenfolge: Hero, Problem, Kernidee, Projekte, Zusammenarbeit, Über
mich, Abschluss. `HowYouWork` (Diktat, Entwurf, Korrektur) fällt weg, an
seine Stelle treten die Projekte.

### 4.1 Hero

**Headline**

> Software, die sich nach deinem Betrieb richtet.

Alternativen:

1. Deine Abläufe, als eigene Software.
2. Eigene Software für deinen Betrieb. Nicht von der Stange.

**Subline**

> Statt Standardprogramm und Excel-Listen drumherum baue ich dir eine
> Anwendung, die so arbeitet wie dein Betrieb. Oder mit dir eine, die eine
> ganze Gruppe braucht.

**CTAs**

- Primär: `15 Minuten reden` (Cal)
- Textlink: `Projekte ansehen` (Anker `#projekte`)

**Zeile darunter** (mit Icon, z. B. Lucide `Blocks` oder `Wrench`)

> Erst ein kleines Stück, das funktioniert. Dann nach und nach mehr.

Variante, falls Frage 1 mit Ja beantwortet ist:

> Klein angefangen, nach und nach ausgebaut. Was entsteht, gehört dir.

**Artefakt rechts (Vorschlag):** Ein Blatt aus dem Ordner zeigt die
Bestellrunde der Bruderschaft. Der Stift streicht "zehn Excel-Listen", darunter
steht "eine Bestellrunde in der App". Haftnotiz: "Kalender, Archiv und
Protokolle gleich mit". Als Beispiel gekennzeichnet, keine erfundenen
Namen, Größen oder Mengen auf dem Blatt.

**Komponente:** `hero.tsx` bleibt im Aufbau (Text tauschen). `hero-sheet.tsx`
muss neu gebaut werden, der LinkedIn-Beitrag passt nicht mehr. Der eine
Stift-Moment aus `DESIGN.md` kann bleiben, nur mit neuem Inhalt.

### 4.2 Problem

**Zitat** (bleibt, O-Ton aus den Avatar-Interviews)

> „Ich hab mir Hilfe geholt. Zurück kam Mittelmaß. Also mache ich es wieder
> selbst.“

**Text daneben**

> Agentur, Freelancer, Assistenz. Eingekauft hast du längst. Dazu ein
> Programm von der Stange, um das herum jetzt Excel-Listen, Zettel und
> Mailordner wachsen.
>
> Das Programm kennt deinen Ablauf nicht. Also pflegst du dieselben Daten an
> drei Stellen, und alles, was nicht reinpasst, landet wieder bei dir.

**Komponente:** `problem.tsx` bleibt, nur die zwei Absätze tauschen.

### 4.3 Kernidee

**Headline**

> Maßarbeit war für kleine Betriebe zu teuer. Das ändert sich gerade.

**Text**

> Eigene Software hat sich für einen kleinen Betrieb lange nicht gerechnet.
> Also hast du genommen, was es gab, und dich danach gerichtet.
>
> Ich entwickle heute mit KI. Was gebaut wird und ob es taugt, entscheiden
> trotzdem du und ich. Dadurch wird Software bezahlbar, die nur für einen
> Betrieb gedacht ist.

**Tabelle** (Spalten "Von der Stange" gestrichen, "Nach Maß" in Primary)

| | Von der Stange | Nach Maß |
|---|---|---|
| Der Ablauf | du richtest dich nach dem Programm | das Programm richtet sich nach dir |
| Deine Daten | verteilt auf Programm, Excel und Zettel | an einem Ort, einmal gepflegt |
| Ein neuer Wunsch | steht auf der Liste des Herstellers | wird eingebaut, wenn du ihn brauchst |
| KI | wenn der Hersteller es anbietet | über eine Schnittstelle direkt an deinen Daten |

Die letzte Zeile ist die Brücke zum KI-Arbeitsplatz, ohne ihn zu nennen.

**Komponente:** `core-idea.tsx` kann bleiben. Spaltenköpfe und Zeilen tauschen
("Aufgabe" wird leer oder "Was", "Nach Zeitbudget" wird "Von der Stange",
"Nach Lehrbuch" wird "Nach Maß"). Kommentar im Code anpassen.

### 4.4 Projekte (neu, Anker `#projekte`)

**Headline**

> Was ich zuletzt gebaut habe.

**Lead**

> Vier Projekte, jedes für Leute, die vorher mit Listen, Papier oder zu
> vielen Programmen gearbeitet haben.

**Karte 1: CaDo**

- Register: `CRM`
- Titel: Kundenverwaltung für Reico-Berater
- Text: Reico verkauft Futter für Hunde, Katzen und Pferde im Direktvertrieb.
  Die Berater betreuen ihre Kunden selbst, samt Tieren, Bestellungen und
  Nachfass. CaDo hält das an einem Ort zusammen.
- Zusatz (Haftnotiz): Gebaut für zwei Berater, gedacht fürs ganze Beraternetz
  im Abo. So sieht das Partner-Modell aus.
- Link: `CaDoManager.de`

**Karte 2: Hahna Brothers**

- Register: `Mitglieder-App`
- Titel: App für eine Bruderschaft
- Text: Rund 20 Mitglieder. Die Bestellrunde für die Brotherhood-Kleidung
  läuft in der App statt über zehn Excel-Listen. Dazu Kalender, Archiv und
  Protokolle.

**Karte 3: Pinfinity**

- Register: `Verwaltung`
- Titel: Pinterest-Verwaltung für mehrere Konten
- Text: Gebaut für Petra, meine Frau. Sie betreibt Blogs und verwaltet
  mehrere Pinterest-Konten an einem Ort. KI ist per MCP angebunden, also über
  eine Schnittstelle, über die KI direkt mit den Daten arbeiten kann.

**Karte 4: Förderverein SV Amendingen**

- Register: `Website + Verwaltung`
- Titel: Mitgliedsantrag und Vereinsverwaltung ohne Papier
- Text: Mitgliedsantrag online, samt SEPA-Mandat, und Spenden. Im internen
  Bereich prüft der ehrenamtliche Vorstand die Anträge, stellt
  Spendenbelege aus und pflegt die Mitglieder.

Hinweis Gestaltung: keine vier gleich großen Icon-Karten (verboten laut
`DESIGN.md`). Besser vier Blätter mit Registertaben, CaDo größer oder
vorne, weil es auf den Partner-Weg zeigt. Screens der echten Anwendungen
statt Icons, sobald vorhanden.

**Komponente:** neu bauen (`projects.tsx`). Ersetzt `how-you-work.tsx`.
`Sheet` und `Tab` werden wiederverwendet.

### 4.5 Zusammenarbeit (Anker `#zusammenarbeit`)

**Headline**

> Zwei Wege, wie wir zusammen bauen.

**Weg 1: Für deinen Betrieb**

- Titel: Software für deine eigenen Abläufe.
- Text: Du hast einen Ablauf, der heute über Listen, Papier oder drei
  Programme läuft. Ich baue dir eine Anwendung genau dafür. Sie gehört zu
  deinem Betrieb, nicht zu einem Anbieter.

(Letzter Satz nur, wenn Frage 1 geklärt ist. Sonst: "Sie arbeitet so wie
dein Betrieb, nicht so wie ein Anbieter es sich gedacht hat.")

**Weg 2: Als Partner**

- Titel: Deine Idee, für eine ganze Gruppe.
- Text: Du kennst eine Gruppe, die alle dasselbe Problem haben. Berater in
  einem Vertrieb, Vereine, Betriebe deiner Branche. Du bringst die Idee und
  kennst die Leute, ich baue die Lösung mit dir. Die Gruppe nutzt sie im Abo.
  So ist CaDo entstanden, und ich suche gerade weitere Partner dafür.
- Textlink: `Partner werden` (Cal oder WhatsApp, später `/partner`)

**Ablauf** (für beide Wege gleich, drei Ordner im Regal)

| Teil | Titel | Text |
|---|---|---|
| Verstehen | Erst dein Ablauf, dann der Code. | Ich frage dich gründlich aus und schaue mir an, wer jeden Tag damit arbeitet. Gebaut wird erst, wenn klar ist, was gebraucht wird. |
| Erstes Stück | Ein kleines Stück, das funktioniert. | Du bekommst früh etwas in die Hand, das du wirklich benutzt. Daran merken wir beide, ob die Richtung stimmt. |
| Ausbauen | Nach und nach mehr. | Was im Alltag fehlt, kommt dazu. Was keiner braucht, bleibt weg. |

**Randzeile** (klein, unter dem Regal, optional)

> Du willst danach selbst mit KI an deinen Daten arbeiten? Dafür gibt es den
> KI-Arbeitsplatz.

**Komponente:** `collaboration.tsx` kann für den Ablauf bleiben (Regal mit
drei Ordnern, `blocks` tauschen). Die zwei Wege kommen als neuer Block
darüber dazu, zwei Blätter nebeneinander auf Blau, ungleich gewichtet.

### 4.6 Über mich

**Headline**

> Ich komme aus der doppelten Datenpflege.

Alternative: "Angefangen hat es mit Office-Makros."

**Text**

> Ich bin Christoph Weissteiner, Fullstack-Softwareentwickler aus Memmingen
> im Allgäu. Ich baue also die ganze Anwendung, von der Datenbank bis zur
> Oberfläche.
>
> Angefangen habe ich als Maschinenbauer in der Auftragskonstruktion. Mich hat
> genervt, dass wir dieselben Daten an mehreren Stellen gepflegt haben. Also
> habe ich Office-Makros geschrieben. Kleine Sachen, aber sie haben
> funktioniert. So bin ich Entwickler geworden.
>
> Meine ersten Automatisierungen hat dann kaum jemand benutzt, weil ich sie am
> Menschen vorbei gebaut hatte. Seitdem frage ich zuerst, wer jeden Tag damit
> arbeitet.

**Link:** `Mehr über mich`

**Komponente:** `about.tsx` bleibt, Headline und Absätze tauschen.

### 4.7 Abschluss

**Headline**

> Welcher Ablauf läuft bei dir noch über Listen und Zettel?

Alternative: "Was müsste deine Software können, das keine von der Stange kann?"

**Lead**

> Erzähl mir in 15 Minuten davon. Dann wissen wir beide, ob sich eine eigene
> Lösung lohnt. Und wenn nicht, sage ich dir das.

**Vordruckzeile:** `Dein Ablauf` (statt "Deine Aufgabe")

**Buttons:** `15 Minuten reden` (Cal), Textlink `Oder kurz per WhatsApp`

**Variante für die Partner-Seite** (über `CTASection`):

- Titel: "Hast du eine Idee, die eine ganze Gruppe braucht?"
- Lead: "Erzähl mir, wer die Gruppe ist und was sie heute nervt. In 15 Minuten
  wissen wir, ob das ein Fall für ein gemeinsames Projekt ist."

**Komponente:** `closing.tsx` bleibt, nur die Default-Props `title`, `lead`
und das Label der Vordruckzeile ändern.

---

## 5. Offene Fragen an Christoph

1. **Wem gehört, was entsteht?** Beim KI-Arbeitsplatz war "gehört dir" klar.
   Bei Software für den eigenen Betrieb: Bekommt der Kunde Code und Daten,
   oder nur die Nutzung? Davon hängen Hero-Zeile und Weg 1 ab.
2. **"Ich entwickle mit KI, dadurch wird es bezahlbar"**: willst du das so
   offen sagen? Es ist der stärkste Grund, warum Maßarbeit jetzt für Kleine
   geht, weckt aber die Erwartung "billig". Und es reibt sich mit Überzeugung
   6 ("eine eigene App rechnet sich für Kleine kaum noch"), die dann
   angepasst werden müsste.
3. **Partner-Modell öffentlich:** Wie viel zur Konstruktion darf auf die
   Seite? Reicht "du bringst Idee und Gruppe, ich baue, die Gruppe zahlt
   Abo", oder willst du sagen, was der Partner davon hat (Beteiligung,
   Nutzung frei)?
4. **Firmenname:** Bleibt "Weissteiner Automation" im Logo, im Title und in
   der Wortmarke, obwohl du nicht mehr für Automation bekannt werden willst?
5. **Links und Screens:** Dürfen CaDoManager.de und die Förderverein-Website
   verlinkt werden, und kannst du Screens der vier Anwendungen liefern? Ohne
   Bilder tragen die Projektkarten nur halb.
