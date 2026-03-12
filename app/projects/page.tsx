import type { Metadata } from "next";
import { ProjectListContent } from "@/components/projects/ProjectListContent";

/** Static metadata for the projects listing page. */
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of projects built by Aman Kumar — web apps, tools, and experiments.",
  alternates: {
    canonical: "https://amankumar.us/projects",
  },
  openGraph: {
    title: "Projects | Aman Kumar",
    description:
      "Portfolio of projects built by Aman Kumar — web apps, tools, and experiments.",
    url: "https://amankumar.us/projects",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Projects | Aman Kumar",
    description:
      "Portfolio of projects built by Aman Kumar — web apps, tools, and experiments.",
  },
};

/** Projects listing page — server component wrapper with metadata. */
export default function ProjectsPage() {
  return <ProjectListContent />;
}
