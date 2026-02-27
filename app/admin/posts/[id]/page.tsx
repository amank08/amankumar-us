"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PostForm } from "@/components/admin/PostForm";
import { Id } from "@/convex/_generated/dataModel";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const posts = useQuery(api.posts.listAll);
  const post = posts?.find((p) => p._id === (id as Id<"posts">));

  if (posts === undefined) {
    return (
      <div>
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Post not found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Edit Post
      </h1>
      <PostForm post={post} />
    </div>
  );
}
