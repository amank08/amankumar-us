"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function AdminDashboard() {
  const posts = useQuery(api.posts.listAll);
  const projects = useQuery(api.projects.listAll);

  const publishedPosts = posts?.filter((p) => p.isPublished).length ?? 0;
  const draftPosts = posts?.filter((p) => !p.isPublished).length ?? 0;
  const publishedProjects = projects?.filter((p) => p.isPublished).length ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Admin Dashboard
      </h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">Published Posts</p>
          <p className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            {publishedPosts}
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">Draft Posts</p>
          <p className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            {draftPosts}
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">Published Projects</p>
          <p className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            {publishedProjects}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          New Post
        </Link>
        <Link
          href="/admin/projects/new"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          New Project
        </Link>
      </div>
    </div>
  );
}
