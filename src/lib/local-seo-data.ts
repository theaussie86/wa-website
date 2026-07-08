// Local SEO Landing Pages Data
// Each page has unique content to avoid thin content penalties

import { getTestimonialsById } from "@/lib/testimonials";

export const BASE_URL = "https://weissteiner-automation.com";

// Geo coordinates for Memmingen
export const MEMMINGEN_GEO = {
  latitude: 48.0073389,
  longitude: 10.1803397,
};

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
      "Wiederkehrende Abläufe automatisieren, damit dein Team Zeit gewinnt. Dein direkter Draht für Prozessautomatisierung in Memmingen und im ganzen Allgäu. In Tagen umgesetzt, nicht monatelang.",
    ogTitle: "Prozessautomatisierung im Allgäu",
    ogDescription:
      "Lokaler Experte für Automatisierung im Mittelstand. Von Memmingen aus für das gesamte Allgäu.",
  },

  hero: {
    trustBadges: ["Standort Memmingen", "In Tagen umgesetzt", "Direkter Draht"],
    h1: "Prozessautomatisierung im Allgäu",
    subheadline:
      "Als dein direkter Draht aus Memmingen automatisiere ich den Kleinkram, der dein Team täglich aufhält. Schnell umgesetzt, direkt in deiner Infrastruktur, und du bleibst Herr im eigenen Haus.",
  },

  introduction: {
    title: "Automatisierung für Allgäuer Unternehmen",
    paragraphs: [
      "Das Allgäu lebt vom Mittelstand: Handwerk in Kempten, Maschinenbau in Memmingen, Dienstleister am Bodensee. Überall dieselbe Sache, Abläufe, die täglich Zeit fressen. Rechnungen abtippen, Daten zwischen Systemen kopieren, Berichte zusammenstellen. Genau da setzt Prozessautomatisierung an.",
      "Ich bin dein Partner vor Ort und kenne den regionalen Mittelstand. Keine überdimensionierten Enterprise-Lösungen, sondern pragmatische Automatisierung, die zu deinem Betrieb passt und in Tagen läuft statt in Monaten. Mit Sitz in Memmingen bin ich schnell bei dir, wenn du mich brauchst.",
      "Der Unterschied zur Agentur: kein Wasserkopf, kein Warten auf den nächsten freien Slot. Ich richte dir die Werkzeuge so ein, dass du und dein Team selbst nachjustieren könnt. Befähigt statt abhängig.",
    ],
  },

  serviceHighlights: {
    title: "Was ich für Sie automatisiere",
    description:
      "Typische Abläufe, die Allgäuer Betriebe Zeit und Nerven kosten, und die ich schnell in den Griff bekomme.",
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
      "Lokale Prozessautomatisierung für Unternehmen im Allgäu. Rechnungsverarbeitung, CRM-Integration, Workflow-Automatisierung, direkt vor Ort in Memmingen.",
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
      "Pragmatische KI für den bayerischen Mittelstand. Ich zeig dir, wie du KI selbst nutzt: Dokumente, E-Mails, Anfragen. Ohne Hype, mit Ergebnissen.",
    ogTitle: "KI-Beratung für den bayerischen Mittelstand",
    ogDescription:
      "KI-Integration ohne Buzzwords. Praktische Lösungen für bayerische Unternehmen.",
  },

  hero: {
    trustBadges: ["Aus Bayern", "Ohne KI-Hype", "Selbst nutzbar"],
    h1: "KI-Beratung in Bayern",
    subheadline:
      "KI muss nicht kompliziert sein. Ich zeig dir, wie du KI im Alltag praktisch einsetzt und selbst bedienst, ohne Buzzwords und mit messbaren Ergebnissen.",
  },

  introduction: {
    title: "KI für den bayerischen Mittelstand: pragmatisch statt futuristisch",
    paragraphs: [
      "Bayern lebt von seinem Mittelstand. Vom Automobilzulieferer in Schwaben bis zum Maschinenbauer in Oberbayern stellt sich dieselbe Frage: Wie nutze ich KI sinnvoll, ohne mich in teuren Experimenten zu verlieren?",
      "Die Wahrheit: Was heute funktioniert, sind nicht die spektakulären Roboter aus den Medien, sondern praktische Werkzeuge, die deinem Team Arbeit abnehmen. Dokumente auslesen, E-Mails vorsortieren, Anfragen weiterleiten, Berichte zusammenfassen.",
      "Als dein KI-Berater in Bayern helfe ich dir, die richtigen Anwendungsfälle zu finden. Nicht jedes Problem braucht KI, aber wo sie passt, spart sie enorm Zeit. Ich baue keine Blackbox, sondern richte KI so ein, dass du verstehst und selbst steuerst, was passiert. Einmal befähigt, nie wieder abhängig.",
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
      "KI-Beratung und -Integration für den bayerischen Mittelstand. Dokumentenverarbeitung, Chatbots, intelligente Automatisierung, pragmatisch und ergebnisorientiert.",
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
      "Maßgeschneiderte Web- und App-Entwicklung für Deutschland, Österreich, Schweiz. Schnell umgesetzt, direkter Draht, ohne Agentur-Wasserkopf.",
    ogTitle: "Individuelle Softwareentwicklung für den DACH-Raum",
    ogDescription:
      "Fullstack-Entwicklung aus dem Allgäu für DACH. Web-Apps, APIs, Integrationen, direkt vom Entwickler.",
  },

  hero: {
    trustBadges: ["DACH-weit", "Fullstack", "Direkter Draht"],
    h1: "Individuelle Softwareentwicklung für den DACH-Raum",
    subheadline:
      "Von meinem Büro im Allgäu aus baue ich maßgeschneiderte Softwarelösungen für Betriebe in Deutschland, Österreich und der Schweiz. Remote, schnell und ohne Umweg über einen Projektmanager.",
  },

  introduction: {
    title: "Warum individuelle Software statt Standardlösung?",
    paragraphs: [
      "Der deutschsprachige Mittelstand hat besondere Anforderungen: Datenschutz nach DSGVO, Integration mit lokalen Systemen wie DATEV, branchenspezifische Abläufe, die kein Standardtool abbildet. Wenn Excel nicht mehr reicht und SaaS nicht passt, brauchst du individuelle Software.",
      "Als Fullstack-Entwickler mit Fokus auf den DACH-Raum kenne ich diese Anforderungen. Ich baue Web-Anwendungen und APIs, die sich sauber in deine bestehende Infrastruktur einfügen. Keine überdimensionierten Enterprise-Systeme, sondern schlanke, wartbare Lösungen, die genau das tun, was du brauchst, und schnell live gehen.",
      "Der Unterschied zur Agentur: Du redest direkt mit dem, der auch entwickelt. Kein Projektmanager dazwischen, keine wechselnden Entwickler, kein Warten auf den nächsten Slot. Und du bleibst Herr über deinen Code, dokumentiert und übergebbar.",
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
  return getTestimonialsById(pageData.region.testimonialIds);
}
