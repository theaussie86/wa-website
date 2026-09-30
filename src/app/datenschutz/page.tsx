import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import {
  LegalPage,
  LegalSection,
  legalAside,
  legalH3,
  legalH4,
  legalLink,
} from "@/app/_components/legal";
import { ServiceList, CookieOverviewTable } from "@/app/_components/cookie-consent";

export const metadata: Metadata = {
  title: `Datenschutz | ${SITE_NAME}`,
  description: "Datenschutzerklärung von Weissteiner Automation. Informationen zur Erhebung, Verarbeitung und Nutzung personenbezogener Daten gemäß DSGVO.",
};

const register = [
  { id: "datenschutz-auf-einen-blick", title: "Datenschutz auf einen Blick" },
  { id: "hosting-und-content-delivery-networks", title: "Hosting und Content Delivery Networks (CDN)" },
  { id: "allgemeine-hinweise-und-pflichtinformationen", title: "Allgemeine Hinweise und Pflichtinformationen" },
  { id: "datenerfassung-auf-dieser-website", title: "Datenerfassung auf dieser Website" },
  { id: "soziale-medien", title: "Soziale Medien" },
  { id: "analyse-tools-und-werbung", title: "Analyse-Tools und Werbung" },
  { id: "newsletter", title: "Newsletter" },
  { id: "plugins-und-tools", title: "Plugins und Tools" },
  { id: "zahlungsanbieter", title: "Zahlungsanbieter" },
];

