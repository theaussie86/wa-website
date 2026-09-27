import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import DateFormatter from "@/app/_components/date-formatter";
import { ArticleJsonLd } from "@/app/_components/json-ld";
import AuthorBox from "@/app/_components/author-box";
import { PageHead } from "@/app/_components/page-head";
import { CTASection } from "@/app/_components/cta-section";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

// Unbekannte Slugs lehnt der Router ab, nicht der Seitenrumpf: `notFound()`
// von hier aus liefert die leere Next-Fehlerhülle statt der Not-Found-Seite,
// siehe docs/adr/0003-reject-unknown-dynamic-params-at-the-router.md. Tragfähig,
// weil `_posts/` im Image liegt und ein neuer Artikel ohnehin einen neuen Build
// bedeutet - die Liste unten ist damit vollständig.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Durch dynamicParams = false unerreichbar, aber getPostBySlug gibt
  // Post | null zurück - das hier ist die Verengung, nicht der 404-Weg.
  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content || "");

  const baseUrl = "https://weissteiner-automation.com";

  return (
    <main>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt || ""}
        publishedTime={post.date}
        authorName={post.author?.name || "Christoph Weissteiner"}
        url={`${baseUrl}/blog/${slug}`}
        imageUrl={post.coverImage}
      />
      <article>
        <PageHead
          size="md"
          titleClassName="max-w-[24ch]"
          before={
            <p className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-white/75">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 font-medium text-white underline decoration-white/40 underline-offset-[5px] hover:decoration-white"
              >
                <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                Alle Artikel
              </Link>
              <span className="type-label text-[12.5px]">
                <DateFormatter dateString={post.date} />
              </span>
            </p>
          }
          title={post.title}
          lead={post.excerpt ? <p>{post.excerpt}</p> : undefined}
        />

        {post.coverImage && (
          <div className="bg-white px-6 pt-[clamp(48px,6vw,80px)] lg:px-10">
            <div className="relative mx-auto aspect-[1300/630] max-w-[960px] overflow-hidden rounded-[2px] bg-pappe">
              <Image
                src={post.coverImage}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <section className="bg-white px-6 pt-[clamp(40px,5vw,64px)] pb-[clamp(72px,9vw,120px)] lg:px-10">
          <div
            className="prose prose-lg mx-auto max-w-[68ch] text-[18px]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>

        <AuthorBox
          name={post.author?.name || "Christoph Weissteiner"}
          picture={post.author?.picture}
        />
      </article>

      <CTASection
        title="Klingt das nach deinem Betrieb?"
        lead="Nenn mir die Aufgabe, an die du beim Lesen gedacht hast. In 15 Minuten wissen wir, ob sie sich als erste eignet."
      />
    </main>
  );
}
