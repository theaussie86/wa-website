"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { reauthenticateByEmail } from "./actions";
import { FormFeedback } from "@/app/_components/form-feedback";

export function GateForm() {
  const [state, action, pending] = useActionState(reauthenticateByEmail, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  return (
    <div className="bg-accent/10 border border-accent/30 rounded-xs p-6 md:p-8">
      <p className="text-charcoal/80 font-medium mb-1">
        Du hast dich bereits eingetragen?
      </p>
      <p className="text-charcoal/60 text-sm mb-4">
        E-Mail eingeben um fortzufahren.
      </p>
      <form action={action} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          placeholder="Deine E-Mail-Adresse"
          required
          className="flex-1 px-4 py-3 rounded-xs border border-charcoal/20 bg-white text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="submit"
          disabled={pending}
          className="btn-primary whitespace-nowrap disabled:opacity-50"
        >
          {pending ? "Wird geprüft..." : "Weiter zur Anleitung"}
        </button>
      </form>
      <div className="mt-2">
        <FormFeedback state={state} />
      </div>
    </div>
  );
}
