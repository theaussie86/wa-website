import type { ReactNode } from "react";

// Kopf jeder Unterseite: der Ordnerdeckel wie im Hero der Startseite, nur
// ruhiger. Rechts optional ein Blatt, ein Bild oder nichts.
export function PageHead({
  title,
  lead,
  actions,
  aside,
  before,
  titleClassName = "max-w-[16ch]",
  size = "lg",
}: {
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  before?: ReactNode;
  titleClassName?: string;
  size?: "lg" | "md";
}) {
  const titleSize =
    size === "lg" ? "text-[clamp(2.6rem,6vw,5rem)] leading-[0.94]" : "text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1]";
  return (
    <section className="overflow-hidden bg-primary text-white">
      <div
        className={`mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-x-16 gap-y-14 px-6 pt-[clamp(48px,6vw,88px)] pb-[clamp(72px,8vw,120px)] lg:px-10 ${
          aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]" : ""
        }`}
      >
        <div>
          {before}
          <h1
            className={`type-display mb-7 text-white ${titleSize} ${titleClassName}`}
          >
            {title}
          </h1>
          {lead && (
            <div className="max-w-[36rem] text-pretty text-[clamp(1.08rem,1.4vw,1.25rem)] leading-[1.6] text-white/85">
              {lead}
            </div>
          )}
          {actions && <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">{actions}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
