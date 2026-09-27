import { Check } from "lucide-react";
import { Button } from "@/app/_components/button";
import { Sheet } from "@/app/_components/sheet";

export function Bestaetigt({
  titel,
  beschreibung,
}: {
  titel: string;
  beschreibung?: string;
}) {
  return (
    <main className="bg-pappe py-[clamp(88px,11vw,160px)]">
      <div className="mx-auto max-w-[640px] px-6">
        <Sheet className="py-[clamp(40px,6vw,64px)] pr-[clamp(24px,5vw,56px)] pl-[clamp(48px,7vw,80px)]">
          <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent-100">
            <Check aria-hidden="true" strokeWidth={2} className="h-6 w-6 text-accent-800" />
          </span>
          <h1 className="type-display mb-4 text-[clamp(2rem,4vw,3rem)] leading-[1]">Du bist dabei.</h1>
          <p className="mb-8 text-[17px] leading-[1.7] text-charcoal/85">
            {beschreibung ?? (
              <>
                Deine Anmeldung für <strong className="font-semibold text-primary">{titel}</strong> ist
                bestätigt. Du hörst von mir, sobald es losgeht.
              </>
            )}
          </p>
          <Button href="/" variant="text">
            Zurück zur Startseite
          </Button>
        </Sheet>
      </div>
    </main>
  );
}
