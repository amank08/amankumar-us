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
    <div className="mx-auto max-w-6xl px-6 py-20">
      <AnimateOnScroll variant="fade-up">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Projects
        </h1>
        <p className="mt-2 text-text-secondary">
          Things I&apos;ve built and worked on.
        </p>
      </AnimateOnScroll>

      <div className="mt-10">
        {status === "LoadingFirstPage" ? (
          <AnimateOnScroll variant="fade-up" delay={100}>
            <p className="text-text-muted">Loading...</p>
          </AnimateOnScroll>
        ) : results.length === 0 ? (
          <AnimateOnScroll variant="fade-up" delay={100}>
            <div className="flex flex-col items-center py-16 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-16 w-16 text-text-muted/40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
              <p className="mt-4 text-lg font-medium text-text-secondary">No projects yet</p>
              <p className="mt-1 text-sm text-text-muted">Projects are in the works — check back soon.</p>
            </div>
          </AnimateOnScroll>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((project, i) => (
                <AnimateOnScroll
                  key={project._id}
                  variant="slide-up"
                  delay={Math.min(i * 100, 500)}
                >
                  <ProjectCard
                    project={project}
                    thumbnailUrl={
                      project.thumbnailId
                        ? thumbnailUrls[project.thumbnailId]
                        : undefined
                    }
                  />
                </AnimateOnScroll>
              ))}
            </div>

            {status === "CanLoadMore" && (
              <AnimateOnScroll variant="fade-up" className="mt-10 text-center">
                <button
                  onClick={() => loadMore(9)}
                  className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:bg-surface hover:text-text-primary"
                >
                  Load more projects
                </button>
              </AnimateOnScroll>
            )}

            {status === "LoadingMore" && (
              <p className="mt-10 text-center text-sm text-text-muted">
                Loading more...
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
