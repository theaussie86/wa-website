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
    testimonialIds: ["wachmacherei"],
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
    title: "Software nach Maß für kleine Betriebe im DACH-Raum | Weissteiner Automation",
    description:
      "Web-Apps für Arbeit, die sich heute über zu viele Programme verteilt. Gebaut nach eurem Ablauf, mit Schnittstelle für KI. Remote für Deutschland, Österreich und die Schweiz.",
    ogTitle: "Software nach Maß für kleine Betriebe im DACH-Raum",
    ogDescription:
      "Eigene Anwendungen statt Umwege um Standardprogramme. Direkt vom Entwickler, remote im DACH-Raum.",
  },

  hero: {
    trustBadges: ["Remote im DACH-Raum", "Direkt vom Entwickler", "Mit Schnittstelle für KI"],
    h1: "Software nach Maß für kleine Betriebe im DACH-Raum",
    subheadline:
      "Für Arbeit, die sich zäh anfühlt, weil sie über Programme, Listen und Nachrichten verteilt ist. Eine Anwendung, die nach eurem Ablauf gebaut ist, holt sie an einen Platz.",
  },

  introduction: {
    title: "Warum eigene Software statt Standardprogramm?",
    paragraphs: [
      "Standardprogramme sind für den Prozess gebaut, nicht für den Menschen, der jeden Tag damit arbeitet. Also baut sich jeder seine Umwege: eine Liste hier, eine Notiz da. Zusammen machen sie aus einer klaren Aufgabe eine, die man vor sich herschiebt.",
      "Eigene Software war für kleine Betriebe lange zu teuer. Das hat sich geändert, auch weil KI beim Code mitschreibt. Ich fange klein an, mit einem Stück, das ihr wirklich benutzt, und baue nach und nach aus.",
      "Du redest direkt mit dem, der entwickelt. Was für deinen Betrieb gebaut wird, gehört dir, dokumentiert und übergebbar. Gearbeitet wird remote, in Deutschland, Österreich und der Schweiz.",
    ],
  },

  serviceHighlights: {
    title: "Was ich baue",
    description: "Web-Anwendungen für die Arbeit, die heute zwischen Programmen hängt.",
    features: [
      "Interne Werkzeuge für deinen Ablauf",
      "Mitglieder- und Kundenbereiche mit eigenem Login",
      "Abo-Lösungen mit Partnern für eine ganze Gruppe",
      "Schnittstellen, über die KI direkt mit deinen Daten arbeitet",
      "Anbindungen an die Programme, die du schon nutzt",
    ],
    image: {
      src: "/services/service_fullstack_sketch_1772400707439.png",
      alt: "Skizze einer Web-Anwendung",
    },
  },

  useCases: {
    title: "Wo der Knoten schon gelöst ist",
    items: [
      "CaDo: der Arbeitstag von Reico-Vertriebspartnern, mit Kunden, Tieren, Bestellungen und Nachfass an einem Ort",
      "Hahna Brothers: Bestellrunde, Termine und Archiv für eine Bruderschaft statt zehn Excel-Listen",
      "Pinfinity: Recherche, Pins und Metadaten für Blogs mit Affiliate-Seiten an einem Platz",
      "Förderverein SV Amendingen: Mitgliedsantrag mit SEPA-Mandat und Spendenbelege ohne Papier",
    ],
  },

  region: {
    name: "DACH",
    cities: ["Zürich", "Wien", "München", "Frankfurt", "Berlin", "Hamburg"],
    testimonialIds: [],
  },

  schema: {
    areaServed: [
      { "@type": "Country", name: "Deutschland" },
      { "@type": "Country", name: "Österreich" },
      { "@type": "Country", name: "Schweiz" },
    ],
    serviceType: "Custom Software Development",
    serviceName: "Software nach Maß für kleine Betriebe im DACH-Raum",
    serviceDescription:
      "Web-Anwendungen nach dem Ablauf kleiner Betriebe, mit Schnittstelle für KI. Remote für Deutschland, Österreich und die Schweiz.",
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
