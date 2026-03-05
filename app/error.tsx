"use client";

import { useEffect } from "react";

/** Global error boundary that shows a friendly error message with a retry button. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-6xl font-bold text-accent">500</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 text-text-secondary">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Try again
      </button>
    </div>
  );
}
