import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
/* eslint-disable react-refresh/only-export-components */

export interface Location {
  pathname: string;
  search: string;
  hash: string;
  state?: unknown;
}

interface StaticRouterContext {
  url?: string;
  statusCode?: number;
}

interface Navigator {
  push(to: string, state?: unknown): void;
  replace(to: string, state?: unknown): void;
  go(delta: number): void;
  createHref(to: string): string;
}

interface RouterContextValue {
  location: Location;
  navigator: Navigator;
  static: boolean;
  staticContext?: StaticRouterContext;
}

const RouterContext = createContext<RouterContextValue | null>(null);

interface RouteContextValue {
  matches: RouteMatch[];
  index: number;
}

const RouteContext = createContext<RouteContextValue | null>(null);

function useRouterContext(): RouterContextValue {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouterContext must be used within a router");
  }
  return context;
}

function createBrowserLocation(): Location {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: window.history.state ?? undefined,
  };
}

function createBrowserNavigator(): Navigator {
  return {
    push(to, state) {
      window.history.pushState(state ?? {}, "", to);
      window.dispatchEvent(new PopStateEvent("popstate"));
    },
    replace(to, state) {
      window.history.replaceState(state ?? {}, "", to);
      window.dispatchEvent(new PopStateEvent("popstate"));
    },
    go(delta) {
      window.history.go(delta);
    },
    createHref(to) {
      return to;
    },
  };
}

function subscribeToHistory(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
  };
}

export function BrowserRouter({ children }: { children?: ReactNode }) {
  if (typeof window === "undefined") {
    throw new Error("BrowserRouter can only be used in the browser");
  }

  const location = useSyncExternalStore(
    subscribeToHistory,
    createBrowserLocation,
    createBrowserLocation
  );

  const navigator = useMemo(() => createBrowserNavigator(), []);

  const value = useMemo<RouterContextValue>(() => ({
    location,
    navigator,
    static: false,
  }), [location, navigator]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

function parseLocation(input: string): Location {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    const url = new URL(input);
    return {
      pathname: url.pathname || "/",
      search: url.search,
      hash: url.hash,
    };
  }

  const normalized = input.startsWith("/") ? input : `/${input}`;
  const url = new URL(normalized, "http://localhost");
  return {
    pathname: url.pathname || "/",
    search: url.search,
    hash: url.hash,
  };
}

function createStaticNavigator(context: StaticRouterContext): Navigator {
  return {
    push(to) {
      context.url = to;
      context.statusCode = context.statusCode ?? 302;
    },
    replace(to) {
      context.url = to;
      context.statusCode = context.statusCode ?? 301;
    },
    go() {
      throw new Error("go() is not supported in a static router");
    },
    createHref(to) {
      return to;
    },
  };
}

export interface StaticRouterProps {
  location: string;
  context?: StaticRouterContext;
  children?: ReactNode;
}

export function StaticRouter({
  children,
  location,
  context = {},
}: StaticRouterProps) {
  const value = useMemo<RouterContextValue>(() => ({
    location: parseLocation(location),
    navigator: createStaticNavigator(context),
    static: true,
    staticContext: context,
  }), [location, context]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export interface RouteProps {
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: ReactNode;
}

export function Route(props: RouteProps) {
  void props;
  return null;
}

interface RouteNode {
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: RouteNode[];
}

export interface RouteObject {
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: RouteObject[];
}

interface RouteMatch {
  node: RouteNode;
  params: Record<string, string>;
}

function createRoutesFromChildren(children?: ReactNode): RouteNode[] {
  const routes: RouteNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement<RouteProps>(child)) {
      return;
    }

    const node: RouteNode = {
      path: child.props.path,
      index: child.props.index,
      element: child.props.element,
      children: createRoutesFromChildren(child.props.children),
    };

    routes.push(node);
  });

  return routes;
}

function createRoutesFromObjects(objects: RouteObject[] = []): RouteNode[] {
  return objects.map((object) => ({
    path: object.path,
    index: object.index,
    element: object.element,
    children: createRoutesFromObjects(object.children),
  }));
}

function matchRoutes(routes: RouteNode[], pathname: string): RouteMatch[] | null {
  const trimmed = pathname.replace(/\/+/g, "/");
  const segments = trimmed
    .split("/")
    .filter((segment) => segment.length > 0);

  for (const route of routes) {
    const match = matchRoute(route, segments, 0);
    if (match) {
      return match.matches;
    }
  }

  return null;
}

interface MatchResult {
  matches: RouteMatch[];
  index: number;
}

