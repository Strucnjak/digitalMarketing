import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { buildLocalizedPath } from "../routing";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();

  const bookCall = () =>
    navigate(
      buildLocalizedPath(activeLocale, "free-consultation", {
        includeLocalePrefix,
      }),
    );
  const viewWork = () =>
    document
      .querySelector("#portfolio")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-bdigital-navy text-white"
    >
      <div className="site-container grid min-h-screen items-center gap-14 pb-20 pt-28 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-32">
        <div className="relative z-10 lg:col-span-7">
          <p className="eyebrow mb-8 !text-slate-300">{t("hero.tagline")}</p>
          <h1 className="display-title max-w-5xl text-white">
            {t("hero.title")}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={bookCall}
              className="focus-ring inline-flex min-h-12 items-center gap-3 rounded-md bg-bdigital-cyan px-6 py-3 text-sm font-semibold text-bdigital-navy transition-colors hover:bg-bdigital-cyan-light"
            >
              {t("web.cta.primary")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={viewWork}
              className="focus-ring min-h-12 border-b border-white/40 px-1 py-3 text-sm font-semibold text-white transition-colors hover:border-bdigital-cyan hover:text-bdigital-cyan"
            >
              {t("hero.secondary")}
            </button>
          </div>

          <div className="mt-16 flex max-w-xl items-start gap-5 border-t border-white/20 pt-6">
            <span
              className="mt-2 h-2 w-2 flex-none bg-bdigital-cyan"
              aria-hidden="true"
            />
            <p className="text-sm leading-6 text-slate-300">
              {t("hero.badge")}
            </p>
          </div>
        </div>

        <div className="relative lg:col-span-5 lg:translate-x-10">
          <div className="aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-bdigital-dark-navy">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=1125&fit=crop&q=85"
              alt={t("hero.image_alt")}
              className="h-full w-full object-cover opacity-80 mix-blend-luminosity"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
