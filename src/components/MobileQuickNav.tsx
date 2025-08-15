import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUp } from "lucide-react";

import { cn } from "./ui/utils";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollDir } from "../hooks/useScrollDir";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { smoothScroll } from "../utils/smoothScroll";

interface Section {
  id: string;
  label: string;
}

interface MobileQuickNavProps {
  sections: Section[];
  stickyOffsetPx?: number;
  collisionOffsetPx?: number;
  topThresholdPx?: number;
  className?: string;
}

export function MobileQuickNav({
  sections,
  stickyOffsetPx = 0,
  collisionOffsetPx = 0,
  topThresholdPx = 300,
  className,
}: MobileQuickNavProps) {
  const [open, setOpen] = useState(false);
  const [fabVisible, setFabVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const active = useActiveSection(sections.map((s) => s.id));
  const scrollDir = useScrollDir();
  const reduceMotion = usePrefersReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(menuRef, open);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowScrollTop(y > topThresholdPx);

      if (y <= topThresholdPx) {
        setFabVisible(true);
        return;
      }
      setFabVisible(scrollDir === "up");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDir, topThresholdPx]);

  const toggleOpen = () => setOpen((o) => !o);

  const scrollToTop = () => {
    setOpen(false);
    if (reduceMotion) {
      window.scrollTo({ top: 0 });
    } else {
      smoothScroll({ top: 0 });
    }
  };

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    setOpen(false);
    if (!el) return;
    smoothScroll(el, reduceMotion);
  };

  return (
    <div
      className={cn("pointer-events-none sticky z-50", className)}
      style={{ top: stickyOffsetPx }}
    >
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className="fixed bottom-4 right-4 flex flex-col items-end gap-2 pointer-events-auto"
        style={{ bottom: collisionOffsetPx }}
      >
        {showScrollTop && !open && (
          <button
            aria-label="Scroll to top"
            className={cn(
              "rounded-full bg-bdigital-cyan p-3 text-white shadow-lg transition-opacity",
              fabVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
        <button
          aria-expanded={open}
          aria-controls="mobile-quick-nav-menu"
          aria-label="Toggle navigation menu"
          className={cn(
            "rounded-full bg-bdigital-navy p-4 text-white shadow-lg transition-opacity",
            fabVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={toggleOpen}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-quick-nav-menu"
          ref={menuRef}
          aria-label="Quick navigation"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/90 backdrop-blur-md"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={cn(
                "text-2xl font-semibold",
                active === section.id
                  ? "text-bdigital-cyan underline"
                  : "text-bdigital-navy"
              )}
              aria-current={active === section.id ? "true" : undefined}
            >
              {section.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

