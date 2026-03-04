import { Metadata } from "next";
import { LocalSeoPage } from "@/app/_components/local-seo/local-seo-page";
import { softwareentwicklungDach, BASE_URL } from "@/lib/local-seo-data";

export const metadata: Metadata = {
  title: softwareentwicklungDach.meta.title,
  description: softwareentwicklungDach.meta.description,
  openGraph: {
    title: softwareentwicklungDach.meta.ogTitle,
    description: softwareentwicklungDach.meta.ogDescription,
    type: "website",
    locale: "de_DE",
    url: `${BASE_URL}/${softwareentwicklungDach.slug}`,
  },
  alternates: {
    canonical: `${BASE_URL}/${softwareentwicklungDach.slug}`,
  },
};

export default function SoftwareentwicklungDachPage() {
  return <LocalSeoPage data={softwareentwicklungDach} />;
}
