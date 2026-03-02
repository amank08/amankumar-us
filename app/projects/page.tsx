"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useThumbnailUrls } from "@/hooks/useThumbnailUrls";

export default function ProjectsPage() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.projects.listPublishedPaginated,
    {},
    { initialNumItems: 9 }
  );

  const thumbnailUrls = useThumbnailUrls(results);

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
        {status === "LoadingFirstPage" ? (
          <p className="text-text-muted">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-text-muted">
            No projects yet. Check back soon!
          </p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  thumbnailUrl={
                    project.thumbnailId
                      ? thumbnailUrls[project.thumbnailId]
                      : undefined
                  }
                />
              ))}
            </div>

            {status === "CanLoadMore" && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => loadMore(9)}
                  className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:bg-surface hover:text-text-primary"
                >
                  Load more projects
                </button>
              </div>
            )}

            {status === "LoadingMore" && (
              <p className="mt-10 text-center text-sm text-text-muted">
                Loading more...
              </p>
            )}
          </>
        )}
      </AnimateOnScroll>
    </div>
  );
}