function matchRoute(
  node: RouteNode,
  segments: string[],
  segmentIndex: number
): MatchResult | null {
  let currentIndex = segmentIndex;
  const params: Record<string, string> = {};

  if (node.index) {
    if (currentIndex !== segments.length) {
      return null;
    }
  } else if (node.path && node.path.length > 0) {
    if (node.path === "*") {
      currentIndex = segments.length;
    } else {
      const parts = node.path
        .split("/")
        .map((segment) => segment.trim())
        .filter((segment) => segment.length > 0);

      for (const part of parts) {
        const value = segments[currentIndex];

        if (part === "*") {
          currentIndex = segments.length;
          break;
        }

        if (value === undefined) {
          return null;
        }

        if (part.startsWith(":")) {
          const match = /^:([A-Za-z0-9_-]+)(?:\((.*)\))?$/.exec(part);
          if (!match) {
            return null;
          }
          const [, paramName, expr] = match;
          if (expr) {
            const regex = new RegExp(`^(?:${expr})$`);
            if (!regex.test(value)) {
              return null;
            }
          }
          params[paramName] = value;
        } else if (part !== value) {
          return null;
        }

        currentIndex += 1;
      }
    }
  }

  const currentMatch: RouteMatch = {
    node,
    params,
  };

  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      const childMatch = matchRoute(child, segments, currentIndex);
      if (childMatch) {
        return {
          matches: [currentMatch, ...childMatch.matches],
          index: childMatch.index,
        };
      }
    }
  }

  if (node.index) {
    return { matches: [currentMatch], index: currentIndex };
  }

  if (node.path === "*" || currentIndex === segments.length) {
    return { matches: [currentMatch], index: currentIndex };
  }

  return null;
}

function renderMatches(matches: RouteMatch[], index = 0): ReactNode {
  if (index >= matches.length) {
    return null;
  }

  const match = matches[index];
  const element = match.node.element;

  if (element == null) {
    return (
      <RouteContext.Provider value={{ matches, index }}>
        {renderMatches(matches, index + 1)}
      </RouteContext.Provider>
    );
  }

  return (
    <RouteContext.Provider value={{ matches, index }}>
      {element}
    </RouteContext.Provider>
  );
}

export function Routes({ children }: { children?: ReactNode }) {
  const router = useRouterContext();
  const routes = useMemo(() => createRoutesFromChildren(children), [children]);
  const matches = useMemo(
    () => matchRoutes(routes, router.location.pathname),
    [routes, router.location.pathname]
  );

  if (!matches) {
    return null;
  }

  return <>{renderMatches(matches)}</>;
}

export function useRoutes(routeObjects: RouteObject[]): ReactNode {
  const router = useRouterContext();
  const routes = useMemo(() => createRoutesFromObjects(routeObjects), [routeObjects]);
  const matches = useMemo(
    () => matchRoutes(routes, router.location.pathname),
    [routes, router.location.pathname]
  );

  if (!matches) {
    return null;
  }

  return <>{renderMatches(matches)}</>;
}

export function Outlet() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("Outlet must be used within a route");
  }

  return <>{renderMatches(context.matches, context.index + 1)}</>;
}

export interface NavigateOptions {
  replace?: boolean;
  state?: unknown;
}

export function useNavigate() {
  const router = useRouterContext();
  return (to: string, options: NavigateOptions = {}) => {
    if (options.replace) {
      router.navigator.replace(to, options.state);
    } else {
      router.navigator.push(to, options.state);
    }
  };
}

export function useLocation(): Location {
  return useRouterContext().location;
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  const context = useContext(RouteContext);
  if (!context) {
    return {} as T;
  }

  const params: Record<string, string> = {};
  for (let i = 0; i <= context.index; i += 1) {
    Object.assign(params, context.matches[i]?.params ?? {});
  }

  return params as T;
}

export interface NavigateProps {
  to: string;
  replace?: boolean;
  state?: unknown;
}

export function Navigate({ to, replace = false, state }: NavigateProps) {
  const navigate = useNavigate();
  const router = useRouterContext();

  if (router.static && router.staticContext) {
    if (replace) {
      router.staticContext.url = to;
      router.staticContext.statusCode = router.staticContext.statusCode ?? 301;
    } else {
      router.staticContext.url = to;
      router.staticContext.statusCode = router.staticContext.statusCode ?? 302;
    }
  }

  useEffect(() => {
    navigate(to, { replace, state });
  }, [navigate, to, replace, state]);

  return null;
}

export type { StaticRouterContext };
