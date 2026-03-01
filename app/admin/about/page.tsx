"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AboutForm } from "@/components/admin/AboutForm";

/** Admin page for editing the public About section. */
export default function AdminAboutPage() {
  const about = useQuery(api.about.get);

  if (about === undefined) {
    return <p className="text-zinc-500">Loading...</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Edit About Page
      </h1>
      <AboutForm initialContent={about?.content ?? ""} />
    </div>
  );
}
