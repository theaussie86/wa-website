---
title: "Niemand gewinnt Snooker über die Lochquote - was KI-Benchmarks dir verschweigen"
date: "2026-07-15T10:00:00Z"
author:
  name: "Christoph Weissteiner"
  picture: "/images/author/christoph-weissteiner.webp"
excerpt: "Drei KI-Modelle liegen im Benchmark 0,3 Prozentpunkte auseinander - und halten trotzdem unterschiedlich lange durch. Warum die Prozentzahl das Falsche misst, und warum auch mein Bauchgefühl kein guter Ersatz ist."
coverImage: "/blog/ki-benchmarks-richtig-lesen/cover.webp"
ogImage:
  url: "/blog/ki-benchmarks-richtig-lesen/cover.webp"
---

Privat arbeite ich ausschließlich mit Claude. Auf Arbeit manchmal mit einem anderen Modell - ordentlich, klar besser als sein Vorgänger, aber im täglichen Coden merke ich den Abstand sofort.

Dann schaue ich in die Benchmarks. Die Scores liegen dicht beieinander. 80,9. 80,8. 80,6. Auf dem Papier dasselbe Modell.

Gefühlt liegen Welten dazwischen.

Ich wollte das ausrechnen. Als Snooker-Fan hatte ich auch schon die perfekte Analogie im Kopf. Beides ist mir um die Ohren geflogen, und was dabei übrig blieb, ist interessanter als das, was ich beweisen wollte.

## Die Rechnung, die ich falsch gemacht habe

Mein Gedanke war simpel. Nimm den Standard-Benchmark fürs agentische Coden, SWE-bench Verified. Ein Modell schafft 80,9 Prozent, das andere 76,3. Beim agentischen Arbeiten reiht sich Schritt an Schritt, also potenziere: 0,809 hoch 20 gegen 0,763 hoch 20. Ergebnis: 1,4 Prozent gegen 0,45. Aus fünf Prozentpunkten wird Faktor drei. Fertig war der Artikel.

Nur ist die Rechnung Unsinn.

SWE-bench Verified misst keine Genauigkeit pro Schritt. Es misst eine Quote pro Aufgabe. Das Modell bekommt ein komplettes GitHub-Issue, muss das Repository verstehen, Änderungen über mehrere Dateien koordinieren und einen Patch abliefern. Gelöst zählt nur, wenn danach alle vorher fehlschlagenden Tests grün sind und kein einziger vorher grüner Test kippt. Alles oder nichts, pro Ticket.

Heißt: Die vielen Schritte, die Werkzeugaufrufe, die Selbstkorrektur unterwegs - das steckt **schon in den 80,9 Prozent drin**. Die Mehrschrittigkeit ist bereits bezahlt. Wer diese Zahl nochmal 20-mal mit sich selbst multipliziert, berechnet nicht "ein Workflow mit 20 Schritten". Er berechnet "20 komplette GitHub-Issues am Stück, alle fehlerfrei". Das ist eine andere Frage, und die stellt niemand.

Das Verräterische: Mir ist beim Schreiben selbst aufgefallen, dass 1,4 Prozent nicht stimmen können. Kein Modell wäre brauchbar, wenn das stimmte. Ich hatte einen Halbsatz eingebaut, der das wegerklärt. Wenn du beim Schreiben einen Halbsatz brauchst, der deine eigene Rechnung entschuldigt, ist nicht der Halbsatz das Problem.

## Der Benchmark, auf den ich mich berufen habe, ist abgeschafft

Es kommt schlimmer. Während ich versuchte, aus fünf Prozentpunkten Bedeutung zu pressen, hatte die Branche den Benchmark schon aufgegeben.

Im Februar 2026 veröffentlichte OpenAIs Frontier-Evals-Team einen Post mit dem Titel "Why SWE-bench Verified no longer measures frontier coding capabilities" und meldet seitdem keine Zahlen mehr dafür. Der Befund aus dem eigenen Audit: Bei über der Hälfte der geprüften Aufgaben sind die Testfälle kaputt - sie weisen korrekte Lösungen zurück. Dazu Kontamination: Die führenden Modelle haben die Lösungen im Training gesehen.

