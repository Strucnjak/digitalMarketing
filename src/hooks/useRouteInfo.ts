import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { parsePathname, type ParsedPath } from "../routing";

export function useRouteInfo(): ParsedPath {
  const location = useLocation();
  return useMemo(() => parsePathname(location.pathname), [location.pathname]);
}
