"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";

interface ThumbnailUploadProps {
  currentThumbnailId?: Id<"_storage">;
  onUpload: (storageId: Id<"_storage">) => void;
  onRemove: () => void;
}

export function ThumbnailUpload({
  currentThumbnailId,
  onUpload,
  onRemove,
}: ThumbnailUploadProps) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const thumbnailUrl = useQuery(
    api.files.getUrl,
    currentThumbnailId ? { storageId: currentThumbnailId } : "skip"
  );

  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!result.ok) {
        const text = await result.text();
        throw new Error(`Upload failed (${result.status}): ${text}`);
      }
      const { storageId } = await result.json();
      onUpload(storageId as Id<"_storage">);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      // Reset the input so the same file can be re-selected
      e.target.value = "";
    }
  }

  function handleRemove() {
    onRemove();
  }

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Thumbnail
      </label>

      {currentThumbnailId && thumbnailUrl ? (
        <div className="mt-2 flex items-start gap-4">
          <div className="relative h-20 w-32 overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700">
            <Image
              src={thumbnailUrl}
              alt="Thumbnail preview"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload Image
              </>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            PNG, JPG, WebP, or GIF. Recommended 1200×630 for best results.
          </p>
        </div>
      )}
    </div>
  );
}
