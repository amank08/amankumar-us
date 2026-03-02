"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PostCard } from "@/components/blog/PostCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export default function BlogPage() {
  const posts = useQuery(api.posts.listPublished);

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
        {posts === undefined ? (
          <p className="text-text-muted">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-text-muted">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-1">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </AnimateOnScroll>
    </div>
  );
}
