#!/usr/bin/env node
// Prüft, ob nicht existierende Pfade mit HTTP 404 und einer echten Seite
// antworten.
//
// Zwei Fehler sind hier möglich, und beide sind unsichtbar, wenn man nur eine
// der beiden Größen misst (siehe Issue #28):
//
//   Status 200 auf eine tote URL ist ein Soft 404. Suchmaschinen halten die
//   Seite für gültigen Inhalt und lassen sie im Index. Das passiert, sobald
//   `notFound()` serverseitig gar nicht erst geworfen wird - etwa weil ein
//   Client-Provider im Root-Layout die children verwarf (#34).
//
//   Ein 404 mit leerem Body ist die Next-Fehlerhülle `__next_error__`: richtiger
//   Status, aber der Nutzer sieht bis zur Hydration nichts, und ohne
//   JavaScript nie etwas. Das passiert, solange kein `src/app/not-found.tsx`
//   existiert.
//
// Verwendung:
//   node scripts/check-not-found.mjs <base-url> [pfad ...]
//
// Optionen:
//   --host <name>   Host-Header setzen (Prüfung gegen Server-Adresse vor DNS-Cutover)
//   --min <bytes>   Mindestgröße des skriptfreien Body-Markups (Default: 2000)
//
// Exit-Code 0, wenn alle Pfade bestehen, sonst 1.

import { scriptFreeBodyMarkupLength } from "./check-ssr-body.mjs";

const EXPECTED_STATUS = 404;
const DEFAULT_MIN_BYTES = 2000;

// Zwei Wege in die Not-Found-Seite, die sich in Next unterschiedlich verhalten:
// ein Pfad, den keine Route matcht, und ein Pfad, dessen Seite `notFound()`
// aufruft. Nur der zweite deckt den Fehler aus #28 auf.
const DEFAULT_PATHS = ["/diese-seite-gibt-es-nicht", "/blog/gibt-es-nicht"];

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
      "Basis-URL fehlt. Verwendung: node scripts/check-not-found.mjs <base-url> [pfad ...]"
    );
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    host,
    minBytes,
    paths: paths.length > 0 ? paths : DEFAULT_PATHS,
  };
}

async function checkPath({ baseUrl, host, minBytes, path }) {
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = host ? { Host: host } : undefined;

  // Kein redirect: "follow" - eine Weiterleitung auf eine existierende Seite
  // wäre selbst schon der Fehler und soll nicht als 200 durchgehen.
  const response = await fetch(url, { headers, redirect: "manual" });
  const html = await response.text();
  const length = scriptFreeBodyMarkupLength(html);
  const statusOk = response.status === EXPECTED_STATUS;
  const bodyOk = length >= minBytes;

  return { path, status: response.status, length, statusOk, bodyOk };
}

async function main() {
  const { baseUrl, host, minBytes, paths } = parseArgs(process.argv.slice(2));

  console.log(`ziel: ${baseUrl}${host ? ` (Host: ${host})` : ""}`);
  console.log(`erwarteter status: ${EXPECTED_STATUS}, min-body-bytes: ${minBytes}`);

  let failed = 0;
  for (const path of paths) {
    const result = await checkPath({ baseUrl, host, minBytes, path });
    const ok = result.statusOk && result.bodyOk;
    if (!ok) failed++;
    const reason = ok
      ? ""
      : ` <- ${[
          result.statusOk ? null : `status ist nicht ${EXPECTED_STATUS}`,
          result.bodyOk ? null : "Body-Markup zu klein (leere Fehlerhülle?)",
        ]
          .filter(Boolean)
          .join(", ")}`;
    console.log(
      `${ok ? "ok  " : "FAIL"} ${path} status=${result.status} body-ohne-script=${result.length}${reason}`
    );
  }

  if (failed > 0) {
    console.error(
      `\n${failed} von ${paths.length} Pfaden liefern keine brauchbare Not-Found-Antwort.`
    );
    process.exit(1);
  }
  console.log(`\nAlle ${paths.length} Pfade liefern ${EXPECTED_STATUS} mit echtem Markup.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
