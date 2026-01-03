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
        className="flex items-center gap-2 rounded-full border border-bdigital-cyan/40 bg-bdigital-cyan/90 px-4 py-3 text-sm font-semibold text-bdigital-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-bdigital-cyan hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan"
      >
        <MessageSquareText className="h-4 w-4" />
        {t("web.cta.primary")}
      </Link>
    </div>
  );
}
