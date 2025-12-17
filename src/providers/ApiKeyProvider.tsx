import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ApiKeyContext, STORAGE_KEY } from "./apiKey";

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [isRemembered, setIsRemembered] = useState(false);

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setApiKeyState(saved);
      setIsRemembered(true);
    }
  }, []);

  const setApiKey = (key: string, remember: boolean) => {
    setApiKeyState(key);
    setIsRemembered(remember);
    if (remember && typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, key);
    }
    if (!remember && typeof localStorage !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const clearApiKey = () => {
    setApiKeyState(null);
    setIsRemembered(false);
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo(() => ({ apiKey, setApiKey, clearApiKey, isRemembered }), [apiKey, isRemembered]);

  return <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>;
}
