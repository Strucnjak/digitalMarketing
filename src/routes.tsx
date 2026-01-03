import { Suspense, lazy, useEffect, type ReactElement, type ReactNode } from "react";
import { Navigate, Outlet, useLocation, useParams, useRoutes, type RouteObject } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./components/LanguageContext";
import { Navigation } from "./components/Navigation";
import { useInitialState } from "./components/InitialStateContext";
import { ThemeProvider } from "./components/ThemeContext";
import { getSeoMetadata } from "./config/seo-meta";
import { SITE_BASE_URL } from "./config/site";
import {
  STRUCTURED_DATA_ELEMENT_ID,
  buildCanonicalCluster,
  buildBreadcrumbListJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  buildWebPageJsonLd,
  serializeJsonLd,
} from "./utils/seo";
import {
  buildLocalizedPath,
  defaultLocale,
  getRoutePattern,
  isLocale,
  parsePathname,
  type PageType,
} from "./routing";
import "./styles/mobile-quick-nav.css";

const HeroSection = lazy(() => import("./components/HeroSection").then((mod) => ({ default: mod.HeroSection })));
const ServicesSection = lazy(() =>
  import("./components/ServicesSection").then((mod) => ({ default: mod.ServicesSection })),
);
const PortfolioSection = lazy(() =>
  import("./components/PortfolioSection").then((mod) => ({ default: mod.PortfolioSection })),
);
const AboutSection = lazy(() => import("./components/AboutSection").then((mod) => ({ default: mod.AboutSection })));
const TestimonialsSection = lazy(() =>
  import("./components/TestimonialsSection").then((mod) => ({ default: mod.TestimonialsSection })),
);
const ContactSection = lazy(() => import("./components/ContactSection").then((mod) => ({ default: mod.ContactSection })));
const Footer = lazy(() => import("./components/Footer").then((mod) => ({ default: mod.Footer })));
const MobileQuickNav = lazy(() => import("./components/MobileQuickNav").then((mod) => ({ default: mod.MobileQuickNav })));
const WebDesignPage = lazy(() =>
  import("./components/services/WebDesignPage").then((mod) => ({ default: mod.WebDesignPage })),
);
const SEOPage = lazy(() => import("./components/services/SEOPage").then((mod) => ({ default: mod.SEOPage })));
const SocialMediaPage = lazy(() =>
  import("./components/services/SocialMediaPage").then((mod) => ({ default: mod.SocialMediaPage })),
);
const BrandingPage = lazy(() =>
  import("./components/services/BrandingPage").then((mod) => ({ default: mod.BrandingPage })),
);
const StrategyPage = lazy(() => import("./components/services/StrategyPage").then((mod) => ({ default: mod.StrategyPage })));
const ServiceInquiryForm = lazy(() =>
  import("./components/ServiceInquiryForm").then((mod) => ({ default: mod.ServiceInquiryForm })),
);
const FreeConsultationPage = lazy(() =>
  import("./components/FreeConsultationPage").then((mod) => ({ default: mod.FreeConsultationPage })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-slate-50 text-slate-500" aria-busy="true">
      <span className="animate-pulse">Loading...</span>
    </div>
  );
}

function SectionLoader({ label }: { label: string }) {
  return (
    <div className="flex min-h-[280px] items-center justify-center bg-slate-50/60 text-slate-500" aria-busy="true">
      <span className="animate-pulse">Loading {label}…</span>
    </div>
  );
}

function SuspenseSection({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

function withPageSuspense(element: ReactElement, fallback?: ReactNode) {
  return <Suspense fallback={fallback ?? <PageLoader />}>{element}</Suspense>;
}

function SeoMetadataUpdater() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const parsed = parsePathname(location.pathname);
    const locale = parsed.locale ?? language ?? defaultLocale;
    const { title, description } = getSeoMetadata(locale, parsed.page);

    let canonicalCluster: ReturnType<typeof buildCanonicalCluster> | null = null;
    try {
      canonicalCluster = buildCanonicalCluster({
        currentUrl: new URL(window.location.href),
        hasLocalePrefix: parsed.hasLocalePrefix,
        locale,
        page: parsed.page,
        siteBaseUrl: SITE_BASE_URL,
      });
    } catch {
      // Ignore URL parsing errors and fall back to existing canonical metadata
    }

    document.title = title;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", description);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    let fallbackCanonicalHref = canonicalTag.getAttribute("href") ?? window.location.href;
    try {
      const resolved = new URL(fallbackCanonicalHref, window.location.origin);
      resolved.search = "";
      resolved.hash = "";
      fallbackCanonicalHref = resolved.href;
    } catch {
      // Ignore URL parsing errors and fall back to the original href
    }

    const canonicalUrl = canonicalCluster?.canonical ?? fallbackCanonicalHref;

    if (canonicalCluster) {
      canonicalTag.setAttribute("href", canonicalCluster.canonical);

      const existingAlternateTags = Array.from(
        document.querySelectorAll('link[rel="alternate"][hreflang]'),
      );
      for (const tag of existingAlternateTags) {
        tag.remove();
      }

      for (const alternate of canonicalCluster.alternates) {
        const linkTag = document.createElement("link");
        linkTag.setAttribute("rel", "alternate");
        linkTag.setAttribute("hreflang", alternate.hreflang);
        linkTag.setAttribute("href", alternate.href);
        document.head.appendChild(linkTag);
      }
    }

    const structuredData = [
      buildWebPageJsonLd({
        locale,
        title,
        description,
        url: canonicalUrl,
      }),
      buildOrganizationJsonLd({
        locale,
        siteBaseUrl: SITE_BASE_URL,
        logoPath: "/logo.svg",
      }),
      buildWebsiteJsonLd({
        locale,
        siteBaseUrl: SITE_BASE_URL,
      }),
      buildBreadcrumbListJsonLd({
        locale,
        page: parsed.page,
        siteBaseUrl: SITE_BASE_URL,
        canonicalUrl,
        pageTitle: title,
      }),
    ];

    let structuredDataTag = document.getElementById(
      STRUCTURED_DATA_ELEMENT_ID,
    ) as HTMLScriptElement | null;

    if (!structuredDataTag || structuredDataTag.tagName !== "SCRIPT") {
      structuredDataTag = document.createElement("script");
      structuredDataTag.id = STRUCTURED_DATA_ELEMENT_ID;
      structuredDataTag.type = "application/ld+json";
      document.head.appendChild(structuredDataTag);
    }

    structuredDataTag.type = "application/ld+json";
    structuredDataTag.textContent = serializeJsonLd(structuredData);
  }, [language, location.pathname, location.search, location.hash]);

  return null;
}

