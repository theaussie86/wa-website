import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/app/_components/animations";
import { Button } from "@/app/_components/button";

export function ServicesPreview() {
  return (
    <section className="bg-white py-[clamp(64px,9vw,108px)]">
      <div className="mx-auto max-w-[1180px] px-6">
        <FadeIn className="mb-[52px] max-w-[640px]">
          <p className="mb-4 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-accent-600">
            Leistungen
          </p>
          <h2 className="mb-4 text-balance font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.12] tracking-normal text-primary">
            Was ich für Sie tue
          </h2>
          <p className="font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
            Technologie, die arbeitet. Menschen, die gestalten.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[7fr_5fr] md:grid-rows-[auto_auto]">
          {/* Featured: Prozessautomatisierung */}
          <Link
            href="/leistungen"
            className="group flex flex-col overflow-hidden rounded-xs border border-primary/15 bg-white transition-[border-color,transform] duration-300 ease-out hover:-translate-y-[3px] hover:border-accent md:row-span-2"
          >
            <span className="relative block aspect-[16/10] overflow-hidden">
              <Image
                src="/services/service-automation.webp"
                alt="Arbeitsplatz mit automatisiertem Prozess-Dashboard"
                fill
                sizes="(min-width: 1180px) 688px, (min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </span>
            <span className="flex flex-1 flex-col gap-3 px-8 pt-8 pb-9">
              <span className="font-serif text-[clamp(1.5rem,2vw,1.9rem)] text-primary">
                Prozessautomatisierung
              </span>
              <span className="max-w-[520px] font-sans text-[16.5px] leading-[1.7] text-charcoal/80">
                Rechnungsverarbeitung, CRM-Updates, Datenübertragungen - automatisiert und fehlerfrei.
              </span>
              <span className="mt-auto font-sans text-[15px] font-bold text-accent-600">
                Mehr erfahren →
              </span>
            </span>
          </Link>

          {/* Web- & App-Entwicklung */}
          <Link
            href="/leistungen"
            className="group flex flex-col overflow-hidden rounded-xs border border-primary/15 bg-white transition-[border-color,transform] duration-300 ease-out hover:-translate-y-[3px] hover:border-accent"
          >
            <span className="relative block aspect-[21/8] overflow-hidden">
              <Image
                src="/services/service-fullstack.webp"
                alt="Entwicklung einer Web-Anwendung"
                fill
                sizes="(min-width: 1180px) 490px, (min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col gap-2 px-7 pt-6 pb-7">
              <span className="font-serif text-[1.35rem] text-primary">Web- &amp; App-Entwicklung</span>
              <span className="font-sans text-[15.5px] leading-[1.65] text-charcoal/80">
                Gestaltung und Umsetzung maßgeschneiderter Software-Lösungen für Ihr Unternehmen.
              </span>
            </span>
          </Link>

          {/* Systemintegration & KI */}
          <Link
            href="/leistungen"
            className="group flex flex-col overflow-hidden rounded-xs border border-primary/15 bg-white transition-[border-color,transform] duration-300 ease-out hover:-translate-y-[3px] hover:border-accent"
          >
            <span className="relative block aspect-[21/8] overflow-hidden">
              <Image
                src="/services/service-integration.webp"
                alt="Vernetzte Systeme und KI-Integration"
                fill
                sizes="(min-width: 1180px) 490px, (min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col gap-2 px-7 pt-6 pb-7">
              <span className="font-serif text-[1.35rem] text-primary">Systemintegration &amp; KI</span>
              <span className="font-sans text-[15.5px] leading-[1.65] text-charcoal/80">
                Intelligente Verknüpfung bestehender Systeme mit moderner KI.
              </span>
            </span>
          </Link>
        </div>

        <FadeIn delay={0.1} className="mt-11">
          <Button href="/leistungen" variant="outline" className="text-base">
            Alle Leistungen ansehen
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
