---
title: "Das Race to the Top - und warum die letzten Prozent so teuer sind"
date: "2026-07-13T10:00:00Z"
author:
  name: "Christoph Weissteiner"
  picture: "/images/author/christoph-weissteiner.webp"
excerpt: "76, 80, 81 Prozent im Benchmark sehen fast gleich aus - im echten Arbeiten liegen Welten dazwischen. Warum die letzten Prozent am teuersten sind und wann du die absolute Spitze wirklich brauchst."
coverImage: "/blog/ki-benchmarks-snooker-lochquote/cover.webp"
ogImage:
  url: "/blog/ki-benchmarks-snooker-lochquote/cover.webp"
---

Privat arbeite ich ausschließlich mit Claude. Auf Arbeit manchmal mit einem anderen Modell - ordentlich, klar besser als sein Vorgänger, aber im täglichen Coden merke ich den Abstand sofort.

Dann schaue ich in die Benchmarks. Die Scores liegen dicht beieinander. 76, 80, 81 Prozent. Auf dem Papier fast das Gleiche.

Gefühlt liegen Welten dazwischen.

Lange dachte ich, ich bilde mir das ein. Bis mir als Snooker-Fan die Erklärung kam - und die geht tiefer, als ich zuerst dachte.

## Teil 1: Die Lochquote

Ein Top-Profi macht an einem guten Tag rund 95 Prozent seiner Bälle. Ein solider Durchschnittsprofi an seinem guten Tag rund 90 Prozent.

Fünf Prozentpunkte. Klingt nach nichts. Ist aber alles:

- 95 Prozent heißt: einer von 20 Bällen daneben.
- 90 Prozent heißt: einer von 10 Bällen daneben.

Der eine verschießt doppelt so oft. Und im Snooker gibst du bei jedem Fehler den Tisch an den Gegner ab. Der Top-Profi braucht weniger Anläufe für seine Punkte. Deshalb gewinnt er fast immer.

Genau das passiert bei KI-Modellen. Schau in die SWE-bench-Verified-Zahlen - den Standard-Benchmark fürs agentische Coden. Mitte 2026 liegt die Spitze bei rund 81 Prozent: Claude Opus 4.5 mit 80,9. Dahinter drängt sich alles dicht - GPT-5.1 bei 76,3, Gemini 3 Pro bei 76,2. Gut fünf Prozentpunkte zwischen Platz eins und dem soliden Verfolgerfeld. Klingt wieder nach nichts.

Dreh es um: 19 Prozent Fehler gegen 24 Prozent. Und beim agentischen Arbeiten - Coden, mehrstufige Aufgaben - reiht sich Schritt an Schritt. Jeder Fehler kostet einen Korrektur-Loop.

![Erfolgswahrscheinlichkeit über 20 Schritte bei 81 Prozent gegen 76 Prozent pro Schritt](/blog/ki-benchmarks-snooker-lochquote/infographic-01.webp)

Über 20 Schritte, jeder muss sitzen:

- 80,9 Prozent pro Schritt: rund 1,4 Prozent Chance, ohne einen einzigen Eingriff durchzukommen.
- 76,3 Prozent: rund 0,45 Prozent.

So streng gerechnet käme praktisch kein Modell fehlerfrei durch - echte Agents korrigieren sich unterwegs, klar. Aber genau das ist der Punkt: Aus "fünf Prozentpunkten" im Benchmark wird gut der Faktor drei bei der Frage, wie oft du eingreifen musst. Und jeder Eingriff kostet dich Zeit.

## Teil 2: Was die letzten Prozent kosten

Jetzt die andere Seite der Analogie - die mir eigentlich noch wichtiger ist.

Der Top-Profi und der Durchschnittsprofi haben irgendwann mal mit denselben Grundfähigkeiten angefangen. Der Unterschied entsteht nicht aus dem Nichts. Der eine hat an einem Punkt angefangen, brutal mehr zu investieren. Mehr Stunden, mehr Verzicht, mehr alles - für die letzten fünf Prozent.

Diese letzten Prozent sind immer die teuersten.

Bei KI ist es identisch. Der Sprung von "gut" auf "top" frisst gigantische Ressourcen. Rechenzeit, Energie, Trainingsdaten. Und das schlägt sich im Preis nieder - ein Top-Modell wie Claude Opus kostet ein Vielfaches der kleineren Modelle. Und trotzdem: Die Unternehmen dahinter verdienen damit bis heute kein Geld. Sie verbrennen es.

Die Spitze zu halten ist unfassbar teuer. Für alle Beteiligten.

## Teil 3: Brauche ich die Spitze überhaupt?

Ja, diese Modelle sind besser. Mir persönlich helfen sie beim Code-Schreiben deutlich mehr als die guten Modelle. Wenn ich mich auf agentisches Coding spezialisiere, brauche ich genau diese Spitze.

Aber im täglichen Arbeiten? Wahrscheinlich nicht.

Bestes Beispiel Google. Die Gemini-Modelle sind nicht die absolute Leistungsspitze - aber sie stecken tief und nahtlos in Google Workspace. Für ihren Use Case sind sie richtig, richtig nützlich. Spezialisiert schlägt hier universell-stark.

Es ist wie im Werkzeugkasten: Für den einen Job brauche ich das Präzisionsinstrument. Für 90 Prozent der Arbeit reicht - und passt - das solide Standardwerkzeug besser.

## Teil 4: Das Race to the Top hat einen Preis

Und da wird es größer als nur Kosten pro Token.

Dieses Rennen an die Spitze wird immer ressourcenintensiver. Immer mehr Rechenleistung, immer mehr Energie, für immer kleinere Sprünge. Zulasten unserer Natur, unserer Ressourcen.

Die ehrliche Frage ist: In welchem Kontext brauchen wir diese Modelle wirklich - und wo setzen wir aus Gewohnheit die schwerste Maschine ein, obwohl es die spezialisierte, sparsamere auch täte?

Ein LLM ist wunderbar im Generieren von Text. Beim Reasoning, beim echten Nachdenken, ist es ineffizient - es braucht dafür enorme Trainingsdaten und Rechenleistung. Wir zwingen ein Werkzeug, alles zu können.

Vielleicht liegt der nächste echte Sprung gar nicht darin, LLMs noch größer zu machen. Sondern in anderen agentischen Strukturen - World Models, JEPA-Ansätze - die genau das übernehmen, wofür LLMs schlecht gebaut sind. Damit nicht ein Modell alles machen muss.

Bis dahin wäre schon viel gewonnen, wenn wir bewusster wählen: das optimale Modell für den konkreten Fall. Nicht immer das stärkste.

Am Snooker-Tisch braucht der Profi seine 95 Prozent, um zu gewinnen.

Beim Aufräumen zuhause reichen auch 90.
