"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "../actions";
import { FormFeedback } from "@/app/_components/form-feedback";
import {
  RecaptchaNotice,
  SpamProtectionFields,
  useSpamProtectedAction,
} from "@/app/_components/spam-protection";

export function WaitlistForm({ id, variant = "default" }: { id?: string; variant?: "default" | "inverted" }) {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, null);
  const [submit, preparing] = useSpamProtectedAction(action, "waitlist");
  const busy = pending || preparing;

  const inputClass =
    variant === "inverted"
      ? "w-full px-4 py-3 rounded-xs border-2 border-white/30 bg-white text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      : "w-full px-4 py-3 rounded-xs border-2 border-primary/20 bg-white text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

  if (state?.success) {
    return <FormFeedback state={state} variant={variant === "inverted" ? "inverted" : "default"} />;
  }

  return (
    <div id={id}>
      <form action={submit} className="flex flex-col gap-3 max-w-md mx-auto">
        <SpamProtectionFields />
        <input
          type="text"
          name="name"
          placeholder="Dein Vorname (optional)"
          aria-label="Dein Vorname"
          disabled={busy}
          className={inputClass}
        />
        <input
          type="email"
          name="email"
          placeholder="Deine E-Mail-Adresse"
          required
          aria-label="Deine E-Mail-Adresse"
          disabled={busy}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={busy}
          className="btn-primary py-4 text-base font-semibold disabled:opacity-50"
        >
          {busy ? "Wird eingetragen..." : "Auf die Warteliste"}
        </button>
      </form>
      {state && !state.success && (
        <div className="mt-3">
          <FormFeedback state={state} variant={variant === "inverted" ? "inverted" : "default"} />
        </div>
      )}
      <p className={`text-xs mt-3 text-center ${variant === "inverted" ? "text-white/40" : "text-charcoal/40"}`}>
        Kostenlos · Kein Spam · Jederzeit abmelden
      </p>
      <RecaptchaNotice variant={variant === "inverted" ? "inverted" : "default"} />
    </div>
  );
}
