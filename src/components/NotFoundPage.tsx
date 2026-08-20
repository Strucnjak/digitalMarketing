import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { buildLocalizedPath } from "../routing";

export function NotFoundPage() {
  const { language, t } = useLanguage();
  return (
    <section className="section-shell min-h-[70vh] bg-surface pt-32 dark:bg-background">
      <div className="site-container max-w-3xl">
        <p className="eyebrow">404</p>
        <h1 className="section-title mt-7 text-text-primary dark:text-white">{t("not_found.title")}</h1>
        <p className="lead-copy mt-7">{t("not_found.description")}</p>
        <Link
          className="focus-ring mt-10 inline-flex min-h-12 items-center rounded-md bg-accent px-6 font-semibold text-text-primary"
          to={buildLocalizedPath(language, "home")}
        >
          {t("not_found.home")}
        </Link>
      </div>
    </section>
  );
}
