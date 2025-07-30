import React from "react";
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

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* About Section */}
      <AboutSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />
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
      <main>{renderPage()}</main>

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
