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
  initialLanguage?: Language; // can be provided by SSR
}

function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem("language");
  return stored === "en" || stored === "me" ? stored : null;
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  // Prefer SSR-provided initialLanguage, then localStorage (client), then default "me"
  const [language, setLanguageState] = useState<Language>(() => {
    return initialLanguage ?? getStoredLanguage() ?? "me";
  });

  // If the server later provides a different initialLanguage (route change), sync it
  useEffect(() => {
    if (initialLanguage && initialLanguage !== language) {
      setLanguageState(initialLanguage);
    }
  }, [initialLanguage, language]);

  // Persist selection in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", language);
    }
  }, [language]);

  const translations = useMemo(() => TRANSLATIONS[language], [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = useMemo<(key: string) => string>(() => {
    return (key: string) => translations[key] ?? key;
  }, [translations]);

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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
