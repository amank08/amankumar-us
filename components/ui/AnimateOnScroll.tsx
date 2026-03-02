"use client";

import { useInView } from "@/hooks/useInView";

type Variant = "fade-up" | "slide-up" | "cinematic";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variant?: Variant;
  /** Extra delay in ms before the animation plays. */
  delay?: number;
  className?: string;
  as?: "div" | "section";
}

const variantClass: Record<Variant, string> = {
  "fade-up": "animate-fade-in-up",
  "slide-up": "animate-slide-up",
  cinematic: "animate-cinematic-reveal",
};

/**
 * Wrapper that animates its children into view when they scroll into the viewport.
 * Elements start invisible (opacity-0) and the chosen animation class is applied
 * once the IntersectionObserver fires.
 */
export function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${isInView ? variantClass[variant] : "opacity-0"} ${className}`}
      style={delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
