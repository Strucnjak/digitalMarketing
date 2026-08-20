import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { buildLocalizedPath, type PageType } from "../routing";
import { ADDRESS, EMAIL, PHONE } from "../config/contact";

interface FooterProps {
  initialYear?: string;
}

export function Footer({ initialYear }: FooterProps) {
  const { t } = useLanguage();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const services: { id: PageType; label: string }[] = [
    { id: "web-design", label: t("services.web.title") },
    { id: "seo", label: t("services.seo.title") },
    { id: "social-media", label: t("services.social.title") },
    { id: "branding", label: t("services.branding.title") },
    { id: "strategy", label: t("services.strategy.title") },
  ];

  return (
    <footer className="border-t border-white/10 bg-bdigital-dark-navy text-white">
      <div className="site-container py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              to={buildLocalizedPath(activeLocale, "home", {
                includeLocalePrefix,
              })}
              className="focus-ring inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-dark">
                <img src="/logo.svg" alt="" className="h-7 w-7" />
              </span>
              <span className="text-xl font-semibold">DIAL Digital</span>
            </Link>
            <p className="mt-6 max-w-md text-base leading-7 text-text-muted">
              {t("footer.description")}
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label={t("footer.services")}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              {t("footer.services")}
            </p>
            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    className="focus-ring text-sm text-slate-300 transition-colors hover:text-white"
                    to={buildLocalizedPath(activeLocale, service.id, {
                      includeLocalePrefix,
                    })}
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              {t("footer.contact")}
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a
                className="focus-ring block text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-white"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
              <a
                className="focus-ring block text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-white"
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
              >
                {PHONE}
              </a>
              <p className="text-text-muted">{ADDRESS}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {initialYear ?? new Date().getFullYear()} DIAL Digital.{" "}
            {t("footer.rights")}
          </p>
          <p>{t("footer.location")}</p>
        </div>
      </div>
    </footer>
  );
}
