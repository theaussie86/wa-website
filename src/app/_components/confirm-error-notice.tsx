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
      className="mb-6 flex items-start gap-3 rounded-xs border border-white/20 bg-white/10 p-4 text-left"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
      <div>
        <p className="font-medium text-white">
          Das hat gerade nicht geklappt.
        </p>
        <p className="mt-1 text-sm text-white/70">
          Wir konnten deine Bestätigung nicht zuordnen. Trag deine Adresse hier
          einfach noch einmal ein - hast du schon bestätigt, kommst du direkt
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
