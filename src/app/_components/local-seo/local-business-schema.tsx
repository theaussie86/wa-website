import { LocalSeoPageData, BASE_URL, MEMMINGEN_GEO } from "@/lib/local-seo-data";

interface LocalBusinessSchemaProps {
  pageData: LocalSeoPageData;
}

export function LocalBusinessSchema({ pageData }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/${pageData.slug}#service`,
    name: pageData.schema.serviceName,
    description: pageData.schema.serviceDescription,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#localbusiness`,
    },
    areaServed: pageData.schema.areaServed,
    serviceType: pageData.schema.serviceType,
    url: `${BASE_URL}/${pageData.slug}`,
    // Add geo for local pages
    ...(pageData.slug === "prozessautomatisierung-allgaeu" && {
      availableChannel: {
        "@type": "ServiceChannel",
        serviceLocation: {
          "@type": "Place",
          geo: {
            "@type": "GeoCoordinates",
            latitude: MEMMINGEN_GEO.latitude,
            longitude: MEMMINGEN_GEO.longitude,
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Memmingen",
            addressRegion: "Bayern",
            addressCountry: "DE",
          },
        },
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
