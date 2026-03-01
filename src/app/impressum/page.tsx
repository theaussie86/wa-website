import { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL, LOCATION } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Impressum | ${SITE_NAME}`,
};

export default function ImpressumPage() {
  return (
    <main className="section">
      <div className="container mx-auto px-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl text-primary mb-8">Impressum</h1>

          <div className="prose prose-lg text-charcoal/80">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              Christoph Weissteiner<br />
              {LOCATION}<br />
              Deutschland
            </p>

            <h2>Kontakt</h2>
            <p>
              E-Mail: {CONTACT_EMAIL}
            </p>

            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Christoph Weissteiner<br />
              {LOCATION}
            </p>

            <p className="text-sm text-charcoal/50 mt-8">
              [Platzhalter — bitte mit vollständigen Angaben ersetzen]
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
