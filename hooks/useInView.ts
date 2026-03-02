"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Fire only once — element stays "in view" after first intersection. Default: true */
  once?: boolean;
  /** Root margin passed to IntersectionObserver. Default: "0px 0px -50px 0px" */
  rootMargin?: string;
  /** Visibility threshold (0–1). Default: 0 */
  threshold?: number;
}

/**
 * Lightweight IntersectionObserver hook.
 * Returns a ref to attach and an `isInView` boolean.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { once = true, rootMargin = "0px 0px -50px 0px", threshold = 0 } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, isInView };
}
