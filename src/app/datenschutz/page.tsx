import { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Datenschutz | ${SITE_NAME}`,
};

export default function DatenschutzPage() {
  return (
    <main className="section">
      <div className="container mx-auto px-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl text-forest mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg text-charcoal/80">
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen.
            </p>

            <h2>2. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
              Christoph Weissteiner<br />
              E-Mail: {CONTACT_EMAIL}
            </p>

            <h2>3. Datenerfassung auf dieser Website</h2>
            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert.
            </p>

            <p className="text-sm text-charcoal/50 mt-8">
              [Platzhalter — bitte mit vollständiger Datenschutzerklärung ersetzen]
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
