"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sheet, Tab } from "@/app/_components/home/sheet";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Hero-Artefakt: der Angebotsentwurf im Betriebsordner. Beim Laden korrigiert
 * der Inhaber einmal: Floskel gestrichen, eigener Satz des Kunden eingefügt,
 * Notiz für die Anleitung geklebt. Bei reduzierter Bewegung steht das Ergebnis.
 */
export function HeroSheet() {
  const reduce = useReducedMotion();

  const strike = reduce
    ? {}
    : {
        initial: { textDecorationColor: "rgba(216,107,0,0)", color: "#2D3436" },
        animate: { textDecorationColor: "rgba(216,107,0,1)", color: "#5E666B" },
        transition: { duration: 0.5, ease, delay: 1.1 },
      };

  const appear = (delay: number, y = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease, delay },
        };

  return (
    <figure
      role="img"
      aria-label="Beispiel: ein Angebotsentwurf liegt vorbereitet im Ordner. Der Inhaber streicht eine Floskel, setzt den Satz des Kunden ein und merkt sich die Regel für seine Anleitung."
      className="relative mr-14 mb-24 select-none lg:mr-12"
    >
      {/* Die Blätter dahinter, jedes mit eigenem Register */}
      <div aria-hidden="true" className="absolute inset-0 translate-x-[18px] -translate-y-[14px] rounded-[2px] bg-[#EEF1F3]">
        <Tab tone="grey" className="top-[62%]">Nachfassen</Tab>
      </div>
      <div aria-hidden="true" className="absolute inset-0 translate-x-[9px] -translate-y-[7px] rounded-[2px] bg-[#F7F8F9]">
        <Tab className="top-[40%]">Anfragen</Tab>
      </div>

      <Sheet ground="primary" className="pt-9 pr-[7%] pb-8 pl-[13%] sm:pl-[11%]">
        <Tab tone="accent" className="top-[16%]">Angebote</Tab>

        <div aria-hidden="true">
          <div className="mb-7 flex justify-between gap-4 text-[11.5px] tracking-[0.02em] text-charcoal/75">
            <span>Entwurf · liegt bereit seit 7:42</span>
            <span>Beispiel</span>
          </div>

          <p className="type-display mb-5 text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.08] text-primary">
            Angebot Empfangsbereich, Kanzlei Berger
          </p>

          <div className="space-y-3 text-[13.5px] leading-[1.65] sm:text-[14.5px]">
            <p>Liebe Frau Berger,</p>
            <p>
              <motion.del
                {...strike}
                className="decoration-accent decoration-2"
                style={reduce ? { color: "#5E666B" } : undefined}
              >
                wir freuen uns über Ihr Interesse an unseren Leistungen.
              </motion.del>{" "}
              <motion.ins {...appear(1.7)} className="font-medium text-accent-600 italic no-underline">
                danke für den Rundgang am Dienstag. Sie haben gesagt, der Empfang soll ruhiger
                wirken, ohne kühl zu sein.
              </motion.ins>{" "}
              Genau darauf baut dieser Vorschlag auf.
            </p>
            <ol className="list-decimal space-y-1 pl-5 marker:text-charcoal/75">
              <li>Wände in einem warmen Kalkton, matt gestrichen</li>
              <li>Die Theke bleibt, bekommt aber eine neue Front aus Eiche</li>
              <li>Indirektes Licht statt der Deckenstrahler</li>
            </ol>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3 sm:justify-between gap-3 border-t border-charcoal/10 pt-4 text-[12.5px]">
            <span className="hidden text-charcoal/75 sm:inline">Du entscheidest</span>
            <span className="flex shrink-0 gap-2 whitespace-nowrap">
              <span className="rounded-[3px] border border-charcoal/20 px-3 py-1.5 text-primary">Nochmal</span>
              <span className="rounded-[3px] bg-primary px-3 py-1.5 text-white">Passt so</span>
            </span>
          </div>
        </div>
      </Sheet>

      {/* Haftnotiz: die Korrektur wird Teil der Anleitung */}
      <motion.div
        aria-hidden="true"
        {...appear(2.5, 8)}
        className="absolute -bottom-[76px] -left-3 w-[72%] max-w-[270px] rounded-[2px] bg-accent-100 px-4 py-3.5 text-ink shadow-[0_14px_28px_-16px_rgba(0,23,46,0.55)] sm:-bottom-[84px] sm:-left-8"
      >
        <p className="type-label mb-1 text-[11px] text-accent-800">Gemerkt für die Anleitung</p>
        <p className="text-[14.5px] leading-snug font-medium">Kunden immer mit ihrem eigenen Satz abholen.</p>
      </motion.div>
    </figure>
  );
}
