import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Target, Eye, Heart, Users, Award, Clock } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { useRouteInfo } from "../hooks/useRouteInfo";
import { buildLocalizedPath, type PageType } from "../routing";

export function AboutSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const routeInfo = useRouteInfo();

  const values = [
    {
      icon: Target,
      title: t("about.mission.title"),
      description: t("about.mission.desc"),
      color: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-200",
    },
    {
      icon: Eye,
      title: t("about.vision.title"),
      description: t("about.vision.desc"),
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-200",
    },
    {
      icon: Heart,
      title: t("about.values.title"),
      description: t("about.values.desc"),
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/40 dark:text-purple-200",
    },
  ];

  const stats = [
    { icon: Users, number: "50+", label: t("about.stats.clients") },
    { icon: Award, number: "100+", label: t("about.stats.projects") },
    { icon: Clock, number: "3+", label: t("about.stats.years") },
    { icon: Target, number: "98%", label: t("about.stats.success_rate") },
  ];

  const team = [
    {
      name: "Marko Petrović",
      role: "CEO & Creative Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&face",
      description: "Vodi kreativni tim sa više od 5 godina iskustva u digitalnom marketingu.",
    },
    {
      name: "Ana Nikolić",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&face",
      description: "Ekspert za web tehnologije i UX/UI dizajn sa strašću za inovacije.",
    },
    {
      name: "Stefan Jovanović",
      role: "SEO Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&face",
      description: "Specijalizovan za SEO optimizaciju i digitalne strategije.",
    },
  ];

  const scrollToId = (id: string) => {
    const el = document.getElementById(id) || document.querySelector(`#${id}`);
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  };

  const goAndScroll = (route: PageType, id: string) => {
    const tryScroll = () => {
      if (!scrollToId(id)) setTimeout(tryScroll, 50);
    };

    if (routeInfo.page === route) {
      tryScroll();
    } else {
      const path = buildLocalizedPath(activeLocale, route, { includeLocalePrefix });
      navigate(path);
      requestAnimationFrame(tryScroll);
    }
  };

  const handlePrimary = () => goAndScroll("home", "contact");
  const handleSecondary = () => goAndScroll("home", "portfolio");

  return (
    <section id="about" className="bg-white py-20 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold text-bdigital-navy md:text-4xl dark:text-slate-100">{t("about.title")}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-gray dark:text-slate-300">{t("about.subtitle")}</p>
        </div>

        {/* About Description */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <p className="text-lg text-neutral-gray leading-relaxed dark:text-slate-300">{t("about.description")}</p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-bdigital-navy dark:text-slate-100">{value.title}</h3>
                  <p className="text-neutral-gray leading-relaxed dark:text-slate-300">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy rounded-2xl p-8 md:p-12 mb-20 text-white">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("about.stats.title")}</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">{t("about.stats.subtitle")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-bdigital-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-bdigital-cyan" />
                  </div>
                  <div className="text-3xl font-bold text-bdigital-cyan mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h3 className="mb-4 text-2xl font-bold text-bdigital-navy md:text-3xl dark:text-slate-100">{t("about.team.title")}</h3>
          <p className="mx-auto max-w-2xl text-lg text-neutral-gray dark:text-slate-300">{t("about.team.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {team.map((member, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-bdigital-cyan/20 group-hover:border-bdigital-cyan transition-all duration-300"
                  />
                </div>
                <h4 className="mb-2 text-xl font-bold text-bdigital-navy dark:text-slate-100">{member.name}</h4>
                <p className="mb-4 font-medium text-bdigital-cyan-dark dark:text-bdigital-cyan">{member.role}</p>
                <p className="text-sm text-neutral-gray leading-relaxed dark:text-slate-300">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gray-50 p-8 text-center md:p-12 dark:bg-slate-900">
          <h3 className="mb-4 text-2xl font-bold text-bdigital-navy md:text-3xl dark:text-slate-100">{t("about.cta.title")}</h3>
          <p className="mx-auto mb-8 max-w-2xl text-neutral-gray dark:text-slate-300">{t("about.cta.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={handlePrimary}
              className="bg-bdigital-cyan text-bdigital-navy px-8 py-3 rounded-lg font-semibold hover:bg-bdigital-cyan-light transition-colors"
            >
              {t("about.cta.primary")}
            </button>

            <button
              type="button"
              onClick={handleSecondary}
              className="rounded-lg border border-bdigital-cyan-dark px-8 py-3 font-semibold text-bdigital-cyan-dark transition-colors hover:bg-bdigital-cyan hover:text-bdigital-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan-dark dark:text-bdigital-cyan dark:hover:text-slate-900"
            >
              {t("about.cta.secondary")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
