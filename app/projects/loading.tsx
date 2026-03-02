function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1 space-y-3">
          {/* Title */}
          <div className="h-5 w-3/4 rounded animate-shimmer" />
          {/* Description line 1 */}
          <div className="h-3.5 w-full rounded animate-shimmer" />
          {/* Description line 2 */}
          <div className="h-3.5 w-2/3 rounded animate-shimmer" />
        </div>
        {/* Thumbnail placeholder */}
        <div className="hidden h-20 w-20 shrink-0 rounded-lg animate-shimmer sm:block" />
      </div>
      {/* Tech stack pills */}
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-16 rounded-full animate-shimmer" />
        <div className="h-5 w-20 rounded-full animate-shimmer" />
        <div className="h-5 w-14 rounded-full animate-shimmer" />
      </div>
    </div>
  );
}

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <div>
        <div className="h-8 w-32 rounded animate-shimmer" />
        <div className="mt-3 h-4 w-64 rounded animate-shimmer" />
      </div>

      {/* Project grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
