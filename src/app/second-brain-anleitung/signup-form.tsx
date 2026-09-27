"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleEmailSubmit } from "./actions";
import { FormFeedback } from "@/app/_components/form-feedback";
import {
  RecaptchaNotice,
  SpamProtectionFields,
  useSpamProtectedAction,
} from "@/app/_components/spam-protection";

export function SignupForm({ id }: { id?: string }) {
  const [state, action, pending] = useActionState(handleEmailSubmit, null);
  const [submit, preparing] = useSpamProtectedAction(action, "guide_signup");
  const busy = pending || preparing;
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  return (
    <div id={id}>
      {state?.success && !state.redirect ? (
        <FormFeedback state={state} variant="inverted" />
      ) : (
        <>
          <form action={submit} className="flex flex-col sm:flex-row gap-3">
            <SpamProtectionFields />
            <label htmlFor={`${id ?? "signup"}-email`} className="sr-only">
              E-Mail-Adresse
            </label>
            <input
              id={`${id ?? "signup"}-email`}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Deine E-Mail-Adresse"
              required
              className="min-w-0 flex-1 rounded-[4px] border border-white/60 bg-primary-600 px-4 py-4 text-[16.5px] text-white placeholder:text-white/70 hover:border-white"
            />
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-[4px] bg-white px-7 py-4 text-[16.5px] font-semibold text-primary transition-colors hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Wird geprüft..." : "Kostenlos eintragen"}
            </button>
          </form>
          <div className="mt-2">
            <FormFeedback state={state} variant="inverted" />
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.55] text-white/75">
            Nur relevante Inhalte rund um KI und Second Brain. Jederzeit
            abmelden.
          </p>
          <RecaptchaNotice variant="inverted" />
        </>
      )}
    </div>
  );
}
