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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useLanguage, type Language } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
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
    [],
  );

  const localizedPath = (page: PageType) =>
    buildLocalizedPath(activeLocale, page, { includeLocalePrefix });
  const goHome = () => {
    if (routeInfo.page === "home") {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    } else {
      navigate(localizedPath("home"));
    }
    setMobileOpen(false);
  };
  const goService = (page: PageType) => {
    navigate(localizedPath(page));
    setServicesOpen(false);
    setMobileOpen(false);
  };
  const bookCall = () => {
    navigate(localizedPath("free-consultation"));
    setMobileOpen(false);
  };
  const changeLanguage = (next: Language) => {
    const locale = next as Locale;
    navigate(
      buildLocalizedPath(locale, routeInfo.page, {
        includeLocalePrefix: locale !== defaultLocale || routeLocale != null,
      }),
      { replace: true },
    );
    setLanguage(next);
    setMobileOpen(false);
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 motion-reduce:transition-none ${isScrolled ? "border-slate-200 bg-white dark:border-slate-800 dark:bg-bdigital-midnight" : "border-transparent bg-transparent"}`}
      aria-label={t("nav.primary")}
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
              type="button"
              onClick={() => setServicesOpen((open: boolean) => !open)}
              className={`focus-ring flex items-center gap-1.5 text-sm transition-colors hover:text-slate-500 dark:hover:text-slate-300 ${foreground} ${servicePageIds.includes(routeInfo.page as (typeof servicePageIds)[number]) ? "font-semibold" : "font-normal"}`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              {t("nav.services")}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform motion-reduce:transition-none ${servicesOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`absolute left-0 top-full mt-5 w-96 border border-slate-200 bg-white py-1 text-bdigital-navy shadow-lg dark:border-slate-700 dark:bg-bdigital-midnight dark:text-white ${servicesOpen ? "visible opacity-100" : "invisible opacity-0"}`}
            >
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => goService(service.id)}
                  className="focus-ring block w-full border-b border-slate-100 px-5 py-4 text-left last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                >
                  <span className="block text-sm font-semibold">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {service.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`flex items-center gap-2 text-xs ${isScrolled ? "text-slate-500 dark:text-slate-400" : "text-slate-300"}`}
            aria-label={t("nav.language")}
          >
            {localeOptions.map((option, index) => (
              <span key={option.value} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                <button
                  type="button"
                  onClick={() => changeLanguage(option.value)}
                  className={`focus-ring border-b py-1 transition-colors hover:text-current ${language === option.value ? "border-current font-semibold" : "border-transparent"}`}
                  aria-current={language === option.value ? "true" : undefined}
                >
                  {option.label}
                </button>
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={`focus-ring flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${isScrolled ? "border-slate-200 text-slate-500 hover:text-bdigital-navy dark:border-slate-700 dark:text-slate-400 dark:hover:text-white" : "border-white/25 text-slate-300 hover:text-white"}`}
            aria-label={
              theme === "dark" ? t("nav.light_mode") : t("nav.dark_mode")
            }
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <Button
            onClick={bookCall}
            className="focus-ring rounded-md bg-bdigital-cyan px-5 text-sm font-semibold text-bdigital-navy shadow-none hover:bg-bdigital-cyan-light"
          >
            {t("web.cta.primary")}
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className={`focus-ring flex h-11 w-11 items-center justify-center ${foreground}`}
                aria-label={t("nav.open")}
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-slate-200 bg-white p-0 sm:w-96 dark:border-slate-800 dark:bg-bdigital-midnight"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>{t("nav.primary")}</SheetTitle>
                <SheetDescription>{t("nav.primary")}</SheetDescription>
              </SheetHeader>
              <div className="flex h-full flex-col px-6 pb-8 pt-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800">
                  <span className="text-lg font-semibold text-bdigital-navy dark:text-white">
                    DIAL Digital
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="focus-ring flex h-11 w-11 items-center justify-center text-bdigital-navy dark:text-white"
                    aria-label={t("nav.close")}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto py-8">
                  <button
                    type="button"
                    onClick={goHome}
                    className="focus-ring block min-h-12 w-full border-b border-slate-200 py-4 text-left text-lg font-semibold text-bdigital-navy dark:border-slate-800 dark:text-white"
                  >
                    {t("nav.home")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((open: boolean) => !open)}
                    className="focus-ring flex min-h-12 w-full items-center justify-between border-b border-slate-200 py-4 text-left text-lg font-semibold text-bdigital-navy dark:border-slate-800 dark:text-white"
                    aria-expanded={servicesOpen}
                  >
                    {t("nav.services")}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform motion-reduce:transition-none ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="border-b border-slate-200 py-2 dark:border-slate-800">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => goService(service.id)}
                          className="focus-ring block min-h-11 w-full py-3 pl-4 text-left text-sm text-slate-600 dark:text-slate-300"
                        >
                          {service.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      {localeOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => changeLanguage(option.value)}
                          className={`focus-ring border-b py-1 ${language === option.value ? "border-current font-semibold" : "border-transparent"}`}
                          aria-current={
                            language === option.value ? "true" : undefined
                          }
                        >
                          {option.label}
                        </button>
                      ))}
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
                  <Button
                    onClick={bookCall}
                    className="focus-ring mt-6 min-h-12 w-full rounded-md bg-bdigital-cyan font-semibold text-bdigital-navy shadow-none hover:bg-bdigital-cyan-light"
                  >
                    {t("web.cta.primary")}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
