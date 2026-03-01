import { getAllPosts } from "@/lib/api";
import type { MetadataRoute } from "next";

const BASE_URL = "https://weissteiner-automation.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/leistungen`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ueber-mich`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...blogUrls,
  ];
}
