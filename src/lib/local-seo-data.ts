// Local SEO Landing Pages Data
// Each page has unique content to avoid thin content penalties

export const BASE_URL = "https://weissteiner-automation.com";

// Geo coordinates for Memmingen
export const MEMMINGEN_GEO = {
  latitude: 48.0073389,
  longitude: 10.1803397,
};

// Testimonials data (imported here for filtering)
export const testimonials = [
  {
    id: "wachmacherei",
    quote:
      "Von der Website über den Shopify-Store bis zur Anbindung an unser Warenwirtschaftssystem — alles aus einer Hand. Besonders die automatische Seminar-Buchung spart mir täglich Zeit. Und wenn mal was angepasst werden muss, ist Christoph direkt zur Stelle.",
    author: "Bernd Frieß, Inhaber",
    company: "WACHMACHEREI",
    companyUrl: "https://wachmacherei.de",
    logo: "/images/testimonials/wachmacherei.png",
    region: "allgaeu",
  },
  {
    id: "wimo",
    quote:
      "Mit den neuen Projektauswertungen sehen wir endlich, wo wir Potenzial haben. Der direkte Draht ohne Agentur-Umwege macht die Zusammenarbeit sehr effizient.",
    author: "Nicole Moraru, Geschäftsführung",
    company: "WIMO Hebetechnik",
    companyUrl: "https://wimo-ht.de",
    logo: "/images/testimonials/wimo.png",
    region: "allgaeu",
  },
  {
    id: "easylife",
    quote:
      "Die Marketing-Automatisierung hat unseren Content-Workflow komplett verändert. Was früher Stunden gedauert hat und Abstimmungsschleifen erforderte, erledigt mit dem System jetzt ein Mitarbeiter in Minuten. Und das Beste: Es wächst mit unseren Anforderungen — wir planen schon die nächsten Erweiterungen.",
    author: "Kerstin Hammerschmidt, Geschäftsführung",
    company: "easylife",
    companyUrl: "https://easylife.de",
    logo: "/images/testimonials/easylife.png",
    region: "bayern",
  },
  {
    id: "florian-heuer",
    quote:
      "Professionelle Website und eine clevere Automatisierung für unsere Dokumentenverwaltung — das spart uns täglich wertvolle Zeit bei der Kundenbetreuung.",
    author: "Florian Heuer, Geschäftsführer",
    company: "Florian Heuer Finanzberatung",
    companyUrl: "https://florian-heuer.de",
    logo: "/images/testimonials/florian-heuer.png",
    region: "dach",
  },
];

// TypeScript Interfaces
export interface LocalSeoPageData {
  slug: string;
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    trustBadges: string[];
    h1: string;
    subheadline: string;
  };
  introduction: {
    title: string;
    paragraphs: string[];
  };
  serviceHighlights: {
    title: string;
    description: string;
    features: string[];
    image: {
      src: string;
      alt: string;
    };
  };
  useCases: {
    title: string;
    items: string[];
  };
  region: {
    name: string;
    cities: string[];
    testimonialIds: string[];
  };
  schema: {
    areaServed: AreaServedType;
    serviceType: string;
    serviceName: string;
    serviceDescription: string;
  };
  relatedPages: {
    path: string;
    title: string;
    description: string;
  }[];
}

export type AreaServedType =
  | {
      "@type": "GeoCircle";
      geoMidpoint: {
        "@type": "GeoCoordinates";
        latitude: number;
        longitude: number;
      };
      geoRadius: string;
    }
  | {
      "@type": "State";
      name: string;
      containedInPlace: {
        "@type": "Country";
        name: string;
      };
    }
  | {
      "@type": "Country";
      name: string;
    }[];

