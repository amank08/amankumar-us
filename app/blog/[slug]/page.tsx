"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CommentSection } from "@/components/blog/CommentSection";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import Link from "next/link";
import Image from "next/image";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = useQuery(api.posts.getBySlug, { slug });
  const thumbnailUrl = useQuery(
    api.files.getUrl,
    post?.thumbnailId ? { storageId: post.thumbnailId } : "skip"
  );

  if (post === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-2xl font-bold text-text-primary">
          Post not found
        </h1>
        <Link
          href="/blog"
          className="mt-4 inline-block text-sm text-accent transition-colors hover:text-accent-hover"
        >
          &larr; Back to blog
        </Link>
      </div>
    );
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <AnimateOnScroll variant="fade-up">
        <Link
          href="/blog"
          className="text-sm text-accent transition-colors hover:text-accent-hover"
        >
          &larr; Back to blog
        </Link>

        <article className="mt-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              {date && (
                <time className="text-sm text-text-muted">{date}</time>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {thumbnailUrl && (
            <div className="relative mb-8 aspect-[768/400] w-full overflow-hidden rounded-xl">
              <Image
                src={thumbnailUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          <MarkdownContent content={post.content} />
        </article>
      </AnimateOnScroll>

      <AnimateOnScroll variant="slide-up" delay={150}>
        <CommentSection postId={post._id} />
      </AnimateOnScroll>
    </div>
  );
}
