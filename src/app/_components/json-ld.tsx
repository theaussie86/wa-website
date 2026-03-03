import {
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  LOCATION,
} from "@/lib/constants";

const BASE_URL = "https://weissteiner-automation.com";

interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  telephone: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  sameAs: string[];
}

interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "ProfessionalService";
  "@id": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  telephone: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    postalCode: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  areaServed: {
    "@type": "GeoCircle";
    geoMidpoint: {
      "@type": "GeoCoordinates";
      latitude: number;
      longitude: number;
    };
    geoRadius: string;
  };
  priceRange: string;
  sameAs?: string[];
  openingHoursSpecification?: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
}

interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
  };
}

const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/logo-icon.svg`,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Memmingen",
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  sameAs: [],
};

const localBusinessSchema: LocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#localbusiness`,
  name: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/logo-icon.svg`,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Waibelweg 8",
    postalCode: "87700",
    addressLocality: "Memmingen",
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.0073389,
    longitude: 10.1803397,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 48.0073389,
      longitude: 10.1803397,
    },
    geoRadius: "500km",
  },
  priceRange: "$$",
  sameAs: [
    "https://maps.app.goo.gl/ueq2kkd8dE6L6WeE9",
    "https://www.linkedin.com/in/christoph-weissteiner/",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

const webSiteSchema: WebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "de-DE",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
  },
};

interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  "@id": string;
  name: string;
  description: string;
  provider: {
    "@type": "ProfessionalService";
    "@id": string;
  };
  areaServed: {
    "@type": "Country";
    name: string;
  }[];
  serviceType: string;
}

const servicesSchemas: ServiceSchema[] = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/leistungen#prozessautomatisierung`,
    name: "Prozessautomatisierung",
    description:
      "Wiederkehrende Aufgaben automatisieren: Rechnungsverarbeitung, CRM-Updates, E-Mail-Marketing, Datenübertragung und Berichterstellung für den Mittelstand.",
    provider: {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#localbusiness`,
    },
    areaServed: [
      { "@type": "Country", name: "Deutschland" },
      { "@type": "Country", name: "Österreich" },
      { "@type": "Country", name: "Schweiz" },
    ],
    serviceType: "Business Process Automation",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/leistungen#webentwicklung`,
    name: "Individuelle Web- & App-Entwicklung",
    description:
      "Maßgeschneiderte Softwarelösungen: Skalierbare Fullstack-Anwendungen, moderne UI/UX, Mobile- & Web-Apps, sichere Datenbankarchitekturen und API-Anbindungen.",
    provider: {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#localbusiness`,
    },
    areaServed: [
      { "@type": "Country", name: "Deutschland" },
      { "@type": "Country", name: "Österreich" },
      { "@type": "Country", name: "Schweiz" },
    ],
    serviceType: "Custom Software Development",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/leistungen#ki-integration`,
    name: "Systemintegration & KI-Anbindung",
    description:
      "Intelligente Verknüpfung bestehender Systeme mit KI: Dokumentenverarbeitung, automatisierte Kategorisierung, Chatbots und API-Integrationen.",
    provider: {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#localbusiness`,
    },
    areaServed: [
      { "@type": "Country", name: "Deutschland" },
      { "@type": "Country", name: "Österreich" },
      { "@type": "Country", name: "Schweiz" },
    ],
    serviceType: "AI Integration Services",
  },
];

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
      {servicesSchemas.map((serviceSchema) => (
        <script
          key={serviceSchema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      ))}
    </>
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName: string;
  url: string;
  imageUrl?: string;
}

export function ArticleJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  authorName,
  url,
  imageUrl,
}: ArticleJsonLdProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo-icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleSchema),
      }}
    />
  );
}