export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutz"
      lead="Informationen über die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten."
      tab="Datenschutz"
      register={register}
    >
      <LegalSection id="datenschutz-auf-einen-blick" title="Datenschutz auf einen Blick">
        <div className="space-y-6">
          <div>
            <h3 className={legalH3}>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten
              sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche
              Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
              Datenschutzerklärung.
            </p>
          </div>
          <div>
            <h3 className={legalH3}>Datenerfassung auf dieser Website</h3>
            <div className="space-y-4">
              <div>
                <h4 className={legalH4}>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
                  Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser
                  Datenschutzerklärung entnehmen.
                </p>
              </div>
              <div>
                <h4 className={legalH4}>Wie erfassen wir Ihre Daten?</h4>
                <p className="mb-2">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es
                  sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p>
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme
                  erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder
                  Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie
                  diese Website betreten.
                </p>
              </div>
              <div>
                <h4 className={legalH4}>Wofür nutzen wir Ihre Daten?</h4>
                <p>
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
                  gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
              </div>
              <div>
                <h4 className={legalH4}>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
                <p className="mb-2">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
                  Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die
                  Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
                  Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft
                  widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der
                  Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
                  Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
                <p>
                  Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className={legalH3}>Analyse-Tools und Tools von Drittanbietern</h3>
            <p className="mb-2">
              Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.
            </p>
            <p>
              Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.
            </p>
          </div>
        </div>
      </LegalSection>

      {/* 2. Hosting und Content Delivery Networks (CDN) */}
      <LegalSection id="hosting-und-content-delivery-networks" title="Hosting und Content Delivery Networks (CDN)">
        <div className="space-y-6">
          <div>
            <h3 className={legalH3}>Externes Hosting</h3>
            <div className="space-y-4">
              <p>
                Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website
                erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a.
                um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
                Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert
                werden, handeln.
              </p>
              <p>
                Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren
                potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer
                sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen
                professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
              <p>
                Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner
                Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten
                befolgen.
              </p>
              <div>
                <p className="font-semibold mb-1">Wir setzen folgenden Hoster ein:</p>
                <p className={legalAside}>
                  Hostinger International Ltd.<br />
                  61 Lordou Vironos Street<br />
                  6023 Larnaca<br />
                  Zypern
                </p>
              </div>
              <p>
                Die Server, auf denen diese Website betrieben wird, stehen innerhalb der
                Europäischen Union.
              </p>
              <p>
                Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit dem oben genannten Anbieter
                geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen
                Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer
                Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
              </p>
              <p>
                Die Datenschutzinformation von Hostinger findest du unter{" "}
                <a href="https://www.hostinger.com/privacy-policy" target="_blank" rel="noopener noreferrer" className={legalLink}>
                  https://www.hostinger.com/privacy-policy
                </a>.
              </p>
            </div>
          </div>
        </div>
      </LegalSection>

      {/* 3. Allgemeine Hinweise und Pflichtinformationen */}
      <LegalSection id="allgemeine-hinweise-und-pflichtinformationen" title="Allgemeine Hinweise und Pflichtinformationen">
        <div className="space-y-6">
          <div>
            <h3 className={legalH3}>Datenschutz</h3>
            <div className="space-y-4">
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
                behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <p>
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
                Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.
                Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie
                nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
              <p>
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation
                per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem
                Zugriff durch Dritte ist nicht möglich.
              </p>
            </div>
          </div>

          <div>
            <h3 className={legalH3}>Hinweis zur verantwortlichen Stelle</h3>
            <div className="space-y-2">
              <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <p className={`${legalAside} mb-2`}>
                <span className="font-medium">Christoph Weissteiner</span><br />
                Waibelweg 8<br />
                87700 Memmingen<br />
                <br />
                Telefon: +49 176 30487024<br />
                E-Mail: christoph@weissteiner-automation.com
              </p>
              <p>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
                gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen
                Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>
            </div>
          </div>

          <div>
            <h3 className={legalH3}>Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
              wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
              Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder
              eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir
              keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen
              Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall
              erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>
          </div>

          <div>
            <h3 className={legalH3}>Hinweis zur Datenweitergabe in die USA</h3>
            <p>
              Auf unserer Website sind unter anderem Tools von Unternehmen mit Sitz in den USA eingebunden.
              Wenn diese Tools aktiv sind, können Ihre personenbezogenen Daten an die US-Server der jeweiligen Unternehmen weitergegeben werden.
              Wir weisen darauf hin, dass die USA kein sicherer Drittstaat im Sinne des EU-Datenschutzrechts sind.
              US-Unternehmen sind dazu verpflichtet, personenbezogene Daten an Sicherheitsbehörden herauszugeben,
              ohne dass Sie als Betroffener hiergegen gerichtlich vorgehen könnten. Es kann daher nicht ausgeschlossen werden,
              dass US-Behörden (z.B. Geheimdienste) Ihre auf US-Servern befindlichen Daten zu
              Überwachungszwecken verarbeiten, auswerten und dauerhaft speichern. Wir haben auf diese
              Verarbeitungstätigkeiten keinen Einfluss.
            </p>
          </div>

          <div>
            <h3 className={legalH3}>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich.
              Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der
              bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>
          </div>

          <div>
            <h3 className={legalH3}>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
            <div className="space-y-4 border-l-2 border-primary pl-5 font-medium text-charcoal">
              <p>
                Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
                haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
                ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen;
                dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling.
                Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser
                Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen
                personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende
                schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und
                Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder
                Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
              </p>
              <p>
                Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben,
                so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender
                personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das
                Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Wenn Sie widersprechen,
                werden Ihre personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung
                verwendet (Widerspruch nach Art. 21 Abs. 2 DSGVO).
              </p>
            </div>
          </div>

          <div>
            <h3 className={legalH3}>Weitere Rechte</h3>
            <ul className="list-disc list-inside space-y-3 pl-2">
              <li>
                <span className="font-semibold">Beschwerderecht bei der zuständigen Aufsichtsbehörde: </span>
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                Aufsichtsbehörde zu.
              </li>
              <li>
                <span className="font-semibold">Recht auf Datenübertragbarkeit: </span>
                Sie haben das Recht, Daten, die wir automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen Format aushändigen zu lassen.
              </li>
              <li>
                <span className="font-semibold">Auskunft, Löschung und Berichtigung: </span>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten Daten, sowie ein Recht auf Berichtigung oder Löschung.
              </li>
              <li>
                <span className="font-semibold">Recht auf Einschränkung der Verarbeitung: </span>
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
              <li>
                <span className="font-semibold">Widerspruch gegen Werbe-E-Mails: </span>
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht angeforderter Werbung wird hiermit widersprochen.
              </li>
            </ul>
          </div>

          <div>
            <h3 className={legalH3}>Verschlüsselung (SSL/TLS & Zahlungsverkehr)</h3>
            <p className="mb-2">
              Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol.
            </p>
            <p>
              Auch der Zahlungsverkehr (Visa/MasterCard, Lastschriftverfahren) erfolgt ausschließlich über eine verschlüsselte SSL- bzw. TLS-Verbindung.
            </p>
          </div>
        </div>
      </LegalSection>

      {/* 4. Datenerfassung auf dieser Website */}
      <LegalSection id="datenerfassung-auf-dieser-website" title="Datenerfassung auf dieser Website">
        <div className="space-y-6">
          <div>
            <h3 className={legalH3}>Cookies</h3>
            <div className="space-y-3">
              <p>
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) gespeichert.
              </p>
              <p>
                Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur Bereitstellung bestimmter Funktionen (z.B. Warenkorb) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Sofern eine Einwilligung abgefragt wurde, erfolgt die Speicherung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.
              </p>
              <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben.
              </p>
            </div>
          </div>

          <div>
            <h3 className={legalH3}>Cookie-Übersicht</h3>
            <p className="mb-4">
              Folgende Cookies werden auf dieser Website verwendet:
            </p>
            <CookieOverviewTable />
          </div>

          <div>
            <h3 className={legalH3}>Kontaktformular & Anfragen</h3>
            <div className="space-y-3">
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben zwecks Bearbeitung der Anfrage und für Anschlussfragen gespeichert.
              </p>
              <p>
                Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten ebenfalls zum Zwecke der Bearbeitung bei uns gespeichert. 
              </p>
              <p>
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt, oder auf unserem berechtigten Interesse (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </div>
          </div>
        </div>
      </LegalSection>

      {/* 5. Soziale Medien */}
      <LegalSection id="soziale-medien" title="Soziale Medien">
        <div className="space-y-4">
          <h3 className={legalH3}>LinkedIn Plugin</h3>
          <p>
            Diese Website nutzt Funktionen des Netzwerks LinkedIn. Anbieter ist die LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place, Dublin 2, Irland.
          </p>
          <p>
            Bei jedem Abruf einer Seite dieser Website, die Funktionen von LinkedIn enthält, wird eine Verbindung zu Servern von LinkedIn aufgebaut. LinkedIn wird darüber informiert, dass Sie diese Website mit Ihrer IP-Adresse besucht haben.
          </p>
          <p>
            Die Verwendung des LinkedIn-Plugins erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO bzw. Art. 6 Abs. 1 lit. a DSGVO, sofern eine Einwilligung abgefragt wurde.
          </p>
          <p>
            Weitere Informationen finden Sie in der Datenschutzerklärung von LinkedIn unter:{" "}
            <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={legalLink}>
              https://www.linkedin.com/legal/privacy-policy
            </a>.
          </p>
        </div>
      </LegalSection>

      {/* 6. Analyse-Tools und Werbung */}
      <LegalSection id="analyse-tools-und-werbung" title="Analyse-Tools und Werbung">
        <div className="space-y-6">
          <p>
            Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden.
          </p>
          <p>
            Sie können dieser Analyse widersprechen oder sie durch die Nichtbenutzung bestimmter Tools verhindern. Über die Cookie-Einstellungen können Sie Ihre Präferenzen jederzeit anpassen.
          </p>

          <div>
            <h3 className={legalH3}>Aktive Analyse-Dienste</h3>
            <ServiceList
              category="analytics"
              emptyMessage="Derzeit sind keine Analyse-Dienste aktiv."
            />
          </div>

          <div>
            <h3 className={legalH3}>Aktive Marketing-Dienste</h3>
            <ServiceList
              category="marketing"
              emptyMessage="Derzeit sind keine Marketing-Dienste aktiv."
            />
          </div>

          <div className={legalAside}>
            <h4 className={legalH4}>Hinweis zu Google Tag Manager</h4>
            <p>
              Wir setzen den Google Tag Manager ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Google Tag Manager erfasst Ihre IP-Adresse, erstellt selbst jedoch keine Nutzerprofile und speichert keine Cookies. Er dient lediglich der Verwaltung der eingebundenen Tools. Der Einsatz erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO oder Art. 6 Abs. 1 lit. a DSGVO.
            </p>
          </div>
        </div>
      </LegalSection>

      {/* 7. Newsletter */}
      <LegalSection id="newsletter" title="Newsletter">
        <div className="space-y-4">
          <p>
            Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse.
          </p>
          <p>
            Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die jederzeit widerrufen werden kann.
          </p>
          <p>
            Ihre E-Mail-Adresse wird nach der Austragung gelöscht oder ggf. in einer Blacklist (Art. 6 Abs. 1 lit. f DSGVO) gespeichert, um künftige unerwünschte Mailings zu verhindern.
          </p>
          <h3 className={legalH3}>Warteliste Nullnummer</h3>
          <p>
            Für die Warteliste zur Nullnummer erheben wir Ihre E-Mail-Adresse, Ihren Vornamen und, wenn Sie das Feld ausfüllen, Ihre Angabe zu einer wiederkehrenden Aufgabe. Die Eintragung erfolgt per Double-Opt-in: Erst nach dem Klick in der Bestätigungsmail stehen Sie auf der Liste. Wir nutzen die Daten ausschließlich, um Sie vor dem Start einer neuen Runde persönlich anzuschreiben.
          </p>
          <p>
            Die Daten werden beim E-Mail-Dienst Brevo (Sendinblue GmbH, Köpenicker Straße 126, 10179 Berlin) gespeichert. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie jederzeit per E-Mail an uns widerrufen können. Nach dem Widerruf löschen wir Ihren Eintrag.
          </p>
        </div>
      </LegalSection>

      {/* 8. Plugins und Tools */}
      <LegalSection id="plugins-und-tools" title="Plugins und Tools">
        <div className="space-y-8">
          <div>
            <h3 className={legalH3}>YouTube mit erweitertem Datenschutz</h3>
            <p className="mb-2">Diese Website bindet Videos von YouTube ein (Google Ireland Limited). Wir nutzen YouTube im erweiterten Datenschutzmodus, sodass YouTube keine Informationen speichert, bevor Sie sich das Video ansehen.</p>
            <p>Sobald Sie ein Video starten, rufen Sie eine Verbindung zu den Servern von YouTube auf. Weitere Informationen: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className={legalLink}>https://policies.google.com/privacy?hl=de</a></p>
          </div>

          <div>
            <h3 className={legalH3}>Google Web Fonts</h3>
            <p>Zur einheitlichen Darstellung von Schriftarten nutzen wir Web Fonts von Google. Dabei muss Ihr Browser Verbindung zu den Servern von Google aufnehmen.</p>
          </div>

          <div>
            <h3 className={legalH3}>Google Maps</h3>
            <p>Wir nutzen Google Maps, wodurch ebenfalls Ihre IP-Adresse an Google in den USA übertragen werden kann.</p>
          </div>

          <div>
            <h3 className={legalH3}>Google reCAPTCHA</h3>
            <p className="mb-2">Wir nutzen Google reCAPTCHA v3 (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) auf allen Seiten mit einem Formular: Kontaktseite, Warteliste Nullnummer sowie Anmeldung zum Betriebs-Interview und zur Second-Brain-Anleitung. Mit reCAPTCHA wird überprüft, ob eine Eingabe durch einen Menschen oder durch ein automatisiertes Programm erfolgt. Hierzu analysiert reCAPTCHA das Verhalten des Websitebesuchers anhand verschiedener Merkmale.</p>
            <p className="mb-2">Die Analyse beginnt automatisch, sobald Sie eine dieser Seiten aufrufen. Dabei werden unter anderem IP-Adresse, Verweildauer, Mausbewegungen und Tastatureingaben ausgewertet und an Google übertragen, auch in die USA. reCAPTCHA speichert dafür das Cookie <code>_GRECAPTCHA</code> mit einer Laufzeit von sechs Monaten.</p>
            <p className="mb-2">Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse daran, unsere Formulare vor missbräuchlicher automatisierter Nutzung und vor Spam zu schützen. Ohne diese Prüfung wäre der Mailversand über das Kontaktformular für Bots offen.</p>
            <p>Weitere Informationen: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className={legalLink}>https://policies.google.com/privacy</a> und <a href="https://policies.google.com/terms?hl=de" target="_blank" rel="noopener noreferrer" className={legalLink}>https://policies.google.com/terms</a></p>
          </div>
        </div>
      </LegalSection>

      {/* 9. Zahlungsanbieter */}
      <LegalSection id="zahlungsanbieter" title="Zahlungsanbieter">
        <div className="space-y-6">
          <div>
            <h3 className={legalH3}>Verarbeiten von Daten (Kunden- und Vertragsdaten)</h3>
            <p>
              Wir erheben, verarbeiten und nutzen personenbezogene Daten nur, soweit sie für die Begründung, inhaltliche Ausgestaltung oder Änderung des Rechtsverhältnisses erforderlich sind (Bestandsdaten) – gem. Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </div>

          <div>
            <h3 className={legalH3}>Stripe</h3>
            <p className="mb-2">
              Wir binden Zahlungsdienste von Drittunternehmen auf unserer Website ein. Einer davon ist Stripe (Stripe Payments Europe, Ltd., Irland).
            </p>
            <p>
              Der Einsatz des Zahlungsdienstleisters erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsabwicklung). Details zur Datenübertragung und zum Datenschutz bei Stripe finden Sie hier:{" "}
              <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className={legalLink}>
                https://stripe.com/de/privacy
              </a>.
            </p>
          </div>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
