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
  Clock,
  X,
  Bot,
  Zap,
} from "lucide-react";
import { SignupForm } from "./signup-form";
import AuthorBox from "../_components/author-box";

export const metadata: Metadata = {
  title: `Second Brain Anleitung - Kostenlos | ${SITE_NAME}`,
  description:
    "KI vergisst alles? Mit einem Second Brain kennt sie dein Business, deine Stimme und deine Zielgruppe - bei jeder Session. Kostenlose Schritt-für-Schritt-Anleitung.",
};

export default function SecondBrainAnleitungPage() {
  return (
    <main>
      {/* Hero - Centered, outcome-focused */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium mb-4 text-sm uppercase tracking-wide">
              Kostenlose Schritt-für-Schritt-Anleitung
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-6 leading-tight">
              KI kennt dein Business - ab der ersten Sekunde
            </h1>
            <p className="text-charcoal/70 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
              Schluss mit Briefen, Korrigieren, Wiederholen. Ein Second Brain gibt
              KI dauerhaft Kontext - Zielgruppe, Stimme, Entscheidungen.
              Jeder Output ist sofort brauchbar.
            </p>
            <a
              href="#warteliste"
              className="btn-primary text-lg px-8 py-4 inline-block"
            >
              Kostenlose Anleitung sichern
            </a>
            <p className="text-charcoal/50 text-sm mt-4">
              Aktuell in Arbeit - du bekommst sie als Erster.
            </p>
          </div>
        </div>
      </section>

      {/* Before / After - Visual proof of the transformation */}
      <section className="py-12">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-xs p-6 md:p-8">
                <p className="text-red-800/60 text-xs font-medium uppercase tracking-wide mb-4">
                  Ohne Second Brain
                </p>
                <div className="space-y-4 text-red-900/70">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 mt-0.5 shrink-0 text-red-400" />
                    <div>
                      <span className="font-medium block">Jede Session ein Neustart</span>
                      <span className="text-sm text-red-900/50">
                        5 Minuten Kontext liefern, bevor die Arbeit beginnt
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 mt-0.5 shrink-0 text-red-400" />
                    <div>
                      <span className="font-medium block">Endlos korrigieren</span>
                      <span className="text-sm text-red-900/50">
                        &quot;Nein, nicht so förmlich. Nein, meine Zielgruppe sind keine Konzerne.&quot;
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 mt-0.5 shrink-0 text-red-400" />
                    <div>
                      <span className="font-medium block">Generische Outputs</span>
                      <span className="text-sm text-red-900/50">
                        Klingt nach ChatGPT, nicht nach dir
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xs p-6 md:p-8">
                <p className="text-green-800/60 text-xs font-medium uppercase tracking-wide mb-4">
                  Mit Second Brain
                </p>
                <div className="space-y-4 text-green-900/70">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-green-500" />
                    <div>
                      <span className="font-medium block">KI kennt dein Business sofort</span>
                      <span className="text-sm text-green-900/50">
                        Zielgruppe, Angebot, Entscheidungen - alles da
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-green-500" />
                    <div>
                      <span className="font-medium block">Outputs klingen nach dir</span>
                      <span className="text-sm text-green-900/50">
                        Deine Stimme, dein Stil, deine Sprache
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-green-500" />
                    <div>
                      <span className="font-medium block">Kein Briefing, kein Korrigieren</span>
                      <span className="text-sm text-green-900/50">
                        Prompt rein, brauchbares Ergebnis raus
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - visualized as frustrating loop */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
              Kennst du das?
            </h2>
            <p className="text-charcoal/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              Du öffnest ChatGPT, Claude oder ein anderes KI-Tool. Und bevor du
              arbeiten kannst, erklärst du erst mal wieder, wer du bist, was du
              machst und wie du schreibst.
            </p>

            {/* Frustrating loop visualization */}
            <div className="max-w-2xl mx-auto">
              {/* Step 1 */}
              <div className="flex items-center gap-4 md:gap-6 text-left mb-2">
                <div className="w-12 h-12 rounded-full bg-red-100 border-2 border-red-200 flex items-center justify-center shrink-0">
                  <span className="text-red-600 font-bold text-sm">1</span>
                </div>
                <div className="flex-1 bg-white rounded-xs p-4 border border-red-100">
                  <p className="text-charcoal/80 font-medium">5 Minuten Kontext liefern</p>
                  <p className="text-charcoal/50 text-sm">
                    Wer du bist, was du machst, wie du schreibst...
                  </p>
                </div>
              </div>
              {/* Connector */}
              <div className="ml-6 w-px h-4 bg-red-200" />
              {/* Step 2 */}
              <div className="flex items-center gap-4 md:gap-6 text-left mb-2">
                <div className="w-12 h-12 rounded-full bg-red-100 border-2 border-red-200 flex items-center justify-center shrink-0">
                  <span className="text-red-600 font-bold text-sm">2</span>
                </div>
                <div className="flex-1 bg-white rounded-xs p-4 border border-red-100">
                  <p className="text-charcoal/80 font-medium">3x korrigieren</p>
                  <p className="text-charcoal/50 text-sm">
                    &quot;Nein, nicht so förmlich. Nein, meine Zielgruppe sind keine Konzerne.&quot;
                  </p>
                </div>
              </div>
              {/* Connector */}
              <div className="ml-6 w-px h-4 bg-red-200" />
              {/* Step 3 */}
              <div className="flex items-center gap-4 md:gap-6 text-left mb-2">
                <div className="w-12 h-12 rounded-full bg-red-100 border-2 border-red-200 flex items-center justify-center shrink-0">
                  <span className="text-red-600 font-bold text-sm">3</span>
                </div>
                <div className="flex-1 bg-white rounded-xs p-4 border border-red-100">
                  <p className="text-charcoal/80 font-medium">Ergebnis ist halbwegs brauchbar</p>
                  <p className="text-charcoal/50 text-sm">
                    Nach 15 Minuten hast du, was in 2 möglich wäre
                  </p>
                </div>
              </div>
              {/* Connector */}
              <div className="ml-6 w-px h-4 bg-red-200" />
              {/* Step 4 - the kicker */}
              <div className="flex items-center gap-4 md:gap-6 text-left">
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-red-50 rounded-xs p-4 border-2 border-red-200">
                  <p className="text-red-800 font-medium">Nächste Session? Alles von vorne.</p>
                  <p className="text-red-600/70 text-sm">
                    Nichts davon bleibt erhalten. Jeden Tag dasselbe.
                  </p>
                </div>
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
                  <div className="bg-white rounded-xs p-5 border border-primary/10">
                    <p className="text-xs font-medium text-primary/50 uppercase tracking-wide mb-3">
                      Dein Second Brain
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Wer ich bin",
                        "Meine Zielgruppe",
                        "Meine Stimme",
                        "Services & Angebot",
                        "Bisherige Kunden",
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
                    <div className="w-px h-8 bg-accent/30 relative">
                      <ArrowDown className="w-4 h-4 text-accent absolute -bottom-2 -left-1.5" />
                    </div>
                  </div>
                  {/* AI Output */}
                  <div className="bg-white rounded-xs p-5 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <p className="text-xs font-medium text-green-700">
                        KI-Output mit Kontext
                      </p>
                    </div>
                    <p className="text-sm text-charcoal/70 italic">
                      &quot;Hier ist dein LinkedIn-Post zum Thema X - geschrieben
                      in deinem Stil, für produzierende KMU im Allgäu...&quot;
                    </p>
                  </div>
                </div>
              </div>
              {/* Explanation */}
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
                  Die Lösung: Ein System, das sich selbst pflegt
                </h2>
                <p className="text-charcoal/70 text-lg leading-relaxed mb-4">
                  Ein Second Brain ist nicht einfach eine Sammlung von Notizen. Es
                  ist eine Wissensbasis mit eingebauten KI-Workflows, die sich
                  automatisch aktuell hält.
                </p>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  Neue Informationen werden eingeordnet, verlinkt und ergänzt -
                  nicht von dir, sondern von KI. Du richtest das System einmal
                  ein, und es wächst mit deinem Business mit. Kein manuelles
                  Pflegen, kein Vergessen, kein Veralten.
                </p>
                <a
                  href="#warteliste"
                  className="btn-primary inline-block"
                >
                  Anleitung kostenlos sichern
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's in the guide */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3 text-center">
              Was du bekommst
            </h2>
            <p className="text-charcoal/70 text-lg text-center mb-12">
              Kein Theorie-Dokument. Eine praktische Anleitung, die du an einem
              Nachmittag durcharbeiten kannst.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xs p-8 border border-primary/5">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-medium text-charcoal text-lg mb-2">
                  Fertige Vorlagen
                </h3>
                <p className="text-charcoal/70">
                  Vorausgefüllte Templates für Stimme, Zielgruppe, Services und
                  mehr. Du füllst aus statt von null zu starten.
                </p>
              </div>
              <div className="bg-white rounded-xs p-8 border border-primary/5">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <FolderOpen className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-medium text-charcoal text-lg mb-2">
                  Klare Ordnerstruktur
                </h3>
                <p className="text-charcoal/70">
                  Welche Dateien du brauchst, wie du sie benennst und wie alles
                  zusammenhängt - kopierfertig.
                </p>
              </div>
              <div className="bg-white rounded-xs p-8 border border-primary/5">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <Bot className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-medium text-charcoal text-lg mb-2">
                  KI-Workflows für automatische Pflege
                </h3>
                <p className="text-charcoal/70">
                  Fertige Rules, Skills und Workflows, die deine Wissensbasis
                  im Hintergrund aktuell halten - ohne manuellen Aufwand.
                </p>
              </div>
              <div className="bg-white rounded-xs p-8 border border-primary/5">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-medium text-charcoal text-lg mb-2">
                  Fertiges Start-Framework
                </h3>
                <p className="text-charcoal/70">
                  Nicht nur Theorie: Ein komplettes Setup mit KI-Anbindung
                  für ChatGPT, Claude, Cursor und andere Tools - sofort einsatzbereit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiator: AI-managed, not manual */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
              Du organisierst nicht. KI organisiert.
            </h2>
            <p className="text-charcoal/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Das Problem mit den meisten Wissensmanagement-Systemen: Du musst sie
              selbst pflegen. Neue Infos einsortieren, Links setzen, veraltetes
              rauswerfen. Das macht niemand langfristig.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-left">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-charcoal mb-2">
                  Automatisch aktuell
                </h3>
                <p className="text-charcoal/70 text-sm">
                  KI-Workflows erkennen neue Informationen und ordnen sie ein -
                  Verlinkungen, Zusammenhänge, Ergänzungen passieren im Hintergrund.
                </p>
              </div>
              <div className="text-left">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-charcoal mb-2">
                  Rules & Skills statt Disziplin
                </h3>
                <p className="text-charcoal/70 text-sm">
                  Das Framework bringt fertige Regeln und Skills mit. KI weiß,
                  was wo hingehört - du musst es nicht im Kopf behalten.
                </p>
              </div>
              <div className="text-left">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-charcoal mb-2">
                  Wächst mit deinem Business
                </h3>
                <p className="text-charcoal/70 text-sm">
                  Je mehr du arbeitest, desto besser wird das System. Neues
                  Wissen fließt automatisch ein - ohne Extra-Aufwand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-10 text-center">
              Ist das was für dich?
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5 max-w-2xl mx-auto">
              {[
                "Du nutzt KI-Tools regelmäßig im Business",
                "Du bist es leid, jede Session von null zu starten",
                "Du willst Outputs, die nach dir klingen - nicht nach ChatGPT",
                "Du hast keine Lust auf komplizierte Systeme",
                "Du arbeitest allein oder im kleinen Team",
                "Du willst KI als echten Assistenten, nicht als Spielzeug",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 py-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-charcoal/70">{item}</span>
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
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Anleitung kostenlos sichern
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Die Anleitung ist aktuell in Arbeit. Trag dich ein und du bekommst
              sie als Erster.
            </p>
            <SignupForm />
          </div>
        </div>
      </section>

      {/* Author */}
      <AuthorBox
        name="Christoph Weissteiner"
        picture="/images/author/christoph-weissteiner.webp"
      />
    </main>
  );
}
