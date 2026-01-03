import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, Target, BarChart3, Users, ArrowRight, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useLanguage } from "../LanguageContext";
import { useActiveLocale } from "../../hooks/useActiveLocale";
import { buildLocalizedPath } from "../../routing";

export function StrategyPage() {
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const { t } = useLanguage();

  const services = [
    {
      icon: TrendingUp,
      title: t("strategy.feature.digital"),
      description: t("strategy.service.digital_desc"),
    },
    {
      icon: Target,
      title: t("services.strategy.feature2"),
      description: t("strategy.service.analysis_desc"),
    },
    {
      icon: BarChart3,
      title: t("services.strategy.feature3"),
      description: t("strategy.service.roi_desc"),
    },
    {
      icon: Users,
      title: t("strategy.feature.consulting"),
      description: t("strategy.service.consulting_desc"),
    },
  ];

  const packages = [
    {
      name: t("strategy.package.starter.name"),
      features: [
        t("strategy.package.starter.feature1"),
        t("strategy.package.starter.feature2"),
        t("strategy.package.starter.feature3"),
        t("strategy.package.starter.feature4"),
        t("strategy.package.starter.feature5"),
      ],
    },
    {
      name: t("strategy.package.professional.name"),
      features: [
        t("strategy.package.professional.feature1"),
        t("strategy.package.professional.feature2"),
        t("strategy.package.professional.feature3"),
        t("strategy.package.professional.feature4"),
        t("strategy.package.professional.feature5"),
      ],
      popular: true,
    },
    {
      name: t("strategy.package.enterprise.name"),
      features: [
        t("strategy.package.enterprise.feature1"),
        t("strategy.package.enterprise.feature2"),
        t("strategy.package.enterprise.feature3"),
        t("strategy.package.enterprise.feature4"),
        t("strategy.package.enterprise.feature5"),
      ],
    },
  ];

  const handlePackageSelect = (packageName: string) => {
    const path = buildLocalizedPath(activeLocale, "service-inquiry", { includeLocalePrefix });
    const search = new URLSearchParams({ service: "strategy", package: packageName });
    navigate(`${path}?${search.toString()}`);
  };

  const handleConsultation = () => {
    const path = buildLocalizedPath(activeLocale, "service-inquiry", { includeLocalePrefix });
    const search = new URLSearchParams({ service: "strategy" });
    navigate(`${path}?${search.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-bdigital-navy via-bdigital-dark-navy to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-bdigital-cyan/20 text-bdigital-cyan border-bdigital-cyan mb-4">{t("strategy.badge")}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-bdigital-cyan">{t("strategy.hero.emphasis")}</span> {t("strategy.hero.trailing")}
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">{t("strategy.hero.desc")}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
                  onClick={handleConsultation}
                >
                  {t("strategy.hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-bdigital-cyan text-bdigital-cyan hover:bg-bdigital-cyan hover:text-bdigital-navy px-8 py-3 font-semibold"
                  onClick={() => {
                    const path = buildLocalizedPath(activeLocale, "home", { includeLocalePrefix });
                    navigate(path);
                  }}
                >
                  {t("general.back_home")}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900 dark:shadow-black/40">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop"
                  alt="Strategy"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-bdigital-navy md:text-4xl dark:text-slate-100">{t("strategy.services.heading")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg transition-all duration-300 group hover:shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-bdigital-cyan/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-bdigital-cyan group-hover:text-white transition-all duration-300">
                      <IconComponent className="h-6 w-6 text-bdigital-cyan group-hover:text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-bdigital-navy dark:text-slate-100">{service.title}</h3>
                    <p className="text-neutral-gray leading-relaxed dark:text-slate-300">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-bdigital-navy md:text-4xl dark:text-slate-100">{t("strategy.pricing.heading")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-lg transition-all duration-300 hover:shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900 ${
                  pkg.popular ? "ring-2 ring-bdigital-cyan" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-bdigital-cyan text-bdigital-navy px-4 py-1">{t("packages.most_popular")}</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="mb-2 text-xl font-bold text-bdigital-navy dark:text-slate-100">{pkg.name}</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-bdigital-cyan-dark mr-3 flex-shrink-0" />
                        <span className="text-neutral-gray dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${pkg.popular ? "bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light" : "border border-bdigital-cyan-dark text-bdigital-cyan-dark hover:bg-bdigital-cyan hover:text-bdigital-navy"} font-semibold`}
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() => handlePackageSelect(pkg.name)}
                  >
                    {t("packages.select")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>{" "}
          {/* Pricing Note */}
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-neutral-gray dark:text-slate-300">{t("web.pricing.note")}</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("strategy.cta.title")}</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">{t("strategy.cta.desc")}</p>
          <Button
            size="lg"
            className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
            onClick={handleConsultation}
          >
            {t("strategy.cta.primary")}
          </Button>
        </div>
      </section>
    </div>
  );
}
