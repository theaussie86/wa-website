import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import DateFormatter from "@/app/_components/date-formatter";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: "Insights zu Prozessautomatisierung, KI und digitaler Transformation im Mittelstand.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
              Blog
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed">
              Gedanken zu Automatisierung, KI und wie mittelständische Unternehmen
              Technologie sinnvoll einsetzen können.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section bg-primary/5">
        <div className="container mx-auto px-5">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-sm shadow-sm border border-primary/10 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {post.coverImage && (
                    <Link href={`/blog/${post.slug}`} className="block relative h-48">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  )}
                  <div className="p-6">
                    <div className="text-sm text-charcoal/50 mb-2">
                      <DateFormatter dateString={post.date} />
                    </div>
                    <h2 className="font-serif text-xl text-primary mb-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-charcoal/70 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-block mt-4 text-accent hover:text-accent-600 font-medium text-sm"
                      aria-label={`Weiterlesen: ${post.title}`}
                    >
                      Weiterlesen →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-charcoal/60">
                Noch keine Artikel vorhanden. Bald gibt es hier mehr zu lesen.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
