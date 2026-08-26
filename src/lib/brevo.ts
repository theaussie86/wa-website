/**
 * Prüft, ob ein Kontakt in Brevo bestätigt ist.
 *
 * Mit Wiederholungen, und das ist der ganze Punkt: Brevo leitet nach dem
 * Klick auf den Double-Opt-in-Link sofort auf unsere Bestätigungsseite
 * weiter, legt den Kontakt aber erst kurz danach an. Wer ohne Wartezeit
 * abfragt, bekommt für den frisch bestätigten Kontakt ein 404 - und weist
 * genau die Leute ab, die eben erst zugestimmt haben.
 *
 * Gemessen am 26.08.2026 mit einem Poller im Viertelsekundentakt: der
 * Kontakt war 1,24 Sekunden nach dem Aufruf des Bestaetigungslinks
 * sichtbar. Eine Abfrage ohne Wiederholung greift daneben.
 *
 * Nur 404 und Serverfehler werden wiederholt. Ein Kontakt, den Brevo kennt
 * und der auf der Sperrliste steht, ist eine Antwort und keine Verzögerung.
 */
const RETRY_DELAYS_MS = [400, 800, 1500];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function isBrevoContactConfirmed(email: string): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY not configured");
    return false;
  }

  const url = `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`;

  for (let versuch = 0; versuch <= RETRY_DELAYS_MS.length; versuch++) {
    if (versuch > 0) await sleep(RETRY_DELAYS_MS[versuch - 1]);

    let res: Response;
    try {
      res = await fetch(url, {
        headers: { "api-key": apiKey, Accept: "application/json" },
        cache: "no-store",
      });
    } catch (error) {
      console.error("Brevo nicht erreichbar:", error);
      continue;
    }

    if (res.ok) {
      const contact = await res.json();
      return contact.emailBlacklisted === false;
    }

    // 404 heißt hier "noch nicht angelegt", nicht "gibt es nicht".
    if (res.status !== 404 && res.status < 500) {
      console.error("Brevo-Kontaktabfrage fehlgeschlagen:", res.status);
      return false;
    }
  }

  console.warn(`Kontakt ${email} war nach allen Versuchen nicht auffindbar`);
  return false;
}
