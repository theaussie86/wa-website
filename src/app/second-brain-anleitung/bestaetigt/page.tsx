import { Metadata } from "next";
import { Bestaetigt } from "@/app/_components/bestaetigt";

export const metadata: Metadata = {
  title: "Bestätigt - Second Brain Anleitung",
  robots: { index: false },
};

export default function SecondBrainBestaetigtPage() {
  return <Bestaetigt titel="Second Brain Anleitung" />;
}
