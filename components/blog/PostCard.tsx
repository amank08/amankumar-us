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
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-400">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {post.excerpt}
          </p>
        )}
        <div className="mt-3 flex items-center gap-3">
          {date && (
            <time className="text-sm text-zinc-500 dark:text-zinc-500">
              {date}
            </time>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
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
