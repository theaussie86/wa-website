"use client";

import { useActionState } from "react";
import { subscribeToWaitlist } from "./actions";
import { FormFeedback } from "@/app/_components/form-feedback";

export function SignupForm({ id }: { id?: string }) {
  const [state, action, pending] = useActionState(subscribeToWaitlist, null);

  return (
    <div id={id}>
      {state?.success ? (
        <FormFeedback state={state} variant="inverted" />
      ) : (
        <>
          <form action={action} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              name="email"
              placeholder="Deine E-Mail-Adresse"
              required
              className="flex-1 px-4 py-3 rounded-xs border-2 border-white/30 bg-white text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="submit"
              disabled={pending}
              className="btn-primary whitespace-nowrap disabled:opacity-50"
            >
              {pending ? "Wird eingetragen..." : "Kostenlos eintragen"}
            </button>
          </form>
          <div className="mt-2">
            <FormFeedback state={state} variant="inverted" />
          </div>
          <p className="text-white/40 text-xs mt-3 text-center">
            Nur relevante Inhalte rund um KI und Second Brain. Jederzeit
            abmelden.
          </p>
        </>
      )}
    </div>
  );
}