Unabhängige Arbeiten zeigen dasselbe aus anderer Richtung. Verschärft man die Testsuiten so, dass sie den Fehler wirklich prüfen, stellt sich rund ein Fünftel der als "gelöst" gewerteten Patches als semantisch falsch heraus. Sie bestehen nur, weil die Tests zu schwach waren. Der beste Agent fällt unter strengeren Tests von 78,8 auf 62,2 Prozent. Epoch AI beziffert die Fehlerrate des Benchmarks selbst auf 5 bis 10 Prozent.

Ein Abstand von fünf Prozentpunkten liegt damit weitgehend im Rauschen. Man muss ihn nicht erklären. Man muss ihn ignorieren.

Und der Nachfolger? OpenAI empfahl im Februar SWE-bench Pro und zog die Empfehlung im Juli wieder zurück, nachdem sich etwa 30 Prozent der Aufgaben als kaputt erwiesen. Es gibt gerade keinen Konsens-Benchmark fürs agentische Coden. Das ist der ehrliche Stand.

## Und jetzt Snooker - aber richtig

Meine Analogie war: Ein Top-Profi macht 95 Prozent seiner Bälle, ein solider Profi 90. Fünf Prozentpunkte, aber der eine verschießt doppelt so oft. Deshalb gewinnt er.

Der Fehler daran ist derselbe wie oben, nur andersherum: Für Snooker stimmt diese Rechnung nämlich. Beim Snooker ist die Lochquote **wirklich** eine Quote pro Stoß. Deshalb darf man dort potenzieren, und es kommt etwas Sinnvolles heraus:

- 95 Prozent pro Stoß: im Schnitt rund 19 Bälle, bevor du danebenlegst.
- 90 Prozent pro Stoß: im Schnitt rund 9.

Faktor zwei bei der Breaklänge, aus fünf Prozentpunkten. (Idealisiert - echte Breaks enden auch mal an der Position statt am Fehler.) Genau dieses Compounding wollte ich bei KI-Modellen zeigen. Ich hatte nur keine Pro-Schritt-Quote, die ich hätte einsetzen dürfen.

Aber jetzt kommt der Punkt, den ich im ersten Anlauf komplett übersehen hatte:

**Niemand gewinnt Snooker über die Lochquote.** Kein Kommentator nennt sie. In keiner Statistik steht sie vorne. Was zählt, ist die Breaklänge - wie lange einer am Tisch bleibt, bevor er ihn abgeben muss. Die Lochquote ist nur die Zutat. Die Breaklänge ist das Ergebnis.

Und für KI-Modelle gibt es genau diese Größe. Sie heißt nur anders.

## Die Zahl, die tatsächlich etwas misst

Das Forschungsinstitut METR misst den **Time Horizon**: Wie lang darf eine Aufgabe sein - gemessen in der Zeit, die ein menschlicher Experte dafür braucht - damit das Modell sie noch mit 50 Prozent Erfolg schafft. Nicht wie lange das Modell läuft. Wie viel menschliche Arbeit am Stück es ersetzen kann, bevor es kippt.

Das ist die Breaklänge.

![SWE-bench Verified gegen METR Time Horizon: drei Modelle liegen im Benchmark bei 80,9, 80,8 und 80,6 Prozent, ihr Horizont liegt aber bei 4,9, 12,0 und 6,4 Stunden](/blog/ki-benchmarks-richtig-lesen/infographic-01.webp)

Links stehen drei Modelle im Benchmark auf einer Linie: 80,9, 80,8, 80,6 Prozent. 0,3 Prozentpunkte Spanne. Nach dieser Zahl sind sie austauschbar.

Rechts dieselben drei Modelle: 4,9 Stunden, 12,0 Stunden, 6,4 Stunden Horizont. Faktor 2,4.

Claude Opus 4.6 ist im Benchmark 0,1 Punkte **schlechter** als sein Vorgänger 4.5 - und hält im Horizont zweieinhalbmal so lange durch. Gleiches Labor, gleiche Modellfamilie, kein Herstellervergleich, der die Sache verzerrt.

