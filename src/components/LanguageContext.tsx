import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import en from "../locales/en.json";
import me from "../locales/me.json";

export type Language = "en" | "me";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en,
  me,
};

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

function resolveStoredLanguage(): Language | null {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem("language");
  if (stored === "en" || stored === "me") {
    return stored;
  }
  return null;
}

export function LanguageProvider({
  children,
  initialLanguage,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (initialLanguage) {
      return initialLanguage;
    }
    return resolveStoredLanguage() ?? "me";
  });

  useEffect(() => {
    if (initialLanguage && initialLanguage !== language) {
      setLanguageState(initialLanguage);
    }
  }, [initialLanguage, language]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", language);
    }
  }, [language]);

  const translations = useMemo(() => TRANSLATIONS[language], [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => translations[key] ?? key;

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
