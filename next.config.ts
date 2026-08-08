import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone-Output für den Container-Betrieb: Das Laufzeit-Image kopiert
  // .next/standalone (Server plus nur die tatsächlich benötigten Module),
  // .next/static und public - keine Dev-Dependencies. Siehe Dockerfile.
  output: "standalone",
  images: {
    // Der Image-Optimizer transkodiert sonst nach jedem Cache-Ablauf neu.
    // 30 Tage, weil Bilder unter stabilen Pfaden liegen und bei einer
    // Änderung ohnehin ein neues Image mit leerem Cache ausgerollt wird.
    minimumCacheTTL: 2592000,
    // Obergrenze der Ablage unter .next/cache/images, die im Container auf
    // einem Volume liegt und Deployments überlebt (#24). Ohne diesen Wert
    // nimmt Next die halbe freie Kapazität des Dateisystems als Grenze -
    // auf einem Volume ist das die Systemplatte der VPS. 512 MB fassen den
    // gesamten Bildbestand in allen Varianten um ein Vielfaches; darüber
    // hinaus verdrängt der LRU die am längsten ungenutzten Einträge.
    maximumDiskCacheSize: 512 * 1024 * 1024,
  },
};

export default nextConfig;
