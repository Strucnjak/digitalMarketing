import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Monitor, Zap, Search, ShoppingCart, Palette, Code, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useActiveLocale } from "../../hooks/useActiveLocale";
import { buildLocalizedPath } from "../../routing";

export function WebDesignPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();

  const features = [
    {
      icon: Monitor,
      title: t("web.feature.responsive"),
      description: t("web.feature.responsive_desc"),
    },
    {
      icon: Zap,
      title: t("web.feature.speed"),
      description: t("web.feature.speed_desc"),
    },
    {
      icon: Search,
      title: t("web.feature.seo"),
      description: t("web.feature.seo_desc"),
    },
    {
      icon: ShoppingCart,
      title: t("web.feature.ecommerce"),
      description: t("web.feature.ecommerce_desc"),
    },
    {
      icon: Palette,
      title: t("web.feature.design"),
      description: t("web.feature.design_desc"),
    },
    {
      icon: Code,
      title: t("web.feature.clean_code"),
      description: t("web.feature.clean_code_desc"),
    },
  ];

  const process = [
    {
      step: "01",
      title: t("web.process.step1.title"),
      description: t("web.process.step1.desc"),
      duration: t("web.process.step1.duration"),
    },
    {
      step: "02",
      title: t("web.process.step2.title"),
      description: t("web.process.step2.desc"),
      duration: t("web.process.step2.duration"),
    },
    {
      step: "03",
      title: t("web.process.step3.title"),
      description: t("web.process.step3.desc"),
      duration: t("web.process.step3.duration"),
    },
    {
      step: "04",
      title: t("web.process.step4.title"),
      description: t("web.process.step4.desc"),
      duration: t("web.process.step4.duration"),
    },
  ];

  const packages = [
    {
      name: t("web.package.starter.name"),
      description: t("web.package.starter.desc"),
      features: [
        t("web.package.starter.feature1"),
        t("web.package.starter.feature2"),
        t("web.package.starter.feature3"),
        t("web.package.starter.feature4"),
        t("web.package.starter.feature5"),
      ],
      popular: false,
    },
    {
      name: t("web.package.professional.name"),
      description: t("web.package.professional.desc"),
      features: [
        t("web.package.professional.feature1"),
        t("web.package.professional.feature2"),
        t("web.package.professional.feature3"),
        t("web.package.professional.feature4"),
        t("web.package.professional.feature5"),
        t("web.package.professional.feature6"),
      ],
      popular: true,
    },
    {
      name: t("web.package.enterprise.name"),
      description: t("web.package.enterprise.desc"),
      features: [
        t("web.package.enterprise.feature1"),
        t("web.package.enterprise.feature2"),
        t("web.package.enterprise.feature3"),
        t("web.package.enterprise.feature4"),
        t("web.package.enterprise.feature5"),
        t("web.package.enterprise.feature6"),
      ],
      popular: false,
    },
  ];

  const portfolio = [
    {
      title: "Restoran Konoba",
      category: "Restaurant Website",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      description: t("web.portfolio.project1.desc"),
    },
    {
      title: "Montenegro Properties",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      description: t("web.portfolio.project2.desc"),
    },
    {
      title: "Tech Startup",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      description: t("web.portfolio.project3.desc"),
    },
  ];

  const handlePackageSelect = (packageName: string) => {
    const path = buildLocalizedPath(activeLocale, "service-inquiry", { includeLocalePrefix });
    const search = new URLSearchParams({ service: "web-design", package: packageName });
    navigate(`${path}?${search.toString()}`);
  };

  const handleConsultation = () => {
    const path = buildLocalizedPath(activeLocale, "service-inquiry", { includeLocalePrefix });
    const search = new URLSearchParams({ service: "web-design" });
    navigate(`${path}?${search.toString()}`);
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-bdigital-navy via-bdigital-dark-navy to-bdigital-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-accent/20 text-accent-strong border-accent-border mb-4">{t("web.badge")}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t("web.hero.part1")} <span className="text-accent-strong">{t("web.hero.emphasis")}</span> {t("web.hero.part2")}
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">{t("web.hero.desc")}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-accent text-bdigital-navy hover:bg-accent-hover px-8 py-3 font-semibold"
                  onClick={handleConsultation}
                >
                  {t("web.hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent-border text-accent-strong hover:bg-accent hover:text-text-primary px-8 py-3 font-semibold"
                  onClick={() => {
                    const path = buildLocalizedPath(activeLocale, "home", { includeLocalePrefix });
                    navigate(path);
                  }}
                >
                  {t("general.back_home")}
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-600">
                <div>
                  <div className="text-2xl font-bold text-accent-strong">50+</div>
                  <div className="text-gray-400 text-sm">{t("web.stat.sites")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-strong">99%</div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-strong">24h</div>
                  <div className="text-gray-400 text-sm">{t("web.stat.support")}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl bg-surface p-8 shadow-2xl dark:bg-surface dark:shadow-black/40">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=400&fit=crop"
                  alt="Web development"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-surface-subtle py-20 dark:bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl dark:text-slate-100">{t("web.features.heading")}</h2>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary dark:text-text-secondary">{t("web.features.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border border-border-subtle shadow-sm transition-colors duration-300 group hover:border-border-default dark:bg-surface"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-surface-subtle rounded-xl flex items-center justify-center mb-4 text-text-secondary transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-text-secondary" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-text-primary dark:text-slate-100">{feature.title}</h3>
                    <p className="text-text-secondary leading-relaxed dark:text-text-secondary">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface py-20 dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl dark:text-slate-100">{t("web.process.heading")}</h2>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary dark:text-text-secondary">{t("web.process.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-surface-elevated border border-border-default rounded-2xl flex items-center justify-center mx-auto mb-4 text-text-primary text-xl font-bold shadow-sm">
                    {step.step}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-text-primary dark:text-slate-100">{step.title}</h3>
                  <p className="mb-2 text-sm text-text-secondary dark:text-text-secondary">{step.description}</p>
                  <div className="flex items-center justify-center gap-1 text-accent-strong text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{step.duration}</span>
                  </div>
                </div>
                {/* Connection line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border-default transform translate-x-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-surface-subtle py-20 dark:bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl dark:text-slate-100">{t("web.pricing.heading")}</h2>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary dark:text-text-secondary">{t("web.pricing.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative border border-border-subtle shadow-sm transition-colors duration-300 hover:border-border-default dark:bg-surface ${
                  pkg.popular ? "ring-2 ring-focus" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-surface-subtle text-text-secondary border border-border-default px-4 py-1">{t("packages.most_popular")}</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl text-text-primary dark:text-slate-100">{pkg.name}</CardTitle>
                  <p className="text-sm text-text-secondary dark:text-text-secondary">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-text-muted mr-3 flex-shrink-0" />
                        <span className="text-text-secondary dark:text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${pkg.popular ? "border border-border-strong bg-surface-subtle text-text-primary hover:bg-surface-elevated" : "border border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary"} font-semibold`}
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() => handlePackageSelect(pkg.name)}
                  >
                    {t("packages.select")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Pricing Note */}
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-text-secondary dark:text-text-secondary">{t("web.pricing.note")}</p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-surface py-20 dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl dark:text-slate-100">{t("web.portfolio.heading")}</h2>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary dark:text-text-secondary">{t("web.portfolio.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg transition-all duration-300 group overflow-hidden hover:shadow-xl dark:border dark:border-bdigital-dark-navy dark:bg-surface"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3 text-xs">
                    {project.category}
                  </Badge>
                  <h3 className="mb-2 text-lg font-bold text-text-primary dark:text-slate-100">{project.title}</h3>
                  <p className="text-sm text-text-secondary dark:text-text-secondary">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("web.cta.title")}</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">{t("web.cta.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent text-bdigital-navy hover:bg-accent-hover px-8 py-3 font-semibold"
              onClick={handleConsultation}
            >
              {t("web.cta.primary")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-accent-border text-accent-strong hover:bg-accent hover:text-text-primary px-8 py-3 font-semibold"
              onClick={handleConsultation}
            >
              {t("web.cta.secondary")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
