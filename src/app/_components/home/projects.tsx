import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Sheet, Tab } from "@/app/_components/sheet";

// Vier echte Projekte, mit Namen freigegeben (Entscheidung 19.11.2026 im Vault).
// Erzählt aus Sicht der Menschen, die damit arbeiten, nicht als Werkschau.
// Keine vier gleichen Icon-Karten: CaDo liegt groß vorne, weil es auf den
// Partner-Weg zeigt, die anderen drei liegen versetzt darunter.

type Project = {
  name: string;
  register: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  href?: string;
  note?: string;
};

const featured: Project = {
  name: "CaDo",
  register: "CRM",
  title: "Für Vertriebspartner von Reico",
  text: "Reico verkauft Tierfutter im Direktvertrieb. Die Vertriebspartner wissen, was sie tun sollen. Es bei vielen Kunden durchzuhalten, wer wann dran ist und wessen Futter zur Neige geht, ging bisher nur mit eigenen Listen und viel Gedächtnis. CaDo bildet ihren Arbeitstag ab: Kunden, Tiere, Bestellungen und Nachfass an einem Ort.",
  image: "/images/projekte/cado.webp",
  imageAlt: "Startseite von CaDo, der Kundenverwaltung für Reico-Berater",
  href: "https://cadomanager.de",
  note: "Gebaut für zwei Berater, gedacht fürs ganze Beraternetz im Abo. So sieht das Partner-Modell aus.",
};

const others: Project[] = [
  {
    name: "Hahna Brothers",
    register: "Mitglieder-App",
    title: "Für eine Bruderschaft",
    text: "Rund 20 Mitglieder und eine Bestellrunde für die Brotherhood-Kleidung, die vorher über zehn Excel-Listen lief. Jetzt bestellt jeder selbst. Termine, Archiv und Protokolle liegen an derselben Stelle.",
    image: "/images/projekte/hahna-brothers.webp",
    imageAlt: "Startseite der Mitglieder-App Hahna Brothers",
    href: "https://hahnabrothers.de",
  },
  {
    name: "Pinfinity",
    register: "Verwaltung",
    title: "Für Bloggerinnen mit Affiliate-Seiten",
    text: "Recherche, Artikel, SEO-Metadaten, Pins, Affiliate-Links. Vorher verteilt auf WordPress, Pinterest und eigene Listen. Pinfinity organisiert diese Arbeit an einem Platz, KI arbeitet über eine Schnittstelle direkt mit den Daten. Entstanden für meine Frau Petra.",
    image: "/images/projekte/pinfinity.webp",
    imageAlt: "Startseite von Pinfinity, der Pinterest-Verwaltung",
    href: "https://pinfinity.onlineheldinnen.de",
  },
  {
    name: "Förderverein SV Amendingen",
    register: "Website + Verwaltung",
    title: "Für einen ehrenamtlichen Vorstand",
    text: "Ehrenamt hat wenig Zeit, also bleibt Papierkram liegen. Heute kommt der Mitgliedsantrag samt SEPA-Mandat online rein. Was offen ist, sieht der Vorstand sofort, Spendenbelege sind in wenigen Klicks ausgestellt.",
    image: "/images/projekte/foerderverein.webp",
    imageAlt: "Startseite der Website des Fördervereins SV Amendingen",
    href: "https://foerderverein-sv-amendingen.de",
  },
];

function Screen({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] border border-charcoal/10 bg-pappe">
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
    </div>
  );
}

function ProjectLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
    >
      {href.replace("https://", "")}
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      <span className="sr-only">(öffnet {name} in neuem Tab)</span>
    </a>
  );
}

export function Projects() {
  return (
    <section id="projekte" className="scroll-mt-20 bg-pappe pt-[clamp(72px,9vw,128px)] pb-[clamp(104px,12vw,176px)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-[clamp(48px,6vw,88px)] max-w-[40rem]">
          <h2 className="type-display mb-6 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
            Erst ihr Alltag, dann der Code.
          </h2>
          <p className="text-[18px] leading-[1.7] text-charcoal/85">
            Vier Gruppen von Menschen, jede mit Arbeit, die sich zäh angefühlt hat. Gebaut wurde
            erst, als klar war, wie sie ihren Tag wirklich verbringen.
          </p>
        </div>

        {/* CaDo, groß vorne */}
        <article className="relative mb-[clamp(64px,8vw,112px)] pt-8 lg:mr-10">
          <Sheet className="grid gap-10 py-[clamp(28px,4vw,48px)] pr-[clamp(20px,4vw,48px)] pl-[clamp(40px,5vw,64px)] lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <Tab side="top" tone="accent" className="left-[clamp(40px,5vw,64px)]">
              {featured.register}
            </Tab>
            <Screen src={featured.image} alt={featured.imageAlt} sizes="(min-width: 1024px) 680px, 90vw" />
            <div>
              <p className="type-label mb-3 text-[12.5px] text-charcoal/70">{featured.name}</p>
              <h3 className="type-display mb-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] text-primary">
                {featured.title}
              </h3>
              <p className="mb-6 text-[17px] leading-[1.65] text-charcoal/85">{featured.text}</p>
              {featured.note && (
                <p className="mb-6 -rotate-1 rounded-[2px] bg-accent-100 px-4 py-3 text-[15px] leading-snug font-medium text-ink shadow-[0_14px_28px_-18px_rgba(0,23,46,0.5)]">
                  {featured.note}
                </p>
              )}
              {featured.href && <ProjectLink href={featured.href} name={featured.name} />}
            </div>
          </Sheet>
        </article>

        {/* Die anderen drei, versetzt */}
        <div className="grid gap-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {others.map((project, i) => (
            <article key={project.name} className={`pt-8 ${i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}`}>
              <Sheet className="py-7 pr-6 pl-11">
                <Tab side="top" className="right-6">
                  {project.register}
                </Tab>
                <Screen src={project.image} alt={project.imageAlt} sizes="(min-width: 768px) 380px, 90vw" />
              </Sheet>
              <p className="type-label mt-8 mb-2 text-[12.5px] text-charcoal/70">{project.name}</p>
              <h3 className="type-display mb-3 text-[clamp(1.5rem,2.2vw,1.9rem)] leading-[1.05]">{project.title}</h3>
              <p className="mb-5 max-w-[26rem] text-[17px] leading-[1.65] text-charcoal/85">{project.text}</p>
              {project.href && <ProjectLink href={project.href} name={project.name} />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
