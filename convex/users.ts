import { mutation, query } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Called store without authentication");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      if (user.email !== identity.email) {
        await ctx.db.patch(user._id, {
          email: identity.email ?? user.email,
          avatarUrl: identity.pictureUrl ?? user.avatarUrl,
        });
      }
      return user._id;
    }

    // Derive a default username from the email (everything before @)
    const email = identity.email ?? "";
    const defaultUsername = email.split("@")[0] || "user";

    return await ctx.db.insert("users", {
      username: defaultUsername,
      email: identity.email,
      avatarUrl: identity.pictureUrl,
      tokenIdentifier: identity.tokenIdentifier,
      isAdmin: false,
    });
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
  },
});
