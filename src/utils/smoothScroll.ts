/** A coordinate you can scroll to (viewport-based). */
export type SmoothScrollPoint = { top?: number; left?: number };

// Overloads for nicer IntelliSense
export function smoothScroll(target: HTMLElement, options?: { offset?: number; prefersReducedMotion?: boolean }): void;
export function smoothScroll(target: SmoothScrollPoint, options?: { offset?: number; prefersReducedMotion?: boolean }): void;

/** Smoothly scroll to an element or a viewport point. */
export function smoothScroll(target: HTMLElement | SmoothScrollPoint, options: { offset?: number; prefersReducedMotion?: boolean } = {}): void {
  if (typeof window === "undefined") {
    return;
  }

  const { offset = 0, prefersReducedMotion = false } = options;

  let top = 0;
  let left = 0;

  if (target instanceof HTMLElement) {
    const rect = target.getBoundingClientRect();
    top = rect.top + window.scrollY;
    left = rect.left + window.scrollX;
  } else {
    // target is SmoothScrollPoint here
    top = target.top ?? 0;
    left = target.left ?? 0;
  }

  window.scrollTo({
    top: Math.max(0, top - offset),
    left,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}
