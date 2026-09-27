"use client";

import { useActionState, useState } from "react";
import { sendContactMessage } from "./actions";
import { FormFeedback } from "@/app/_components/form-feedback";
import {
  RecaptchaNotice,
  SpamProtectionFields,
  useSpamProtectedAction,
} from "@/app/_components/spam-protection";

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState(sendContactMessage, null);
  const [submit, preparing] = useSpamProtectedAction(action, "contact");
  const busy = pending || preparing;

  if (state?.success) {
    return (
      <div role="status" className="rounded-[2px] bg-accent-100 px-6 py-6 text-ink">
        <p className="type-display mb-2 text-[1.5rem] leading-tight">Danke, ist angekommen.</p>
        <p className="text-[16px] leading-[1.6]">Ich melde mich innerhalb von 24 Stunden.</p>
        <button
          onClick={onReset}
          className="mt-4 text-[15px] font-medium text-primary underline decoration-primary/30 underline-offset-[5px] hover:decoration-primary"
        >
          Neue Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form action={submit} className="space-y-6">
      <FormFeedback state={state} />
      <SpamProtectionFields />

      <div>
        <label
          htmlFor="name"
          className="type-label mb-2 block text-[12.5px] text-charcoal/80"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={busy}
          className="w-full rounded-[2px] border border-charcoal/30 bg-white px-4 py-3 text-[16.5px] text-charcoal hover:border-charcoal/50 focus:border-primary disabled:bg-pappe disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="type-label mb-2 block text-[12.5px] text-charcoal/80"
        >
          E-Mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={busy}
          className="w-full rounded-[2px] border border-charcoal/30 bg-white px-4 py-3 text-[16.5px] text-charcoal hover:border-charcoal/50 focus:border-primary disabled:bg-pappe disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="type-label mb-2 block text-[12.5px] text-charcoal/80"
        >
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={busy}
          className="w-full rounded-[2px] border border-charcoal/30 bg-white px-4 py-3 text-[16.5px] text-charcoal hover:border-charcoal/50 focus:border-primary resize-none disabled:bg-pappe disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Wird gesendet..." : "Nachricht senden"}
      </button>

      <p className="text-center text-sm text-charcoal/70">
        Ich melde mich innerhalb von 24 Stunden.
      </p>

      <RecaptchaNotice />
    </form>
  );
}

export function ContactForm() {
  const [key, setKey] = useState(0);
  return <ContactFormInner key={key} onReset={() => setKey((k) => k + 1)} />;
}
