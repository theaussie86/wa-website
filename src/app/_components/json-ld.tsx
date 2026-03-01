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
  "@type": "LocalBusiness";
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
  "@type": "LocalBusiness",
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
    latitude: 47.9876,
    longitude: 10.1788,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 47.9876,
      longitude: 10.1788,
    },
    geoRadius: "500km",
  },
  priceRange: "$$",
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
