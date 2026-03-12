import type { Metadata } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { BlogPostContent } from "@/components/blog/BlogPostContent";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const BASE_URL = "https://amankumar.us";

/** Generates dynamic metadata for individual blog posts (OG, Twitter Card, canonical). */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await convex.query(api.posts.getBySlug, { slug });

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description =
    post.excerpt || post.content.slice(0, 160).replace(/\n/g, " ");

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : undefined,
      modifiedTime: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : undefined,
      tags: post.tags ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

/** Blog post page — server component wrapper for metadata + client content. */
export default function BlogPostPage() {
  return <BlogPostContent />;
}
