import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/auth";

/** Generate a short-lived upload URL for Convex file storage (admin only). */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

/** Get the serving URL for a single storage file. */
export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

/** Batch-resolve storage IDs to URLs. Returns a record of id → url|null. */
export const getUrls = query({
  args: { storageIds: v.array(v.id("_storage")) },
  handler: async (ctx, args) => {
    const result: Record<string, string | null> = {};
    await Promise.all(
      args.storageIds.map(async (id) => {
        result[id] = await ctx.storage.getUrl(id);
      })
    );
    return result;
  },
});

/** Delete a file from storage (admin only). */
export const deleteFile = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.storage.delete(args.storageId);
  },
});
