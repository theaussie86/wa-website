import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { 
  Building2, 
  PhoneCall, 
  ReceiptText, 
  UserCircle, 
  Scale, 
  ShieldAlert
} from "lucide-react";

export const metadata: Metadata = {
  title: `Impressum | ${SITE_NAME}`,
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-warm-white py-16 md:py-24">
      <div className="container mx-auto px-5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">Impressum</h1>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Rechtliche Angaben und Pflichtinformationen gemäß § 5 TMG.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Kontakt & Adresse */}
            <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 p-8 rounded-xl transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl text-primary m-0">Angaben gemäß § 5 TMG</h2>
              </div>
              <div className="text-charcoal/80 space-y-1">
                <p className="font-medium text-charcoal">Christoph Weissteiner</p>
                <p>Waibelweg 8</p>
                <p>87700 Memmingen, Deutschland</p>
              </div>
            </div>

            {/* Kontakt */}
            <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 p-8 rounded-xl transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl text-primary m-0">Kontakt</h2>
              </div>
              <div className="text-charcoal/80 space-y-3">
                <p className="flex items-center gap-3">
                  <span className="font-medium text-charcoal w-20">Telefon:</span>
                  <a href="tel:+4917630487024" className="hover:text-accent transition-colors duration-200">+49 176 30487024</a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-medium text-charcoal w-20">E-Mail:</span>
                  <a href="mailto:christoph.weissteiner@gmail.com" className="hover:text-accent transition-colors duration-200 break-all">christoph.weissteiner@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Umsatzsteuer */}
            <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 p-8 rounded-xl transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <ReceiptText className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl text-primary m-0">Umsatzsteuer-ID</h2>
              </div>
              <div className="text-charcoal/80">
                <p className="mb-2">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                <p className="font-medium text-charcoal font-mono bg-gray-50 p-3 rounded-md inline-block">DE349508578</p>
              </div>
            </div>

            {/* Redaktion */}
            <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 p-8 rounded-xl transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <UserCircle className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl text-primary m-0">Redaktionell verantwortlich</h2>
              </div>
              <div className="text-charcoal/80 space-y-1">
                <p className="font-medium text-charcoal">Christoph Weissteiner</p>
                <p>Waibelweg 8</p>
                <p>87700 Memmingen, Deutschland</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Streitschlichtung */}
            <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 p-8 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl text-primary m-0">Streitschlichtung</h2>
              </div>
              <div className="space-y-6 text-charcoal/80 leading-relaxed">
                <div>
                  <h3 className="font-sans font-semibold text-charcoal text-lg mb-2">EU-Streitschlichtung</h3>
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                    <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent font-medium transition-colors duration-200 break-all">
                      https://ec.europa.eu/consumers/odr
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-charcoal text-lg mb-2">Verbraucherstreitbeilegung</h3>
                  <p>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>
              </div>
            </div>

            {/* Haftung & Urheberrecht */}
            <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 p-8 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl text-primary m-0">Rechtliche Hinweise</h2>
              </div>
              <div className="space-y-8 text-charcoal/80 leading-relaxed">
                <div>
                  <h3 className="font-sans font-semibold text-charcoal text-lg mb-2">Haftung für Inhalte</h3>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                    verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                    forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-charcoal text-lg mb-2">Haftung für Links</h3>
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                    Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                    verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
                    verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Bei
                    Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-charcoal text-lg mb-2">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                    Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                    Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                    Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
