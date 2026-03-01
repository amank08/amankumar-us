import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/auth";

/** Get the about page content. Public query, no auth required. */
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("about")
      .withIndex("by_key", (q) => q.eq("key", "singleton"))
      .unique();
  },
});

/** Update (or create) the about page content. Admin only. */
export const update = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const existing = await ctx.db
      .query("about")
      .withIndex("by_key", (q) => q.eq("key", "singleton"))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        content: args.content,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("about", {
        key: "singleton" as const,
        content: args.content,
        updatedAt: Date.now(),
      });
    }
  },
});
