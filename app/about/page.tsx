"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

/** Public About page — renders content from the admin-editable about section. */
export default function AboutPage() {
  const about = useQuery(api.about.get);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <AnimateOnScroll variant="fade-up">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          About Me
        </h1>
      </AnimateOnScroll>
      <AnimateOnScroll variant="fade-up" delay={100}>
        <div className="prose mt-8 max-w-none">
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
      </AnimateOnScroll>
    </div>
  );
}
