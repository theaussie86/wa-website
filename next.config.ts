import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone-Output für den Container-Betrieb: Das Laufzeit-Image kopiert
  // .next/standalone (Server plus nur die tatsächlich benötigten Module),
  // .next/static und public - keine Dev-Dependencies. Siehe Dockerfile.
  output: "standalone",
  images: {
    // Ein Tag. Vorher standen hier 30 Tage, begründet damit, dass jedes
    // Deployment einen leeren Cache ausrollt und eine geänderte Bilddatei
    // deshalb sofort greift. Mit dem Volume aus #24 stimmt diese Begründung
    // nicht mehr, und die 30 Tage werden gefährlich: der Cache-Schlüssel ist
    // hash(CACHE_VERSION, href, width, quality, mimeType) - der Inhalt der
    // Datei geht nicht ein. Wird public/gruenten.jpg ersetzt, bleibt der
    // Schlüssel derselbe, und bis zum Ablauf liefert der Optimizer das alte
    // Bild weiter. Mit einem Tag ist dieses Fenster erträglich und heilt von
    // selbst; das Ablaufen kostet fast nichts, weil Next danach nur den
    // Upstream-ETag vergleicht und den bereits transkodierten Puffer
    // wiederverwendet, wenn die Datei unverändert ist.
    minimumCacheTTL: 86400,
    // Obergrenze der Ablage unter .next/cache/images, die im Container auf
    // einem Volume liegt und Deployments überlebt (#24). Ohne diesen Wert
    // nimmt Next die halbe freie Kapazität des Dateisystems als Grenze -
    // auf einem Volume ist das die Systemplatte der VPS.
    //
    // 128 MB statt großzügiger: Next liest beim Start jeden Eintrag einmal
    // vollständig ein, um den LRU aufzubauen (initCacheEntries). Diese Kosten
    // gab es bisher nicht, weil der Cache bei jedem Start leer war. Der
    // gesamte Bestand - acht Bilder in acht Breiten und zwei Formaten - liegt
    // im niedrigen zweistelligen MB-Bereich; 128 MB sind zehnfacher Spielraum
    // und halten den Startlauf trotzdem kurz.
    maximumDiskCacheSize: 128 * 1024 * 1024,
  },
};

export default nextConfig;
