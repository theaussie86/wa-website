import { SITE_NAME } from "@/lib/constants";

const BASE_URL = "https://weissteiner-automation.com";
const PAGE_URL = `${BASE_URL}/betriebs-interview`;

/**
 * Seitenspezifisches JSON-LD. Organization, LocalBusiness, WebSite und die
 * Service-Einträge kommen bereits aus `_components/json-ld.tsx` im
 * Root-Layout - hier steht nur, was diese Seite ausmacht.
 *
 * Der Lead Magnet ist ein kostenloses Werkzeug, kein Artikel: deshalb
 * `CreativeWork` mit `isAccessibleForFree` und einem Angebot zu 0 Euro statt
 * `Article`. HowTo bringt seit 2023 keine Rich Results mehr, beschreibt den
 * Ablauf aber sauber für Antwortmaschinen, die die Seite auslesen.
 */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Startseite",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Das Betriebs-Interview",
      item: PAGE_URL,
    },
  ],
};

const creativeWorkSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${PAGE_URL}#prompt`,
  name: "Das Betriebs-Interview",
  alternateName:
    "Deine KI fragt dich aus: Zehn Minuten reden, und sie kennt deinen Betrieb",
  description:
    "Ein Prompt, der KI dazu bringt, dich zu deinem Betrieb auszufragen - und aus deinen Antworten das Dokument zu schreiben, das sie ab dann kennt.",
  url: PAGE_URL,
  inLanguage: "de-DE",
  learningResourceType: "Prompt-Vorlage",
  isAccessibleForFree: true,
  audience: {
    "@type": "Audience",
    audienceType: "Inhaber kleiner und mittlerer Betriebe",
  },
  about: [
    { "@type": "Thing", name: "KI im Betrieb" },
    { "@type": "Thing", name: "ChatGPT" },
    { "@type": "Thing", name: "Claude" },
    { "@type": "Thing", name: "Prompt Engineering" },
  ],
  author: {
    "@type": "Person",
    name: "Christoph Weissteiner",
    url: `${BASE_URL}/ueber-mich`,
  },
  provider: {
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#localbusiness`,
  },
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: PAGE_URL,
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${PAGE_URL}#ablauf`,
  name: "So bringst du KI bei, wie dein Betrieb arbeitet",
  description:
    "In drei Schritten zu einem Dokument, das deinen Betrieb beschreibt - du redest, KI schreibt mit.",
  inLanguage: "de-DE",
  totalTime: "PT10M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: 0,
  },
  supply: [
    {
      "@type": "HowToSupply",
      name: "Ein Zugang zu ChatGPT oder Claude",
    },
  ],
  tool: [
    {
      "@type": "HowToTool",
      name: "Mikrofon oder Diktierfunktion",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Einfügen",
      text: "Neuen Chat in ChatGPT oder Claude aufmachen, den Block reinkopieren, abschicken.",
      url: `${PAGE_URL}#prompt-holen`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Reden",
      text: "Acht Fragen kommen einzeln. Du sprichst die Antworten ins Mikro. Halbe Sätze reichen.",
      url: `${PAGE_URL}#prompt-holen`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Ablegen",
      text: "Am Ende steht ein fertiges Dokument. Einmal ins Projekt legen, fertig.",
      url: `${PAGE_URL}#prompt-holen`,
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: `Das Betriebs-Interview - kostenloser Prompt | ${SITE_NAME}`,
  description:
    "KI liefert Mittelmaß, weil sie nichts über deinen Betrieb weiß. Dieser Prompt dreht es um: Sie fragt dich aus, acht Fragen, zehn Minuten. Du redest nur.",
  inLanguage: "de-DE",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${BASE_URL}/opengraph-image`,
  },
  mainEntity: { "@id": `${PAGE_URL}#prompt` },
  breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
};

const schemas = [
  { key: "breadcrumb", data: { ...breadcrumbSchema, "@id": `${PAGE_URL}#breadcrumb` } },
  { key: "webpage", data: webPageSchema },
  { key: "creativework", data: creativeWorkSchema },
  { key: "howto", data: howToSchema },
];

export function BetriebsInterviewJsonLd() {
  return (
    <>
      {schemas.map(({ key, data }) => (
        <script
          key={key}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
