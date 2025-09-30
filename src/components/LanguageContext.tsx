import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'me';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return initialLanguage ?? 'me';
    }
    const storedLanguage = window.localStorage.getItem('language') as Language | null;
    return storedLanguage ?? initialLanguage ?? 'me';
  });
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    import(`../locales/${language}.json`).then((mod) => {
      setTranslations(mod.default);
    });
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
