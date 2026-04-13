import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import {
  FileText,
  FolderOpen,
  Plug,
  BookOpen,
  Check,
  Brain,
  ArrowDown,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: `Second Brain Anleitung - Warteliste | ${SITE_NAME}`,
  description:
    "Bau dir ein zweites Gehirn, das deine KI versteht. Trag dich auf die Warteliste ein und erhalte die Schritt-für-Schritt-Anleitung, sobald sie fertig ist.",
};

export default function SecondBrainAnleitungPage() {
  return (
    <main>
      {/* Hero - Above the fold with CTA */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-accent font-medium mb-3 text-sm uppercase tracking-wide">
                  Kostenlose Schritt-für-Schritt-Anleitung
                </p>
                <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4 leading-tight">
                  Bau dir ein Second Brain, das deine KI versteht
                </h1>
                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  Schluss mit Briefen, Korrigieren, Wiederholen. Mit einem Second
                  Brain kennt deine KI dein Business, deine Zielgruppe und deine
                  Stimme - bei jeder Session.
                </p>
                <a href="#warteliste" className="btn-primary">
                  Auf die Warteliste
                </a>
                <p className="text-charcoal/50 text-xs mt-3">
                  Die Anleitung ist in Arbeit - du bekommst sie als Erster.
                </p>
              </div>
              {/* Visual: Before/After concept */}
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-xs p-5">
                  <p className="text-red-800/60 text-xs font-medium uppercase tracking-wide mb-2">
                    Ohne Second Brain
                  </p>
                  <div className="space-y-2 text-sm text-red-900/70">
                    <div className="flex items-start gap-2">
                      <RefreshCw className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                      <span>Jede KI-Session ein Neustart</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <RefreshCw className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                      <span>"Nein, nicht so förmlich. Nein, meine Zielgruppe sind keine Konzerne."</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <RefreshCw className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                      <span>Generische Outputs, die du komplett umschreibst</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-5 h-5 text-charcoal/30" />
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xs p-5">
                  <p className="text-green-800/60 text-xs font-medium uppercase tracking-wide mb-2">
                    Mit Second Brain
                  </p>
                  <div className="space-y-2 text-sm text-green-900/70">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                      <span>KI kennt dein Business vom ersten Wort an</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                      <span>Outputs klingen nach dir - nicht nach ChatGPT</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                      <span>Kein Briefing, kein Copy-Paste, kein Korrigieren</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6">
              Das Problem: Deine KI vergisst alles
            </h2>
            <p className="text-charcoal/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              Du nutzt KI-Tools im Arbeitsalltag. Aber jede Session beginnt bei
              null. Die KI weiß nicht, wer du bist, was du anbietest oder wie du
              schreibst. Also briefst du - jedes Mal. Das kostet nicht nur Zeit,
              sondern auch die Qualität der Ergebnisse.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-serif text-accent">5</span>
                </div>
                <p className="text-sm text-charcoal/70">
                  Minuten Kontext liefern, bevor die eigentliche Arbeit beginnt
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-serif text-accent">3x</span>
                </div>
                <p className="text-sm text-charcoal/70">
                  korrigieren, bis der Ton stimmt und es nach dir klingt
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-serif text-accent">0</span>
                </div>
                <p className="text-sm text-charcoal/70">
                  davon bleibt für die nächste Session erhalten
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution: What is a Second Brain */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Diagram */}
              <div className="bg-primary/5 rounded-xs p-8">
                <div className="space-y-4">
                  {/* Knowledge Base */}
                  <div className="bg-white rounded-xs p-4 border border-primary/10">
                    <p className="text-xs font-medium text-primary/50 uppercase tracking-wide mb-3">
                      Dein Second Brain
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Wer ich bin",
                        "Meine Zielgruppe",
                        "Meine Stimme",
                        "Services",
                        "Kunden",
                        "Entscheidungen",
                      ].map((item) => (
                        <div
                          key={item}
                          className="bg-accent/5 border border-accent/20 rounded-xs px-3 py-2 text-xs text-charcoal/70 flex items-center gap-2"
                        >
                          <FileText className="w-3 h-3 text-accent shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-accent/30 relative">
                      <ArrowDown className="w-4 h-4 text-accent absolute -bottom-2 -left-1.5" />
                    </div>
                  </div>
                  {/* AI Output */}
                  <div className="bg-white rounded-xs p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-green-600" />
                      <p className="text-xs font-medium text-green-700">
                        KI-Output mit Kontext
                      </p>
                    </div>
                    <p className="text-xs text-charcoal/60 italic">
                      "Hier ist dein LinkedIn-Post zum Thema X - geschrieben in
                      deinem Stil, für produzierende KMU im Allgäu..."
                    </p>
                  </div>
                </div>
              </div>
              {/* Explanation */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">
                  Die Lösung: Gib deiner KI ein Gedächtnis
                </h2>
                <p className="text-charcoal/70 leading-relaxed mb-4">
                  Ein Second Brain ist eine strukturierte Wissensbasis, die deine
                  KI lesen kann. Alles, was sie über dich und dein Business
                  wissen muss, liegt an einem Ort - aktuell, abrufbar, immer
                  verfügbar.
                </p>
                <p className="text-charcoal/70 leading-relaxed">
                  Statt jede Session von null zu starten, greift die KI auf dein
                  Wissen zu. Sie kennt deine Zielgruppe, weiß wie du sprichst
                  und versteht deine Entscheidungen - automatisch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's in the guide */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-3 text-center">
              Was in der Anleitung steckt
            </h2>
            <p className="text-charcoal/60 text-center mb-10">
              Kein Theorie-Dokument. Eine praktische Anleitung, die du an einem
              Nachmittag durcharbeiten kannst.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xs p-6 border border-primary/5">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-medium text-charcoal mb-2">
                  Fertige Vorlagen
                </h3>
                <p className="text-charcoal/60 text-sm">
                  Vorausgefüllte Templates für Stimme, Zielgruppe, Services und
                  mehr. Du füllst aus statt von null zu starten.
                </p>
              </div>
              <div className="bg-white rounded-xs p-6 border border-primary/5">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <FolderOpen className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-medium text-charcoal mb-2">
                  Klare Ordnerstruktur
                </h3>
                <p className="text-charcoal/60 text-sm">
                  Welche Dateien du brauchst, wie du sie benennst und wie alles
                  zusammenhängt - kopierfertig.
                </p>
              </div>
              <div className="bg-white rounded-xs p-6 border border-primary/5">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Plug className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-medium text-charcoal mb-2">
                  KI-Anbindung einrichten
                </h3>
                <p className="text-charcoal/60 text-sm">
                  Schritt für Schritt für verschiedene Setups: ChatGPT, Claude
                  Code, Cursor und andere Tools.
                </p>
              </div>
              <div className="bg-white rounded-xs p-6 border border-primary/5">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-medium text-charcoal mb-2">
                  Echte Praxis-Beispiele
                </h3>
                <p className="text-charcoal/60 text-sm">
                  Dateien und Strukturen aus meinem eigenen Setup - getestet im
                  Alltag, nicht in der Theorie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / who is this for */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-8 text-center">
              Für wen ist das?
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto">
              {[
                "Du nutzt KI-Tools im Business-Alltag",
                "Du bist es leid, jede Session von null zu starten",
                "Du willst Outputs, die nach dir klingen",
                "Du hast keine Lust auf komplizierte Systeme",
                "Du arbeitest allein oder im kleinen Team",
                "Du willst KI als echten Assistenten, nicht als Spielzeug",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 py-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-charcoal/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-primary text-white" id="warteliste">
        <div className="container mx-auto px-5">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
              Anleitung sichern
            </h2>
            <p className="text-white/70 mb-2">
              Die Anleitung ist aktuell in Arbeit. Trag dich ein und du bekommst
              sie als Erster - kostenlos.
            </p>
            <p className="text-white/50 text-sm mb-8">
              Kein Spam, kein Newsletter - nur die Anleitung.
            </p>
            <SignupForm />
          </div>
        </div>
      </section>

      {/* Trust footer */}
      <section className="py-10">
        <div className="container mx-auto px-5">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-charcoal/50 text-sm">
              Von{" "}
              <span className="text-charcoal/70 font-medium">
                Christoph Weissteiner
              </span>{" "}
              - Freelancer für KI und Prozessautomatisierung im Mittelstand.
              Dieses Second Brain nutze ich jeden Tag. Die Anleitung basiert auf
              Praxis, nicht auf Theorie.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
