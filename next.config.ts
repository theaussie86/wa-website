import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger Node.js Web Apps benötigt Standalone-Output:
  // Die Deploy-Pipeline kopiert .next/standalone/server.js nach ~/domains/{domain}/nodejs
  // und generiert das Passenger-.htaccess in public_html.
  output: "standalone",
};

export default nextConfig;
