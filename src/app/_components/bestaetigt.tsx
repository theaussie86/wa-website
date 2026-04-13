import { Check } from "lucide-react";

export function Bestaetigt({ titel }: { titel: string }) {
  return (
    <main>
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl text-primary mb-4">
              Du bist dabei!
            </h1>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              Deine Anmeldung für <strong>{titel}</strong> ist bestätigt. Du
              hörst von uns, sobald es losgeht.
            </p>
            <a href="/" className="text-accent hover:underline text-sm">
              Zurück zur Startseite
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
