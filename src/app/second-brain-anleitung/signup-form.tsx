"use client";

import { useActionState } from "react";
import { subscribeToWaitlist } from "./actions";

export function SignupForm({ id }: { id?: string }) {
  const [state, action, pending] = useActionState(subscribeToWaitlist, null);

  return (
    <div id={id}>
      {state?.success ? (
        <p className="text-white bg-white/10 rounded-xs px-6 py-4 text-center">
          {state.message}
        </p>
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
          {state?.message && (
            <p className="text-red-300 text-sm mt-2 text-center">{state.message}</p>
          )}
          <p className="text-white/40 text-xs mt-3 text-center">
            Nur relevante Inhalte rund um KI und Second Brain. Jederzeit
            abmelden.
          </p>
        </>
      )}
    </div>
  );
}
