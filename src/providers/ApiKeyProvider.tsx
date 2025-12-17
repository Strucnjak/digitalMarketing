import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface ApiKeyContextValue {
  apiKey: string | null;
  isRemembered: boolean;
  setApiKey: (key: string, remember: boolean) => void;
  clearApiKey: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextValue | undefined>(undefined);
const STORAGE_KEY = "admin_api_key";

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

  const value = useMemo(
    () => ({ apiKey, setApiKey, clearApiKey, isRemembered }),
    [apiKey, isRemembered],
  );

  return <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>;
}

export function useApiKey() {
  const ctx = useContext(ApiKeyContext);
  if (!ctx) throw new Error("ApiKeyProvider missing");
  return ctx;
}
