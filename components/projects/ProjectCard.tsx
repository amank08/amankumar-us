import Link from "next/link";
import Image from "next/image";
import { Doc } from "@/convex/_generated/dataModel";

interface ProjectCardProps {
  project: Doc<"projects">;
  thumbnailUrl?: string | null;
}

export function ProjectCard({ project, thumbnailUrl }: ProjectCardProps) {
  return (
    <article className="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_4px_30px_rgba(79,143,255,0.1)]">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-accent">
              {project.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
              {project.description}
            </p>
          </div>

          {thumbnailUrl && (
            <div className="relative hidden h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:block">
              <Image
                src={thumbnailUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          )}
        </div>

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
