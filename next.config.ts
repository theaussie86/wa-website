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
  },
};

export default nextConfig;
