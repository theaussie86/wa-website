import Image from "next/image";
import Link from "next/link";
import { LocalSeoPageData, getTestimonialsForPage } from "@/lib/local-seo-data";
import { LocalHero } from "./local-hero";
import { GoogleMapsEmbed } from "./google-maps-embed";
import { LocalBusinessSchema } from "./local-business-schema";
import { CTASection } from "@/app/_components/cta-section";

interface LocalSeoPageProps {
  data: LocalSeoPageData;
}

export function LocalSeoPage({ data }: LocalSeoPageProps) {
  const testimonials = getTestimonialsForPage(data);

  return (
    <main>
      {/* Schema Markup */}
      <LocalBusinessSchema pageData={data} />

      {/* Hero */}
      <LocalHero
        trustBadges={data.hero.trustBadges}
        h1={data.hero.h1}
        subheadline={data.hero.subheadline}
      />

      {/* Introduction */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl text-primary mb-6">
              {data.introduction.title}
            </h2>
            <div className="space-y-4">
              {data.introduction.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-charcoal/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl text-primary mb-4">
                {data.serviceHighlights.title}
              </h2>
              <p className="text-lg text-charcoal/70 mb-6">
                {data.serviceHighlights.description}
              </p>
              <ul className="space-y-3">
                {data.serviceHighlights.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-charcoal/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-sm aspect-square flex items-center justify-center p-4 shadow-sm border border-primary/5">
              <Image
                src={data.serviceHighlights.image.src}
                alt={data.serviceHighlights.image.alt}
                width={600}
                height={600}
                className="w-full h-auto object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section bg-warm-white">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-3xl text-primary mb-8 text-center">
            {data.useCases.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {data.useCases.items.map((useCase, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-primary/10 rounded-sm"
              >
                <p className="text-charcoal/80">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (if available for this region) */}
      {testimonials.length > 0 && (
        <section className="section">
          <div className="container mx-auto px-5">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                Das sagen Kunden aus der Region
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                Langfristige Partnerschaften, die funktionieren.
              </p>
            </div>

            <div className={`grid gap-8 max-w-4xl mx-auto ${testimonials.length === 1 ? "" : "md:grid-cols-2"}`}>
              {testimonials.map((testimonial, index) => (
                <Link
                  key={index}
                  href={testimonial.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 bg-white border border-primary/10 rounded-sm hover:border-accent/50 hover:shadow-md transition-all flex flex-col cursor-pointer"
                >
                  {/* Quote Icon */}
                  <div className="text-accent mb-4">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-charcoal/80 mb-6 flex-grow">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author & Company */}
                  <div className="border-t border-primary/10 pt-4 mt-auto">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-primary">
                          {testimonial.author}
                        </p>
                        <span className="text-sm text-charcoal/60 group-hover:text-accent transition-colors inline-flex items-center gap-1">
                          {testimonial.company}
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="relative h-8 w-20">
                        <Image
                          src={testimonial.logo}
                          alt={`${testimonial.company} Logo`}
                          fill
                          className="object-contain object-right"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regional Cities */}
      <section className="section bg-primary text-white">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-white mb-4">
              Aktiv in der Region {data.region.name}
            </h2>
            <p className="text-lg text-primary-200 mb-6">
              {data.slug === "softwareentwicklung-dach"
                ? "Remote-Zusammenarbeit mit Unternehmen in ganz DACH — persönliche Treffen nach Vereinbarung."
                : "Vor-Ort-Termine möglich in der gesamten Region. Remote-Zusammenarbeit selbstverständlich auch."}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.region.cities.map((city, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-primary-400 rounded-sm text-primary-100"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <GoogleMapsEmbed />

      {/* Related Pages / Internal Links */}
      <section className="section bg-warm-white">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-2xl text-primary mb-8 text-center">
            Weitere Leistungen
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.relatedPages.map((page, index) => (
              <Link
                key={index}
                href={page.path}
                className="p-6 bg-white border border-primary/10 rounded-sm hover:border-accent/50 hover:shadow-md transition-all group"
              >
                <h3 className="font-serif text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                  {page.title}
                </h3>
                <p className="text-sm text-charcoal/60">{page.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </main>
  );
}
