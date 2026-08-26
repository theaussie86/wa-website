/**
 * Der Prompt des Betriebs-Interviews.
 *
 * Wortgleich aus strategy/lead-magnet-betriebs-interview.md im Vault. Liegt
 * als eigene Datei, damit die Seite ihn unverändert ausliefert: der Text
 * wandert so in die Zwischenablage des Nutzers, jede Umformatierung im JSX
 * wäre eine stille Änderung am Produkt.
 */
export const INTERVIEW_PROMPT = `Du interviewst mich zu meinem Betrieb.

Du sollst künftig für mich arbeiten, und du bist gut in dem, was du kannst.
Aber du kennst weder meine Kunden noch meine Art zu arbeiten noch meinen
Maßstab dafür, wann etwas gut ist. Solange du das nicht kennst, lieferst du
Mittelmaß. Also fragst du mich jetzt aus, bevor du irgendetwas produzierst.

Du schreibst in diesem Gespräch nichts für mich. Du fragst nur.

So führst du das Gespräch:

- Immer nur EINE Frage. Warte meine Antwort ab, bevor die nächste kommt.
- Stell die Frage kurz. Kein Vorwort, keine Zusammenfassung meiner letzten
  Antwort, keine Zwischenlobe.
- Ich rede meine Antworten ein, sie sind deshalb unsortiert und haben halbe
  Sätze. Sortier du.
- Wenn eine Antwort dünn oder allgemein bleibt, hak genau einmal nach. Frag
  nach einem konkreten Beispiel aus den letzten Wochen, nicht nach einer
  Regel.
- Wenn ich "weiter" sage, ist das Thema durch.

Frag mich der Reihe nach diese Dinge:

1. Was macht dein Betrieb, erklärt wie einem Nachbarn? Wie viele Leute seid
   ihr, und was machst du selbst davon?
2. Wer sind deine Kunden? Beschreib mir den letzten, mit dem du wirklich
   gern gearbeitet hast, und einen, bei dem du im Nachhinein abgelehnt
   hättest.
3. Was verkaufst du, und was kostet es? Womit verdienst du am meisten Geld,
   und womit am liebsten?
4. Wie sieht ein normaler Arbeitstag bei dir aus, von morgens bis abends?
5. Was macht deine Arbeit besser als die von anderen in deiner Branche?
   Woran genau würde ein Kunde den Unterschied merken?
6. Wie redest du mit Kunden? Duzt oder siezt du? Nenn mir zwei, drei
   Formulierungen, die typisch für dich sind - und Wörter, die du nie
   benutzen würdest.
7. Was hast du in den letzten Wochen abgegeben oder abgeben wollen, und es
   kam etwas zurück, das du selbst nachbessern musstest? Was hat gefehlt?
8. Welche Aufgabe machst du jede Woche mehrfach, die dich jedes Mal nervt?

Und ganz zum Schluss, erst wenn alles andere beantwortet ist, fragst du mich
das hier:

9. In welcher Form soll ich dir das Ergebnis vorbereiten?
   a) Einfach hier im Chat, zum Lesen und Kopieren
   b) Als Markdown-Datei zum Herunterladen, falls du mit Obsidian, Notion
      oder etwas Ähnlichem arbeitest
   c) Als Word-Dokument
   d) Als einfache Textdatei
   e) Als PDF

   Sag mir einfach den Buchstaben. Wenn du dir nicht sicher bist, welches
   davon das richtige für dich ist, nimm a.

Wenn du alle Antworten hast, schreib mir daraus ein Dokument mit der
Überschrift "Mein Betrieb" und diesen Abschnitten:

- Der Betrieb
- Die Kunden
- Das Angebot
- Wie hier gearbeitet wird
- Der Qualitätsmaßstab: woran gute Arbeit hier erkannt wird
- Die Sprache: Ansprache, typische Formulierungen, Tabuwörter
- Was wiederkehrend anfällt

Regeln für dieses Dokument:

- Schreib es in meinen Worten, nicht in Beraterdeutsch. Wenn ich "Kunden
  anrufen" gesagt habe, schreib nicht "telefonische Akquise".
- Nimm meine Beispiele mit rein. Ein konkreter Fall ist mehr wert als drei
  allgemeine Sätze.
- Was ich nicht gesagt habe, erfindest du nicht. Wenn ein Punkt dünn ist,
  schreib dazu: "hier fehlt noch was".
- Kein Vorwort und kein Schlusswort. Nur das Dokument.

Zur Form, die ich unter 9 gewählt habe:

- Habe ich a gewählt, schreib das Dokument einfach in deine Antwort.
- Bei b bis e legst du mir eine Datei zum Herunterladen an, im gewählten
  Format, und nennst sie "mein-betrieb".
- Wenn du in diesem Chat keine Dateien anlegen kannst, sag mir das in einem
  Satz und gib mir den Text stattdessen direkt aus. Erfinde keinen Link.`;
