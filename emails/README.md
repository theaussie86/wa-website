# Brevo-Mailvorlagen

Quelle der Mails, die Brevo verschickt. Brevo bekommt nur das fertige HTML, bearbeitet wird hier.
Design: `DESIGN.md` (Betriebsordner), auf E-Mail übersetzt: Pappe als Grund, weißes Blatt, blaues
Etikett als Button, Orange nur als Haftnotiz. Archivo, wo der Client Webfonts lädt (Apple Mail, iOS),
sonst Arial Narrow und Arial.

| Datei | Brevo-Vorlage | Liste |
|---|---|---|
| `doi-betriebs-interview.html` | 9 | 9 |
| `doi-second-brain.html` | 6 | 5 |
| `newsletter.html` | noch nicht angelegt | 11, siehe #75 |

`_layout.html` ist der gemeinsame Rahmen, `_footer-*.html` der Fuß. Zuordnung, Betreff und
Vorschautext stehen in `scripts/brevo-emails.mjs`.

```bash
node scripts/brevo-emails.mjs build                                               # emails/dist/ zur Vorschau
node --env-file=.env.local scripts/brevo-emails.mjs test <vorlage> <email>        # einmal an dich schicken
node --env-file=.env.local scripts/brevo-emails.mjs push <vorlage> --yes          # in Brevo ersetzen, wirkt sofort
```

Nach einem `push` einer DOI-Vorlage den Double-Opt-in einmal durchspielen: `scripts/smoke-test.sh --doi <email>`.
