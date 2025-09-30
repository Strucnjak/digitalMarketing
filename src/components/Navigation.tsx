import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import {
  buildLocalizedPath,
  defaultLocale,
  servicePageIds,
  isLocale,
  type Locale,
  type PageType,
} from "../routing";
import { useRouteInfo } from "../hooks/useRouteInfo";

export function Navigation() {
  const { language, setLanguage, t: _t } = useLanguage();
  const navigate = useNavigate();
  const routeInfo = useRouteInfo();
  const params = useParams<{ locale?: string }>();
  const routeLocale = isLocale(params.locale) ? params.locale : undefined;
  const activeLocale: Locale = routeLocale ?? routeInfo.locale ?? (language as Locale);
  const includeLocalePrefix = routeLocale != null || activeLocale !== defaultLocale;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
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

  const handleHomeClick = () => {
    const path = buildLocalizedPath(activeLocale, "home", { includeLocalePrefix });
    navigate(path);
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

  const handleLanguageChange = (newLanguage: "en" | "me") => {
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
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
              aria-label="BDigital - Početna stranica"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-bdigital-cyan rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <div className="w-6 h-6 relative">
                  {/* Pixel-style B made with divs */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-5 gap-px">
                    <div className="bg-bdigital-navy"></div>
                    <div className="bg-bdigital-navy"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-bdigital-navy"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-bdigital-navy"></div>
                    <div className="bg-bdigital-navy"></div>
                    <div className="bg-bdigital-navy"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-bdigital-navy"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-bdigital-navy"></div>
                    <div className="bg-bdigital-navy"></div>
                    <div className="bg-bdigital-navy"></div>
                    <div className="bg-transparent"></div>
                  </div>
                </div>
              </div>
              <span className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${isScrolled ? "text-bdigital-navy" : "text-white"}`}>
                Digital
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={handleHomeClick}
                className={`text-sm font-medium transition-colors duration-300 hover:text-bdigital-cyan ${
                  routeInfo.page === "home"
                    ? "text-bdigital-cyan"
                    : isScrolled
                      ? "text-bdigital-navy"
                      : "text-white"
                }`}
              >
                {_t("nav.home")}
              </button>

            {/* Services Dropdown */}
            <div ref={dropdownRef} className="relative" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
              <button
                className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-300 hover:text-bdigital-cyan py-2 ${
                  servicePageIds.includes(routeInfo.page as (typeof servicePageIds)[number])
                    ? "text-bdigital-cyan"
                    : isScrolled
                      ? "text-bdigital-navy"
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
                className={`absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-4 transform transition-all duration-300 ${
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
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 group focus:bg-gray-50 focus:outline-none"
                  >
                    <div className="font-medium text-bdigital-navy text-sm mb-1 group-hover:text-bdigital-cyan group-focus:text-bdigital-cyan transition-colors duration-200">
                      {service.title}
                    </div>
                    <div className="text-xs text-neutral-gray">{service.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleContactClick}
              className={`text-sm font-medium transition-colors duration-300 hover:text-bdigital-cyan ${
                isScrolled ? "text-bdigital-navy" : "text-white"
              }`}
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
                    : `hover:bg-bdigital-cyan/20 ${isScrolled ? "text-bdigital-navy" : "text-white"}`
                }`}
              >
                ME
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2 py-1 text-xs font-medium rounded transition-all duration-300 ${
                  language === "en"
                    ? "bg-bdigital-cyan text-bdigital-navy"
                    : `hover:bg-bdigital-cyan/20 ${isScrolled ? "text-bdigital-navy" : "text-white"}`
                }`}
              >
                EN
              </button>
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
                <Button className={`p-2 ${isScrolled ? "text-bdigital-navy" : "text-white"} hover:bg-bdigital-cyan/20`} aria-label="Otvori meni">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-white">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>Displays the mobile navigation menu.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-bdigital-cyan rounded-lg flex items-center justify-center">
                        <span className="text-bdigital-navy text-sm font-bold">B</span>
                      </div>
                      <span className="text-lg font-bold text-bdigital-navy">BDigital</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-bdigital-navy hover:bg-gray-100"
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
                        routeInfo.page === "home" ? "bg-bdigital-cyan text-bdigital-navy" : "text-bdigital-navy hover:bg-gray-50"
                      }`}
                    >
                      {_t("nav.home")}
                    </button>

                    {/* Services Menu */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-bdigital-navy hover:bg-gray-50 rounded-lg transition-colors duration-200"
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
                                  : "text-neutral-gray hover:bg-gray-50 hover:text-bdigital-navy"
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
                      className="w-full text-left px-4 py-3 text-base font-medium text-bdigital-navy hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      {_t("nav.contact")}
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 pt-6 space-y-4">
                    {/* Language Switcher */}
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-neutral-gray">Jezik:</span>
                      <button
                        onClick={() => handleLanguageChange("me")}
                        className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                          language === "me" ? "bg-bdigital-cyan text-bdigital-navy" : "text-bdigital-navy hover:bg-gray-100"
                        }`}
                      >
                        Crnogorski
                      </button>
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                          language === "en" ? "bg-bdigital-cyan text-bdigital-navy" : "text-bdigital-navy hover:bg-gray-100"
                        }`}
                      >
                        English
                      </button>
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
