import { useLanguage } from "./LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    title: "Montenegrin Properties",
    category: "Web Design",
    description:
      "Elegantna web stranica za jednu od vodećih agencija za nekretnine u Crnoj Gori sa naprednim sistemom pretrage nekretnina.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=900&fit=crop&q=85",
    year: "2024",
  },
  {
    title: "Adriatic Adventures",
    category: "E-commerce",
    description:
      "Kompletan e-commerce sajt za turističku agenciju sa online rezervacijama i payment gateway integracijom.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&h=800&fit=crop&q=85",
    year: "2024",
  },
  {
    title: "TechStart Montenegro",
    category: "Branding",
    description:
      "Kompletna rebrand strategija za tehnološki startup uključujući logo, brand guidelines i marketing materijale.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1000&h=800&fit=crop&q=85",
    year: "2023",
  },
];

export function PortfolioSection() {
  const { t } = useLanguage();
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

        <div className="mt-16 grid gap-x-8 gap-y-16 lg:mt-24 lg:grid-cols-12">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={index === 0 ? "lg:col-span-8" : "lg:col-span-6"}
            >
              <div
                className={`${index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"} overflow-hidden rounded-lg bg-slate-100 dark:bg-bdigital-night`}
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-6 grid gap-4 border-t border-slate-300 pt-5 dark:border-slate-700 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-bdigital-navy dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                </div>
                <span className="font-mono text-sm text-slate-400">
                  0{index + 1}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
