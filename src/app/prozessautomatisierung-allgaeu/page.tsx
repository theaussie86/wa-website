import { Metadata } from "next";
import { LocalSeoPage } from "@/app/_components/local-seo/local-seo-page";
import { prozessautomatisierungAllgaeu, BASE_URL } from "@/lib/local-seo-data";

export const metadata: Metadata = {
  title: prozessautomatisierungAllgaeu.meta.title,
  description: prozessautomatisierungAllgaeu.meta.description,
  openGraph: {
    title: prozessautomatisierungAllgaeu.meta.ogTitle,
    description: prozessautomatisierungAllgaeu.meta.ogDescription,
    type: "website",
    locale: "de_DE",
    url: `${BASE_URL}/${prozessautomatisierungAllgaeu.slug}`,
  },
  alternates: {
    canonical: `${BASE_URL}/${prozessautomatisierungAllgaeu.slug}`,
  },
};

export default function ProzessautomatisierungAllgaeuPage() {
  return <LocalSeoPage data={prozessautomatisierungAllgaeu} />;
}
