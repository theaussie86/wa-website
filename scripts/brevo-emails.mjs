#!/usr/bin/env node
/**
 * Brevo-Mailvorlagen aus `emails/` bauen, testen und hochladen.
 *
 * Die Vorlagen liegen versioniert im Repo, Brevo bekommt nur das fertige HTML.
 * Jede Vorlage ist ein Inhaltsstück, das in `emails/_layout.html` eingesetzt
 * wird, dazu ein Fuß (`_footer-doi.html` oder `_footer-newsletter.html`).
 *
 *   node --env-file=.env.local scripts/brevo-emails.mjs build
 *     schreibt das fertige HTML nach emails/dist/ (Vorschau im Browser)
 *
 *   node --env-file=.env.local scripts/brevo-emails.mjs test <vorlage> <email>
 *     schickt das HTML einmal an <email>, ohne die Vorlage in Brevo anzufassen.
 *     Platzhalter wie {{ doubleoptin }} zeigen dabei auf die Website.
 *
 *   node --env-file=.env.local scripts/brevo-emails.mjs push <vorlage> --yes
 *     ersetzt HTML und Betreff der Vorlage in Brevo. Wirkt sofort auf jede
 *     neue Anmeldung, deshalb nur mit --yes. Ohne templateId wird sie neu
 *     angelegt, die neue ID gehört danach in TEMPLATES.
 *
 * Beim Ersetzen bleibt der Absender, wie er in Brevo eingestellt ist: push
 * schickt ihn nicht mit. Nur neu angelegte Vorlagen bekommen `sender` (oder
 * SENDER) und `tag` aus TEMPLATES.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "emails");
const API = "https://api.brevo.com/v3";

// Absender für neu angelegte Vorlagen und Testversand, derselbe wie bei
// den bestehenden Double-Opt-in-Vorlagen.
const SENDER = { name: "Christoph - Weissteiner Automation", email: "christoph@weissteiner-automation.com" };

const TEMPLATES = {
  "doi-betriebs-interview": {
    templateId: 9,
    footer: "_footer-doi.html",
    subject: "Bitte bestätigen: Das Betriebs-Interview",
    preheader: "Bestätige deine Adresse, dann öffnet sich der Prompt.",
  },
  "doi-second-brain": {
    templateId: 6,
    footer: "_footer-doi.html",
    subject: "Bitte bestätigen: Deine Second-Brain-Anleitung",
    preheader: "Bestätige deine Adresse, dann öffnet sich die Anleitung.",
  },
  "doi-nullnummer": {
    templateId: 12,
    name: "DOI-Warteliste-Nullnummer",
    // Eigener Absendername, wie im Issue #81 festgelegt: die Warteliste ist
    // persönlich, Christoph schreibt jeden Eintrag selbst an.
    sender: { name: "Christoph Weissteiner", email: "christoph@weissteiner-automation.com" },
    tag: "optin",
    footer: "_footer-doi.html",
    subject: "Bitte bestätigen: Warteliste Nullnummer",
    preheader: "Bestätige deine Adresse, dann stehst du auf der Warteliste.",
  },
  newsletter: {
    templateId: 11,
    name: "Newsletter-Vorlage Betriebsordner",
    footer: "_footer-newsletter.html",
    subject: "Betreff dieser Ausgabe",
    preheader: "Vorschautext dieser Ausgabe",
  },
};

// Was Brevo beim echten Versand einsetzt, im Testversand durch feste Werte
// ersetzt. Sonst stünden die Platzhalter roh im Link.
const TEST_PLACEHOLDERS = [
  [/\{\{\s*doubleoptin\s*\}\}/g, "https://weissteiner-automation.com/"],
  [/\{\{\s*unsubscribe\s*\}\}/g, "https://weissteiner-automation.com/"],
  [/\{\{\s*mirror\s*\}\}/g, "https://weissteiner-automation.com/"],
];

async function build(name) {
  const t = TEMPLATES[name];
  if (!t) throw new Error(`Unbekannte Vorlage "${name}". Bekannt: ${Object.keys(TEMPLATES).join(", ")}`);
  const [layout, content, footer] = await Promise.all([
    readFile(path.join(DIR, "_layout.html"), "utf8"),
    readFile(path.join(DIR, `${name}.html`), "utf8"),
    readFile(path.join(DIR, t.footer), "utf8"),
  ]);
  return layout
    .replace("%%TITLE%%", t.subject)
    .replace("%%PREHEADER%%", t.preheader)
    .replace("%%CONTENT%%", content.trimEnd())
    .replace("%%FOOTER%%", footer.trimEnd());
}

async function brevo(method, url, body) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY fehlt (node --env-file=.env.local ...)");
  const res = await fetch(`${API}${url}`, {
    method,
    headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Brevo ${method} ${url}: ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;
}

const [command, name, arg] = process.argv.slice(2);

switch (command) {
  case "build": {
    const out = path.join(DIR, "dist");
    await mkdir(out, { recursive: true });
    for (const n of name ? [name] : Object.keys(TEMPLATES)) {
      await writeFile(path.join(out, `${n}.html`), await build(n));
      console.log(`emails/dist/${n}.html`);
    }
    break;
  }

  case "test": {
    if (!arg) throw new Error("Aufruf: test <vorlage> <email>");
    let html = await build(name);
    for (const [pattern, value] of TEST_PLACEHOLDERS) html = html.replace(pattern, value);
    const res = await brevo("POST", "/smtp/email", {
      sender: TEMPLATES[name].sender ?? SENDER,
      to: [{ email: arg }],
      subject: `[Test] ${TEMPLATES[name].subject}`,
      htmlContent: html,
      tags: ["test"],
    });
    console.log(`Test an ${arg} verschickt (${res.messageId})`);
    break;
  }

  case "push": {
    if (arg !== "--yes") throw new Error("push ändert die Vorlage in Brevo sofort. Mit --yes bestätigen.");
    const t = TEMPLATES[name];
    const htmlContent = await build(name);
    if (t.templateId) {
      await brevo("PUT", `/smtp/templates/${t.templateId}`, { htmlContent, subject: t.subject });
      console.log(`Vorlage ${t.templateId} in Brevo ersetzt`);
    } else {
      const res = await brevo("POST", "/smtp/templates", {
        templateName: t.name,
        subject: t.subject,
        htmlContent,
        sender: t.sender ?? SENDER,
        ...(t.tag ? { tag: t.tag } : {}),
        isActive: true,
      });
      console.log(`Vorlage angelegt: ID ${res.id}. In TEMPLATES eintragen.`);
    }
    break;
  }

  default:
    console.log("Aufruf: build [vorlage] | test <vorlage> <email> | push <vorlage> --yes");
    process.exit(command ? 1 : 0);
}
