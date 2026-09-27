import type { ReactNode } from "react";

// Ein gelochtes A4-Blatt aus dem Betriebsordner. Die Löcher tragen die Farbe
// des Grunds, auf dem das Blatt liegt, damit sie wie ausgestanzt wirken.

type Ground = "pappe" | "primary" | "white";

const holeColor: Record<Ground, string> = {
  pappe: "bg-pappe",
  primary: "bg-primary",
  white: "bg-white",
};

export function Sheet({
  children,
  ground = "pappe",
  holes = "left",
  className = "",
}: {
  children: ReactNode;
  ground?: Ground;
  holes?: "left" | "top";
  className?: string;
}) {
  const hole = `block h-3 w-3 rounded-full ${holeColor[ground]} shadow-[inset_0_1px_2px_rgba(0,23,46,0.25)]`;

  return (
    <div
      className={`relative rounded-[2px] bg-white text-charcoal shadow-[0_22px_44px_-26px_rgba(0,23,46,0.45)] ${className}`}
    >
      {holes === "left" ? (
        <span aria-hidden="true" className="absolute top-1/2 left-[14px] flex -translate-y-1/2 flex-col gap-[72px]">
          <i className={hole} />
          <i className={hole} />
        </span>
      ) : (
        <span aria-hidden="true" className="absolute top-[14px] left-1/2 flex -translate-x-1/2 gap-[72px]">
          <i className={hole} />
          <i className={hole} />
        </span>
      )}
      {children}
    </div>
  );
}

// Registertabe, die aus dem Blatt ragt. Orange nur für das, was der Inhaber
// entscheidet oder gerade aufgeschlagen hat.
export function Tab({
  children,
  tone = "white",
  side = "right",
  className = "",
}: {
  children: ReactNode;
  tone?: "accent" | "white" | "grey";
  side?: "right" | "top";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent text-ink",
    white: "bg-white text-primary",
    grey: "bg-[#DDE2E6] text-primary",
  };
  const shape =
    side === "right"
      ? "-right-8 w-8 h-24 rounded-r-[5px] [writing-mode:vertical-rl]"
      : "-top-7 h-7 px-4 rounded-t-[5px]";

  return (
    <span
      aria-hidden="true"
      className={`type-label absolute flex items-center justify-center text-[11px] ${shape} ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
