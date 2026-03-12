"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PostCard } from "@/components/blog/PostCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useThumbnailUrls } from "@/hooks/useThumbnailUrls";

/** Client-side blog listing with pagination. */
export function BlogListContent() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.listPublishedPaginated,
    {},
    { initialNumItems: 10 }
  );

  const thumbnailUrls = useThumbnailUrls(results);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <AnimateOnScroll variant="fade-up">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Blog
        </h1>
        <p className="mt-2 text-text-secondary">
          Thoughts on software engineering, tech, and things I&apos;m learning.
        </p>
      </AnimateOnScroll>

      <div className="mt-10">
        {status === "LoadingFirstPage" ? (
          <AnimateOnScroll variant="fade-up" delay={100}>
            <p className="text-text-muted">Loading...</p>
          </AnimateOnScroll>
        ) : results.length === 0 ? (
          <AnimateOnScroll variant="fade-up" delay={100}>
            <div className="flex flex-col items-center py-16 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-16 w-16 text-text-muted/40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              <p className="mt-4 text-lg font-medium text-text-secondary">No posts yet</p>
              <p className="mt-1 text-sm text-text-muted">New articles are on the way — check back soon.</p>
            </div>
          </AnimateOnScroll>
        ) : (
          <>
            <div className="space-y-1">
              {results.map((post, i) => (
                <AnimateOnScroll
                  key={post._id}
                  variant="slide-up"
                  delay={Math.min(i * 80, 400)}
                >
                  <PostCard
                    post={post}
                    thumbnailUrl={
                      post.thumbnailId
                        ? thumbnailUrls[post.thumbnailId]
                        : undefined
                    }
                  />
                </AnimateOnScroll>
              ))}
            </div>

            {status === "CanLoadMore" && (
              <AnimateOnScroll variant="fade-up" className="mt-10 text-center">
                <button
                  onClick={() => loadMore(10)}
                  className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:bg-surface hover:text-text-primary"
                >
                  Load more posts
                </button>
              </AnimateOnScroll>
            )}

            {status === "LoadingMore" && (
              <p className="mt-10 text-center text-sm text-text-muted">
                Loading more...
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
