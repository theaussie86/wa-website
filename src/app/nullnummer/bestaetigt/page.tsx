import { Metadata } from "next";
import { Bestaetigt } from "@/app/_components/bestaetigt";

export const metadata: Metadata = {
  title: "Bestätigt - Warteliste Nullnummer",
  robots: { index: false },
};

// Ziel der Weiterleitung aus der Bestätigungsmail. Bewusst ohne Prüfung bei
// Brevo: hier wird nichts freigeschaltet, es gibt nichts zu schützen.
export default function NullnummerBestaetigtPage() {
  return (
    <Bestaetigt
      titel="Warteliste Nullnummer"
      ueberschrift="Du stehst auf der Warteliste."
      beschreibung="Ich melde mich persönlich, bevor die nächste Runde startet."
    />
  );
}
