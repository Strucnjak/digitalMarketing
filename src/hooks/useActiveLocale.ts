import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext";
import { defaultLocale, isLocale, type Locale } from "../routing";
import { useRouteInfo } from "./useRouteInfo";

interface ActiveLocaleInfo {
  activeLocale: Locale;
  includeLocalePrefix: boolean;
  routeLocale?: Locale;
}

export function useActiveLocale(): ActiveLocaleInfo {
  const { language } = useLanguage();
  const routeInfo = useRouteInfo();
  const params = useParams<{ locale?: string }>();

  const routeLocale = isLocale(params.locale) ? params.locale : undefined;
  const languageLocale = isLocale(language) ? language : undefined;

  const { locale: parsedLocale, hasLocalePrefix } = routeInfo;

  const activeLocale: Locale = useMemo(() => {
    if (routeLocale) {
      return routeLocale;
    }

    if (!hasLocalePrefix && languageLocale) {
      return languageLocale;
    }

    return parsedLocale;
  }, [hasLocalePrefix, languageLocale, parsedLocale, routeLocale]);

  const includeLocalePrefix = useMemo(() => {
    if (routeLocale) {
      return true;
    }

    if (hasLocalePrefix) {
      return true;
    }

    return activeLocale !== defaultLocale;
  }, [activeLocale, hasLocalePrefix, routeLocale]);

  return { activeLocale, includeLocalePrefix, routeLocale };
}
