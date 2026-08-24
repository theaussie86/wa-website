import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/app/_components/animations";
import { getTestimonialsById } from "@/lib/testimonials";

const [featured] = getTestimonialsById(["easylife"]);
const cards = getTestimonialsById(["florian-heuer", "wachmacherei", "wimo"]);

function splitAuthor(author: string): { name: string; role: string } {
  const [name, ...rest] = author.split(",");
  return { name: name.trim(), role: rest.join(",").trim() };
}

export function Testimonials() {
  const lead = splitAuthor(featured.author);

  return (
    <section className="py-[clamp(64px,9vw,108px)]">
      <div className="mx-auto max-w-[1180px] px-6">
        <FadeIn className="mb-[52px] max-w-[640px]">
          <p className="mb-4 font-sans text-[13.5px] font-bold uppercase tracking-[0.14em] text-accent-600">
            Wer schon mit mir arbeitet
          </p>
          <h2 className="mb-4 text-balance font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.12] tracking-normal text-primary">
            Inhaber, die Arbeit abgegeben haben und sie nicht zurückbekommen.
          </h2>
          <p className="font-sans text-[17.5px] leading-[1.7] text-charcoal/80">
            Die Zitate stammen aus Projekten vor dem KI-Mitarbeiter. Was sie belegen, ist
            das Gleiche: abgegeben, und es kommt nicht schlechter zurück.
          </p>
        </FadeIn>

        {/* Featured Statement */}
        <FadeIn>
          <figure className="m-0 mb-14 max-w-[940px]">
            <blockquote className="m-0 mb-6 text-pretty font-serif text-[clamp(1.4rem,2.4vw,2.05rem)] font-normal leading-[1.4] text-primary">
              „{featured.quote}“
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-4 font-sans text-base text-charcoal">
              <span aria-hidden="true" className="inline-block h-0.5 w-11 bg-accent" />
              <span>
                <span className="font-bold text-primary">{lead.name}</span>
                {lead.role ? `, ${lead.role}` : ""} · {featured.company}
              </span>
              {featured.logo && (
                <Image
                  src={featured.logo}
                  alt={`${featured.company} Logo`}
                  width={90}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
              )}
            </figcaption>
          </figure>
        </FadeIn>

        {/* Weitere Stimmen */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((testimonial, index) => {
            const { name, role } = splitAuthor(testimonial.author);
            return (
              <FadeIn key={testimonial.id} delay={index * 0.1}>
                <Link
                  href={testimonial.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-5 rounded-xs border border-primary/15 bg-white p-7 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-[3px] hover:border-accent"
                >
                  <blockquote className="m-0 flex-1 font-sans text-[15.5px] leading-[1.7] text-charcoal/80">
                    „{testimonial.quote}“
                  </blockquote>
                  <figcaption className="flex items-center justify-between gap-3 border-t border-primary/10 pt-4 font-sans text-[14.5px]">
                    <span>
                      <span className="font-bold text-primary">{name}</span>
                      {role ? `, ${role}` : ""}
                      <br />
                      {testimonial.company}
                    </span>
                    {testimonial.logo && (
                      <Image
                        src={testimonial.logo}
                        alt={`${testimonial.company} Logo`}
                        width={80}
                        height={26}
                        className="h-[26px] w-auto shrink-0 object-contain"
                      />
                    )}
                  </figcaption>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
