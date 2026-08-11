import Link from "next/link";

// Antwort auf jede URL, die keine Route matcht - vollständig serverseitig
// gerendert. Ein `notFound()` aus einem Seitenrumpf landet zwar formal auch
// hier, kommt aber in der Next-Fehlerhülle heraus und damit ohne Layout und
// ohne Body; genau deshalb pinnen die dynamischen Routen ihre Parameterliste.
// Siehe docs/adr/0002-reject-unknown-dynamic-params-at-the-router.md.
export default function NotFound() {
  return (
    <main>
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-accent mb-4">
              404
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
              Diese Seite gibt es nicht
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed mb-8">
              Der Link ist veraltet, vertippt oder der Inhalt ist umgezogen.
              Alles andere steht weiterhin bereit.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/" className="btn-primary">
                Zur Startseite
              </Link>
              <Link href="/kontakt" className="btn-secondary">
                Kontakt aufnehmen
              </Link>
            </div>

            <nav aria-label="Weiterführende Seiten">
              <h2 className="font-serif text-xl text-primary mb-4">
                Häufig gesucht
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/leistungen"
                    className="text-accent hover:text-accent-600 font-medium"
                  >
                    Leistungen
                  </Link>
                  <span className="text-charcoal/70">
                    {" "}
                    - Websites, Automatisierung und KI aus einer Hand
                  </span>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-accent hover:text-accent-600 font-medium"
                  >
                    Blog
                  </Link>
                  <span className="text-charcoal/70">
                    {" "}
                    - Artikel zu Automatisierung und KI im Mittelstand
                  </span>
                </li>
                <li>
                  <Link
                    href="/ki-check-handwerk"
                    className="text-accent hover:text-accent-600 font-medium"
                  >
                    KI-Check fürs Handwerk
                  </Link>
                  <span className="text-charcoal/70">
                    {" "}
                    - in wenigen Minuten sehen, wo KI im Betrieb trägt
                  </span>
                </li>
                <li>
                  <Link
                    href="/ueber-mich"
                    className="text-accent hover:text-accent-600 font-medium"
                  >
                    Über mich
                  </Link>
                  <span className="text-charcoal/70">
                    {" "}
                    - wer hinter Weissteiner Automation steckt
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
