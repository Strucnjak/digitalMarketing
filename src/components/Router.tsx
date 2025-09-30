/* eslint-disable react-refresh/only-export-components */
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  buildPath,
  defaultLocale,
  parsePathname,
  type Locale,
  type PageType,
} from "../routing";

interface NavigateOptions {
  locale?: Locale;
  params?: Record<string, string>;
  replace?: boolean;
  includeLocalePrefix?: boolean;
}

export { servicePageIds, type PageType } from "../routing";
export type { Locale } from "../routing";

export function useRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  const parsed = useMemo(() => parsePathname(location.pathname), [location.pathname]);

  const navigateTo = useCallback(
    (
      page: PageType,
      params?: Record<string, string>,
      options?: NavigateOptions
    ) => {
      const targetLocale = options?.locale ?? parsed.locale;
      const searchParams = new URLSearchParams(options?.params ?? params ?? {});
      const shouldIncludeLocale =
        options?.includeLocalePrefix ??
        (parsed.hasLocalePrefix || targetLocale !== defaultLocale);

      const path = buildPath(page, targetLocale, {
        includeLocalePrefix: shouldIncludeLocale,
      });

      const search = searchParams.toString();
      const href = search ? `${path}?${search}` : path;

      navigate(href, { replace: options?.replace });
    },
    [navigate, parsed]
  );

  const getQueryParams = useCallback(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  return {
    currentPage: parsed.page,
    navigateTo,
    getQueryParams,
    locale: parsed.locale,
    hasLocalePrefix: parsed.hasLocalePrefix,
  };
}