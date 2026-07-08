import { Post } from "@/interfaces/post";
import fs from "fs";
import { load } from "js-yaml";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function matter(fileContents: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = frontmatterPattern.exec(fileContents);
  if (!match) {
    return { data: {}, content: fileContents };
  }
  const data = (load(match[1]) ?? {}) as Record<string, unknown>;
  return { data, content: fileContents.slice(match[0].length) };
}

function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...data, slug: realSlug, content } as Post;
  } catch {
    return null;
  }
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
