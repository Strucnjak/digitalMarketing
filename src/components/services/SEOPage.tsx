import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useActiveLocale } from "../../hooks/useActiveLocale";
import { buildLocalizedPath } from "../../routing";

const serviceKeys = [
  "keyword",
  "onpage",
  "local",
  "reporting",
  "mobile",
  "technical",
] as const;
const packageKeys = ["starter", "professional", "enterprise"] as const;
const featureCounts = { starter: 5, professional: 6, enterprise: 6 } as const;

export function SEOPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const path = (page: "home" | "service-inquiry") =>
    buildLocalizedPath(activeLocale, page, { includeLocalePrefix });
  const requestSeo = (packageName?: string) => {
    const search = new URLSearchParams({ service: "seo" });
    if (packageName) search.set("package", packageName);
    navigate(`${path("service-inquiry")}?${search.toString()}`);
  };

  return (
    <main className="min-h-screen bg-surface dark:bg-background">
      <section className="bg-bdigital-navy pb-20 pt-28 text-white lg:pb-28 lg:pt-36">
        <div className="site-container">
          <button
            type="button"
            onClick={() => navigate(path("home"))}
            className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("general.back_home")}
          </button>
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow !text-slate-300">{t("seo.badge")}</p>
              <h1 className="display-title mt-7 text-white">
                {t("seo.hero.part1")} {t("seo.hero.emphasis")}{" "}
                {t("seo.hero.part2")}
              </h1>
            </div>
            <div className="lg:col-span-4 lg:self-end">
              <p className="text-lg leading-8 text-slate-300">
                {t("seo.hero.desc")}
              </p>
              <button
                type="button"
                onClick={() => requestSeo()}
                className="focus-ring mt-8 inline-flex min-h-12 items-center rounded-md bg-accent px-6 font-semibold text-text-primary"
              >
                {t("seo.hero.cta")}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-shell bg-surface-subtle dark:bg-background"
        aria-labelledby="seo-services-title"
      >
        <div className="site-container">
          <div className="grid gap-8 border-b border-border-default pb-14 dark:border-border-default lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow">{t("seo.badge")}</p>
              <h2
                id="seo-services-title"
                className="section-title mt-7 text-text-primary dark:text-white"
              >
                {t("seo.services.heading")}
              </h2>
            </div>
            <p className="lead-copy lg:col-span-4 lg:self-end">
              {t("seo.services.desc")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {serviceKeys.map((key, index) => (
              <article
                key={key}
                className="border-b border-border-default py-9 md:px-8 md:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 dark:border-border-default"
              >
                <Search className="h-5 w-5 text-text-muted" aria-hidden="true" />
                <h3 className="mt-8 text-xl font-semibold text-text-primary dark:text-white">
                  {t(`seo.service.${key}.title`)}
                </h3>
                <p className="mt-3 leading-7 text-text-secondary dark:text-text-secondary">
                  {t(`seo.service.${key}.description`)}
                </p>
                <span className="sr-only">{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-shell bg-surface dark:bg-background"
        aria-labelledby="seo-packages-title"
      >
        <div className="site-container">
          <div className="max-w-4xl">
            <p className="eyebrow">{t("seo.pricing.heading")}</p>
            <h2
              id="seo-packages-title"
              className="section-title mt-7 text-text-primary dark:text-white"
            >
              {t("seo.pricing.desc")}
            </h2>
          </div>
          <div className="mt-14 border-t border-border-default dark:border-border-default">
            {packageKeys.map((packageKey) => {
              const name = t(`seo.package.${packageKey}.name`);
              return (
                <article
                  key={packageKey}
                  className="grid gap-7 border-b border-border-default py-10 dark:border-border-default lg:grid-cols-12 lg:items-start"
                >
                  <div className="lg:col-span-3">
                    <h3 className="text-2xl font-semibold text-text-primary dark:text-white">
                      {name}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted dark:text-text-muted">
                      {t(`seo.package.${packageKey}.desc`)}
                    </p>
                  </div>
                  <ul className="grid gap-3 text-sm text-text-secondary sm:grid-cols-2 dark:text-text-secondary lg:col-span-6">
                    {Array.from(
                      { length: featureCounts[packageKey] },
                      (_, index) => (
                        <li key={index} className="flex gap-3">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-text-muted"
                            aria-hidden="true"
                          />
                          {t(`seo.package.${packageKey}.feature${index + 1}`)}
                        </li>
                      ),
                    )}
                  </ul>
                  <button
                    type="button"
                    onClick={() => requestSeo(name)}
                    className="focus-ring min-h-11 justify-self-start border-b border-border-strong px-1 font-semibold text-text-primary dark:text-white lg:col-span-3 lg:justify-self-end"
                  >
                    {t("packages.select")}
                  </button>
                </article>
              );
            })}
          </div>
          <p className="mt-7 text-sm text-text-muted dark:text-text-muted">
            {t("web.pricing.note")}
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-bdigital-dark-navy py-20 text-white">
        <div className="site-container grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow !text-text-muted">{t("seo.badge")}</p>
            <h2 className="section-title mt-7 text-white">
              {t("seo.cta.title")}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {t("seo.cta.desc")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => requestSeo()}
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 font-semibold text-text-primary lg:col-span-4 lg:justify-self-end"
          >
            {t("seo.cta.primary")}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}
