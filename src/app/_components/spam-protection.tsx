"use client";

import Script from "next/script";
import { startTransition, useCallback, useRef, useState } from "react";
import {
  HONEYPOT_FIELD,
  RECAPTCHA_TOKEN_FIELD,
  type RecaptchaAction,
} from "@/lib/spam-protection";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface Grecaptcha {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

/** Wartezeit, bis `api.js` das globale `grecaptcha` gesetzt hat. */
const SCRIPT_WAIT_MS = 3000;
const SCRIPT_POLL_MS = 100;

/**
 * Der Nutzer kann abschicken, bevor `api.js` geladen ist - besonders auf
 * langsamen Verbindungen und wenn das Formular über der Falz steht. Ohne
 * dieses Warten ginge die Einsendung ohne Token raus und der Server würde
 * einen Menschen als Bot abweisen.
 */
async function waitForGrecaptcha(): Promise<Grecaptcha | null> {
  const deadline = SCRIPT_WAIT_MS / SCRIPT_POLL_MS;
  for (let attempt = 0; attempt < deadline; attempt++) {
    if (window.grecaptcha) return window.grecaptcha;
    await new Promise((resolve) => setTimeout(resolve, SCRIPT_POLL_MS));
  }
  return window.grecaptcha ?? null;
}

/**
 * Obergrenze für `ready` und `execute` zusammen. Beide sind Fremdcode: Ein
 * halb geladenes `api.js` setzt `window.grecaptcha`, ruft den `ready`-Callback
 * aber nie auf. Ohne dieses Rennen bliebe das Formular ohne jede Rückmeldung
 * hängen, bis der Nutzer die Seite neu lädt.
 */
const EXECUTE_TIMEOUT_MS = 5000;

async function requestToken(action: RecaptchaAction): Promise<string | null> {
  const siteKey = SITE_KEY;
  if (!siteKey) return null;

  const grecaptcha = await waitForGrecaptcha();
  if (!grecaptcha) {
    console.error("reCAPTCHA wurde nicht geladen");
    return null;
  }

  const timeout = new Promise<null>((resolve) =>
    setTimeout(() => resolve(null), EXECUTE_TIMEOUT_MS)
  );

  const token = (async () => {
    await new Promise<void>((resolve) => grecaptcha.ready(resolve));
    return grecaptcha.execute(siteKey, { action });
  })();

  return Promise.race([token, timeout]);
}

/**
 * Legt vor dem Absenden ein frisches reCAPTCHA-Token in die `FormData` und
 * ruft dann die Server Action auf.
 *
 * Das Token wird erst beim Absenden geholt, nicht beim Rendern: Tokens von
 * reCAPTCHA v3 laufen nach zwei Minuten ab, ein beim Seitenaufbau erzeugtes
 * Token wäre bei einem ausgefüllten Kontaktformular fast immer tot.
 *
 * Der Aufruf von `dispatch` steckt in einem eigenen `startTransition`: React
 * verliert den Übergang des Formulars über das `await`, und ohne Übergang
 * bleibt `pending` aus `useActionState` während des Absendens `false`.
 *
 * Für die Zeit davor deckt der zurückgegebene `preparing`-Zustand die Lücke:
 * `pending` greift erst ab `dispatch`, das Holen des Tokens dauert davor bis
 * zu acht Sekunden. Ohne diesen Zustand bliebe der Button in der Zeit
 * unbeschriftet klickbar und ein Doppelklick liefe ins Leere. Das Formular
 * muss deshalb `pending || preparing` auswerten, nicht `pending` allein.
 */
export function useSpamProtectedAction(
  dispatch: (formData: FormData) => void,
  action: RecaptchaAction
): [(formData: FormData) => void, boolean] {
  const [preparing, setPreparing] = useState(false);
  // Zweite Absicherung neben `preparing`: Der State ist im Callback der
  // laufenden Runde noch der alte Wert, der Ref ist sofort aktuell.
  const busy = useRef(false);

  const submit = useCallback(
    (formData: FormData) => {
      if (busy.current) return;
      busy.current = true;
      setPreparing(true);

      void (async () => {
        try {
          const token = await requestToken(action);
          if (token) formData.set(RECAPTCHA_TOKEN_FIELD, token);
          startTransition(() => dispatch(formData));
        } catch (error) {
          console.error("reCAPTCHA-Token konnte nicht erzeugt werden:", error);
          // Trotzdem abschicken: Der Server weist ohne Token ab und erklärt
          // dem Nutzer warum. Ein stiller Abbruch hier hinterließe ein
          // Formular, das auf den Klick gar nicht reagiert.
          startTransition(() => dispatch(formData));
        } finally {
          busy.current = false;
          setPreparing(false);
        }
      })();
    },
    [dispatch, action]
  );

  return [submit, preparing];
}

/**
 * Versteckte Felder und das reCAPTCHA-Skript. Gehört in jedes `<form>`, das
 * `useSpamProtectedAction` benutzt.
 */
export function SpamProtectionFields() {
  return (
    <>
      {/*
        Aus dem Blickfeld geschoben statt `display: none` oder `hidden`:
        Beides ist für einen Bot der offensichtliche Hinweis, das Feld
        auszulassen. `aria-hidden` und `tabIndex` halten es trotzdem aus
        Screenreader und Tab-Reihenfolge heraus.
      */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        {/*
          Die drei data-Attribute sind die dokumentierten Abmeldungen von
          1Password, LastPass und Dashlane. `autoComplete="off"` allein reicht
          nicht: Passwortmanager füllen auch unsichtbare Felder, und ein von
          der Erweiterung eingetragener Wert würde einen Menschen als Bot
          abweisen.
        */}
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
          data-1p-ignore="true"
          data-lpignore="true"
          data-form-type="other"
        />
      </div>

      {SITE_KEY && (
        <Script
          id="recaptcha-v3"
          strategy="afterInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
        />
      )}
    </>
  );
}

/**
 * Pflichthinweis von Google. Er ersetzt das eingeblendete Badge, das
 * `globals.css` ausblendet - Googles Nutzungsbedingungen lassen genau diese
 * Wahl zwischen Badge und sichtbarem Hinweis.
 */
export function RecaptchaNotice({ variant = "default" }: { variant?: "default" | "inverted" }) {
  const textClass = variant === "inverted" ? "text-white/40" : "text-charcoal/40";

  return (
    <p className={`text-xs mt-3 text-center ${textClass}`}>
      Geschützt durch reCAPTCHA. Es gelten die{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline"
      >
        Datenschutzerklärung
      </a>{" "}
      und die{" "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline"
      >
        Nutzungsbedingungen
      </a>{" "}
      von Google.
    </p>
  );
}
