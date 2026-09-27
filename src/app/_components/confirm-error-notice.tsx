"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

/**
 * Meldung für einen fehlgeschlagenen Bestätigungsklick.
 *
 * Die Bestätigungs-Route schickt bei jedem Fehlschlag ein
 * `?error=not-confirmed` mit, bisher las das niemand aus: der Nutzer klickte
 * in seiner Mail auf "Bestätigen" und stand wortlos wieder auf der
 * Landingpage. Wer nicht von selbst auf die Idee kommt, seine Adresse erneut
 * einzutragen, ist an dieser Stelle verloren.
 *
 * Genau das ist der Ausweg, und deshalb steht er hier: ein zweiter Versuch
 * über das Formular findet den inzwischen bestätigten Kontakt und leitet
 * direkt weiter.
 *
 * Als Client-Komponente hinter Suspense, damit die Landingpages statisch
 * bleiben - `useSearchParams` würde sie sonst auf Rendern bei jedem Aufruf
 * umstellen.
 */
function Notice({ ziel }: { ziel: string }) {
  const params = useSearchParams();

  if (params.get("error") !== "not-confirmed") return null;

  return (
    <div
      role="status"
      className="mb-6 flex items-start gap-3 rounded-[2px] bg-accent-100 p-4 text-ink text-left"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent-800" />
      <div>
        <p className="font-semibold text-ink">
          Das hat gerade nicht geklappt.
        </p>
        <p className="mt-1 text-[15px] leading-[1.55] text-ink/85">
          Wir konnten deine Bestätigung nicht zuordnen. Trag deine Adresse hier
          einfach noch einmal ein. Hast du schon bestätigt, kommst du direkt
          {ziel}.
        </p>
      </div>
    </div>
  );
}

export function ConfirmErrorNotice({ ziel }: { ziel: string }) {
  return (
    <Suspense fallback={null}>
      <Notice ziel={ziel} />
    </Suspense>
  );
}
