import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { buildLocalizedPath } from "../routing";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/** Allow projects to specify categories as a string (single or comma-separated) or string[] */
function normalizeCategories(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (typeof input === "string") {
    return input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export function PortfolioSection() {
  const { t: _t } = useLanguage();
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  // ---- Data (your original projects; note project 6 has multiple categories) ----
  const projects: Project[] = [
    {
      id: 1,
      title: "Montenegrin Properties",
      category: "web-design",
      categoryLabel: "Web Design",
      description: "Elegantna web stranica za jednu od vodećih agencija za nekretnine u Crnoj Gori sa naprednim sistemom pretrage nekretnina.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      results: ["+280% organskog saobraćaja", "+150% upita", "Top 3 za lokalne pretrage"],
      year: "2024",
      client: "Montenegro Properties",
      duration: "3 meseca",
      link: "#",
    },
    {
      id: 2,
      title: "Adriatic Adventures",
      category: "ecommerce",
      categoryLabel: "E-commerce",
      description: "Kompletan e-commerce sajt za turističku agenciju sa online rezervacijama i payment gateway integracijom.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&q=80",
      technologies: ["Shopify", "React", "Stripe", "SEO"],
      results: ["+320% online rezervacija", "+200% konverzija", "50+ partnera"],
      year: "2024",
      client: "Adriatic Adventures",
      duration: "4 meseca",
      link: "#",
    },
    {
      id: 3,
      title: "Cafe Central",
      category: "web-design",
      categoryLabel: "Web Design",
      description: "Moderna web stranica za restoran sa online menijem, rezervacijama i food delivery integracijom.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&q=80",
      technologies: ["WordPress", "Custom PHP", "MySQL", "Responsive"],
      results: ["+400% online rezervacija", "+180% delivery narudžbi", "5★ Google rating"],
      year: "2023",
      client: "Cafe Central",
      duration: "2 meseca",
      link: "#",
    },
    {
      id: 4,
      title: "TechStart Montenegro",
      category: "branding",
      categoryLabel: "Branding",
      description: "Kompletna rebrand strategija za tehnološki startup uključujući logo, brand guidelines i marketing materijale.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&q=80",
      technologies: ["Adobe Creative Suite", "Figma", "Brand Strategy"],
      results: ["+500% brand recognition", "€2M funding raised", "Award winning design"],
      year: "2023",
      client: "TechStart Montenegro",
      duration: "6 meseci",
      link: "#",
    },
    {
      id: 5,
      title: "Wellness Spa Centar",
      category: "seo",
      categoryLabel: "SEO",
      description: "SEO optimizacija za wellness centar koja je rezultovala dramatičnim povećanjem lokalnih pretaga i rezervacija.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&fit=crop&q=80",
      technologies: ["Technical SEO", "Local SEO", "Content Marketing"],
      results: ["+600% lokalnih pretaga", "+250% rezervacija", '#1 za "spa Podgorica"'],
      year: "2023",
      client: "Wellness Spa Centar",
      duration: "8 meseci",
      link: "#",
    },
    {
      id: 6,
      title: "Fashion Boutique",
      // multiple categories accepted (comma-separated here; array also works)
      category: "ecommerce, seo",
      categoryLabel: "E-commerce, SEO",
      description: "Luksuzan online shop za modnu butiku sa naprednim filterima, wishlist funkcionalnostima i VIP programom.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&q=80",
      technologies: ["WooCommerce", "React", "PayPal", "Custom Design"],
      results: ["+350% online prodaja", "+180% repeat customers", "Premium UX award"],
      year: "2024",
      client: "Fashion Boutique",
      duration: "3 meseca",
      link: "#",
    },
  ];

  // Map category keys -> localized labels
  const categoryKeyToLabel: Record<string, string> = {
    "web-design": _t("portfolio.filter.web-design"),
    ecommerce: _t("portfolio.filter.ecommerce"),
    branding: _t("portfolio.filter.branding"),
    seo: _t("portfolio.filter.seo"),
  };

  // ---- Build dynamic filters and filtered list ----
  const { filters, filteredProjects } = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of projects) {
      for (const c of normalizeCategories((p as any).category)) {
        counts[c] = (counts[c] ?? 0) + 1;
      }
    }

    const builtFilters = [
      { id: "all", label: _t("portfolio.filter.all"), count: projects.length },
      ...Object.keys(counts)
        .sort()
        .map((id) => ({
          id,
          label: categoryKeyToLabel[id] ?? id,
          count: counts[id],
        })),
    ];

    const filtered = activeFilter === "all" ? projects : projects.filter((p) => normalizeCategories((p as any).category).includes(activeFilter));

    return { filters: builtFilters, filteredProjects: filtered };
  }, [projects, activeFilter, _t]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Pagination/slider logic ----
  const projectsPerPage = 3;
  const totalSlidesRaw = Math.ceil(filteredProjects.length / projectsPerPage);
  const totalSlides = Math.max(1, totalSlidesRaw); // avoid modulo-by-zero

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const getCurrentProjects = () => {
    const start = currentSlide * projectsPerPage;
    return filteredProjects.slice(start, start + projectsPerPage);
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setCurrentSlide(0);
  };

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge className="bg-bdigital-cyan/10 text-bdigital-cyan-dark border-bdigital-cyan-dark/20 mb-4 px-4 py-2">{_t("portfolio.badge")}</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bdigital-navy mb-4 lg:mb-6">
            {_t("portfolio.heading.part1")} <span className="text-bdigital-cyan-dark">{_t("portfolio.heading.emphasis")}</span>{" "}
            {_t("portfolio.heading.part2")}
          </h2>
          <p className="text-lg lg:text-xl text-neutral-gray max-w-3xl mx-auto leading-relaxed">{_t("portfolio.description")}</p>
        </div>

        {/* Filter Tabs (dynamic counts) */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-8 lg:mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium rounded-full transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-bdigital-cyan text-bdigital-navy shadow-lg transform scale-105"
                  : "bg-gray-100 text-neutral-gray hover:bg-gray-200 hover:text-bdigital-navy"
              }`}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
              <span
                className={`ml-2 text-xs font-medium transition-colors duration-200 ${
                  activeFilter === filter.id ? "text-bdigital-navy" : "text-bdigital-cyan-dark"
                }`}
              >
                ({filter.count})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid/Carousel */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
            {getCurrentProjects().map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-3 text-center text-neutral-gray py-12">
                {_t("portfolio.no_results") ?? "No projects found for this filter."}
              </div>
            )}
          </div>

          {/* Mobile Carousel (1 card per slide) */}
          <div className="lg:hidden">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div key={project.id} className="w-full flex-shrink-0 px-4">
                      <ProjectCard project={project} />
                    </div>
                  ))
                ) : (
                  <div className="w-full flex-shrink-0 px-4 py-12 text-center text-neutral-gray">
                    {_t("portfolio.no_results") ?? "No projects found for this filter."}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {totalSlidesRaw > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border-bdigital-cyan-dark text-bdigital-cyan-dark hover:bg-bdigital-cyan hover:text-bdigital-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan-dark"
                aria-label={_t("portfolio.prev") ?? "Previous"}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex space-x-2" role="tablist" aria-label={_t("portfolio.slide_list") ?? "Project slides"}>
                {Array.from({ length: totalSlidesRaw }).map((_, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`group flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan-dark ${
                        isActive ? "text-bdigital-cyan-dark" : "text-gray-500 hover:text-bdigital-cyan-dark"
                      }`}
                      aria-label={`${_t("portfolio.slide") ?? "Slide"} ${index + 1}`}
                      aria-selected={isActive}
                      role="tab"
                      type="button"
                    >
                      <span
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                          isActive ? "bg-bdigital-cyan-dark scale-110" : "bg-gray-300 group-hover:bg-bdigital-cyan-dark"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border-bdigital-cyan-dark text-bdigital-cyan-dark hover:bg-bdigital-cyan hover:text-bdigital-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan-dark"
                aria-label={_t("portfolio.next") ?? "Next"}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">{_t("portfolio.cta.title")}</h3>
            <p className="text-gray-300 text-lg mb-6 lg:mb-8 max-w-2xl mx-auto">{_t("portfolio.cta.desc")}</p>
            <Button
              onClick={() => {
                const path = buildLocalizedPath(activeLocale, "service-inquiry", { includeLocalePrefix });
                navigate(path);
              }}
              className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan"
            >
              {_t("portfolio.cta.primary")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Project Card Component (unchanged UI; adds safe external link handling)
function ProjectCard({ project }: { project: Project }) {
  const openLink = () => {
    if (project.link && project.link !== "#") {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-105">
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-bdigital-cyan text-bdigital-navy text-xs">{project.categoryLabel}</Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-bdigital-navy group-hover:text-bdigital-cyan-dark transition-colors duration-300">{project.title}</h3>
          <div className="flex items-center text-sm text-neutral-gray">
            <Calendar className="h-4 w-4 mr-1" />
            {project.year}
          </div>
        </div>

        <p className="text-neutral-gray leading-relaxed mb-4 text-sm lg:text-base">{project.description}</p>

        {/* Results */}
        <div className="space-y-2 mb-4">
          {project.results.slice(0, 2).map((result: string, index: number) => (
            <div key={index} className="flex items-center text-sm">
              <div className="w-1.5 h-1.5 bg-bdigital-cyan rounded-full mr-2 flex-shrink-0"></div>
              <span className="text-neutral-gray">{result}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-neutral-gray">
            <span className="font-medium">Client:</span> {project.client}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={openLink}
            className="text-bdigital-cyan-dark hover:text-bdigital-navy hover:bg-bdigital-cyan/10 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan-dark"
            aria-label="Open project link"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
