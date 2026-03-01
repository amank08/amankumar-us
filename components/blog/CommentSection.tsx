"use client";

import { useState } from "react";
import Image from "next/image";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

/** Comment with joined author info (as returned by getByPostId). */
type CommentWithAuthor = {
  _id: Id<"comments">;
  _creationTime: number;
  text: string;
  authorId: Id<"users">;
  postId: Id<"posts">;
  parentId?: Id<"comments">;
  createdAt: number;
  authorUsername: string;
  authorAvatarUrl: string | null;
};

/** Tree node — a comment plus its nested replies. */
type CommentNode = CommentWithAuthor & { replies: CommentNode[] };

/** Build a tree of comments from a flat list. O(n) two-pass algorithm. */
function buildCommentTree(comments: CommentWithAuthor[]): CommentNode[] {
  const map = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];

  for (const c of comments) {
    map.set(c._id, { ...c, replies: [] });
  }

  for (const c of comments) {
    const node = map.get(c._id)!;
    if (c.parentId && map.has(c.parentId)) {
      map.get(c.parentId)!.replies.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

/** Format a timestamp as a human-readable date string. */
function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Inline reply form shown below a comment. */
function ReplyForm({
  postId,
  parentId,
  onDone,
}: {
  postId: Id<"posts">;
  parentId: Id<"comments">;
  onDone: () => void;
}) {
  const createComment = useMutation(api.comments.create);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Submit the reply. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createComment({ postId, text: trimmed, parentId });
      setText("");
      onDone();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        rows={2}
        className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        required
        autoFocus
      />
      <div className="mt-2 flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting || !text.trim()}
          className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : "Reply"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

/** A single comment with its nested replies (recursive). */
function Comment({
  comment,
  postId,
  depth,
  currentUser,
  onDelete,
  isAuthenticated,
}: {
  comment: CommentNode;
  postId: Id<"posts">;
  depth: number;
  currentUser: { _id: Id<"users">; isAdmin: boolean } | null | undefined;
  onDelete: (id: Id<"comments">) => void;
  isAuthenticated: boolean;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const isOwner = currentUser?._id === comment.authorId;
  const canDelete = isOwner || currentUser?.isAdmin;

  return (
    <div className={depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}>
      <div className="group rounded-lg border border-border bg-background p-4 transition-colors hover:border-border-hover">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {comment.authorAvatarUrl ? (
              <Image
                src={comment.authorAvatarUrl}
                alt={comment.authorUsername}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full"
              />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-light text-xs font-medium text-accent">
                {comment.authorUsername.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium text-text-primary">
              {comment.authorUsername}
            </span>
            <span className="text-xs text-text-muted">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {isAuthenticated && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="rounded p-1 text-xs text-text-muted opacity-0 transition-all hover:text-accent group-hover:opacity-100"
              >
                Reply
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => onDelete(comment._id)}
                className="rounded p-1 text-text-muted opacity-0 transition-all hover:bg-surface hover:text-red-500 group-hover:opacity-100"
                aria-label="Delete comment"
              >
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <p className="mt-2 whitespace-pre-wrap text-sm text-text-secondary">
          {comment.text}
        </p>

        {showReplyForm && (
          <ReplyForm
            postId={postId}
            parentId={comment._id}
            onDone={() => setShowReplyForm(false)}
          />
        )}
      </div>

      {/* Nested replies — cap visual nesting at depth 2 */}
      {comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              postId={postId}
              depth={Math.min(depth + 1, 2)}
              currentUser={currentUser}
              onDelete={onDelete}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Comment section for a blog post. Shows a comment form (auth-gated) and a threaded list of comments. */
export function CommentSection({ postId }: { postId: Id<"posts"> }) {
  const { isAuthenticated } = useConvexAuth();
  const currentUser = useQuery(
    api.users.currentUser,
    isAuthenticated ? {} : "skip"
  );
  const comments = useQuery(api.comments.getByPostId, { postId });
  const createComment = useMutation(api.comments.create);
  const removeComment = useMutation(api.comments.remove);

  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Post a top-level comment. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createComment({ postId, text: trimmed });
      setText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Delete a comment (cascades to children on the backend). */
  const handleDelete = async (commentId: Id<"comments">) => {
    await removeComment({ id: commentId });
  };

  const commentTree = comments ? buildCommentTree(comments) : undefined;
  const totalCount = comments?.length ?? 0;

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="text-xl font-semibold text-text-primary">
        Comments{" "}
        {totalCount > 0 && (
          <span className="text-base font-normal text-text-muted">
            ({totalCount})
          </span>
        )}
      </h2>

      {/* Top-level comment form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            required
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-text-muted">
              Commenting as{" "}
              <span className="font-medium text-text-secondary">
                {currentUser?.username ?? "User"}
              </span>
            </span>
            <button
              type="submit"
              disabled={isSubmitting || !text.trim()}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-6 rounded-lg border border-border bg-surface p-4 text-center">
          <p className="text-sm text-text-secondary">
            <a
              href="/api/auth/signin"
              className="font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Sign in
            </a>{" "}
            to leave a comment.
          </p>
        </div>
      )}

      {/* Threaded comment list */}
      <div className="mt-8 space-y-4">
        {commentTree === undefined ? (
          <p className="text-sm text-text-muted">Loading comments...</p>
        ) : commentTree.length === 0 ? (
          <p className="text-sm text-text-muted">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          commentTree.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              postId={postId}
              depth={0}
              currentUser={currentUser}
              onDelete={handleDelete}
              isAuthenticated={isAuthenticated}
            />
          ))
        )}
      </div>
    </section>
  );
}
