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
    title: "Prozessautomatisierung im Allgäu für kleine Betriebe | Weissteiner Automation",
    description:
      "Wenn dieselben Daten in drei Programmen stehen und keiner mehr weiß, wo was liegt. Abläufe zwischen Programmen verbinden oder eine eigene Anwendung bauen, aus Memmingen für das Allgäu.",
    ogTitle: "Prozessautomatisierung im Allgäu",
    ogDescription:
      "Abläufe zwischen Programmen verbinden, damit die Arbeit nicht mehr liegen bleibt. Aus Memmingen für kleine Betriebe im Allgäu.",
  },

  hero: {
    trustBadges: ["Aus Memmingen", "Direkt vom Entwickler", "Klein anfangen"],
    h1: "Prozessautomatisierung im Allgäu",
    subheadline:
      "Für Arbeit, die liegen bleibt, weil sie zwischen Programmen hängt. Ich verbinde, was getrennt ist, und baue eine eigene Anwendung, wo Verbinden nicht mehr reicht.",
  },

  introduction: {
    title: "Wenn die Arbeit zwischen den Programmen hängen bleibt",
    paragraphs: [
      "Die meisten kleinen Betriebe haben nicht zu wenig Programme, sondern zu viele, die nichts voneinander wissen. Also trägt jemand die Daten von Hand von einem ins andere. Das schafft keinen Wert, kostet aber jeden Tag Aufmerksamkeit, und was Aufmerksamkeit kostet, wird gern verschoben.",
      "Oft reicht es, zwei Programme miteinander reden zu lassen. Manchmal ist der Ablauf aber so eigen, dass jede Verbindung nur ein weiterer Umweg wäre. Dann baue ich eine Anwendung, die nach deinem Ablauf funktioniert, und hole die Arbeit an einen Platz.",
      "Ich sitze in Memmingen und arbeite mit Betrieben im ganzen Allgäu. Du redest direkt mit dem, der baut. Was für deinen Betrieb entsteht, läuft auf deiner Infrastruktur und gehört dir.",
    ],
  },

  serviceHighlights: {
    title: "Was ich verbinde und baue",
    description:
      "Erst verstehen, wie bei dir gearbeitet wird. Dann das kleinste Stück bauen, das spürbar entlastet.",
    features: [
      "Daten einmal erfassen statt in mehreren Programmen pflegen",
      "Verbindungen zwischen Shop, Warenwirtschaft, Buchhaltung und CRM",
      "Auswertungen, die sich selbst zusammenstellen",
      "Eigene Anwendungen, wo Standardprogramme nicht mehr passen",
      "Schnittstellen, über die KI später mit deinen Daten arbeiten kann",
    ],
    image: {
      src: "/services/service_automation_sketch_1772400691292.png",
      alt: "Skizze eines Ablaufs zwischen mehreren Programmen",
    },
  },

  useCases: {
    title: "Typische Knoten, die sich lösen lassen",
    items: [
      "Bestellungen aus dem Shop landen von selbst in der Warenwirtschaft",
      "Anfragen aus Formular, E-Mail und Telefon sammeln sich an einer Stelle",
      "Ein Mitgliedsantrag mit SEPA-Mandat kommt digital an, statt auf Papier",
      "Die Monatsauswertung steht bereit, ohne dass jemand Listen zusammenkopiert",
      "Ein Vertriebspartner sieht morgens, welcher Kunde heute dran ist",
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
      "Abläufe zwischen Programmen verbinden und eigene Anwendungen bauen, für kleine Betriebe im Allgäu. Aus Memmingen, direkt vom Entwickler.",
  },

  relatedPages: [
    {
      path: "/softwareentwicklung-dach",
      title: "Software nach Maß",
      description: "Eigene Anwendungen für kleine Betriebe",
    },
    {
      path: "/ki-beratung-bayern",
      title: "KI-Beratung in Bayern",
      description: "KI, die mit deinen Daten arbeitet",
    },
    {
      path: "/leistungen",
      title: "Alle Leistungen",
      description: "Was ich baue und wie",
    },
  ],
};

