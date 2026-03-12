import type { Metadata } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { ProjectDetailContent } from "@/components/projects/ProjectDetailContent";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const BASE_URL = "https://amankumar.us";

/** Generates dynamic metadata for individual projects (OG, Twitter Card, canonical). */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await convex.query(api.projects.getBySlug, { slug });

  if (!project) {
    return { title: "Project Not Found" };
  }

  const description =
    project.description.length > 160
      ? project.description.slice(0, 157) + "..."
      : project.description;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `${BASE_URL}/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description,
      url: `${BASE_URL}/projects/${project.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
    },
  };
}

/** Project detail page — server component wrapper for metadata + client content. */
export default function ProjectDetailPage() {
  return <ProjectDetailContent />;
}
