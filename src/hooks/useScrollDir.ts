import { useEffect, useRef, useState } from "react";

/**
 * Hook that returns the current scroll direction ("up" or "down").
 * The direction is updated inside a requestAnimationFrame callback and
 * the scroll listener is attached with passive mode.
 */
export function useScrollDir() {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");
  const lastScrollY = useRef(0);
  const latestScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    latestScrollY.current = window.scrollY;

    const update = () => {
      const scrollY = latestScrollY.current;
      if (scrollY > lastScrollY.current) {
        setScrollDir("down");
      } else if (scrollY < lastScrollY.current) {
        setScrollDir("up");
      }
      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      latestScrollY.current = window.scrollY;
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollDir;
}

