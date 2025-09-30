import { useEffect, useRef } from "react";

/**
 * Hook that traps focus within the container when active.
 * It loops focus within the first and last focusable elements and
 * restores the previously focused element on cleanup.
 *
 * @param active - Whether the focus trap is active.
 * @returns A ref to be attached to the container element.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(active = true) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (typeof document === "undefined") {
      return;
    }

    if (!active || !container) {
      return;
    }

    const focusableSelectors = [
      "a[href]",
      "area[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "iframe",
      "object",
      "embed",
      "[tabindex]:not([tabindex='-1'])",
      "[contenteditable]",
    ].join(",");

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const previousFocused = document.activeElement as HTMLElement | null;

    first.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      if (previousFocused) {
        previousFocused.focus();
      }
    };
  }, [active]);

  return containerRef;
}

