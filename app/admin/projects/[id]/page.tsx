"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Id } from "@/convex/_generated/dataModel";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const projects = useQuery(api.projects.listAll);
  const project = projects?.find((p) => p._id === (id as Id<"projects">));

  if (projects === undefined) {
    return (
      <div>
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Project not found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Edit Project
      </h1>
      <ProjectForm project={project} />
    </div>
  );
}
