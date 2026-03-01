"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

/** Public About page — renders content from the admin-editable about section. */
export default function AboutPage() {
  const about = useQuery(api.about.get);

  return (
    <div className="animate-fade-in-up mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-text-primary">
        About Me
      </h1>
      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        {about === undefined ? (
          <p className="text-text-muted">Loading...</p>
        ) : about === null ? (
          <p className="text-lg text-text-secondary">
            Hi, I&apos;m Aman Kumar. More details coming soon.
          </p>
        ) : (
          <p className="whitespace-pre-wrap text-text-secondary">
            {about.content}
          </p>
        )}
      </div>
    </div>
  );
}
