import Link from "next/link";
import { Doc } from "@/convex/_generated/dataModel";

export function ProjectCard({ project }: { project: Doc<"projects"> }) {
  return (
    <article className="group rounded-lg border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600">
      <Link href={`/projects/${project.slug}`} className="block">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
