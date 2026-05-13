import { Metadata } from "next";
import { Bestaetigt } from "@/app/_components/bestaetigt";

export const metadata: Metadata = {
  title: "Anmeldung bestätigt - KI-Check Handwerk",
  robots: { index: false },
};

export default function HandwerkKiCheckBestaetigtPage() {
  return (
    <Bestaetigt
      titel="KI-Readiness Check für Handwerksbetriebe"
      beschreibung="Der KI-Check ist noch im Aufbau. Wir melden uns per E-Mail, sobald er fertig ist."
    />
  );
}
