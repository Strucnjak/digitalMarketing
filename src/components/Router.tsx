import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type PageType = 
  | 'home' 
  | 'web-design' 
  | 'seo' 
  | 'social-media' 
  | 'branding' 
  | 'strategy' 
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
  const [currentPage, setCurrentPage] = useState<PageType>('home');

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