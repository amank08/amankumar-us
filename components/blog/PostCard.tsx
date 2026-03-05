import Link from "next/link";
import Image from "next/image";
import { Doc } from "@/convex/_generated/dataModel";

interface PostCardProps {
  post: Doc<"posts">;
  thumbnailUrl?: string | null;
}

/** Renders a blog post card with thumbnail, title, excerpt, and tags. */
export function PostCard({ post, thumbnailUrl }: PostCardProps) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="-mx-5 flex flex-col overflow-hidden rounded-xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface/50 hover:shadow-[0_4px_30px_rgba(79,143,255,0.1)] motion-reduce:hover:translate-y-0 motion-reduce:transition-none sm:flex-row sm:items-center sm:gap-5 sm:p-5"
      >
        {thumbnailUrl && (
          <div className="relative aspect-[3/1] w-full shrink-0 overflow-hidden sm:order-2 sm:aspect-auto sm:h-20 sm:w-[120px] sm:rounded-lg">
            <Image
              src={thumbnailUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 120px"
            />
          </div>
        )}
        <div className="min-w-0 flex-1 p-5 sm:order-1 sm:p-0">
          <h2 className="text-xl font-semibold text-text-primary transition-colors group-hover:text-accent">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 line-clamp-2 text-text-secondary">
              {post.excerpt}
            </p>
          )}
          <div className="mt-3 flex items-center gap-3">
            {date && <time className="text-sm text-text-muted">{date}</time>}
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
