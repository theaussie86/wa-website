import { Metadata } from "next";
import {
  SITE_NAME,
  CAL_LINK,
  WHATSAPP_LINK,
  LOCATION,
} from "@/lib/constants";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: `Kontakt | ${SITE_NAME}`,
  description: "Lassen Sie uns sprechen — unverbindlich und ohne Verkaufsdruck.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
              Lassen Sie uns sprechen
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed">
              Kein Verkaufsdruck, kein Pitch — nur ein Gespräch, um herauszufinden,
              ob wir zusammenpassen.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Cal.com */}
            <div className="bg-white p-8 rounded-sm shadow-sm border-2 border-accent text-center">
              <div className="text-accent mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-serif text-xl text-primary mb-2">Kennenlernen buchen</h2>
              <p className="text-charcoal/70 text-sm mb-6">
                15-30 Minuten, unverbindlich
              </p>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                Termin wählen
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-8 rounded-sm shadow-sm text-center">
              <div className="text-[#25D366] mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h2 className="font-serif text-xl text-primary mb-2">WhatsApp</h2>
              <p className="text-charcoal/70 text-sm mb-6">
                Kurze Frage? Schreiben Sie direkt.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                Chat öffnen
              </a>
            </div>


          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif text-2xl text-primary mb-6 text-center">
              Oder schreiben Sie mir hier
            </h2>
<ContactForm />
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-2xl text-primary mb-4">{LOCATION}</h2>
            <p className="text-charcoal/70">
              Im Herzen des Allgäus, aber für Unternehmen im gesamten DACH-Raum tätig.
              Die meiste Zusammenarbeit funktioniert remote — bei Bedarf bin ich aber
              auch persönlich vor Ort.
            </p>
          </div>
        </div>
      </section>

      {/* No Pressure */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-charcoal/60 italic">
              Nicht jede Anfrage führt zu einer Zusammenarbeit — und das ist völlig in Ordnung.
              Wichtig ist, dass es für beide Seiten passt.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
