"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PostCard } from "@/components/blog/PostCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useThumbnailUrls } from "@/hooks/useThumbnailUrls";

export default function BlogPage() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.listPublishedPaginated,
    {},
    { initialNumItems: 10 }
  );

  const thumbnailUrls = useThumbnailUrls(results);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <AnimateOnScroll variant="fade-up">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Blog
        </h1>
        <p className="mt-2 text-text-secondary">
          Thoughts on software engineering, tech, and things I&apos;m learning.
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll variant="slide-up" delay={100} className="mt-10">
        {status === "LoadingFirstPage" ? (
          <p className="text-text-muted">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-text-muted">No posts yet. Check back soon!</p>
        ) : (
          <>
            <div className="space-y-1">
              {results.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  thumbnailUrl={
                    post.thumbnailId
                      ? thumbnailUrls[post.thumbnailId]
                      : undefined
                  }
                />
              ))}
            </div>

            {status === "CanLoadMore" && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => loadMore(10)}
                  className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:bg-surface hover:text-text-primary"
                >
                  Load more posts
                </button>
              </div>
            )}

            {status === "LoadingMore" && (
              <p className="mt-10 text-center text-sm text-text-muted">
                Loading more...
              </p>
            )}
          </>
        )}
      </AnimateOnScroll>
    </div>
  );
}
