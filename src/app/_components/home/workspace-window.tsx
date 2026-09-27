"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Der Entwurf, der "vorbereitet daliegt". Absichtlich ein konkreter,
// unspektakulärer Fall: Die Qualität liegt im Satz, der den Kunden abholt.
const draft = [
  "Liebe Frau Berger,",
  "danke für den Rundgang am Dienstag. Sie haben gesagt, der Empfang soll ruhiger wirken, ohne kühl zu sein. Genau darauf baut dieser Vorschlag auf.",
  "1. Wände in einem warmen Kalkton, matt gestrichen",
  "2. Die Theke bleibt, bekommt aber eine neue Front aus Eiche",
  "3. Indirektes Licht statt der Deckenstrahler",
];

const sources = ["Gesprächsnotiz Di", "Preisliste 2026", "Anleitung Angebote"];

/**
 * Hero-Artefakt: eine nachgebaute Arbeitsplatz-Szene statt Screenshot.
 * Rein illustrativ, deshalb als Bild mit Beschreibung ausgezeichnet.
 * Der Entwurf baut sich einmal zeilenweise auf, bei reduzierter Bewegung
 * steht er sofort da.
 */
export function WorkspaceWindow() {
  const reduce = useReducedMotion();

  const line = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease, delay: 0.5 + i * 0.28 },
        };

  return (
    <figure
      role="img"
      aria-label="Ein KI-Arbeitsplatz: Ein Angebotsentwurf liegt vorbereitet da, gestützt auf Gesprächsnotiz, Preisliste und die eigene Anleitung. Der Inhaber entscheidet mit einem Klick."
      className="relative mx-auto w-full max-w-[600px] select-none pt-[9%] pr-[11%] pb-[72px] pl-[9%] sm:pb-[84px]"
    >
      {/* Collage: Foto, Blau-Fläche, Orange-Streifen */}
      <div aria-hidden="true" className="absolute top-0 right-0 h-[74%] w-[70%] overflow-hidden rounded-[18px]">
        <Image
          src="/gruenten.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 420px, 70vw"
          className="object-cover object-[60%_50%] saturate-[0.8]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-[4%] left-0 h-[44%] w-[42%] rounded-[18px] bg-primary"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(250,249,247,0.07) 0 1px, transparent 1px 22px)",
        }}
      />
      <div aria-hidden="true" className="absolute top-[14%] left-[5%] h-[52%] w-[11%] rounded-[14px] bg-accent" />

      {/* Das Fenster: im normalen Fluss, damit die Szene mit dem Inhalt wächst */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden rounded-[16px] border border-primary/10 bg-white shadow-[0_40px_80px_-40px_rgba(0,23,46,0.45)]"
      >
        <div className="flex items-center gap-1.5 border-b border-primary/[0.07] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-charcoal/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-charcoal/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-charcoal/15" />
        </div>

        <div className="px-[7%] pt-5 pb-6">
          <p className="mb-3 font-serif text-[clamp(1.1rem,2vw,1.45rem)] leading-tight text-primary">
            Angebot Empfangsbereich, Kanzlei Berger
          </p>
          <div className="mb-5 flex flex-wrap gap-1.5">
            {sources.map((s) => (
              <span
                key={s}
                className="rounded-full border border-primary/10 bg-primary-50/60 px-2.5 py-1 font-sans text-[10.5px] text-primary/80 sm:text-[11.5px]"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="space-y-2 font-sans text-[11px] leading-[1.6] text-charcoal/85 sm:text-[12.5px]">
            {draft.map((text, i) => (
              <motion.p key={i} {...line(i)} className={i === 1 ? "pb-1" : ""}>
                {text}
              </motion.p>
            ))}
          </div>

          <motion.div
            {...line(draft.length)}
            className="mt-5 flex items-center justify-between gap-3 border-t border-primary/[0.07] pt-4"
          >
            <span className="font-sans text-[10.5px] text-charcoal/70 sm:text-[11.5px]">
              Liegt bereit seit 7:42
            </span>
            <span className="flex gap-1.5">
              <span className="rounded-full border border-primary/20 px-3 py-1 font-sans text-[10.5px] text-primary sm:text-[11.5px]">
                Nochmal
              </span>
              <span className="rounded-full bg-primary px-3 py-1 font-sans text-[10.5px] text-warm-white sm:text-[11.5px]">
                Passt so
              </span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Notiz aus der Anleitung: der Arbeitsplatz weiß, wie du arbeitest */}
      <motion.div
        aria-hidden="true"
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, ease, delay: 2.4 },
            })}
        className="absolute right-[2%] bottom-0 w-[60%] rounded-[14px] sm:w-[46%] border border-primary/10 bg-warm-white p-4 shadow-[0_24px_48px_-28px_rgba(0,23,46,0.4)]"
      >
        <p className="mb-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-accent-600 sm:text-[10.5px]">
          Aus deiner Anleitung
        </p>
        <p className="font-serif text-[12.5px] leading-snug text-primary sm:text-[14.5px]">
          Kunden immer mit ihrem eigenen Satz abholen.
        </p>
      </motion.div>
    </figure>
  );
}