// =============================================================================
// PAGE 2: KI-Beratung Bayern
// =============================================================================
export const kiBeratungBayern: LocalSeoPageData = {
  slug: "ki-beratung-bayern",

  meta: {
    title: "KI-Beratung in Bayern für kleine Betriebe | Weissteiner Automation",
    description:
      "KI hilft erst, wenn sie an deine Daten kommt. Ich ordne die Grundlage, baue die Schnittstelle und zeige dir, wie du KI selbst nutzt. Aus Memmingen für Betriebe in Bayern.",
    ogTitle: "KI-Beratung in Bayern",
    ogDescription:
      "Erst die Daten an einen Ort, dann kann KI mitarbeiten. Für kleine Betriebe in Bayern.",
  },

  hero: {
    trustBadges: ["Aus Memmingen", "Erst die Grundlage", "Selbst nutzbar"],
    h1: "KI-Beratung in Bayern",
    subheadline:
      "KI kann viel, aber sie weiß nichts über deinen Betrieb, solange deine Daten über fünf Programme verstreut sind. Ich sorge dafür, dass sie an einem Ort liegen, und zeige dir, wie du KI damit selbst arbeiten lässt.",
  },

  introduction: {
    title: "Warum KI bei vielen nicht über das Ausprobieren hinauskommt",
    paragraphs: [
      "Viele haben KI schon ausprobiert. Die Antworten klingen gut, passen aber nicht zum eigenen Betrieb, weil die KI deine Kunden, Preise und Abläufe nicht kennt. Also kopiert man Informationen hin und her, und nach ein paar Wochen bleibt es liegen.",
      "Das Problem ist selten die KI, sondern die Grundlage. Wenn deine Daten an einem Ort liegen und es eine saubere Schnittstelle gibt, kann KI dort direkt mitarbeiten: Anfragen vorsortieren, Entwürfe schreiben, nachsehen, was offen ist.",
      "Ich fange deshalb bei dieser Grundlage an, nicht beim Werkzeug. Danach richte ich dir einen KI-Arbeitsplatz ein, den du selbst bedienst. Du sollst mich nicht brauchen, um zu arbeiten, sondern anrufen, wenn du weiterdenkst.",
    ],
  },

  serviceHighlights: {
    title: "Wobei ich dich unterstütze",
    description:
      "Kein Chatbot von der Stange, sondern KI, die mit dem arbeitet, was in deinem Betrieb schon da ist.",
    features: [
      "Herausfinden, wo KI bei dir wirklich Arbeit abnimmt und wo nicht",
      "Deine Daten an einen Ort bringen, damit KI sie lesen kann",
      "Schnittstellen bauen, über die KI direkt mit deiner Software arbeitet",
      "Einen KI-Arbeitsplatz einrichten, den du selbst bedienst",
      "Dir zeigen, wie du ihn weiter ausbaust",
    ],
    image: {
      src: "/services/service_integration_sketch_1772400720958.png",
      alt: "Skizze von KI, die über eine Schnittstelle auf Betriebsdaten zugreift",
    },
  },

  useCases: {
    title: "Was KI mit der richtigen Grundlage übernehmen kann",
    items: [
      "Eingehende Anfragen lesen, einordnen und eine Antwort vorbereiten",
      "Nachsehen, welche Kunden schon länger nichts bestellt haben",
      "Aus Notizen und Daten einen Bericht oder ein Angebot entwerfen",
      "Dokumente auslesen und die Werte an die richtige Stelle schreiben",
      "Fragen zu deinem Betrieb beantworten, ohne dass du Listen durchsuchst",
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
      "KI-Beratung für kleine Betriebe in Bayern. Daten an einen Ort bringen, Schnittstellen für KI bauen und einen KI-Arbeitsplatz einrichten, den der Betrieb selbst bedient.",
  },

  relatedPages: [
    {
      path: "/ki-arbeitsplatz",
      title: "KI-Arbeitsplatz",
      description: "Die Ausbaustufe, wenn die Daten an einem Ort liegen",
    },
    {
      path: "/softwareentwicklung-dach",
      title: "Software nach Maß",
      description: "Eigene Anwendungen für kleine Betriebe",
    },
    {
      path: "/prozessautomatisierung-allgaeu",
      title: "Prozessautomatisierung Allgäu",
      description: "Abläufe zwischen Programmen verbinden",
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
      description: "Abläufe zwischen Programmen verbinden",
    },
    {
      path: "/ki-beratung-bayern",
      title: "KI-Beratung Bayern",
      description: "KI, die mit deinen Daten arbeitet",
    },
    {
      path: "/leistungen",
      title: "Alle Leistungen",
      description: "Was ich baue und wie",
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
