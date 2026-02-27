"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function ProjectsPage() {
  const projects = useQuery(api.projects.listPublished);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Projects
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Things I&apos;ve built and worked on.
      </p>

      <div className="mt-10">
        {projects === undefined ? (
          <p className="text-zinc-500">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-zinc-500">
            No projects yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
