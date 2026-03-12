import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

/** Static metadata for the about page. */
export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Aman Kumar — software engineer building things and writing about tech.",
  alternates: {
    canonical: "https://amankumar.us/about",
  },
  openGraph: {
    title: "About | Aman Kumar",
    description:
      "Learn more about Aman Kumar — software engineer building things and writing about tech.",
    url: "https://amankumar.us/about",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "About | Aman Kumar",
    description:
      "Learn more about Aman Kumar — software engineer building things and writing about tech.",
  },
};

/** About page — server component wrapper with metadata. */
export default function AboutPage() {
  return <AboutContent />;
}
