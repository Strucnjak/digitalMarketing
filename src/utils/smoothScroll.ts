export function smoothScroll(
  target: HTMLElement | { top?: number; left?: number },
  offset = 0,
  prefersReducedMotion = false,
) {
  const rect = target instanceof HTMLElement ? target.getBoundingClientRect() : undefined;
  const top = rect ? rect.top + window.scrollY : target.top ?? 0;
  const left = rect ? rect.left + window.scrollX : target.left ?? 0;

  window.scrollTo({
    top: top - offset,
    left,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}
