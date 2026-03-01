import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./lib/auth";

/** Fetch all comments for a post, ordered by creation time, with author info joined. */
export const getByPostId = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .order("asc")
      .collect();

    // Join with users table to include username and avatarUrl
    const commentsWithAuthors = await Promise.all(
      comments.map(async (comment) => {
        const author = await ctx.db.get(comment.authorId);
        return {
          ...comment,
          authorUsername: author?.username ?? "Deleted user",
          authorAvatarUrl: author?.avatarUrl ?? null,
        };
      })
    );

    return commentsWithAuthors;
  },
});

/** Create a new comment on a blog post. Requires authentication. */
export const create = mutation({
  args: {
    postId: v.id("posts"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx);

    // Verify the post exists
    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post not found");

    return await ctx.db.insert("comments", {
      text: args.text,
      authorId: user._id,
      postId: args.postId,
      createdAt: Date.now(),
    });
  },
});

/** Delete a comment. Only the comment author or an admin can delete. */
export const remove = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx);

    const comment = await ctx.db.get(args.id);
    if (!comment) throw new Error("Comment not found");

    // Only the comment author or an admin can delete
    if (comment.authorId !== user._id && !user.isAdmin) {
      throw new Error("Forbidden: you can only delete your own comments");
    }

    await ctx.db.delete(args.id);
  },
});
