import { Metadata } from "next";
import { CalendarDays, Mail, MapPin, MessageCircle } from "lucide-react";
import { SITE_NAME, CAL_LINK, WHATSAPP_LINK, CONTACT_EMAIL, LOCATION } from "@/lib/constants";
import { Button } from "@/app/_components/button";
import { PageHead } from "@/app/_components/page-head";
import { Sheet, Tab } from "@/app/_components/sheet";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: `Kontakt | ${SITE_NAME}`,
  description:
    "15 Minuten reden, per WhatsApp schreiben oder eine Nachricht schicken. Christoph Weissteiner, Memmingen im Allgäu, remote im ganzen DACH-Raum.",
};

const ways = [
  {
    icon: CalendarDays,
    title: "15 Minuten reden",
    text: "Per Video, du suchst dir den Termin aus.",
    href: CAL_LINK,
    link: "Termin aussuchen",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Für eine kurze Frage zwischendurch.",
    href: WHATSAPP_LINK,
    link: "Chat öffnen",
  },
  {
    icon: Mail,
    title: "E-Mail",
    text: "Wenn du lieber ausführlich schreibst.",
    href: `mailto:${CONTACT_EMAIL}`,
    link: CONTACT_EMAIL,
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHead
        title="Nenn mir eine Aufgabe."
        titleClassName="max-w-[11ch]"
        lead={
          <p>
            Eine, die bei dir landet, obwohl du sie längst abgegeben hattest. In 15 Minuten wissen
            wir, ob sie sich als erste eignet. Und wenn nicht, sage ich dir das.
          </p>
        }
        actions={
          <>
            <Button href={CAL_LINK} variant="light">
              15 Minuten reden
            </Button>
            <Button href={WHATSAPP_LINK} variant="text-light">
              Oder kurz per WhatsApp
            </Button>
          </>
        }
      />

      <section className="bg-pappe py-[clamp(88px,11vw,160px)]">
        <div className="mx-auto grid max-w-[1320px] items-start gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-[clamp(64px,8vw,128px)] lg:px-10">
          <div>
            <h2 className="type-display mb-[clamp(32px,4vw,48px)] text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98]">
              Drei Wege zu mir.
            </h2>
            <ul className="border-t border-primary/20">
              {ways.map(({ icon: Icon, title, text, href, link }) => (
                <li key={title} className="grid grid-cols-[28px_1fr] gap-4 border-b border-primary/20 py-6">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="mt-1 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="type-display mb-1 text-[1.5rem] leading-[1.1] text-primary">{title}</h3>
                    <p className="mb-2 text-[16.5px] leading-[1.6] text-charcoal/85">{text}</p>
                    <Button href={href} variant="text" className="break-all">
                      {link}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 flex items-start gap-4 text-[16.5px] leading-[1.6] text-charcoal/85">
              <MapPin aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              <span>
                {LOCATION}. Gearbeitet wird remote, im ganzen DACH-Raum. Im Allgäu komme ich zum
                Kennenlernen gern vorbei.
              </span>
            </p>
          </div>

          <div className="pt-8">
            <Sheet className="py-[clamp(32px,5vw,56px)] pr-[clamp(24px,5vw,56px)] pl-[clamp(48px,6vw,80px)]">
              <Tab tone="accent" side="top" className="left-[clamp(48px,6vw,80px)]">
                Nachricht
              </Tab>
              <h2 className="type-display mb-2 text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.02]">Oder schreib mir hier.</h2>
              <p className="mb-8 text-[16.5px] leading-[1.6] text-charcoal/85">
                Zwei, drei Sätze reichen. Worum geht es, und was soll danach anders sein?
              </p>
              <ContactForm />
            </Sheet>
          </div>
        </div>
      </section>
    </main>
  );
}
