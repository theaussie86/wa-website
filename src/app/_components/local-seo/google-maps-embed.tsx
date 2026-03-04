interface GoogleMapsEmbedProps {
  title?: string;
  className?: string;
}

export function GoogleMapsEmbed({
  title = "Standort: Memmingen, Allgäu",
  className,
}: GoogleMapsEmbedProps) {
  return (
    <section className={`section ${className ?? ""}`}>
      <div className="container mx-auto px-5">
        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 text-center">
          {title}
        </h2>
        <div className="aspect-video rounded-sm overflow-hidden shadow-md max-w-4xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2679.8847!2d10.1781!3d48.0073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c4f2e0e0e0e0e%3A0x0!2sMemmingen%2C%20Germany!5e0!3m2!1sde!2sde!4v1709000000000!5m2!1sde!2sde"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Weissteiner Automation Standort - Memmingen, Allgäu"
          />
        </div>
        <p className="text-center text-charcoal/60 mt-4 max-w-2xl mx-auto">
          Im Herzen des Allgäus — vor Ort für persönliche Beratung, remote für
          effiziente Zusammenarbeit.
        </p>
      </div>
    </section>
  );
}
