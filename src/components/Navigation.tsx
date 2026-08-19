import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Switch } from "./ui/switch";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { useLanguage, type Language } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import {
  buildLocalizedPath,
  defaultLocale,
  servicePageIds,
  type Locale,
  type PageType,
} from "../routing";
import { useRouteInfo } from "../hooks/useRouteInfo";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { useRouteInfo } from "../hooks/useRouteInfo";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import {
  buildLocalizedPath,
  defaultLocale,
  servicePageIds,
  type Locale,
  type PageType,
} from "../routing";

const localeOptions: { value: Language; label: string }[] = [
  { value: "me", label: "ME" },
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
];

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const routeInfo = useRouteInfo();
  const { activeLocale, includeLocalePrefix, routeLocale } = useActiveLocale();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const services = [
    "web-design",
    "seo",
    "social-media",
    "branding",
    "strategy",
  ].map((id) => ({
    id: id as PageType,
    title: t(
      `services.${id === "web-design" ? "web" : id === "social-media" ? "social" : id}.title`,
    ),
    description: t(
      `services.${id === "web-design" ? "web" : id === "social-media" ? "social" : id}.desc`,
    ),
  }));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
  ];

  const handleServiceClick = (serviceId: PageType) => {
    const path = buildLocalizedPath(activeLocale, serviceId, {
      includeLocalePrefix,
    });
    navigate(path);
    setIsOpen(false);
    setServicesOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeClick = () => {
    const path = buildLocalizedPath(activeLocale, "home", {
      includeLocalePrefix,
    });
    const isAlreadyHome = routeInfo.page === "home";

    if (isAlreadyHome) {
      scrollToTop();
    } else {
      navigate(path);
      // Ensure we land at the top after navigation completes
      setTimeout(scrollToTop, 100);
    }

  const localizedPath = (page: PageType) =>
    buildLocalizedPath(activeLocale, page, { includeLocalePrefix });
  const goHome = () => {
    if (routeInfo.page === "home")
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    else navigate(localizedPath("home"));
    setMobileOpen(false);
  };

  const handleContactClick = () => {
    const path = buildLocalizedPath(activeLocale, "home", {
      includeLocalePrefix,
    });
    navigate(path);
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector("#contact");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    const targetLocale = newLanguage as Locale;
    const path = buildLocalizedPath(targetLocale, routeInfo.page, {
      includeLocalePrefix:
        targetLocale !== defaultLocale || routeLocale != null,
    });
    navigate(path, { replace: true });
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const navigateToFreeConsultation = () => {
    const path = buildLocalizedPath(activeLocale, "free-consultation", {
      includeLocalePrefix,
    });
    navigate(path);
  };
  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 180);
  };
  const handleDropdownBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null))
      setServicesOpen(false);
  };
  const handleDropdownKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setServicesOpen(false);
      dropdownRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    }
  };

  const foreground = isScrolled
    ? "text-bdigital-navy dark:text-white"
    : "text-white";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-bdigital-midnight"
          : "bg-transparent"
      }`}
    >
      <div className="site-container flex h-16 items-center justify-between lg:h-20">
        <button
          type="button"
          onClick={goHome}
          className={`focus-ring flex items-center gap-3 ${foreground}`}
          aria-label="DIAL Digital"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-bdigital-cyan-dark lg:h-9 lg:w-9">
            <img src="/logo.svg" alt="" className="h-6 w-6" />
          </span>
          <span className="text-base font-semibold tracking-tight lg:text-lg">
            DIAL Digital
          </span>
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          <button
            type="button"
            onClick={goHome}
            className={`focus-ring text-sm transition-colors hover:text-slate-500 dark:hover:text-slate-300 ${foreground} ${routeInfo.page === "home" ? "font-semibold" : "font-normal"}`}
          >
            {t("nav.home")}
          </button>
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
            onBlur={handleDropdownBlur}
            onKeyDown={handleDropdownKeyDown}
          >
            <button
              onClick={handleHomeClick}
              className="focus-ring flex items-center space-x-2"
              aria-label="DIAL Digital - Početna stranica"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-bdigital-cyan-dark lg:h-10 lg:w-10">
                <img
                  src="/logo.svg"
                  alt="DIAL Digital logo"
                  className="w-7 h-7 lg:w-8 lg:h-8"
                  loading="lazy"
                />
              </div>
              <span
                className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${
                  isScrolled
                    ? "text-bdigital-navy dark:text-slate-100"
                    : "text-white"
                }`}
              >
                DIAL Digital
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={handleHomeClick}
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled
                  ? "hover:text-bdigital-cyan-dark dark:hover:text-bdigital-cyan"
                  : "hover:text-bdigital-cyan"
              } ${
                routeInfo.page === "home"
                  ? isScrolled
                    ? "text-bdigital-cyan-dark dark:text-bdigital-cyan"
                    : "text-bdigital-cyan"
                  : isScrolled
                    ? "text-bdigital-navy dark:text-slate-100"
                    : "text-white"
              }`}
            >
              {_t("nav.home")}
            </button>

            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                onClick={() => setServicesOpen((open) => !open)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "hover:text-bdigital-cyan-dark dark:hover:text-bdigital-cyan"
                    : "hover:text-bdigital-cyan"
                } py-2 ${
                  servicePageIds.includes(
                    routeInfo.page as (typeof servicePageIds)[number],
                  )
                    ? isScrolled
                      ? "text-bdigital-cyan-dark dark:text-bdigital-cyan"
                      : "text-bdigital-cyan"
                    : isScrolled
                      ? "text-bdigital-navy dark:text-slate-100"
                      : "text-white"
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>{_t("nav.services")}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 top-full mt-2 w-80 rounded-md border border-gray-200 bg-white py-2 shadow-lg transition-[opacity,transform] duration-200 dark:border-slate-700 dark:bg-bdigital-midnight ${
                  servicesOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto visible"
                    : "opacity-0 translate-y-2 pointer-events-none invisible"
                }`}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                {/* Small connecting bridge to prevent gap issues */}
                <div className="absolute -top-1 left-0 right-0 h-1 bg-transparent"></div>

                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(service.id as PageType)}
                    className="w-full px-4 py-3 text-left transition-colors duration-200 group hover:bg-gray-50 focus:bg-gray-50 focus:outline-none dark:hover:bg-slate-900 dark:focus:bg-slate-900"
                  >
                    <div className="mb-1 text-sm font-medium text-bdigital-navy transition-colors duration-200 group-hover:text-bdigital-cyan-dark group-focus:text-bdigital-cyan-dark dark:text-slate-100 dark:group-hover:text-bdigital-cyan dark:group-focus:text-bdigital-cyan">
                      {service.title}
                    </div>
                    <div className="text-xs text-neutral-gray dark:text-slate-400">
                      {service.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleLanguageChange("me")}
                className={`px-2 py-1 text-xs font-medium rounded transition-all duration-300 ${
                  language === "me"
                    ? "bg-bdigital-cyan text-bdigital-navy"
                    : `hover:bg-bdigital-cyan/20 dark:hover:bg-slate-800/70 ${
                        isScrolled
                          ? "text-bdigital-navy dark:text-slate-100"
                          : "text-white"
                      }`
                }`}
              >
                ME
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2 py-1 text-xs font-medium rounded transition-all duration-300 ${
                  language === "en"
                    ? "bg-bdigital-cyan text-bdigital-navy"
                    : `hover:bg-bdigital-cyan/20 dark:hover:bg-slate-800/70 ${
                        isScrolled
                          ? "text-bdigital-navy dark:text-slate-100"
                          : "text-white"
                      }`
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange("fr")}
                className={`px-2 py-1 text-xs font-medium rounded transition-all duration-300 ${
                  language === "fr"
                    ? "bg-bdigital-cyan text-bdigital-navy"
                    : `hover:bg-bdigital-cyan/20 dark:hover:bg-slate-800/70 ${
                        isScrolled
                          ? "text-bdigital-navy dark:text-slate-100"
                          : "text-white"
                      }`
                }`}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            <div
              className={`flex items-center gap-2 rounded-full border px-2 py-1 text-xs font-semibold transition-colors duration-300 ${
                isScrolled
                  ? "border-slate-200/70 bg-white/80 text-bdigital-navy backdrop-blur dark:border-bdigital-dark-navy/80 dark:bg-bdigital-night/80 dark:text-slate-100"
                  : "border-white/30 bg-white/10 text-white"
              }`}
            >
              <Moon
                className={`h-3.5 w-3.5 transition-colors ${
                  theme === "dark"
                    ? "text-bdigital-cyan"
                    : isScrolled
                      ? "text-bdigital-navy/60 dark:text-slate-400"
                      : "text-white/70"
                }`}
              />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? (_t("nav.light_mode") ?? "Switch to light mode")
                    : (_t("nav.dark_mode") ?? "Switch to dark mode")
                }
                className="h-5 w-10 data-[state=checked]:bg-bdigital-cyan data-[state=unchecked]:bg-slate-300/80 dark:data-[state=unchecked]:bg-slate-700"
              />
              <Sun
                className={`h-3.5 w-3.5 transition-colors ${
                  theme === "dark"
                    ? "text-slate-300"
                    : isScrolled
                      ? "text-bdigital-cyan-dark"
                      : "text-white"
                }`}
              />
            </div>

            {/* CTA Button - now links to free consultation */}
            <Button
              onClick={navigateToFreeConsultation}
              className="focus-ring rounded-md bg-bdigital-cyan px-6 py-2 text-sm font-semibold text-bdigital-navy shadow-none transition-colors hover:bg-bdigital-cyan-light"
            >
              {_t("web.cta.primary")}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  className={`p-2 ${
                    isScrolled
                      ? "text-bdigital-navy dark:text-slate-100"
                      : "text-white"
                  } hover:bg-bdigital-cyan/20 dark:hover:bg-slate-800/70`}
                  aria-label="Otvori meni"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full bg-white sm:w-80 dark:bg-bdigital-midnight"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Displays the mobile navigation menu.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow dark:bg-bdigital-night">
                        <img
                          src="/logo.svg"
                          alt="DIAL Digital logo"
                          className="w-6 h-6"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-lg font-bold text-bdigital-navy dark:text-slate-100">
                        DIAL Digital
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-bdigital-navy hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-800"
                      aria-label="Zatvori meni"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex-1 py-6 space-y-2">
                    <button
                      onClick={handleHomeClick}
                      className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                        routeInfo.page === "home"
                          ? "bg-bdigital-cyan text-bdigital-navy"
                          : "text-bdigital-navy hover:bg-gray-50 dark:text-slate-100 dark:hover:bg-slate-900"
                      }`}
                    >
                      {_t("nav.home")}
                    </button>

                    {/* Services Menu */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-bdigital-navy hover:bg-gray-50 rounded-lg transition-colors duration-200 dark:text-slate-100 dark:hover:bg-slate-900"
                        aria-expanded={servicesOpen}
                      >
                        <span>{_t("nav.services")}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {servicesOpen && (
                        <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          {services.map((service) => (
                            <button
                              key={service.id}
                              onClick={() =>
                                handleServiceClick(service.id as PageType)
                              }
                              className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                                routeInfo.page === service.id
                                  ? "bg-bdigital-cyan text-bdigital-navy"
                                  : "text-neutral-gray hover:bg-gray-50 hover:text-bdigital-navy dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                              }`}
                            >
                              <div className="font-medium mb-1">
                                {service.title}
                              </div>
                              <div className="text-xs opacity-70">
                                {service.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="focus-ring flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400"
                      aria-label={
                        theme === "dark"
                          ? t("nav.light_mode")
                          : t("nav.dark_mode")
                      }
                    >
                      {theme === "dark" ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 pt-6 space-y-4 dark:border-slate-800">
                    {/* Language Switcher */}
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-neutral-gray dark:text-slate-400">
                        Jezik:
                      </span>
                      <button
                        onClick={() => handleLanguageChange("me")}
                        className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                          language === "me"
                            ? "bg-bdigital-cyan text-bdigital-navy"
                            : "text-bdigital-navy hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        Crnogorski
                      </button>
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                          language === "en"
                            ? "bg-bdigital-cyan text-bdigital-navy"
                            : "text-bdigital-navy hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleLanguageChange("fr")}
                        className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                          language === "fr"
                            ? "bg-bdigital-cyan text-bdigital-navy"
                            : "text-bdigital-navy hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        Français
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <span className="text-sm text-neutral-gray dark:text-slate-400">
                        {_t("nav.theme") ?? "Theme:"}
                      </span>
                      <div className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-2 py-1 text-xs font-semibold text-bdigital-navy transition-colors duration-300 dark:border-bdigital-dark-navy/80 dark:bg-bdigital-night/80 dark:text-slate-100">
                        <Moon
                          className={`h-3.5 w-3.5 ${theme === "dark" ? "text-bdigital-cyan" : "text-slate-400"}`}
                        />
                        <Switch
                          checked={theme === "dark"}
                          onCheckedChange={toggleTheme}
                          aria-label={
                            theme === "dark"
                              ? (_t("nav.light_mode") ?? "Switch to light mode")
                              : (_t("nav.dark_mode") ?? "Switch to dark mode")
                          }
                          className="h-5 w-10 data-[state=checked]:bg-bdigital-cyan data-[state=unchecked]:bg-slate-300/80 dark:data-[state=unchecked]:bg-slate-700"
                        />
                        <Sun
                          className={`h-3.5 w-3.5 ${theme === "dark" ? "text-slate-300" : "text-bdigital-cyan-dark"}`}
                        />
                      </div>
                    </div>

                    {/* CTA Button - now links to free consultation */}
                    <Button
                      onClick={() => {
                        navigateToFreeConsultation();
                        setIsOpen(false);
                      }}
                      className="w-full bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold py-3 text-sm shadow-lg transition-all duration-300"
                    >
                      {_t("web.cta.primary")}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
