import { useLanguage } from "./LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type ProjectDefinition = {
  id: string;
  title: string;
  image: string;
  placeholder: true;
};

// These remote images are explicitly temporary editorial placeholders. Replace them with
// client-approved project screenshots or campaign creative before presenting them as work proof.
const projectDefinitions: ProjectDefinition[] = [
  {
    id: "properties",
    title: "Montenegrin Properties",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=900&fit=crop&q=85",
    placeholder: true,
  },
  {
    id: "adriatic",
    title: "Adriatic Adventures",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&h=800&fit=crop&q=85",
    placeholder: true,
  },
  {
    id: "techstart",
    title: "TechStart Montenegro",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1000&h=800&fit=crop&q=85",
    placeholder: true,
  },
];

export function PortfolioSection() {
  const { t } = useLanguage();
  const translated = (key: string) => {
    const value = t(key);
    return value === key ? null : value;
  };

  return (
    <section
      id="portfolio"
      className="section-shell bg-white dark:bg-bdigital-midnight"
    >
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-7">{t("portfolio.badge")}</p>
            <h2 className="section-title text-bdigital-navy dark:text-white">
              {t("portfolio.heading.part1")} {t("portfolio.heading.emphasis")}{" "}
              {t("portfolio.heading.part2")}
            </h2>
          </div>
          <p className="lead-copy lg:col-span-4">
            {t("portfolio.description")}
          </p>
        </div>

        <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-32">
          {projectDefinitions.map((definition, index) => {
            const prefix = `portfolio.projects.${definition.id}`;
            const fields = ["context", "challenge", "intervention", "outcome"]
              .map((field) => ({
                label: t(`portfolio.case.${field}`),
                value: translated(`${prefix}.${field}`),
              }))
              .filter((field): field is { label: string; value: string } =>
                Boolean(field.value),
              );
            return (
              <article
                key={definition.id}
                className="grid gap-8 lg:grid-cols-12 lg:gap-10"
              >
                <div
                  className={`${index === 0 ? "lg:col-span-8" : "lg:col-span-7 lg:col-start-2"} ${index % 2 === 1 ? "lg:order-2 lg:col-start-6" : ""}`}
                >
                  <div
                    className={`${index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"} relative overflow-hidden rounded-lg bg-slate-100 dark:bg-bdigital-night`}
                  >
                    <ImageWithFallback
                      src={definition.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    {definition.placeholder && (
                      <p className="absolute inset-x-0 bottom-0 bg-bdigital-navy/90 px-4 py-3 text-xs leading-5 text-slate-200">
                        {t("portfolio.image_placeholder")}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className={`${index === 0 ? "lg:col-span-4" : "lg:col-span-4"} ${index % 2 === 1 ? "lg:order-1 lg:col-start-1" : ""} flex flex-col justify-end`}
                >
                  <p className="font-mono text-xs text-slate-400">
                    0{index + 1}
                  </p>
                  <p className="mt-8 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {t(`${prefix}.category`)} · {t(`${prefix}.year`)}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-bdigital-navy dark:text-white">
                    {definition.title}
                  </h3>
                  <dl className="mt-8 border-t border-slate-300 dark:border-slate-700">
                    {fields.map((field) => (
                      <div
                        key={field.label}
                        className="grid gap-2 border-b border-slate-200 py-5 dark:border-slate-800 sm:grid-cols-[7rem_1fr]"
                      >
                        <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                          {field.label}
                        </dt>
                        <dd className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {field.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
