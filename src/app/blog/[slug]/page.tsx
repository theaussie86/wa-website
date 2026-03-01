import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { SITE_NAME, CAL_LINK } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import DateFormatter from "@/app/_components/date-formatter";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    return {};
  }

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

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <article>
        {/* Header */}
        <section className="section pb-8">
          <div className="container mx-auto px-5">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-accent hover:text-accent-600 mb-8"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Zurück zum Blog
              </Link>
              <div className="text-sm text-charcoal/50 mb-4">
                <DateFormatter dateString={post.date} />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-charcoal/70">{post.excerpt}</p>
              )}
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="container mx-auto px-5 mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  className="rounded-sm object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <section className="pb-16">
          <div className="container mx-auto px-5">
            <div
              className="max-w-3xl mx-auto prose prose-lg prose-primary prose-headings:font-serif prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-accent/10">
          <div className="container mx-auto px-5">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-2xl text-primary mb-4">
                Hat Ihnen dieser Artikel geholfen?
              </h2>
              <p className="text-charcoal/70 mb-6">
                Wenn Sie darüber nachdenken, wie Automatisierung Ihrem Unternehmen
                helfen könnte, lassen Sie uns sprechen.
              </p>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Kennenlernen vereinbaren
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