Das ist es, was ich im Alltag spüre. Nicht "das Modell ist genauer". Sondern "das Modell bleibt länger am Tisch".

Ehrlichkeitshalber: Die Konfidenzintervalle dieser Messungen überlappen deutlich, teils um den Faktor zehn. METR sagt selbst, dass Messungen jenseits von 16 Stunden mit dem aktuellen Aufgabenkatalog unzuverlässig sind, und einer der Forscher sagte über die eigene Kurve, man solle sein Leben nicht daran hängen. Der Abstand ist ein Hinweis, kein Beweis.

## Die Studie, die ich lieber nicht gefunden hätte

Bis hier klingt das nach einer sauberen Geschichte: Der Benchmark ist blind, der Horizont erklärt mein Bauchgefühl. Nur hat mein Bauchgefühl selbst ein Problem.

METR hat 2025 eine kontrollierte Studie gemacht. 16 erfahrene Open-Source-Entwickler, 246 echte Aufgaben, in ihren eigenen, gewachsenen Repositories. Vorher schätzten sie, KI würde sie um 24 Prozent beschleunigen. Gemessen wurden sie **19 Prozent langsamer**. Und nachdem sie langsamer waren, glaubten sie immer noch, sie seien 20 Prozent schneller gewesen.

Rund 39 Punkte Selbsttäuschung. Nicht bei Laien. Bei erfahrenen Entwicklern, in vertrauter Umgebung, bei echter Arbeit.

Das ist exakt die Beweisklasse, auf der mein "ich merke den Abstand sofort" steht.

Die Studie ist klein und beweist nicht, dass ich mich irre. Aber sie beweist, dass Leute wie ich sich in genau dieser Frage systematisch irren - und zwar zuverlässig in die schmeichelhafte Richtung. Der Mechanismus ist also gut belegt. Das Gefühl, das er erklären soll, nicht.

Ich lasse das so stehen. Wer dir bei diesem Thema Gewissheit verkauft, hat nicht nachgesehen.

## Was wirklich unterschiedlich ist

Naheliegend wäre jetzt: Die Spitzenmodelle brechen langsamer ein. Das dachte ich auch. Es stimmt nicht.

Toby Ord hat 2025 ein Modell vorgeschlagen, nach dem Agenten eine konstante Ausfallrate pro Minute Aufgabenlänge haben - eine Art Halbwertszeit. Anfang 2026 hat er es selbst zurückgezogen. Eine Neuauswertung zeigt: Die Ausfallrate ist nicht konstant, sie **sinkt** im Verlauf einer Aufgabe. Wer die ersten Hürden übersteht, wird stabiler. Vor allem aber: Dieser Verlaufsparameter ist über alle Fähigkeitsstufen hinweg praktisch gleich. Er verbessert sich nicht mit stärkeren Modellen.

Übersetzt: Bessere Modelle halten länger durch. Sie zerfallen nicht eleganter. Die Kurve verschiebt sich nach rechts, ihre Form bleibt.

Der Unterschied, für den es echte Belege gibt, liegt woanders und heißt **Self-Conditioning**. Modelle lesen ihre eigenen früheren Fehler im Kontext mit - und werden dadurch fehleranfälliger. Nachgewiesen wurde das kausal, indem man künstlich Fehler in die Historie einspeiste: Je mehr Fehler im Kontext, desto schlechter die Genauigkeit hundert Züge später. Ein Fehler zieht den nächsten nach. Menschen werden mit Übung besser, Modelle schaukeln sich hoch.

Größe hilft dagegen nicht. Auch 200-Milliarden-Modelle fallen darauf herein. Was hilft, sind Reasoning-Modi: Modelle, die vor dem Antworten denken, zeigen den Effekt nicht.

Das ist die Snooker-Analogie an ihrer ehrlichsten Stelle. Der Unterschied zwischen dem Top-Profi und dem soliden Profi ist nicht die einzelne Kugel. Es ist, was nach dem ersten Fehler passiert.

