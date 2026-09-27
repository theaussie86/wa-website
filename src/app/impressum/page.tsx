import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { LegalPage, LegalSection, legalH3, legalLink } from "@/app/_components/legal";

export const metadata: Metadata = {
  title: `Impressum | ${SITE_NAME}`,
  description: "Impressum und rechtliche Pflichtangaben gemäß § 5 TMG für Weissteiner Automation.",
};

// Pflichtangaben als Tabelle: links der Tabellenkopf, rechts der Eintrag
const facts = [
  {
    label: "Angaben gemäß § 5 TMG",
    value: (
      <>
        <span className="font-medium text-charcoal">Christoph Weissteiner</span>
        <br />
        Waibelweg 8
        <br />
        87700 Memmingen, Deutschland
      </>
    ),
  },
  {
    label: "Telefon",
    value: (
      <a href="tel:+4917630487024" className={legalLink}>
        +49 176 30487024
      </a>
    ),
  },
  {
    label: "E-Mail",
    value: (
      <a href="mailto:christoph@weissteiner-automation.com" className={`${legalLink} break-all`}>
        christoph@weissteiner-automation.com
      </a>
    ),
  },
  {
    label: "Umsatzsteuer-ID",
    value: (
      <>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        <span className="font-medium text-charcoal tabular-nums">DE349508578</span>
      </>
    ),
  },
  {
    label: "Redaktionell verantwortlich",
    value: (
      <>
        <span className="font-medium text-charcoal">Christoph Weissteiner</span>
        <br />
        Waibelweg 8
        <br />
        87700 Memmingen, Deutschland
      </>
    ),
  },
];

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      lead="Rechtliche Angaben und Pflichtinformationen gemäß § 5 TMG."
      tab="Impressum"
    >
      <LegalSection title="Anbieter">
        <dl>
          {facts.map(({ label, value }) => (
            <div
              key={label}
              className="grid gap-1 border-t border-primary/20 py-4 sm:grid-cols-[210px_minmax(0,1fr)] sm:gap-6"
            >
              <dt className="type-label pt-1 text-[12.5px] text-charcoal/75">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </LegalSection>

      <LegalSection title="Streitschlichtung">
        <div>
          <h3 className={legalH3}>EU-Streitschlichtung</h3>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className={legalLink}>
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
        </div>
        <div>
          <h3 className={legalH3}>Verbraucherstreitbeilegung</h3>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </LegalSection>

      <LegalSection title="Rechtliche Hinweise">
        <div>
          <h3 className={legalH3}>Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
            forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </div>

        <div>
          <h3 className={legalH3}>Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
            verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Bei
            Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </div>

        <div>
          <h3 className={legalH3}>Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
