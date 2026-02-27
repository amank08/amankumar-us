"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PostCard } from "@/components/blog/PostCard";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function Home() {
  const posts = useQuery(api.posts.listPublished);
  const projects = useQuery(api.projects.listPublished);

  const recentPosts = posts?.slice(0, 3);
  const featuredProjects = projects?.slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Hey, I&apos;m Aman Kumar
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Welcome to my corner of the internet. I write about software
          engineering, share projects I&apos;m working on, and think out loud.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/projects"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Read Blog
          </Link>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Recent Posts
          </h2>
          <Link
            href="/blog"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View all &rarr;
          </Link>
        </div>
        {recentPosts === undefined ? (
          <p className="text-zinc-500">Loading...</p>
        ) : recentPosts.length === 0 ? (
          <p className="text-zinc-500">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-8">
            {recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Projects */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View all &rarr;
          </Link>
        </div>
        {featuredProjects === undefined ? (
          <p className="text-zinc-500">Loading...</p>
        ) : featuredProjects.length === 0 ? (
          <p className="text-zinc-500">No projects yet. Check back soon!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