// =============================================================================
// PAGE 1: Prozessautomatisierung Allgäu
// =============================================================================
export const prozessautomatisierungAllgaeu: LocalSeoPageData = {
  slug: "prozessautomatisierung-allgaeu",

  meta: {
    title: "Prozessautomatisierung im Allgäu | Weissteiner Automation",
    description:
      "Automatisieren Sie wiederkehrende Prozesse in Ihrem Unternehmen. Ihr lokaler Partner für Prozessautomatisierung in Memmingen und dem gesamten Allgäu.",
    ogTitle: "Prozessautomatisierung im Allgäu",
    ogDescription:
      "Lokaler Experte für Automatisierung im Mittelstand. Von Memmingen aus für das gesamte Allgäu.",
  },

  hero: {
    trustBadges: ["Standort Memmingen", "Vor-Ort & Remote", "Langfristige Partnerschaft"],
    h1: "Prozessautomatisierung im Allgäu",
    subheadline:
      "Als Ihr lokaler Partner aus Memmingen automatisiere ich wiederkehrende Aufgaben in Ihrem Unternehmen — damit Ihr Team Zeit für das Wesentliche hat.",
  },

  introduction: {
    title: "Automatisierung für Allgäuer Unternehmen",
    paragraphs: [
      "Das Allgäu ist geprägt von mittelständischen Unternehmen, die Qualität und Effizienz großschreiben. Ob Handwerksbetrieb in Kempten, Maschinenbauer in Memmingen oder Dienstleister am Bodensee — überall gibt es Prozesse, die täglich Zeit und Ressourcen verschlingen: Rechnungen manuell eintippen, Daten zwischen Systemen kopieren, Berichte zusammenstellen.",
      "Als Ihr Partner vor Ort verstehe ich die Besonderheiten des regionalen Mittelstands. Ich baue keine überdimensionierten Enterprise-Lösungen, sondern pragmatische Automatisierungen, die zu Ihrem Unternehmen passen. Mit Sitz in Memmingen bin ich schnell bei Ihnen — für persönliche Beratung, Workshops mit Ihrem Team oder wenn es mal hakt.",
      "Was mich von Agenturen unterscheidet: Ich verschwinde nicht nach der Implementierung. Automatisierung ist kein Einmalprojekt, sondern ein kontinuierlicher Prozess. Ihre Anforderungen ändern sich, neue Systeme kommen hinzu, Prozesse entwickeln sich weiter. Ich bleibe an Ihrer Seite und entwickle Ihre Systeme mit.",
    ],
  },

  serviceHighlights: {
    title: "Was ich für Sie automatisiere",
    description:
      "Typische Prozesse, die Allgäuer Unternehmen Zeit und Nerven kosten — und die ich für Sie in den Griff bekomme.",
    features: [
      "Rechnungsverarbeitung und Buchhaltungsvorbereitung",
      "CRM-Updates und Kundendatenmanagement",
      "Angebots- und Auftragsbestätigungserstellung",
      "Datenübertragung zwischen ERP, CRM und Webshop",
      "Automatische Berichterstellung für Geschäftsführung",
    ],
    image: {
      src: "/services/service_automation_sketch_1772400691292.png",
      alt: "Prozessautomatisierung im Allgäu - Workflow-Skizze",
    },
  },

  useCases: {
    title: "Konkrete Anwendungsfälle aus der Region",
    items: [
      "Handwerksbetrieb: Auftragsbestätigungen automatisch aus CRM generieren",
      "Maschinenbau: Produktionsdaten automatisch ins ERP übertragen",
      "Hotellerie: Buchungsbestätigungen und Follow-ups automatisieren",
      "Einzelhandel: Lagerbestände zwischen Filiale und Webshop synchronisieren",
      "Dienstleister: Projektzeiten automatisch erfassen und abrechnen",
      "Produktion: Qualitätsberichte automatisch erstellen und verteilen",
    ],
  },

  region: {
    name: "Allgäu",
    cities: ["Memmingen", "Kempten", "Kaufbeuren", "Lindau", "Sonthofen", "Bad Wörishofen"],
    testimonialIds: ["wachmacherei", "wimo"],
  },

  schema: {
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: MEMMINGEN_GEO.latitude,
        longitude: MEMMINGEN_GEO.longitude,
      },
      geoRadius: "50km",
    },
    serviceType: "Business Process Automation",
    serviceName: "Prozessautomatisierung im Allgäu",
    serviceDescription:
      "Lokale Prozessautomatisierung für Unternehmen im Allgäu. Rechnungsverarbeitung, CRM-Integration, Workflow-Automatisierung — direkt vor Ort in Memmingen.",
  },

  relatedPages: [
    {
      path: "/ki-beratung-bayern",
      title: "KI-Beratung in Bayern",
      description: "KI-Integration für den bayerischen Mittelstand",
    },
    {
      path: "/softwareentwicklung-dach",
      title: "Softwareentwicklung DACH",
      description: "Individuelle Softwarelösungen für den DACH-Raum",
    },
    {
      path: "/leistungen",
      title: "Alle Leistungen",
      description: "Übersicht aller Services",
    },
  ],
};

