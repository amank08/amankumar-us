"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

/**
 * Batch-resolves thumbnailId fields from an array of items into a URL map.
 * Avoids N+1 queries by collecting all IDs and calling getUrls once.
 *
 * Returns a Record<storageId, url> (only entries that resolved to a URL).
 */
export function useThumbnailUrls(
  items: Array<{ thumbnailId?: Id<"_storage"> }> | undefined
): Record<string, string> {
  const storageIds = [
    ...new Set(
      (items ?? [])
        .map((item) => item.thumbnailId)
        .filter((id): id is Id<"_storage"> => id !== undefined)
    ),
  ];

  const urlMap = useQuery(
    api.files.getUrls,
    storageIds.length > 0 ? { storageIds } : "skip"
  );

  if (!urlMap) return {};

  // Filter out null URLs
  const result: Record<string, string> = {};
  for (const [id, url] of Object.entries(urlMap)) {
    if (url) result[id] = url;
  }
  return result;
}
