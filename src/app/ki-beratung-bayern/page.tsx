import { Metadata } from "next";
import { LocalSeoPage } from "@/app/_components/local-seo/local-seo-page";
import { kiBeratungBayern, BASE_URL } from "@/lib/local-seo-data";

export const metadata: Metadata = {
  title: kiBeratungBayern.meta.title,
  description: kiBeratungBayern.meta.description,
  openGraph: {
    title: kiBeratungBayern.meta.ogTitle,
    description: kiBeratungBayern.meta.ogDescription,
    type: "website",
    locale: "de_DE",
    url: `${BASE_URL}/${kiBeratungBayern.slug}`,
  },
  alternates: {
    canonical: `${BASE_URL}/${kiBeratungBayern.slug}`,
  },
};

export default function KiBeratungBayernPage() {
  return <LocalSeoPage data={kiBeratungBayern} />;
}
