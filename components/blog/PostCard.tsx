import Link from "next/link";
import { Doc } from "@/convex/_generated/dataModel";

export function PostCard({ post }: { post: Doc<"posts"> }) {
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
        className="-mx-5 block rounded-xl border border-transparent p-5 transition-all hover:border-border hover:bg-surface/50"
      >
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
      </Link>
    </article>
  );
}
