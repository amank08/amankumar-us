"use client";

import { useEffect, useSyncExternalStore, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const TOAST_MESSAGES: Record<string, string> = {
  "signed-out": "Signed out successfully",
};

/* ---- tiny external toast store (avoids setState-in-effect lint rule) ---- */
type ToastState = { message: string; visible: boolean };

let state: ToastState = { message: "", visible: false };
const listeners = new Set<() => void>();

/** Return the current toast snapshot for useSyncExternalStore. */
function getSnapshot(): ToastState {
  return state;
}

/** Subscribe to toast state changes. */
function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Show a toast message for 3 seconds. */
function showToast(message: string) {
  state = { message, visible: true };
  listeners.forEach((l) => l());
  setTimeout(() => {
    state = { ...state, visible: false };
    listeners.forEach((l) => l());
  }, 3000);
}

/** Dismiss the current toast immediately. */
function dismissToast() {
  state = { ...state, visible: false };
  listeners.forEach((l) => l());
}

/* ---- component ---- */

/** A toast notification that reads from ?toast= URL params and auto-dismisses. */
export function ToastProvider() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const handledRef = useRef<string | null>(null);

  const toastKey = searchParams.get("toast");

  useEffect(() => {
    if (toastKey && TOAST_MESSAGES[toastKey] && handledRef.current !== toastKey) {
      handledRef.current = toastKey;
      showToast(TOAST_MESSAGES[toastKey]);

      // Remove toast param from URL without navigation
      const url = new URL(window.location.href);
      url.searchParams.delete("toast");
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [toastKey, router]);

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 animate-fade-in-up">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span className="text-sm font-medium text-text-primary">
          {toast.message}
        </span>
        <button
          onClick={dismissToast}
          className="ml-2 rounded p-0.5 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Dismiss"
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
