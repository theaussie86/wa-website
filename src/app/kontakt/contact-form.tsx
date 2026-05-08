"use client";

import { useActionState, useState } from "react";
import { sendContactMessage } from "./actions";
import { FormFeedback } from "@/app/_components/form-feedback";

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState(sendContactMessage, null);

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xs p-6 text-center">
        <p className="text-green-800 font-medium mb-2">
          Vielen Dank für Ihre Nachricht!
        </p>
        <p className="text-green-700 text-sm">
          Ich melde mich innerhalb von 24 Stunden.
        </p>
        <button
          onClick={onReset}
          className="mt-4 text-sm text-green-600 underline hover:no-underline"
        >
          Neue Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <FormFeedback state={state} />

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={pending}
          className="w-full px-4 py-3 border border-primary/20 rounded-xs focus:outline-hidden focus:ring-2 focus:ring-accent/50 focus:border-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          E-Mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={pending}
          className="w-full px-4 py-3 border border-primary/20 rounded-xs focus:outline-hidden focus:ring-2 focus:ring-accent/50 focus:border-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={pending}
          className="w-full px-4 py-3 border border-primary/20 rounded-xs focus:outline-hidden focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Wird gesendet..." : "Nachricht senden"}
      </button>

      <p className="text-center text-sm text-charcoal/60">
        Ich melde mich innerhalb von 24 Stunden.
      </p>
    </form>
  );
}

export function ContactForm() {
  const [key, setKey] = useState(0);
  return <ContactFormInner key={key} onReset={() => setKey((k) => k + 1)} />;
}
