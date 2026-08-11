"use server";

import { cookies } from "next/headers";
import { ClientResponseError } from "pocketbase";
import { verifyGuideToken } from "@/lib/guide-auth";
import { getPocketBase } from "@/lib/pocketbase";

const FREEBIE_SLUG = "second-brain-anleitung";

// Alle Filter laufen über pb.filter(): das SDK setzt die Platzhalter escaped
// ein. Ein Anführungszeichen in der Mailadresse oder im Kapitel-Slug bricht
// so nicht aus dem Ausdruck aus.
async function getFreebieId(pb: ReturnType<typeof getPocketBase>) {
  try {
    const freebie = await pb
      .collection("freebies")
      .getFirstListItem(pb.filter("slug = {:slug}", { slug: FREEBIE_SLUG }));
    return freebie.id;
  } catch {
    return null;
  }
}

export async function toggleChapterComplete(chapterSlug: string) {
  const cookieStore = await cookies();
  const auth = await verifyGuideToken(cookieStore);
  if (!auth) return { error: "Nicht authentifiziert" };

  const pb = getPocketBase();
  const freebieId = await getFreebieId(pb);
  if (!freebieId) return { error: "Freebie nicht gefunden" };

  const filter = pb.filter(
    "freebie = {:freebie} && email = {:email} && chapter_slug = {:chapter}",
    { freebie: freebieId, email: auth.email, chapter: chapterSlug }
  );

  const existing = await pb
    .collection("freebie_progress")
    .getFirstListItem(filter)
    .catch(() => null);

  if (existing) {
    await pb.collection("freebie_progress").delete(existing.id);
    return { completed: false };
  }

  try {
    await pb.collection("freebie_progress").create({
      freebie: freebieId,
      email: auth.email,
      chapter_slug: chapterSlug,
    });
  } catch (error) {
    // Zwei Klicks kurz hintereinander laufen beide durch die Abfrage oben,
    // bevor einer geschrieben hat. Der zweite scheitert dann am Unique-Index
    // (`idx_freebie_progress_unique`) - der Haken sitzt trotzdem, das ist
    // kein Fehler für den Besucher.
    if (error instanceof ClientResponseError && error.status === 400) {
      return { completed: true };
    }
    return { error: "Fehler beim Speichern" };
  }

  return { completed: true };
}

export async function getCompletedChapters(): Promise<string[]> {
  const cookieStore = await cookies();
  const auth = await verifyGuideToken(cookieStore);
  if (!auth) return [];

  const pb = getPocketBase();
  const freebieId = await getFreebieId(pb);
  if (!freebieId) return [];

  try {
    const rows = await pb.collection("freebie_progress").getFullList({
      filter: pb.filter("freebie = {:freebie} && email = {:email}", {
        freebie: freebieId,
        email: auth.email,
      }),
      fields: "chapter_slug",
    });
    return rows.map((row) => row.chapter_slug as string);
  } catch {
    return [];
  }
}