// =============================================================================
// PAGE 2: KI-Beratung Bayern
// =============================================================================
export const kiBeratungBayern: LocalSeoPageData = {
  slug: "ki-beratung-bayern",

  meta: {
    title: "KI-Beratung in Bayern | Weissteiner Automation",
    description:
      "Pragmatische KI-Integration für den bayerischen Mittelstand. Dokumentenverarbeitung, Chatbots und intelligente Automatisierung — ohne Hype, mit Ergebnissen.",
    ogTitle: "KI-Beratung für den bayerischen Mittelstand",
    ogDescription:
      "KI-Integration ohne Buzzwords. Praktische Lösungen für bayerische Unternehmen.",
  },

  hero: {
    trustBadges: ["Aus Bayern", "Für den Mittelstand", "Ohne KI-Hype"],
    h1: "KI-Beratung in Bayern",
    subheadline:
      "Künstliche Intelligenz muss nicht kompliziert sein. Ich zeige bayerischen Unternehmen, wie sie KI praktisch einsetzen — ohne Buzzwords und mit messbaren Ergebnissen.",
  },

  introduction: {
    title: "KI für den bayerischen Mittelstand — pragmatisch statt futuristisch",
    paragraphs: [
      "Bayern ist ein Wirtschaftsmotor mit starkem Mittelstand. Vom Automobilzulieferer in Schwaben bis zum Maschinenbauer in Oberbayern — überall stellt sich die Frage: Wie können wir KI sinnvoll nutzen, ohne uns in teuren Experimenten zu verlieren?",
      "Die Wahrheit ist: Die meisten KI-Anwendungen, die heute funktionieren, sind nicht die spektakulären Roboter aus den Medien. Es sind praktische Tools, die Ihren Mitarbeitern Arbeit abnehmen: Dokumente automatisch auslesen und kategorisieren, E-Mails vorsortieren, Kundenanfragen intelligent weiterleiten, Berichte zusammenfassen.",
      "Als Ihr KI-Berater in Bayern helfe ich Ihnen, die richtigen Anwendungsfälle zu identifizieren. Nicht jedes Problem braucht KI — aber wo sie passt, kann sie enorm Zeit sparen. Ich implementiere keine Blackbox-Lösungen, sondern integriere KI-Funktionen in Ihre bestehenden Systeme, sodass Sie verstehen und kontrollieren können, was passiert.",
    ],
  },

  serviceHighlights: {
    title: "KI-Anwendungen, die heute funktionieren",
    description:
      "Keine Science-Fiction, sondern erprobte KI-Integrationen für den Mittelstand.",
    features: [
      "Intelligente Dokumentenverarbeitung (Rechnungen, Verträge, Lieferscheine)",
      "Automatische Kategorisierung und Weiterleitung von Anfragen",
      "KI-gestützte Texterstellung und -zusammenfassung",
      "Chatbots für Kundenservice und interne Anfragen",
      "Datenanalyse und Entscheidungsunterstützung",
    ],
    image: {
      src: "/services/service_integration_sketch_1772400720958.png",
      alt: "KI-Integration für bayerische Unternehmen",
    },
  },

  useCases: {
    title: "Wie bayerische Unternehmen KI nutzen",
    items: [
      "Automobilzulieferer: Lieferscheine automatisch auslesen und verarbeiten",
      "Versicherung: Schadenmeldungen automatisch kategorisieren und priorisieren",
      "Großhandel: Kundenanfragen per KI-Chatbot vorqualifizieren",
      "Produktion: Qualitätsprotokolle automatisch zusammenfassen",
      "Steuerberater: Belege automatisch erkennen und zuordnen",
      "Immobilienverwaltung: Mieteranfragen intelligent weiterleiten",
    ],
  },

  region: {
    name: "Bayern",
    cities: ["München", "Nürnberg", "Augsburg", "Regensburg", "Ingolstadt", "Würzburg"],
    testimonialIds: ["easylife", "wachmacherei"],
  },

  schema: {
    areaServed: {
      "@type": "State",
      name: "Bayern",
      containedInPlace: {
        "@type": "Country",
        name: "Deutschland",
      },
    },
    serviceType: "AI Consulting and Integration",
    serviceName: "KI-Beratung in Bayern",
    serviceDescription:
      "KI-Beratung und -Integration für den bayerischen Mittelstand. Dokumentenverarbeitung, Chatbots, intelligente Automatisierung — pragmatisch und ergebnisorientiert.",
  },

  relatedPages: [
    {
      path: "/prozessautomatisierung-allgaeu",
      title: "Prozessautomatisierung Allgäu",
      description: "Lokale Automatisierung in der Region",
    },
    {
      path: "/softwareentwicklung-dach",
      title: "Softwareentwicklung DACH",
      description: "Individuelle Softwarelösungen",
    },
    {
      path: "/leistungen",
      title: "Alle Leistungen",
      description: "Übersicht aller Services",
    },
  ],
};

