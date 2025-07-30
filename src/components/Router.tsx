
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export const servicePageIds = [
  'web-design',
  'seo',
  'social-media',
  'branding',
  'strategy'
] as const;

export type PageType =
  | 'home'
  | (typeof servicePageIds)[number]
  | 'service-inquiry'
  | 'free-consultation';

interface RouterContextType {
  currentPage: PageType;
  navigateTo: (page: PageType, params?: Record<string, string>) => void;
  getQueryParams: () => URLSearchParams;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

interface RouterProviderProps {
  children: ReactNode;
}

export function RouterProvider({ children }: RouterProviderProps) {
  const getPageFromPath = (pathname: string): PageType => {
    const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    switch (cleanPath) {
      case '':
      case 'home':
        return 'home';
      case 'web-design':
      case 'seo':
      case 'social-media':
      case 'branding':
      case 'strategy':
      case 'service-inquiry':
      case 'free-consultation':
        return cleanPath as PageType;
      default:
        return 'home';
    }
  };

  const [currentPage, setCurrentPage] = useState<PageType>(() =>
    getPageFromPath(window.location.pathname)
  );

  const navigateTo = (page: PageType, params?: Record<string, string>) => {
    setCurrentPage(page);
    
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.pathname = page === 'home' ? '/' : `/${page}`;
    
    // Clear existing params and add new ones
    url.search = '';
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    
    window.history.pushState({}, '', url.toString());
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const getQueryParams = () => {
    return new URLSearchParams(window.location.search);
  };

  const value: RouterContextType = {
    currentPage,
    navigateTo,
    getQueryParams
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}