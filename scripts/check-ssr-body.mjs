#!/usr/bin/env node
// Prüft, ob ausgelieferte Seiten serverseitig echtes Markup enthalten - und
// mit dem erwarteten Statuscode antworten.
//
// Ein HTTP 200 und ein vorhandener <title> sagen bei einer React-App nichts
// darüber aus, ob der Seiteninhalt im HTML steht: Beides bleibt grün, während
// der <body> nur einen leeren Platzhalter enthält und der gesamte Baum erst im
// Browser entsteht (siehe Issue #34). Dieses Skript misst deshalb die Länge des
// <body> ohne <script>-Tags - das ist der Teil, den Crawler ohne
// JavaScript-Ausführung sehen.
//
// Umgekehrt reicht das Markup allein auch nicht: Eine tote URL, die 200 statt
// 404 liefert, ist ein Soft 404 und bleibt im Index (Issue #28). Dafür gibt es
// --status.
//
// Verwendung:
//   node scripts/check-ssr-body.mjs <base-url> [pfad ...]
//   node scripts/check-ssr-body.mjs http://1.2.3.4 --host weissteiner-automation.com /
//   node scripts/check-ssr-body.mjs http://localhost:3000 --status 404 /gibt-es-nicht
//
// Optionen:
//   --host <name>    Host-Header setzen (Prüfung gegen Server-Adresse vor DNS-Cutover)
//   --min <bytes>    Mindestgröße des skriptfreien Body-Markups (Default: 2000)
//   --status <code>  Exakt erwarteter Statuscode (Default: irgendein 2xx)
//
// Weiterleitungen werden nie verfolgt: Eine Antwort, die erst über einen
// Redirect zum Ziel kommt, soll als das auffallen, was sie ist.
//
// Exit-Code 0, wenn alle Pfade bestehen, sonst 1.

const DEFAULT_MIN_BYTES = 2000;
const DEFAULT_PATHS = ["/"];

function parseArgs(argv) {
  const paths = [];
  let baseUrl;
  let host;
  let minBytes = DEFAULT_MIN_BYTES;
  let expectedStatus;

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
    } else if (arg === "--status") {
      const raw = argv[++i];
      expectedStatus = Number(raw);
      if (!Number.isInteger(expectedStatus)) {
        throw new Error(`--status erwartet einen Statuscode, bekam: ${raw}`);
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
    expectedStatus,
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

async function checkPath({ baseUrl, host, minBytes, expectedStatus, path }) {
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = host ? { Host: host } : undefined;

  const response = await fetch(url, { headers, redirect: "manual" });
  const html = await response.text();
  const length = scriptFreeBodyMarkupLength(html);
  const statusOk =
    expectedStatus === undefined
      ? response.ok
      : response.status === expectedStatus;

  return { path, status: response.status, length, statusOk, bodyOk: length >= minBytes };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const { baseUrl, host, minBytes, expectedStatus, paths } = options;

  console.log(`ziel: ${baseUrl}${host ? ` (Host: ${host})` : ""}`);
  console.log(
    `erwarteter status: ${expectedStatus ?? "2xx"}, min-body-bytes: ${minBytes}`
  );

  let failed = 0;
  for (const path of paths) {
    const result = await checkPath({ ...options, path });
    const ok = result.statusOk && result.bodyOk;
    if (!ok) failed++;
    const reason = ok
      ? ""
      : ` <- ${[
          result.statusOk ? null : "unerwarteter Status",
          result.bodyOk ? null : "Body-Markup zu klein",
        ]
          .filter(Boolean)
          .join(", ")}`;
    console.log(
      `${ok ? "ok  " : "FAIL"} ${path} status=${result.status} body-ohne-script=${result.length}${reason}`
    );
  }

  if (failed > 0) {
    console.error(
      `\n${failed} von ${paths.length} Pfaden antworten nicht wie erwartet.`
    );
    process.exit(1);
  }
  console.log(`\nAlle ${paths.length} Pfade antworten wie erwartet.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
