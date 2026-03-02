import Link from "next/link";
import Image from "next/image";
import { Doc } from "@/convex/_generated/dataModel";

interface PostCardProps {
  post: Doc<"posts">;
  thumbnailUrl?: string | null;
}

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
        className="-mx-5 flex items-center gap-5 rounded-xl border border-transparent p-5 transition-all duration-300 hover:border-border hover:bg-surface/50 hover:shadow-[0_0_20px_rgba(79,143,255,0.06)]"
      >
        <div className="min-w-0 flex-1">
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

        {thumbnailUrl && (
          <div className="relative hidden h-20 w-[120px] shrink-0 overflow-hidden rounded-lg sm:block">
            <Image
              src={thumbnailUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
        )}
      </Link>
    </article>
  );
}
