import {
  ArrowUpRight,
  Monitor,
  Palette,
  Search,
  Share2,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { buildLocalizedPath, type PageType } from "../routing";

export function ServicesSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const services = [
    {
      id: "web-design",
      icon: Monitor,
      title: t("services.web.title"),
      description: t("services.web.desc"),
    },
    {
      id: "seo",
      icon: Search,
      title: t("services.seo.title"),
      description: t("services.seo.desc"),
    },
    {
      id: "strategy",
      icon: Target,
      title: t("services.strategy.title"),
      description: t("services.strategy.desc"),
    },
    {
      id: "social-media",
      icon: Share2,
      title: t("services.social.title"),
      description: t("services.social.desc"),
    },
    {
      id: "branding",
      icon: Palette,
      title: t("services.branding.title"),
      description: t("services.branding.desc"),
    },
  ] as const;

  const openService = (id: PageType) =>
    navigate(buildLocalizedPath(activeLocale, id, { includeLocalePrefix }));

  return (
    <section
      id="services"
      className="section-shell bg-slate-50 dark:bg-bdigital-midnight"
    >
      <div className="site-container">
        <div className="grid gap-10 border-b border-slate-300 pb-14 dark:border-slate-700 lg:grid-cols-12 lg:gap-8 lg:pb-20">
          <p className="eyebrow lg:col-span-3">{t("services.title")}</p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h2 className="section-title text-bdigital-navy dark:text-white">
              {t("services.heading.part1")}{" "}
              <span className="text-bdigital-cyan-dark dark:text-bdigital-cyan">
                {t("services.heading.emphasis")}
              </span>
            </h2>
            <p className="lead-copy mt-7 max-w-3xl">
              {t("services.description")}
            </p>
          </div>
        </div>

        <div>
          {services.map((service, index) => {
            const Icon = service.icon;
            const featured = index === 0;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => openService(service.id as PageType)}
                className={`focus-ring group grid w-full gap-6 border-b border-slate-300 py-10 text-left dark:border-slate-700 sm:grid-cols-[4rem_1fr_auto] sm:items-start lg:py-14 ${featured ? "lg:py-20" : ""}`}
              >
                <span className="font-mono text-sm text-slate-400">
                  0{index + 1}
                </span>
                <span className="grid gap-5 lg:grid-cols-12 lg:gap-8">
                  <span className="flex items-center gap-4 lg:col-span-5">
                    <Icon
                      className="h-5 w-5 text-slate-400"
                      aria-hidden="true"
                    />
                    <span
                      className={`${featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"} font-semibold tracking-tight text-bdigital-navy dark:text-white`}
                    >
                      {service.title}
                    </span>
                  </span>
                  <span className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 lg:col-span-6">
                    {service.description}
                  </span>
                </span>
                <ArrowUpRight
                  className="hidden h-5 w-5 text-slate-400 transition-colors group-hover:text-bdigital-cyan-dark dark:group-hover:text-bdigital-cyan sm:block"
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
