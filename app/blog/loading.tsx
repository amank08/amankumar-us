function PostCardSkeleton() {
  return (
    <div className="-mx-5 flex items-center gap-5 rounded-xl border border-transparent p-5">
      <div className="min-w-0 flex-1 space-y-3">
        {/* Title */}
        <div className="h-5 w-3/4 rounded animate-shimmer" />
        {/* Excerpt line 1 */}
        <div className="h-4 w-full rounded animate-shimmer" />
        {/* Excerpt line 2 */}
        <div className="h-4 w-2/3 rounded animate-shimmer" />
        {/* Date + tags */}
        <div className="flex items-center gap-3 pt-1">
          <div className="h-3.5 w-28 rounded animate-shimmer" />
          <div className="h-5 w-16 rounded-full animate-shimmer" />
          <div className="h-5 w-14 rounded-full animate-shimmer" />
        </div>
      </div>
      {/* Thumbnail placeholder */}
      <div className="hidden h-20 w-[120px] shrink-0 rounded-lg animate-shimmer sm:block" />
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <div>
        <div className="h-8 w-24 rounded animate-shimmer" />
        <div className="mt-3 h-4 w-80 rounded animate-shimmer" />
      </div>

      {/* Post list */}
      <div className="mt-10 space-y-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
