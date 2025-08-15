import { useEffect, useState } from "react";

/**
 * Hook that returns the ID of the currently active section based on its
 * visibility in the viewport.
 *
 * @param sectionIds - Array of section element IDs to observe.
 * @param offset - Optional offset in pixels to adjust the intersection point.
 */
export function useActiveSection(sectionIds: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${offset}px 0px`,
        threshold: 0.25,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offset]);

  return activeId;
}
