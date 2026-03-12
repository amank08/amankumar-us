import type { Metadata } from "next";
import { BlogListContent } from "@/components/blog/BlogListContent";

/** Static metadata for the blog listing page. */
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on software engineering, tech, and things I'm learning — by Aman Kumar.",
  alternates: {
    canonical: "https://amankumar.us/blog",
  },
  openGraph: {
    title: "Blog | Aman Kumar",
    description:
      "Articles on software engineering, tech, and things I'm learning.",
    url: "https://amankumar.us/blog",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog | Aman Kumar",
    description:
      "Articles on software engineering, tech, and things I'm learning.",
  },
};

/** Blog listing page — server component wrapper with metadata. */
export default function BlogPage() {
  return <BlogListContent />;
}
