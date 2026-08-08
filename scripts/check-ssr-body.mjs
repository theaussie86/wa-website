#!/usr/bin/env node
// Prüft, ob ausgelieferte Seiten serverseitig echtes Markup enthalten.
//
// Ein HTTP 200 und ein vorhandener <title> sagen bei einer React-App nichts
// darüber aus, ob der Seiteninhalt im HTML steht: Beides bleibt grün, während
// der <body> nur einen leeren Platzhalter enthält und der gesamte Baum erst im
// Browser entsteht (siehe Issue #34). Dieses Skript misst deshalb die Länge des
// <body> ohne <script>-Tags - das ist der Teil, den Crawler ohne
// JavaScript-Ausführung sehen.
//
// Verwendung:
//   node scripts/check-ssr-body.mjs <base-url> [pfad ...]
//   node scripts/check-ssr-body.mjs http://1.2.3.4 --host weissteiner-automation.com /
//
// Optionen:
//   --host <name>   Host-Header setzen (Prüfung gegen Server-Adresse vor DNS-Cutover)
//   --min <bytes>   Mindestgröße des skriptfreien Body-Markups (Default: 2000)
//
// Exit-Code 0, wenn alle Pfade bestehen, sonst 1.

const DEFAULT_MIN_BYTES = 2000;
const DEFAULT_PATHS = ["/"];

function parseArgs(argv) {
  const paths = [];
  let baseUrl;
  let host;
  let minBytes = DEFAULT_MIN_BYTES;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--host") {
      host = argv[++i];
      if (!host) throw new Error("--host erwartet einen Wert");
    } else if (arg === "--min") {
      const raw = argv[++i];
      minBytes = Number(raw);
      if (!Number.isFinite(minBytes) || minBytes < 0) {
        throw new Error(`--min erwartet eine Zahl, bekam: ${raw}`);
      }
    } else if (arg.startsWith("--")) {
      throw new Error(`Unbekannte Option: ${arg}`);
    } else if (!baseUrl) {
      baseUrl = arg;
    } else {
      paths.push(arg);
    }
  }

  if (!baseUrl) {
    throw new Error(
      "Basis-URL fehlt. Verwendung: node scripts/check-ssr-body.mjs <base-url> [pfad ...]"
    );
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    host,
    minBytes,
    paths: paths.length > 0 ? paths : DEFAULT_PATHS,
  };
}

/**
 * Länge des <body>-Markups ohne <script>-Blöcke, in Zeichen. Gezählt wird
 * Markup, nicht sichtbarer Text: Tags, Attribute und Kommentare zählen mit.
 * Das ist bewusst grob - es geht um die Unterscheidung "leerer Platzhalter"
 * (38 Zeichen) gegen "vollständiger Seitenbaum" (mehrere Tausend).
 */
function scriptFreeBodyMarkupLength(html) {
  const body = /<body[^>]*>([\s\S]*)<\/body>/i.exec(html);
  if (!body) return 0;
  return body[1].replace(/<script\b[\s\S]*?<\/script>/gi, "").trim().length;
}

async function checkPath({ baseUrl, host, minBytes, path }) {
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = host ? { Host: host } : undefined;

  const response = await fetch(url, { headers, redirect: "follow" });
  const html = await response.text();
  const length = scriptFreeBodyMarkupLength(html);
  const ok = response.ok && length >= minBytes;

  return { url, status: response.status, length, ok };
}

async function main() {
  const { baseUrl, host, minBytes, paths } = parseArgs(process.argv.slice(2));

  console.log(`ziel: ${baseUrl}${host ? ` (Host: ${host})` : ""}`);
  console.log(`min-body-bytes: ${minBytes}`);

  let failed = 0;
  for (const path of paths) {
    const result = await checkPath({ baseUrl, host, minBytes, path });
    if (!result.ok) failed++;
    console.log(
      `${result.ok ? "ok  " : "FAIL"} ${path} status=${result.status} body-ohne-script=${result.length}`
    );
  }

  if (failed > 0) {
    console.error(
      `\n${failed} von ${paths.length} Pfaden liefern kein serverseitiges Markup.`
    );
    process.exit(1);
  }
  console.log(`\nAlle ${paths.length} Pfade liefern serverseitiges Markup.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
