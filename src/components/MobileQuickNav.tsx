import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "./LanguageContext";
import { useRouter } from "./Router";
import { Menu, X, Home, Briefcase, FolderOpen, Users, MessageSquare, Phone, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothScroll } from "../utils/smoothScroll";

interface MobileQuickNavProps {
  onSectionClick?: (sectionId: string) => void;
}

// Custom hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile, { passive: true });
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}

type SupportedLang = "sr-Latn" | "en";
const SUPPORTED_LANGS = ["sr-Latn", "en"] as const;

export function MobileQuickNav({ onSectionClick }: MobileQuickNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { language } = useLanguage();
  const { currentPage, navigateTo } = useRouter();
  const isMobile = useIsMobile();

  const translations: Record<
    SupportedLang,
    {
      home: string;
      services: string;
      portfolio: string;
      about: string;
      testimonials: string;
      contact: string;
      scrollToTop: string;
    }
  > = {
    "sr-Latn": {
      home: "Početna",
      services: "Usluge",
      portfolio: "Portfolio",
      about: "O nama",
      testimonials: "Komentari",
      contact: "Kontakt",
      scrollToTop: "Nazad na vrh",
    },
    en: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      testimonials: "Reviews",
      contact: "Contact",
      scrollToTop: "Back to top",
    },
  };

  // Narrow unknown language to supported set with fallback
  const currentLanguage: SupportedLang = (SUPPORTED_LANGS as readonly string[]).includes((language as string) || "")
    ? (language as SupportedLang)
    : "sr-Latn";

  const t = translations[currentLanguage];

  // Show scroll to top button when user scrolls down (tiny throttle)
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShowScrollTop(window.scrollY > 300);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when user scrolls
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!isOpen) return;
    const onScrollClose = () => setIsOpen(false);
    window.addEventListener("scroll", onScrollClose, { passive: true });
    return () => window.removeEventListener("scroll", onScrollClose);
  }, [isOpen]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const sections = [
    { id: "hero", label: t.home, icon: Home },
    { id: "services", label: t.services, icon: Briefcase },
    { id: "portfolio", label: t.portfolio, icon: FolderOpen },
    { id: "about", label: t.about, icon: Users },
    { id: "testimonials", label: t.testimonials, icon: MessageSquare },
    { id: "contact", label: t.contact, icon: Phone },
  ] as const;

  const HEADER_OFFSET_PX = 80;

  const scrollToSection = (sectionId: string) => {
    const el = typeof document !== "undefined" ? document.getElementById(sectionId) : null;
    if (el) {
      smoothScroll(el, { offset: HEADER_OFFSET_PX, prefersReducedMotion });
    }
    onSectionClick?.(sectionId);
  };

  async function waitForElement(id: string, timeoutMs = 2000): Promise<HTMLElement | null> {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return null;
    }

    const start = typeof performance !== "undefined" ? performance.now() : Date.now();
    return new Promise((resolve) => {
      const tick = () => {
        const el = document.getElementById(id);
        if (el) return resolve(el);
        const now = typeof performance !== "undefined" ? performance.now() : Date.now();
        if (now - start > timeoutMs) return resolve(null);
        requestAnimationFrame(tick);
      };
      tick();
    });
  }

  const handleSectionClick = async (sectionId: string) => {
    if (currentPage !== "home") {
      navigateTo("home");
      const el = await waitForElement(sectionId, 2000);
      if (el) {
        smoothScroll(el, { offset: HEADER_OFFSET_PX, prefersReducedMotion });
      }
    } else {
      scrollToSection(sectionId);
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    smoothScroll({ top: 0, left: 0 }, { prefersReducedMotion });
  };

  // Only show on mobile devices
  if (!isMobile) return null;

  return (
    <>
      {/* Main floating navigation button */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-quick-nav"
          aria-label="Toggle quick navigation"
          className="bg-bdigital-cyan text-bdigital-navy rounded-full p-4 shadow-lg shadow-bdigital-cyan/25 border border-bdigital-cyan/20 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && !isOpen && (
          <motion.div initial={{ scale: 0, y: 100 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0, y: 100 }} className="fixed bottom-6 left-6 z-50">
            <motion.button
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              onClick={scrollToTop}
              className="bg-bdigital-navy text-bdigital-cyan rounded-full p-3 shadow-lg shadow-bdigital-navy/25 border border-bdigital-cyan/20 backdrop-blur-sm"
              title={t.scrollToTop}
              aria-label={t.scrollToTop}
            >
              <ArrowUp size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

            {/* Menu items */}
            <motion.div
              id="mobile-quick-nav"
              role="menu"
              aria-label="Quick navigation"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-24 right-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden min-w-48"
              onClick={(e) => e.stopPropagation()}
            >
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    role="menuitem"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                    onClick={() => handleSectionClick(section.id)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-bdigital-navy hover:bg-bdigital-cyan/10 active:bg-bdigital-cyan/20 transition-colors border-b border-gray-100/50 last:border-b-0"
                  >
                    <IconComponent size={18} className="text-bdigital-cyan flex-shrink-0" />
                    <span className="flex-1">{section.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
