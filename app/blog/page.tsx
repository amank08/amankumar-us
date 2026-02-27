"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PostCard } from "@/components/blog/PostCard";

export default function BlogPage() {
  const posts = useQuery(api.posts.listPublished);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Blog
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Thoughts on software engineering, tech, and things I&apos;m learning.
      </p>

      <div className="mt-10">
        {posts === undefined ? (
          <p className="text-zinc-500">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-zinc-500">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
