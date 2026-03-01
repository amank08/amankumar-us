"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export default function ProjectsPage() {
  const projects = useQuery(api.projects.listPublished);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <AnimateOnScroll variant="fade-up">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Projects
        </h1>
        <p className="mt-2 text-text-secondary">
          Things I&apos;ve built and worked on.
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll variant="slide-up" delay={100} className="mt-10">
        {projects === undefined ? (
          <p className="text-text-muted">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-text-muted">
            No projects yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </AnimateOnScroll>
    </div>
  );
}
