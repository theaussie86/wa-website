import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/app/_components/animations";
import { getAllTestimonials } from "@/lib/testimonials";

const testimonials = getAllTestimonials();

export function Testimonials() {
  return (
    <section className="section bg-warm-white">
      <div className="container mx-auto px-5">
        <FadeIn className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
            Das sagen meine Kunden
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Langfristige Partnerschaften, die funktionieren.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={index * 0.1}>
            <Link
              href={testimonial.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-white border border-primary/10 rounded-xs hover:border-accent/50 hover:shadow-md transition-all flex flex-col cursor-pointer"
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
              <blockquote className="text-charcoal/80 mb-6 grow">
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
                  {testimonial.logo && (
                    <div className="relative h-8 w-20">
                      <Image
                        src={testimonial.logo}
                        alt={`${testimonial.company} Logo`}
                        fill
                        className="object-contain object-right"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
