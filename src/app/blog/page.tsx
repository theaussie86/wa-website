import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import DateFormatter from "@/app/_components/date-formatter";
import { PageHead } from "@/app/_components/page-head";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description:
    "Artikel über KI im Betrieb, Automatisierung und darüber, wie Arbeit gut wird, auch wenn wenig Zeit ist.",
};

// Die Übersicht ist das Inhaltsverzeichnis: eine Zeile pro Artikel, keine Karten.
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <PageHead
        title="Aufgeschrieben."
        lead={
          <p>
            Artikel über KI im Betrieb, Automatisierung und darüber, wie Arbeit gut wird, auch wenn
            wenig Zeit ist.
          </p>
        }
      />

      <section className="bg-white py-[clamp(72px,9vw,128px)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          {posts.length > 0 ? (
            <ol className="border-t-2 border-primary">
              {posts.map((post) => (
                <li key={post.slug} className="group relative border-b border-primary/15">
                  <article className="grid gap-5 py-8 md:grid-cols-[150px_minmax(0,1fr)_220px] md:gap-10 lg:grid-cols-[170px_minmax(0,1fr)_260px]">
                    <p className="type-label pt-1.5 text-[12.5px] text-charcoal/75">
                      <DateFormatter dateString={post.date} />
                    </p>
                    <div>
                      <h2 className="type-display mb-3 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.06] text-primary">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="decoration-accent decoration-2 underline-offset-[5px] after:absolute after:inset-0 group-hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="line-clamp-3 max-w-[40rem] text-[16.5px] leading-[1.65] text-charcoal/80">
                        {post.excerpt}
                      </p>
                    </div>
                    {post.coverImage && (
                      <div className="relative order-first aspect-[1300/630] overflow-hidden rounded-[2px] bg-pappe md:order-none">
                        <Image
                          src={post.coverImage}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 260px, (min-width: 768px) 220px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </article>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-[18px] text-charcoal/80">
              Noch keine Artikel. Bald steht hier mehr.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
