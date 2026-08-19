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
  const open = (page: PageType) =>
    navigate(buildLocalizedPath(activeLocale, page, { includeLocalePrefix }));

  const featured = {
    id: "strategy" as PageType,
    icon: Target,
    title: t("services.strategy.title"),
    description: t("services.strategy.desc"),
  };
  const primary = [
    {
      id: "web-design" as PageType,
      icon: Monitor,
      title: t("services.web.title"),
      description: t("services.web.desc"),
    },
    {
      id: "seo" as PageType,
      icon: Search,
      title: t("services.seo.title"),
      description: t("services.seo.desc"),
    },
  ];
  const supporting = [
    {
      id: "social-media" as PageType,
      icon: Share2,
      title: t("services.social.title"),
      description: t("services.social.desc"),
    },
    {
      id: "branding" as PageType,
      icon: Palette,
      title: t("services.branding.title"),
      description: t("services.branding.desc"),
    },
  ];
  const FeaturedIcon = featured.icon;

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

        <div className="grid border-b border-slate-300 dark:border-slate-700 lg:grid-cols-12">
          <div className="py-8 lg:col-span-3 lg:py-14">
            <p className="eyebrow">{t("services.group.strategy")}</p>
          </div>
          <button
            type="button"
            onClick={() => open(featured.id)}
            className="focus-ring group grid gap-7 border-t border-slate-300 py-12 text-left dark:border-slate-700 lg:col-span-9 lg:grid-cols-9 lg:border-l lg:border-t-0 lg:px-10 lg:py-20"
          >
            <FeaturedIcon
              className="h-6 w-6 text-slate-400 lg:col-span-1"
              aria-hidden="true"
            />
            <span className="lg:col-span-7">
              <span className="block text-4xl font-semibold tracking-[-0.04em] text-bdigital-navy sm:text-5xl dark:text-white">
                {featured.title}
              </span>
              <span className="mt-6 block max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {featured.description}
              </span>
              <span className="mt-8 block max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                {t("services.strategy.guidance")}
              </span>
            </span>
            <ArrowUpRight
              className="h-5 w-5 text-slate-400 transition-colors group-hover:text-bdigital-navy dark:group-hover:text-white lg:justify-self-end"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="grid border-b border-slate-300 dark:border-slate-700 lg:grid-cols-12">
          <div className="py-8 lg:col-span-3 lg:py-12">
            <p className="eyebrow">{t("services.group.execution")}</p>
          </div>
          <div className="grid border-t border-slate-300 dark:border-slate-700 md:grid-cols-2 lg:col-span-9 lg:border-l lg:border-t-0">
            {primary.map((service, index) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => open(service.id)}
                  className={`focus-ring group flex min-h-72 flex-col items-start justify-between py-10 text-left md:px-8 lg:p-10 ${index === 0 ? "border-b border-slate-300 dark:border-slate-700 md:border-b-0 md:border-r" : ""}`}
                >
                  <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  <span className="mt-12">
                    <span className="block text-2xl font-semibold tracking-tight text-bdigital-navy dark:text-white">
                      {service.title}
                    </span>
                    <span className="mt-4 block text-base leading-7 text-slate-600 dark:text-slate-300">
                      {service.description}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="mt-8 h-5 w-5 text-slate-400 transition-colors group-hover:text-bdigital-navy dark:group-hover:text-white"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-12">
          <div className="py-8 lg:col-span-3 lg:py-12">
            <p className="eyebrow">{t("services.group.supporting")}</p>
          </div>
          <div className="border-t border-slate-300 dark:border-slate-700 lg:col-span-9 lg:border-l lg:border-t-0">
            {supporting.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => open(service.id)}
                  className="focus-ring group grid w-full gap-5 border-b border-slate-300 py-8 text-left last:border-b-0 dark:border-slate-700 sm:grid-cols-[2rem_1fr_1.2fr_auto] sm:items-center lg:px-10"
                >
                  <Icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  <span className="font-semibold text-bdigital-navy dark:text-white">
                    {service.title}
                  </span>
                  <span className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {service.description}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-slate-400 transition-colors group-hover:text-bdigital-navy dark:group-hover:text-white"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
            <p className="py-8 text-sm leading-6 text-slate-500 dark:text-slate-400 lg:px-10">
              {t("services.unsure")}{" "}
              <button
                type="button"
                onClick={() => open("free-consultation")}
                className="focus-ring font-semibold text-bdigital-navy underline decoration-slate-300 underline-offset-4 hover:decoration-current dark:text-white dark:decoration-slate-600"
              >
                {t("web.cta.primary")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
