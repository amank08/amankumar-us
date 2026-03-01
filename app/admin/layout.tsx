"use client";

import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const currentUser = useQuery(
    api.users.currentUser,
    isAuthenticated ? {} : "skip"
  );
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
    if (currentUser !== undefined && currentUser !== null && !currentUser.isAdmin) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, currentUser, router]);

  if (isLoading || currentUser === undefined) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  if (!currentUser?.isAdmin) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <nav className="mb-8 flex items-center gap-6 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <Link
          href="/admin"
          className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/posts"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Posts
        </Link>
        <Link
          href="/admin/projects"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Projects
        </Link>
        <Link
          href="/admin/about"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          About
        </Link>
      </nav>
      {children}
    </div>
  );
}