## Was die letzten Prozent kosten

Der Top-Profi und der Durchschnittsprofi haben mal mit denselben Grundfähigkeiten angefangen. Der Unterschied entsteht nicht aus dem Nichts. Der eine hat an einem Punkt angefangen, brutal mehr zu investieren. Mehr Stunden, mehr Verzicht, mehr alles - für die letzten fünf Prozent.

Diese letzten Prozent sind immer die teuersten.

Bei KI-Modellen ist es identisch. Der Sprung von "gut" auf "top" frisst gigantische Ressourcen. Rechenzeit, Energie, Trainingsdaten. Das schlägt sich im Preis nieder - ein Spitzenmodell kostet ein Vielfaches der kleineren. Und trotzdem: Die Unternehmen dahinter verdienen damit bis heute kein Geld. Sie verbrennen es.

Die Spitze zu halten ist unfassbar teuer. Für alle Beteiligten.

## Brauche ich die Spitze überhaupt?

Beim agentischen Coden: ja. Da ist der Horizont die entscheidende Größe, und da will ich das Modell, das am längsten am Tisch bleibt.

Im täglichen Arbeiten? Wahrscheinlich nicht.

Bestes Beispiel Google. Die Gemini-Modelle sind nicht die absolute Leistungsspitze - aber sie stecken tief und nahtlos in Google Workspace. Für ihren Use Case sind sie richtig, richtig nützlich. Spezialisiert schlägt hier universell-stark.

Es ist wie im Werkzeugkasten: Für den einen Job brauche ich das Präzisionsinstrument. Für 90 Prozent der Arbeit reicht - und passt - das solide Standardwerkzeug besser.

Und die nüchterne Konsequenz aus der METR-Studie: Wenn erfahrene Entwickler sich um 39 Punkte verschätzen, dann verschätzt du dich bei der Frage "bringt mir das größere Modell hier wirklich was" auch. Die Antwort steht nicht im Benchmark und nicht im Bauchgefühl. Sie steht darin, ob die Aufgabe lang und mehrstufig ist. Ist sie kurz, ist das kleinere Modell fast immer die richtige Wahl.

## Das Race to the Top hat einen Preis

Dieses Rennen an die Spitze wird immer ressourcenintensiver. Immer mehr Rechenleistung, immer mehr Energie, für immer kleinere Sprünge auf Skalen, die zunehmend niemand mehr sauber messen kann. Zulasten unserer Natur, unserer Ressourcen.

Die ehrliche Frage ist: In welchem Kontext brauchen wir diese Modelle wirklich - und wo setzen wir aus Gewohnheit die schwerste Maschine ein, obwohl es die spezialisierte, sparsamere auch täte?

Ein LLM ist wunderbar im Generieren von Text. Beim Reasoning, beim echten Nachdenken, ist es ineffizient - es braucht dafür enorme Trainingsdaten und Rechenleistung. Wir zwingen ein Werkzeug, alles zu können.

Vielleicht liegt der nächste echte Sprung gar nicht darin, LLMs größer zu machen. Sondern in anderen Strukturen - World Models, JEPA-Ansätze - die genau das übernehmen, wofür LLMs schlecht gebaut sind. Damit nicht ein Modell alles machen muss.

Bis dahin wäre schon viel gewonnen, wenn wir zwei Dinge täten: bewusster wählen, statt reflexhaft das stärkste Modell zu nehmen. Und aufhören, auf die Prozentzahl zu starren.

Am Snooker-Tisch braucht der Profi seine 95 Prozent, um zu gewinnen. Aber gewertet wird die Breaklänge.

Beim Aufräumen zuhause reichen auch 90.

---

*Zahlenstand Juli 2026. SWE-bench-Werte sind Herstellerangaben und unabhängig kaum verifiziert. Horizont-Werte aus METRs Datensatz Horizon v1.1 mit breiten Konfidenzintervallen. Wenn du das hier in sechs Monaten liest, sind die Zahlen vermutlich überholt - der Punkt hoffentlich nicht.*
