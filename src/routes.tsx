import { useEffect, type ReactElement } from "react";
import { Navigate, Outlet, useLocation, useParams, useRoutes, type RouteObject } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./components/LanguageContext";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { AboutSection } from "./components/AboutSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { WebDesignPage } from "./components/services/WebDesignPage";
import { SEOPage } from "./components/services/SEOPage";
import { SocialMediaPage } from "./components/services/SocialMediaPage";
import { BrandingPage } from "./components/services/BrandingPage";
import { StrategyPage } from "./components/services/StrategyPage";
import { ServiceInquiryForm } from "./components/ServiceInquiryForm";
import { FreeConsultationPage } from "./components/FreeConsultationPage";
import { MobileQuickNav } from "./components/MobileQuickNav";
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
        <HeroSection />
      </section>
      <section id="services" data-anchor>
        <ServicesSection />
      </section>
      <section id="portfolio" data-anchor>
        <PortfolioSection />
      </section>
      <section id="about" data-anchor>
        <AboutSection />
      </section>
      <section id="testimonials" data-anchor>
        <TestimonialsSection />
      </section>
      <section id="contact" data-anchor>
        <ContactSection />
      </section>
    </>
  );
}

function AppLayout() {
  const location = useLocation();
  const isHome = parsePathname(location.pathname).page === "home";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main id="app-content">
        <Outlet />
      </main>
      {isHome && <MobileQuickNav />}
      {isHome && <Footer />}
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
    <LanguageProvider initialLanguage={initialLanguage} localeFromRoute={routeLocale}>
      <SeoMetadataUpdater />
      <AppLayout />
    </LanguageProvider>
  );
}

const pageElements: Record<PageType, ReactElement> = {
  home: <HomePage />,
  "web-design": <WebDesignPage />,
  seo: <SEOPage />,
  "social-media": <SocialMediaPage />,
  branding: <BrandingPage />,
  strategy: <StrategyPage />,
  "service-inquiry": <ServiceInquiryForm />,
  "free-consultation": <FreeConsultationPage />,
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
    path: "/:locale(en|me)",
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
  return useRoutes(appRouteObjects);
}

export default AppRoutes;
