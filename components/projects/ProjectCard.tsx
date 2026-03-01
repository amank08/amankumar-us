import Link from "next/link";
import { Doc } from "@/convex/_generated/dataModel";

export function ProjectCard({ project }: { project: Doc<"projects"> }) {
  return (
    <article className="group rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
      <Link href={`/projects/${project.slug}`} className="block">
        <h2 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-accent">
          {project.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
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
      </Link>
    </article>
  );
}
