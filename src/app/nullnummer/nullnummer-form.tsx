"use client";

import Link from "next/link";
import { OptinForm } from "@/app/_components/optin-form";
import { joinNullnummer } from "./actions";

/**
 * Formular der Warteliste Nullnummer. Eigenständig, damit es auch auf
 * `/ki-arbeitsplatz` stehen kann, nicht nur auf `/nullnummer`.
 */
export function NullnummerForm() {
  return (
    <OptinForm
      action={joinNullnummer}
      recaptchaAction="waitlist"
      submitLabel="Auf die Warteliste"
      freitext={{ label: "Welche Aufgabe landet bei dir immer wieder auf dem Tisch?" }}
      hinweis={
        <p>
          Du bekommst eine Mail zum Bestätigen, danach nichts automatisch. Ich melde mich
          persönlich, bevor die nächste Runde startet. Deine Angaben liegen bei Brevo. Willst du
          wieder runter, reicht eine kurze Mail an mich. Mehr in der{" "}
          <Link href="/datenschutz#newsletter" className="underline hover:no-underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
      }
    />
  );
}