// =============================================================================
// PAGE 3: Softwareentwicklung DACH
// =============================================================================
export const softwareentwicklungDach: LocalSeoPageData = {
  slug: "softwareentwicklung-dach",

  meta: {
    title: "Individuelle Softwareentwicklung DACH | Weissteiner Automation",
    description:
      "Maßgeschneiderte Web- und App-Entwicklung für Unternehmen in Deutschland, Österreich und der Schweiz. Fullstack-Entwicklung mit langfristiger Betreuung.",
    ogTitle: "Individuelle Softwareentwicklung für den DACH-Raum",
    ogDescription:
      "Fullstack-Entwicklung aus dem Allgäu für DACH. Web-Apps, APIs, Integrationen — mit langfristiger Partnerschaft.",
  },

  hero: {
    trustBadges: ["DACH-weit", "Fullstack-Entwicklung", "Langfristige Betreuung"],
    h1: "Individuelle Softwareentwicklung für den DACH-Raum",
    subheadline:
      "Von meinem Büro im Allgäu aus entwickle ich maßgeschneiderte Softwarelösungen für Unternehmen in Deutschland, Österreich und der Schweiz — remote, effizient und mit langfristiger Perspektive.",
  },

  introduction: {
    title: "Warum individuelle Software statt Standardlösung?",
    paragraphs: [
      "Der deutschsprachige Mittelstand hat besondere Anforderungen. Datenschutz nach DSGVO, Integration mit lokalen Systemen wie DATEV, branchenspezifische Prozesse, die kein Standardtool abbildet. Wenn Excel nicht mehr reicht und SaaS-Lösungen nicht passen, brauchen Sie individuelle Software.",
      "Als Fullstack-Entwickler mit Fokus auf den DACH-Raum verstehe ich diese Anforderungen. Ich entwickle Web-Anwendungen und APIs, die sich nahtlos in Ihre bestehende Infrastruktur einfügen. Keine überdimensionierten Enterprise-Systeme, sondern schlanke, wartbare Lösungen, die genau das tun, was Sie brauchen.",
      "Der Unterschied zu einer Agentur: Ich bin Ihr direkter Ansprechpartner vom ersten Gespräch bis zur langfristigen Wartung. Kein Projektmanager dazwischen, keine wechselnden Entwickler. Sie arbeiten mit mir — und ich bleibe, um Ihre Software weiterzuentwickeln, wenn sich Ihre Anforderungen ändern.",
    ],
  },

  serviceHighlights: {
    title: "Was ich für Sie entwickle",
    description:
      "Moderne Web-Technologien für praktische Business-Anwendungen.",
    features: [
      "Interne Tools und Dashboards für Ihr Team",
      "Kundenportale und Self-Service-Anwendungen",
      "API-Entwicklung und Systemintegration",
      "Automatisierte Workflows und Prozess-Apps",
      "Mobile-optimierte Web-Anwendungen",
    ],
    image: {
      src: "/services/service_fullstack_sketch_1772400707439.png",
      alt: "Individuelle Softwareentwicklung für DACH",
    },
  },

  useCases: {
    title: "Beispiele aus dem DACH-Raum",
    items: [
      "Schweizer Händler: Kundenportal mit Bestellhistorie und Dokumenten-Download",
      "Österreichischer Produzent: Internes QM-Tool mit Prüfprotokollen",
      "Deutsches KMU: Mitarbeiter-Dashboard mit Urlaubsplanung und Zeiterfassung",
      "Steuerberater: Mandantenportal für Dokumentenaustausch",
      "E-Commerce: Schnittstelle zwischen Webshop und Warenwirtschaft",
      "Dienstleister: Projekt-Tracking-Tool mit Kundenzugang",
    ],
  },

  region: {
    name: "DACH",
    cities: ["Zürich", "Wien", "München", "Frankfurt", "Berlin", "Hamburg"],
    testimonialIds: ["florian-heuer", "easylife", "wimo"],
  },

  schema: {
    areaServed: [
      { "@type": "Country", name: "Deutschland" },
      { "@type": "Country", name: "Österreich" },
      { "@type": "Country", name: "Schweiz" },
    ],
    serviceType: "Custom Software Development",
    serviceName: "Individuelle Softwareentwicklung DACH",
    serviceDescription:
      "Maßgeschneiderte Web- und App-Entwicklung für den DACH-Raum. Fullstack-Entwicklung, API-Integration und langfristige Betreuung für mittelständische Unternehmen.",
  },

  relatedPages: [
    {
      path: "/prozessautomatisierung-allgaeu",
      title: "Prozessautomatisierung Allgäu",
      description: "Lokale Automatisierung in der Region",
    },
    {
      path: "/ki-beratung-bayern",
      title: "KI-Beratung Bayern",
      description: "KI-Integration für den Mittelstand",
    },
    {
      path: "/leistungen",
      title: "Alle Leistungen",
      description: "Übersicht aller Services",
    },
  ],
};

// Export all pages as array for easy iteration
export const localSeoPages: LocalSeoPageData[] = [
  prozessautomatisierungAllgaeu,
  kiBeratungBayern,
  softwareentwicklungDach,
];

// Helper function to get testimonials for a page
export function getTestimonialsForPage(pageData: LocalSeoPageData) {
  return testimonials.filter((t) => pageData.region.testimonialIds.includes(t.id));
}
