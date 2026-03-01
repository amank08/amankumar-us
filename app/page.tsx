"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LogoA, LogoB, LogoC, LogoD, LogoE, LogoF, LogoG, LogoH } from "@/components/ui/Logo";
import { PostCard } from "@/components/blog/PostCard";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function Home() {
  const posts = useQuery(api.posts.listPublished);
  const projects = useQuery(api.projects.listPublished);

  const recentPosts = posts?.slice(0, 3);
  const featuredProjects = projects?.slice(0, 3);

  return (
    <>
      {/* Full-width gradient hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-hero-from via-hero-via to-hero-to">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-[length:24px_24px]" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32">
          <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Hey, I&apos;m Aman Kumar
          </h1>
          <p className="animate-fade-in-up mt-6 max-w-2xl text-lg text-blue-100/80 [animation-delay:100ms]">
            Welcome to my corner of the internet. I write about software
            engineering, share projects I&apos;m working on, and think out loud.
          </p>
          <div className="animate-fade-in-up mt-8 flex gap-4 [animation-delay:200ms]">
            <Link
              href="/projects"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-lg transition-colors hover:bg-blue-50"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Logo Options — temporary, remove after choosing */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-4">
        <h2 className="mb-2 text-lg font-semibold text-text-primary">
          Pick a logo
        </h2>
        <p className="mb-6 text-sm text-text-muted">
          Which one should we keep? Tell me A, B, C, or D.
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { name: "A — Flowing script", Component: LogoA },
            { name: "B — Bold monoline", Component: LogoB },
            { name: "C — Minimal lowercase", Component: LogoC },
            { name: "D — Calligraphic swash", Component: LogoD },
            { name: "E — Geometric sans", Component: LogoE },
            { name: "F — Stacked monogram", Component: LogoF },
            { name: "G — Rounded bubble", Component: LogoG },
            { name: "H — Ligature modern", Component: LogoH },
          ].map(({ name, Component }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface/50 p-4 transition-colors hover:border-accent/50"
            >
              <Component className="h-16 w-16" />
              <span className="text-center text-xs font-medium text-text-secondary">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Content sections */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Recent Posts */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
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
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* Featured Projects */}
        <section>
          <div className="mb-6 flex items-center justify-between">
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
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
