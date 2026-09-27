"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Sheet, Tab } from "@/app/_components/home/sheet";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Zeitplan der einen Szene: Blatt liegt da, Stift streicht die Floskel,
// eigener Satz kommt rein, Hashtags fliegen raus, Notiz klebt, Freigabe.
const t = {
  sheet: 0.15,
  lines: 0.55,
  strike1: 1.5,
  insert: 2.15,
  strike2: 2.9,
  note: 3.4,
  approve: 4.1,
};

const PEN = "#D86B00";

/**
 * Hero-Artefakt: ein LinkedIn-Beitrag, der vorbereitet im Ordner liegt.
 * Der Inhaber korrigiert ihn einmal sichtbar und gibt ihn frei.
 * Bei reduzierter Bewegung steht sofort der Endzustand.
 */
export function HeroSheet() {
  const reduce = useReducedMotion();
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (reduce) {
      setApproved(true);
      return;
    }
    const id = window.setTimeout(() => setApproved(true), t.approve * 1000);
    return () => window.clearTimeout(id);
  }, [reduce]);

  const appear = (delay: number, y = 0, blur = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y, filter: `blur(${blur}px)` },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.6, ease, delay },
        };

  // Streichung als wachsende Linie, läuft über Zeilenumbrüche hinweg
  const strike = (delay: number, duration: number) => ({
    style: {
      backgroundImage: `linear-gradient(${PEN}, ${PEN})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0 58%",
      ...(reduce ? { backgroundSize: "100% 2px", color: "#5E666B" } : {}),
    },
    ...(reduce
      ? {}
      : {
          initial: { backgroundSize: "0% 2px", color: "#2D3436" },
          animate: { backgroundSize: "100% 2px", color: "#5E666B" },
          transition: { duration, ease: "easeInOut" as const, delay },
        }),
  });

  return (
    <figure
      role="img"
      aria-label="Beispiel: Ein LinkedIn-Beitrag liegt vorbereitet im Ordner. Der Inhaber streicht die Floskel, setzt den Satz seiner Kundin ein, streicht die Hashtags, merkt sich die Regel für seine Anleitung und gibt den Beitrag frei."
      className="relative mr-14 mb-24 select-none"
    >
      {/* Die Blätter dahinter, jedes mit eigenem Register */}
      <motion.div aria-hidden="true" {...appear(0)} className="absolute inset-0 translate-x-[20px] -translate-y-[16px] rounded-[2px] bg-[#EEF1F3]">
        <Tab tone="grey" className="top-[62%]">Anfragen</Tab>
      </motion.div>
      <motion.div aria-hidden="true" {...appear(0.05)} className="absolute inset-0 translate-x-[10px] -translate-y-[8px] rounded-[2px] bg-[#F7F8F9]">
        <Tab className="top-[37%]">Angebote</Tab>
      </motion.div>

      <motion.div {...appear(t.sheet, 28)}>
        <Sheet ground="primary" className="pt-9 pr-[7%] pb-8 pl-[13%] sm:pl-[11%]">
          <Tab tone="accent" className="top-[12%]">Beiträge</Tab>

          <div aria-hidden="true">
            <div className="mb-7 flex justify-between gap-4 text-[11.5px] tracking-[0.02em] text-charcoal/75">
              <span>Entwurf LinkedIn · liegt bereit seit 7:42</span>
              <span>Beispiel</span>
            </div>

            <motion.p
              {...appear(t.lines, 6)}
              className="type-display mb-5 text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.08] text-primary"
            >
              Warum wir die Theke stehen lassen
            </motion.p>

            <div className="space-y-3 text-[13.5px] leading-[1.65] sm:text-[14.5px]">
              <motion.p {...appear(t.lines + 0.12, 6)}>
                <motion.span {...strike(t.strike1, 0.7)}>
                  In der heutigen schnelllebigen Zeit ist der erste Eindruck wichtiger denn je.
                </motion.span>{" "}
                <motion.span
                  {...(reduce
                    ? {}
                    : {
                        initial: { clipPath: "inset(0 100% 0 0)" },
                        animate: { clipPath: "inset(0 0% 0 0)" },
                        transition: { duration: 0.9, ease: "easeOut" as const, delay: t.insert },
                      })}
                  className="font-medium text-accent-600 italic"
                >
                  „Ruhiger soll es wirken, aber nicht kühl“, hat die Kundin beim Rundgang gesagt.
                </motion.span>
              </motion.p>
              <motion.p {...appear(t.lines + 0.24, 6)}>
                Also haben wir nicht alles rausgerissen. Die Theke bleibt und bekommt eine neue
                Front aus Eiche. Dazu Kalk an den Wänden und Licht, das nicht von oben blendet.
              </motion.p>
              <motion.p {...appear(t.lines + 0.36, 6)}>
                Manchmal ist die beste Idee, das Gute stehen zu lassen.
              </motion.p>
              <motion.p {...appear(t.lines + 0.48, 6)} className="text-primary">
                <motion.span {...strike(t.strike2, 0.45)}>#Innenausbau #Qualität #Erfolg #Motivation</motion.span>
              </motion.p>
            </div>

            <motion.div
              {...appear(t.lines + 0.6, 6)}
              className="mt-8 flex items-center justify-end gap-3 border-t border-charcoal/10 pt-4 text-[12.5px] sm:justify-between"
            >
              <span className="hidden text-charcoal/75 sm:inline">Du entscheidest</span>
              <span className="flex shrink-0 gap-2 whitespace-nowrap">
                <span className="rounded-[3px] border border-charcoal/20 px-3 py-1.5 text-primary">Nochmal</span>
                <motion.span
                  animate={approved && !reduce ? { scale: [1, 0.92, 1] } : undefined}
                  transition={{ duration: 0.35, ease }}
                  className={`flex items-center gap-1.5 rounded-[3px] px-3 py-1.5 transition-colors duration-300 ${
                    approved ? "bg-accent text-ink" : "bg-primary text-white"
                  }`}
                >
                  {approved && <Check className="h-3.5 w-3.5" strokeWidth={2} />}
                  {approved ? "Freigegeben" : "Passt so"}
                </motion.span>
              </span>
            </motion.div>
          </div>
        </Sheet>
      </motion.div>

      {/* Haftnotiz: die Korrektur wird Teil der Anleitung */}
      <motion.div
        aria-hidden="true"
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, y: 14, rotate: -4 },
              animate: { opacity: 1, y: 0, rotate: -1.5 },
              transition: { duration: 0.7, ease, delay: t.note },
            })}
        style={reduce ? { rotate: -1.5 } : undefined}
        className="absolute -bottom-[76px] -left-3 w-[72%] max-w-[290px] rounded-[2px] bg-accent-100 px-4 py-3.5 text-ink shadow-[0_14px_28px_-16px_rgba(0,23,46,0.55)] sm:-bottom-[84px] sm:-left-8"
      >
        <p className="type-label mb-1 text-[11px] text-accent-800">Gemerkt für die Anleitung</p>
        <p className="text-[14.5px] leading-snug font-medium">
          Mit einem echten Satz vom Kunden einsteigen. Keine Hashtag-Wolken.
        </p>
      </motion.div>
    </figure>
  );
}
