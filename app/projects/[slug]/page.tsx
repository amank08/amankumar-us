"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import Link from "next/link";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = useQuery(api.projects.getBySlug, { slug });

  if (project === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-2xl font-bold text-text-primary">
          Project not found
        </h1>
        <Link
          href="/projects"
          className="mt-4 inline-block text-sm text-accent transition-colors hover:text-accent-hover"
        >
          &larr; Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <AnimateOnScroll variant="fade-up">
        <Link
          href="/projects"
          className="text-sm text-accent transition-colors hover:text-accent-hover"
        >
          &larr; Back to projects
        </Link>

        <article className="mt-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-3 text-lg text-text-secondary">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-4">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface"
                >
                  Source Code
                </a>
              )}
            </div>
          </header>

          {project.longDescription && (
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap">
                {project.longDescription}
              </div>
            </div>
          )}
        </article>
      </AnimateOnScroll>
    </div>
  );
}
