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
        // Skip author lookup for tombstoned comments
        if (comment.deletedAt) {
          return {
            ...comment,
            authorUsername: "[deleted]",
            authorAvatarUrl: null,
            authorIsAdmin: false,
          };
        }
        const author = await ctx.db.get(comment.authorId);
        return {
          ...comment,
          authorUsername: author?.username ?? "Deleted user",
          authorAvatarUrl: author?.avatarUrl ?? null,
          authorIsAdmin: author?.isAdmin ?? false,
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
    parentId: v.optional(v.id("comments")),
  },
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx);

    // Verify the post exists
    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post not found");

    // If replying to a comment, verify parent exists and belongs to same post
    if (args.parentId) {
      const parent = await ctx.db.get(args.parentId);
      if (!parent) throw new Error("Parent comment not found");
      if (parent.postId !== args.postId) {
        throw new Error("Parent comment belongs to a different post");
      }
    }

    return await ctx.db.insert("comments", {
      text: args.text,
      authorId: user._id,
      postId: args.postId,
      parentId: args.parentId,
      createdAt: Date.now(),
    });
  },
});

/** Delete a comment. If it has replies, soft-delete (tombstone) to preserve the thread.
 *  If it's a leaf, hard-delete and prune any orphaned tombstone ancestors. */
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

    // Check if this comment has any replies
    const hasReplies = await ctx.db
      .query("comments")
      .withIndex("by_parent", (q) => q.eq("parentId", args.id))
      .first();

    if (hasReplies !== null) {
      // Has children → soft delete (tombstone): keep the row so the thread is preserved
      await ctx.db.patch(args.id, {
        deletedAt: Date.now(),
        text: "[deleted]",
      });
    } else {
      // Leaf node → hard delete, then prune orphaned tombstone ancestors
      await ctx.db.delete(args.id);

      // Walk up the ancestor chain pruning unnecessary tombstones
      let ancestorId = comment.parentId;
      while (ancestorId) {
        const ancestor = await ctx.db.get(ancestorId);
        if (!ancestor || !ancestor.deletedAt) break;

        // Does this tombstone ancestor still have any remaining children?
        const remainingSibling = await ctx.db
          .query("comments")
          .withIndex("by_parent", (q) => q.eq("parentId", ancestorId!))
          .first();

        if (remainingSibling !== null) break;

        // Ancestor is a tombstone with no children — prune it
        const nextAncestorId = ancestor.parentId;
        await ctx.db.delete(ancestorId);
        ancestorId = nextAncestorId;
      }
    }
  },
});
