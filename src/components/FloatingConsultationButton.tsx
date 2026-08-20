import { MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { buildLocalizedPath } from "../routing";
import { useLanguage } from "./LanguageContext";

export function FloatingConsultationButton() {
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const { t } = useLanguage();
  const consultationPath = buildLocalizedPath(activeLocale, "free-consultation", { includeLocalePrefix });

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:flex">
      <Link
        to={consultationPath}
        className="flex items-center gap-2 rounded-full border border-accent-border/40 bg-accent/90 px-4 py-3 text-sm font-semibold text-text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <MessageSquareText className="h-4 w-4" />
        {t("web.cta.primary")}
      </Link>
    </div>
  );
}
