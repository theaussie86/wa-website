# 4. Treat reCAPTCHA as an essential service

Date: 2026-08-11

## Status

Accepted

## Context

A bot submitted the contact form with random strings in every field. The form maps
straight to a Gmail send, so the inbox is the payload target and the endpoint is open
to anyone.

The countermeasure is a honeypot field plus Google reCAPTCHA v3. reCAPTCHA is a US
third party that sets the `_GRECAPTCHA` cookie and transmits behavioural data. The
coding standards say that a script without Consent Mode support which sets cookies or
transmits data may only render after the visitor has given consent - and reCAPTCHA has
no Consent Mode integration.

Following that rule literally means: the visitor declines, the script never loads, no
token is produced, and the server rejects the submission. A bot simply never gives
consent and would face the honeypot alone. Gating the protection behind consent
therefore removes the protection from exactly the traffic it exists for, and breaks the
form for every human who declines.

## Decision

reCAPTCHA is registered in `src/lib/cookie-config.ts` under the `essential` category
with `isActive: true`, so it loads without a banner opt-in. The legal basis is
legitimate interest under Art. 6(1)(f) GDPR: protecting a public form from automated
abuse.

Three constraints keep the exception narrow:

- The script only renders inside `SpamProtectionFields`, which lives in the three
  forms. Pages without a form load nothing.
- `src/app/datenschutz` names the service, the data transferred, the cookie, the
  retention and the legal basis.
- The floating badge is hidden in `globals.css` and replaced by the `RecaptchaNotice`
  text under each form, which is the alternative Google's terms allow.

## Consequences

The protection works for every visitor, including those who decline non-essential
cookies. In exchange, the site transmits data to Google before consent on three pages,
which is a defensible but not risk-free position - the same one taken by the bulk of
German sites running reCAPTCHA, and comparable to the Google Fonts rulings in that a
court could weigh it differently.

Google becomes a hard dependency of every lead path. `checkFields` fails closed, so an
unreachable siteverify endpoint or a slow response past the 5 s timeout rejects real
submissions on all three forms at once. That is deliberate - a check that lets traffic
through whenever it breaks is a check a bot can break on purpose - but it means a Google
outage is a lead outage. The counterweights are operational, not architectural: the
smoke test asserts that `/kontakt` still ships the script, the build fails when the site
key is missing, and `/kontakt` offers a WhatsApp link and a booking link that bypass the
form entirely. Visitors whose browser blocks Google get a message naming that cause
rather than a bot accusation (`spamRejectionMessage`).

Alternatives considered:

- **Consent-gated (category `marketing`).** Standards-conform, but leaves the forms
  unprotected for anyone who declines, which includes every bot. Rejected because it
  buys compliance by removing the feature.
- **Click-to-load before submitting.** Legally the cleanest: nothing reaches Google
  until the visitor asks for it. Rejected for now because it puts an extra click in
  front of every lead on the site's main conversion path. It stays the fallback if the
  legitimate-interest position ever has to be given up.
- **Self-hosted challenge (Altcha, Friendly Captcha).** No third-party transfer at all
  and no consent question. Rejected because it is a new dependency to operate, and the
  immediate problem is a naive bot that a honeypot plus a score check already stops.
