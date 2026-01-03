import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Switch } from "./ui/switch";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { useLanguage, type Language } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import { buildLocalizedPath, defaultLocale, servicePageIds, type Locale, type PageType } from "../routing";
import { useRouteInfo } from "../hooks/useRouteInfo";
import { useActiveLocale } from "../hooks/useActiveLocale";

export function Navigation() {
  const { language, setLanguage, t: _t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const routeInfo = useRouteInfo();
  const { activeLocale, includeLocalePrefix, routeLocale } = useActiveLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const services = [
    {
      id: "web-design",
      title: _t("services.web.title"),
      description: _t("services.web.desc"),
    },
    {
      id: "seo",
      title: _t("services.seo.title"),
      description: _t("services.seo.desc"),
    },
    {
      id: "social-media",
      title: _t("services.social.title"),
      description: _t("services.social.desc"),
    },
    {
      id: "branding",
      title: _t("services.branding.title"),
      description: _t("services.branding.desc"),
    },
    {
      id: "strategy",
      title: _t("services.strategy.title"),
      description: _t("services.strategy.desc"),
    },
  ];

  const handleServiceClick = (serviceId: PageType) => {
    const path = buildLocalizedPath(activeLocale, serviceId, { includeLocalePrefix });
    navigate(path);
    setIsOpen(false);
    setServicesOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeClick = () => {
    const path = buildLocalizedPath(activeLocale, "home", { includeLocalePrefix });
    const isAlreadyHome = routeInfo.page === "home";

    if (isAlreadyHome) {
      scrollToTop();
    } else {
      navigate(path);
      // Ensure we land at the top after navigation completes
      setTimeout(scrollToTop, 100);
    }

    setIsOpen(false);
  };

  const handleContactClick = () => {
    const path = buildLocalizedPath(activeLocale, "home", { includeLocalePrefix });
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
      includeLocalePrefix: targetLocale !== defaultLocale || routeLocale != null,
    });
    navigate(path, { replace: true });
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const navigateToFreeConsultation = () => {
    const path = buildLocalizedPath(activeLocale, "free-consultation", { includeLocalePrefix });
    navigate(path);
  };

  const handleServicesMouseEnter = () => {
    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    // Add a delay before closing
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 300); // 300ms delay
  };

  const handleDropdownMouseEnter = () => {
    // Clear timeout when mouse enters dropdown
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    // Add delay when leaving dropdown
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 300);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/20 dark:bg-bdigital-midnight/95 dark:border-bdigital-dark-navy/60 dark:shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
              aria-label="DIAL Digital - Početna stranica"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-bdigital-cyan-dark rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img src="/logo.svg" alt="DIAL Digital logo" className="w-7 h-7 lg:w-8 lg:h-8" loading="lazy" />
              </div>
              <span
                className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? "text-bdigital-navy dark:text-slate-100" : "text-white"
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
                isScrolled ? "hover:text-bdigital-cyan-dark dark:hover:text-bdigital-cyan" : "hover:text-bdigital-cyan"
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
            <div ref={dropdownRef} className="relative" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
              <button
                className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-300 ${
                  isScrolled ? "hover:text-bdigital-cyan-dark dark:hover:text-bdigital-cyan" : "hover:text-bdigital-cyan"
                } py-2 ${
                  servicePageIds.includes(routeInfo.page as (typeof servicePageIds)[number])
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
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-1 w-80 rounded-xl border border-gray-200 bg-white py-4 shadow-xl transition-all duration-300 dark:border-bdigital-dark-navy dark:bg-bdigital-midnight ${
                  servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 translate-y-2 pointer-events-none invisible"
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
                    <div className="text-xs text-neutral-gray dark:text-slate-400">{service.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleContactClick}
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled ? "hover:text-bdigital-cyan-dark dark:hover:text-bdigital-cyan" : "hover:text-bdigital-cyan"
              } ${isScrolled ? "text-bdigital-navy dark:text-slate-100" : "text-white"}`}
            >
              {_t("nav.contact")}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleLanguageChange("me")}
                className={`px-2 py-1 text-xs font-medium rounded transition-all duration-300 ${
                  language === "me"
                    ? "bg-bdigital-cyan text-bdigital-navy"
                    : `hover:bg-bdigital-cyan/20 dark:hover:bg-slate-800/70 ${
                        isScrolled ? "text-bdigital-navy dark:text-slate-100" : "text-white"
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
                        isScrolled ? "text-bdigital-navy dark:text-slate-100" : "text-white"
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
                        isScrolled ? "text-bdigital-navy dark:text-slate-100" : "text-white"
                      }`
                }`}
              >
                FR
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
                  theme === "dark" ? "text-bdigital-cyan" : isScrolled ? "text-bdigital-navy/60 dark:text-slate-400" : "text-white/70"
                }`}
              />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                aria-label={theme === "dark" ? _t("nav.light_mode") ?? "Switch to light mode" : _t("nav.dark_mode") ?? "Switch to dark mode"}
                className="h-5 w-10 data-[state=checked]:bg-bdigital-cyan data-[state=unchecked]:bg-slate-300/80 dark:data-[state=unchecked]:bg-slate-700"
              />
              <Sun
                className={`h-3.5 w-3.5 transition-colors ${
                  theme === "dark" ? "text-slate-300" : isScrolled ? "text-bdigital-cyan-dark" : "text-white"
                }`}
              />
            </div>

            {/* CTA Button - now links to free consultation */}
            <Button
              onClick={navigateToFreeConsultation}
              className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold px-6 py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
                    isScrolled ? "text-bdigital-navy dark:text-slate-100" : "text-white"
                  } hover:bg-bdigital-cyan/20 dark:hover:bg-slate-800/70`}
                  aria-label="Otvori meni"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-white sm:w-80 dark:bg-bdigital-midnight">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>Displays the mobile navigation menu.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow dark:bg-bdigital-night">
                        <img src="/logo.svg" alt="DIAL Digital logo" className="w-6 h-6" loading="lazy" />
                      </div>
                      <span className="text-lg font-bold text-bdigital-navy dark:text-slate-100">DIAL Digital</span>
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
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>

                      {servicesOpen && (
                        <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          {services.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => handleServiceClick(service.id as PageType)}
                              className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                                routeInfo.page === service.id
                                  ? "bg-bdigital-cyan text-bdigital-navy"
                                  : "text-neutral-gray hover:bg-gray-50 hover:text-bdigital-navy dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                              }`}
                            >
                              <div className="font-medium mb-1">{service.title}</div>
                              <div className="text-xs opacity-70">{service.description}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleContactClick}
                      className="w-full text-left px-4 py-3 text-base font-medium text-bdigital-navy hover:bg-gray-50 rounded-lg transition-colors duration-200 dark:text-slate-100 dark:hover:bg-slate-900"
                    >
                      {_t("nav.contact")}
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 pt-6 space-y-4 dark:border-slate-800">
                    {/* Language Switcher */}
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-neutral-gray dark:text-slate-400">Jezik:</span>
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
                        <Moon className={`h-3.5 w-3.5 ${theme === "dark" ? "text-bdigital-cyan" : "text-slate-400"}`} />
                        <Switch
                          checked={theme === "dark"}
                          onCheckedChange={toggleTheme}
                          aria-label={
                            theme === "dark" ? _t("nav.light_mode") ?? "Switch to light mode" : _t("nav.dark_mode") ?? "Switch to dark mode"
                          }
                          className="h-5 w-10 data-[state=checked]:bg-bdigital-cyan data-[state=unchecked]:bg-slate-300/80 dark:data-[state=unchecked]:bg-slate-700"
                        />
                        <Sun className={`h-3.5 w-3.5 ${theme === "dark" ? "text-slate-300" : "text-bdigital-cyan-dark"}`} />
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
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
