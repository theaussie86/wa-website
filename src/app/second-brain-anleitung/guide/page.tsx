import { redirect } from "next/navigation";
import { chapters } from "@/content/freebies/second-brain-anleitung";

export default function GuideIndexPage() {
  redirect(`/second-brain-anleitung/guide/${chapters[0].slug}`);
}
