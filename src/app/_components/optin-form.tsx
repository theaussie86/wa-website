"use client";

import { useActionState, useId, type ReactNode } from "react";
import { FormFeedback } from "@/app/_components/form-feedback";
import {
  RecaptchaNotice,
  SpamProtectionFields,
  useSpamProtectedAction,
} from "@/app/_components/spam-protection";
import type { RecaptchaAction } from "@/lib/spam-protection";

export type OptinFormState = { success: boolean; message: string } | null;

const inputClass =
  "w-full min-w-0 rounded-[4px] border border-white/60 bg-primary-600 px-4 py-4 text-[16.5px] text-white placeholder:text-white/70 hover:border-white";

/**
 * Anmeldeformular für eine Brevo-Liste mit Double-Opt-in, auf dunklem Grund.
 *
 * Gemeinsames Element für Warteliste Nullnummer und Newsletter (#75): Felder
 * und Ablauf sind gleich, nur Server Action, Texte und das optionale
 * Freitextfeld unterscheiden sich. Nach dem Absenden ersetzt die Meldung das
 * Formular.
 */
export function OptinForm({
  action,
  recaptchaAction,
  submitLabel,
  freitext,
  hinweis,
}: {
  action: (state: OptinFormState, formData: FormData) => Promise<OptinFormState>;
  recaptchaAction: RecaptchaAction;
  submitLabel: string;
  /** Optionales Textfeld, gespeichert unter dem Namen `freitext`. */
  freitext?: { label: string; placeholder?: string };
  /** Text unter dem Button, typischerweise der Datenschutzhinweis. */
  hinweis: ReactNode;
}) {
  const [state, dispatch, pending] = useActionState(action, null);
  const [submit, preparing] = useSpamProtectedAction(dispatch, recaptchaAction);
  const busy = pending || preparing;
  const id = useId();

  if (state?.success) {
    return <FormFeedback state={state} variant="inverted" />;
  }

  return (
    <div>
      <form action={submit} className="grid gap-4">
        <SpamProtectionFields />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-vorname`} className="mb-1.5 block text-[14px] font-medium text-white/85">
              Vorname
            </label>
            <input
              id={`${id}-vorname`}
              type="text"
              name="vorname"
              autoComplete="given-name"
              maxLength={80}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className="mb-1.5 block text-[14px] font-medium text-white/85">
              E-Mail-Adresse
            </label>
            <input
              id={`${id}-email`}
              type="email"
              name="email"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>
        </div>
        {freitext && (
          <div>
            <label htmlFor={`${id}-freitext`} className="mb-1.5 block text-[14px] font-medium text-white/85">
              {freitext.label} <span className="font-normal text-white/65">(optional)</span>
            </label>
            <textarea
              id={`${id}-freitext`}
              name="freitext"
              rows={3}
              maxLength={1000}
              placeholder={freitext.placeholder}
              className={`${inputClass} resize-y`}
            />
          </div>
        )}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center justify-self-start whitespace-nowrap rounded-[4px] bg-white px-7 py-4 text-[16.5px] font-semibold text-primary transition-colors hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Wird geprüft..." : submitLabel}
        </button>
      </form>
      <div className="mt-2">
        <FormFeedback state={state} variant="inverted" />
      </div>
      <div className="mt-4 text-[13.5px] leading-[1.55] text-white/75">{hinweis}</div>
      <RecaptchaNotice variant="inverted" />
    </div>
  );
}
