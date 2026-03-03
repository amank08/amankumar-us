"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PostCard } from "@/components/blog/PostCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useThumbnailUrls } from "@/hooks/useThumbnailUrls";

export default function Home() {
  const posts = useQuery(api.posts.listPublished);
  const projects = useQuery(api.projects.listPublished);

  const recentPosts = posts?.slice(0, 3);
  const featuredProjects = projects?.slice(0, 3);

  const postThumbnailUrls = useThumbnailUrls(recentPosts);
  const projectThumbnailUrls = useThumbnailUrls(featuredProjects);

  return (
    <>
      {/* ── Full-viewport cinematic hero ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-[length:200%_200%] bg-[linear-gradient(135deg,var(--hero-from)_0%,var(--hero-via)_40%,var(--hero-to)_70%,var(--hero-via)_100%)] animate-[gradient-shift_8s_ease_infinite]" />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:32px_32px]" />

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,8,0.6)_100%)]" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <p className="animate-text-reveal text-sm font-medium uppercase tracking-widest text-accent sm:text-base">
            Software Engineer
          </p>

          <h1 className="animate-text-reveal mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl [animation-delay:150ms]">
            Hey, I&apos;m{" "}
            <span className="bg-gradient-to-r from-[#4f8fff] to-[#70a5ff] bg-clip-text text-transparent">
              Aman Kumar
            </span>
          </h1>

          <p className="animate-text-reveal mx-auto mt-6 max-w-2xl text-lg text-text-secondary sm:text-xl [animation-delay:300ms]">
            Welcome to my corner of the internet. I&apos;m into tech, building
            things, and thinking out loud about ideas that interest me.
          </p>

          <div className="animate-text-reveal mt-10 flex flex-wrap justify-center gap-4 [animation-delay:450ms]">
            <Link
              href="/projects"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:shadow-accent/30"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/25"
            >
              Read Blog
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="animate-scroll-bounce flex flex-col items-center gap-2 text-text-muted">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Section divider ── */}
      <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── Recent Posts ── */}
      <section className="bg-background py-24">
        <AnimateOnScroll variant="slide-up" className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-text-primary">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="text-sm text-accent transition-colors hover:text-accent-hover"
            >
              View all &rarr;
            </Link>
          </div>
          {recentPosts === undefined ? (
            <p className="text-text-muted">Loading...</p>
          ) : recentPosts.length === 0 ? (
            <p className="text-text-muted">No posts yet. Check back soon!</p>
          ) : (
            <div className="space-y-1">
              {recentPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  thumbnailUrl={
                    post.thumbnailId
                      ? postThumbnailUrls[post.thumbnailId]
                      : undefined
                  }
                />
              ))}
            </div>
          )}
        </AnimateOnScroll>
      </section>

      {/* ── Section divider ── */}
      <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── Featured Projects ── */}
      <section className="bg-surface-alt py-24">
        <AnimateOnScroll variant="slide-up" className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-text-primary">
              Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-accent transition-colors hover:text-accent-hover"
            >
              View all &rarr;
            </Link>
          </div>
          {featuredProjects === undefined ? (
            <p className="text-text-muted">Loading...</p>
          ) : featuredProjects.length === 0 ? (
            <p className="text-text-muted">
              No projects yet. Check back soon!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  thumbnailUrl={
                    project.thumbnailId
                      ? projectThumbnailUrls[project.thumbnailId]
                      : undefined
                  }
                />
              ))}
            </div>
          )}
        </AnimateOnScroll>
      </section>
    </>
  );
}
