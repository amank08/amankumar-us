import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    email: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    tokenIdentifier: v.string(),
    isAdmin: v.boolean(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"]),

  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    authorId: v.id("users"),
    isPublished: v.boolean(),
    publishedAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["isPublished", "publishedAt"])
    .index("by_author", ["authorId"]),

  projects: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    longDescription: v.optional(v.string()),
    url: v.optional(v.string()),
    repoUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    techStack: v.array(v.string()),
    isPublished: v.boolean(),
    sortOrder: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["isPublished", "sortOrder"]),

  comments: defineTable({
    text: v.string(),
    authorId: v.id("users"),
    postId: v.id("posts"),
    parentId: v.optional(v.id("comments")),
    createdAt: v.number(),
  })
    .index("by_post", ["postId", "createdAt"])
    .index("by_author", ["authorId"])
    .index("by_parent", ["parentId"]),

  about: defineTable({
    key: v.literal("singleton"),
    content: v.string(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
});
