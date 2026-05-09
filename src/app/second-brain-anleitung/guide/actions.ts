"use server";

import { cookies } from "next/headers";
import { verifyGuideToken } from "@/lib/guide-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

const FREEBIE_SLUG = "second-brain-anleitung";

async function getFreebieId(supabase: ReturnType<typeof getSupabaseAdmin>) {
  const { data } = await supabase
    .from("freebies")
    .select("id")
    .eq("slug", FREEBIE_SLUG)
    .single();
  return data?.id ?? null;
}

export async function toggleChapterComplete(chapterSlug: string) {
  const cookieStore = await cookies();
  const auth = await verifyGuideToken(cookieStore);
  if (!auth) return { error: "Nicht authentifiziert" };

  const supabase = getSupabaseAdmin();
  const freebieId = await getFreebieId(supabase);
  if (!freebieId) return { error: "Freebie nicht gefunden" };

  const { data: existing } = await supabase
    .from("freebie_progress")
    .select("id")
    .eq("freebie_id", freebieId)
    .eq("email", auth.email)
    .eq("chapter_slug", chapterSlug)
    .maybeSingle();

  if (existing) {
    await supabase.from("freebie_progress").delete().eq("id", existing.id);
    return { completed: false };
  }

  const { error } = await supabase.from("freebie_progress").upsert(
    {
      freebie_id: freebieId,
      email: auth.email,
      chapter_slug: chapterSlug,
    },
    { onConflict: "freebie_id,email,chapter_slug" }
  );

  if (error) return { error: "Fehler beim Speichern" };
  return { completed: true };
}

export async function getCompletedChapters(): Promise<string[]> {
  const cookieStore = await cookies();
  const auth = await verifyGuideToken(cookieStore);
  if (!auth) return [];

  const supabase = getSupabaseAdmin();
  const freebieId = await getFreebieId(supabase);
  if (!freebieId) return [];

  const { data } = await supabase
    .from("freebie_progress")
    .select("chapter_slug")
    .eq("freebie_id", freebieId)
    .eq("email", auth.email);

  return data?.map((row) => row.chapter_slug) ?? [];
}
