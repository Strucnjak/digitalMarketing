import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { LanguageProvider } from "./components/LanguageContext";
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
import { useRouter } from "./components/Router";
import {
  buildPath,
  defaultLocale,
  isLocale,
  type Locale,
} from "./routing";
import "./styles/mobile-quick-nav.css";

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
  const { currentPage } = useRouter();
  const isHome = currentPage === "home";

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

function LocaleBoundary({ locale }: { locale: Locale }) {
  return (
    <LanguageProvider initialLanguage={locale}>
      <AppLayout />
    </LanguageProvider>
  );
}

function LocaleRouteBoundary() {
  const params = useParams<Record<string, string>>();
  const paramLocale = params.locale;
  const locale = isLocale(paramLocale) ? paramLocale : defaultLocale;
  return <LocaleBoundary locale={locale} />;
}

function DefaultLocaleBoundary() {
  return <LocaleBoundary locale={defaultLocale} />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<DefaultLocaleBoundary />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="web-design" element={<WebDesignPage />} />
        <Route path="seo" element={<SEOPage />} />
        <Route path="social-media" element={<SocialMediaPage />} />
        <Route path="branding" element={<BrandingPage />} />
        <Route path="strategy" element={<StrategyPage />} />
        <Route path="service-inquiry" element={<ServiceInquiryForm />} />
        <Route path="free-consultation" element={<FreeConsultationPage />} />
      </Route>
      <Route path=":locale(en|me)" element={<LocaleRouteBoundary />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="web-design" element={<WebDesignPage />} />
        <Route path="seo" element={<SEOPage />} />
        <Route path="social-media" element={<SocialMediaPage />} />
        <Route path="branding" element={<BrandingPage />} />
        <Route path="strategy" element={<StrategyPage />} />
        <Route path="service-inquiry" element={<ServiceInquiryForm />} />
        <Route path="free-consultation" element={<FreeConsultationPage />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to={buildPath("home", defaultLocale, { includeLocalePrefix: false })} replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
