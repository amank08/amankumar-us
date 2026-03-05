import type { MetadataRoute } from "next";

/** Generates robots.txt allowing all crawlers and pointing to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin/",
      },
    ],
    sitemap: "https://amankumar.us/sitemap.xml",
  };
}
