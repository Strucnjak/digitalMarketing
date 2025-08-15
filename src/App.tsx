import { LanguageProvider } from "./components/LanguageContext";
import { RouterProvider, useRouter } from "./components/Router";
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
import "./styles/mobile-quick-nav.css";

const sections = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "about", label: "About" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" data-anchor>
        <HeroSection />
      </section>

      {/* Services Section */}
      <section id="services" data-anchor>
        <ServicesSection />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" data-anchor>
        <PortfolioSection />
      </section>

      {/* About Section */}
      <section id="about" data-anchor>
        <AboutSection />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" data-anchor>
        <TestimonialsSection />
      </section>

      {/* Contact Section */}
      <section id="contact" data-anchor>
        <ContactSection />
      </section>
    </>
  );
}

function AppContent() {
  const { currentPage } = useRouter();

  const renderPage = () => {
    switch (currentPage) {
      case "web-design":
        return <WebDesignPage />;
      case "seo":
        return <SEOPage />;
      case "social-media":
        return <SocialMediaPage />;
      case "branding":
        return <BrandingPage />;
      case "strategy":
        return <StrategyPage />;
      case "service-inquiry":
        return <ServiceInquiryForm />;
      case "free-consultation":
        return <FreeConsultationPage />;
      case "home":
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main id="app-content">{renderPage()}</main>

      {/* Mobile Quick Navigation */}
      {currentPage === "home" && (
        <MobileQuickNav
          sections={sections}
          stickyOffsetPx={64}
          collisionOffsetPx={16}
          topThresholdPx={300}
        />
      )}

      {/* Footer - only show on home page */}
      {currentPage === "home" && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </LanguageProvider>
  );
}
