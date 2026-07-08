export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  company: string;
  companyUrl: string;
  logo: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "wachmacherei",
    quote:
      "Von der Website über den Shopify-Store bis zur Anbindung an unser Warenwirtschaftssystem - alles aus einer Hand. Besonders die automatische Seminar-Buchung spart mir täglich Zeit. Und wenn mal was angepasst werden muss, ist Christoph direkt zur Stelle.",
    author: "Bernd Frieß, Inhaber",
    company: "WACHMACHEREI",
    companyUrl: "https://wachmacherei.de",
    logo: "/images/testimonials/wachmacherei.png",
  },
  {
    id: "wimo",
    quote:
      "Mit den neuen Projektauswertungen sehen wir endlich, wo wir Potenzial haben. Der direkte Draht ohne Agentur-Umwege macht die Zusammenarbeit sehr effizient.",
    author: "Nicole Moraru, Geschäftsführung",
    company: "WIMO Hebetechnik",
    companyUrl: "https://wimo-ht.de",
    logo: "/images/testimonials/wimo.png",
  },
  {
    id: "easylife",
    quote:
      "Die Marketing-Automatisierung hat unseren Content-Workflow komplett verändert. Was früher Stunden gedauert hat und Abstimmungsschleifen erforderte, erledigt mit dem System jetzt ein Mitarbeiter in Minuten. Und das Beste: Es wächst mit unseren Anforderungen - wir planen schon die nächsten Erweiterungen.",
    author: "Kerstin Hammerschmidt, Geschäftsführung",
    company: "easylife",
    companyUrl: "https://easylife.de",
    logo: "/images/testimonials/easylife.png",
  },
  {
    id: "florian-heuer",
    quote:
      "Professionelle Website und eine clevere Automatisierung für unsere Dokumentenverwaltung - das spart uns täglich wertvolle Zeit bei der Kundenbetreuung.",
    author: "Florian Heuer, Geschäftsführer",
    company: "Florian Heuer Finanzberatung",
    companyUrl: "https://florian-heuer.de",
    logo: "/images/testimonials/florian-heuer.png",
  },
];

export function getAllTestimonials(): Testimonial[] {
  return TESTIMONIALS;
}

export function getTestimonialsById(ids: string[]): Testimonial[] {
  return ids
    .map((id) => TESTIMONIALS.find((t) => t.id === id))
    .filter((t): t is Testimonial => t !== undefined);
}