function HomePage() {
  return (
    <>
      <section id="hero" data-anchor>
        <SuspenseSection fallback={<SectionLoader label="Hero" />}>
          <HeroSection />
        </SuspenseSection>
      </section>
      <section id="services" data-anchor>
        <SuspenseSection fallback={<SectionLoader label="Services" />}>
          <ServicesSection />
        </SuspenseSection>
      </section>
      <section id="portfolio" data-anchor>
        <SuspenseSection fallback={<SectionLoader label="Portfolio" />}>
          <PortfolioSection />
        </SuspenseSection>
      </section>
      <section id="about" data-anchor>
        <SuspenseSection fallback={<SectionLoader label="About" />}>
          <AboutSection />
        </SuspenseSection>
      </section>
      <section id="testimonials" data-anchor>
        <SuspenseSection fallback={<SectionLoader label="Testimonials" />}>
          <TestimonialsSection />
        </SuspenseSection>
      </section>
      <section id="contact" data-anchor>
        <SuspenseSection fallback={<SectionLoader label="Contact" />}>
          <ContactSection />
        </SuspenseSection>
      </section>
    </>
  );
}

function AppLayout() {
  const location = useLocation();
  const isHome = parsePathname(location.pathname).page === "home";
  const initialState = useInitialState();
  const footerYear = initialState?.footerYear ? String(initialState.footerYear) : undefined;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation />
      <main id="app-content">
        <Outlet />
      </main>
      {isHome && (
        <Suspense fallback={null}>
          <MobileQuickNav />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <Footer initialYear={footerYear} />
      </Suspense>
    </div>
  );
}

function LocalizedLayout() {
  const params = useParams<{ locale?: string }>();
  const location = useLocation();
  const parsed = parsePathname(location.pathname);
  const routeLocale = isLocale(params.locale) ? params.locale : undefined;
  const initialLanguage = routeLocale ?? parsed.locale ?? defaultLocale;

  return (
    <ThemeProvider>
      <LanguageProvider initialLanguage={initialLanguage} localeFromRoute={routeLocale}>
        <SeoMetadataUpdater />
        <AppLayout />
      </LanguageProvider>
    </ThemeProvider>
  );
}

const pageElements: Record<PageType, ReactElement> = {
  home: withPageSuspense(<HomePage />),
  "web-design": withPageSuspense(<WebDesignPage />),
  seo: withPageSuspense(<SEOPage />),
  "social-media": withPageSuspense(<SocialMediaPage />),
  branding: withPageSuspense(<BrandingPage />),
  strategy: withPageSuspense(<StrategyPage />),
  "service-inquiry": withPageSuspense(<ServiceInquiryForm />),
  "free-consultation": withPageSuspense(<FreeConsultationPage />),
};

function createChildRoutes(): RouteObject[] {
  const routes: RouteObject[] = [
    { index: true, element: pageElements.home },
    { path: ":homeSlug(home)", element: pageElements.home },
  ];

  (Object.keys(pageElements) as PageType[]).forEach((page) => {
    if (page === "home") {
      return;
    }
    const pattern = getRoutePattern(page);
    if (pattern) {
      routes.push({ path: pattern, element: pageElements[page] });
    }
  });

  return routes;
}

const localizedChildren = createChildRoutes();

export const appRouteObjects: RouteObject[] = [
  {
    path: "/",
    element: <LocalizedLayout />,
    children: localizedChildren,
  },
  {
    path: "/:locale(en|me|fr)",
    element: <LocalizedLayout />,
    children: localizedChildren,
  },
  {
    path: "*",
    element: (
      <Navigate to={buildLocalizedPath(defaultLocale, "home", { includeLocalePrefix: false })} replace />
    ),
  },
];

export function AppRoutes() {
  const element = useRoutes(appRouteObjects);

  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export default AppRoutes;
